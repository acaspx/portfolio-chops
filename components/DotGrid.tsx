"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive dot field (canvas). Dots near the pointer grow and shift
 * from dim paper to accent blue, then violet at the core. The pointer
 * position is lerped for a soft trailing feel. Renders a static grid
 * when idle; the rAF loop only runs while there's motion to show.
 */
export default function DotGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = 26;
    const BASE_R = 1.4;
    const MAX_R = 3.6;
    const RADIUS = 130; // influence radius around pointer

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;

    // Actual and lerped pointer (lerp gives the trail)
    const target = { x: -9999, y: -9999 };
    const cursor = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let x = GAP / 2; x < width; x += GAP) {
        for (let y = GAP / 2; y < height; y += GAP) {
          const dx = x - cursor.x;
          const dy = y - cursor.y;
          const dist = Math.hypot(dx, dy);
          // 1 at the pointer, 0 at the influence edge, eased
          const t = dist < RADIUS ? Math.pow(1 - dist / RADIUS, 2) : 0;

          const r = BASE_R + (MAX_R - BASE_R) * t;
          let fill: string;
          if (t > 0.65) {
            fill = `rgba(139, 92, 246, ${0.45 + t * 0.55})`; // violet core
          } else if (t > 0.05) {
            fill = `rgba(79, 124, 255, ${0.25 + t * 0.75})`; // accent blue ring
          } else {
            fill = "rgba(247, 245, 240, 0.16)"; // dim paper at rest
          }

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = fill;
          ctx.fill();
        }
      }
    };

    const tick = () => {
      cursor.x += (target.x - cursor.x) * 0.18;
      cursor.y += (target.y - cursor.y) * 0.18;
      draw();
      // Keep animating until the lerp settles
      if (Math.hypot(target.x - cursor.x, target.y - cursor.y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      wake();
    };

    const onLeave = () => {
      target.x = -9999;
      target.y = -9999;
      wake();
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parent = canvas.parentElement ?? canvas;
    if (!reduce) {
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
