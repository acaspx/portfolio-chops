"use client";

import { useEffect, useRef } from "react";

/**
 * A 20px pixel-dither strip in an iridescent halftone palette: black into
 * silver, coral, deep blue, periwinkle and cyan, then purple and coral back
 * to silver and black. It drifts
 * right to left and its colour boundaries slowly wave.
 *
 * How it's drawn:
 *   - The pattern lives in its own space (a periodic colour ramp), and the
 *     pixel grid is fixed to that space, so as the pattern scrolls the pixels
 *     travel with it at sub-pixel positions: they glide rather than blink.
 *   - Between two ramp colours each pixel picks one or the other with a 4x4
 *     Bayer threshold, which gives the checkerboard and sparse-dot textures.
 *   - Each column rides a travelling sine wave, so the pixels bob up and
 *     down smoothly as they drift; the canvas clips them at its top and
 *     bottom, which stay clean straight lines.
 *   - The two ends dissolve: pixels thin out and fade over the last EDGE px,
 *     with a soft mask on top, so the strip ends in a ragged pixel blur.
 *   - A few pixels per zone take a highlight colour (white in the silvers, pale
 *     tints elsewhere) for sparkle, picked by a stable hash so they don't flicker.
 *
 * Canvas, one fillRect per pixel (about 1,300 at this size), paused when off
 * screen. Under prefers-reduced-motion it draws one still frame.
 */

const CELL = 20 / 7; // px per pixel: 7 rows in the 20px strip, as fine as the reference
const SPEED = 16; // px per second, right to left
const PERIOD = 640; // px per full colour cycle
const WAVE_AMP = 3.2; // px each column swings up and down
const WAVE_LEN = 150; // px between wave crests
const WAVE_SPEED = 1.1; // radians per second
const EDGE = 36; // px over which each end dissolves

type Stop = [number, string];
// The ramp, read off the reference (iamnoman.com, piece w28): an iridescent
// sweep of silver, coral, deep blue, periwinkle and cyan, dithered against
// black so it reads as a halftone. Periodic: the last stop wraps to the first.
const STOPS: Stop[] = [
  [0.0, "#060608"],
  [0.08, "#c9ccd2"],
  [0.17, "#e3998d"],
  [0.25, "#2f44d4"],
  [0.35, "#6c7cf0"],
  [0.45, "#6fe0d2"],
  [0.54, "#93b4ab"],
  [0.62, "#7a52c2"],
  [0.7, "#d97a6e"],
  [0.79, "#e4e6ea"],
  [0.89, "#060608"],
];
// Sparkle colour per stop (null = none)
const SPARK: (string | null)[] = [
  "#e4e6ea", "#ffffff", "#ffd2c9", "#6fe0d2", "#b9c2ff", "#d8fff8",
  "#ffffff", "#c6a8ff", "#ffc4b8", "#ffffff", "#9aa3ff",
];

const INK = "#0b0b0e"; // the black between halftone dots

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

/** Which two stops a ramp position falls between, and how far along. */
const locate = (u: number) => {
  u -= Math.floor(u);
  for (let k = 0; k < STOPS.length; k++) {
    const a = STOPS[k][0];
    const b = k + 1 < STOPS.length ? STOPS[k + 1][0] : 1 + STOPS[0][0];
    if (u >= a && u < b) return { k, n: (k + 1) % STOPS.length, f: (u - a) / (b - a) };
  }
  return { k: STOPS.length - 1, n: 0, f: 0 };
};

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
      const scroll = t * SPEED; // pattern-space offset in px
      const rows = Math.round(h / CELL);
      const first = Math.floor(scroll / CELL);
      const shift = scroll - first * CELL; // sub-pixel part: pixels glide
      const cols = Math.ceil(w / CELL) + 1;
      ctx.clearRect(0, 0, w, h);
      for (let c = 0; c < cols; c++) {
        const gx = first + c; // pixel's fixed column in pattern space
        const x = c * CELL - shift;
        // Swell: each column rides a travelling sine, so the pixels bob up and
        // down smoothly as they drift left. The canvas edge clips them, which
        // keeps the strip's top and bottom as clean straight lines.
        const px = gx * CELL;
        const dy =
          WAVE_AMP * Math.sin((2 * Math.PI * px) / WAVE_LEN - t * WAVE_SPEED) +
          WAVE_AMP * 0.35 * Math.sin((2 * Math.PI * px) / (WAVE_LEN * 0.43) - t * WAVE_SPEED * 1.6);
        const lift = Math.floor(dy / CELL); // whole rows the column has risen
        const sub = dy - lift * CELL;
        // Ends: within EDGE px of either end, pixels thin out and fade. A
        // pixel drops once its own stable hash falls under how far into the
        // end it is, so the ends read as a ragged, pixelated dissolve.
        const edge = Math.min(x + CELL / 2, w - x - CELL / 2) / EDGE;
        const keep = Math.min(1, Math.max(0, edge));
        if (keep <= 0) continue;
        const density =
          0.5 + 0.3 * Math.sin(px / 95 + t * 0.35) + 0.12 * Math.sin(px / 37 - t * 0.6);
        const alpha = keep < 1 ? 0.35 + 0.65 * keep * keep * (3 - 2 * keep) : 1;
        ctx.globalAlpha = alpha;
        for (let r = -1; r <= rows; r++) {
          const pr = r - lift; // pattern row this cell shows
          if (keep < 1 && hash(gx * 7 + 3, pr) > keep) continue;
          const { k, n, f } = locate(px / PERIOD);
          const pick = f > BAYER[((pr % 4) + 4) % 4][((gx % 4) + 4) % 4] ? n : k;
          let color = STOPS[pick][1];
          const spark = SPARK[pick];
          if (spark && hash(gx, pr) < 0.07) color = spark;
          // Halftone: colour pixels sit on a black field, as in the
          // reference. Density swells and thins in soft bands along the
          // strip, so it shimmers like light across an iridescent surface.
          else if (BAYER[((pr + 2) % 4 + 4) % 4][((gx + 1) % 4 + 4) % 4] > density) color = INK;
          ctx.fillStyle = color;
          // a hair of overlap so sub-pixel positions never leave a seam between pixels
          ctx.fillRect(x, r * CELL + sub, CELL + 0.5, CELL + 0.5);
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
      if (reduce) draw(0);
    });
    ro.observe(canvas);

    if (reduce) draw(0);
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
      className={`block h-5 w-full [image-rendering:pixelated] ${className}`}
      // soft falloff at the two ends only; top and bottom stay crisp
      style={{
        maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      }}
    />
  );
}
