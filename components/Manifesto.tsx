"use client";

import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { Special_Elite } from "next/font/google";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const typewriter = Special_Elite({ weight: "400", subsets: ["latin"], display: "swap" });

/**
 * The manifesto: click the mosaic nameplate and a typewritten 4x6 index card
 * lands on the page. The card tilts toward the pointer (a few degrees, on a
 * spring) and a soft sheen slides across it, like card stock catching light.
 * Touch and reduced motion get a still card.
 *
 * Copy lives in MANIFESTO below; edit it freely. Paragraphs are separated by
 * blank strings so the card keeps an even typewritten rhythm.
 */

const MANIFESTO = {
  title: "Manifesto",
  number: "No. 1",
  paragraphs: [
    "Born and raised in New York, I learned design before I had a word for it.",
    "The city taught me systems. The subway map holds millions of plans at once, and Times Square and Union Square are where they collide. I'd stand at the chess tables watching strangers think three moves ahead.",
    "The Lower East Side taught me craft: small shops where every object was chosen on purpose. When the noise got loud, I biked the Williamsburg Bridge and stared at the water until something clicked.",
    "New York rewards the purpose-built, and the people who chase a dream on purpose. It isn't for the faint of heart. Neither is building.",
  ],
  note: "On the header: the mosaic nods to the subway tablets I read every day, and to Miotto Mosaic Art Studios, who hand-build mosaics for New York's stations.",
  signoff: "A.C.",
};

const LINE = 26; // px: the card's ruled line height, which the type sits on

function Card() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // pointer position over the card, -0.5..0.5 on each axis
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring);
  const sheenX = useSpring(useTransform(px, [-0.5, 0.5], ["15%", "85%"]), spring);
  const sheenY = useSpring(useTransform(py, [-0.5, 0.5], ["10%", "90%"]), spring);
  const sheen = useTransform(
    [sheenX, sheenY],
    ([x, y]) => `radial-gradient(50% 60% at ${x} ${y}, rgba(255,255,255,0.55), transparent 70%)`,
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} onClick={(e) => e.stopPropagation()}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotate: -6, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, rotate: -1.2, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, rotate: 2, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`${typewriter.className} relative w-[min(92vw,640px)] select-text overflow-hidden rounded-[3px] bg-[#fffdf6] px-7 pb-8 pt-6 text-[14.5px] text-[#2b2a26] shadow-[0_30px_60px_-20px_rgba(22,20,15,0.45),0_8px_18px_-8px_rgba(22,20,15,0.25),0_0_0_1px_rgba(22,20,15,0.06)] sm:px-10 sm:pb-10 sm:pt-7 sm:text-[15.5px]`}
      >
        {/* paper tooth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* sheen that follows the pointer */}
        {!reduce && <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: sheen }} />}

        <div className="relative" style={{ lineHeight: `${LINE}px` }}>
          {/* index-card rules: faint blue lines on the type's rhythm, one red
              line under the header; they run to the card's edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-7 -right-7 sm:-left-10 sm:-right-10"
            style={{
              top: LINE * 2 + 18, // rules start where the body text starts
              backgroundImage: `linear-gradient(transparent ${LINE - 1}px, rgba(70,120,190,0.16) ${LINE - 1}px)`,
              backgroundSize: `100% ${LINE}px`,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-7 -right-7 h-px bg-[#d9615a]/55 sm:-left-10 sm:-right-10"
            style={{ top: LINE * 2 + 17 }}
          />
          <div className="flex items-baseline justify-between" style={{ height: LINE * 2 }}>
            <h2 className="pt-3 text-[20px] uppercase tracking-[0.18em] sm:text-[22px]">{MANIFESTO.title}</h2>
            <span className="text-[13px] opacity-70">{MANIFESTO.number}</span>
          </div>
          <div className="mt-[18px]">
            {MANIFESTO.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mb-[26px] [text-wrap:pretty]">
                {p}
              </p>
            ))}
            <p className="mb-[26px] text-[0.92em] opacity-80 [text-wrap:pretty]">{MANIFESTO.note}</p>
            <p className="text-right">{MANIFESTO.signoff}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Wraps the nameplate: the whole mosaic becomes a button that opens the card.
 * The button sits over the artwork rather than around it, so the nameplate's
 * h1 stays a heading instead of ending up inside a button.
 */
export default function Manifesto({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="group relative">
        {children}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-label="Read Anton's manifesto"
          className="absolute inset-0 rounded-[4px] transition-[box-shadow,transform] duration-300 hover:-translate-y-px hover:shadow-[0_12px_28px_-14px_rgba(22,20,15,0.45)]"
        />
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 overflow-y-auto bg-paper/50 backdrop-blur-[6px]"
                onClick={() => setOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Manifesto"
              >
                <button
                  ref={closeRef}
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="fixed right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/70 text-2xl shadow-md backdrop-blur-md transition-transform hover:scale-105 hover:text-accent sm:right-6 sm:top-6"
                >
                  ×
                </button>
                {/* centred, but scrollable rather than clipped on short screens */}
                <div className="grid min-h-full place-items-center px-4 py-16">
                  <Card />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
