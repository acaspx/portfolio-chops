import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import LogoBadge from "@/components/LogoBadge";

type Role = {
  slug: string;
  company: string;
  title: string;
  year: string;
  dates: string;
  summary: string;
  tags: string[];
  href?: string;
  current?: boolean;
};

// Canonical facts - must match resume exactly. See CLAUDE.md content rules.
// Ordered newest first; rendered as an ascending staircase (oldest sits flush
// left at the bottom, the current role steps furthest right at the top).
const roles: Role[] = [
  {
    slug: "state-affairs",
    company: "State Affairs",
    title: "Sr. Interaction Designer · Policy Intelligence",
    year: "2026",
    dates: "Feb 2026 – Present",
    summary:
      "Led the company's first AI product, 360° Views and AI Chat, into its first enterprise contracts.",
    tags: ["0→1", "Enterprise AI", "Product Strategy"],
    href: "https://stateaffairs.com/",
    current: true,
  },
  {
    slug: "custoria",
    company: "Custoria Labs",
    title: "Co-founder & Founding Designer",
    year: "2025",
    dates: "Oct 2025 – Present",
    summary:
      "A digital vault for the things people value most, designed end to end and built in Swift; now on the App Store.",
    tags: ["Founder", "Swift", "Security UX"],
    href: "https://custorialabs.io/",
  },
  {
    slug: "augmedix",
    company: "Augmedix",
    title: "Product Designer · AI & Growth",
    year: "2023",
    dates: "Oct 2023 – Nov 2024",
    summary:
      "Scaled AI clinical documentation from one product to four: +65% engagement, through the $139M Commure acquisition.",
    tags: ["Agentic AI", "Design Systems", "Healthcare"],
    href: "https://www.augmedix.com/",
  },
  {
    slug: "rocket",
    company: "Rocket",
    title: "Conversational AI Experience Designer",
    year: "2022",
    dates: "Sep 2022 – Aug 2023",
    summary:
      "Founding designer on Liv, the AI assistant for millions of homeowners; cut onboarding time 75%.",
    tags: ["Conversational AI", "B2B2C"],
    href: "https://www.rocketmortgage.com/",
  },
  {
    slug: "adl",
    company: "Anti-Defamation League",
    title: "Product Designer",
    year: "2021",
    dates: "Jun 2021 – May 2022",
    summary:
      "120+ interaction demos anchoring the Twitch, Discord, and YouTube partnerships.",
    tags: ["Prototyping", "Partnerships"],
    href: "https://socialpatterns.adl.org/",
  },
  {
    slug: "intuit",
    company: "Intuit & Electronic Arts",
    title: "Product Design Internships",
    year: "2019",
    dates: "2019 – 2020",
    summary:
      "Intuit: +22% QuickBooks conversion via ML personalization. EA: NBA Live's My Player Mode.",
    tags: ["ML Personalization", "Games"],
  },
];

const STEP = 30; // px of horizontal rise per step (desktop only)

export default function Experience({ id = "experience" }: { id?: string }) {
  return (
    <section id={id} aria-label="Experience">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Experience</h2>
        </Reveal>

        <ol className="mt-12 space-y-10 sm:space-y-12">
          {roles.map((r, i) => {
            const indent = (roles.length - 1 - i) * STEP;
            return (
              <li
                key={r.slug}
                className="ml-0 sm:ml-[var(--step)]"
                style={{ "--step": `${indent}px` } as CSSProperties}
              >
                <Reveal delay={Math.min(i * 0.06, 0.35)}>
                  <div className="flex gap-4 sm:gap-5">
                    <LogoBadge slug={r.slug} name={r.company} size={60} className="rounded-2xl" />
                    <div className="min-w-0 pt-0.5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span
                          className="font-serif text-[1.65rem] font-medium leading-none tracking-tight text-ink sm:text-3xl"
                          style={{ fontVariationSettings: "'opsz' 40, 'wght' 500" }}
                        >
                          {r.year}
                        </span>
                        <h3 className="text-base font-medium tracking-tight">
                          {r.href ? (
                            <a
                              href={r.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-line transition-colors hover:text-accent"
                            >
                              {r.company}
                              <span aria-hidden className="ml-1 text-muted">↗</span>
                            </a>
                          ) : (
                            r.company
                          )}
                        </h3>
                        {r.current && (
                          <span className="rounded-md bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-paper">
                            Now
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-widest text-muted">
                        {r.title}
                      </p>
                      <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted">
                        {r.summary}
                      </p>
                      <ul className="mt-3 flex flex-wrap items-center gap-2">
                        {r.tags.map((t) => (
                          <li
                            key={t}
                            className="chip-soft rounded-md border border-accent/20 px-2.5 py-0.5 font-mono text-[11px] text-muted"
                          >
                            {t}
                          </li>
                        ))}
                        <li className="font-mono text-[11px] text-muted/70">{r.dates}</li>
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
