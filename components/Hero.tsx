"use client";

import { motion, useReducedMotion } from "motion/react";

const line1 = "Designs AI products";
const line2 = "that ship and scale.";

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };
  const word = {
    hidden: { opacity: 0, y: "0.6em" },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-36 sm:pb-28">
      <motion.p
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs uppercase tracking-widest text-muted"
      >
        Anton Castro — Product Designer & Design Engineer, San Francisco
      </motion.p>

      <motion.h1
        variants={reduce ? undefined : container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="mt-6 text-5xl sm:text-7xl font-medium tracking-tighter leading-[1.05]"
      >
        {[line1, line2].map((line, i) => (
          <span key={i} className="block overflow-hidden">
            {line.split(" ").map((w, j) => (
              <motion.span key={j} variants={word} className="inline-block mr-[0.25em]">
                {w === "ship" || w === "scale." ? (
                  <em className="not-italic text-accent">{w}</em>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 max-w-xl text-lg text-muted leading-relaxed"
      >
        From first prototype to design system to enterprise contract — I&apos;ve gone
        0→1 four times across healthcare, fintech, and govtech AI. I prototype in
        code and ship with engineers.
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-10 flex items-center gap-6"
      >
        <a
          href="#work"
          className="rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Selected work
        </a>
        <a href="mailto:ac.design.px@gmail.com" className="link-line text-sm text-muted hover:text-ink">
          Book a coffee chat →
        </a>
      </motion.div>
    </section>
  );
}
