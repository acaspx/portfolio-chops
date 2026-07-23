"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Custoria's six-step vault flow as a scroll-driven section. On wide screens
 * the whole stage is sticky: the phone holds still and the step text sits
 * beside it, and scrolling simply CROSSFADES both to the step in focus (no
 * text sliding up past the phone). Invisible full-height triggers behind the
 * stage give the scroll its distance; an IntersectionObserver band across the
 * viewport's middle picks the active step. Below lg it degrades to a plain
 * stacked list. Screens are 600x1301, so they swap on pure opacity with no
 * layout shift.
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
// Scroll distance per step, in vh. Higher = slower step changes.
const STEP_VH = 72;

export default function VaultProcess() {
  const [active, setActive] = useState(0);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const els = triggerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = els.indexOf(entry.target as HTMLDivElement);
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
      {/* Wide screens: sticky stage, scroll crossfades phone + text together */}
      <div
        className="relative hidden lg:block"
        style={{ height: `${STEPS.length * STEP_VH + 28}vh` }}
      >
        {/* Invisible scroll triggers behind the stage */}
        <div aria-hidden className="absolute inset-0">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              style={{ height: `${STEP_VH}vh` }}
            />
          ))}
        </div>

        <div className="sticky top-24 flex h-[calc(100vh-8rem)] items-center">
          <div className="grid w-full grid-cols-[minmax(0,300px)_minmax(0,1fr)] items-center gap-12">
            {/* Phone: holds still, screen crossfades */}
            <div>
              <div className="phone-canvas overflow-hidden rounded-2xl p-4">
                <div className="relative aspect-[600/1301] w-full overflow-hidden rounded-[1.8rem] border border-line/70 bg-paper shadow-lg">
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
                {/* Progress meter */}
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

            {/* Text: fixed in place, crossfades between steps */}
            <div className="relative h-56 max-w-[24rem]">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.n}
                  aria-hidden={i !== active}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                  className={`absolute inset-0 flex flex-col justify-center ${
                    i === active ? "" : "pointer-events-none"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-widest text-accent">
                      {s.n}
                    </span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
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
