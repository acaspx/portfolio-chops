"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Company logo with graceful fallback: tries /logos/<slug>.png; if missing,
 * renders a monogram badge. Drop real logos into public/logos/ and they
 * appear automatically - no code change, no broken images. `size` (px) scales
 * the badge; `className` can override rounding etc.
 */
export default function LogoBadge({
  slug,
  name,
  size = 40,
  className = "",
}: {
  slug: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If the image 404'd before React hydrated (so onError never fired), catch it
  // on mount so the monogram fallback still renders instead of a broken image.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const dim = { width: size, height: size };

  if (failed) {
    const words = name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean);
    const monogram =
      words.length > 1
        ? (words[0][0] + words[1][0]).toUpperCase()
        : (words[0] ?? "").slice(0, 2).toUpperCase();
    return (
      <span
        aria-hidden
        style={{ ...dim, fontSize: Math.round(size * 0.3) }}
        className={`grid shrink-0 place-items-center rounded-lg border border-line bg-ink/[0.04] font-mono font-semibold tracking-tight text-muted ${className}`}
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
      style={dim}
      className={`shrink-0 rounded-lg border border-line bg-white object-contain p-1 ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
