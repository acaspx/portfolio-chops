import Reveal from "@/components/Reveal";

// TODO(Anton): swap CTA to App Store link once the app is live.
const featured = {
  name: "Custoria",
  status: "In App Store review",
  description:
    "A digital vault for the things people value most: AI-powered capture, appraisal, and proof of ownership in a biometric-locked vault. I designed it and built the native iOS app in Swift. Design and code, one pair of hands. Co-founded with Yiyi Qin; born from our MBA Design Strategy thesis.",
  stack: ["Swift", "Gemini Flash", "iOS"],
  href: "/work/custoria",
  cta: "Read the case study",
};

// CLabs intentionally omitted until it has a real story to tell.
const projects = [
  {
    name: "portfolio-chops",
    status: "You're looking at it",
    description:
      "The source of this site: Next.js 15, Tailwind 4, and Motion, designed and built by me. Every interaction you've seen here is in this repo.",
    href: "https://github.com/acaspx/portfolio-chops",
    cta: "View source on GitHub",
  },
];

export default function SideProjects() {
  return (
    <section id="prototypes" aria-label="Founded and built" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Founded & built
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Where I settle design arguments in code. Designed, built, and shipped by me.
          </p>
        </Reveal>

        {/* Featured: the shipped app */}
        <Reveal>
          <a
            href={featured.href}
            className="group mt-10 grid gap-6 rounded-xl bg-paper/70 p-6 emboss emboss-hover sm:grid-cols-[1.2fr_1fr] sm:p-8"
          >
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-2xl font-medium tracking-tight group-hover:text-accent transition-colors">
                  {featured.name}
                </h3>
                <span className="rounded-full bg-accent/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-accent">
                  {featured.status}
                </span>
              </div>
              <p className="mt-3 text-muted leading-relaxed">{featured.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {featured.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <span className="link-line mt-5 inline-block text-sm">{featured.cta} →</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/app-hero.png"
              alt="Custoria app: computer-vision capture flow across three screens"
              loading="lazy"
              className="min-h-[200px] w-full rounded-lg border border-line object-cover"
            />
          </a>
        </Reveal>

        {/* Prototypes & experiments */}
        <div className="mt-6 grid gap-6 sm:grid-cols-1">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-xl bg-paper/70 p-6 emboss emboss-hover"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-mono text-base font-semibold tracking-tight group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>
                  <span className="rounded-full border border-line px-3 py-0.5 font-mono text-[11px] text-muted shrink-0">
                    {p.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">{p.description}</p>
                <span className="link-line mt-4 inline-block text-sm">{p.cta} →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
