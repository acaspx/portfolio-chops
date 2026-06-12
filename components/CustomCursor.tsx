"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, AnimatePresence } from "motion/react";
import AsteriskMark from "@/components/AsteriskMark";

const CLICKABLE = "a, button, [role='button'], summary, input, select, textarea, label";

/**
 * Custom cursor: over clickable UI the native cursor is replaced by the
 * asterisk mark, blooming sparse to dense exactly like the nav home button.
 * Mouse-only (pointer: fine), skipped entirely under reduced motion, and
 * never intercepts events (pointer-events: none throughout).
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    // pointerover fires on every target change: recompute clickability there
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(CLICKABLE);
      setActive(!!el);
    };
    const onLeaveWindow = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, [x, y]);

  // Hide the native cursor only while the asterisk is standing in for it
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.toggle("asterisk-cursor", active);
    return () => document.documentElement.classList.remove("asterisk-cursor");
  }, [active, enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 text-accent"
      style={{ x, y, filter: "drop-shadow(0 0 1.5px rgba(247,245,240,0.9))" }}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="-ml-3.5 -mt-3.5"
          >
            <AsteriskMark dense={active} className="h-7 w-7" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
