"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EMAIL = "ac.design.px@gmail.com";

/* ---------------------------------------------------------------- icons -- */

const i = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const MailIcon = (
  <svg {...i}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7.5 8.5 6 8.5-6" />
  </svg>
);
const CheckIcon = (
  <svg {...i}>
    <path d="m5 13 4 4L19 7" />
  </svg>
);
const CoffeeIcon = (
  <svg {...i}>
    <path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M17 9h2.2a2.3 2.3 0 0 1 0 4.6H17" />
    <path d="M7 2.5v2M11 2.5v2M15 2.5v2" />
    <path d="M3 21h16" />
  </svg>
);
const ResumeIcon = (
  <svg {...i}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M12 11v6m0 0 2.5-2.5M12 17l-2.5-2.5" />
  </svg>
);
const GitHubIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.82 1.18 1.85 1.18 3.11 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
  </svg>
);
const LinkedInIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z" />
  </svg>
);
const XIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.1z" />
  </svg>
);
const PinIcon = (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

/* ------------------------------------------------------------- subparts -- */

/** Avatar with a graceful monogram fallback if /avatar.jpg isn't there yet. */
export function Avatar({ className = "" }: { className?: string }) {
  const [missing, setMissing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A 404 resolves before hydration, so the onError handler below never gets
  // attached in time and the browser paints its broken-image glyph. Re-check
  // the already-settled image on mount and fall back to the monogram.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, []);

  if (missing) {
    return (
      <div className={`grid place-items-center bg-accent/10 font-serif text-accent ${className}`}>
        AC
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/avatar.jpg"
      alt="Anton Castro"
      className={`object-cover ${className}`}
      onError={() => setMissing(true)}
    />
  );
}

function Tile({
  label,
  icon,
  href,
  external,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span className="emboss emboss-hover flex size-12 items-center justify-center rounded-xl bg-paper text-muted transition-[color,transform] duration-150 group-hover:scale-[1.04] group-hover:text-accent group-active:scale-[0.97]">
        {icon}
      </span>
      <span className="text-[10px] text-muted/80">{label}</span>
    </>
  );
  const cls = "group flex flex-col items-center gap-1.5";
  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cls}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ----------------------------------------------------------------- card -- */

/**
 * Profile card: opens upward from the bottom nav's avatar button.
 * Structure follows prestonb.xyz (80px avatar, name, role, tagline, a
 * location/time meta row, rule, 3x2 tile grid), rebuilt on this site's
 * warm paper tokens instead of the reference's dark surface.
 */
export default function ProfileCard({
  open,
  onClose,
  anchorRef,
}: {
  open: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/Los_Angeles",
        timeZoneName: "short",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const card = cardRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (card && !card.contains(t) && !anchorRef?.current?.contains(t)) onClose();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, onClose, anchorRef]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={cardRef}
          role="dialog"
          aria-label="About Anton Castro"
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "bottom center" }}
          className="emboss absolute bottom-full left-1/2 mb-3 w-[310px] -translate-x-1/2 rounded-2xl bg-paper/95 p-5 shadow-[0_24px_60px_-18px_rgba(22,20,15,0.35)] backdrop-blur-xl"
        >
          {/* Header */}
          <div className="mb-4 flex flex-col items-center text-center">
            <div className="mb-3 size-20 shrink-0 overflow-hidden rounded-full ring-2 ring-line">
              <Avatar className="h-full w-full text-xl" />
            </div>
            <h2 className="text-base font-semibold tracking-tight">Anton Castro</h2>
            <p className="text-sm text-muted">Product Engineer &amp; Designer</p>
          </div>

          {/* Meta */}
          <div className="mb-4 flex items-center justify-center gap-3 text-[11px] text-muted/80">
            <span className="flex items-center gap-1">
              {PinIcon} San Francisco, CA
            </span>
            <span className="flex items-center gap-1" suppressHydrationWarning>
              {ClockIcon} {time || "—"}
            </span>
          </div>

          <div className="mb-4 h-px bg-line" />

          {/* Tiles */}
          <div className="grid grid-cols-3 gap-x-3 gap-y-4">
            <Tile
              label={copied ? "Copied!" : "Copy Email"}
              icon={copied ? CheckIcon : MailIcon}
              onClick={copyEmail}
            />
            <Tile label="GitHub" icon={GitHubIcon} href="https://github.com/acaspx" external />
            <Tile
              label="LinkedIn"
              icon={LinkedInIcon}
              href="https://www.linkedin.com/in/antoncastroe/"
              external
            />
            <Tile label="X" icon={XIcon} href="https://x.com/studioacas" external />
            <Tile
              label="Coffee chat"
              icon={CoffeeIcon}
              href="https://calendly.com/ac-design-px/30min"
              external
            />
            <Tile label="Résumé" icon={ResumeIcon} href="/resume.pdf" external />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
