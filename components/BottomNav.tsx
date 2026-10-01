"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import AboutModal from "@/components/AboutModal";
import ProfileCard, { Avatar } from "@/components/ProfileCard";

type Item = { label: string; href?: string; modal?: boolean };

const items: Item[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", modal: true },
];

/**
 * Compact floating bottom nav (prestonb.xyz pattern, this site's tokens):
 * a pill of links with a sliding active indicator, a hairline divider, and an
 * avatar button that opens the profile card upward. Replaces the old top bar
 * at every breakpoint.
 */
export default function BottomNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);

  // Sliding indicator: measured off the active item so it tracks real widths.
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const activeIndex = aboutOpen ? 2 : pathname?.startsWith("/work") ? 1 : 0;

  const measure = useCallback(() => {
    const el = itemRefs.current[activeIndex];
    const list = listRef.current;
    if (!el || !list) return;
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setPill({ left: a.left - b.left, width: a.width });
  }, [activeIndex]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <>
      {/* Fade so page content dissolves behind the floating pill */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[39] h-32"
        style={{
          background:
            "linear-gradient(to top, var(--color-paper) 0%, color-mix(in srgb, var(--color-paper) 70%, transparent) 45%, transparent 100%)",
        }}
      />

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-6 z-50 flex justify-center pb-[env(safe-area-inset-bottom)] sm:bottom-8"
      >
        <div className="relative">
          <ProfileCard
            open={cardOpen}
            onClose={() => setCardOpen(false)}
            anchorRef={avatarRef}
          />

          <div className="emboss relative z-10 flex items-center gap-1 rounded-full bg-paper/85 p-2 backdrop-blur-xl">
            <div ref={listRef} className="relative flex items-center">
              {pill && (
                <motion.span
                  aria-hidden
                  className="absolute h-10 rounded-full bg-accent/[0.07]"
                  initial={false}
                  animate={{ left: pill.left, width: pill.width }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 36 }
                  }
                />
              )}

              {items.map((it, idx) => {
                const active = idx === activeIndex;
                const cls = `relative z-10 px-4 py-2 text-sm transition-colors duration-150 sm:px-5 ${
                  active ? "font-semibold text-ink" : "font-medium text-muted hover:text-ink"
                }`;
                if (it.modal) {
                  return (
                    <button
                      key={it.label}
                      type="button"
                      ref={(el) => {
                        itemRefs.current[idx] = el;
                      }}
                      onClick={() => {
                        setCardOpen(false);
                        setAboutOpen(true);
                      }}
                      className={cls}
                    >
                      {it.label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={it.label}
                    href={it.href!}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    onClick={() => setCardOpen(false)}
                    className={cls}
                  >
                    {it.label}
                  </Link>
                );
              })}
            </div>

            <span aria-hidden className="mx-2 h-6 w-px bg-line" />

            <button
              ref={avatarRef}
              type="button"
              onClick={() => setCardOpen((o) => !o)}
              aria-haspopup="dialog"
              aria-expanded={cardOpen}
              aria-label="About Anton Castro, and ways to get in touch"
              className={`relative size-10 overflow-hidden rounded-full ring-2 transition-[box-shadow,transform] duration-200 hover:scale-[1.04] active:scale-[0.97] ${
                cardOpen ? "ring-accent" : "ring-line hover:ring-accent/40"
              }`}
            >
              <Avatar className="h-full w-full text-sm" />
            </button>
          </div>
        </div>
      </nav>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
