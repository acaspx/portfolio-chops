"use client";

import { useEffect, useState } from "react";
import PixelHeart from "@/components/PixelHeart";

/**
 * Clickable pixel heart with a global, shared count (see /api/hearts). Every
 * visitor's click adds to the same running total. Optimistic on click, and if
 * the datastore isn't connected yet it simply shows the heart with no number.
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
    // Optimistic bump only when the datastore is live (count already loaded),
    // so before setup the heart just pulses with no misleading number.
    setCount((c) => (c === null ? null : c + 1));
    fetch("/api/hearts", { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setCount((c) => Math.max(c ?? 0, d.count));
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={add}
      aria-label={
        count !== null ? `Give a heart. ${count.toLocaleString()} so far.` : "Give a heart"
      }
      className="group inline-flex items-center gap-1 align-baseline transition-transform active:scale-90"
    >
      <PixelHeart
        className={`transition-transform duration-300 ease-out ${
          pop ? "scale-[1.35]" : "group-hover:scale-110"
        }`}
      />
      {count !== null && (
        <span className="font-mono text-[11px] tabular-nums text-muted">
          {count.toLocaleString()}
        </span>
      )}
    </button>
  );
}
