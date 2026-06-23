"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import AboutModal from "@/components/AboutModal";
import ContactCard from "@/components/ContactCard";
import AsteriskMark from "@/components/AsteriskMark";
import SocialLinks from "@/components/SocialLinks";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#prototypes", label: "Built" },
  { href: "/#experience", label: "Experience" },
];

export default function Nav() {
  const pathname = usePathname();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const isCaseStudy = pathname?.startsWith("/work");

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/80 border-b border-line">
      {/* Reading progress - only on case studies */}
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
        {/* Left: home mark + site navigation */}
        <div className="flex items-center gap-8 sm:gap-10">
          <Link
            href="/"
            aria-label="Home"
            className="grid h-10 w-10 place-items-center rounded-xl bg-paper/70 text-ink emboss emboss-hover transition-colors hover:text-accent"
          >
            <AsteriskMark className="h-6 w-6" />
          </Link>
          <ul className="flex items-center gap-5 sm:gap-6 text-sm">
            {links.slice(0, 3).map((l) => (
              <li key={l.label} className="hidden sm:list-item">
                <Link href={l.href} className="link-line text-muted hover:text-ink transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setAboutOpen(true)}
                className="link-line text-muted hover:text-ink transition-colors"
              >
                About
              </button>
            </li>
            <li className="relative">
              <button
                ref={contactBtnRef}
                onClick={() => setContactOpen((o) => !o)}
                aria-haspopup="dialog"
                aria-expanded={contactOpen}
                className="link-line text-muted hover:text-ink transition-colors"
              >
                Contact
              </button>
              <ContactCard
                open={contactOpen}
                onClose={() => setContactOpen(false)}
                anchorRef={contactBtnRef}
              />
            </li>
          </ul>
        </div>

        {/* Right: social links, kept right-aligned */}
        <SocialLinks
          className="hidden items-center gap-0.5 sm:flex"
          linkClassName="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
          iconClassName="h-[18px] w-[18px]"
        />
      </nav>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </header>
  );
}
