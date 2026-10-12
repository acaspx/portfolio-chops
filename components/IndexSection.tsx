"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CaseGateLink from "@/components/CaseGateLink";

export type IndexItem = {
  label: string;
  /** Right column. Carries the outcome, not a date: in a list this is the proof. */
  meta: string;
  href?: string;
  external?: boolean;
  locked?: boolean;
  /** Shown beside the column on hover. Omit for rows with nothing to show. */
  img?: string;
  alt?: string;
};

/**
 * Dense index section: a quiet label over rows of label-left, meta-right.
 *
 * The hover preview lives in the dead space beside the narrow column rather
 * than inside it, so the list keeps its density and the work is still one
 * gesture away. It is keyboard-reachable too (focus drives it, not just
 * pointer), and it never renders under prefers-reduced-motion or on touch,
 * where there is no hover to trigger it and no room to put it.
 */
export default function IndexSection({
  title,
  items,
}: {
  title: string;
  items: IndexItem[];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  const shown = active !== null ? items[active] : null;
  const top =
    active !== null && rowRefs.current[active] && listRef.current
      ? rowRefs.current[active]!.offsetTop
      : 0;

  return (
    <section className="mt-12 first:mt-0">
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">{title}</h2>

      <ul ref={listRef} className="relative mt-3">
        {items.map((it, i) => {
          const inner = (
            <>
              <span className="truncate">{it.label}</span>
              <span className="shrink-0 pl-6 text-right font-mono text-[12px] text-muted">
                {it.meta}
              </span>
            </>
          );
          const rowCls =
            "flex items-baseline justify-between gap-2 py-[7px] text-[15px] transition-colors";

          return (
            <li
              key={it.label}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              {it.locked && it.href ? (
                <CaseGateLink
                  href={it.href}
                  locked
                  ariaLabel={`Unlock the ${it.label} case study`}
                  className={`${rowCls} w-full text-left hover:text-accent`}
                >
                  {inner}
                </CaseGateLink>
              ) : it.href ? (
                <Link
                  href={it.href}
                  {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`${rowCls} hover:text-accent`}
                >
                  {inner}
                </Link>
              ) : (
                <div className={rowCls}>{inner}</div>
              )}
            </li>
          );
        })}

        {/* Preview, parked in the margin beside the column. */}
        <AnimatePresence>
          {shown?.img && (
            <motion.div
              key={shown.label}
              aria-hidden
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ top: top - 44 }}
              className="pointer-events-none absolute left-full ml-12 hidden w-[17rem] lg:block"
            >
              <div className="rounded-[7px] bg-white p-[6px] shadow-[0_14px_30px_-10px_rgba(22,20,15,0.3)] ring-1 ring-ink/[0.06]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shown.img}
                  alt={shown.alt ?? ""}
                  className="aspect-[16/11] w-full rounded-[3px] object-cover object-top"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </section>
  );
}
