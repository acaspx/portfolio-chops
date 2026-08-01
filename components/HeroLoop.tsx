"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The hero's right-side loop: Voice, Visual, Code cascading inside a large
 * return loop, recast in ink navy with the brand asterisk at the hub.
 *
 * Reveal choreography (once, on load):
 * 1. The asterisk scales up from nothing - the cue to watch.
 * 2. The loop draws itself; its arrowhead pops in only as the stroke arrives
 *    (a marker would float at the path's end the whole time).
 * 3. The cascade eases in stage by stage.
 * The hub then spins slowly forever, and blooms 6 -> 12 rays on hover like
 * the nav logo. Reduced-motion renders the finished static diagram.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const NAVY = "#1e2a44";

// Reveal timing (s): tighter overall, everything eases on the same curve.
const T = {
  mark: 0.2,
  arc: 0.55,
  arcDur: 1.1,
  head: 1.5,
  voice: 1.75,
  a1: 1.95,
  visual: 2.15,
  a2: 2.35,
  code: 2.55,
  a3: 2.75,
};

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
          id="loop-head-sm"
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

      {/* Large return loop, drawn in; head arrives with the stroke. Opacity
          gates the path until its draw starts: a zero-length round-capped
          stroke otherwise renders visible dots at both endpoints. */}
      <motion.path
        d="M 309 375 A 170 170 0 1 1 252 88"
        fill="none"
        stroke={NAVY}
        strokeWidth="6"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: T.arcDur, delay: T.arc, ease: EASE },
          opacity: { duration: 0.01, delay: T.arc },
        }}
      />
      <motion.g
        initial={reduce ? false : { opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, delay: T.head, ease: EASE }}
        style={{ transformOrigin: "252px 88px" }}
      >
        <path d="M0 -13 L26 0 L0 13 z" fill={NAVY} transform="translate(252,88) rotate(20)" />
      </motion.g>

      {/* Hub: eases in small-to-full first as the visual cue, then spins */}
      <motion.g
        initial={reduce ? false : { scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: T.mark, ease: EASE }}
        style={{ transformOrigin: "200px 245px" }}
      >
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
            <circle cx="200" cy="245" r="62" fill="transparent" stroke="none" style={{ pointerEvents: "all" }} />
            <line x1="200" y1="197" x2="200" y2="293" />
            <line x1="159" y1="221" x2="241" y2="269" />
            <line x1="159" y1="269" x2="241" y2="221" />
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
        markerEnd="url(#loop-head-sm)"
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
        markerEnd="url(#loop-head-sm)"
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
        markerEnd="url(#loop-head-sm)"
      />
    </svg>
  );
}
