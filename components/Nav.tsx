"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import AboutModal from "@/components/AboutModal";
import ContactCard from "@/components/ContactCard";
import AsteriskMark from "@/components/AsteriskMark";
import SocialLinks from "@/components/SocialLinks";

const links = [{ href: "/#work", label: "Work" }];

const PILL_SHADOW =
  "shadow-[0_6px_22px_-8px_rgba(22,20,15,0.16),0_0_0_1px_rgba(22,20,15,0.06)]";

export default function Nav() {
  const pathname = usePathname();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactFromMobile, setContactFromMobile] = useState(false);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const mobileContactBtnRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const isCaseStudy = pathname?.startsWith("/work");

  // Past the landing state the desktop pill retreats and only the mark stays.
  // Case studies keep the full bar: the reading-progress line lives on it.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const collapsed = scrolled && !isCaseStudy;

  const navLinks = (
    <>
      {links.map((l) => (
        <li key={l.label}>
          <Link href={l.href} className="link-line text-muted transition-colors hover:text-ink">
            {l.label}
          </Link>
        </li>
      ))}
      <li>
        <button
          onClick={() => setAboutOpen(true)}
          className="link-line text-muted transition-colors hover:text-ink"
        >
          About
        </button>
      </li>
    </>
  );

  return (
    <>
      {/* Desktop: floating top bar that retreats to just the mark on scroll */}
      <header className="sticky top-0 z-40 hidden sm:block">
        <div className="mx-auto max-w-5xl px-6 pt-4">
          <div className="relative">
            <div
              className={`relative rounded-2xl backdrop-blur-md transition-[opacity,transform,background-color] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                collapsed
                  ? "pointer-events-none -translate-y-2 opacity-0"
                  : `opacity-100 ${PILL_SHADOW}`
              } ${scrolled ? "bg-paper/70" : "bg-paper/85"}`}
            >
              {isCaseStudy && (
                <motion.div
                  aria-hidden
                  className="absolute bottom-[3px] left-3 right-3 h-[2px] origin-left rounded-full bg-accent"
                  style={{ scaleX: progress }}
                />
              )}
              <nav aria-label="Main" className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-10">
                  {/* Space held for the mark, which lives outside the pill */}
                  <span aria-hidden className="h-10 w-10 shrink-0" />
                  <ul className="flex items-center gap-6 text-sm">
                    {navLinks}
                    <li>
                      <button
                        ref={contactBtnRef}
                        onClick={() => {
                          setContactFromMobile(false);
                          setContactOpen((o) => !o);
                        }}
                        aria-haspopup="dialog"
                        aria-expanded={contactOpen}
                        className="link-line text-muted transition-colors hover:text-ink"
                      >
                        Contact
                      </button>
                    </li>
                  </ul>
                </div>
                <SocialLinks className="hidden sm:inline-flex" />
              </nav>

              <ContactCard
                open={contactOpen && !contactFromMobile}
                onClose={() => setContactOpen(false)}
                anchorRef={contactBtnRef}
              />
            </div>

            {/* The mark: anchored to the pill's left slot, never moves */}
            <Link
              href="/"
              aria-label="Home"
              className={`emboss emboss-hover absolute left-5 top-3 grid h-10 w-10 place-items-center rounded-xl text-accent backdrop-blur-md transition-colors duration-300 ${
                collapsed ? "bg-paper/85" : "bg-paper/70"
              }`}
            >
              <AsteriskMark className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile: the bar lives at the bottom, always in reach */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 sm:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto max-w-5xl px-4">
          <div className={`relative rounded-2xl bg-paper/85 backdrop-blur-md ${PILL_SHADOW}`}>
            {isCaseStudy && (
              <motion.div
                aria-hidden
                className="absolute top-[3px] left-3 right-3 h-[2px] origin-left rounded-full bg-accent"
                style={{ scaleX: progress }}
              />
            )}
            <nav aria-label="Main" className="flex items-center justify-between px-4 py-3">
              <Link
                href="/"
                aria-label="Home"
                className="emboss grid h-10 w-10 place-items-center rounded-xl bg-paper/70 text-accent"
              >
                <AsteriskMark className="h-6 w-6" />
              </Link>
              <ul className="flex items-center gap-6 text-sm">
                {navLinks}
                <li>
                  <button
                    ref={mobileContactBtnRef}
                    onClick={() => {
                      setContactFromMobile(true);
                      setContactOpen((o) => !o);
                    }}
                    aria-haspopup="dialog"
                    aria-expanded={contactOpen}
                    className="link-line text-muted transition-colors hover:text-ink"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>

            <ContactCard
              open={contactOpen && contactFromMobile}
              onClose={() => setContactOpen(false)}
              anchorRef={mobileContactBtnRef}
            />
          </div>
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
