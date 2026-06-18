import DotGrid from "@/components/DotGrid";

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
        <ul className="pointer-events-auto flex items-center gap-3">
          <li>
            <a
              className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
              href="https://www.linkedin.com/in/antoncastroe/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
              href="https://github.com/acaspx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:text-accent"
              href="https://substack.com/@acdesignpx?r=1ou43l&utm_medium=ios&utm_source=stories&shareImageVariant=blur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Substack"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812H22.54V24l-10.54-5.91L1.46 24V10.812zM22.539 0H1.46v2.836h21.08V0z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
