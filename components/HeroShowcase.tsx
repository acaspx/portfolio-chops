"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Fills the hero's right void with proof, not decoration: a staggered fan of
 * three real product frames spanning the domains the lede claims (healthcare,
 * fintech, govtech). Floats in after the copy. Shown only on wide screens,
 * where the empty right half actually appears; the mobile hero is untouched.
 */

const CARDS = [
  {
    src: "/work/ax-platform.png",
    alt: "Augmedix AI clinical documentation platform",
    style: "left-10 top-0 rotate-[-6deg]",
  },
  {
    src: "/work/rk-parity.png",
    alt: "Rocket's Liv conversational AI onboarding",
    style: "left-0 top-[104px] rotate-[3.5deg]",
  },
  {
    src: "/work/sa-360-overview.png",
    alt: "State Affairs 360 policy-intelligence view",
    style: "left-14 top-[208px] rotate-[-2deg]",
  },
];

export default function HeroShowcase() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-2 top-16 hidden h-[440px] w-[380px] xl:block"
    >
      {CARDS.map((c, i) => (
        <motion.div
          key={c.src}
          initial={reduce ? false : { opacity: 0, y: 26, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute w-[300px] overflow-hidden rounded-xl border border-line bg-paper shadow-[0_18px_50px_rgba(20,20,15,0.18)] ${c.style}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.src} alt={c.alt} className="aspect-[16/10] w-full object-cover object-top" />
        </motion.div>
      ))}
    </div>
  );
}
