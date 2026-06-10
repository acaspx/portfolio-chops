"use client";

import { motion, useReducedMotion } from "motion/react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#prototypes", label: "Prototypes" },
  { href: "#experience", label: "Experience" },
  { href: "https://www.linkedin.com/in/antoncastroe/", label: "LinkedIn", external: true },
  { href: "mailto:ac.design.px@gmail.com", label: "Email" },
  { href: "https://github.com/acaspx", label: "GitHub", external: true },
  { href: "/resume.pdf", label: "Resume ↓", external: true },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28">
      <motion.div {...fade(0)} className="flex items-center gap-5">
        {/* TODO(Anton): drop a photo at public/avatar.jpg and swap this for <Image> */}
        <div
          aria-hidden
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-line bg-ink/[0.04] font-mono text-lg"
        >
          AC
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tighter">Anton Castro</h1>
          <p className="mt-1 text-muted">Product Designer & Design Engineer in San Francisco</p>
        </div>
      </motion.div>

      <motion.nav {...fade(0.1)} aria-label="Profile" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="link-line text-muted hover:text-ink"
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {l.label}
          </a>
        ))}
      </motion.nav>

      <motion.p {...fade(0.2)} className="mt-10 max-w-2xl text-lg sm:text-xl leading-relaxed">
        Hi, I&apos;m Anton 👋 — a technical product designer with a knack for systems
        thinking and finding hidden problems throughout the product value chain. I
        design AI products that <em className="not-italic text-accent">ship and scale</em> —
        0→1 four times across healthcare, fintech, and govtech — and I prototype in
        code. My craft: design for consistency, build for flexibility.
      </motion.p>

      <motion.div {...fade(0.3)} className="mt-8 flex items-center gap-6">
        <a
          href="mailto:ac.design.px@gmail.com"
          className="rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Book a coffee chat ☕
        </a>
        <a href="#work" className="link-line text-sm text-muted hover:text-ink">
          Selected work ↓
        </a>
      </motion.div>
    </section>
  );
}
