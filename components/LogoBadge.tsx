"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Company logo with graceful fallback: tries /logos/<slug>.png; if missing,
 * renders a monogram badge. Drop real logos into public/logos/ and they
 * appear automatically - no code change, no broken images.
 */
export default function LogoBadge({ slug, name }: { slug: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If the image 404'd before React hydrated (so onError never fired), catch it
  // on mount so the monogram fallback still renders instead of a broken image.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    // Consistent 2-letter monogram: initials for multi-word names,
    // first two letters for single-word names (so "Rocket" → "Ro", not "R").
    const words = name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean);
    const monogram =
      words.length > 1
        ? (words[0][0] + words[1][0]).toUpperCase()
        : (words[0] ?? "").slice(0, 2).toUpperCase();
    return (
      <span
        aria-hidden
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-ink/[0.04] font-mono text-xs font-semibold tracking-tight text-muted"
      >
        {monogram}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={`/logos/${slug}.png`}
      alt=""
      aria-hidden
      width={40}
      height={40}
      className="h-10 w-10 shrink-0 rounded-lg border border-line object-contain bg-white p-1"
      onError={() => setFailed(true)}
    />
  );
}
