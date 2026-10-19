"use client";

import { useEffect, useRef } from "react";

/**
 * A 20px pixel-dither strip: blue into green, a black core flecked with
 * light, green and blue again, then magenta dissolving into white. It drifts
 * right to left and its colour boundaries slowly wave.
 *
 * How it's drawn:
 *   - The pattern lives in its own space (a periodic colour ramp), and the
 *     pixel grid is fixed to that space, so as the pattern scrolls the pixels
 *     travel with it at sub-pixel positions: they glide rather than blink.
 *   - Between two ramp colours each pixel picks one or the other with a 4x4
 *     Bayer threshold, which gives the checkerboard and sparse-dot textures.
 *   - A slow sine offsets the ramp per row and column, so the boundaries
 *     between colour zones undulate.
 *   - A few pixels per zone take a highlight colour (cyan in the blues, white
 *     in the black) for sparkle, picked by a stable hash so they don't flicker.
 *
 * Canvas, one fillRect per pixel (about 1,300 at this size), paused when off
 * screen. Under prefers-reduced-motion it draws one still frame.
 */

const CELL = 20 / 7; // px per pixel: 7 rows in the 20px strip, as fine as the reference
const SPEED = 16; // px per second, right to left
const PERIOD = 640; // px per full colour cycle

type Stop = [number, string];
// The ramp, read off the reference strip. Periodic: the last stop wraps to the first.
const STOPS: Stop[] = [
  [0.0, "#2f62ff"],
  [0.1, "#4aa8ff"],
  [0.2, "#3aa646"],
  [0.31, "#060806"],
  [0.43, "#060806"],
  [0.53, "#3aa646"],
  [0.63, "#3d7dff"],
  [0.72, "#2234d8"],
  [0.81, "#df52f2"],
  [0.9, "#ffffff"],
  [0.97, "#ffffff"],
];
// Sparkle colour per stop (null = none)
const SPARK: (string | null)[] = [
  "#8fe3ff", "#c8f1ff", "#9be38f", "#ffffff", "#7ddc6e", "#9be38f",
  "#8fe3ff", "#6f9bff", "#ffd3ff", "#141414", "#e052f2",
];

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
        for (let r = 0; r < rows; r++) {
          // slow wave: nudges the ramp by row and column so zone edges undulate
          const wave =
            0.03 * Math.sin((gx * CELL) / 70 + r * 0.9 - t * 0.7) +
            0.015 * Math.sin((gx * CELL) / 23 - t * 1.3);
          const { k, n, f } = locate((gx * CELL) / PERIOD + wave);
          const pick = f > BAYER[r % 4][((gx % 4) + 4) % 4] ? n : k;
          let color = STOPS[pick][1];
          const spark = SPARK[pick];
          if (spark && hash(gx, r) < 0.07) color = spark;
          ctx.fillStyle = color;
          // a hair of overlap so sub-pixel positions never leave a seam between pixels
          ctx.fillRect(x, r * CELL, CELL + 0.5, CELL + 0.5);
        }
      }
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
    />
  );
}
