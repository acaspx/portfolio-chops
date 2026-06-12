import DotGrid from "@/components/DotGrid";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* Interactive dot field */}
      <DotGrid className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none relative mx-auto flex max-w-5xl flex-col gap-4 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <p className="pointer-events-auto font-mono text-xs text-paper/70">
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
        <ul className="pointer-events-auto flex gap-5 text-sm">
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
