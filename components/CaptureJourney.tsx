import Reveal from "@/components/Reveal";
import type { ReactNode } from "react";

/**
 * Custoria capture-to-vault user journey, drawn from the shipped iOS flow.
 * Pure CSS/SVG, no client JS. Blue steps are the owner's; violet steps are
 * the AI's - the design POV is legible in the color: effort front-loaded once,
 * AI accountable in the middle, the human holding final say.
 */

type Actor = "you" | "ai";

type Step = {
  n: string;
  actor: Actor;
  title: string;
  what: string;
  note: string;
  icon: ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const steps: Step[] = [
  {
    n: "01",
    actor: "you",
    title: "Capture",
    what: "A guided scan asks for 3–5 photos from different angles.",
    note: "Effort is front-loaded once, so accuracy never becomes the owner's job.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path {...stroke} d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
        <circle {...stroke} cx="12" cy="12.5" r="3.2" />
      </svg>
    ),
  },
  {
    n: "02",
    actor: "you",
    title: "Review",
    what: "The app confirms it has enough: “Ready for AI analysis.”",
    note: "Confidence is shown before the work starts, not just after.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path {...stroke} d="M4 8.5 12 4l8 4.5-8 4.5z" />
        <path {...stroke} d="M4 12.5 12 17l8-4.5" />
        <path {...stroke} d="M4 16.5 12 21l8-4.5" />
      </svg>
    ),
  },
  {
    n: "03",
    actor: "ai",
    title: "Analyze",
    what: "Gemini Flash reads the images, identifies, prices, cross-references.",
    note: "The wait is narrated step by step, so the AI reads as accountable.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path {...stroke} d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" />
        <path {...stroke} d="M18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z" />
      </svg>
    ),
  },
  {
    n: "04",
    actor: "ai",
    title: "Identify",
    what: "Name, brand, model, year, condition, rarity, value, as fields.",
    note: "Structured and editable, never a chat blob the owner can't inspect.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path {...stroke} d="M4 4h7l9 9-7 7-9-9z" />
        <circle {...stroke} cx="8.5" cy="8.5" r="1.4" />
      </svg>
    ),
  },
  {
    n: "05",
    actor: "ai",
    title: "Confirm",
    what: "92% confidence shown; the owner edits any field, then saves.",
    note: "The AI proposes, the owner disposes; final say stays with the human.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path {...stroke} d="M12 3l2.3 1.7 2.8-.3 1 2.6 2.3 1.6-.6 2.8.6 2.8-2.3 1.6-1 2.6-2.8-.3L12 21l-2.3-1.7-2.8.3-1-2.6L3.6 15.4l.6-2.8-.6-2.8 2.3-1.6 1-2.6 2.8.3z" />
        <path {...stroke} d="M9 12.2l2 2 4-4.2" />
      </svg>
    ),
  },
  {
    n: "06",
    actor: "you",
    title: "Vault",
    what: "“Item added.” Totals tick up live to $215 across 2 items.",
    note: "Capture closes where ownership begins: a protected, valued record.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <rect {...stroke} x="4" y="10" width="16" height="11" rx="2" />
        <path {...stroke} d="M8 10V7a4 4 0 0 1 8 0v3" />
        <path {...stroke} d="M12 14.5v2.5" />
      </svg>
    ),
  },
];

function ActorDot({ actor }: { actor: Actor }) {
  return (
    <span
      aria-hidden
      className={`h-1.5 w-1.5 rounded-full ${actor === "ai" ? "bg-violet" : "bg-accent"}`}
    />
  );
}

export default function CaptureJourney() {
  return (
    <Reveal>
      <figure className="my-10">
        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-xl border border-line bg-ink/[0.02] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted">{s.n}</span>
                <span
                  className={`grid h-8 w-8 place-items-center rounded-lg border border-line ${
                    s.actor === "ai" ? "text-violet" : "text-accent"
                  }`}
                >
                  {s.icon}
                </span>
              </div>
              <h3 className="mt-3 flex items-center gap-2 text-base font-medium tracking-tight">
                <ActorDot actor={s.actor} />
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-ink/80">{s.what}</p>
              <p className="mt-2 font-mono text-[11px] leading-snug text-muted">{s.note}</p>
            </div>
          ))}
        </div>
        <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
          <span>The capture-to-vault flow, from the shipped iOS app.</span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" /> owner
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-violet" /> AI
          </span>
          <span>Worked example: a $180 Heath Ceramics clock, identified at 92%.</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}
