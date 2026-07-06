"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// NOTE (soft gate): this password lives in the client bundle, so it deters
// casual viewing but is not real security. To set it, change CASE_PASSWORD.
// For true protection, gate on the server (middleware + cookie).
export const CASE_PASSWORD = "SA26";
export const UNLOCK_KEY = "sa-unlocked";

/** Full-screen password modal with a transparent, blurred overlay. */
export default function PasswordGate({
  onUnlock,
  title = "This case study is protected",
  subtitle = "Enter the password to view the State Affairs case study.",
}: {
  onUnlock: () => void;
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
    <div className="fixed inset-0 z-[100] grid place-items-center px-6">
      {/* Transparent, blurred overlay */}
      <div aria-hidden className="absolute inset-0 bg-ink/40 backdrop-blur-md" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Password required"
        initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-2xl border border-line bg-paper/95 p-8 shadow-2xl backdrop-blur"
      >
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-paper">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
            <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
            <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className="mt-5 font-serif text-2xl tracking-tight">{title}</h2>
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
          Reach out for access
        </p>
      </motion.div>
    </div>
  );
}
