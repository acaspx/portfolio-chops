import Hero from "@/components/Hero";
import WorkCard, { type Work } from "@/components/WorkCard";
import Reveal from "@/components/Reveal";

const works: Work[] = [
  {
    slug: "state-affairs",
    company: "State Affairs",
    title: "Turning dense policy data into decisions enterprise teams act on",
    tags: "0→1 Enterprise AI",
    year: "2026",
    result:
      "First AI product; system architecture, voice & interaction patterns. Helped land first enterprise contracts with policy teams at Walmart and DoorDash.",
  },
  {
    slug: "augmedix",
    company: "Augmedix",
    title: "Scaling AI clinical documentation from one product to four",
    tags: "AI Platform & Design Systems",
    year: "2023–24",
    result:
      "+65% engagement in a year; agentic AI shipped into the core flow in four months; acquired by Commure for $139M.",
  },
  {
    company: "Rocket",
    title: "Liv — a conversational AI serving millions of homeowners",
    tags: "Conversational AI",
    year: "2022–23",
    result: "Client onboarding time cut 75% by redesigning the conversation flow.",
    comingSoon: true,
  },
];

const principles = [
  {
    t: "Design for consistency, build for flexibility",
    d: "Systems thinking over screens. Every product I ship leaves behind a design system the team can move fast in.",
  },
  {
    t: "The prototype is the argument",
    d: "I settle design debates in code — React, Swift, or whatever gets the idea in front of users fastest.",
  },
  {
    t: "AI needs a human contract",
    d: "Four AI products taught me the hard problem isn't the model — it's deciding what the AI does alone, and where people stay in the loop.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" aria-label="Selected work" className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
            Selected work
          </h2>
        </Reveal>
        <div>
          {works.map((w, i) => (
            <WorkCard key={w.company} work={w} index={i} />
          ))}
        </div>
      </section>

      <section id="about" aria-label="About" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-24 grid gap-12 sm:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
              How I work
            </h2>
            <p className="mt-6 text-lg leading-relaxed">
              Six years across Intuit, EA, Rocket, ADL, Augmedix, and two founding
              roles. BFA in HCI, MBA in Design Strategy, U.S. Navy before that.
            </p>
          </Reveal>
          <div className="flex flex-col gap-10">
            {principles.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1}>
                <h3 className="text-xl font-medium tracking-tight">{p.t}</h3>
                <p className="mt-2 text-muted leading-relaxed">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Contact" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Currently designing policy intelligence at State Affairs
            </p>
            <h2 className="mt-6 text-4xl sm:text-5xl font-medium tracking-tighter">
              Let&apos;s build something that ships.
            </h2>
            <a
              href="mailto:ac.design.px@gmail.com"
              className="mt-10 inline-block rounded-full bg-ink text-paper px-8 py-4 text-sm font-medium transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              ac.design.px@gmail.com
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
