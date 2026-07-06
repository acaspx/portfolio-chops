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
 * and warms to navy; on click it gives a soft squishy bounce. Over an element
 * carrying `data-cursor`, it swaps for a labeled pill (e.g. "View case", or a
 * lock + "Password protected" on a gated case). Mouse-only, skipped under
 * reduced motion, never intercepts events.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false); // over a clickable target
  const [pressed, setPressed] = useState(false); // mouse button down
  const [label, setLabel] = useState<string | null>(null); // data-cursor label
  const [locked, setLocked] = useState(false); // data-locked present

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
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
      const target = e.target as Element | null;
      setActive(!!target?.closest?.(CLICKABLE));
      const labelled = target?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(labelled?.getAttribute("data-cursor") ?? null);
      setLocked(!!labelled?.hasAttribute("data-locked"));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeaveWindow = () => {
      setActive(false);
      setPressed(false);
      setLabel(null);
      setLocked(false);
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

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("asterisk-cursor");
    return () => document.documentElement.classList.remove("asterisk-cursor");
  }, [enabled]);

  if (!enabled) return null;

  const scale = (active ? 1 : 0.58) * (pressed ? 0.76 : 1);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: sx, y: sy }}
    >
      {label ? (
        // Labeled pill: navy, slightly transparent, high-contrast white text.
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: pressed ? 0.94 : 1 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: "translate(15px, 12px)", backgroundColor: "rgba(30,42,68,0.82)" }}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white shadow-lg ring-1 ring-white/15 backdrop-blur-sm"
        >
          {locked ? (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
              <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {label}
        </motion.div>
      ) : (
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale, color: active ? ACCENT : INK }}
            transition={{
              scale: { type: "spring", stiffness: 520, damping: 15, mass: 0.5 },
              color: { duration: 0.18 },
            }}
            style={{ color: INK, filter: "drop-shadow(0 0 1.6px rgba(247,245,240,0.95))" }}
          >
            <AsteriskMark dense={active} className="h-7 w-7" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
