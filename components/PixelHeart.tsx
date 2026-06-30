// Inline, emoji-sized pixel heart built from the same 11x7 LED bitmap as the
// big HeartMatrix, so the footer's heart reads as a tiny Arduino heart.
const HEART = [
  "00110001100",
  "01111111110",
  "01111111110",
  "00111111100",
  "00011111000",
  "00001110000",
  "00000100000",
];

const cells: { r: number; c: number }[] = [];
HEART.forEach((row, r) => [...row].forEach((ch, c) => ch === "1" && cells.push({ r, c })));

export default function PixelHeart({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 11 7"
      role="img"
      aria-label="love"
      className={className}
      style={{
        height: "0.82em",
        width: "auto",
        display: "inline-block",
        verticalAlign: "-0.08em",
        margin: "0 0.12em",
      }}
    >
      {cells.map(({ r, c }) => (
        <rect key={`${r}-${c}`} x={c + 0.08} y={r + 0.08} width={0.84} height={0.84} rx={0.18} fill="#ff4f43" />
      ))}
    </svg>
  );
}
