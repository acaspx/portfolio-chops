"use client";

import { useEffect, useState } from "react";
import PixelHeart from "@/components/PixelHeart";

/**
 * Clickable pixel heart with a global, shared count (see /api/hearts). Every
 * visitor may add one heart per visit; the running total is shared across
 * everyone. One-per-visit is gated in sessionStorage (persists across reloads
 * in the tab, resets on a new visit). If the datastore isn't connected yet, the
 * heart just shows with no number.
 */
const GIVEN_KEY = "studioacas:hearted";

export default function HeartCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [given, setGiven] = useState(false);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    let alive = true;
    try {
      if (sessionStorage.getItem(GIVEN_KEY) === "1") setGiven(true);
    } catch {}
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
    if (given) return;
    setGiven(true);
    try {
      sessionStorage.setItem(GIVEN_KEY, "1");
    } catch {}
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
      disabled={given}
      aria-label={
        given
          ? `Thanks for the heart.${count !== null ? ` ${count.toLocaleString()} so far.` : ""}`
          : "Give a heart"
      }
      title={given ? "Thanks for the heart" : "Give a heart"}
      className={`group inline-flex items-center gap-1 align-baseline ${
        given ? "cursor-default" : "transition-transform active:scale-90"
      }`}
    >
      <PixelHeart
        className={`transition-transform duration-300 ease-out ${
          pop ? "scale-[1.35]" : given ? "" : "opacity-80 group-hover:scale-110 group-hover:opacity-100"
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
