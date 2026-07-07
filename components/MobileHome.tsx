import Link from "next/link";
import AsteriskMark from "@/components/AsteriskMark";
import CaseGateLink from "@/components/CaseGateLink";
import HeroLede from "@/components/HeroLede";
import AppStoreBadge from "@/components/AppStoreBadge";
import EnjoyBubbles from "@/components/EnjoyBubbles";
import Experience from "@/components/Experience";
import { works } from "@/content/works";
import type { Work } from "@/components/WorkCard";

const SUBSTACK =
  "https://substack.com/@acdesignpx?r=1ou43l&utm_medium=ios&utm_source=stories&shareImageVariant=blur";

/** Compact, tap-to-open case card tuned for a single phone column. */
function MobileCard({ w }: { w: Work }) {
  const cover = w.images?.[0];
  return (
    <CaseGateLink
      href={`/work/${w.slug}`}
      locked={w.locked}
      ariaLabel={
        w.locked
          ? `Unlock the ${w.company} case study`
          : `Read the ${w.company} case study`
      }
      className="group block w-full text-left rounded-2xl bg-paper/70 p-4 emboss emboss-hover"
    >
      {cover && (
        <div className="mb-4 overflow-hidden rounded-lg border border-line bg-ink/[0.03]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/work/${cover.file}`}
            alt={cover.alt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
      )}
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
        {w.company} · {w.tags}
      </p>
      <h3 className="mt-1.5 text-xl font-medium leading-snug tracking-tight">{w.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{w.result}</p>
      {w.metrics && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {w.metrics.map((m) => (
            <li
              key={m.label}
              className="chip-soft rounded-md border border-accent/20 px-2.5 py-1 font-mono text-[11px]"
            >
              <strong className="font-semibold">{m.value}</strong>{" "}
              <span className="text-muted">{m.label}</span>
            </li>
          ))}
        </ul>
      )}
      <span className="link-line mt-4 inline-flex items-center gap-1.5 text-sm">
        {w.locked && (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
            <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" strokeLinecap="round" />
          </svg>
        )}
        {w.locked ? "Enter password to view →" : "Read the case study →"}
      </span>
    </CaseGateLink>
  );
}

/**
 * Mobile-only home: a single scrolling column adapting the strongest patterns
 * from a great mobile portfolio (punchy hero + clear CTAs, outcome-led cards,
 * a featured build, a writing teaser) in Anton's own identity. Rendered only
 * below md; the desktop layout is untouched.
 */
export default function MobileHome() {
  return (
    <>
      <div className="px-5">
      {/* Hero */}
      <section className="pb-10 pt-14">
        <div className="relative inline-block">
          <AsteriskMark className="absolute -left-4 -top-4 h-7 w-7 text-accent" />
          <h1
            className="font-serif text-3xl tracking-tight"
            style={{ fontVariationSettings: "'opsz' 88, 'wght' 500, 'SOFT' 0, 'WONK' 0" }}
          >
            Anton Castro
          </h1>
        </div>
        <p className="mt-1 text-muted">Sr. Product Designer & Builder in San Francisco</p>
        <HeroLede
          leadClassName="mt-6 text-lg leading-relaxed"
          statusClassName="mt-4 font-mono text-[11px] tracking-wide text-muted"
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#mwork"
            className="rounded-full cta-metal px-6 py-3 text-sm font-medium transition-transform active:scale-[0.98]"
          >
            View work
          </a>
          <a
            href="mailto:ac.design.px@gmail.com"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            Say hello
          </a>
        </div>
      </section>

      {/* Selected work */}
      <section id="mwork" className="scroll-mt-24 pt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Curated work</h2>
        <div className="mt-5 space-y-5">
          {works.map((w) => (
            <MobileCard key={w.company} w={w} />
          ))}
        </div>
      </section>

      {/* Built / featured */}
      <section className="mt-10 pt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Built</h2>
        <Link
          href="/work/custoria"
          className="group mt-5 block rounded-2xl bg-paper/70 p-4 emboss emboss-hover"
        >
          <div className="mb-4 overflow-hidden rounded-lg border border-line bg-ink/[0.03]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/cu-mobile.png"
              alt="The Custoria iOS app: AI camera scan, an identified item, and the vault"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Custoria Labs · 0→1 · B2C · iOS
          </p>
          <h3 className="mt-1.5 text-xl font-medium leading-snug tracking-tight">
            Founding a digital vault for what people value most
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Co-founded, designed end to end, and built the iOS app in Swift. Now on the App Store.
          </p>
        </Link>
        <a
          href="https://apps.apple.com/us/app/custoria-vault/id6777615531"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Custoria on the App Store"
          className="mt-4 inline-block transition-transform active:scale-[0.98]"
        >
          <AppStoreBadge className="h-10 w-auto" />
        </a>
      </section>

      {/* Writing */}
      <section className="mt-10 pt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Writing</h2>
        <p className="mt-4 text-lg leading-relaxed">
          Notes on designing AI-native products: agentic systems, trust, and design that ships in
          code.
        </p>
        <a
          href={SUBSTACK}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line mt-4 inline-block text-sm"
        >
          Read on Substack ↗
        </a>
      </section>

      {/* About */}
      <section className="mt-10 pt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">About</h2>
        <p className="mt-4 text-lg leading-relaxed">
          U.S. Navy engineer turned designer. BFA in Human-Computer Interaction, MBA in Design
          Strategy. I lead with the story, build momentum with working prototypes, and ship.
        </p>
      </section>

      </div>
      <Experience id="experience-m" />
      <EnjoyBubbles />
    </>
  );
}
