"""
Generate the subway-mosaic nameplate as static SVG.

Approach, following how the 1904-1940s IRT/BMT tablets were actually made:
  1. Paint a flat DESIGN image (navy field, cream letters, sage keylines,
     frieze, pilasters, checker and lozenge bands) in palette keys.
  2. Lay real tesserae over it in running-bond courses, region by region,
     each region with its own tile size, the way a setter would.
  3. Colour each tessera by the design underneath it. Tiles straddling an
     edge are cut in two, as a setter would cut a piece to follow a letter.
  4. Jitter every tessera's corners, size and glaze ("broken into irregular
     shapes" - Squire Vickers), add low-frequency patina, emit SVG grouped
     by colour so the file stays small.

Output: public/mosaic/name-wide.svg, public/mosaic/name-narrow.svg
        plus PNG previews in scripts/out/ for review.

Run:  python3 scripts/mosaic.py
Needs: numpy, Pillow, fontTools, shapely
       (pip install numpy pillow fonttools shapely)
"""

import math
import os
import random
import colorsys

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from fontTools.pens.basePen import BasePen
from fontTools.ttLib import TTFont
from shapely import affinity
from shapely.geometry import MultiPolygon, Polygon, box
from shapely.prepared import prep

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_SVG = os.path.join(ROOT, "public", "mosaic")
OUT_PNG = os.path.join(HERE, "out")
FONT = "/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyreheros-bold.otf"

U = 4  # SVG units per CSS px

# ---------------------------------------------------------------- palette --
# Read off the Wall St tablet, nudged toward the site's navy and paper.
PALETTE = {
    "navy": "#232e57",
    "cream": "#ece6d4",
    "sage": "#8d9a88",
    "dark": "#191d30",
    "gold": "#d2a03c",
}
GROUT = "#bcb6a6"
KEYS = list(PALETTE)
KEY_IDX = {k: i + 1 for i, k in enumerate(KEYS)}  # 0 = empty
IDX_KEY = {v: k for k, v in KEY_IDX.items()}

# Per-key glaze variation: (lightness spread, hue spread, saturation spread)
JITTER = {
    "navy": (0.038, 0.010, 0.07),
    "cream": (0.035, 0.010, 0.10),
    "sage": (0.028, 0.010, 0.06),
    "dark": (0.030, 0.010, 0.05),
    "gold": (0.050, 0.010, 0.08),
}
VARIANTS = 9  # discrete glaze variants per key, keeps <path> count low


def hex_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))


def rgb_hex(r, g, b):
    c = lambda v: max(0, min(255, round(v * 255)))
    return "#%02x%02x%02x" % (c(r), c(g), c(b))


def build_variants(rng):
    out = {}
    for k, base in PALETTE.items():
        r, g, b = hex_rgb(base)
        h, l, s = colorsys.rgb_to_hls(r, g, b)
        dl, dh, ds = JITTER[k]
        vs = []
        for i in range(VARIANTS):
            t = (i / (VARIANTS - 1)) * 2 - 1  # -1..1, evenly spread
            vs.append(
                (
                    (h + rng.uniform(-dh, dh)) % 1,
                    min(0.97, max(0.03, l + t * dl)),
                    min(1, max(0, s + rng.uniform(-ds, ds))),
                )
            )
        out[k] = vs
    return out


# ------------------------------------------------------------------ noise --
def value_noise(w, h, cell, rng):
    gw, gh = w // cell + 3, h // cell + 3
    grid = np.array([[rng.random() for _ in range(gw)] for _ in range(gh)])
    img = Image.fromarray((grid * 255).astype(np.uint8)).resize(
        (gw * cell, gh * cell), Image.BICUBIC
    )
    return np.asarray(img, dtype=np.float32)[:h, :w] / 255.0


