/**
 * Glazed-tile nameplate in the Spanish/Talavera tradition: each letter painted
 * on its own tile, the run framed above and below by a navy band and a floral
 * course.
 *
 * What makes the courses read as fired ceramic rather than printed vector:
 * - The repeat spans TWO tiles, not one, and the second rosette is rotated and
 *   slightly smaller. A single-tile repeat reads as a mechanical loop; hand
 *   painting never lands twice in the same place.
 * - Each tile join in the course carries a warm shadow and a glaze highlight,
 *   so tiles look set next to each other rather than printed continuously.
 * - A glaze gradient runs down each course: light off the top of the curve,
 *   shading into the bottom edge. This is the single biggest contributor to
 *   the ceramic read.
 * - Every painted element carries a navy hairline, the signature of the craft.
 *
 * The letter field deliberately has no seams. Real sign tiles butt tight and
 * the glaze hides the join; drawn rules there read as a grid laid over text.
 *
 * Two layouts. Wide runs all eleven letters on one course. Narrow splits into
 * two courses on a shared six-tile grid, closed by a rosette filler tile,
 * which is how tile signs resolve an uneven count.
 *
 * Both are decorative; the accessible name is a visually-hidden h1 beside them.
 */

const NAVY = "#1e2a44";
const CLAY_LIT = "#c8894f";
const PAPER = "#faf9f6";
const GLAZE = "#eef2ef";

/* Ornament palette read off the reference: the border's character is the
   orange / pale-blue / olive interplay. Outlines stay site navy. */
const VERMILION = "#d9411f";
const SKY = "#a3c9d8";
const OLIVE = "#7d8f4e";
const CREAM = "#f5f2e8";
const JOINT = "#cdbfa6";

const SERIF = {
  fontFamily: "var(--font-serif)",
  fontWeight: 500,
  fontVariationSettings: "'opsz' 88, 'wght' 500, 'SOFT' 0, 'WONK' 0",
} as const;

const PETAL = "M0 0 q4.2 -4.6 8.4 0 q-4.2 4.6 -8.4 0Z";
const LOBES = [0, 60, 120, 180, 240, 300].map((a) => [
  Math.cos((a * Math.PI) / 180),
  Math.sin((a * Math.PI) / 180),
]);

/** Six rounded lobes, each keeping its own navy edge, around a white centre. */
function Rosette({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  return (
    <g stroke={NAVY} strokeWidth={0.6 * s} strokeLinejoin="round">
      {LOBES.map(([dx, dy], i) => (
        <circle
          key={i}
          cx={cx + dx * 4.5 * s}
          cy={cy + dy * 4.5 * s}
          r={3.1 * s}
          fill={VERMILION}
        />
      ))}
      <circle cx={cx} cy={cy} r={2.3 * s} fill={PAPER} />
      <circle cx={cx} cy={cy} r={0.8 * s} fill={NAVY} stroke="none" />
    </g>
  );
}

/** One painted cluster: scroll leaves, olive sprigs, rosette. */
function Cluster({ cx, tilt, scale }: { cx: number; tilt: number; scale: number }) {
  return (
    <g transform={`rotate(${tilt} ${cx} 11)`}>
      <g stroke={NAVY} strokeWidth="0.6" strokeLinejoin="round">
        <path d={PETAL} fill={SKY} transform={`translate(${cx - 19} 11) rotate(-22)`} />
        <path d={PETAL} fill={SKY} transform={`translate(${cx + 10.6} 11) rotate(22)`} />
        <path
          d={PETAL}
          fill={OLIVE}
          transform={`translate(${cx - 10} 5.2) rotate(-38) scale(0.62)`}
        />
        <path
          d={PETAL}
          fill={OLIVE}
          transform={`translate(${cx + 4} 16.8) rotate(-38) scale(0.62)`}
        />
      </g>
      <Rosette cx={cx} cy={11} s={scale} />
    </g>
  );
}

/**
 * Two tiles per repeat, so the hand-painted variation survives tiling, with a
 * joint drawn where the two tiles meet.
 */
function FloralPattern({ id, w }: { id: string; w: number }) {
  const h = 22;
  const unit = w * 2;
  return (
    <pattern id={id} width={unit} height={h} patternUnits="userSpaceOnUse">
      <rect width={unit} height={h} fill={CREAM} />
      <path
        d={`M0 11 q${w / 4} -5.5 ${w / 2} 0 t${w / 2} 0 t${w / 2} 0 t${w / 2} 0`}
        fill="none"
        stroke={NAVY}
        strokeWidth="0.9"
      />
      <Cluster cx={w / 2} tilt={0} scale={1} />
      <Cluster cx={w * 1.5} tilt={-4} scale={0.93} />
      <g stroke={NAVY} strokeWidth="0.6" fill={VERMILION}>
        <ellipse cx="0" cy="11" rx="3" ry="6.2" />
        <ellipse cx={w} cy="11" rx="2.8" ry="5.9" />
        <ellipse cx={unit} cy="11" rx="3" ry="6.2" />
      </g>
      {/* tile joints: warm shade, then a glaze highlight on the next tile */}
      <g>
        <rect x={w - 0.55} width="1.1" height={h} fill={JOINT} fillOpacity="0.6" />
        <rect x={w + 0.55} width="0.6" height={h} fill="#ffffff" fillOpacity="0.5" />
        <rect x="0" width="0.55" height={h} fill={JOINT} fillOpacity="0.6" />
        <rect x={unit - 0.55} width="0.55" height={h} fill={JOINT} fillOpacity="0.6" />
      </g>
    </pattern>
  );
}

/** Convex glaze: light off the top of the curve, shading into the bottom edge. */
function GlazeGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffffff" stopOpacity="0.42" />
      <stop offset="0.42" stopColor="#ffffff" stopOpacity="0.06" />
      <stop offset="1" stopColor="#4a3f2a" stopOpacity="0.13" />
    </linearGradient>
  );
}

