import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Anton Castro · Senior Product Designer & Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Serve the pre-composed share card (public/og.png).
export default async function OgImage() {
  const data = await readFile(join(process.cwd(), "public", "og.png"));
  return new Response(new Uint8Array(data), {
    headers: { "Content-Type": "image/png" },
  });
}
