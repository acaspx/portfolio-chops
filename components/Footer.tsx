import LocalTime from "@/components/LocalTime";
import PixelStrip from "@/components/PixelStrip";

/**
 * Minimal footer: colophon and local time only. The heart, share action, and
 * link columns were retired once the bottom nav and profile card took over
 * navigation and contact.
 *
 * Matches the landing's 35rem body column. The rule above the colophon is a
 * 20px animated pixel-dither strip (PixelStrip).
 */
export default function Footer() {
  return (
    <footer>
      {/* the nav floats at the bottom on every breakpoint, so clear it everywhere */}
      <div className="mx-auto w-full max-w-[35rem] px-5 pb-36 pt-10 sm:pb-40 sm:pt-12">
        <PixelStrip />
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
