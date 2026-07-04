import { NextResponse } from "next/server";

/**
 * Global heart counter, backed by Upstash Redis (REST API, no SDK needed).
 * GET  -> current count. POST -> increment, returns new count.
 *
 * Set these env vars in Vercel (Project Settings -> Environment Variables):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 * Until they're set, the route returns { ok: false } and the UI hides the
 * number, so nothing looks broken before the datastore is connected.
 */
const URL = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "studioacas:hearts";

async function redis(command: string): Promise<number | null> {
  if (!URL || !TOKEN) return null;
  try {
    const res = await fetch(`${URL}/${command}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: string | number | null };
    return Number(data.result ?? 0);
  } catch {
    return null;
  }
}

export async function GET() {
  const count = await redis(`get/${KEY}`);
  return NextResponse.json({ ok: count !== null, count: count ?? 0 });
}

export async function POST() {
  const count = await redis(`incr/${KEY}`);
  return NextResponse.json({ ok: count !== null, count: count ?? 0 });
}
