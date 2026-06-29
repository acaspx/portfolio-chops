import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Anton Castro · Product Designer & Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same pre-composed share card for Twitter/X previews.
export default async function TwitterImage() {
  const data = await readFile(join(process.cwd(), "public", "og.png"));
  return new Response(new Uint8Array(data), {
    headers: { "Content-Type": "image/png" },
  });
}
