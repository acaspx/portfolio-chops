import DotGrid from "@/components/DotGrid";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Interactive asterisk field */}
      <DotGrid className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none relative mx-auto flex max-w-5xl flex-col gap-4 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <p className="pointer-events-auto font-mono text-xs text-muted">
          © {new Date().getFullYear()} Anton Castro · designed & built by me,{" "}
          <a
            href="https://github.com/acaspx/portfolio-chops"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line text-ink/80 hover:text-ink"
          >
            in code
          </a>
          .
        </p>
        <SocialLinks className="pointer-events-auto flex items-center gap-3" />
      </div>
    </footer>
  );
}
