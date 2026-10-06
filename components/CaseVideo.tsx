"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Screen-recording companion to CaseImage: same canvas, same caption treatment.
 *
 * Silent clips autoplay on loop. The src is attached up front rather than lazily
 * (an earlier version deferred it and the play() call raced the attach, so
 * nothing ever started); these clips are a few hundred KB, so the lazy path cost
 * more in fragility than it saved in bytes. An observer only pauses the video
 * while it is offscreen.
 *
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // React sets muted as a property, and it can miss the initial attribute,
    // which is the difference between autoplay working and being blocked.
    el.muted = true;
    if (reduce) return;

    const start = () => el.play().catch(() => {});
    start();

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : el.pause()),
      { rootMargin: "150px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <figure className="my-6">
      <div className="case-canvas overflow-hidden rounded-2xl p-4 sm:p-8">
        <video
          ref={ref}
          src={src}
          poster={poster}
          aria-label={label}
          autoPlay={!reduce}
          muted
          loop
          playsInline
          controls={reduce}
          preload="metadata"
          className="relative z-[1] h-auto w-full rounded-lg shadow-2xl ring-1 ring-black/25"
        />
      </div>
      <figcaption className="mt-2.5 font-mono text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}
