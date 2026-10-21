import type { IndexItem } from "@/components/IndexSection";

/**
 * The project list, shared by the home index and the Work overlay, so a
 * project added here shows up in both. `img` is the overlay card's image;
 * `meta`, `desc` and `gallery` feed the home page.
 */

export const work: IndexItem[] = [
  {
    label: "State Affairs",
    meta: "$70M Series C",
    href: "/work/state-affairs",
    locked: true,
    img: "/work/sa-agent-laptop.jpg",
    alt: "The State Affairs AI agent answering a question about a bill",
    desc: "Led the company's first AI product, from a chatbot to an analyst agent. First enterprise customers: Walmart and DoorDash.",
    gallery: [
      { src: "/work/sa-agent-laptop.jpg", alt: "The State Affairs AI agent answering a question about a bill" },
      { src: "/work/sa-ai-chat.png", alt: "AI Chat expanded: policy intelligence on demand, with cited answers over legislative data" },
      { src: "/work/sa-360-overview.png", alt: "AI Chat generating a 360° View: briefing, active-states map, momentum and forecast in one surface" },
      { src: "/work/sa-whats-changed.png", alt: "What's Changed panel: the most important items since your last visit, ranked by priority" },
    ],
  },
  {
    label: "Custoria Vault",
    meta: "~150 users in 90 days",
    href: "/work/custoria",
    img: "/work/cu-preview.jpg",
    alt: "The Custoria iOS app: an item detail for a vintage ring, vault analytics by category, and the AI analyzing three photos",
    desc: "Co-founded and built an AI vault for valuables, designed end to end and shipped to the App Store in Swift.",
    gallery: [
      { src: "/work/cu-preview.jpg", alt: "The Custoria iOS app: an item detail for a vintage ring, vault analytics by category, and the AI analyzing three photos" },
      { src: "/work/cu-hero-desk.jpg", alt: "The Custoria Labs web vault on a MacBook in a jewelry studio: a private catalog of rings, earrings, and loose stones" },
    ],
  },
  {
    label: "Augmedix",
    meta: "$139M acquisition",
    href: "/work/augmedix",
    img: "/work/ax-mobile.png",
    alt: "Augmedix Assist: a phone showing an AI-drafted clinical note",
    desc: "Scaled AI clinical documentation from one product to four, through a $139M acquisition.",
    gallery: [
      { src: "/work/ax-mobile.png", alt: "Augmedix Assist: a phone showing an AI-drafted clinical note" },
      { src: "/work/ax-hca-pilot.jpg", alt: "Two HCA emergency medicine clinicians reviewing an AI-drafted note on Augmedix Go ED" },
      { src: "/work/ax-platform.png", alt: "Augmedix platform diagram: visit, documentation, and EHR stages" },
    ],
  },
  {
    label: "Rocket",
    meta: "−75% onboarding",
    href: "/work/rocket",
    img: "/work/rk-hero.png",
    alt: "Rocket Mortgage homepage with the Liv chat assistant open",
    desc: "Founding designer on Liv, Rocket's conversational AI for homeowners. Cut client onboarding time by 75%.",
    gallery: [
      { src: "/work/rk-hero.png", alt: "Rocket Mortgage homepage with the Liv chat assistant open" },
      { src: "/work/rk-parity.png", alt: "Rocket onboarding as a familiar web form and as a conversation with Liv, sharing the same goals" },
      { src: "/work/rk-personalization.png", alt: "A loan-type selection on mobile flowing into a personalized Rocket dashboard" },
      { src: "/work/rk-routing.png", alt: "Before and after of the banker console with routing accuracy results" },
    ],
  },
];

// Side projects: built on my own time, shipped in public. Same row pattern as
// Work so the page reads as one index; these open the live thing, not a case.
export const more: IndexItem[] = [
  {
    label: "Agent Pit Stop",
    meta: "Open-source design system",
    href: "https://agent-pitstop.vercel.app",
    external: true,
    img: "/work/pitstop.jpg",
    alt: "Agent Pit Stop: an agent run as a lap around a track, pulling into a human-in-the-loop pit to approve, deny or steer",
    desc: "An open-source design system for the moments an agent hands control back to a person.",
    gallery: [
      { src: "/work/pitstop.jpg", alt: "Agent Pit Stop: an agent run as a lap around a track, pulling into a human-in-the-loop pit to approve, deny or steer" },
    ],
  },
  {
    label: "Terrarium",
    meta: "Ecosystem simulation",
    href: "https://terrarium-sim.vercel.app",
    external: true,
    img: "/work/terrarium.jpg",
    alt: "A 3D greenhouse terrarium on a desk: fittonia, fern, moss and driftwood over soil and gravel, its glass beaded with condensation",
    desc: "Build closed terrariums and watch them live: water cycle, plants, mold and springtails, in 3D.",
    gallery: [
      { src: "/work/terrarium.jpg", alt: "A 3D greenhouse terrarium on a desk: fittonia, fern, moss and driftwood over soil and gravel, its glass beaded with condensation" },
    ],
  },
];
