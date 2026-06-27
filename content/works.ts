import type { Work } from "@/components/WorkCard";

/** Shared case-study data, used by the desktop home grid and the mobile layout. */
export const works: Work[] = [
  {
    slug: "state-affairs",
    company: "State Affairs",
    title: "State Affairs' first AI product, from 0→1 to Walmart and DoorDash",
    tags: "0→1 Enterprise AI",
    year: "2026",
    result:
      "They had the data and the journalists but no product turning it into decisions, and had never shipped AI. I led their first AI product to its first enterprise contracts.",
    metrics: [
      { value: "0→1", label: "first AI product" },
      { value: "First", label: "enterprise contracts" },
    ],
    images: [
      { file: "sa-bill.png", alt: "Bill detail view for A 9349: AI analysis, legislative progress, momentum, and bill management" },
      { file: "sa-bills.png", alt: "Bills grouped by AI momentum score" },
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
      { file: "ax-mobile.png", alt: "Augmedix Assist mobile app" },
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
      { file: "rk-hero.png", alt: "Liv chat on Rocket's homepage" },
      { file: "rk-patterns.png", alt: "Conversation design pattern library" },
      { file: "rk-routing.png", alt: "Banker console routing accuracy" },
    ],
  },
];
