"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Line-mask reveal: the child sits below a clipping edge and rises up into
 * place, so text appears to slide out from behind an edge (the julius.fm
 * treatment). The scroll trigger lives on the OUTER wrapper, which never moves,
 * so the IntersectionObserver detects it correctly; the inner child (translated
 * down and clipped) is what actually animates. Watching the moving child would
 * make it read as "never on screen" and leave the text stuck hidden.
 * Margins/spacing belong on `className` (the mask), not the child.
 */
export default function MaskReveal({
  children,
  delay = 0,
  duration = 0.72,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <motion.div
        style={{ willChange: "transform" }}
        variants={{ hidden: { y: "115%" }, show: { y: "0%" } }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
