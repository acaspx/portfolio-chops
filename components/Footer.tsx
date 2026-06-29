import Link from "next/link";
import AsteriskMark from "@/components/AsteriskMark";
import LocalTime from "@/components/LocalTime";

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
              className="cta-metal mt-7 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              ac.design.px@gmail.com
              <span aria-hidden>→</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Care about design, impact, and AI products that actually ship? You know where to
              find me.
            </p>
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

            {/* Status */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Status</p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  Open to new roles
                </li>
                <li>Based in San Francisco</li>
                <li>
                  Local time <LocalTime />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            aria-label="Home"
            className="inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
          >
            <AsteriskMark className="h-5 w-5" />
            <span className="font-serif text-lg tracking-tight">studioacas</span>
          </Link>
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} studioacas · designed &amp; built{" "}
            <a
              href="https://github.com/acaspx/portfolio-chops"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line text-ink/80 hover:text-ink"
            >
              in code
            </a>{" "}
            · Next.js + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
