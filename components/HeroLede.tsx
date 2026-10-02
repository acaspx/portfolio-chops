"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The hero lede, revealing as a single unit: it blurs in with a small upward
 * drift. One blur clearing reads calmer and far lighter than a per-word
 * cascade. Shared by desktop and mobile.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroLede({
  leadClassName = "mt-6 max-w-lg text-lg leading-relaxed text-balance sm:mt-10 sm:text-xl",
}: {
  leadClassName?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.p
      initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      style={{ willChange: "filter, transform" }}
      className={leadClassName}
    >
      Designing products for high-stakes work, where the real challenge is
      building <em className="font-serif italic text-accent">trust</em>. Four
      0→1s across healthcare, fintech, and govtech.
    </motion.p>
  );
}
