"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Allura } from "next/font/google";
import GenerationReveal from "@/components/GenerationReveal";
import CardStack from "@/components/CardStack";

const signature = Allura({ weight: "400", subsets: ["latin"], display: "swap" });

/**
 * About overlay. Instead of a stack of cards, the whole page becomes the
 * backdrop: the home behind blurs out, and Anton's four about photos wash across
 * it, heavily blurred with a soft color bleed. A single crisp lead photo and a
 * column of frosted-glass panels float on top, carrying the same copy and type
 * treatment (mono kicker, serif italic title) as the rest of the site.
 */

const WORKED_WITH = [
  ["State Affairs", "Augmedix"],
  ["Custoria Labs", "Rocket"],
  ["Intuit", "Anti-Defamation League"],
  ["Electronic Arts", "U.S. Navy"],
];

// The deck column is max-w-lg (512px) less padding; full width minus gutters on phones.
const CARD_SIZES = "(max-width: 544px) calc(100vw - 32px), 480px";

type PanelProps = {
  kicker?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  image?: { src: string; alt: string };
  /** Pinned to the bottom of the card, below the body. */
  footer?: ReactNode;
};

/**
 * One card in the About deck. Every card fills the same fixed height set by
 * CardStack, laid out the same way: kicker and title at the top, image in the
 * middle taking whatever room the text leaves, body text at the bottom. The
 * image is the part that gives on small screens, so no card overflows and every
 * card in the deck is the same shape.
 *
 * Solid, not frosted: stacked glass would show the card beneath through it.
 * Text carries data-stack-text so it fades in as the card settles;
 * data-stack-dim darkens the card as the next one covers it.
 */
function Panel({ kicker, title, children, className = "", image, footer }: PanelProps) {
  return (
    <section
      data-gen="card"
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-[#fbfaf7] p-6 shadow-[0_-10px_28px_-14px_rgba(20,20,15,0.28),0_14px_34px_-16px_rgba(20,20,15,0.22)] sm:p-7 ${className}`}
    >
      <div data-stack-text className="shrink-0">
        {kicker && (
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{kicker}</p>
        )}
        {title && (
          <p className="mt-1 font-serif text-2xl italic tracking-tight text-ink/85">{title}</p>
        )}
      </div>
      {image && (
        <div className="relative mt-4 min-h-24 flex-1 overflow-hidden rounded-xl border border-black/5">
          <Image src={image.src} alt={image.alt} fill sizes={CARD_SIZES} className="object-cover" />
        </div>
      )}
      <div
        data-stack-text
        className="mt-4 shrink-0 space-y-3 text-[15px] leading-relaxed text-muted"
      >
        {children}
      </div>
      {footer && (
        <div data-stack-text className="mt-auto shrink-0 pt-5">
          {footer}
        </div>
      )}
      <div aria-hidden data-stack-dim className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Sign-off under the deck: signature, then contact. CardStack reserves room
  // for it beneath the centred deck, fades it in as the last card lands, and
  // writes the signature on (data-stack-write) as that card settles.
  const signOff = (
    <div className="text-center">
      <p
        data-stack-write
        aria-label="Anton Castro"
        className={`${signature.className} text-accent`}
        style={{ fontSize: "3.25rem", lineHeight: 1.05 }}
      >
        Anton Castro
      </p>
      <p className="mt-2 text-[15px] text-ink/75">
        Reach me at{" "}
        <a
          href="mailto:ac.design.px@gmail.com"
          className="text-accent underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
        >
          ac.design.px@gmail.com
        </a>
      </p>
    </div>
  );

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
          ref={scrollRef}
          data-gen-scroll
          className="fixed inset-0 z-50 snap-y snap-proximity overflow-y-auto backdrop-blur-3xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="About Anton Castro"
        >
          {/* Barely-there neutral wash so the transparent blur reads evenly
              regardless of what's behind it. */}
          <div aria-hidden className="pointer-events-none fixed inset-0 bg-paper/15" />

          {/* Close */}
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="fixed right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/70 text-2xl shadow-md backdrop-blur-md transition-transform hover:scale-105 hover:text-accent sm:right-6 sm:top-6"
          >
            ×
          </button>

          {/* Centered content column. The cards form a deck that stacks as
              you scroll (CardStack); GenerationReveal traces the card on
              screen and previews the rest of the deck as dotted slots on a
              live grid, then resolves the real card in. */}
          <GenerationReveal>
            <div className="relative mx-auto max-w-lg px-4 pt-16">
              <div onClick={(e) => e.stopPropagation()}>
                <CardStack scrollRef={scrollRef} after={signOff}>
                  {/* Crisp lead photo */}
                  <div
                    data-gen="card"
                    className="relative h-full overflow-hidden rounded-2xl border border-white/80 shadow-[0_14px_40px_-14px_rgba(20,20,15,0.3)]"
                  >
                    <Image
                      src="/about-photo-bw.jpg"
                      alt="Anton Castro"
                      fill
                      sizes={CARD_SIZES}
                      className="object-cover object-[center_22%]"
                    />
                    <div aria-hidden data-stack-dim className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
                  </div>

                  <Panel
                    kicker="Who"
                    title="I am"
                    footer={
                      <>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                          Worked with
                        </p>
                        <div className="mt-2.5 grid grid-cols-2 gap-x-6 gap-y-1 text-[14px] leading-relaxed text-ink/80">
                          {WORKED_WITH.flat().map((name) => (
                            <span key={name}>{name}</span>
                          ))}
                        </div>
                      </>
                    }
                  >
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
                      Figma and Paper for UX design and system schemas. These days, translating
                      AI-assisted prototyping into engineering workflows, pushing PRs with Codex
                      and Cursor.
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
                  </Panel>
                </CardStack>

              </div>
            </div>
          </GenerationReveal>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
