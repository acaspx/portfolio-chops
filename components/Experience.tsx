import Reveal from "@/components/Reveal";

type Role = {
  company: string;
  title: string;
  dates: string;
  summary: string;
  keyProjects?: { name: string; detail: string }[];
  tags: string[];
};

// Canonical facts — must match resume exactly. See CLAUDE.md content rules.
const roles: Role[] = [
  {
    company: "State Affairs",
    title: "Sr. Interaction Designer — Policy Intelligence",
    dates: "Feb 2026 – Present",
    summary:
      "First AI product: enterprise SaaS for state-level policy teams. System architecture, voice & tone, interaction patterns — helped land first enterprise contracts (Walmart, DoorDash, trade associations).",
    keyProjects: [
      {
        name: "360° Views",
        detail:
          "Topic-centric intelligence views with AI-personalized data, static or dynamic — piloted with policy experts at Intuit, DoorDash, Walmart, and Mastercard.",
      },
      {
        name: "AI Chat",
        detail:
          "Four skills (Bill Compare, Create a Report, Generate 360° View, What's Changed) with citations on every claim — closing the gap between aggregation and insight.",
      },
    ],
    tags: ["0→1", "Enterprise AI", "Product Strategy"],
  },
  {
    company: "Custoria Labs",
    title: "Founding Designer — AI & Growth",
    dates: "Oct 2025 – Present",
    summary:
      "AI-powered appraisal and insurance-claims ecosystem from zero: capture-to-share flow, design system, encrypted biometric-locked sharing vault.",
    tags: ["Founding Designer", "Design System", "Security UX"],
  },
  {
    company: "Augmedix",
    title: "Product Designer — AI & Growth",
    dates: "Oct 2023 – Nov 2024",
    summary:
      "AI clinical documentation, web + mobile, through the $139M acquisition by Commure.",
    keyProjects: [
      {
        name: "Product expansion",
        detail: "+65% engagement in a year while growing from one offering to four.",
      },
      {
        name: "Agentic AI integration",
        detail:
          "Folded a new agentic AI model into the core documentation flow with nine PMs and AI leads — shipped in four months.",
      },
      {
        name: "Design system",
        detail: "Built the web + mobile design system keeping four fast-moving product lines consistent.",
      },
    ],
    tags: ["Agentic AI", "Design Systems", "Healthcare"],
  },
  {
    company: "Rocket",
    title: "Conversational AI Experience Designer",
    dates: "Sep 2022 – Aug 2023",
    summary:
      "Founding designer on Liv, Rocket's AI assistant serving millions of homeowners (B2B2C). Cut client onboarding time 75% by rethinking the conversation flow.",
    tags: ["Conversational AI", "B2B2C"],
  },
  {
    company: "Anti-Defamation League",
    title: "Product Designer",
    dates: "Jun 2021 – May 2022",
    summary:
      "Built a library of 120+ interaction demos cutting concept-to-prototype time by six months; design work anchoring partnerships with Twitch, Discord, and YouTube.",
    tags: ["Prototyping", "Partnerships"],
  },
  {
    company: "Intuit",
    title: "Product Designer",
    dates: "May 2020 – Aug 2020",
    summary:
      "Lifted QuickBooks new-customer conversion 22% with ML-driven personalization; reworked onboarding used by 25M+ people.",
    tags: ["ML Personalization", "Growth"],
  },
  {
    company: "Electronic Arts",
    title: "UX/UI Design Intern",
    dates: "May 2019 – Aug 2019",
    summary:
      "Designed NBA Live's \"My Player Mode\" in Alpha; led the visual-assets team with build-ready specs for engineering.",
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
            <li key={r.company + r.dates}>
              <Reveal delay={Math.min(i * 0.05, 0.3)}>
                <div className="grid gap-2 border-t border-line py-8 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <div className="font-mono text-xs text-muted pt-1">{r.dates}</div>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">
                      {r.company}
                      <span className="text-muted font-normal"> — {r.title}</span>
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed max-w-2xl">{r.summary}</p>
                    {r.keyProjects && (
                      <dl className="mt-4 space-y-2 max-w-2xl">
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
