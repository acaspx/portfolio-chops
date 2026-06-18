"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

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
      className={`group relative rounded-2xl bg-paper/70 p-6 emboss emboss-hover sm:p-8 ${
        work.comingSoon ? "opacity-60" : ""
      }`}
    >
      {work.images && (
        <div className="mb-8 grid grid-cols-3 gap-3">
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
                  className="rounded-md border border-accent/20 bg-gradient-to-br from-accent/[0.14] via-accent/[0.05] to-transparent px-3 py-1 font-mono text-xs transition-colors group-hover:border-accent/45"
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
          {work.comingSoon && (
            <span className="rounded-full border border-line px-3 py-1">coming soon</span>
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
