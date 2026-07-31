"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The hero's right-side loop: Voice, Visual, Code cascading inside a large
 * return loop (after the reference composition), recast in the site's ink
 * navy with the brand asterisk slowly spinning at the hub. Reveals once on
 * load, timed to land just after the lede settles: the loop draws itself,
 * then each stage and connector eases in down the cascade. Reduced-motion
 * renders the finished diagram, no spin.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const NAVY = "#1e2a44";

// Reveal timing (s): loop draw, then the cascade.
const T = { arc: 0.5, voice: 1.3, a1: 1.6, visual: 1.9, a2: 2.2, code: 2.5, a3: 2.8 };

export default function HeroLoop() {
  const reduce = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 8 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <svg
      viewBox="0 0 490 480"
      className="h-auto w-full max-w-[400px]"
      role="img"
      aria-label="Anton's build loop: voice, visual, and code cycling into each other"
    >
      <defs>
        <marker
          id="loop-head"
          viewBox="0 0 10 10"
          refX="6.5"
          refY="5"
          markerWidth="5.2"
          markerHeight="5.2"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={NAVY} />
        </marker>
      </defs>

      {/* Large return loop, drawn in */}
      <motion.path
        d="M 309 375 A 170 170 0 1 1 252 88"
        fill="none"
        stroke={NAVY}
        strokeWidth="6"
        strokeLinecap="round"
        markerEnd="url(#loop-head)"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: T.arc, ease: EASE }}
      />

      {/* Spinning asterisk hub, small as before. Hover blooms it from 6 rays
          to 12 with a gentle turn, mirroring the nav logo's behavior, drawn
          natively at this scale (nesting the AsteriskMark svg missized it). */}
      <motion.g
        style={{ transformOrigin: "200px 245px" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 30, ease: "linear", repeat: Infinity }}
      >
        <motion.g
          initial="rest"
          animate="rest"
          whileHover={reduce ? undefined : "hover"}
          variants={{ rest: { rotate: 0 }, hover: { rotate: 30 } }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ transformOrigin: "200px 245px" }}
          stroke={NAVY}
          strokeWidth="8"
          strokeLinecap="round"
        >
          {/* Generous invisible hover target */}
          <circle cx="200" cy="245" r="62" fill="transparent" stroke="none" style={{ pointerEvents: "all" }} />
          {/* Base rays */}
          <line x1="200" y1="197" x2="200" y2="293" />
          <line x1="159" y1="221" x2="241" y2="269" />
          <line x1="159" y1="269" x2="241" y2="221" />
          {/* Bloom rays */}
          {[
            { x1: 152, y1: 245, x2: 248, y2: 245 },
            { x1: 176, y1: 203.4, x2: 224, y2: 286.6 },
            { x1: 224, y1: 203.4, x2: 176, y2: 286.6 },
          ].map((l, i) => (
            <motion.line
              key={i}
              {...l}
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
            />
          ))}
        </motion.g>
      </motion.g>

      {/* The cascade: Voice -> Visual -> Code, with Code feeding back to Visual */}
      <motion.text
        {...fade(T.voice)}
        x="368"
        y="102"
        textAnchor="middle"
        className="font-mono"
        fontSize="19"
        fontWeight="600"
        letterSpacing="0.1em"
        fill={NAVY}
      >
        VOICE
      </motion.text>
      <motion.path
        {...fade(T.a1)}
        d="M 412 118 Q 452 152 438 202"
        fill="none"
        stroke={NAVY}
        strokeWidth="5"
        strokeLinecap="round"
        markerEnd="url(#loop-head)"
      />
      <motion.text
        {...fade(T.visual)}
        x="420"
        y="245"
        textAnchor="middle"
        className="font-mono"
        fontSize="19"
        fontWeight="600"
        letterSpacing="0.1em"
        fill={NAVY}
      >
        VISUAL
      </motion.text>
      <motion.path
        {...fade(T.a2)}
        d="M 435 268 Q 440 330 380 348"
        fill="none"
        stroke={NAVY}
        strokeWidth="5"
        strokeLinecap="round"
        markerEnd="url(#loop-head)"
      />
      <motion.text
        {...fade(T.code)}
        x="330"
        y="360"
        textAnchor="middle"
        className="font-mono"
        fontSize="19"
        fontWeight="600"
        letterSpacing="0.1em"
        fill={NAVY}
      >
        CODE
      </motion.text>
      <motion.path
        {...fade(T.a3)}
        d="M 320 322 Q 326 262 366 246"
        fill="none"
        stroke={NAVY}
        strokeWidth="5"
        strokeLinecap="round"
        markerEnd="url(#loop-head)"
      />
    </svg>
  );
}
