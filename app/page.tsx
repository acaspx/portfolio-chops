import Hero from "@/components/Hero";
import WorkCard, { type Work } from "@/components/WorkCard";
import Reveal from "@/components/Reveal";
import SideProjects from "@/components/SideProjects";
import Experience from "@/components/Experience";

const works: Work[] = [
  {
    slug: "state-affairs",
    company: "State Affairs",
    title: "Turning dense policy data into decisions enterprise teams act on",
    tags: "0→1 Enterprise AI",
    year: "2026",
    result:
      "System architecture, voice, and interaction patterns for policy teams at Walmart, DoorDash, and trade associations.",
    metrics: [
      { value: "0→1", label: "first AI product" },
      { value: "First", label: "enterprise contracts" },
    ],
    images: [
      { file: "sa-360-overview.png", alt: "360° View overview with AI briefing and state map" },
      { file: "sa-bills.png", alt: "Bills grouped by AI momentum score" },
      { file: "sa-whats-changed.png", alt: "What's Changed priority panel since last visit" },
    ],
  },
  {
    slug: "augmedix",
    company: "Augmedix",
    title: "Scaling AI clinical documentation from one product to four",
    tags: "AI Platform & Design Systems",
    year: "2023–24",
    result:
      "Agentic AI shipped into the core documentation flow in four months, through the Commure acquisition.",
    metrics: [
      { value: "+65%", label: "engagement" },
      { value: "1→4", label: "offerings" },
      { value: "$139M", label: "acquisition" },
    ],
    images: [
      { file: "ax-web-app.png", alt: "Augmedix web app documentation flow" },
      { file: "ax-mobile.png", alt: "Augmedix Assist mobile app" },
      { file: "ax-design-system.png", alt: "Augmedix design system components" },
    ],
  },
  {
    slug: "rocket",
    company: "Rocket",
    title: "Liv, a conversational AI serving millions of homeowners",
    tags: "Conversational AI",
    year: "2022–23",
    result: "A conversation design system that rebuilt onboarding and earned the bankers' trust.",
    metrics: [
      { value: "−75%", label: "onboarding time" },
      { value: "+22%", label: "banker routing" },
      { value: "94%", label: "routing accuracy" },
    ],
    images: [
      { file: "rk-hero.png", alt: "Liv chat on Rocket's homepage" },
      { file: "rk-patterns.png", alt: "Conversation design pattern library" },
      { file: "rk-routing.png", alt: "Banker console routing accuracy" },
    ],
  },
];

export default function Home() {
  return (
    <>
      {/* Soft gradient + grain backdrop, landing only */}
      <div aria-hidden className="bg-landing pointer-events-none fixed inset-0 -z-10" />
      <Hero />

      <section id="work" aria-label="Selected work" className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
            Selected work
          </h2>
        </Reveal>
        <div className="space-y-5">
          {works.map((w, i) => (
            <WorkCard key={w.company} work={w} index={i} />
          ))}
        </div>
      </section>

      <SideProjects />

      <Experience />

      <section aria-label="Contact" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Currently designing policy intelligence at State Affairs
            </p>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl font-medium tracking-tight">
              Let&apos;s build something that <em className="text-accent">ships</em>.
            </h2>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-full cta-metal px-8 py-4 text-sm font-medium transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Resume ↓
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
