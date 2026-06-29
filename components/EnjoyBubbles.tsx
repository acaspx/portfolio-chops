"use client";

import { useState } from "react";

// PLACEHOLDERS - swap for Anton's real interests (emoji + short label).
const enjoy = [
  { icon: "☕", label: "Coffee" },
  { icon: "📷", label: "Photography" },
  { icon: "🏔️", label: "The outdoors" },
  { icon: "🎧", label: "Music" },
  { icon: "✏️", label: "Sketching" },
];

// Drop four photos at these paths (any aspect; they're cropped to squares).
const photos = [
  { src: "/enjoy/1.jpg", alt: "" },
  { src: "/enjoy/2.jpg", alt: "" },
  { src: "/enjoy/3.jpg", alt: "" },
  { src: "/enjoy/4.jpg", alt: "" },
];

function Photo({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className="aspect-square overflow-hidden rounded-xl border border-line bg-ink/[0.04]">
      {missing ? (
        <div className="grid h-full place-items-center px-2 text-center font-mono text-[10px] text-muted">
          {src.split("/").pop()}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}

/**
 * "Off the clock" card of frosted-glass bubbles (hover to read the label).
 * Clicking the card reveals a row of four photos above it.
 */
export default function EnjoyBubbles() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <section aria-label="Things I enjoy">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">
          Off the clock
        </p>
        <p className="mt-2 text-center text-sm text-muted">
          Experiences that help me develop my &ldquo;taste&rdquo;
        </p>

        {/* Photo row, revealed on click */}
        <div
          id="enjoy-photos"
          aria-hidden={!open}
          className={`mx-auto grid max-w-3xl grid-cols-4 gap-3 overflow-hidden transition-all duration-500 ease-out ${
            open ? "mt-8 max-h-[280px] opacity-100" : "mt-0 max-h-0 opacity-0"
          }`}
        >
          {photos.map((p, i) => (
            <Photo key={i} src={p.src} alt={p.alt} />
          ))}
        </div>

        {/* Clickable bubble card */}
        <div
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          aria-expanded={open}
          aria-controls="enjoy-photos"
          className="mx-auto mt-8 block w-full max-w-3xl cursor-pointer rounded-3xl border border-line bg-gradient-to-b from-accent/[0.07] to-accent/[0.01] p-7 shadow-sm transition-shadow duration-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:p-12"
        >
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {enjoy.map((e) => (
              <li key={e.label}>
                <div className="group inline-flex h-16 items-center overflow-hidden rounded-2xl border border-white/70 bg-white/50 shadow-sm backdrop-blur transition-all duration-300 ease-out hover:bg-accent hover:px-5 hover:shadow-md">
                  <span
                    aria-hidden
                    className="grid h-16 w-16 shrink-0 place-items-center text-2xl transition-all duration-300 ease-out group-hover:w-0 group-hover:opacity-0"
                  >
                    {e.icon}
                  </span>
                  <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-paper opacity-0 transition-all duration-300 ease-out group-hover:max-w-[12rem] group-hover:opacity-100">
                    {e.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
