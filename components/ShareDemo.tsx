"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * Interactive demo of Custoria's share model - the three dials, live.
 * Built in code because the prototype is the argument.
 */

type Field = { key: string; label: string; value: string; on: boolean };

const initialFields: Field[] = [
  { key: "owner", label: "Ownership", value: "Verified · proof of purchase", on: true },
  { key: "value", label: "Estimated value", value: "$2,500", on: true },
  { key: "brand", label: "Brand / maker", value: "Heath Ceramics", on: true },
  { key: "auth", label: "Authenticity", value: "Stamped · AI + documentation", on: true },
  { key: "date", label: "Date of purchase", value: "March 2024", on: false },
];

const durations = ["24 hours", "7 days", "30 days"];

export default function ShareDemo() {
  const [fields, setFields] = useState(initialFields);
  const [duration, setDuration] = useState(1);
  const [anonymous, setAnonymous] = useState(false);
  const reduce = useReducedMotion();

  const toggle = (key: string) =>
    setFields((f) => f.map((x) => (x.key === key ? { ...x, on: !x.on } : x)));

  return (
    <figure className="my-8">
      <div className="grid gap-4 rounded-xl border border-line bg-ink/[0.02] p-5 sm:grid-cols-[1fr_1.1fr] sm:p-6">
        {/* Controls - the owner's three dials */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            1 · What gets shared
          </p>
          <ul className="mt-3 space-y-1.5">
            {fields.map((f) => (
              <li key={f.key}>
                <button
                  onClick={() => toggle(f.key)}
                  aria-pressed={f.on}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    f.on
                      ? "border-accent/40 bg-accent/5"
                      : "border-line bg-transparent text-muted"
                  }`}
                >
                  {f.label}
                  <span
                    className={`font-mono text-[10px] uppercase ${
                      f.on ? "text-accent" : "text-muted"
                    }`}
                  >
                    {f.on ? "shared" : "hidden"}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">
            2 · For how long
          </p>
          <div className="mt-3 flex gap-2">
            {durations.map((d, i) => (
              <button
                key={d}
                onClick={() => setDuration(i)}
                aria-pressed={duration === i}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  duration === i
                    ? "border-accent bg-accent text-paper"
                    : "border-line text-muted hover:text-ink"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">
            3 · As whom
          </p>
          <button
            onClick={() => setAnonymous((a) => !a)}
            aria-pressed={anonymous}
            className="mt-3 flex items-center gap-3 rounded-lg border border-line px-3 py-2 text-sm hover:border-accent/40 transition-colors"
          >
            <span
              className={`relative h-5 w-9 rounded-full transition-colors ${
                anonymous ? "bg-accent" : "bg-line"
              }`}
              aria-hidden
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                  anonymous ? "left-[18px]" : "left-0.5"
                }`}
              />
            </span>
            Share anonymously
          </button>
        </div>

        {/* Live preview - what the recipient sees */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            What the recipient sees
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-line bg-white shadow-sm">
            <div className="checker h-3 text-accent" aria-hidden />
            <div className="p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-lg font-medium tracking-tight">
                  Heath Ceramic Clock
                </p>
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-accent whitespace-nowrap">
                  ✓ Custoria verified
                </span>
              </div>
              <dl className="mt-4 space-y-2">
                <AnimatePresence initial={false}>
                  {fields
                    .filter((f) => f.on)
                    .map((f) => (
                      <motion.div
                        key={f.key}
                        initial={reduce ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-between gap-4 overflow-hidden text-sm"
                      >
                        <dt className="text-muted">{f.label}</dt>
                        <dd className="text-right font-medium">{f.value}</dd>
                      </motion.div>
                    ))}
                </AnimatePresence>
                {fields.every((f) => !f.on) && (
                  <p className="text-sm italic text-muted">
                    Nothing shared. The owner controls every field.
                  </p>
                )}
              </dl>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] text-muted">
                <span>{anonymous ? "Anonymous owner" : "Shared by Anton C."}</span>
                <span>expires in {durations[duration]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-xs text-muted">
        The share model, live. Built in React for this case study. Toggle the dials.
      </figcaption>
    </figure>
  );
}
