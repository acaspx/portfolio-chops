import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FadeImage from "@/components/FadeImage";
import AppStoreBadge from "@/components/AppStoreBadge";
import type { CSSProperties, ReactNode } from "react";

/** Per-case dark, tinted canvas gradients for in-body case images. */
export type CaseTone = "navy" | "indigo" | "charcoal" | "violet" | "custoria" | "sage";
const CANVAS: Record<CaseTone, string> = {
  navy: "#20293f url('/textures/case-navy.jpg') center/cover",
  // State Affairs: a moody sage cloud, recolored from the product's green accent.
  sage: "#16261d url('/textures/case-sage.jpg') center/cover",
  // Augmedix: the same light purple wash used behind the phone mocks, so the
  // in-body case images sit on one calm surface instead of the dark texture.
  indigo:
    "radial-gradient(85% 85% at 85% 12%, rgba(45,45,92,0.11), transparent 60%), linear-gradient(135deg, #efeffb, #e6e7f7 55%, #f1ecf6)",
  charcoal: "#211c19 url('/textures/case-charcoal.jpg') center/cover",
  violet: "#2c2142 url('/textures/case-violet.jpg') center/cover",
  // Custoria: a soft navy-accent cloudy gradient (dark app screens pop on it).
  custoria: "#dfe3ec url('/work/cu-canvas.jpg') center/cover",
};

/** Softer, light per-case gradients for the phone showcases (device frames and
 *  frameless shots read best on a light wash rather than the dark canvas). */
const PHONE_CANVAS: Record<CaseTone, string> = {
  navy: "radial-gradient(85% 85% at 85% 12%, rgba(30,42,68,0.10), transparent 60%), linear-gradient(135deg, #eef1f7, #e7edf6 55%, #efedf5)",
  indigo: "radial-gradient(85% 85% at 85% 12%, rgba(45,45,92,0.11), transparent 60%), linear-gradient(135deg, #efeffb, #e6e7f7 55%, #f1ecf6)",
  charcoal: "radial-gradient(85% 85% at 12% 88%, rgba(120,60,45,0.10), transparent 60%), linear-gradient(135deg, #f4f1ec, #efe8e1 55%, #f3ede9)",
  violet: "radial-gradient(85% 85% at 85% 88%, rgba(120,80,150,0.12), transparent 60%), linear-gradient(135deg, #f3ecfa, #eae1f4 55%, #f6ecf1)",
  custoria: "#dfe3ec url('/work/cu-canvas.jpg') center/cover",
  sage: "radial-gradient(85% 85% at 85% 12%, rgba(40,70,55,0.10), transparent 60%), linear-gradient(135deg, #eef3ee, #e6efe8 55%, #eff3ed)",
};

/** App Store download link + badge, shared by the rail and mobile header. */
function AppStoreLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
      className="inline-block transition-transform hover:scale-[1.03] active:scale-[0.98]"
    >
      <AppStoreBadge className="h-10 w-auto" />
    </a>
  );
}

type LiveSite = { href: string; label: string; image?: string };

