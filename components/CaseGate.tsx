"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import PasswordGate, { UNLOCK_KEY } from "@/components/PasswordGate";

/**
 * Client guard for a protected case study, used when the page is reached
 * directly (typed URL, refresh, or a cross-case link) rather than through the
 * in-place overlay on the home grid. Shows the content only once unlocked this
 * session; otherwise renders the password modal over the page, and dismissing
 * it returns the visitor where they came from. Soft gate: see PasswordGate.
 */
export default function CaseGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<"checking" | "locked" | "open">("checking");

  useEffect(() => {
    let unlocked = false;
    try {
      unlocked = sessionStorage.getItem(UNLOCK_KEY) === "1";
    } catch {}
    setState(unlocked ? "open" : "locked");
  }, []);

  if (state === "open") return <>{children}</>;

  const dismiss = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/");
  };

  // checking (blank) or locked (blank + modal); content is not shown.
  return (
    <div className="min-h-screen bg-paper">
      {state === "locked" && (
        <PasswordGate onUnlock={() => setState("open")} onClose={dismiss} />
      )}
    </div>
  );
}
