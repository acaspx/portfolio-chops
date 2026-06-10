"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export type Work = {
  slug?: string;
  company: string;
  title: string;
  tags: string;
  year: string;
  result: string;
  metrics?: { value: string; label: string }[];
  /** filenames under public/work/ — rendered as a visual strip above the text */
  images?: { file: string; alt: string }[];
  comingSoon?: boolean;
};

export default function WorkCard({ work, index }: { work: Work; index: number }) {
  const reduce = useReducedMotion();

  const inner = (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : "hover"}
      className={`group relative border-t border-line py-10 ${
        work.comingSoon ? "opacity-60" : ""
      }`}
    >
      {work.images && (
        <div className="mb-8 grid grid-cols-3 gap-3">
          {work.images.map((img) => (
            // TODO(Anton): once exports exist in public/work/, swap div for
            // <Image src={`/work/${img.file}`} alt={img.alt} fill className="object-cover" />
            <div
              key={img.file}
              className="aspect-[4/3] overflow-hidden rounded-lg border border-dashed border-line bg-ink/[0.03] grid place-items-center transition-transform duration-500 group-hover:scale-[1.015]"
            >
              <span className="px-3 text-center font-mono text-[10px] text-muted">{img.file}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {work.company} — {work.tags}
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
                  className="rounded-full border border-line bg-ink/[0.03] px-3 py-1 font-mono text-xs transition-colors group-hover:border-accent/40"
                >
                  <strong className="font-semibold">{m.value}</strong>{" "}
                  <span className="text-muted">{m.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center gap-4 font-mono text-xs text-muted shrink-0">
          <span>{work.year}</span>
          {work.comingSoon ? (
            <span className="rounded-full border border-line px-3 py-1">coming soon</span>
          ) : (
            <motion.span
              aria-hidden
              variants={{ hover: { x: 6, color: "var(--color-accent)" } }}
              transition={{ duration: 0.35 }}
              className="inline-block text-lg"
            >
              →
            </motion.span>
          )}
        </div>
      </div>
    </motion.article>
  );

  if (work.comingSoon || !work.slug) return inner;

  return (
    <Link href={`/work/${work.slug}`} className="block focus-visible:outline-accent">
      {inner}
    </Link>
  );
}
