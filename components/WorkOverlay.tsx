"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CaseGateLink from "@/components/CaseGateLink";
import { work, more } from "@/lib/projects";
import type { IndexItem } from "@/components/IndexSection";

/**
 * Work overlay, opened from the floating nav. The six projects as preview
 * cards in a 3x2 grid (2 columns on tablet, 1 on phones) over the same blurred
 * backdrop as the About overlay. Each card links to its case study, or to the
 * live project for side projects; the locked case opens the password gate,
 * which sits above this overlay.
 *
 * Card anatomy, after the reference but in this site's tokens: a hairline
 * frame with small square registration marks at its corners holding the
 * image, then a mono "01 / 06" index, the title with an arrow, and a mono
 * company · years line.
 */

const PROJECTS: IndexItem[] = [...work, ...more].slice(0, 6);
const EASE = [0.22, 1, 0.36, 1] as const;

function CardLink({
  it,
  onNavigate,
  className,
  children,
}: {
  it: IndexItem;
  onNavigate: () => void;
  className: string;
  children: ReactNode;
}) {
  if (it.locked && it.href)
    return (
      <CaseGateLink
        href={it.href}
        locked
        ariaLabel={`Unlock the ${it.label} case study`}
        className={`${className} text-left`}
      >
        {children}
      </CaseGateLink>
    );
  return (
    <Link
      href={it.href ?? "/"}
      onClick={onNavigate}
      {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {children}
    </Link>
  );
}

/** A small square registration mark at one corner of the frame. */
const Mark = ({ pos }: { pos: string }) => (
  <span aria-hidden className={`absolute size-[5px] bg-ink/25 transition-colors group-hover:bg-accent ${pos}`} />
);

export default function WorkOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;
  const total = String(PROJECTS.length).padStart(2, "0");

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-3xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Selected work"
        >
          {/* neutral wash plus a faint accent glow behind the grid, like the
              light pooling in the reference */}
          <div aria-hidden className="pointer-events-none fixed inset-0 bg-paper/25" />
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0"
            style={{
              background:
                "radial-gradient(45% 40% at 50% 48%, color-mix(in srgb, var(--color-violet) 16%, transparent), transparent 70%)",
            }}
          />

          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="fixed right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/70 text-2xl shadow-md backdrop-blur-md transition-transform hover:scale-105 hover:text-accent sm:right-6 sm:top-6"
          >
            ×
          </button>

          <div className="relative mx-auto max-w-6xl px-5 pb-40 pt-20 sm:px-8 sm:pt-24" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Selected work</p>

            <ul className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((it, i) => (
                <motion.li
                  key={it.label}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: reduce ? 0 : 0.06 + i * 0.05, ease: EASE }}
                >
                  <CardLink it={it} onNavigate={onClose} className="group block w-full">
                    {/* frame with registration marks */}
                    <div className="relative border border-ink/10 p-2 transition-colors duration-300 group-hover:border-accent/30">
                      <Mark pos="-left-[3px] -top-[3px]" />
                      <Mark pos="-right-[3px] -top-[3px]" />
                      <Mark pos="-bottom-[3px] -left-[3px]" />
                      <Mark pos="-bottom-[3px] -right-[3px]" />
                      <div className="relative aspect-[16/11] overflow-hidden rounded-[3px] bg-ink/[0.04]">
                        {it.img && (
                          <Image
                            src={it.img}
                            alt={it.alt ?? ""}
                            fill
                            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                        )}
                      </div>
                    </div>

                    <p className="mt-5 font-mono text-[12px] tracking-widest text-muted">
                      {String(i + 1).padStart(2, "0")} / {total}
                    </p>
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <h3 className="text-[22px] leading-tight tracking-tight text-ink transition-colors group-hover:text-accent">
                        {it.label}
                      </h3>
                      <span
                        aria-hidden
                        className="mt-1 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      >
                        ↗
                      </span>
                    </div>
                    {(it.company || it.years) && (
                      <p className="mt-2 font-mono text-[12px] uppercase tracking-widest text-muted">
                        {it.company}
                        {it.company && it.years && <span className="mx-2 opacity-60">·</span>}
                        {it.years}
                      </p>
                    )}
                  </CardLink>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