/**
 * A floral course. The group transform is load-bearing: userSpaceOnUse anchors
 * the pattern grid to the current origin, so filling a rect at y=118 directly
 * samples across a tile boundary and splits the row.
 */
function Course({ y, w, href, glaze }: { y: number; w: number; href: string; glaze: string }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <rect width={w} height="22" fill={href} />
      <rect width={w} height="22" fill={glaze} />
    </g>
  );
}

/** Navy band with a crisp glaze hairline on its inner edge. */
function Band({ y, w, h, flip }: { y: number; w: number; h: number; flip?: boolean }) {
  return (
    <g>
      <rect y={y} width={w} height={h} fill={NAVY} />
      <rect y={flip ? y : y + h - 0.9} width={w} height="0.9" fill={PAPER} fillOpacity="0.45" />
    </g>
  );
}

function Letters({
  text,
  tile,
  baseline,
  size,
}: {
  text: string;
  tile: number;
  baseline: number;
  size: number;
}) {
  const chars = [...text];
  const at = (i: number) => i * tile + tile / 2;
  return (
    <g fontSize={size} textAnchor="middle" style={SERIF}>
      <g fill={CLAY_LIT}>
        {chars.map((ch, i) =>
          ch === " " ? null : (
            <text key={`h${i}`} x={at(i) - 2} y={baseline - 2}>
              {ch}
            </text>
          )
        )}
      </g>
      <g fill={NAVY}>
        {chars.map((ch, i) =>
          ch === " " ? null : (
            <text key={`b${i}`} x={at(i)} y={baseline}>
              {ch}
            </text>
          )
        )}
      </g>
    </g>
  );
}

/** One course of eleven letters plus a blank. */
function Wide() {
  const TILE = 45;
  const W = TILE * 12;
  return (
    <svg
      viewBox={`0 0 ${W} 146`}
      className="hidden h-auto w-full max-w-[34rem] sm:block"
      aria-hidden
      focusable="false"
    >
      <defs>
        <FloralPattern id="flor-w" w={TILE} />
        <GlazeGradient id="glz-w" />
      </defs>
      <rect width={W} height="146" fill={GLAZE} />
      <Band y={0} w={W} h={6} />
      <Course y={6} w={W} href="url(#flor-w)" glaze="url(#glz-w)" />
      <Band y={28} w={W} h={7} />
      <Letters text="ANTON CASTRO" tile={TILE} baseline={91} size={52} />
      <Band y={111} w={W} h={7} flip />
      <Course y={118} w={W} href="url(#flor-w)" glaze="url(#glz-w)" />
      <Band y={140} w={W} h={6} flip />
      <rect width={W} height="146" fill="none" stroke="#b9c2bb" strokeWidth="2" />
    </svg>
  );
}

/** Two courses on a shared grid, a rosette tile closing the short row. */
function Narrow() {
  const TILE = 50;
  const W = TILE * 6;
  return (
    <svg
      viewBox={`0 0 ${W} 186`}
      className="h-auto w-full max-w-[20rem] sm:hidden"
      aria-hidden
      focusable="false"
    >
      <defs>
        <FloralPattern id="flor-n" w={TILE} />
        <GlazeGradient id="glz-n" />
      </defs>
      <rect width={W} height="186" fill={GLAZE} />
      <Band y={0} w={W} h={5} />
      <Course y={5} w={W} href="url(#flor-n)" glaze="url(#glz-n)" />
      <Band y={27} w={W} h={6} />

      <Letters text="ANTON" tile={TILE} baseline={83} size={48} />
      <Rosette cx={TILE * 5.5} cy={66} s={1.9} />
      <Letters text="CASTRO" tile={TILE} baseline={145} size={48} />

      <Band y={157} w={W} h={6} flip />
      <Course y={163} w={W} href="url(#flor-n)" glaze="url(#glz-n)" />
      <Band y={181} w={W} h={5} flip />
      <rect width={W} height="186" fill="none" stroke="#b9c2bb" strokeWidth="2" />
    </svg>
  );
}

export default function MosaicName() {
  return (
    <>
      {/* The real heading: the artwork is aria-hidden, so the h1 stays text. */}
      <h1 className="sr-only">Anton Castro</h1>
      <Wide />
      <Narrow />
    </>
  );
}
