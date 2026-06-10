"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#prototypes", label: "Prototypes" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "mailto:ac.design.px@gmail.com", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const isCaseStudy = pathname?.startsWith("/work");

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/80 border-b border-line">
      {/* Reading progress — only on case studies */}
      {isCaseStudy && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-accent origin-left"
          style={{ scaleX: progress }}
        />
      )}
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-ink hover:text-accent transition-colors"
        >
          anton castro<span className="text-accent">_</span>
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="link-line text-muted hover:text-ink transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
