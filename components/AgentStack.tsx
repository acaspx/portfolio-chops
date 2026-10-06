import Reveal from "@/components/Reveal";
import StackIcon, { type StackIconName } from "@/components/StackIcons";

/**
 * The three-layer agentic stack behind State Affairs' AI.
 * Reads top-down the way users meet it (experience first) and bottom-up the
 * way a job runs (ground, reason, present). Each row is led by an animated
 * isometric icon carrying that layer's concept; see StackIcons.
 */
const layers: {
  n: string;
  icon: StackIconName;
  name: string;
  job: string;
  agents: string[];
  note: string;
}[] = [
  {
    n: "03",
    icon: "experience",
    name: "Experience",
    job: "shape it to the person",
    agents: ["Personalization agent"],
    note: "Voices the answer for each user, in plain language, inside AI Chat and the 360° View.",
  },
  {
    n: "02",
    icon: "reasoning",
    name: "Reasoning",
    job: "reason over it",
    agents: ["Momentum-scoring agent", "Drafting agent"],
    note: "Weighs what is actually moving, then assembles a decision-ready brief.",
  },
  {
    n: "01",
    icon: "context",
    name: "Context",
    job: "ground it",
    agents: ["Retrieval agent"],
    note: "Pulls and cites every claim back to primary legislative sources.",
  },
];

export default function AgentStack() {
  return (
    <Reveal>
      <figure className="my-10">
        <div className="rounded-xl border border-line bg-paper/60 p-5 sm:p-7">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
              The agentic stack
            </p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              ~12 agents · 3 layers
            </p>
          </div>
          <ol className="space-y-3">
            {layers.map((l) => (
              <li
                key={l.n}
                className="grid grid-cols-[3.25rem_1fr] items-start gap-4 rounded-lg border border-accent/15 bg-accent/[0.04] p-4 sm:grid-cols-[4.25rem_1fr] sm:gap-5"
              >
                <span
                  className="mt-0.5 block h-[3.25rem] w-[3.25rem] sm:h-[4.25rem] sm:w-[4.25rem]"
                  aria-hidden
                >
                  <StackIcon name={l.icon} />
                </span>
                <div>
                  {/* stacked, not inline: the sans name and the mono job line
                      never sat flush on a shared baseline at these sizes */}
                  <div className="text-left">
                    <p className="font-medium leading-tight tracking-tight">{l.name}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase leading-tight tracking-widest text-muted">
                      {l.job}
                    </p>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {l.agents.map((a) => (
                      <span
                        key={a}
                        className="chip-soft rounded-md border border-accent/20 px-2.5 py-0.5 font-mono text-[11px]"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2.5 text-sm leading-snug text-muted">{l.note}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">
            Job in ↓ · grounded answer ↑
          </p>
        </div>
        <figcaption className="mt-2 font-mono text-xs text-muted">
          One job the user asks for, run end to end by a dozen agents across three layers.
        </figcaption>
      </figure>
    </Reveal>
  );
}
