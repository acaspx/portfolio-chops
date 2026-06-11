import Reveal from "@/components/Reveal";
import LogoBadge from "@/components/LogoBadge";

type Role = {
  slug: string;
  company: string;
  title: string;
  dates: string;
  summary: string;
  tags: string[];
};

// Canonical facts - must match resume exactly. See CLAUDE.md content rules.
// Logos: drop PNGs into public/logos/<slug>.png (monogram fallback until then).
const roles: Role[] = [
  {
    slug: "state-affairs",
    company: "State Affairs",
    title: "Sr. Interaction Designer · Policy Intelligence",
    dates: "Feb 2026 – Present",
    summary:
      "The company's first AI product: led 360° Views and AI Chat, helping land the first enterprise contracts.",
    tags: ["0→1", "Enterprise AI", "Product Strategy"],
  },
  {
    slug: "custoria",
    company: "Custoria Labs",
    title: "Co-founder & Founding Designer",
    dates: "Oct 2025 – Present",
    summary:
      "A digital vault for the things people value most, designed and coded; in App Store review.",
    tags: ["Founder", "Swift", "Security UX"],
  },
  {
    slug: "augmedix",
    company: "Augmedix",
    title: "Product Designer · AI & Growth",
    dates: "Oct 2023 – Nov 2024",
    summary:
      "AI clinical documentation: +65% engagement, one offering to four, through the $139M Commure acquisition.",
    tags: ["Agentic AI", "Design Systems", "Healthcare"],
  },
  {
    slug: "rocket",
    company: "Rocket",
    title: "Conversational AI Experience Designer",
    dates: "Sep 2022 – Aug 2023",
    summary:
      "Founding designer on Liv, the AI assistant for millions of homeowners; onboarding time cut 75%.",
    tags: ["Conversational AI", "B2B2C"],
  },
  {
    slug: "adl",
    company: "Anti-Defamation League",
    title: "Product Designer",
    dates: "Jun 2021 – May 2022",
    summary:
      "120+ interaction demos; design anchoring the Twitch, Discord & YouTube partnerships.",
    tags: ["Prototyping", "Partnerships"],
  },
  {
    slug: "intuit",
    company: "Intuit & Electronic Arts",
    title: "Product Design Internships",
    dates: "2019 – 2020",
    summary:
      "Intuit: +22% QuickBooks conversion via ML personalization. EA: NBA Live's My Player Mode.",
    tags: ["ML Personalization", "Games"],
  },
];

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Experience</h2>
        </Reveal>
        <ol className="mt-10">
          {roles.map((r, i) => (
            <li key={r.slug}>
              <Reveal delay={Math.min(i * 0.05, 0.3)}>
                <div className="grid grid-cols-[24px_40px_1fr] gap-4 border-t border-line py-7 sm:grid-cols-[32px_40px_1fr_140px] sm:gap-6">
                  <span className="pt-2 font-mono text-xs text-muted">{i + 1}.</span>
                  <LogoBadge slug={r.slug} name={r.company} />
                  <div>
                    <h3 className="font-medium tracking-tight">
                      {r.company}
                      <span className="block text-sm font-normal text-muted sm:inline sm:before:content-['_·_']">
                        {r.title}
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed max-w-xl">{r.summary}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-line px-3 py-0.5 font-mono text-[11px] text-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="col-start-3 font-mono text-xs text-muted sm:col-start-4 sm:pt-2 sm:text-right">
                    {r.dates}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal>
          <div className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="font-medium">California College of the Arts</p>
              <p className="mt-1 text-sm text-muted">
                MBA, Design Strategy (2025) · BFA, Human-Computer Interaction
              </p>
              <p className="text-sm text-muted">ELVTR · AI Product Design Certification</p>
            </div>
            <div>
              <p className="font-medium">U.S. Navy</p>
              <p className="mt-1 text-sm text-muted">
                Petty Officer Second Class, Engineer (2012–2016)
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
