"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Letterpress text-shadow: ink pressed into bone paper. */
const press = { textShadow: "0 1px 0 rgba(255,255,255,0.55)" } as const;

const EnvelopeIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);
const CoffeeIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M17 9h2.2a2.3 2.3 0 0 1 0 4.6H17" />
    <path d="M7 2.5v2M11 2.5v2M15 2.5v2" />
    <path d="M3 21h16" />
  </svg>
);
const LinkedInIcon = (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z" />
  </svg>
);

type Option = { label: string; value: string; href: string; external?: boolean; icon: ReactNode };

const options: Option[] = [
  { label: "Email", value: "ac.design.px@gmail.com", href: "mailto:ac.design.px@gmail.com", icon: EnvelopeIcon },
  { label: "Book a coffee chat", value: "30 minutes, on me", href: "https://calendly.com/ac-design-px/30min", external: true, icon: CoffeeIcon },
  { label: "LinkedIn", value: "in/antoncastroe", href: "https://www.linkedin.com/in/antoncastroe/", external: true, icon: LinkedInIcon },
];

const INK = "#23211c";
const BONE = "#e9e5db";
const RULE = "#cdc6b6";

/**
 * Contact "calling card" as an anchored popover (no screen overlay).
 * Renders below the Contact button; closes on click-away, Escape, or selection.
 * Position is set by the relative parent in the Nav.
 */
export default function ContactCard({
  open,
  onClose,
  anchorRef,
}: {
  open: boolean;
  onClose: () => void;
  anchorRef?: RefObject<HTMLButtonElement | null>;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const card = cardRef.current;
    const focusables = () =>
      card
        ? Array.from(
            card.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])')
          )
        : [];
    // Move focus into the card so keyboard users land on the first option.
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (card && !card.contains(t) && !anchorRef?.current?.contains(t)) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      // Return focus to the trigger when the card closes.
      anchorRef?.current?.focus();
    };
  }, [open, onClose, anchorRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={cardRef}
          role="dialog"
          aria-label="Contact Anton Castro"
          initial={reduce ? false : { opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: BONE,
            color: INK,
            border: "1px solid #d6d0c1",
            boxShadow: "0 18px 44px rgba(24,20,12,0.22), inset 0 1px 0 rgba(255,255,255,0.5)",
            transformOrigin: "top right",
          }}
          className="fixed inset-x-4 top-20 z-50 mx-auto max-w-sm overflow-hidden rounded-md px-7 py-7 text-left sm:absolute sm:inset-x-auto sm:right-5 sm:top-full sm:mx-0 sm:mt-3 sm:w-80 sm:max-w-[calc(100vw-2rem)]"
        >
          {/* paper grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Header: name + role, engraved */}
          <div className="text-center">
            <p className="font-serif text-xl tracking-[0.04em]" style={press}>
              Anton Castro
            </p>
            <p className="mt-1.5 font-serif text-[10px] uppercase tracking-[0.34em] opacity-70" style={press}>
              Lead Product Designer
            </p>
          </div>

          <div className="my-5 h-px w-full" style={{ background: RULE }} />

          {/* Contact options */}
          <ul className="-mx-2">
            {options.map((o) => (
              <li key={o.label}>
                <a
                  href={o.href}
                  {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={onClose}
                  className="group flex items-center gap-3.5 rounded px-2 py-2 transition-colors"
                  style={{ color: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(35,33,28,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{ border: `1px solid ${RULE}` }}>
                    {o.icon}
                  </span>
                  <span className="flex-1">
                    <span className="block font-serif text-[14px] leading-tight" style={press}>
                      {o.label}
                    </span>
                    <span className="block font-serif text-[11px] italic leading-tight opacity-55">
                      {o.value}
                    </span>
                  </span>
                  <span aria-hidden className="opacity-35 transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 h-px w-full" style={{ background: RULE }} />
          <p className="mt-3.5 text-center font-serif text-[9px] uppercase tracking-[0.32em] opacity-55" style={press}>
            Based in San Francisco
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
