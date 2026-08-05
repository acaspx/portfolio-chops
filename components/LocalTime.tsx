"use client";

import { useEffect, useState } from "react";

/** Anton's local (Pacific) time, set after mount to avoid hydration mismatch. */
export default function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/Los_Angeles",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="font-mono text-xs text-muted" suppressHydrationWarning>
      San Francisco, CA{time ? ` · ${time} PT` : ""}
    </p>
  );
}
