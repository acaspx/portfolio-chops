import Reveal from "@/components/Reveal";

type Project = {
  name: string;
  status: string;
  description: string;
  href: string;
  cta: string;
};

// TODO(Anton): replace descriptions with real one-liners + add demo videos/GIFs.
// This section is your design-engineer proof — ship at least two real artifacts.
const projects: Project[] = [
  {
    name: "portfolio-chops",
    status: "In progress",
    description:
      "TODO — describe: interaction experiments / this site's source. What it demonstrates, what it's built with.",
    href: "https://github.com/acaspx/portfolio-chops",
    cta: "View on GitHub",
  },
  {
    name: "CLabs",
    status: "Prototype",
    description:
      "TODO — describe: what this prototype does, what it's built with, what you learned.",
    href: "https://github.com/acaspx/CLabs",
    cta: "View on GitHub",
  },
];

export default function SideProjects() {
  return (
    <section id="prototypes" aria-label="Prototypes and side projects" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Prototypes & side projects
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Where I settle design arguments in code — built with React, Swift, and Claude.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-xl border border-line bg-ink/[0.02] p-6 transition-colors hover:border-accent/50"
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
