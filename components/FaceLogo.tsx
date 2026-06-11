/**
 * Anton's face mark — closed eyes, easy smile. Hand-drawn as SVG so it stays
 * crisp at any size and inherits no image request.
 */
export default function FaceLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Anton Castro logo"
      className={className}
    >
      <circle cx="50" cy="50" r="47.5" fill="#ffffff" stroke="#16140f" strokeWidth="3" />
      {/* left eye */}
      <path
        d="M30 39 c 3 10, 15 10, 18 0"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* right eye — slightly smaller, a touch lower */}
      <path
        d="M62 43 c 2.5 8, 12 8, 14.5 -1"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* smile */}
      <path
        d="M44 62 c 3.5 7, 13 7, 16.5 0"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
