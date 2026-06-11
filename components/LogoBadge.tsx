"use client";

import { useState } from "react";

/**
 * Company logo with graceful fallback: tries /logos/<slug>.png; if missing,
 * renders a monogram badge. Drop real logos into public/logos/ and they
 * appear automatically - no code change, no broken images.
 */
export default function LogoBadge({ slug, name }: { slug: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-hidden
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-ink/[0.04] font-mono text-xs font-semibold text-muted"
      >
        {name
          .split(" ")
          .slice(0, 2)
          .map((w) => w[0])
          .join("")}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
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
