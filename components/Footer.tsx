"use client";

import { useState } from "react";
import Link from "next/link";
import AboutModal from "@/components/AboutModal";
import HeartMatrix from "@/components/HeartMatrix";
import HeartCounter from "@/components/HeartCounter";

const explore = [
  { label: "Work", href: "/#work" },
  { label: "Built", href: "/#prototypes" },
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
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <footer>
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          {/* Pixel heart, links to email */}
          <a
            href="mailto:ac.design.px@gmail.com"
            aria-label="Email Anton Castro"
            className="inline-block transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98]"
          >
            <HeartMatrix />
          </a>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">What&apos;s more</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {explore.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-line text-muted hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setAboutOpen(true)}
                    className="link-line text-muted hover:text-ink"
                  >
                    About
                  </button>
                </li>
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
              <p className="font-mono text-xs uppercase tracking-widest text-accent">Connect</p>
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
        <div className="mt-14 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} studioacas · build like you mean it
          </p>
          <HeartCounter />
        </div>
      </div>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </footer>
  );
}
