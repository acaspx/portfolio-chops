"use client";

/**
 * FluidHoverHighlight, from Fluid Functionalism by @micka_design
 * (https://www.fluidfunctionalism.com/docs/fluid-hover). The one hover fill a fluid
 * hover list renders: absolutely positioned, springing between the rects
 * useFluidHover measures. Adapted for this site: no `cn` helper, and the fill colour
 * comes from the consumer's className (this site has no `bg-hover` token).
 *
 *   const hover = useFluidHover(ref);
 *   <FluidHoverHighlight hover={hover} className="rounded-md bg-ink/[0.05]" />
 *
 * The container must be `relative`; radius, colour and z-index are the consumer's.
 */

import { motion, AnimatePresence, useReducedMotion, type Transition } from "motion/react";
import { spring } from "@/lib/springs";
import type { ItemRect, UseFluidHoverReturn } from "@/hooks/use-fluid-hover";

export type FluidHoverSource = Pick<UseFluidHoverReturn, "activeIndex" | "itemRects" | "isMeasured" | "session">;

export interface FluidHoverHighlightProps {
  /** The hook's return value. */
  hover: FluidHoverSource;
  /** Keep the list's state but show nothing. Runs the exit fade. */
  hidden?: boolean;
  /** Where a fresh session fades in from. Defaults to the rect itself. */
  from?: ItemRect | null;
  /** Radius, colour, z-index. Merged onto `pointer-events-none absolute left-0 top-0`. */
  className?: string;
  /** The positional spring (default spring.fast). `false` snaps with no travel. */
  transition?: Transition | false;
}

const fade: Transition = { duration: 0.08 };
const snap: Transition = { duration: 0 };

const toTarget = (rect: ItemRect) => ({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });

/** Reduced motion keeps the opacity fade and drops the travel. */
function resolveTransition(transition: Transition | false | undefined, reduceMotion: boolean): Transition {
  const positional = transition === false || reduceMotion ? snap : (transition ?? spring.fast);
  return { ...positional, opacity: fade };
}

export function FluidHoverHighlight({ hover, hidden, from, className, transition }: FluidHoverHighlightProps) {
  const { activeIndex, itemRects, isMeasured, session } = hover;
  const rect = !hidden && isMeasured && activeIndex !== null ? (itemRects[activeIndex] ?? null) : null;
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <AnimatePresence>
      {rect && (
        <motion.div
          key={session}
          data-slot="fluid-hover-highlight"
          aria-hidden
          // Pinned to the container's corner and moved with a transform, so the
          // travel runs on the compositor.
          className={`pointer-events-none absolute left-0 top-0 ${className ?? ""}`}
          initial={{ opacity: 0, ...toTarget(from ?? rect) }}
          animate={{ opacity: 1, ...toTarget(rect) }}
          exit={{ opacity: 0, transition: spring.fast.exit }}
          transition={resolveTransition(transition, reduceMotion)}
        />
      )}
    </AnimatePresence>
  );
}
