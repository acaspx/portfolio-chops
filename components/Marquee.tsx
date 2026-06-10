const companies = [
  "State Affairs",
  "Custoria Labs",
  "Augmedix → Commure",
  "Rocket",
  "ADL",
  "Intuit",
  "Electronic Arts",
  "U.S. Navy",
];

/**
 * Text-based company marquee. Pure CSS animation (GPU-friendly),
 * pauses on hover, disabled entirely under prefers-reduced-motion
 * via the global media query in globals.css.
 */
export default function Marquee() {
  const row = [...companies, ...companies];
  return (
    <div
      aria-label="Companies I've designed for"
      className="border-y border-line overflow-hidden py-4 select-none"
    >
      <div className="marquee flex w-max gap-12 hover:[animation-play-state:paused]">
        {row.map((c, i) => (
          <span
            key={i}
            aria-hidden={i >= companies.length}
            className="font-mono text-xs uppercase tracking-widest text-muted whitespace-nowrap"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
