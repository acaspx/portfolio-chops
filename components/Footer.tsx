import LocalTime from "@/components/LocalTime";
import PixelStrip from "@/components/PixelStrip";
// The version lives in package.json, so one command bumps it (see below).
import pkg from "@/package.json";

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
        {/* Colophon and local time stack on the left; the version sits at the
            right, aligned to the last line. Bump it with
            `npm version patch|minor|major --no-git-tag-version`. */}
        <div className="flex items-end justify-between gap-6 pt-6">
          <div className="space-y-2">
            <p className="font-mono text-xs text-muted">
              © {new Date().getFullYear()} studioacas · build like you mean it
            </p>
            <LocalTime />
          </div>
          <p className="shrink-0 font-mono text-xs tracking-wider text-muted">V{pkg.version}</p>
        </div>
      </div>
    </footer>
  );
}
