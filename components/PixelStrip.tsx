"use client";

import { useEffect, useRef } from "react";

/**
 * A 20px halftone strip after Noman Ijaz's w28 (iamnoman.com/?piece=w28):
 * a screen of square dots on black carrying an iridescent sheen (maroon,
 * coral, violet, royal blue, periwinkle, cyan) in slanted bands, crossed by
 * bright streaks (coral into a white core into cyan and blue) that sweep and
 * undulate as the light drifts right to left.
 *
 * How it's drawn:
 *   - The dot screen is fixed, like a halftone. What moves is the light
 *     field behind it, so motion reads as light sliding across the surface,
 *     and each dot's size and colour change smoothly rather than blinking.
 *   - Dot size carries brightness (0.3 to 1 of the pitch), the way a halftone
 *     does; very dim dots drop out entirely, which gives the sparse areas.
 *   - Each streak is a thin band whose centreline rides a slow travelling
 *     sine, so the streaks wave up and down as they pass. Across its width
 *     the band runs through a spectrum: coral, white core, cyan, blue.
 *   - Within EDGE px of either end the dots thin out and fade, so the strip
 *     dissolves at its ends; top and bottom stay clean straight edges.
 *
 * Canvas, about 1,000 dots a frame at this size, paused when off screen.
 * Under prefers-reduced-motion it draws one still frame.
 */

const PITCH = 3; // px between dot centres: 6 rows in 20px, chunky like the reference
const SPEED = 14; // px per second the light field drifts right to left
const EDGE = 36; // px over which each end dissolves
const GROUND = "#050507";

type RGB = [number, number, number];
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

// Body: an iridescent ramp read off the reference, periodic so it can loop:
// maroon, coral, violet, royal blue, periwinkle, cyan, sea-grey, violet.
const RAMP: RGB[] = [
  "#5e1b2c", "#b8484a", "#6a3aa6", "#2f3fc6", "#6c76ea", "#5ad4cf", "#6c9c97", "#5a3a9a",
].map(hex);
const ramp = (u: number): RGB => {
  const v = (u - Math.floor(u)) * RAMP.length;
  const i = Math.floor(v);
  const f = v - i;
  // smoothstep between neighbours so the colour bands blend like a sheen
  return mix(RAMP[i], RAMP[(i + 1) % RAMP.length], f * f * (3 - 2 * f));
};
// streak spectrum, from its leading edge through the core to its trailing edge
const SPECTRUM: [number, RGB][] = [
  [-1, hex("#9e3a3a")],
  [-0.55, hex("#ef9b8c")],
  [0, hex("#ffffff")],
  [0.45, hex("#86ece3")],
  [1, hex("#3557ee")],
];
const spectrum = (s: number): RGB => {
  for (let i = 0; i < SPECTRUM.length - 1; i++) {
    const [a, ca] = SPECTRUM[i];
    const [b, cb] = SPECTRUM[i + 1];
    if (s <= b) return mix(ca, cb, Math.max(0, (s - a) / (b - a)));
  }
  return SPECTRUM[SPECTRUM.length - 1][1];
};

const hash = (x: number, y: number) => {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

// two streaks with their own rhythm: phase, wavelength, swing, width, run
const STREAKS = [
  { phase: 0, len: 150, swing: 0.34, width: 2.6, run: 260, speed: 0.5 },
  { phase: 2.4, len: 210, swing: 0.3, width: 2.0, run: 340, speed: 0.38 },
  { phase: 4.1, len: 120, swing: 0.38, width: 1.6, run: 200, speed: 0.62 },
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
      const scroll = t * SPEED;
      const cols = Math.floor(w / PITCH);
      const rows = Math.floor(h / PITCH);
      const ox = (w - cols * PITCH) / 2;
      const oy = (h - rows * PITCH) / 2;
      ctx.clearRect(0, 0, w, h);
      // black ground, faded at the ends with the dots
      const g = ctx.createLinearGradient(0, 0, w, 0);
      const f = Math.min(0.2, EDGE / Math.max(w, 1));
      g.addColorStop(0, "rgba(5,5,7,0)");
      g.addColorStop(f, GROUND);
      g.addColorStop(1 - f, GROUND);
      g.addColorStop(1, "rgba(5,5,7,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let c = 0; c < cols; c++) {
        const x = ox + (c + 0.5) * PITCH;
        const X = x + scroll; // light-field coordinate: the field slides left
        const keep = Math.min(1, Math.max(0, Math.min(x, w - x) / EDGE));
        if (keep <= 0) continue;

        // streak centrelines for this column (px from the top)
        const lines = STREAKS.map((s) => ({
          y: h * (0.5 + s.swing * Math.sin((2 * Math.PI * X) / s.len + s.phase - t * s.speed)),
          on: Math.pow(0.5 + 0.5 * Math.sin((2 * Math.PI * X) / s.run + s.phase * 1.3), 1.4),
          width: s.width,
        }));

        for (let r = 0; r < rows; r++) {
          const y = oy + (r + 0.5) * PITCH;
          if (keep < 1 && hash(c, r) > keep) continue;

          // body: the ramp runs along a diagonal that slowly warps, so the
          // colour lies in slanted iridescent bands like the reference
          const d = (X + y * 7 + 18 * Math.sin(X / 90 - t * 0.3)) / 520 - t * 0.02;
          let col: RGB = ramp(d);
          let L =
            0.34 +
            0.4 *
              (0.5 + 0.5 * Math.sin(X / 47 + y / 4 - t * 0.5)) *
              (0.55 + 0.45 * Math.sin(X / 110 - y / 7 + t * 0.21));
          for (const ln of lines) {
            if (ln.on < 0.02) continue;
            const s = (y - ln.y) / (ln.width * 2); // about -1..1 across the band
            if (s < -1.6 || s > 1.6) continue;
            const k = Math.exp(-s * s * 1.6) * ln.on;
            col = mix(col, spectrum(Math.max(-1, Math.min(1, s))), Math.min(1, k * 1.4));
            L = Math.max(L, k);
          }
          // halftone: dimmer areas fall to a checkerboard, then thin out further
          if (L < 0.42 && (c + r) % 2 === 1) continue;
          if (L < 0.36 && hash(c * 3 + 1, r) > L * 2.4) continue;
          const size = PITCH * Math.min(0.92, 0.45 + 0.55 * L);
          const lum = 0.6 + 0.55 * L;
          ctx.fillStyle = `rgb(${Math.min(255, col[0] * lum) | 0},${Math.min(255, col[1] * lum) | 0},${Math.min(255, col[2] * lum) | 0})`;
          ctx.globalAlpha = keep < 1 ? 0.35 + 0.65 * keep : 1;
          // snap to half pixels (device pixels at 2x) so dots stay crisp squares
          const sz = Math.min(PITCH - 0.5, Math.max(1, Math.round(size * 2) / 2)); // always a gap between dots
          ctx.fillRect(Math.round((x - sz / 2) * 2) / 2, Math.round((y - sz / 2) * 2) / 2, sz, sz);
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
      if (reduce) draw(4);
    });
    ro.observe(canvas);

    if (reduce) draw(4);
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
