"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Allura } from "next/font/google";

const signature = Allura({ weight: "400", subsets: ["latin"], display: "swap" });

/**
 * About overlay. Instead of a stack of cards, the whole page becomes the
 * backdrop: the home behind blurs out, and Anton's four about photos wash across
 * it, heavily blurred with a soft color bleed. A single crisp lead photo and a
 * column of frosted-glass panels float on top, carrying the same copy and type
 * treatment (mono kicker, serif italic title) as the rest of the site.
 */

// Photos washed across the backdrop, blurred. Color versions read richer here.
const BACKDROP = [
  { src: "/about-photo.jpg", className: "left-[-14vw] top-[-6vh] h-[62vh] w-[42vw]" },
  { src: "/how-i-work.jpg", className: "right-[-12vw] top-[8vh] h-[58vh] w-[40vw]" },
  { src: "/build-with.jpg", className: "left-[6vw] bottom-[-10vh] h-[56vh] w-[38vw]" },
  { src: "/military-1.jpg", className: "right-[2vw] bottom-[-8vh] h-[54vh] w-[40vw]" },
];

const WORKED_WITH = [
  ["State Affairs", "Augmedix"],
  ["Custoria Labs", "Rocket"],
  ["Intuit", "Anti-Defamation League"],
  ["Electronic Arts", "U.S. Navy"],
];

type PanelProps = {
  kicker?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  image?: { src: string; alt: string };
};

function Panel({ kicker, title, children, className = "", image }: PanelProps) {
  return (
    <section
      className={`rounded-2xl border border-white/60 bg-white/55 p-6 shadow-[0_8px_30px_rgba(20,20,15,0.06)] backdrop-blur-xl sm:p-7 ${className}`}
    >
      {kicker && (
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{kicker}</p>
      )}
      {title && (
        <p className="mt-1 font-serif text-2xl italic tracking-tight text-ink/85">{title}</p>
      )}
      {image && (
        <div className={`${kicker || title ? "mt-4" : ""} overflow-hidden rounded-xl border border-white/60`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="block w-full" />
        </div>
      )}
      <div className={`${kicker || title || image ? "mt-4" : ""} space-y-4 text-[15px] leading-relaxed text-muted`}>
        {children}
      </div>
    </section>
  );
}

export default function AboutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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

  // Portaled to <body> so position:fixed isn't trapped by the sticky nav's
  // backdrop-filter containing block.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-2xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="About Anton Castro"
        >
          {/* Blurred image wash: the about photos overlaid on the home screen */}
          <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-paper/60" />
            {BACKDROP.map((b) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={b.src}
                src={b.src}
                alt=""
                className={`absolute rounded-[40%] object-cover opacity-45 saturate-[1.4] ${b.className}`}
                style={{ filter: "blur(80px)" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ))}
            {/* Soft color bleed + paper legibility wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-violet-400/[0.10]" />
            <div className="absolute inset-0 bg-paper/25" />
          </div>

          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="fixed right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/70 text-2xl shadow-md backdrop-blur-md transition-transform hover:scale-105 hover:text-accent sm:right-6 sm:top-6"
          >
            ×
          </button>

          {/* Centered content column */}
          <div className="relative mx-auto min-h-full max-w-lg px-4 py-16 sm:py-20">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="space-y-3"
            >
              {/* Crisp lead photo */}
              <div className="overflow-hidden rounded-2xl border border-white/60 shadow-[0_10px_40px_rgba(20,20,15,0.12)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about-photo-bw.jpg"
                  alt="Anton Castro"
                  className="block w-full"
                />
              </div>

              <Panel kicker="Who" title="I am">
                <p>
                  Bienvenue! I&apos;m Anton, a passionate designer, dialed in on making
                  technology look and feel great, no matter the context.
                </p>
                <p>
                  Currently Sr. Interaction Designer at State Affairs, building policy
                  intelligence, the company&apos;s first AI product. Before that: founding
                  designer twice, and AI products at Augmedix, Rocket, and Intuit.
                </p>
              </Panel>

              <Panel kicker="Worked with" className="!pb-6">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] leading-relaxed text-ink/80">
                  {WORKED_WITH.flat().map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </div>
              </Panel>

              <Panel
                kicker="How"
                title="I work"
                image={{ src: "/how-i-work.jpg", alt: "Anton leading a working session, mapping the problem before any pixels" }}
              >
                <p>
                  I lead with the story. Before any pixels, I make the problem legible:
                  what&apos;s broken, who it&apos;s hurting, and why it&apos;s worth solving now.
                  Clarity is the unlock.
                </p>
                <p>
                  From there I build momentum. Sharp narratives and working prototypes bring
                  people along, turn ambiguity into shared direction, and get the work that
                  matters shipped.
                </p>
              </Panel>

              <Panel
                kicker="What"
                title="I build with"
                image={{ src: "/build-with.jpg", alt: "The tools of the craft, from Figma and Framer to React, Swift, and AI-assisted prototyping" }}
              >
                <p>
                  Figma to Framer to React and Swift, and these days deep into AI-assisted
                  prototyping with Claude and Cursor.
                </p>
                <p>
                  Four AI products taught me the hard problem isn&apos;t the model. It&apos;s
                  deciding what the AI does alone, and where people stay in the loop.
                </p>
              </Panel>

              <Panel
                kicker="Before"
                title="All this"
                image={{ src: "/military-1-bw.jpg", alt: "Anton during his four years as a U.S. Navy engineer" }}
              >
                <p>
                  U.S. Navy engineer, four years. That&apos;s where I learned that systems fail
                  at their seams, and discipline is a design material.
                </p>
                <p>BFA in Human-Computer Interaction, MBA in Design Strategy.</p>
              </Panel>

              <Panel>
                <p className="text-ink/80">
                  Always up for a coffee chat. ☕{" "}
                  <a
                    href="mailto:ac.design.px@gmail.com"
                    className="text-accent underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    ac.design.px@gmail.com
                  </a>
                </p>
                <motion.p
                  aria-label="Anton Castro"
                  initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`${signature.className} mt-2 text-accent`}
                  style={{ fontSize: "3.5rem", lineHeight: 1.1 }}
                >
                  Anton Castro
                </motion.p>
              </Panel>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
