"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PasswordGate, { UNLOCK_KEY } from "@/components/PasswordGate";

export type CaseGateOpenDetail = { href: string };

/**
 * Global controller that opens the case password modal in place, over whatever
 * page the visitor is on, so they keep their context. Locked work cards dispatch
 * a `case-gate:open` CustomEvent (carrying the target href) instead of
 * navigating. On unlock we navigate; on dismiss we simply close, leaving the
 * visitor exactly where they were. Already-unlocked sessions skip the modal.
 */
export default function CaseGateOverlay() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<CaseGateOpenDetail>).detail;
      const to = detail?.href ?? null;
      let unlocked = false;
      try {
        unlocked = sessionStorage.getItem(UNLOCK_KEY) === "1";
      } catch {}
      if (unlocked) {
        if (to) router.push(to);
        return;
      }
      setHref(to);
      setOpen(true);
    };
    window.addEventListener("case-gate:open", onOpen as EventListener);
    return () => window.removeEventListener("case-gate:open", onOpen as EventListener);
  }, [router]);

  // Lock body scroll while the modal is up.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <PasswordGate
      onUnlock={() => {
        setOpen(false);
        if (href) router.push(href);
      }}
      onClose={() => setOpen(false)}
    />
  );
}
