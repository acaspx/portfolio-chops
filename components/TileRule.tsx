/**
 * Footer rule: one course of dark glazed tesserae on grout, cut from the same
 * outer frame as the mosaic nameplate. It's a small seamless SVG strip that
 * repeats across the width, so the tiles keep their size at any column width.
 * The tiles are generated once, deterministically, at build time: lengths,
 * corners and glaze vary a little, the way hand-set pieces do.
 */

// Sized like the nameplate's outer frame course on screen: 3px tall tiles,
// about 8px long, with a hairline of grout.
const H = 3; // strip height, px
const GROUT = "#bcb6a6";

function strip() {
  let seed = 1904;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const between = (a: number, b: number) => a + rand() * (b - a);

  // Laid in the nameplate's own units (4 per CSS px) with its own setter
  // rules, then scaled down: course height 12, nominal piece length 31,
  // lengths vary +/-14%, every corner jitters by 7% of the course height in
  // both axes, and pieces sit in a 2.4-unit grout joint. That jitter is what
  // makes the header's frame read as hand-set rather than ruled.
  const U = 4;
  const TH = H * U; // 12
  const TW = 31;
  const GAP = 2.4;
  const JIT = TH * 0.09;
  const W = 160; // one repeat in CSS px
  const WU = W * U;

  const lengths: number[] = [];
  let total = 0;
  while (total < WU - TW * 0.5) {
    const l = TW * between(0.86, 1.14);
    lengths.push(l);
    total += l;
  }
  const k = WU / total; // close the repeat seamlessly
  let x = 0;
  const j = () => between(-JIT, JIT);
  const tiles = lengths
    .map((l, i) => {
      const g = GAP / 2;
      const x0 = x + g;
      const x1 = x + l * k - g;
      x += l * k;
      // the first and last pieces keep a straight outer edge so the repeat
      // joins without a seam
      const jx = (edge: boolean) => (edge ? 0 : j());
      const first = i === 0;
      const last = i === lengths.length - 1;
      const pts = [
        [x0 + jx(first), g + j()],
        [x1 + jx(last), g + j()],
        [x1 + jx(last), TH - g + j()],
        [x0 + jx(first), TH - g + j()],
      ]
        .map(([a, b]) => `${a.toFixed(1)},${Math.min(TH, Math.max(0, b)).toFixed(1)}`)
        .join(" ");
      // glaze: the frame colour, nudged lighter or darker per piece, with the
      // odd piece a touch bluer, as fired glass varies
      const lum = between(-0.07, 0.07) + (rand() < 0.12 ? 0.06 : 0);
      const [r, gg, b] = [25, 29, 48].map((c, ci) =>
        Math.round(Math.min(255, Math.max(0, c * (1 + lum) + (ci === 2 ? lum * 30 : 0)))),
      );
      return `<polygon points='${pts}' fill='rgb(${r},${gg},${b})'/>`;
    })
    .join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${WU}' height='${TH}' viewBox='0 0 ${WU} ${TH}' shape-rendering='geometricPrecision'><rect width='${WU}' height='${TH}' fill='${GROUT}'/>${tiles}</svg>`;
  return { url: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`, W };
}

const { url, W } = strip();

export default function TileRule() {
  return (
    <div
      aria-hidden
      className="w-full"
      style={{
        height: H,
        backgroundImage: url,
        backgroundSize: `${W}px ${H}px`,
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}
