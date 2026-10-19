"use client";

import { useEffect, useRef } from "react";

/**
 * A 20px halftone strip after Noman Ijaz's w28 (iamnoman.com/?piece=w28),
 * zoomed in so its dot screen reads at footer scale.
 *
 * What the reference does, and how this recreates it:
 *   - A fixed screen of small square dots on black. Brightness sets both a
 *     dot's size and whether it's there at all: presence is an ordered (Bayer)
 *     dither, so dim light breaks into the reference's diagonal checker and
 *     "x" textures, and bright light fills the screen with fat dots.
 *   - Thin-film iridescence: colour comes from a rainbow cycle (violet, blue,
 *     cyan, green-gold, coral, magenta) indexed by position across each sheen
 *     band, so every band carries its own spectrum; the hottest cores go white.
 *   - Light, not the dots, moves. Broad soft sheens and sharp bright streaks
 *     lie on a slant and sweep across the screen right to left, their
 *     centrelines riding slow travelling waves so they bob up and down.
 *   - The ends dissolve over EDGE px; the top and bottom stay clean.
 *
 * Canvas, about 600 dots a frame at this size, paused when off screen.
 * Under prefers-reduced-motion it draws one still frame.
 */

const PITCH = 4; // px between dot centres: 5 rows in 20px, the reference zoomed in
const SPEED = 22; // px per second the light sweeps right to left
const EDGE = 40; // px over which each end dissolves
const SLANT = 2.2; // how much the bands lean: px of x per px of y

type RGB = [number, number, number];
const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/**
 * Thin-film colour: a cosine rainbow biased toward the reference's violets
 * and blues. u is any real number; one unit is a full trip round the cycle.
 */
const film = (u: number): RGB => {
  const tau = 2 * Math.PI;
  return [
    255 * (0.52 + 0.46 * Math.cos(tau * (u + 0.0))),
    255 * (0.45 + 0.43 * Math.cos(tau * (u + 0.36))),
    255 * (0.66 + 0.34 * Math.cos(tau * (u + 0.62))),
  ].map((v) => Math.max(0, Math.min(255, v))) as RGB;
};
const WHITE: RGB = [255, 255, 255];
const BODY: RGB = [150, 150, 190]; // the silvery lilac the bands sit in

// 4x4 Bayer thresholds, 0..1
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((r) => r.map((v) => (v + 0.5) / 16));

const hash = (x: number, y: number) => {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

/**
 * The bands of light. `every` is the spacing between repeats along the
 * strip, `width` the half-width across the band (px), `gain` its brightness,
 * `swing`/`len` the up-down wave its centreline rides, `film` how many trips
 * round the rainbow it makes across its width.
 */
const BANDS = [
  { every: 300, offset: 0, width: 58, gain: 0.62, swing: 3, len: 200, film: 0.7, speed: 0.8 },
  { every: 230, offset: 90, width: 16, gain: 0.85, swing: 4, len: 160, film: 1.0, speed: 1 },
  { every: 270, offset: 200, width: 4, gain: 1.2, swing: 4, len: 140, film: 1.5, speed: 1.2 },
];

export default function PixelStrip({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const cols = Math.floor(w / PITCH);
      const rows = Math.floor(h / PITCH);
      const ox = Math.round((w - cols * PITCH) / 2);
      const oy = Math.round((h - rows * PITCH) / 2);
      ctx.clearRect(0, 0, w, h);

      // black ground, faded at the ends along with the dots
      const g = ctx.createLinearGradient(0, 0, w, 0);
      const f = Math.min(0.2, EDGE / Math.max(w, 1));
      g.addColorStop(0, "rgba(4,4,6,0)");
      g.addColorStop(f, "#040406");
      g.addColorStop(1 - f, "#040406");
      g.addColorStop(1, "rgba(4,4,6,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let c = 0; c < cols; c++) {
        const x = ox + (c + 0.5) * PITCH;
        const keep = Math.min(1, Math.max(0, Math.min(x, w - x) / EDGE));
        if (keep <= 0) continue;

        for (let r = 0; r < rows; r++) {
          const y = oy + (r + 0.5) * PITCH;
          if (keep < 1 && hash(c, r) > keep) continue;

          // slanted coordinate: bands lean, and the light sweeps leftward
          // (x grows as time passes, so features travel right to left)
          const yc = y - h / 2;
          // the body: a dim, slowly shifting iridescent sheen that the bands
          // brighten; enough light that the dither covers the whole strip
          let L = 0.46 + 0.2 * Math.sin(x / 53 + y / 4 + t * 0.9) * Math.sin(x / 131 - t * 0.3);
          let col: RGB = mix(BODY, film((x + t * SPEED * 0.6 + yc * SLANT) / 520), 0.5);
          for (const b of BANDS) {
            const along = x + t * SPEED * b.speed;
            // the band's centreline bobs up and down as it travels
            const wave = b.swing * Math.sin((2 * Math.PI * along) / b.len - t * 0.8);
            const u = along + (yc - wave) * SLANT - b.offset;
            const d = u - Math.round(u / b.every) * b.every; // nearest repeat
            const s = d / b.width; // -1..1 across the band
            if (s < -2.6 || s > 2.6) continue;
            const k = Math.exp(-s * s) * b.gain;
            // spectrum across the band, plus a slow drift so colours shimmer
            const hue = film(s * 0.5 * b.film + 0.15 + 0.05 * Math.sin(t * 0.4 + b.offset));
            col = mix(col, hue, Math.min(1, k * 1.3));
            if (k > 0.85) col = mix(col, WHITE, Math.min(1, (k - 0.85) * 2.2));
            L = Math.max(L, k);
          }
          L = Math.min(1, L);

          // ordered dither: dim light keeps only some dots, in a checker/x lattice
          if (L < BAYER[r % 4][c % 4] * 0.9) continue;
          // halftone: brighter light makes bigger dots, always a gap between them
          const size = Math.min(PITCH - 1, Math.max(1, Math.round((1 + 2.6 * L) * 2) / 2));
          const lum = 0.35 + 0.8 * L;
          ctx.fillStyle = `rgb(${Math.min(255, col[0] * lum) | 0},${Math.min(255, col[1] * lum) | 0},${Math.min(255, col[2] * lum) | 0})`;
          ctx.globalAlpha = keep < 1 ? 0.35 + 0.65 * keep : 1;
          const half = Math.round(size) / 2;
          ctx.fillRect(Math.round((x - half) * 2) / 2, Math.round((y - half) * 2) / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    resize();
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const loop = (now: number) => {
      draw((now - t0) / 1000);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(6);
    });
    ro.observe(canvas);

    if (reduce) draw(6);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`block h-5 w-full ${className}`}
      // soft falloff at the two ends only; top and bottom stay crisp
      style={{
        maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    />
  );
}
