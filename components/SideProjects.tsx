import Reveal from "@/components/Reveal";

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

        <div className="mt-10 grid gap-6 sm:grid-cols-1">
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
