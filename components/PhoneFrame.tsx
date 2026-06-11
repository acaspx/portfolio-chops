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
  return (
    <div className="relative mx-auto w-full max-w-[260px]">
      {/* Bezel */}
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.8rem] bg-[#1b1b1d] p-[7px] shadow-xl ring-1 ring-black/20">
        {/* Edge highlight */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[2.8rem] ring-1 ring-inset ring-white/15" />
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] bg-ink">
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
            className="absolute left-1/2 top-[10px] h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
      </div>
    </div>
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
