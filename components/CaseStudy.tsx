import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { ReactNode } from "react";

export function CaseHeader({
  company,
  title,
  meta,
}: {
  company: string;
  title: string;
  meta: { label: string; value: string }[];
}) {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-20 pb-14">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-muted">{company}</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-medium tracking-tighter leading-[1.1]">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={0.15}>
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 border-t border-line pt-8">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {m.label}
              </dt>
              <dd className="mt-2 text-sm leading-snug">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </header>
  );
}

export function Section({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-6 py-12 scroll-mt-24">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{kicker}</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight">{title}</h2>
        <div className="mt-5 space-y-5 text-[17px] leading-relaxed text-ink/85">{children}</div>
      </Reveal>
    </section>
  );
}

/** Visible placeholder for content/images only Anton can supply. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-accent/50 bg-accent/5 px-5 py-4 font-mono text-sm text-accent">
      TODO — {children}
    </div>
  );
}

export function ImageSlot({ caption }: { caption: string }) {
  return (
    <figure className="my-6">
      <div className="aspect-[16/10] w-full rounded-lg border border-dashed border-line bg-ink/[0.03] grid place-items-center">
        <span className="font-mono text-xs text-muted px-6 text-center">
          image slot — {caption}
        </span>
      </div>
      <figcaption className="mt-2 font-mono text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}

export function NextCase({ href, label }: { href: string; label: string }) {
  return (
    <div className="border-t border-line mt-12">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Next</p>
        <Link
          href={href}
          className="group mt-3 inline-flex items-center gap-3 text-2xl sm:text-3xl font-medium tracking-tight hover:text-accent transition-colors"
        >
          {label}
          <span className="transition-transform group-hover:translate-x-2" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
