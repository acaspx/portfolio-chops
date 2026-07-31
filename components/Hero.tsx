"use client";

import { motion, useReducedMotion } from "motion/react";
import HeroLede from "@/components/HeroLede";
import HeroLoop from "@/components/HeroLoop";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-12">
        <div>
          <motion.div {...fade(0)}>
            <h1
              className="font-serif text-3xl sm:text-4xl tracking-tight"
              style={{ fontVariationSettings: "'opsz' 88, 'wght' 500, 'SOFT' 0, 'WONK' 0" }}
            >
              Anton Castro
            </h1>
            <p className="mt-1 text-muted">Sr. Product Designer & Builder in San Francisco</p>
          </motion.div>

          <HeroLede />
        </div>

        {/* The build loop: desktop only, in the hero's right half */}
        <div className="hidden lg:flex lg:justify-end">
          <HeroLoop />
        </div>
      </div>
    </section>
  );
}