# ----------------------------------------------------------------- design --
class Design:
    """Flat design canvas in palette indices, 1 px per SVG unit."""

    def __init__(self, w, h):
        self.w, self.h = w, h
        self.img = Image.new("L", (w, h), 0)
        self.d = ImageDraw.Draw(self.img)

    def rect(self, x0, y0, x1, y1, key):
        self.d.rectangle([x0, y0, x1 - 1, y1 - 1], fill=KEY_IDX[key])

    def poly(self, pts, key):
        self.d.polygon(pts, fill=KEY_IDX[key])

    def ellipse(self, box, key):
        self.d.ellipse(box, fill=KEY_IDX[key])

    def line(self, pts, key, width):
        self.d.line(pts, fill=KEY_IDX[key], width=width, joint="curve")

    def text_line(self, text, x_left, baseline, em, tracking, key, word_space):
        font = ImageFont.truetype(FONT, em)
        x = x_left
        for ch in text:
            if ch == " ":
                x += word_space * em
                continue
            self.d.text((x, baseline), ch, font=font, fill=KEY_IDX[key], anchor="ls")
            x += font.getlength(ch) + tracking * em

    @property
    def arr(self):
        return np.asarray(self.img)


_TT = TTFont(FONT)
_GS = _TT.getGlyphSet()
_CMAP = _TT.getBestCmap()
_UPM = _TT["head"].unitsPerEm
_CAP = _TT["OS/2"].sCapHeight


class _FlatPen(BasePen):
    """Flattens glyph outlines into point lists (curves sampled finely)."""

    def __init__(self, gs, steps=14):
        super().__init__(gs)
        self.contours, self.cur, self.steps = [], [], steps

    def _moveTo(self, p):
        self.cur = [p]

    def _lineTo(self, p):
        self.cur.append(p)

    def _curveToOne(self, p1, p2, p3):
        p0 = self.cur[-1]
        for i in range(1, self.steps + 1):
            t = i / self.steps
            m = 1 - t
            self.cur.append(
                (
                    m**3 * p0[0] + 3 * m * m * t * p1[0] + 3 * m * t * t * p2[0] + t**3 * p3[0],
                    m**3 * p0[1] + 3 * m * m * t * p1[1] + 3 * m * t * t * p2[1] + t**3 * p3[1],
                )
            )

    def _closePath(self):
        if len(self.cur) >= 3:
            self.contours.append(self.cur)
        self.cur = []

    _endPath = _closePath


def _glyph(ch):
    name = _CMAP[ord(ch)]
    pen = _FlatPen(_GS)
    _GS[name].draw(pen)
    polys = sorted((Polygon(c).buffer(0) for c in pen.contours), key=lambda p: -p.area)
    shape = Polygon()
    for p in polys:
        shape = shape.difference(p) if shape.contains(p) else shape.union(p)
    return shape, _TT["hmtx"][name][0]


def measure(text, em, tracking, word_space):
    s = em / _UPM
    w, prev = 0.0, False
    for ch in text:
        if ch == " ":
            w += word_space * em
            prev = False
            continue
        if prev:
            w += tracking * em
        w += _glyph(ch)[1] * s
        prev = True
    return w


def cap_height(em):
    return _CAP * em / _UPM


def letter_shapes(text, x_left, baseline, em, tracking, word_space):
    """The line of text as exact vector geometry, in SVG units."""
    s = em / _UPM
    x, parts = x_left, []
    for ch in text:
        if ch == " ":
            x += word_space * em
            continue
        g, adv = _glyph(ch)
        g = affinity.scale(g, s, -s, origin=(0, 0))
        parts.append(affinity.translate(g, x, baseline))
        x += adv * s + tracking * em
    out = Polygon()
    for p in parts:
        out = out.union(p)
    return out


