"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Isometric line-art icons for the agentic stack, one per layer.
 *
 * Every icon shares the same wireframe cube: a hexagon silhouette in the
 * accent navy with three dotted spokes to the near vertex. The sage figure
 * inside is what differs, and it carries the concept:
 *
 *   context    a pulse falls from the apex into a lit floor plane   (ground it)
 *   reasoning  a pulse travels the tetrahedron's circuit            (reason over it)
 *   experience rays reach outward from the core to the far vertices (shape it)
 *
 * Motion is deliberately slow and single-idea: one thing moves per icon, and
 * nothing rotates, because spinning a fixed isometric projection in 2D breaks
 * the perspective it depends on.
 *
 * Geometry is shared so the three read as one family: center (32,32),
 * radius 26, vertices at 60 degree steps.
 */

const SAGE = "var(--color-sage)";
const EASE = [0.22, 1, 0.36, 1] as const;

/* Hexagon vertices, clockwise from the apex. */
const V = {
  top: [32, 6],
  upperRight: [54.5, 19],
  lowerRight: [54.5, 45],
  bottom: [32, 58],
  lowerLeft: [9.5, 45],
  upperLeft: [9.5, 19],
} as const;
const C = [32, 32] as const;

const HEX = `M${V.top} L${V.upperRight} L${V.lowerRight} L${V.bottom} L${V.lowerLeft} L${V.upperLeft} Z`;

/** The cube shell: silhouette plus the three hidden edges, same in all three. */
function Shell() {
  return (
    <g>
      <path
        d={HEX}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <g stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.4">
        <line x1={C[0]} y1={C[1]} x2={V.top[0]} y2={V.top[1]} />
        <line x1={C[0]} y1={C[1]} x2={V.lowerLeft[0]} y2={V.lowerLeft[1]} />
        <line x1={C[0]} y1={C[1]} x2={V.lowerRight[0]} y2={V.lowerRight[1]} />
      </g>
    </g>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full text-accent" aria-hidden>
      <Shell />
      {children}
    </svg>
  );
}

/**
 * A short lit segment that travels a closed path. pathLength fixes the visible
 * fraction and pathOffset slides it, which Motion maps onto stroke dash values.
 */
function Travel({ d, duration }: { d: string; duration: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={SAGE}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={0.16}
      initial={{ pathOffset: 0 }}
      animate={{ pathOffset: 1 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ---------------------------------------------------------- 01 · Context -- */
/* A pulse falls from the apex into the floor plane, which lights as it lands. */
function ContextIcon({ still }: { still: boolean }) {
  const floor = `M${V.lowerLeft} L${V.bottom} L${V.lowerRight} L${C} Z`;
  return (
    <Frame>
      <motion.path
        d={floor}
        fill={SAGE}
        stroke={SAGE}
        strokeWidth="1.6"
        strokeLinejoin="round"
        initial={false}
        animate={still ? { fillOpacity: 0.18 } : { fillOpacity: [0.08, 0.24, 0.08] }}
        transition={
          still ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {!still && (
        <motion.circle
          r="2.6"
          cx={C[0]}
          fill={SAGE}
          initial={{ cy: V.top[1] + 3, opacity: 0 }}
          animate={{ cy: [V.top[1] + 3, C[1]], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeIn",
            times: [0, 0.12, 0.55, 0.72],
          }}
        />
      )}
    </Frame>
  );
}

/* -------------------------------------------------------- 02 · Reasoning -- */
/* The reference tetrahedron, held still; a pulse circuits its outer edges. */
function ReasoningIcon({ still }: { still: boolean }) {
  const circuit = `M${V.upperLeft} L${V.upperRight} L${V.bottom} Z`;
  return (
    <Frame>
      <path
        d={circuit}
        fill={SAGE}
        fillOpacity="0.1"
        stroke={SAGE}
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.55"
      />
      {/* the inner edges that make it read as a solid, not a flat triangle */}
      <g stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" opacity="0.55">
        <line x1={V.upperLeft[0]} y1={V.upperLeft[1]} x2={C[0]} y2={C[1]} />
        <line x1={V.upperRight[0]} y1={V.upperRight[1]} x2={C[0]} y2={C[1]} />
        <line x1={V.bottom[0]} y1={V.bottom[1]} x2={C[0]} y2={C[1]} />
      </g>
      {!still && <Travel d={circuit} duration={7} />}
    </Frame>
  );
}

/* ------------------------------------------------------- 03 · Experience -- */
/* Rays reach outward from the core to the far vertices, one after another. */
function ExperienceIcon({ still }: { still: boolean }) {
  const rays = [V.upperLeft, V.top, V.upperRight] as const;
  return (
    <Frame>
      <path
        d={`M${V.upperLeft} L${V.top} L${V.upperRight} L${C} Z`}
        fill={SAGE}
        fillOpacity="0.1"
        stroke="none"
      />
      <g stroke={SAGE} strokeWidth="1.8" strokeLinecap="round">
        {rays.map(([x, y], i) => (
          <motion.line
            key={i}
            x1={C[0]}
            y1={C[1]}
            x2={x}
            y2={y}
            initial={still ? false : { pathLength: 0, opacity: 0 }}
            animate={
              still ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 1, 1, 1], opacity: [0, 1, 1, 0] }
            }
            transition={{
              duration: 4.6,
              repeat: Infinity,
              repeatDelay: 0.9,
              delay: i * 0.45,
              ease: EASE,
              times: [0, 0.35, 0.78, 1],
            }}
          />
        ))}
      </g>
      <circle cx={C[0]} cy={C[1]} r="3" fill={SAGE} />
    </Frame>
  );
}

const icons = {
  context: ContextIcon,
  reasoning: ReasoningIcon,
  experience: ExperienceIcon,
} as const;

export type StackIconName = keyof typeof icons;

export default function StackIcon({ name }: { name: StackIconName }) {
  const still = !!useReducedMotion();
  const Icon = icons[name];
  return <Icon still={still} />;
}