/** "Visit the live product" link with an optional preview thumbnail. */
function LiveSiteLink({ site }: { site: LiveSite }) {
  return (
    <div>
      <p className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-muted">
        Live product
      </p>
      <a href={site.href} target="_blank" rel="noopener noreferrer" className="group block">
        {site.image && (
          <div className="overflow-hidden rounded-lg border border-line bg-ink/[0.03]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.image}
              alt=""
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <span className="link-line mt-2.5 inline-block text-sm">{site.label} ↗</span>
      </a>
    </div>
  );
}

/** Inline highlight for the numbers and outcomes recruiters scan for. */
export function Hi({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-accent">{children}</span>;
}

/** Full-bleed hero image at the top of a case study. */
export function CaseHero({
  src,
  alt,
  width = 2600,
  height = 870,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className="w-full rounded-2xl border border-line object-cover"
      />
    </div>
  );
}

/**
 * Real case study image (file must exist in public/). Defaults to a 16:9 box;
 * pass the image's real width/height for any non-16:9 export so it renders at
 * its natural aspect instead of being squished.
 */
export function CaseImage({
  src,
  alt,
  caption,
  width = 1920,
  height = 1080,
}: {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-6">
      <div className="case-canvas overflow-hidden rounded-2xl p-4 sm:p-8">
        <FadeImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="relative z-[1] h-auto w-full rounded-lg shadow-2xl ring-1 ring-black/25"
        />
      </div>
      <figcaption className="mt-2.5 font-mono text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}

type Meta = { label: string; value: string };

/** Vertical details list used in the sticky rail and the mobile header block. */
function DetailsList({ meta }: { meta: Meta[] }) {
  return (
    <dl className="space-y-5">
      {meta.map((m) => (
        <div key={m.label}>
          <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {m.label}
          </dt>
          <dd className="mt-1.5 text-sm leading-snug text-ink/90">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Two-column case body: scrolling content on the left, a persistent details
 * rail on the right that sticks through the whole read. Below lg the rail
 * collapses into a static block beneath the title. CaseHero sits above this.
 */
export function CaseLayout({
  company,
  title,
  meta,
  appStore,
  liveSite,
  tone = "navy",
  children,
}: {
  company: string;
  title: string;
  meta: Meta[];
  appStore?: string;
  liveSite?: LiveSite;
  tone?: CaseTone;
  children: ReactNode;
}) {
  return (
    <div
      className="mx-auto max-w-5xl px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14"
      style={
        {
          "--case-canvas": CANVAS[tone],
          "--phone-canvas": PHONE_CANVAS[tone],
        } as CSSProperties
      }
    >
      {/* Main scrolling column */}
      <div className="min-w-0">
        <header className="pt-16 pb-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{company}</p>
            <h1 className="mt-4 max-w-[46rem] text-4xl sm:text-5xl font-medium tracking-tight leading-[1.12]">
              {title}
            </h1>
          </Reveal>
          {/* Mobile-only details: stacked under the title */}
          <div className="mt-8 border-t border-line pt-6 lg:hidden">
            <DetailsList meta={meta} />
            {appStore && (
              <div className="mt-7">
                <AppStoreLink href={appStore} />
              </div>
            )}
            {liveSite && (
              <div className="mt-7">
                <LiveSiteLink site={liveSite} />
              </div>
            )}
          </div>
        </header>
        {children}
      </div>

      {/* Persistent details rail (lg+) */}
      <aside className="hidden lg:block pt-16">
        <div className="sticky top-28 border-l border-line pl-6">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-accent">
            Details
          </p>
          <DetailsList meta={meta} />
          {appStore && (
            <div className="mt-8">
              <AppStoreLink href={appStore} />
            </div>
          )}
          {liveSite && (
            <div className="mt-8">
              <LiveSiteLink site={liveSite} />
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

/**
 * Case opener built for the 10-second skim: one hook sentence stating
 * outcome + stakes, then a row of 3 big scannable stats. Sits at the top of
 * the case, above the first section.
 */
export function CaseLead({
  hook,
  stats,
}: {
  hook: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <Reveal>
      <div className="max-w-[44rem] border-b border-line pb-9">
        <p className="text-xl font-medium leading-snug tracking-tight text-ink/90 sm:text-2xl">
          {hook}
        </p>
        <div className="mt-7 flex flex-wrap gap-x-10 gap-y-5">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-medium leading-none tracking-tight text-accent sm:text-[2.5rem]">
                {s.value}
              </div>
              <div className="mt-1.5 max-w-[12rem] font-mono text-[11px] uppercase tracking-widest text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
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
    <section id={id} className="py-10 scroll-mt-28">
      {/* No scroll reveal on reading pages: content should simply be there. */}
      <div className="max-w-[44rem]">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{kicker}</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight">{title}</h2>
        <div className="mt-5 space-y-5 text-[17px] leading-relaxed text-ink/85">{children}</div>
      </div>
    </section>
  );
}

/** Scannable key-points list: accent-dot bullets for distilling a section. */
export function KeyPoints({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Visible placeholder for content/images only Anton can supply. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-accent/50 bg-accent/5 px-5 py-4 font-mono text-sm text-accent">
      TODO - {children}
    </div>
  );
}

export function ImageSlot({ caption }: { caption: string }) {
  return (
    <figure className="my-6">
      <div className="aspect-[16/10] w-full rounded-lg border border-dashed border-line bg-ink/[0.03] grid place-items-center">
        <span className="font-mono text-xs text-muted px-6 text-center">
          image slot - {caption}
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
