"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive asterisk field (canvas). A grid of small 6-ray asterisks on
 * paper; near the pointer they grow, rotate, and shift from dim ink to
 * accent blue with a violet core. Pointer position is lerped for a soft
 * trailing feel; the rAF loop sleeps once settled. Static under
 * prefers-reduced-motion.
 */
export default function DotGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = 32;
    const BASE_R = 2.6; // half-length of a spoke at rest
    const MAX_R = 6.5; // half-length at the pointer
    const RADIUS = 130; // influence radius
    // Same grammar as the nav mark: 3 strokes at rest, 6 when blooming
    const ANGLES = [0, Math.PI / 3, (2 * Math.PI) / 3];
    const BLOOM = [Math.PI / 6, Math.PI / 2, (5 * Math.PI) / 6];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;

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
      ctx.lineCap = "round";
      for (let x = GAP / 2; x < width; x += GAP) {
        for (let y = GAP / 2; y < height; y += GAP) {
          const dist = Math.hypot(x - cursor.x, y - cursor.y);
          const t = dist < RADIUS ? Math.pow(1 - dist / RADIUS, 2) : 0;

          const r = BASE_R + (MAX_R - BASE_R) * t;
          const spin = t * 0.6; // up to ~34° of rotation near the pointer
          if (t > 0.65) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.55 + t * 0.45})`; // --color-violet core
          } else if (t > 0.05) {
            ctx.strokeStyle = `rgba(36, 71, 255, ${0.35 + t * 0.65})`; // --color-accent ring
          } else {
            ctx.strokeStyle = "rgba(22, 20, 15, 0.22)"; // dim ink at rest
          }
          ctx.lineWidth = 1.1 + t * 0.7;

          for (const a of ANGLES) {
            const ang = a + spin;
            const dx = Math.cos(ang) * r;
            const dy = Math.sin(ang) * r;
            ctx.beginPath();
            ctx.moveTo(x - dx, y - dy);
            ctx.lineTo(x + dx, y + dy);
            ctx.stroke();
          }
          // Densify near the pointer: the second stroke set fades in with proximity
          if (t > 0.05) {
            ctx.globalAlpha = Math.min(1, t * 1.4);
            for (const a of BLOOM) {
              const ang = a + spin;
              const dx = Math.cos(ang) * r;
              const dy = Math.sin(ang) * r;
              ctx.beginPath();
              ctx.moveTo(x - dx, y - dy);
              ctx.lineTo(x + dx, y + dy);
              ctx.stroke();
            }
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    const tick = () => {
      cursor.x += (target.x - cursor.x) * 0.18;
      cursor.y += (target.y - cursor.y) * 0.18;
      draw();
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
