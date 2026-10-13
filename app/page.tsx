import MosaicName from "@/components/MosaicName";
import HeroLede from "@/components/HeroLede";
import IndexSection, { type IndexItem } from "@/components/IndexSection";

/**
 * Index-format landing (yangjames.com pattern): one narrow centred column,
 * the mosaic nameplate at the top, then quiet sections of label-left /
 * meta-right rows. The floating nav stays anchored at the bottom centre.
 *
 * The one real adaptation: the right column carries the OUTCOME, not a date.
 * A list of dates reads as a resume; a list of outcomes reads as a record.
 * Case study pages are untouched and still carry the depth.
 */

const work: IndexItem[] = [
  {
    label: "State Affairs",
    meta: "Walmart + DoorDash",
    href: "/work/state-affairs",
    locked: true,
    img: "/work/sa-agent-laptop.jpg",
    alt: "The State Affairs AI agent answering a question about a bill",
  },
  {
    label: "Custoria Vault",
    meta: "~150 users in 90 days",
    href: "/work/custoria",
    img: "/work/cu-preview.jpg",
    alt: "The Custoria iOS app: an item detail for a vintage ring, vault analytics by category, and the AI analyzing three photos",
  },
  {
    label: "Augmedix",
    meta: "$139M acquisition",
    href: "/work/augmedix",
    img: "/work/ax-mobile.png",
    alt: "Augmedix Assist: a phone showing an AI-drafted clinical note",
  },
  {
    label: "Rocket",
    meta: "−75% onboarding",
    href: "/work/rocket",
    img: "/work/rk-hero.png",
    alt: "Rocket Mortgage homepage with the Liv chat assistant open",
  },
];

const experience: IndexItem[] = [
  { label: "Custoria Labs · Founding Design Engineer", meta: "2025 –" },
  { label: "State Affairs · Sr. Interaction Designer", meta: "2026 –" },
  { label: "Augmedix · Product Designer, AI & Growth", meta: "2023 – 24" },
  { label: "Rocket · Conversational AI Designer", meta: "2022 – 23" },
  { label: "Anti-Defamation League · Product Designer", meta: "2021 – 22" },
  { label: "Intuit & Electronic Arts · Design Internships", meta: "2019 – 20" },
];

// Side projects: built on my own time, shipped in public. Same row pattern as
// Work so the page reads as one index; these open the live thing, not a case.
const more: IndexItem[] = [
  {
    label: "Agent Pit Stop",
    meta: "Open-source design system",
    href: "https://agent-pitstop.vercel.app",
    external: true,
    img: "/work/pitstop.jpg",
    alt: "Agent Pit Stop: an agent run as a lap around a track, pulling into a human-in-the-loop pit to approve, deny or steer",
  },
  {
    label: "Terrarium",
    meta: "Ecosystem simulation",
    href: "https://terrarium-sim.vercel.app",
    external: true,
    img: "/work/terrarium.jpg",
    alt: "A 3D greenhouse terrarium on a desk: fittonia, fern, moss and driftwood over soil and gravel, its glass beaded with condensation",
  },
];

const links = [
  { label: "email", href: "mailto:ac.design.px@gmail.com" },
  { label: "github", href: "https://github.com/acaspx" },
  { label: "linkedin", href: "https://www.linkedin.com/in/antoncastroe/" },
  { label: "resume", href: "/resume.pdf" },
];

export default function Home() {
  return (
    <>
      <div aria-hidden className="bg-landing pointer-events-none fixed inset-0 -z-10" />

      <div className="mx-auto w-full max-w-[35rem] px-5 pb-44 pt-12 sm:pt-16">
        <MosaicName />

        <p className="mt-5 text-[15px] text-muted">Product Engineer &amp; Designer</p>
        <HeroLede leadClassName="mt-4 text-[15px] leading-relaxed text-balance" />

        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[12px] text-muted">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <IndexSection title="Work" items={work} />
          <IndexSection title="Experience" items={experience} />
          <IndexSection title="What's more?" items={more} />
        </div>
      </div>
    </>
  );
}
