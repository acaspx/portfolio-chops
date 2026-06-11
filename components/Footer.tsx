export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* Aurora - three ribbons on offset cycles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
        <div className="aurora-ribbon aurora-a left-[-10%] top-[-40%] h-[120%] w-[70%]" />
        <div className="aurora-ribbon aurora-b right-[-15%] top-[-30%] h-[110%] w-[65%]" />
        <div className="aurora-ribbon aurora-c left-[25%] bottom-[-50%] h-[100%] w-[60%]" />
      </div>
      {/* Soften toward content for legibility */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/40" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-4 px-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-paper/70">
          © {new Date().getFullYear()} Anton Castro · designed & built by me,{" "}
          <a
            href="https://github.com/acaspx/portfolio-chops"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line text-paper/90 hover:text-paper"
          >
            in code
          </a>
          .
        </p>
        <ul className="flex gap-5 text-sm">
          <li>
            <a className="link-line text-paper/70 hover:text-paper" href="mailto:ac.design.px@gmail.com">
              Email
            </a>
          </li>
          <li>
            <a
              className="link-line text-paper/70 hover:text-paper"
              href="https://www.linkedin.com/in/antoncastroe/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="link-line text-paper/70 hover:text-paper"
              href="https://github.com/acaspx"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
