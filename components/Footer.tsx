import LocalTime from "@/components/LocalTime";

/**
 * Minimal footer: colophon and local time only. The heart, share action, and
 * link columns were retired once the bottom nav and profile card took over
 * navigation and contact.
 */
export default function Footer() {
  return (
    <footer>
      {/* the nav floats at the bottom on every breakpoint, so clear it everywhere */}
      <div className="mx-auto max-w-5xl px-6 pb-36 pt-10 sm:pb-40 sm:pt-12">
        <div className="flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} studioacas · build like you mean it
          </p>
          <LocalTime />
        </div>
      </div>
    </footer>
  );
}
