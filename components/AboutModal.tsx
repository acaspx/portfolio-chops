"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Card = {
  kicker: string;
  title: string;
  body: string[];
  visual: "photo" | "principles" | "tools" | "service";
  tint: string; // per-card accent for checkers + subtle gradient
};

const cards: Card[] = [
  {
    kicker: "WHO",
    title: "I am",
    body: [
      "My name is Anton, and I design AI products that ship and scale.",
      "Currently Sr. Interaction Designer at State Affairs, building policy intelligence — the company's first AI product. Before that: founding designer twice, and AI products at Augmedix, Rocket, and Intuit.",
    ],
    visual: "photo",
    tint: "#2447ff",
  },
  {
    kicker: "HOW",
    title: "I work",
    body: [
      "Design for consistency, build for flexibility. Every product I ship leaves behind a system the team can move fast in.",
      "The prototype is the argument — I settle design debates in code, not decks.",
    ],
    visual: "principles",
    tint: "#15803d",
  },
  {
    kicker: "WHAT",
    title: "I build with",
    body: [
      "Figma to Framer to React and Swift — these days deep into AI-assisted prototyping with Claude and Cursor.",
      "Four AI products taught me the hard problem isn't the model — it's deciding what the AI does alone, and where people stay in the loop.",
    ],
    visual: "tools",
    tint: "#b45309",
  },
  {
    kicker: "BEFORE",
    title: "All this",
    body: [
      "U.S. Navy engineer, four years — where I learned that systems fail at their seams, and discipline is a design material.",
      "BFA in Human-Computer Interaction, MBA in Design Strategy. Always up for a coffee chat. ☕",
    ],
    visual: "service",
    tint: "#be185d",
  },
];

function CardVisual({ kind, tint }: { kind: Card["visual"]; tint: string }) {
  const glyph =
    kind === "principles" ? "◳" : kind === "tools" ? "⌘" : kind === "service" ? "⚓" : null;
  return (
    <div
      className="relative h-full min-h-[260px] overflow-hidden rounded-xl sm:min-h-[320px]"
      style={{ background: `linear-gradient(160deg, ${tint}14 0%, ${tint}30 100%)` }}
    >
      {kind === "photo" ? (
        // Drop public/about-photo.jpg (speaking photo); placeholder shows until then
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/about-photo.jpg"
          alt="Anton Castro speaking on stage"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div className="grid h-full place-items-center">
          <span aria-hidden className="text-7xl" style={{ color: tint }}>
            {glyph}
          </span>
        </div>
      )}
      <div className="checker absolute inset-x-0 top-0 h-6" style={{ color: tint }} aria-hidden />
      <div className="checker absolute inset-x-0 bottom-0 h-6" style={{ color: tint }} aria-hidden />
    </div>
  );
}

export default function AboutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Portal target only exists client-side
  useEffect(() => setMounted(true), []);

  const next = useCallback(() => setIndex((i) => (i + 1) % cards.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + cards.length) % cards.length), []);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, next, prev]);

  const card = cards[index];
  const peek = cards[(index + 1) % cards.length];

  if (!mounted) return null;

  // Portaled to <body>: the sticky header's backdrop-filter creates a CSS
  // containing block that would otherwise trap position:fixed inside it.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-paper/80 backdrop-blur-md p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Soft rainbow glow behind the deck */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[18%] h-64 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "linear-gradient(90deg, #f9a8d4, #fde68a, #86efac, #93c5fd, #d8b4fe)",
            }}
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="About Anton Castro"
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="fixed right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-line bg-paper text-2xl shadow-md transition-transform hover:scale-105 hover:text-accent"
            >
              ×
            </button>

            {/* Next card peeking from behind */}
            <div
              aria-hidden
              className="absolute inset-x-4 -top-4 h-20 overflow-hidden rounded-2xl border border-line bg-white/95 shadow-sm select-none"
            >
              <div className="checker h-4 w-1/2" style={{ color: peek.tint }} />
              <p className="px-7 pt-1.5 text-2xl font-bold tracking-tight text-ink/25">
                {peek.kicker}
              </p>
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={index}
                initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -28, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={next}
                className="relative grid cursor-pointer gap-6 rounded-2xl border border-line p-5 shadow-2xl sm:grid-cols-[300px_1fr] sm:p-6"
                style={{
                  background: `linear-gradient(150deg, #ffffff 55%, ${card.tint}0d 100%)`,
                }}
              >
                <CardVisual kind={card.visual} tint={card.tint} />
                <div className="py-1 sm:py-3">
                  <p className="text-4xl font-bold tracking-tight leading-none">{card.kicker}</p>
                  <p className="font-serif text-2xl italic tracking-tight text-ink/80">
                    {card.title}
                  </p>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
                    {card.body.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-2">
                {cards.map((c, i) => (
                  <button
                    key={c.kicker}
                    onClick={() => setIndex(i)}
                    aria-label={`Card ${i + 1}: ${c.kicker} ${c.title}`}
                    aria-current={i === index}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: i === index ? 24 : 8,
                      background: i === index ? card.tint : "var(--color-line)",
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous card"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper shadow-sm hover:text-accent"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Next card"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper shadow-sm hover:text-accent"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
