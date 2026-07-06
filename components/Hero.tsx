"use client";

import { motion, useReducedMotion } from "motion/react";
import AsteriskMark from "@/components/AsteriskMark";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28">
      <motion.div {...fade(0)}>
        <div className="relative inline-block">
          <AsteriskMark className="absolute -left-5 -top-4 h-7 w-7 text-accent sm:-left-6 sm:-top-5 sm:h-8 sm:w-8" />
          <h1
            className="font-serif text-3xl sm:text-4xl tracking-tight"
            style={{ fontVariationSettings: "'opsz' 88, 'wght' 500, 'SOFT' 0, 'WONK' 0" }}
          >
            Anton Castro
          </h1>
        </div>
        <p className="mt-1 text-muted">Sr. Product Designer & Builder in San Francisco</p>
      </motion.div>


      <motion.p {...fade(0.2)} className="mt-10 max-w-2xl text-lg sm:text-xl leading-relaxed">
        Designing AI-native products for high-stakes work, where the real challenge
        is building <em className="font-serif italic text-accent">trust</em>.
        <br />
        Four 0→1s across healthcare, fintech, and govtech. Currently building AI
        systems at State Affairs.
      </motion.p>
    </section>
  );
}
