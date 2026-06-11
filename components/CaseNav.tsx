"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export type CaseSection = { id: string; label: string };

/**
 * Persistent side rail for case studies. Tracks the section in view via
 * IntersectionObserver and highlights it; click scrolls smoothly (native,
 * via scroll-behavior: smooth on <html>). Hidden below xl - the sticky
 * top nav + reading progress bar covers small screens.
 */
export default function CaseNav({ sections }: { sections: CaseSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the viewport that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Case study sections"
      className="fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ul className="space-y-1">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="case-nav-indicator"
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block py-1.5 pl-4 font-mono text-xs tracking-wide transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
