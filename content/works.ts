import type { Work } from "@/components/WorkCard";

/** Shared case-study data, used by the desktop home grid and the mobile layout. */
export const works: Work[] = [
  {
    slug: "state-affairs",
    company: "State Affairs",
    title: "State Affairs' first AI product, from 0→1 to Walmart and DoorDash",
    tags: "0→1 Enterprise AI",
    year: "2026",
    locked: true,
    result:
      "The data and the journalists were there, but no product turning it into decisions, and no AI. I led the AI features that landed State Affairs' first enterprise contracts.",
    metrics: [
      { value: "0→1", label: "first AI product" },
      { value: "12 agents", label: "across 360° Views + AI Chat" },
      { value: "Walmart + DoorDash", label: "first enterprise customers" },
    ],
    images: [
      { file: "sa-agent-laptop.jpg", alt: "A hand on a MacBook showing the State Affairs AI Agent answering a question about a bill, on a wooden desk" },
      { file: "sa-bill.png", alt: "Bill detail view for A 9349: AI analysis, legislative progress, momentum, and bill management" },
      { file: "sa-whats-changed.png", alt: "What's Changed priority panel since last visit" },
    ],
  },
  {
    slug: "augmedix",
    company: "Augmedix",
    title: "A $139M acquisition, scaling AI documentation from one product to four",
    tags: "AI Platform & Design Systems",
    year: "2023–24",
    result:
      "Documentation was burning out clinicians. I scaled the AI from one product to four without fragmenting it, into a $139M acquisition.",
    metrics: [
      { value: "+65%", label: "engagement" },
      { value: "1→4", label: "offerings" },
      { value: "$139M", label: "acquisition" },
    ],
    images: [
      { file: "ax-web-app.png", alt: "Augmedix web app documentation flow" },
      { file: "ax-platform.png", alt: "Augmedix platform overview: visit, documentation, and EHR" },
      { file: "ax-design-system.png", alt: "Augmedix design system components" },
    ],
  },
  {
    slug: "rocket",
    company: "Rocket",
    title: "−75% onboarding, for an AI serving millions of homeowners",
    tags: "Conversational AI",
    year: "2022–23",
    result:
      "Homeowners were abandoning onboarding at the worst possible moment. I rebuilt it around a conversation system to connect clients with the right banker and data they can trust.",
    metrics: [
      { value: "−75%", label: "onboarding time" },
      { value: "+22%", label: "banker routing" },
      { value: "94%", label: "routing accuracy" },
    ],
    images: [
      { file: "rk-patterns.png", alt: "Conversation design pattern library" },
      { file: "rk-routing.png", alt: "Banker console routing accuracy" },
      { file: "rk-disaster.png", alt: "Rocket's natural-disaster recovery guide, with Liv" },
    ],
  },
];
