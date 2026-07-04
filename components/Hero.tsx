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
          <AsteriskMark className="absolute -left-5 -top-5 h-8 w-8 text-accent sm:-left-7 sm:-top-6 sm:h-9 sm:w-9" />
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
        Welcome, I&apos;m Anton, a product designer building intuitive AI-native products
        for high-stakes work, where the real problem is{" "}
        <em className="font-serif italic text-accent">trust</em>.
        <br />
        0→1 four times across healthcare, fintech, and govtech.
      </motion.p>
    </section>
  );
}
