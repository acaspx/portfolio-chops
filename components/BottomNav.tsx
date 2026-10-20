"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import AboutModal from "@/components/AboutModal";
import WorkOverlay from "@/components/WorkOverlay";
import ProfileCard, { Avatar } from "@/components/ProfileCard";

type Item = { label: string; href?: string; modal?: "work" | "about" };

const items: Item[] = [
  { label: "Home", href: "/" },
  { label: "Work", modal: "work" },
  { label: "About", modal: "about" },
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
  const [workOpen, setWorkOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);

  // Sliding indicator: measured off the active item so it tracks real widths.
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const activeIndex = aboutOpen ? 2 : workOpen || pathname?.startsWith("/work") ? 1 : 0;

  // Leaving the page (a case study opened from the Work overlay, or through
  // the password gate) closes the overlays behind it.
  useEffect(() => {
    setWorkOpen(false);
    setAboutOpen(false);
  }, [pathname]);

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
      {/* Progressive blur under the pill instead of an opaque wash, so what's
          coming next stays visible as you scroll, just softened. Three
          stacked layers, each blurring a little more and masked to a shorter
          band, ramp the blur up smoothly toward the bottom edge; a faint
          paper tint keeps the pill's edge legible over busy images. */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-[39] h-36">
        {[
          { blur: 2, from: 0, to: 100 },
          { blur: 6, from: 0, to: 70 },
          { blur: 12, from: 0, to: 40 },
        ].map((l) => (
          <div
            key={l.blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${l.blur}px)`,
              WebkitBackdropFilter: `blur(${l.blur}px)`,
              maskImage: `linear-gradient(to top, black ${l.from}%, transparent ${l.to}%)`,
              WebkitMaskImage: `linear-gradient(to top, black ${l.from}%, transparent ${l.to}%)`,
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--color-paper) 45%, transparent) 0%, color-mix(in srgb, var(--color-paper) 20%, transparent) 45%, transparent 100%)",
          }}
        />
      </div>

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

          <div
            className="relative z-10 flex items-center gap-1 rounded-[22px] bg-paper p-2 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(22,20,15,0.28),0_2px_6px_-2px_rgba(22,20,15,0.12),inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(22,20,15,0.09)]"
          >
            {/* iOS-notification corners: 22px on the bar, and the highlight
                inset 8px inside it at 14px, so the two curves stay concentric */}
            <div ref={listRef} className="relative flex items-center">
              {pill && (
                <motion.span
                  aria-hidden
                  className="absolute h-10 rounded-[14px] bg-accent/[0.07]"
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
                      aria-haspopup="dialog"
                      onClick={() => {
                        setCardOpen(false);
                        setAboutOpen(it.modal === "about");
                        setWorkOpen(it.modal === "work");
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
      <WorkOverlay open={workOpen} onClose={() => setWorkOpen(false)} />
    </>
  );
}
