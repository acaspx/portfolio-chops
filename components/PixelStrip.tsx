"use client";

import { useEffect, useRef } from "react";

/**
 * The footer rule: a single line of small square pixels in an iridescent
 * run of colours (violet, blue, cyan, green-gold, coral, magenta) that drifts
 * right to left. Like oil on water, the hues also shimmer in place (a slow
 * ripple nudges each pixel's position in the cycle) and a soft glint of light
 * travels along the line, so it reads as a sheen rather than a scrolling
 * gradient. A small stable brightness nudge per pixel keeps it pixel-like.
 *
 * Canvas, one row of pixels, paused when off screen. Under
 * prefers-reduced-motion it draws one still frame.
 */

const PX = 3; // pixel size
const GAP = 1; // space between pixels
const SPEED = 18; // px per second the colours drift right to left
const PERIOD = 360; // px per full trip round the colour cycle

// iridescent stops, looping
const STOPS = ["#6a4bd0", "#3651e6", "#45b8e8", "#5fd6c4", "#c8d06a", "#ef8f7a", "#e0559d", "#8a4fd0"].map(
  (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)),
);

const colorAt = (u: number) => {
  const v = (u - Math.floor(u)) * STOPS.length;
  const i = Math.floor(v);
  const f = v - i;
  const a = STOPS[i];
  const b = STOPS[(i + 1) % STOPS.length];
  const e = f * f * (3 - 2 * f); // smoothstep: no visible seams between stops
  return a.map((c, k) => c + (b[k] - c) * e);
};

const hash = (n: number) => {
  let h = Math.imul(n ^ (n >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
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
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(PX * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, PX);
      const step = PX + GAP;
      const n = Math.floor((w + GAP) / step);
      const ox = Math.round((w - (n * step - GAP)) / 2);
      for (let i = 0; i < n; i++) {
        const x = ox + i * step;
        // the cycle drifts right to left; a slow ripple makes the hues shimmer
        const ripple = 0.05 * Math.sin(x / 47 + t * 0.9) + 0.03 * Math.sin(x / 19 - t * 1.4);
        const [r, g, b] = colorAt((x + t * SPEED) / PERIOD + ripple);
        // a soft glint that travels along the line, faster than the colours
        const span = w + 240;
        const gx = span - ((t * SPEED * 2.4) % span) - 120;
        const glint = 0.32 * Math.exp(-(((x - gx) / 46) ** 2));
        // a stable per-pixel brightness nudge so it reads as pixels
        const k = 0.9 + 0.16 * hash(i + 1) + glint;
        // the glint lifts toward white, like light catching a film
        const lift = glint * 120;
        ctx.fillStyle = `rgb(${Math.min(255, r * k + lift) | 0},${Math.min(255, g * k + lift) | 0},${Math.min(255, b * k + lift) | 0})`;
        ctx.fillRect(x, 0, PX, PX);
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

  return <canvas ref={ref} aria-hidden className={`block h-[3px] w-full ${className}`} />;
}
