"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * The hero lede in two tiers. Tier one (positioning + proof) reveals word by
 * word: each word eases up from the bottom as its blur clears, staggered in
 * reading order so the reveal sweeps left-to-right and down the block. Tier two
 * is a quiet mono status line that blurs in last. Shared by desktop and mobile
 * so the copy and motion stay identical.
 */

const LEAD: { w: string; accent?: boolean }[] = [
  { w: "Designing" },
  { w: "AI-native" },
  { w: "products" },
  { w: "for" },
  { w: "high-stakes" },
  { w: "work," },
  { w: "where" },
  { w: "the" },
  { w: "real" },
  { w: "challenge" },
  { w: "is" },
  { w: "building" },
  { w: "trust.", accent: true },
  { w: "Four" },
  { w: "0→1s" },
  { w: "across" },
  { w: "healthcare," },
  { w: "fintech," },
  { w: "and" },
  { w: "govtech." },
];

const START = 0.15;
const STEP = 0.03;
const EASE = [0.16, 1, 0.3, 1] as const;
const WORD_DURATION = 0.65;

export default function HeroLede({
  leadClassName = "mt-10 max-w-lg text-lg sm:text-xl leading-relaxed text-balance",
  statusClassName = "mt-5 font-mono text-xs sm:text-sm tracking-wide text-muted",
}: {
  leadClassName?: string;
  statusClassName?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      <p className={leadClassName}>
        {LEAD.map((t, i) => (
          <Fragment key={i}>
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: WORD_DURATION, delay: START + (LEAD.length - 1 - i) * STEP, ease: EASE }}
              className="inline-block"
            >
              {t.accent ? (
                <>
                  <em className="font-serif italic text-accent">trust</em>.
                </>
              ) : (
                t.w
              )}
            </motion.span>{" "}
          </Fragment>
        ))}
      </p>
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: START + LEAD.length * STEP + 0.15, ease: EASE }}
        className={statusClassName}
      >
        Currently building AI systems at State Affairs
      </motion.p>
    </>
  );
}
