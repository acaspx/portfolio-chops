"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Custoria's six-step vault flow as a scroll-driven section: on wide screens the
 * phone sticks while the steps scroll past it, and the screen crossfades to
 * whichever step is in focus. Below lg it degrades to a plain stacked list (no
 * scroll-jacking on a phone). Screens are all 600x1301, so they stack in one
 * fixed-aspect frame and swap with pure opacity, no layout shift.
 *
 * Visual language is inherited, not invented: mono step numerals and hairline
 * rules (the LegislativeLadder vocabulary), the per-case `phone-canvas` wash,
 * accent navy for the active state, and a six-segment progress meter that fills
 * as you move through the flow.
 */

type Step = { n: string; title: string; body: string; src: string; alt: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Capture",
    body: "Point the camera and take a few photos. No forms, no manual cataloging, the shortest path from an object to a record.",
    src: "/work/cu-capture.png",
    alt: "Custoria AI camera scan capturing photos of an item",
  },
  {
    n: "02",
    title: "Analyze",
    body: "One tap hands the photos to Gemini Flash. The unglamorous work happens here so the vault stays effortless.",
    src: "/work/cu-analyze.png",
    alt: "Photos captured, ready to analyze with AI",
  },
  {
    n: "03",
    title: "Identify",
    body: "The AI names the piece, prices it, and fills the metadata: value, brand, identification, categories and tags.",
    src: "/work/cu-identify.png",
    alt: "AI-identified Heath Ceramics wall clock valued at $180",
  },
  {
    n: "04",
    title: "Vault",
    body: "Everything you own, valued and searchable, encrypted and biometric-locked. Add a receipt or certificate and the record gets stronger.",
    src: "/work/cu-vault.png",
    alt: "My Vault showing total value and item list",
  },
  {
    n: "05",
    title: "Share",
    body: "Three dials: which fields a share exposes, how long the link lives, and whether you are named or anonymous.",
    src: "/work/cu-share.png",
    alt: "Ownership and sharing controls for an item",
  },
  {
    n: "06",
    title: "Prove",
    body: "Appraisal and proof-of-ownership reports on demand, each carrying the Custoria watermark and stamp of authenticity.",
    src: "/work/cu-prove.png",
    alt: "Generate appraisal and proof-of-ownership reports",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function VaultProcess() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (els.length === 0) return;
    // A narrow band across the viewport's middle: whichever step sits in it wins.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = els.indexOf(entry.target as HTMLLIElement);
          if (i !== -1) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <figure className="my-12">
      {/* Wide screens: sticky phone, scrolling steps */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,230px)_minmax(0,1fr)] lg:items-start lg:gap-10">
        <div className="lg:sticky lg:top-28">
          <div className="phone-canvas overflow-hidden rounded-2xl p-3.5">
            <div className="relative aspect-[600/1301] w-full overflow-hidden rounded-[1.6rem] border border-line/70 bg-paper shadow-lg">
              {STEPS.map((s, i) => (
                <motion.img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  aria-hidden={i !== active}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
            </div>
            {/* Progress meter: fills through the flow */}
            <div className="mt-3.5 flex gap-1" aria-hidden>
              {STEPS.map((s, i) => (
                <span
                  key={s.n}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                    i <= active ? "bg-accent" : "bg-line"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <ol className="pb-[28vh]">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="flex min-h-[58vh] flex-col justify-center"
            >
              <motion.div
                initial={false}
                animate={{ opacity: reduce || i === active ? 1 : 0.32 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[11px] tracking-widest transition-colors duration-300 ${
                      i === active ? "text-accent" : "text-muted"
                    }`}
                  >
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-3 text-2xl font-medium tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>

      {/* Phones and below: plain stacked list */}
      <ol className="space-y-10 lg:hidden">
        {STEPS.map((s) => (
          <li key={s.n}>
            <div className="phone-canvas overflow-hidden rounded-2xl p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="mx-auto block w-full max-w-[220px] rounded-[1.5rem] border border-line/70 shadow-md"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest text-accent">{s.n}</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <h3 className="mt-3 text-xl font-medium tracking-tight">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>

      <figcaption className="mt-8 text-center font-mono text-xs text-muted">
        Live on iOS: capture to vault, and the proof that travels with it.
      </figcaption>
    </figure>
  );
}
