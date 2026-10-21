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
// glazes around the nameplate's frame colour (#191d30)
const GLAZES = ["#161a2b", "#191d30", "#1c2136", "#1a1f33", "#141827", "#1e2339"];

function strip() {
  let seed = 1904;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const W = 160; // one repeat; tiles are laid to fill it exactly
  const gap = 0.6;
  const lengths: number[] = [];
  let total = 0;
  while (total < W - 8) {
    const l = 6.5 + rand() * 3;
    lengths.push(l);
    total += l;
  }
  const k = W / total; // stretch so the repeat closes seamlessly
  let x = 0;
  const j = () => (rand() - 0.5) * 0.35;
  const tiles = lengths
    .map((l, i) => {
      const x0 = x + gap / 2;
      const x1 = x + l * k - gap / 2;
      x += l * k;
      const y0 = gap / 2;
      const y1 = H - gap / 2;
      const pts = [
        [x0 + j(), y0],
        [x1 + j(), y0],
        [x1 + j(), y1],
        [x0 + j(), y1],
      ]
        .map(([a, b]) => `${a.toFixed(2)},${b.toFixed(2)}`)
        .join(" ");
      return `<polygon points='${pts}' fill='${GLAZES[(i * 7 + Math.floor(rand() * 3)) % GLAZES.length]}'/>`;
    })
    .join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'><rect width='${W}' height='${H}' fill='${GROUT}'/>${tiles}</svg>`;
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
