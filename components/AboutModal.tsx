"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Card = {
  kicker: string;
  title: string;
  body: string[];
  visual: "photo" | "principles" | "tools" | "service";
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
  },
  {
    kicker: "HOW",
    title: "I work",
    body: [
      "Design for consistency, build for flexibility. Every product I ship leaves behind a system the team can move fast in.",
      "The prototype is the argument — I settle design debates in code, not decks.",
    ],
    visual: "principles",
  },
  {
    kicker: "WHAT",
    title: "I build with",
    body: [
      "Figma to Framer to React and Swift — these days deep into AI-assisted prototyping with Claude and Cursor.",
      "Four AI products taught me the hard problem isn't the model — it's deciding what the AI does alone, and where people stay in the loop.",
    ],
    visual: "tools",
  },
  {
    kicker: "BEFORE",
    title: "All this",
    body: [
      "U.S. Navy engineer, four years — where I learned that systems fail at their seams, and discipline is a design material.",
      "BFA in Human-Computer Interaction, MBA in Design Strategy. Always up for a coffee chat. ☕",
    ],
    visual: "service",
  },
];

function CardVisual({ kind }: { kind: Card["visual"] }) {
  if (kind === "photo") {
    return (
      <div className="relative h-full min-h-[220px] overflow-hidden rounded-xl border border-line bg-ink/[0.04]">
        {/* TODO(Anton): drop public/about-photo.jpg and swap for <Image fill /> */}
        <div className="grid h-full place-items-center font-mono text-xs text-muted">
          about-photo.jpg
        </div>
        <div className="checker absolute inset-x-0 top-0 h-6" aria-hidden />
        <div className="checker absolute inset-x-0 bottom-0 h-6" aria-hidden />
      </div>
    );
  }
  const glyph = kind === "principles" ? "◳" : kind === "tools" ? "⌘" : "⚓";
  return (
    <div className="relative grid h-full min-h-[220px] place-items-center overflow-hidden rounded-xl border border-line bg-ink/[0.04]">
      <span aria-hidden className="text-7xl text-accent/70">
        {glyph}
      </span>
      <div className="checker absolute inset-x-0 bottom-0 h-6" aria-hidden />
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
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

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
      // Focus trap: keep Tab cycling inside the dialog
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-paper/70 backdrop-blur-md p-4"
          onClick={onClose}
        >
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
              className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-lg hover:text-accent"
            >
              ×
            </button>

            {/* Peeking next card */}
            <div
              aria-hidden
              className="absolute inset-x-3 -top-3 h-16 rounded-2xl border border-line bg-paper/90 px-8 pt-3 font-bold tracking-tight text-ink/30 overflow-hidden select-none"
            >
              {peek.kicker}
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={index}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={next}
                className="relative grid cursor-pointer gap-6 rounded-2xl border border-line bg-paper p-6 shadow-xl sm:grid-cols-[280px_1fr] sm:p-8"
              >
                <CardVisual kind={card.visual} />
                <div>
                  <p className="text-3xl font-bold tracking-tight leading-none">{card.kicker}</p>
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
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-6 bg-accent" : "w-2 bg-line hover:bg-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous card"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-paper hover:text-accent"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Next card"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-paper hover:text-accent"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
