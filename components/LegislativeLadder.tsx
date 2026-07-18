import Reveal from "@/components/Reveal";

/**
 * "Eight stages, one signal" - the legislative journey converging into State
 * Affairs intelligence. Eight stages grouped into three phases (mirroring the
 * AgentStack layers); the first three are verified complete, the rest carry a
 * momentum score. Everything funnels into the navy intelligence panel, which
 * forks to the two audiences. Pure markup, responsive, no client JS.
 */

type Stage = { n: string; title: string; done?: boolean; momentum?: number };
type Phase = { label: string; grow: string; stages: Stage[] };

const phases: Phase[] = [
  {
    label: "Origin",
    grow: "sm:flex-[2]",
    stages: [
      { n: "01", title: "Introduced", done: true },
      { n: "02", title: "Committee", done: true },
    ],
  },
  {
    label: "Deliberation",
    grow: "sm:flex-[4]",
    stages: [
      { n: "03", title: "Floor debate", done: true },
      { n: "04", title: "First vote", momentum: 70 },
      { n: "05", title: "Second chamber", momentum: 50 },
      { n: "06", title: "Conference", momentum: 40 },
    ],
  },
  {
    label: "Enactment",
    grow: "sm:flex-[2]",
    stages: [
      { n: "07", title: "Governor", momentum: 80 },
      { n: "08", title: "Enacted", momentum: 30 },
    ],
  },
];

const outputs = ["What's Changed", "Momentum score", "Prioritized bills", "Cited answers"];

function CheckBadge() {
  return (
    <span className="absolute right-1.5 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border-[1.5px] border-[#2f7a59] bg-[#dff0e4] text-[#27613f]">
      <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden>
        <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function StageCard({ s }: { s: Stage }) {
  return (
    <div
      className={`relative flex min-h-[4.6rem] min-w-0 flex-1 flex-col rounded-xl border p-2 ${
        s.done ? "border-[#cfe3d4] bg-[#eef5ef]" : "border-line bg-[#f3f1ec]"
      }`}
    >
      {s.done && <CheckBadge />}
      <span className="font-mono text-[10px] text-muted/80">{s.n}</span>
      <span className="mt-1.5 break-words text-[11px] font-medium leading-tight tracking-tight">{s.title}</span>
      {typeof s.momentum === "number" && (
        <div className="mt-auto h-[5px] overflow-hidden rounded-full bg-line">
          <span className="block h-full rounded-full bg-[#2f7a59]" style={{ width: `${s.momentum}%` }} />
        </div>
      )}
    </div>
  );
}

export default function LegislativeLadder() {
  return (
    <Reveal>
      <figure className="my-10">
        {/* Legend */}
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span className="inline-block h-1.5 w-3.5 rounded-full bg-[#2f7a59]" />
          bar = momentum &amp; attention at each stage
        </div>

        {/* Eight stages, grouped into three phases */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
          {phases.map((p) => (
            <div key={p.label} className={`flex flex-col ${p.grow}`}>
              <p className="mb-1.5 text-left font-mono text-[10px] uppercase tracking-widest text-muted/70 sm:text-center">
                {p.label}
              </p>
              <div className="grid flex-1 grid-cols-2 gap-1.5 sm:flex">
                {p.stages.map((s) => (
                  <StageCard key={s.n} s={s} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Funnel */}
        <div className="flex h-7 items-center justify-center text-line">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 5l6 6 6-6M6 12l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* State Affairs Intelligence panel */}
        <div className="flex flex-wrap items-center gap-4 rounded-xl bg-accent p-4 sm:p-5">
          <div className="flex-1 basis-48">
            <p className="text-lg font-medium tracking-tight text-paper">State Affairs Intelligence</p>
            <p className="mt-0.5 text-[13px] text-paper/65">
              AI Chat + 360&deg; View, context aware at all eight stages
            </p>
          </div>
          <div className="grid flex-1 basis-60 grid-cols-2 gap-1.5">
            {outputs.map((o) => (
              <span
                key={o}
                className="flex items-center gap-2 rounded-md bg-[#2b3a5c] px-2.5 py-1.5 text-[11.5px] text-paper/90"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#5bbf97]" />
                {o}
              </span>
            ))}
          </div>
        </div>

        {/* Two-audience fork */}
        <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
          <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-line bg-paper px-3.5 py-3">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" className="shrink-0 text-accent" aria-hidden>
              <path d="M3 21h18M5 21V5a1 1 0 011-1h7a1 1 0 011 1v16M14 9h4a1 1 0 011 1v11M8 7h2M8 11h2M8 15h2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="text-[13px] font-medium tracking-tight">50-state enterprise view</p>
              <p className="text-[11px] text-muted">Scale across every legislature</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-line bg-paper px-3.5 py-3">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" className="shrink-0 text-accent" aria-hidden>
              <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <div>
              <p className="text-[13px] font-medium tracking-tight">Single-state focus</p>
              <p className="text-[11px] text-muted">One jurisdiction, in depth</p>
            </div>
          </div>
        </div>

        <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-wide text-muted">
          contextually aware intelligence, personalized for each customer and enterprise
        </figcaption>
      </figure>
    </Reveal>
  );
}
