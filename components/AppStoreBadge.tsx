/** Official-style "Download on the App Store" badge, drawn inline as SVG. */
export default function AppStoreBadge({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      className={className}
      role="img"
      aria-label="Download on the App Store"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="119" height="39" rx="6.5" fill="#000" stroke="#A6A6A6" />
      <path
        fill="#fff"
        transform="translate(8,8) scale(1.02)"
        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
      />
      <text
        x="33"
        y="16"
        fill="#fff"
        fontFamily="-apple-system, system-ui, Helvetica, Arial, sans-serif"
        fontSize="6.5"
        letterSpacing="0.2"
      >
        Download on the
      </text>
      <text
        x="33"
        y="31.5"
        fill="#fff"
        fontFamily="-apple-system, system-ui, Helvetica, Arial, sans-serif"
        fontSize="15"
        fontWeight="500"
        letterSpacing="-0.3"
      >
        App Store
      </text>
    </svg>
  );
}
