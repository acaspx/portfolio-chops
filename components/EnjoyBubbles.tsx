// PLACEHOLDERS - swap these for Anton's real interests (emoji + short label).
const enjoy = [
  { icon: "☕", label: "Coffee" },
  { icon: "📷", label: "Photography" },
  { icon: "🏔️", label: "The outdoors" },
  { icon: "🎮", label: "Games" },
  { icon: "🎧", label: "Music" },
  { icon: "✏️", label: "Sketching" },
];

/**
 * A light "off the clock" card of frosted-glass bubbles. Each rests as an icon
 * and expands into a teal pill revealing the label on hover. Pure CSS hover,
 * no JS. Replaces the closing CTA on the home page.
 */
export default function EnjoyBubbles() {
  return (
    <section aria-label="Things I enjoy">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">
          Off the clock
        </p>
        <p className="mt-2 text-center text-sm text-muted">
          Experiences that help me develop my &ldquo;taste&rdquo;
        </p>
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-line bg-gradient-to-b from-accent/[0.07] to-accent/[0.01] p-7 shadow-sm sm:p-12">
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {enjoy.map((e) => (
              <li key={e.label}>
                <div className="group inline-flex h-16 items-center overflow-hidden rounded-2xl border border-white/70 bg-white/50 shadow-sm backdrop-blur transition-all duration-300 ease-out hover:bg-accent hover:px-5 hover:shadow-md">
                  <span
                    aria-hidden
                    className="grid h-16 w-16 shrink-0 place-items-center text-2xl transition-all duration-300 ease-out group-hover:w-0 group-hover:opacity-0"
                  >
                    {e.icon}
                  </span>
                  <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-paper opacity-0 transition-all duration-300 ease-out group-hover:max-w-[12rem] group-hover:opacity-100">
                    {e.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