# -------------------------------------------------------------- tesserae --
class Setter:
    """Lays tesserae region by region and records coloured polygons."""

    def __init__(self, design, rng, variants, patina):
        self.design = design
        self.arr = design.arr
        self.rng = rng
        self.variants = variants
        self.patina = patina
        self.tiles = []  # (key, variant_index, [(x,y)...])

    def _sample(self, x0, y0, x1, y1, nx=4, ny=3):
        keys = []
        for j in range(ny):
            for i in range(nx):
                x = int(x0 + (i + 0.5) * (x1 - x0) / nx)
                y = int(y0 + (j + 0.5) * (y1 - y0) / ny)
                if 0 <= x < self.design.w and 0 <= y < self.design.h:
                    keys.append(int(self.arr[y, x]))
        return keys

    @staticmethod
    def _majority(keys):
        keys = [k for k in keys if k]
        if not keys:
            return 0, 1.0
        best = max(set(keys), key=keys.count)
        return best, keys.count(best) / len(keys)

    def _emit(self, x0, y0, x1, y1, idx, gap, jit):
        if not idx or x1 - x0 < 1.5 or y1 - y0 < 1.5:
            return
        g = gap / 2
        pts = [(x0 + g, y0 + g), (x1 - g, y0 + g), (x1 - g, y1 - g), (x0 + g, y1 - g)]
        pts = [(x + self.rng.uniform(-jit, jit), y + self.rng.uniform(-jit, jit)) for x, y in pts]
        key = IDX_KEY[idx]
        cx, cy = int((x0 + x1) / 2), int((y0 + y1) / 2)
        cx = min(max(cx, 0), self.design.w - 1)
        cy = min(max(cy, 0), self.design.h - 1)
        p = self.patina[cy, cx]  # 0..1 low-frequency age
        # bias toward darker variants where the patina is high, random otherwise
        base = self.rng.random() * 0.7 + (1 - p) * 0.3
        v = min(VARIANTS - 1, max(0, int(base * VARIANTS)))
        self.tiles.append((key, v, pts))

    def _variant(self, x, y, dark=False):
        cx = min(max(int(x), 0), self.design.w - 1)
        cy = min(max(int(y), 0), self.design.h - 1)
        if dark:
            # pieces cut against a letter take the darker glazes, which reads
            # as the outline course a setter runs around each letter
            return self.rng.randint(0, 2)
        p = self.patina[cy, cx]
        base = self.rng.random() * 0.7 + (1 - p) * 0.3
        return min(VARIANTS - 1, max(0, int(base * VARIANTS)))

    def _emit_geom(self, geom, key, gap, min_area, dark=False):
        if geom.is_empty:
            return
        geom = geom.buffer(-gap / 2, join_style=2, mitre_limit=3)
        polys = list(geom.geoms) if hasattr(geom, "geoms") else [geom]
        for poly in polys:
            if not isinstance(poly, Polygon) or poly.area < min_area:
                continue
            poly = poly.simplify(0.35, preserve_topology=True)
            pts = list(poly.exterior.coords)[:-1]
            if len(pts) < 3:
                continue
            c = poly.centroid
            self.tiles.append((key, self._variant(c.x, c.y, dark), pts))

    def lay_cut(self, x0, y0, x1, y1, th, tw, shapes, ground, figure, gap=2.4, jit=None):
        """
        Running-bond courses where every tile that straddles the figure is cut
        exactly along its outline, as a setter nips a piece to follow a letter.
        Both halves are inset by half a grout joint, so a clean, continuous
        grout line traces every curve of every letter.
        """
        jit = th * 0.07 if jit is None else jit
        region = box(x0, y0, x1, y1)
        fig = prep(shapes)
        rows = max(1, round((y1 - y0) / th))
        th = (y1 - y0) / rows
        min_area = th * tw * 0.05
        for r in range(rows):
            ty0, ty1 = y0 + r * th, y0 + (r + 1) * th
            off = (tw / 2 if r % 2 else 0) + self.rng.uniform(-0.12, 0.12) * tw
            x = x0 - (off % tw)
            while x < x1:
                w = tw * self.rng.uniform(0.88, 1.12)
                j = lambda: self.rng.uniform(-jit, jit)
                quad = Polygon(
                    [(x + j(), ty0 + j()), (x + w + j(), ty0 + j()), (x + w + j(), ty1 + j()), (x + j(), ty1 + j())]
                ).intersection(region)
                x += w
                if quad.is_empty or quad.area < min_area:
                    continue
                if not fig.intersects(quad):
                    self._emit_geom(quad, ground, gap, min_area)
                elif fig.contains(quad):
                    self._emit_geom(quad, figure, gap, min_area)
                else:
                    self._emit_geom(quad.intersection(shapes), figure, gap, min_area)
                    self._emit_geom(quad.difference(shapes), ground, gap, min_area, dark=True)

    def lay(self, x0, y0, x1, y1, th, tw, gap=2.4, bond=True, aligned=False, jit=None):
        """Cover a rectangle with courses of tesserae, cut at its edges."""
        jit = th * 0.07 if jit is None else jit
        rows = max(1, round((y1 - y0) / th))
        th = (y1 - y0) / rows
        for r in range(rows):
            ty0, ty1 = y0 + r * th, y0 + (r + 1) * th
            if aligned:
                x = x0
            else:
                off = (tw / 2 if (bond and r % 2) else 0) + self.rng.uniform(-0.12, 0.12) * tw
                x = x0 - (off % tw)
            while x < x1:
                w = tw if aligned else tw * self.rng.uniform(0.86, 1.14)
                tx0, tx1 = max(x, x0), min(x + w, x1)
                x += w
                if tx1 - tx0 < 1.5:
                    continue
                keys = self._sample(tx0, ty0, tx1, ty1)
                idx, purity = self._majority(keys)
                if purity >= 0.95 or aligned:
                    self._emit(tx0, ty0, tx1, ty1, idx, gap, jit)
                    continue
                # Straddles an edge: cut the piece the way a setter would,
                # along whichever axis leaves the two halves cleaner.
                mx, my = (tx0 + tx1) / 2, (ty0 + ty1) / 2
                lv = self._majority(self._sample(tx0, ty0, mx, ty1, 2, 3))
                rv = self._majority(self._sample(mx, ty0, tx1, ty1, 2, 3))
                th_ = self._majority(self._sample(tx0, ty0, tx1, my, 4, 2))
                bh = self._majority(self._sample(tx0, my, tx1, ty1, 4, 2))
                if lv[1] + rv[1] >= th_[1] + bh[1]:
                    self._emit(tx0, ty0, mx, ty1, lv[0], gap, jit * 0.7)
                    self._emit(mx, ty0, tx1, ty1, rv[0], gap, jit * 0.7)
                else:
                    self._emit(tx0, ty0, tx1, my, th_[0], gap, jit * 0.7)
                    self._emit(tx0, my, tx1, ty1, bh[0], gap, jit * 0.7)

    def dashes(self, x0, y0, x1, y1, cream, navy, gap=2.0):
        """One course of alternating cream dashes and navy spacers."""
        x = x0 - self.rng.uniform(0, navy)
        jit = (y1 - y0) * 0.06
        c, n = KEY_IDX["cream"], KEY_IDX["navy"]
        while x < x1:
            for length, idx in ((navy, n), (cream, c)):
                ln = length * self.rng.uniform(0.9, 1.1)
                tx0, tx1 = max(x, x0), min(x + ln, x1)
                if tx1 - tx0 > 2:
                    self._emit(tx0, y0, tx1, y1, idx, gap, jit)
                x += ln

    # ------------------------------------------------------------ output --
    def colour(self, key, v):
        h, l, s = self.variants[key][v]
        return rgb_hex(*colorsys.hls_to_rgb(h, l, s))

    def svg(self, w, h):
        # Group by colour, then write each group as one path with relative
        # moves between tiles sorted by row: neighbours differ by a few units,
        # so the numbers stay short and the file roughly halves.
        groups = {}
        for key, v, pts in self.tiles:
            groups.setdefault(self.colour(key, v), []).append(
                [(round(x), round(y)) for x, y in pts]
            )
        for fill, tiles in groups.items():
            tiles.sort(key=lambda t: (t[0][1] // 12, t[0][0]))
            out, px, py = [], 0, 0
            for i, t in enumerate(tiles):
                x0, y0 = t[0]
                head = ("M%d %d" % (x0, y0)) if i == 0 else ("m%d %d" % (x0 - px, y0 - py))
                segs = []
                cx, cy = x0, y0
                for x, y in t[1:]:
                    segs.append("%d %d" % (x - cx, y - cy))
                    cx, cy = x, y
                out.append(head + "l" + " ".join(segs).replace(" -", "-") + "z")
                px, py = x0, y0
            groups[fill] = out
        parts = [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" '
            'shape-rendering="geometricPrecision">' % (w, h),
            '<rect width="%d" height="%d" fill="%s"/>' % (w, h, GROUT),
        ]
        for fill, ds in sorted(groups.items()):
            parts.append('<path fill="%s" d="%s"/>' % (fill, "".join(ds)))
        # faint glaze sheen: light off the top, a touch of grime at the foot
        parts.append(
            '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">'
            '<stop offset="0" stop-color="#fff" stop-opacity=".07"/>'
            '<stop offset=".5" stop-color="#fff" stop-opacity="0"/>'
            '<stop offset="1" stop-color="#3a3220" stop-opacity=".06"/>'
            "</linearGradient></defs>"
            '<rect width="%d" height="%d" fill="url(#g)"/>' % (w, h)
        )
        parts.append("</svg>")
        return "".join(parts)

    def png(self, w, h, scale=0.5):
        img = Image.new("RGB", (w, h), GROUT)
        d = ImageDraw.Draw(img)
        for key, v, pts in self.tiles:
            d.polygon(pts, fill=self.colour(key, v))
        return img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)



# ------------------------------------------------------------ ornament --
def _leaf(cx, cy, w, h, down, lean):
    """
    A lobed vine leaf filling the bowl of one wave: a broad body, three round
    lobes on its outer edge, and a pointed tip that leans along the vine.
    `down` hangs it below the stem; `lean` (+1/-1) sets which way it points.
    """
    from shapely.geometry import Point
    s = 1 if down else -1
    circ = lambda x, y, r: Point(x, y).buffer(r, 16)
    leaf = affinity.scale(circ(cx, cy, 1), w * 0.80, h * 0.36)
    # lobes along the outer edge, the middle one fullest
    for fx, fy, r in ((-0.52, 0.10, 0.36), (0.0, 0.22, 0.44), (0.50, 0.10, 0.34)):
        leaf = leaf.union(circ(cx + fx * w, cy + s * fy * h, r * h))
    # tip: a tapering point out past the leading lobe
    leaf = leaf.union(Polygon([(cx + lean * w * 0.55, cy - s * h * 0.18),
                               (cx + lean * w * 1.22, cy - s * h * 0.30),
                               (cx + lean * w * 0.70, cy + s * h * 0.30)]))
    # lean the whole leaf with the vine
    return affinity.rotate(leaf, -lean * s * 12, origin=(cx, cy))


def vine_frieze(x0, x1, y0, y1):
    """Scrolling stem with alternating lobed leaves, clipped to the zone."""
    from shapely.geometry import LineString, Point
    zone = box(x0, y0, x1, y1)
    hgt = y1 - y0
    yc = (y0 + y1) / 2
    amp = hgt * 0.38
    period = hgt * 3.2
    n = max(2, round((x1 - x0 - 2 * 34) / period))
    period = (x1 - x0 - 2 * 34) / n
    sx0, sx1 = x0 + 34, x1 - 34
    ys = lambda x: yc - amp * math.cos(2 * math.pi * (x - sx0) / period)
    stem = LineString([(x, ys(x)) for x in np.arange(sx0, sx1 + 0.1, 2)]).buffer(3.2, cap_style=1)
    # curled ends: an open ring where the stem starts and stops
    for ex, dirn in ((sx0, -1), (sx1, 1)):
        ey = ys(ex)
        c = Point(ex + dirn * 12, ey + 10)
        ring = c.buffer(13).difference(c.buffer(6.2))
        stem = stem.union(ring.difference(box(ex - dirn * 40, ey + 10, ex, ey + 40) if dirn < 0 else box(ex, ey + 10, ex + 40, ey + 40)))
        stem = stem.union(Point(ex + dirn * 12, ey + 10).buffer(4.2))
    clear = stem.buffer(4.4)
    leaves = Polygon()
    # crests sit at even multiples of period/2 (leaf hangs below the stem),
    # troughs at odd ones (leaf stands above it); tips lean alternately
    for k in range(1, int(n * 2)):
        xm = sx0 + k * period / 2
        ym = ys(xm)
        down = k % 2 == 0
        cy = (ym + y1 - 5) / 2 if down else (ym + y0 + 5) / 2
        lean = 1 if k % 4 in (0, 1) else -1
        leaf = _leaf(xm - lean * 4, cy, period * 0.23, hgt * 0.50, down, lean)
        leaves = leaves.union(leaf.difference(clear))
    return stem.union(leaves).intersection(zone.buffer(-2))


def _bell(cx, top, w, h):
    """A bellflower hanging mouth-down: domed top, flared, scalloped skirt."""
    pts = []
    for t in np.linspace(0, 1, 16):
        # half-width grows from a narrow dome to a flared mouth
        hw = w * (0.40 + 0.12 * t + 0.48 * t ** 4)
        pts.append((cx + hw, top + h * t))
    right = pts
    left = [(2 * cx - x, y) for x, y in reversed(pts)]
    bell = Polygon([(cx, top - w * 0.12)] + right + left)
    # three points on the skirt
    mouth = top + h
    for f in (-0.62, 0.0, 0.62):
        bell = bell.union(Polygon([(cx + f * w - w * 0.2, mouth - 1), (cx + f * w + w * 0.2, mouth - 1),
                                   (cx + f * w, mouth + h * 0.16)]))
    return bell


def bell_chain(x0, x1, y0, y1):
    """An oval bud, then bellflowers hung one below the next on a thin stalk."""
    from shapely.geometry import Point
    cx = (x0 + x1) / 2
    zone = box(x0, y0, x1, y1)
    w = (x1 - x0) * 0.33
    bud_h = w * 0.95
    geom = affinity.scale(Point(cx, y0 + 10 + bud_h).buffer(1, 24), w * 0.62, bud_h)
    y = y0 + 10 + 2 * bud_h + 9
    bell_h = w * 1.55
    step = bell_h + w * 0.55
    while y + bell_h + w * 0.3 < y1 - 6:
        geom = geom.union(box(cx - 2.2, y - 10, cx + 2.2, y + 6))   # stalk
        geom = geom.union(_bell(cx, y, w, bell_h))
        y += step
    return geom.intersection(zone.buffer(-3))


# ------------------------------------------------------------------ build --
def build(lines, css_width, seed, name):
    rng = random.Random(seed)
    W = css_width * U

    # -- frame geometry (units) ---------------------------------------------
    DARK = 12          # outer dark line
    SAGE = 18          # sage frame course
    FRIEZE = 100       # vine band
    PIL_W = 78         # pilaster width
    KEY = 16           # sage keyline around the field
    CHECK = 2 * 20     # two rows of checker squares
    BAND = 10 + 70 + 10  # navy line, lozenge band, navy line
    PAD_X = 34         # breathing room inside the field

    fx0 = DARK + SAGE + PIL_W + KEY
    fx1 = W - fx0
    field_w = fx1 - fx0

    # -- letters: size to fill the field width --------------------------------
    tracking, word_space = 0.13, 0.48
    longest = max(lines, key=lambda t: measure(t, 100, tracking, word_space))
    em = int(100 * (field_w - 2 * PAD_X) / measure(longest, 100, tracking, word_space))
    cap = cap_height(em)
    th = 11.0 if len(lines) == 1 else 10.6  # course height in the field
    tw = th * 1.3
    gap_lines = cap * 0.36
    text_block = cap * len(lines) + gap_lines * (len(lines) - 1)
    field_h = text_block / (0.70 if len(lines) == 1 else 0.80)
    field_h = round(field_h / th) * th

    fy0 = DARK + SAGE + FRIEZE + KEY
    fy1 = fy0 + field_h
    H = int(fy1 + KEY + CHECK + BAND + SAGE + DARK)

    design = Design(W, H)
    patina = value_noise(W, H, 90, rng) * 0.65 + value_noise(W, H, 28, rng) * 0.35
    # grime gathers toward the bottom edge
    patina = np.clip(patina + np.linspace(-0.12, 0.18, H)[:, None], 0, 1)

    # -- paint the flat design ----------------------------------------------
    design.rect(0, 0, W, H, "dark")
    design.rect(DARK, DARK, W - DARK, H - DARK, "sage")
    inner_x0, inner_x1 = DARK + SAGE, W - DARK - SAGE
    inner_y0, inner_y1 = DARK + SAGE, H - DARK - SAGE

    # frieze: navy ground; a dashed course along its top and bottom edges;
    # between them a slender scrolling vine with a lobed leaf tucked under
    # every crest and over every trough, as on the Wall St tablet. The
    # ornament is vector geometry and is laid with lay_cut, so every leaf and
    # the stem get the same clean cut-tile outline as the letters.
    fz0, fz1 = inner_y0, inner_y0 + FRIEZE
    design.rect(inner_x0, fz0, inner_x1, fz1, "navy")
    DASH = 12
    oy0, oy1 = fz0 + DASH, fz1 - DASH          # ornament zone between the dashes
    frieze_orn = vine_frieze(inner_x0, inner_x1, oy0, oy1)

    # pilasters: an oval bud, then a hanging chain of bellflowers
    pil_orn = []
    for px0 in (inner_x0, fx1 + KEY):
        pil_orn.append(bell_chain(px0, px0 + PIL_W, fz1, fy1 + KEY))

    # sage keyline frame around the name field
    design.rect(fx0 - KEY, fy0 - KEY, fx1 + KEY, fy1 + KEY, "sage")
    design.rect(fx0, fy0, fx1, fy1, "navy")

    # pilasters: navy with stacked cream husk drops
    for px0 in (inner_x0, fx1 + KEY):
        px1 = px0 + PIL_W
        design.rect(px0, fz1, px1, fy1 + KEY, "navy")
        cx = (px0 + px1) / 2
        y = fz1 + 12
        while y + 60 < fy1 + KEY:
            # bellflower husk: a bell pointing down with flared lobes, a bead below
            design.poly(
                [(cx, y + 46), (cx - 20, y + 18), (cx - 18, y + 4), (cx - 7, y + 12),
                 (cx, y + 2), (cx + 7, y + 12), (cx + 18, y + 4), (cx + 20, y + 18)],
                "cream",
            )
            design.ellipse([cx - 7, y + 50, cx + 7, y + 64], "cream")
            y += 76

    # letters, as exact vector outlines
    lines_top = fy0 + (field_h - text_block) / 2
    letters = Polygon()
    for i, text in enumerate(lines):
        baseline = lines_top + cap + i * (cap + gap_lines)
        x_left = (W - measure(text, em, tracking, word_space)) / 2
        letters = letters.union(letter_shapes(text, x_left, baseline, em, tracking, word_space))

    # checker band: two rows of squares, full width
    cy0 = fy1 + KEY
    design.rect(inner_x0, cy0, inner_x1, cy0 + CHECK, "cream")
    sq = 20
    n = int((inner_x1 - inner_x0) / sq)
    sq = (inner_x1 - inner_x0) / n
    for r in range(2):
        for c in range(n):
            if (r + c) % 2 == 0:
                x = inner_x0 + c * sq
                design.rect(x, cy0 + r * 20, x + sq, cy0 + (r + 1) * 20, "navy")

    # lozenge band: navy rule, cream ground, gold lozenges between navy squares
    by0 = cy0 + CHECK
    design.rect(inner_x0, by0, inner_x1, by0 + 10, "navy")
    design.rect(inner_x0, by0 + 10, inner_x1, by0 + 80, "cream")
    design.rect(inner_x0, by0 + 80, inner_x1, by0 + 90, "navy")
    unit = 200
    count = max(1, round((inner_x1 - inner_x0) / unit))
    unit = (inner_x1 - inner_x0) / count
    mid = by0 + 45
    for c in range(count + 1):
        x = inner_x0 + c * unit
        # navy square with a gold centre
        design.rect(x - 26, mid - 26, x + 26, mid + 26, "navy")
        design.rect(x - 12, mid - 12, x + 12, mid + 12, "gold")
        if c < count:
            lx0, lx1 = x + 40, x + unit - 40
            design.poly(
                [(lx0, mid), (lx0 + 30, mid - 22), (lx1 - 30, mid - 22), (lx1, mid), (lx1 - 30, mid + 22), (lx0 + 30, mid + 22)],
                "gold",
            )

    # -- lay tesserae over it, region by region ------------------------------
    variants = build_variants(rng)
    s = Setter(design, rng, variants, patina)

    # outer frame: long thin pieces
    s.lay(0, 0, W, DARK, DARK, DARK * 2.6, bond=False)
    s.lay(0, H - DARK, W, H, DARK, DARK * 2.6, bond=False)
    s.lay(0, DARK, DARK, H - DARK, DARK * 2.4, DARK, bond=False)
    s.lay(W - DARK, DARK, W, H - DARK, DARK * 2.4, DARK, bond=False)
    s.lay(DARK, DARK, W - DARK, DARK + SAGE, SAGE, SAGE * 1.6)
    s.lay(DARK, H - DARK - SAGE, W - DARK, H - DARK, SAGE, SAGE * 1.6)
    s.lay(DARK, DARK + SAGE, DARK + SAGE, H - DARK - SAGE, SAGE * 1.6, SAGE, bond=False)
    s.lay(W - DARK - SAGE, DARK + SAGE, W - DARK, H - DARK - SAGE, SAGE * 1.6, SAGE, bond=False)

    # frieze: dashed courses top and bottom, ornament between, all finer tile
    s.dashes(inner_x0, fz0, inner_x1, oy0, cream=17, navy=8)
    s.dashes(inner_x0, oy1, inner_x1, fz1, cream=17, navy=8)
    s.lay_cut(inner_x0, oy0, inner_x1, oy1, 7.6, 9.5, frieze_orn, ground="navy", figure="cream", gap=2.0)
    # pilasters
    for (px0, orn) in zip((inner_x0, fx1 + KEY), pil_orn):
        s.lay_cut(px0, fz1, px0 + PIL_W, fy1 + KEY, 7.6, 9.5, orn, ground="navy", figure="cream", gap=2.0)

    # keyline: one course of sage around the field
    s.lay(fx0 - KEY, fy0 - KEY, fx1 + KEY, fy0, KEY, KEY * 1.5)
    s.lay(fx0 - KEY, fy1, fx1 + KEY, fy1 + KEY, KEY, KEY * 1.5)
    s.lay(fx0 - KEY, fy0, fx0, fy1, KEY * 1.5, KEY, bond=False)
    s.lay(fx1, fy0, fx1 + KEY, fy1, KEY * 1.5, KEY, bond=False)

    # the name field: running-bond courses, every edge tile cut to the letters
    s.lay_cut(fx0, fy0, fx1, fy1, th, tw, letters, ground="navy", figure="cream", gap=2.2)

    # checker: hand-made squares on a true grid
    for r in range(2):
        s.lay(inner_x0, cy0 + r * 20, inner_x1, cy0 + (r + 1) * 20, 20, sq, aligned=True, jit=0.9)

    # lozenge band
    s.lay(inner_x0, by0, inner_x1, by0 + 10, 10, 15)
    s.lay(inner_x0, by0 + 10, inner_x1, by0 + 80, 10, 13)
    s.lay(inner_x0, by0 + 80, inner_x1, by0 + 90, 10, 15)

    os.makedirs(OUT_SVG, exist_ok=True)
    os.makedirs(OUT_PNG, exist_ok=True)
    svg = s.svg(W, H)
    with open(os.path.join(OUT_SVG, name + ".svg"), "w") as f:
        f.write(svg)
    s.png(W, H, 0.5).save(os.path.join(OUT_PNG, name + ".png"))
    return {"name": name, "W": W, "H": H, "css": (W / U, H / U), "tiles": len(s.tiles), "bytes": len(svg), "em": em, "cap": cap}


if __name__ == "__main__":
    print(build(["ANTON CASTRO"], 520, seed=1904, name="name-wide"))
    print(build(["ANTON", "CASTRO"], 320, seed=1908, name="name-narrow"))
