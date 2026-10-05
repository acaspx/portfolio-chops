"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import AppStoreBadge from "@/components/AppStoreBadge";
import CaseGateLink from "@/components/CaseGateLink";

/**
 * Sticker geometry. Each image sits in a white border with a soft drop shadow
 * and a slight rotation, overlapping its neighbours like a pile of prints.
 * On card hover the pile fans apart so every shot is legible.
 */
const STACK = [
  { rest: { rotate: -6, x: 0, y: 0 }, hover: { rotate: -9.5, x: -30, y: -6 }, z: 1 },
  { rest: { rotate: 2.5, x: 0, y: -7 }, hover: { rotate: 1, x: 0, y: -18 }, z: 3 },
  { rest: { rotate: -2, x: 0, y: 3 }, hover: { rotate: 6.5, x: 30, y: -4 }, z: 2 },
];

const SOLO = { rest: { rotate: -2.5, x: 0, y: 0 }, hover: { rotate: -4.5, x: 0, y: -10 }, z: 1 };

const STICKER_SHADOW =
  "0 14px 30px -10px rgba(22,20,15,0.30), 0 3px 8px -3px rgba(22,20,15,0.16)";

/** One sticker: white mount, soft shadow, rendered as a dashed slug if missing. */
function Sticker({
  file,
  alt,
  pose,
  solo,
}: {
  file: string;
  alt: string;
  pose: (typeof STACK)[number];
  solo: boolean;
}) {
  const [missing, setMissing] = useState(false);
  return (
    <motion.div
      // No `animate` prop here on purpose: a child that declares one blocks the
      // parent's `whileHover="hover"` from propagating, and the fan-out dies.
      variants={{ hover: pose.hover }}
      initial={pose.rest}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: pose.z, boxShadow: STICKER_SHADOW }}
      className={`shrink-0 rounded-[7px] bg-white p-[7px] ring-1 ring-ink/[0.06] ${
        solo
          ? "w-64 sm:w-80 lg:w-[29rem]"
          : "-mx-2 w-28 sm:-mx-3 sm:w-48 lg:-mx-4 lg:w-[17.5rem]"
      }`}
    >
      <div className="aspect-[16/11] overflow-hidden rounded-[3px] bg-ink/[0.03]">
        {missing ? (
          <div className="grid h-full place-items-center rounded-[3px] border border-dashed border-line">
            <span className="px-3 text-center font-mono text-[10px] text-muted">{file}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/work/${file}`}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover object-top"
            onError={() => setMissing(true)}
          />
        )}
      </div>
    </motion.div>
  );
}

export type Work = {
  slug?: string;
  company: string;
  title: string;
  tags: string;
  year: string;
  result: string;
  metrics?: { value: string; label: string }[];
  /** filenames under public/work/ - rendered as an overlapping sticker stack */
  images?: { file: string; alt: string }[];
  /** App Store URL - renders a Download badge inside the card */
  appStore?: string;
  comingSoon?: boolean;
  /** Password-gated case study: cursor signals it, and the page shows a gate. */
  locked?: boolean;
};

export default function WorkCard({ work, index }: { work: Work; index: number }) {
  const reduce = useReducedMotion();
  const linked = !work.comingSoon && work.slug;
  const shots = work.images ?? [];
  const solo = shots.length === 1;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 100px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : "hover"}
      data-cursor={linked ? (work.locked ? "Password protected" : "View case") : undefined}
      data-locked={work.locked ? "true" : undefined}
      className={`group relative px-0 sm:px-4 ${work.comingSoon ? "opacity-60" : ""}`}
    >
      {shots.length > 0 && (
        // pointer-events-none is load-bearing: the stickers carry z-index 1-3 so
        // they can overlap, which puts two of them above the stretched link and
        // makes them eat the click. Hover still fires, since whileHover lives on
        // the article, not here.
        <div className="pointer-events-none mb-9 flex items-center justify-center">
          {shots.slice(0, 3).map((img, i) => (
            <Sticker
              key={img.file}
              file={img.file}
              alt={img.alt}
              pose={solo ? SOLO : STACK[i]}
              solo={solo}
            />
          ))}
        </div>
      )}

      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {work.company} · {work.tags}
        </p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-balance sm:text-3xl">
          <motion.span
            variants={{ hover: { y: -3 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {work.title}
          </motion.span>
        </h3>

        {work.metrics && (
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {work.metrics.map((m) => (
              <li
                key={m.label}
                className="chip-soft rounded-md border border-accent/20 px-3 py-1 font-mono text-xs transition-colors group-hover:border-accent/45"
              >
                <strong className="font-semibold">{m.value}</strong>{" "}
                <span className="text-muted">{m.label}</span>
              </li>
            ))}
          </ul>
        )}

        {work.comingSoon && (
          <div className="mt-6 flex justify-center font-mono text-xs text-muted">
            <span className="rounded-full border border-line px-3 py-1">coming soon</span>
          </div>
        )}

        {/* Centered with the rest of the column now that the card is symmetric.
            Sits above the stretched link so it stays independently clickable. */}
        {work.appStore && (
          <a
            href={work.appStore}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Download ${work.company} on the App Store`}
            className="relative z-[2] mt-5 inline-block transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <AppStoreBadge className="h-10 w-auto" />
          </a>
        )}
      </div>

      {/* Stretched target makes the whole card actionable. A locked case opens
          the password modal in place instead of navigating. */}
      {linked && (
        <CaseGateLink
          href={`/work/${work.slug}`}
          locked={work.locked}
          ariaLabel={
            work.locked
              ? `Unlock the ${work.company} case study`
              : `Read the ${work.company} case study`
          }
          className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        />
      )}
    </motion.article>
  );
}
