"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

/**
 * "UI generation" reveal, after Jakub Antalik's skeleton effect
 * (x.com/Jakubantalik/status/2109671433521815772), read frame by frame:
 *
 *   1. A faint dot grid fades in across the surface, with dotted guide lines
 *      running past the column's edges like design-tool guides.
 *   2. Every element marked data-gen="card" is traced as a dense dotted
 *      outline; its images as inner dotted frames; each line of its text as a
 *      dotted bar at the line's real measured width (Range.getClientRects), so
 *      the skeleton is the exact shape of the content about to appear. Cards
 *      trace top to bottom on a stagger.
 *   3. Meanwhile grid dots "come alive": short runs of 2-4 darken and fade,
 *      clustered over the cards. A mono readout tracks the current frame's
 *      size, elapsed time, and the drawing head's coordinates.
 *   4. The real cards resolve in on a stagger while grid and skeleton fade.
 *
 * Drawn on one viewport-sized canvas in a sticky layer, so it stays cheap and
 * within mobile canvas limits however tall the content is; positions are read
 * in content coordinates and offset by scroll each frame. Plays once per
 * mount. Under prefers-reduced-motion it does nothing and content shows as is.
 */

type Pt = [number, number];
type Stroke = { pts: Pt[]; start: number; dur: number; alpha: number; r: number };
type Card = {
  el: HTMLElement;
  x: number;
  y: number;
  w: number;
  h: number;
  start: number;
  strokes: Stroke[];
};
type Run = { x: number; y: number; dx: number; dy: number; len: number; born: number };

const INK = "22,20,15";
const GRID = 20; // dot grid pitch, px
const STEP = 4; // dot spacing along traced lines, px
const T = {
  gridIn: 0.3,
  first: 0.14, // first card starts tracing
  stagger: 0.11, // between cards
  maxStagger: 5, // cards past this all share the last slot
  cardDur: 0.42, // outline trace
  textLag: 0.16, // text bars start after their card's outline
  lineStagger: 0.035,
  maxLines: 8,
  lineDur: 0.26,
  hold: 0.14, // beat between skeleton complete and resolve
  fadeOut: 0.45,
  cardIn: 0.5,
  cardInStagger: 0.06,
  runLife: 0.5,
  runRate: 46, // alive-dot runs spawned per second
};
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const mod = (a: number, n: number) => ((a % n) + n) % n;

function line(x0: number, y0: number, x1: number, y1: number): Pt[] {
  const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / STEP));
  return Array.from({ length: n + 1 }, (_, i) => [x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n]);
}

