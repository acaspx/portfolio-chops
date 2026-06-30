import Reveal from "@/components/Reveal";

/**
 * Simplified, mobile-first view of the Liv system: many entry points fan into
 * one personalized conversation, smart routing carries the context, and it fans
 * back out to the right Rocket solution. A clean stand-in for the dense desktop
 * system screenshot. Pure markup, matches the site's diagram language.
 */
const entries = ["Social ad", "Google search", "Rocket page", "and more"];
const solutions = [
  "RM Application",
  "Home Buying Plan",
  "MyRocket Dashboard",
  "Personal Loans",
  "Credit Card",
];

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RocketSystem() {
  return (
    <Reveal>
      <figure className="my-10">
        <div className="mx-auto max-w-[480px] rounded-xl border border-line bg-paper/60 p-5">
          <p className="text-center font-mono text-[11px] uppercase tracking-widest text-accent">
            How Liv works
          </p>

          <p className="mt-6 mb-2.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            Entry points
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {entries.map((e) => (
              <span
                key={e}
                className="emboss rounded-lg bg-paper px-3 py-1.5 text-[12.5px] text-ink"
              >
                {e}
              </span>
            ))}
          </div>

          <div className="flex h-6 items-center justify-center text-muted/60">
            <Chevron />
          </div>

          <div className="rounded-xl bg-accent p-4 text-center">
            <p className="text-base font-medium text-paper">One personalized conversation</p>
            <p className="mt-1 text-[12.5px] leading-snug text-paper/70">
              Liv adapts the Q&amp;A to the entry point, campaign, and what it already knows about the
              user.
            </p>
          </div>

          <div className="flex h-6 items-center justify-center text-muted/60">
            <Chevron />
          </div>

          <div className="emboss rounded-xl bg-paper p-4 text-center">
            <p className="text-base font-medium text-ink">Smart routing</p>
            <p className="mt-1 text-[12.5px] leading-snug text-muted">
              Full context is carried through, so the homeowner never repeats themselves and the
              right banker gets the handoff.
            </p>
          </div>

          <div className="flex h-6 items-center justify-center text-muted/60">
            <Chevron />
          </div>

          <p className="mt-1 mb-2.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            The right solution
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {solutions.map((s) => (
              <span
                key={s}
                className="emboss rounded-lg bg-paper px-3 py-1.5 text-[12.5px] text-ink"
              >
                {s}
              </span>
            ))}
          </div>

          <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-wide text-muted">
            many ways in · one conversation · the right way forward
          </p>
        </div>
      </figure>
    </Reveal>
  );
}
