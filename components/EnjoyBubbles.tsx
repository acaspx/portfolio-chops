"use client";

import { useState } from "react";

// Each interest is a tab; tapping its icon swaps the row of four photos.
// Drop photos at public/enjoy/<slug>/1.jpg ... 4.jpg (any aspect, cropped square).
const enjoy = [
  { icon: "📷", label: "Photography", slug: "photography" },
  { icon: "🏔️", label: "The outdoors", slug: "outdoors" },
  { icon: "🎧", label: "Music", slug: "music" },
  { icon: "✏️", label: "Sketching", slug: "sketching" },
];

function Photo({ src }: { src: string }) {
  const [missing, setMissing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="aspect-square overflow-hidden rounded-xl border border-line bg-ink/[0.04]">
      {missing ? (
        <div className="grid h-full place-items-center px-2 text-center font-mono text-[10px] text-muted">
          {src.replace("/enjoy/", "")}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setMissing(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}

/**
 * "Off the clock": a row of four photos with a tab bar of interests below.
 * Tapping an interest swaps the photo set. Photography is the default.
 */
export default function EnjoyBubbles() {
  const [active, setActive] = useState(0);
  const cat = enjoy[active];

  return (
    <section aria-label="Things I enjoy">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">
          Off the clock
        </p>
        <p className="mt-2 text-center text-sm text-muted">
          Experiences that help me develop my &ldquo;taste&rdquo;
        </p>

        {/* Photo row for the active interest */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <Photo key={`${cat.slug}-${n}`} src={`/enjoy/${cat.slug}/${n}.jpg`} />
          ))}
        </div>

        {/* Tab bar */}
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-line bg-gradient-to-b from-accent/[0.07] to-accent/[0.01] p-7 shadow-sm sm:p-12">
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {enjoy.map((e, i) => {
              const on = active === i;
              return (
                <li key={e.label}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    aria-label={e.label}
                    className={`grid h-16 w-16 place-items-center rounded-2xl bg-paper/70 text-2xl ${
                      on ? "emboss emboss-active" : "emboss emboss-hover"
                    }`}
                  >
                    <span aria-hidden>{e.icon}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
