import Link from "next/link";
import Reveal from "@/components/Reveal";

const custoria = {
  href: "/work/custoria",
  company: "Custoria Labs",
  tags: "0→1 · B2C · iOS",
  year: "2025",
  title: "Founding a digital vault for what people value most",
  result:
    "Galleries and collectors track priceless objects with tools never built for it. I co-founded Custoria, designed it end to end, and built the iOS app in Swift.",
  metrics: [
    { value: "2×", label: "more accurate records" },
    { value: "iOS", label: "designed + built" },
    { value: "Available", label: "on the App Store" },
  ],
  phones: [
    { file: "cu-capture.png", alt: "Custoria AI camera scan capturing an item" },
    { file: "cu-identify.png", alt: "AI-identified item with value and metadata" },
    { file: "cu-vault.png", alt: "My Vault showing total value and item list" },
    { file: "cu-prove.png", alt: "Proof-of-ownership and appraisal reports" },
  ],
};

export default function SideProjects() {
  return (
    <section id="prototypes" aria-label="Built in code" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Built in code
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Where I settle design arguments in code. Designed, built, and shipped by me.
          </p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {/* Custoria - full-width case-study card */}
          <Reveal>
            <Link href={custoria.href} className="block focus-visible:outline-accent">
              <article className="group relative rounded-2xl bg-paper/70 p-6 emboss emboss-hover sm:p-8">
                {/* System view: the web app, how it was implemented */}
                <div className="overflow-hidden rounded-lg border border-line bg-ink/[0.03]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/work/cu-hero.jpg"
                    alt="The Custoria Labs web app on a laptop in a jewelry studio: a private vault catalog"
                    loading="lazy"
                    className="aspect-[2/1] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                </div>
                {/* Mobile previews: the shipped iOS flow */}
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {custoria.phones.map((p) => (
                    <div
                      key={p.file}
                      className="aspect-[9/19.5] overflow-hidden rounded-lg border border-line bg-ink/[0.03]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/work/${p.file}`}
                        alt={p.alt}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="max-w-xl">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted">
                      {custoria.company} · {custoria.tags}
                    </p>
                    <h3 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
                      {custoria.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted">{custoria.result}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {custoria.metrics.map((m) => (
                        <li
                          key={m.label}
                          className="chip-soft rounded-md border border-accent/20 px-3 py-1 font-mono text-xs transition-colors group-hover:border-accent/45"
                        >
                          <strong className="font-semibold">{m.value}</strong>{" "}
                          <span className="text-muted">{m.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted">{custoria.year}</span>
                </div>
              </article>
            </Link>
          </Reveal>

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
