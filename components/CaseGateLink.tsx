"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseGateOpenDetail } from "@/components/CaseGateOverlay";

/**
 * Renders a normal link for open case studies. For a locked one it renders a
 * button that opens the in-place password modal (via the `case-gate:open`
 * event) instead of navigating away, so dismissing returns the visitor to
 * exactly where they were.
 */
export default function CaseGateLink({
  href,
  locked,
  className,
  ariaLabel,
  children,
}: {
  href: string;
  locked?: boolean;
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
}) {
  if (locked) {
    return (
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent<CaseGateOpenDetail>("case-gate:open", { detail: { href } })
          )
        }
        className={className}
      >
        {children}
      </button>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}
