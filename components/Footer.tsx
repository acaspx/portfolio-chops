import LocalTime from "@/components/LocalTime";

/**
 * Minimal footer: colophon and local time only. The heart, share action, and
 * link columns were retired once the bottom nav and profile card took over
 * navigation and contact.
 *
 * Matches the landing's 35rem body column, and its rule is a row of small
 * round dots rather than a CSS `dotted` border, whose dots are square and
 * spaced however the browser likes.
 */
export default function Footer() {
  return (
    <footer>
      {/* the nav floats at the bottom on every breakpoint, so clear it everywhere */}
      <div className="mx-auto w-full max-w-[35rem] px-5 pb-36 pt-10 sm:pb-40 sm:pt-12">
        <div
          aria-hidden
          className="h-[2px] w-full text-line opacity-[0.85]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 0.8px, transparent 1.1px)",
            backgroundSize: "6px 2px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "left center",
          }}
        />
        {/* wraps rather than collides: both strings together run wider than the column */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-6">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} studioacas · build like you mean it
          </p>
          <LocalTime />
        </div>
      </div>
    </footer>
  );
}
