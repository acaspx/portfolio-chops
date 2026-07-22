// Order matters: last item sits on top of the collapsed stack and is the one
// shown when idle. Fanned order is left to right: LinkedIn, GitHub, X.
const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/antoncastroe/",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  {
    label: "GitHub",
    href: "https://github.com/acaspx",
    path: "M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z",
  },
  {
    label: "X",
    href: "https://x.com/studioacas",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

/**
 * Social icons as a fanned deck: idle they stack behind LinkedIn; on hover the
 * group fans out into a horizontal row of rounded-square buttons (same chrome
 * as the home mark) and stays open until the pointer fully leaves. On touch
 * devices (no hover) it renders as a static row so every icon is reachable.
 * Behavior lives in `.social-stack` in globals.css.
 */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`social-stack items-center ${className}`}>
      {socials.map((s) => (
        <li key={s.label}>
          <a
            className="grid h-9 w-9 place-items-center rounded-xl bg-paper/70 text-muted emboss emboss-hover transition-colors hover:text-accent"
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
              <path d={s.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