function arc(cx: number, cy: number, r: number, a0: number, a1: number): Pt[] {
  const n = Math.max(1, Math.round((Math.abs(a1 - a0) * r) / STEP));
  return Array.from({ length: n }, (_, i) => {
    const a = a0 + ((a1 - a0) * (i + 1)) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
}

/** Points around a rounded rect, clockwise from the top-left, evenly spaced. */
function roundRect(x: number, y: number, w: number, h: number, r: number): Pt[] {
  r = Math.min(r, w / 2, h / 2);
  const P = Math.PI;
  return [
    ...line(x + r, y, x + w - r, y),
    ...arc(x + w - r, y + r, r, -P / 2, 0),
    ...line(x + w, y + r, x + w, y + h - r).slice(1),
    ...arc(x + w - r, y + h - r, r, 0, P / 2),
    ...line(x + w - r, y + h, x + r, y + h).slice(1),
    ...arc(x + r, y + h - r, r, P / 2, P),
    ...line(x, y + h - r, x, y + r).slice(1),
    ...arc(x + r, y + r, r, P, 1.5 * P),
  ];
}

const radius = (el: Element, fallback: number) =>
  parseFloat(getComputedStyle(el).borderTopLeftRadius) || fallback;

export default function GenerationReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimsRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !layer || !canvas || !ctx) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-gen="card"]'));
    // Hide before first paint: the skeleton stands in for them.
    for (const el of els) {
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";
    }

    // ---------------------------------------------------------- measure --
    let cards: Card[] = [];
    let resolveAt = 1.2;
    const measure = () => {
      const rr = root.getBoundingClientRect();
      cards = els.map((el, i) => {
        // measure the resting box, not the translated one
        const b = el.getBoundingClientRect();
        const x = b.left - rr.left;
        const y = b.top - rr.top - 6;
        const start = T.first + Math.min(i, T.maxStagger) * T.stagger;
        const strokes: Stroke[] = [
          { pts: roundRect(x, y, b.width, b.height, radius(el, 12)), start, dur: T.cardDur, alpha: 0.5, r: 1.05 },
        ];
        el.querySelectorAll("img").forEach((img) => {
          const frame = img.parentElement && img.parentElement !== el ? img.parentElement : img;
          const m = frame.getBoundingClientRect();
          if (Math.abs(m.width - b.width) < 8 && Math.abs(m.height - b.height) < 8) return;
          strokes.push({
            pts: roundRect(m.left - rr.left, m.top - rr.top - 6, m.width, m.height, radius(frame, 10)),
            start: start + 0.08,
            dur: T.cardDur * 0.8,
            alpha: 0.32,
            r: 1,
          });
        });
        let li = 0;
        el.querySelectorAll<HTMLElement>("p, span").forEach((t) => {
          if (t.tagName === "SPAN" && t.closest("p")) return;
          const range = document.createRange();
          range.selectNodeContents(t);
          const rows = new Map<number, [number, number, number]>();
          for (const rc of Array.from(range.getClientRects())) {
            if (rc.width < 2) continue;
            const mid = rc.top + rc.height / 2;
            const key = Math.round(mid / 6);
            const row = rows.get(key);
            if (row) {
              row[0] = Math.min(row[0], rc.left - rr.left);
              row[1] = Math.max(row[1], rc.right - rr.left);
            } else {
              rows.set(key, [rc.left - rr.left, rc.right - rr.left, mid - rr.top - 6]);
            }
          }
          for (const [x0, x1, ym] of rows.values()) {
            strokes.push({
              pts: line(x0, ym, x1, ym),
              start: start + T.textLag + Math.min(li, T.maxLines) * T.lineStagger,
              dur: T.lineDur,
              alpha: 0.36,
              r: 1,
            });
            li++;
          }
        });
        return { el, x, y, w: b.width, h: b.height, start, strokes };
      });
      // resolve once everything on the first screen has finished tracing
      const vh = layer.clientHeight;
      const ends = cards
        .filter((c) => c.y + rr.top < vh)
        .flatMap((c) => c.strokes.map((s) => s.start + s.dur));
      resolveAt = Math.min(1.6, Math.max(0.9, Math.max(0, ...ends))) + T.hold;
    };

    // ----------------------------------------------------------- canvas --
    let W = 0;
    let H = 0;
    let dpr = 1;
    let grid: CanvasPattern | null = null;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = layer.clientWidth;
      H = layer.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const tile = document.createElement("canvas");
      tile.width = tile.height = GRID * dpr;
      const tc = tile.getContext("2d")!;
      tc.fillStyle = `rgba(${INK},0.22)`;
      tc.beginPath();
      tc.arc((GRID / 2) * dpr, (GRID / 2) * dpr, 1 * dpr, 0, Math.PI * 2);
      tc.fill();
      grid = ctx.createPattern(tile, "repeat");
      measure();
    };
    resize();
    window.addEventListener("resize", resize);

    // ------------------------------------------------------------- loop --
    const runs: Run[] = [];
    let raf = 0;
    let t0 = 0;
    let last = 0;
    let lastMeasure = 0;
    let resolved = false;

    const dots = (pts: Pt[], n: number, ox: number, oy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const sx = pts[i][0] + ox;
        const sy = pts[i][1] + oy;
        if (sy < -4 || sy > H + 4) continue;
        ctx.moveTo(sx + r, sy);
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const frame = (now: number) => {
      if (!t0) t0 = last = now;
      const t = (now - t0) / 1000;
      const dt = (now - last) / 1000;
      last = now;

      // images can still be loading on first open; keep the skeleton honest
      if (!resolved && now - lastMeasure > 120) {
        measure();
        lastMeasure = now;
      }

      const rr = root.getBoundingClientRect();
      const lr = layer.getBoundingClientRect();
      const ox = rr.left - lr.left;
      const oy = rr.top - lr.top;
      const out = t > resolveAt ? clamp(1 - (t - resolveAt) / T.fadeOut) : 1;
      const lead = cards[0];

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // 1. grid, anchored to content so it scrolls with it
      if (grid) {
        ctx.globalAlpha = clamp(t / T.gridIn) * out;
        ctx.fillStyle = grid;
        ctx.save();
        ctx.translate(mod(ox, GRID), mod(oy, GRID));
        ctx.scale(1 / dpr, 1 / dpr);
        ctx.fillRect(-GRID * dpr, -GRID * dpr, (W + GRID * 2) * dpr, (H + GRID * 2) * dpr);
        ctx.restore();
      }

      ctx.fillStyle = `rgb(${INK})`;

      // 2. guides off the column edges and the lead card's top
      if (lead) {
        const g = clamp((t - 0.05) / 0.4);
        const ease = 1 - Math.pow(1 - g, 3);
        ctx.globalAlpha = 0.17 * out;
        const v = line(0, 0, 0, H * ease);
        dots(v, v.length, lead.x + ox, 0, 0.8);
        dots(v, v.length, lead.x + lead.w + ox, 0, 0.8);
        const hz = line(0, 0, W * ease, 0);
        dots(hz, hz.length, 0, lead.y + oy, 0.8);
      }

      // 3. skeleton strokes, and find the drawing head for the readout
      let head: { card: Card; x: number; y: number } | null = null;
      for (const c of cards) {
        for (const s of c.strokes) {
          const p = clamp((t - s.start) / s.dur);
          if (p <= 0) continue;
          const n = Math.max(1, Math.floor(s.pts.length * (1 - Math.pow(1 - p, 3))));
          ctx.globalAlpha = s.alpha * out;
          dots(s.pts, n, ox, oy, s.r);
          if (p < 1) head = { card: c, x: s.pts[n - 1][0], y: s.pts[n - 1][1] };
        }
      }

      // 4. alive dots: short runs flaring over the cards
      if (t > 0.18 && t < resolveAt) {
        let spawn = dt * T.runRate;
        const visible = cards.filter((c) => c.y + oy < H && c.y + c.h + oy > 0 && t >= c.start);
        while (visible.length && spawn > 0) {
          if (Math.random() < spawn) {
            const c = visible[Math.floor(Math.random() * visible.length)];
            const vert = Math.random() < 0.6;
            const len = 2 + Math.floor(Math.random() * 3);
            const gx = Math.floor((c.x + 8 + Math.random() * (c.w - 16)) / GRID) * GRID + GRID / 2;
            const gy = Math.floor((c.y + 8 + Math.random() * (c.h - 16)) / GRID) * GRID + GRID / 2;
            runs.push({ x: gx, y: gy, dx: vert ? 0 : 1, dy: vert ? 1 : 0, len, born: t });
          }
          spawn -= 1;
        }
      }
      for (let i = runs.length - 1; i >= 0; i--) {
        const r = runs[i];
        const age = (t - r.born) / T.runLife;
        if (age >= 1) {
          runs.splice(i, 1);
          continue;
        }
        const a = Math.sin(Math.PI * age) * 0.58 * out;
        for (let k = 0; k < r.len; k++) {
          ctx.globalAlpha = a * (1 - k * 0.2);
          ctx.beginPath();
          ctx.arc(r.x + r.dx * k * GRID + ox, r.y + r.dy * k * GRID + oy, 1.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // 5. readout: frame size + elapsed over the active card, coords at the head
      const dims = dimsRef.current;
      const coord = coordRef.current;
      const active = head?.card ?? lead;
      if (dims && active) {
        dims.textContent = `${Math.round(active.w)} × ${Math.round(active.h)}  t+${t.toFixed(2)}s`;
        dims.style.transform = `translate(${active.x + ox}px, ${active.y + oy - 20}px)`;
        dims.style.opacity = String(clamp(t / 0.2) * out);
      }
      if (coord) {
        if (head) {
          coord.textContent = `${Math.round(head.x - head.card.x)}·${Math.round(head.y - head.card.y)}`;
          coord.style.transform = `translate(${head.x + ox + 8}px, ${head.y + oy - 16}px)`;
          coord.style.opacity = String(out);
        } else {
          coord.style.opacity = "0";
        }
      }

      // 6. resolve: the real cards take over from their skeletons
      if (!resolved && t >= resolveAt) {
        resolved = true;
        cards.forEach((c, i) => {
          const d = Math.min(i, T.maxStagger) * T.cardInStagger;
          c.el.style.transition = `opacity ${T.cardIn}s ${EASE} ${d}s, transform ${T.cardIn}s ${EASE} ${d}s`;
          c.el.style.opacity = "1";
          c.el.style.transform = "none";
        });
      }

      if (t < resolveAt + T.fadeOut) {
        raf = requestAnimationFrame(frame);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      for (const el of els) {
        el.style.opacity = "";
        el.style.transform = "";
        el.style.transition = "";
      }
    };
  }, [reduce]);

  return (
    <div ref={rootRef} className="relative min-h-full w-full">
      {!reduce && !done && (
        <div
          ref={layerRef}
          aria-hidden
          className="pointer-events-none sticky top-0 -mb-[100dvh] h-[100dvh] w-full overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div
            ref={dimsRef}
            className="absolute left-0 top-0 whitespace-nowrap font-mono text-[11px] tabular-nums text-ink/45"
            style={{ opacity: 0 }}
          />
          <div
            ref={coordRef}
            className="absolute left-0 top-0 whitespace-nowrap font-mono text-[11px] tabular-nums text-ink/45"
            style={{ opacity: 0 }}
          />
        </div>
      )}
      {children}
    </div>
  );
}
