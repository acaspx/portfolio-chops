"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Asterisk mark: rests at 3 strokes (6 rays), blooms to 6 strokes (12 rays)
 * with a gentle rotation. Drawn in currentColor so it adapts to any surface.
 *
 * Two modes:
 * - Uncontrolled (default): blooms on its own hover (nav home button).
 * - Controlled: pass `dense` as a boolean and the bloom follows it
 *   (custom cursor, static decorative uses).
 */
export default function AsteriskMark({
  className,
  dense,
}: {
  className?: string;
  dense?: boolean;
}) {
  const reduce = useReducedMotion();
  const controlled = dense !== undefined;

  const baseAngles = [0, 60, 120];
  const bloomAngles = [30, 90, 150];
  const line = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    const r = 40;
    return {
      x1: 50 - r * Math.cos(rad),
      y1: 50 - r * Math.sin(rad),
      x2: 50 + r * Math.cos(rad),
      y2: 50 + r * Math.sin(rad),
    };
  };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      initial={false}
      animate={controlled ? (dense ? "hover" : "rest") : "rest"}
      whileHover={controlled ? undefined : "hover"}
      variants={{
        rest: { rotate: 0 },
        hover: { rotate: 30 },
      }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
      style={{ originX: "50%", originY: "50%" }}
      aria-hidden
    >
      {baseAngles.map((a) => (
        <line
          key={a}
          {...line(a)}
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
      ))}
      {bloomAngles.map((a, i) => (
        <motion.line
          key={a}
          {...line(a)}
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.3, delay: i * 0.05, ease: "easeOut" }
          }
        />
      ))}
    </motion.svg>
  );
}
