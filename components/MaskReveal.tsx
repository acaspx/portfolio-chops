"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Line-mask reveal: the child sits below a clipping box and rises up into place,
 * so text appears to slide out from behind an edge (the julius.fm treatment).
 * Triggers once as it enters view; margins/spacing belong on `className` (the
 * mask), never on the child, so the clip stays tight to the text.
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
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ willChange: "transform" }}
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
