/**
 * Subtle ASCII San Francisco horizon: Golden Gate Bridge, downtown skyline
 * (Transamerica pyramid + towers), a fog bank, water, a sailboat. Baked to a
 * transparent PNG so it renders pixel-identical regardless of the visitor's
 * monospace font. Fixed to the bottom of every page, low-contrast sage,
 * pointer-events off, decorative only.
 */
export default function SkylineBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-[5] overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sf-skyline.png"
        alt=""
        className="w-full select-none"
        style={{
          opacity: 0.45,
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 45%)",
          maskImage: "linear-gradient(to bottom, transparent, #000 45%)",
        }}
      />
    </div>
  );
}
