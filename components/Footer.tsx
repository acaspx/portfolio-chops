import LocalTime from "@/components/LocalTime";
// The version lives in package.json, so one command bumps it (see below).
import pkg from "@/package.json";

/**
 * Minimal footer: colophon and local time only. The heart, share action, and
 * link columns were retired once the bottom nav and profile card took over
 * navigation and contact.
 *
 * Matches the landing's 35rem body column. The rule above the colophon is a
 * gray hairline with a travelling glow (the .beam-rule styles in globals.css).
 */
export default function Footer() {
  return (
    // overflow-x: clip keeps the footer beam's glow from widening the page
    <footer className="overflow-x-clip">
      {/* the nav floats at the bottom on every breakpoint, so clear it everywhere */}
      <div className="mx-auto w-full max-w-[35rem] px-5 pb-36 pt-10 sm:pb-40 sm:pt-12">
        {/* Border beam: a quiet gray rule with two glows travelling along it
            right to left on different clocks, shifting colour and swelling
            as they go. After libraries.dev/beam; pure CSS (globals.css). */}
        <div aria-hidden className="beam-rule">
          <span className="beam-rule__beam" />
          <span className="beam-rule__beam beam-rule__beam--b" />
        </div>
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
