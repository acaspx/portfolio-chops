"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

/**
 * iPhone 16-style device frame, drawn in CSS - drop any portrait screenshot
 * in /public/work and it renders framed: titanium bezel, Dynamic Island,
 * correct 19.5:9 proportions. Falls back to a labeled slot if the file
 * doesn't exist yet.
 */
export function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);
  // Chrome (bezel radius/padding, island) is sized in container-query units so
  // it scales with the phone's rendered width and stays proportional whether the
  // phone is 260px (desktop) or ~170px (mobile two-up).
  return (
    <div
      className="relative mx-auto w-full max-w-[260px] transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1.5"
      style={{ containerType: "inline-size" }}
    >
      {/* Bezel */}
      <div
        className="relative aspect-[9/19.5] overflow-hidden bg-[#1b1b1d] shadow-xl ring-1 ring-black/20 transition-shadow duration-300 hover:shadow-2xl"
        style={{ borderRadius: "17.2cqw", padding: "2.7cqw" }}
      >
        {/* Edge highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15"
          style={{ borderRadius: "17.2cqw" }}
        />
        {/* Screen */}
        <div
          className="relative h-full w-full overflow-hidden bg-ink"
          style={{ borderRadius: "14.5cqw" }}
        >
          {missing ? (
            <div className="grid h-full place-items-center px-4 text-center">
              <span className="font-mono text-[10px] text-paper/60">{src.split("/").pop()}</span>
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
          {/* Dynamic Island */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
            style={{ top: "3.8cqw", height: "8.5cqw", width: "30.8cqw" }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Frameless screen: for assets that are already full-device screen captures
 * (their own status bar baked in). Just a rounded, bordered "screen" so we
 * don't double up the chrome or crop a non-19.5:9 capture.
 */
export function PhoneShot({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-[1.9rem] border border-line bg-ink/[0.03] shadow-xl ring-1 ring-black/5 transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1.5">
      {missing ? (
        <div className="grid aspect-[9/19] place-items-center px-4 text-center">
          <span className="font-mono text-[10px] text-muted">{src.split("/").pop()}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block h-auto w-full"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}

/** Grid of phones (framed by default), each with its own step label + descriptor. */
export function PhoneShowcase({
  phones,
  caption,
  framed = true,
}: {
  phones: { src: string; alt: string; step: string; note: string }[];
  caption?: string;
  framed?: boolean;
}) {
  const Shot = framed ? PhoneFrame : PhoneShot;
  return (
    <Reveal>
      <figure className="my-12">
        <div className="phone-canvas overflow-hidden rounded-2xl p-5 sm:p-9">
          <div className="grid grid-cols-2 items-start gap-x-5 gap-y-9 sm:grid-cols-3">
            {phones.map((p) => (
              <div key={p.src} className="flex flex-col">
                <Shot src={p.src} alt={p.alt} />
              <p className="mt-3.5 text-center font-mono text-[11px] uppercase tracking-widest text-accent">
                {p.step}
              </p>
              <p className="mx-auto mt-1 max-w-[210px] text-center text-[13px] leading-snug text-muted">
                {p.note}
              </p>
            </div>
            ))}
          </div>
        </div>
        {caption && (
          <figcaption className="mt-6 text-center font-mono text-xs text-muted">{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
}

/** Row of framed phones with one shared caption - the bevyip-style mobile showcase. */
export function PhoneRow({
  phones,
  caption,
}: {
  phones: { src: string; alt: string }[];
  caption: string;
}) {
  return (
    <Reveal>
      <figure className="my-10">
        <div
          className={`grid items-start gap-6 sm:gap-8 ${
            phones.length === 1
              ? "grid-cols-1"
              : phones.length === 2
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3"
          }`}
        >
          {phones.map((p) => (
            <PhoneFrame key={p.src} src={p.src} alt={p.alt} />
          ))}
        </div>
        <figcaption className="mt-4 text-center font-mono text-xs text-muted">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
