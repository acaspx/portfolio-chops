import Reveal from "@/components/Reveal";
import WorkCard, { type Work } from "@/components/WorkCard";

const custoria: Work = {
  slug: "custoria",
  company: "Custoria Labs",
  title: "Founding a digital vault for what people value most",
  tags: "0→1 · B2C · iOS",
  year: "2025",
  result:
    "Galleries and collectors track priceless objects with tools never built for it. I co-founded Custoria, designed it end to end, and built the iOS app in Swift.",
  metrics: [
    { value: "iOS", label: "designed + built" },
    { value: "Available", label: "on the App Store" },
  ],
  appStore: "https://apps.apple.com/us/app/custoria-vault/id6777615531",
  images: [
    { file: "cu-mobile.png", alt: "The Custoria iOS app: AI camera scan, an identified item with its value, and the vault" },
    { file: "cu-hero.jpg", alt: "The Custoria web app on a laptop in a jewelry studio: a private vault catalog" },
    { file: "cu-pipeline.png", alt: "Custoria's ML pipeline architecture: input, detection, and extraction across vision, language, and privacy models" },
  ],
};

export default function SideProjects() {
  return (
    <section id="prototypes" aria-label="Built">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Built
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Designed, built, and shipped by me.
          </p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {/* Custoria - same case-study card as the work grid */}
          <WorkCard work={custoria} index={0} />

          {/* portfolio-chops - full-width repo card */}
          <Reveal delay={0.1}>
            <a
              href="https://github.com/acaspx/portfolio-chops"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl bg-paper/70 p-6 emboss emboss-hover sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-mono text-base font-semibold tracking-tight transition-colors group-hover:text-accent">
                  portfolio-chops
                </h3>
                <span className="shrink-0 rounded-full border border-line px-3 py-0.5 font-mono text-[11px] text-muted">
                  You&apos;re looking at it
                </span>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                The source of this site: Next.js 15, Tailwind 4, and Motion, designed and built
                by me. Every interaction you&apos;ve seen here is in this repo.
              </p>
              <span className="link-line mt-4 inline-block text-sm">View source on GitHub →</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
