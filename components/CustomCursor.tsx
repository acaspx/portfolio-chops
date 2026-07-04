"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import AsteriskMark from "@/components/AsteriskMark";

const CLICKABLE = "a, button, [role='button'], summary, input, select, textarea, label";

const INK = "#16140f";
const ACCENT = "#1e2a44";

/**
 * Custom cursor: the brand asterisk stands in for the native pointer across
 * the whole site. Rests as a small black asterisk; over clickable UI it blooms
 * and warms to teal; on click it gives a soft squishy bounce. Mouse-only
 * (pointer: fine), skipped under reduced motion, never intercepts events.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false); // over a clickable target
  const [pressed, setPressed] = useState(false); // mouse button down

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Light smoothing so the follow feels natural, not laggy.
  const sx = useSpring(x, { stiffness: 800, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 800, damping: 40, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(CLICKABLE);
      setActive(!!el);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeaveWindow = () => {
      setActive(false);
      setPressed(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, [x, y]);

  // Hide the native cursor for the whole document while the asterisk is active.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("asterisk-cursor");
    return () => document.documentElement.classList.remove("asterisk-cursor");
  }, [enabled]);

  if (!enabled) return null;

  // Rest small + black; bloom larger + teal on clickable; squish on press.
  const scale = (active ? 1 : 0.58) * (pressed ? 0.76 : 1);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: sx, y: sy }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale, color: active ? ACCENT : INK, opacity: active ? 0.6 : 1 }}
          transition={{
            scale: { type: "spring", stiffness: 520, damping: 15, mass: 0.5 },
            color: { duration: 0.18 },
            opacity: { duration: 0.18 },
          }}
          style={{ color: INK, filter: "drop-shadow(0 0 1.6px rgba(247,245,240,0.95))" }}
        >
          <AsteriskMark dense={active} className="h-7 w-7" />
        </motion.div>
      </div>
    </motion.div>
  );
}
