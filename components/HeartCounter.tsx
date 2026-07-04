"use client";

import { useEffect, useState } from "react";
import PixelHeart from "@/components/PixelHeart";

/**
 * A small pill: clickable pixel heart + a global, shared count (see
 * /api/hearts). Every click adds to the same running total across all visitors,
 * with an optimistic bump and a pop. The number shows immediately (0 until the
 * datastore returns the real total once Upstash env vars are set).
 */
export default function HeartCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/hearts")
      .then((r) => r.json())
      .then((d) => {
        if (alive && d.ok) setCount(d.count);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const add = () => {
    setPop(true);
    window.setTimeout(() => setPop(false), 320);
    setCount((c) => (c ?? 0) + 1); // optimistic
    fetch("/api/hearts", { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setCount((c) => Math.max(c ?? 0, d.count));
      })
      .catch(() => {});
  };

  const shown = (count ?? 0).toLocaleString();

  return (
    <button
      type="button"
      onClick={add}
      aria-label={`Give a heart. ${shown} so far.`}
      className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/70 px-2.5 py-1 emboss emboss-hover transition-transform active:scale-95"
    >
      <PixelHeart
        className={`transition-transform duration-300 ease-out ${
          pop ? "scale-[1.35]" : "group-hover:scale-110"
        }`}
      />
      <span className="font-mono text-[11px] tabular-nums text-muted">{shown}</span>
    </button>
  );
}
