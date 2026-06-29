"use client";

import { useEffect, useRef, useState } from "react";

// 11x7 pixel heart (1 = LED cell).
const HEART = [
  "00110001100",
  "01111111110",
  "01111111110",
  "00111111100",
  "00011111000",
  "00001110000",
  "00000100000",
];

const key = (r: number, c: number) => `${r}-${c}`;
const lit: [number, number][] = [];
HEART.forEach((row, r) => [...row].forEach((ch, c) => ch === "1" && lit.push([r, c])));
const litSet = new Set(lit.map(([r, c]) => key(r, c)));

// 8-direction adjacency among lit cells, so the walk stays connected.
const neighbors: Record<string, string[]> = {};
for (const [r, c] of lit) {
  const ns: string[] = [];
  for (const dr of [-1, 0, 1])
    for (const dc of [-1, 0, 1]) {
      if (dr || dc) {
        const k = key(r + dr, c + dc);
        if (litSet.has(k)) ns.push(k);
      }
    }
  neighbors[key(r, c)] = ns;
}

const OFF = [241, 200, 196]; // light red, LED off
const ON = [255, 79, 67]; // bright red, LED on
const STEP_MS = 280; // slower
const DECAY = 0.72; // trail falloff per step

function mix(v: number) {
  const r = Math.round(OFF[0] + (ON[0] - OFF[0]) * v);
  const g = Math.round(OFF[1] + (ON[1] - OFF[1]) * v);
  const b = Math.round(OFF[2] + (ON[2] - OFF[2]) * v);
  return `rgb(${r}, ${g}, ${b})`;
}

/** Pixel heart whose lit cells carry a bright trail that random-walks through the figure. */
export default function HeartMatrix() {
  const [intens, setIntens] = useState<Record<string, number>>({});
  const head = useRef<string | null>(null);
  const prev = useRef<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    head.current = lit.length ? key(...lit[Math.floor(Math.random() * lit.length)]) : null;
    setIntens(head.current ? { [head.current]: 1 } : {});

    const id = setInterval(() => {
      setIntens((cur) => {
        const next: Record<string, number> = {};
        for (const k in cur) {
          const v = cur[k] * DECAY;
          if (v > 0.04) next[k] = v;
        }
        const h = head.current;
        if (h) {
          let opts = neighbors[h] ?? [];
          const fwd = opts.filter((k) => k !== prev.current); // avoid immediate backtrack
          if (fwd.length) opts = fwd;
          if (opts.length) {
            const nh = opts[Math.floor(Math.random() * opts.length)];
            prev.current = h;
            head.current = nh;
            next[nh] = 1;
          }
        }
        return next;
      });
    }, STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      aria-hidden
      className="grid w-[200px] gap-[5px]"
      style={{ gridTemplateColumns: "repeat(11, minmax(0, 1fr))" }}
    >
      {HEART.flatMap((row, r) =>
        [...row].map((ch, c) => {
          if (ch !== "1") {
            return <span key={key(r, c)} className="aspect-square rounded-[2px] bg-ink/[0.05]" />;
          }
          const v = intens[key(r, c)] ?? 0;
          return (
            <span
              key={key(r, c)}
              className="aspect-square rounded-[2px]"
              style={{
                backgroundColor: mix(v),
                boxShadow:
                  v > 0.55 ? `0 0 ${Math.round(v * 8)}px rgba(255,79,67,${(v * 0.5).toFixed(2)})` : "none",
                transition: "background-color 0.45s linear, box-shadow 0.45s linear",
              }}
            />
          );
        })
      )}
    </span>
  );
}
