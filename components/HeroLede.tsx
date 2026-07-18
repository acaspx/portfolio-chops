"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The hero lede in two tiers, each revealing as a single unit: the header block
 * and the mono status line blur in with a small upward drift, the status line
 * staggered just behind. One blur clearing per tier reads calmer, smoother, and
 * far lighter than a per-word cascade. Shared by desktop and mobile.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroLede({
  leadClassName = "mt-10 max-w-lg text-lg sm:text-xl leading-relaxed text-balance",
  statusClassName = "mt-5 font-mono text-xs sm:text-sm tracking-wide text-muted",
}: {
  leadClassName?: string;
  statusClassName?: string;
}) {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 12, filter: "blur(8px)" } as const),
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, delay, ease: EASE },
    style: { willChange: "filter, transform" },
  });

  return (
    <>
      <motion.p {...rise(0.1)} className={leadClassName}>
        Designing AI-native products for high-stakes work, where the real challenge
        is building <em className="font-serif italic text-accent">trust</em>. Four
        0→1s across healthcare, fintech, and govtech.
      </motion.p>
      <motion.p {...rise(0.3)} className={statusClassName}>
        Currently building AI systems at State Affairs
      </motion.p>
    </>
  );
}
