"use client";

import { useState } from "react";

/**
 * Share the portfolio. Uses the native share sheet where it exists (mobile,
 * Safari), and quietly falls back to copying the link with a confirmation
 * state everywhere else. Cancelling the share sheet does nothing, rather than
 * silently copying behind the user's back.
 */
export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url =
      typeof window !== "undefined" ? window.location.origin : "https://studioacas.com";
    const data = {
      title: "Anton Castro · Sr. Product Designer & Builder",
      text: "Designing AI-native products for high-stakes work.",
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        // User dismissed the sheet: leave it alone.
        if ((err as Error)?.name === "AbortError") return;
        // Anything else: fall through to the copy fallback.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; nothing useful to do.
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-live="polite"
      className="emboss emboss-hover inline-flex items-center gap-2.5 rounded-2xl bg-paper/70 px-5 py-2.5 text-sm text-muted transition-[color,box-shadow] duration-300 ease-out hover:text-ink"
    >
      {copied ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path d="M12 15V4" strokeLinecap="round" />
          <path d="M8.5 7.5 12 4l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12.5V19a1 1 0 001 1h10a1 1 0 001-1v-6.5" strokeLinecap="round" />
        </svg>
      )}
      {copied ? "Link copied" : "Share my portfolio"}
    </button>
  );
}
