"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Screen-recording companion to CaseImage: same canvas, same caption treatment.
 *
 * Silent clips autoplay on loop, but only once scrolled near the viewport, so a
 * case study with several of these doesn't decode video the reader never sees.
 * Under prefers-reduced-motion nothing plays on its own and the native controls
 * appear instead, so the clip stays reachable without moving unbidden.
 */
export default function CaseVideo({
  src,
  poster,
  caption,
  label,
}: {
  src: string;
  poster?: string;
  caption: string;
  /** Describes the clip for assistive tech, the way alt does for an image. */
  label: string;
}) {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <figure className="my-6">
      <div className="case-canvas overflow-hidden rounded-2xl p-4 sm:p-8">
        <video
          ref={ref}
          src={reduce || near ? src : undefined}
          poster={poster}
          aria-label={label}
          muted
          loop
          playsInline
          controls={reduce}
          preload="none"
          className="relative z-[1] h-auto w-full rounded-lg shadow-2xl ring-1 ring-black/25"
        />
      </div>
      <figcaption className="mt-2.5 font-mono text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}
