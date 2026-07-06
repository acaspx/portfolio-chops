"use client";

import { useEffect, useState, type ReactNode } from "react";
import PasswordGate, { UNLOCK_KEY } from "@/components/PasswordGate";

/**
 * Client guard for a protected case study. Shows the case content only once the
 * visitor has unlocked it (this session); otherwise renders the password modal
 * over a blank page. Soft gate: see PasswordGate for the security caveat.
 */
export default function CaseGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"checking" | "locked" | "open">("checking");

  useEffect(() => {
    let unlocked = false;
    try {
      unlocked = sessionStorage.getItem(UNLOCK_KEY) === "1";
    } catch {}
    setState(unlocked ? "open" : "locked");
  }, []);

  if (state === "open") return <>{children}</>;

  // checking (blank) or locked (blank + modal); content is not shown.
  return (
    <div className="min-h-screen bg-paper">
      {state === "locked" && <PasswordGate onUnlock={() => setState("open")} />}
    </div>
  );
}
