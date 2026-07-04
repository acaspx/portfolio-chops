"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import AppStoreBadge from "@/components/AppStoreBadge";

/** Card thumbnail: renders /work/<file> if it exists, dashed placeholder if not. */
function CardImage({ file, alt }: { file: string; alt: string }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className="aspect-[16/10] overflow-hidden rounded-lg border border-line bg-ink/[0.03] transition-transform duration-500 group-hover:scale-[1.015]">
      {missing ? (
        <div className="grid h-full place-items-center border border-dashed border-line rounded-lg">
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
  /** filenames under public/work/ - rendered as a visual strip above the text */
  images?: { file: string; alt: string }[];
  /** App Store URL - renders a Download badge inside the card */
  appStore?: string;
  comingSoon?: boolean;
};

export default function WorkCard({ work, index }: { work: Work; index: number }) {
  const reduce = useReducedMotion();
  const linked = !work.comingSoon && work.slug;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 100px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : "hover"}
      className={`group relative rounded-2xl bg-paper/70 p-6 emboss emboss-hover sm:p-8 ${
        work.comingSoon ? "opacity-60" : ""
      }`}
    >
      {work.images && (
        <div className={`mb-8 grid gap-3 ${work.images.length === 1 ? "grid-cols-1" : "grid-cols-3"}`}>
          {work.images.map((img) => (
            <CardImage key={img.file} file={img.file} alt={img.alt} />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {work.company} · {work.tags}
          </p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-medium tracking-tight">
            <motion.span
              variants={{ hover: { x: 8 } }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {work.title}
            </motion.span>
          </h3>
          <p className="mt-3 text-sm text-muted">{work.result}</p>
          {work.metrics && (
            <ul className="mt-4 flex flex-wrap gap-2">
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
        <div className="flex items-center gap-4 font-mono text-xs text-muted shrink-0">
          <span>{work.year}</span>
          {work.comingSoon && (
            <span className="rounded-full border border-line px-3 py-1">coming soon</span>
          )}
        </div>
      </div>

      {/* Stretched link makes the whole card navigate, while the App Store badge
          (z-2) stays independently clickable. */}
      {linked && (
        <Link
          href={`/work/${work.slug}`}
          aria-label={`Read the ${work.company} case study`}
          className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        />
      )}
    </motion.article>
  );
}
