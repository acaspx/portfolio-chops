"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// NOTE (soft gate): this password lives in the client bundle, so it deters
// casual viewing but is not real security. To set it, change CASE_PASSWORD.
// For true protection, gate on the server (middleware + cookie).
export const CASE_PASSWORD = "SA26";
export const UNLOCK_KEY = "sa-unlocked";
const CONTACT_EMAIL = "ac.design.px@gmail.com";

/**
 * Password modal that overlays in place. The page behind stays visible through a
 * slight blur so the visitor keeps their bearings, and (when `onClose` is given)
 * clicking the backdrop, the close button, or pressing Escape dismisses it and
 * returns them exactly where they were.
 */
export default function PasswordGate({
  onUnlock,
  onClose,
  title = "This case study is protected",
  subtitle = "Enter the password to view more",
}: {
  onUnlock: () => void;
  /** Dismiss without unlocking (backdrop click, close button, or Escape). */
  onClose?: () => void;
  title?: string;
  subtitle?: string;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!onClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === CASE_PASSWORD) {
      try {
        sessionStorage.setItem(UNLOCK_KEY, "1");
      } catch {}
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center px-6"
      onClick={() => onClose?.()}
    >
      {/* Slight blur so the page behind stays legible: they know where they are. */}
      <div aria-hidden className="absolute inset-0 bg-ink/20 backdrop-blur-sm" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Password required"
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-2xl border border-line bg-paper/95 p-8 shadow-2xl backdrop-blur"
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-ink/[0.06] hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        )}

        <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{subtitle}</p>

        <form onSubmit={submit} className="mt-6">
          <motion.input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Password"
            aria-invalid={error}
            animate={error && !reduce ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-full rounded-lg border bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors ${
              error ? "border-red-400" : "border-line focus:border-accent"
            }`}
          />
          {error && (
            <p className="mt-2 text-xs text-red-500">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            className="cta-metal mt-4 w-full rounded-full px-5 py-3 text-sm font-medium transition-transform active:scale-[0.99]"
          >
            Unlock case study
          </button>
        </form>

        <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-widest text-muted">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=State%20Affairs%20case%20study%20access`}
            className="underline decoration-line underline-offset-4 transition-colors hover:text-accent"
          >
            Reach out for access
          </a>
        </p>
      </motion.div>
    </div>
  );
}
