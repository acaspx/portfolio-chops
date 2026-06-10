import Reveal from "@/components/Reveal";
import LogoBadge from "@/components/LogoBadge";

type Role = {
  slug: string;
  company: string;
  title: string;
  dates: string;
  summary: string;
  keyProjects?: { name: string; detail: string }[];
  tags: string[];
};

// Canonical facts — must match resume exactly. See CLAUDE.md content rules.
// Logos: drop PNGs into public/logos/<slug>.png (monogram fallback until then).
const roles: Role[] = [
  {
    slug: "state-affairs",
    company: "State Affairs",
    title: "Sr. Interaction Designer · Policy Intelligence",
    dates: "Feb 2026 – Present",
    summary:
      "Designed the company's first AI product — enterprise SaaS for state-level policy teams.",
    keyProjects: [
      {
        name: "AI Chat",
        detail: "Four skills with citations on every claim — piloted with Intuit, DoorDash, Walmart, Mastercard.",
      },
      {
        name: "360° Views",
        detail: "AI-personalized topic intelligence; helped land the first enterprise contracts.",
      },
    ],
    tags: ["0→1", "Enterprise AI", "Product Strategy"],
  },
  {
    slug: "custoria",
    company: "Custoria Labs",
    title: "Founding Designer · AI & Growth",
    dates: "Oct 2025 – Present",
    summary:
      "Design from zero for an AI appraisal & insurance-claims ecosystem: capture-to-share flow, design system, encrypted sharing vault.",
    tags: ["Founding Designer", "Design Systems", "Security UX"],
  },
  {
    slug: "augmedix",
    company: "Augmedix",
    title: "Product Designer · AI & Growth",
    dates: "Oct 2023 – Nov 2024",
    summary:
      "AI clinical documentation through the $139M acquisition by Commure.",
    keyProjects: [
      { name: "Growth", detail: "+65% engagement in a year, expanding one offering to four." },
      { name: "Agentic AI", detail: "Shipped a new agentic model into the core flow in four months, with nine PMs." },
      { name: "Design system", detail: "Web + mobile system keeping four product lines consistent." },
    ],
    tags: ["Agentic AI", "Design Systems", "Healthcare"],
  },
  {
    slug: "rocket",
    company: "Rocket",
    title: "Conversational AI Experience Designer",
    dates: "Sep 2022 – Aug 2023",
    summary:
      "Founding designer on Liv, Rocket's AI assistant for millions of homeowners — cut client onboarding 75%.",
    tags: ["Conversational AI", "B2B2C"],
  },
  {
    slug: "adl",
    company: "Anti-Defamation League",
    title: "Product Designer",
    dates: "Jun 2021 – May 2022",
    summary:
      "120+ interaction demos cutting concept-to-prototype time by six months; design anchoring Twitch, Discord & YouTube partnerships.",
    tags: ["Prototyping", "Partnerships"],
  },
  {
    slug: "intuit",
    company: "Intuit",
    title: "Product Designer",
    dates: "May 2020 – Aug 2020",
    summary:
      "+22% QuickBooks new-customer conversion via ML-driven personalization; onboarding used by 25M+ people.",
    tags: ["ML Personalization", "Growth"],
  },
  {
    slug: "ea",
    company: "Electronic Arts",
    title: "UX/UI Design Intern",
    dates: "May 2019 – Aug 2019",
    summary:
      "Designed NBA Live's \"My Player Mode\" in Alpha; led the visual-assets team.",
    tags: ["Games", "Visual Design"],
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
                <div className="grid grid-cols-[24px_40px_1fr] gap-4 border-t border-line py-8 sm:grid-cols-[32px_40px_1fr_140px] sm:gap-6">
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
                    {r.keyProjects && (
                      <dl className="mt-3 space-y-1.5 max-w-xl">
                        {r.keyProjects.map((kp) => (
                          <div key={kp.name} className="text-sm leading-relaxed">
                            <dt className="inline font-medium">{kp.name}: </dt>
                            <dd className="inline text-muted">{kp.detail}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
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
          <h3 className="mt-16 font-mono text-xs uppercase tracking-widest text-muted">
            Education & service
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-3 border-t border-line pt-8">
            <div>
              <p className="font-medium">California College of the Arts</p>
              <p className="mt-1 text-sm text-muted">MBA, Design Strategy (2025)</p>
              <p className="text-sm text-muted">BFA, Human-Computer Interaction</p>
            </div>
            <div>
              <p className="font-medium">ELVTR</p>
              <p className="mt-1 text-sm text-muted">AI Product Design Certification</p>
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
