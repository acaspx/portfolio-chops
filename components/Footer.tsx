import Link from "next/link";

// 11x7 pixel heart (1 = lit red square), matching the filled-heart peg pattern.
const HEART = [
  "00110001100",
  "01111111110",
  "01111111110",
  "00111111100",
  "00011111000",
  "00001110000",
  "00000100000",
];

const explore = [
  { label: "Work", href: "/#work" },
  { label: "Built", href: "/#prototypes" },
  { label: "Experience", href: "/#experience" },
];

const connect = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/antoncastroe/" },
  { label: "GitHub", href: "https://github.com/acaspx" },
  {
    label: "Substack",
    href: "https://substack.com/@acdesignpx?r=1ou43l&utm_medium=ios&utm_source=stories&shareImageVariant=blur",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr]">
          {/* Contact CTA */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Contact</p>
            <h2 className="mt-4 max-w-md font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Let&apos;s build something that <em className="text-accent">ships</em>.
            </h2>
            <a
              href="mailto:ac.design.px@gmail.com"
              aria-label="Email Anton Castro"
              className="mt-8 inline-block transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
            >
              <span
                aria-hidden
                className="grid w-[200px] gap-[5px]"
                style={{ gridTemplateColumns: "repeat(11, minmax(0, 1fr))" }}
              >
                {HEART.flatMap((row, r) =>
                  [...row].map((c, i) => (
                    <span
                      key={`${r}-${i}`}
                      className={`aspect-square rounded-[2px] ${
                        c === "1" ? "bg-[#e2403a]" : "bg-ink/[0.05]"
                      }`}
                    />
                  ))
                )}
              </span>
            </a>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {explore.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-line text-muted hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line text-muted hover:text-ink"
                  >
                    Résumé ↓
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Connect</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {connect.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line text-muted hover:text-ink"
                    >
                      {l.label} ↗
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:ac.design.px@gmail.com"
                    className="link-line text-muted hover:text-ink"
                  >
                    Email ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-line pt-6">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} studioacas · designed &amp; built with ❤️ and intention
          </p>
        </div>
      </div>
    </footer>
  );
}
