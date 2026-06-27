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
      <motion.div {...fade(0)} className="flex items-center gap-5">
        <AsteriskMark className="h-14 w-14 shrink-0 text-ink" />
        <div>
          <h1
            className="font-serif text-3xl sm:text-4xl tracking-tight"
            style={{ fontVariationSettings: "'opsz' 88, 'wght' 500, 'SOFT' 0, 'WONK' 0" }}
          >
            Anton Castro
          </h1>
          <p className="mt-1 text-muted">Sr. Product Designer & Builder in San Francisco</p>
        </div>
      </motion.div>


      <motion.p {...fade(0.2)} className="mt-10 max-w-2xl text-lg sm:text-xl leading-relaxed">
        Welcome, I&apos;m Anton, a product designer building intuitive AI-native products
        for high-stakes work, where the real problem is{" "}
        <em className="font-serif italic text-accent">trust</em>. 0→1 four times across
        healthcare, fintech, and govtech. I design and ship in&nbsp;code, including{" "}
        <a
          href="https://github.com/acaspx/portfolio-chops"
          target="_blank"
          rel="noopener noreferrer"
          className="link-line text-ink"
        >
          this site
        </a>
        .
      </motion.p>
    </section>
  );
}
