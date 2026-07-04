import { NextResponse } from "next/server";

/**
 * Global heart counter, backed by CounterAPI.dev (free, no auth, no setup).
 * GET  -> current shared count (read-only). POST -> increment, returns new total.
 * The count is one running total shared across every visitor and persisted by
 * the service, so it adds up across all visits and all clicks.
 *
 * The free tier occasionally returns a transient connection error, so each call
 * retries a couple of times; if it still fails we return ok:false and the UI
 * simply keeps its optimistic number.
 */
const BASE = "https://api.counterapi.dev/v1/studioacas_portfolio/hearts";

async function call(path: string): Promise<number | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as { count?: number };
        if (typeof data.count === "number") return data.count;
      }
    } catch {
      /* fall through to retry */
    }
    if (attempt < 2) await new Promise((r) => setTimeout(r, 200));
  }
  return null;
}

export async function GET() {
  const count = await call("");
  return NextResponse.json({ ok: count !== null, count: count ?? 0 });
}

export async function POST() {
  const count = await call("/up");
  return NextResponse.json({ ok: count !== null, count: count ?? 0 });
}
