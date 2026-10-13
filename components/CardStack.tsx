"use client";

import { Children, Fragment, useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A deck of cards that stack as you scroll, held in the vertical centre of the
 * screen. Each child sits in a sticky slot a few pixels lower than the last, so
 * arriving cards rise from below over earlier ones and the edges of the cards
 * beneath peek out at the top as a running count.
 *
 * The deck never scrolls away. Whatever is passed as `after` lives inside the
 * same container, so the sticky slots stay pinned to the end; as `after` rises
 * into view the deck glides up just far enough to clear it (never past
 * MIN_TOP), and on screens too short for that it also scales down to fit.
 * Both are driven straight off scroll position, so they scrub and reverse.
 *
 * Positioning is plain CSS `position: sticky`, so the browser's own scrolling
 * drives it: keyboard, trackpad, momentum and screen readers behave normally.
 * One rAF-throttled listener layers the polish on top:
 *   - a covered card recedes (scales down a touch and dims) in proportion to
 *     how far the next card has slid over it ([data-stack-dim] darkens);
 *   - each card's [data-stack-text] fades and rises in as the card settles.
 *
 * Under prefers-reduced-motion the deck still stacks and still makes room for
 * `after` (both are layout), but nothing dims, recedes, or fades.
 */

const PEEK = 10; // each card sits this much lower than the one before
const MAX_PEEK = 4; // past this many, slots stop stepping down
const GAP = "8vh"; // scroll travel between one card settling and the next
const MIN_TOP = 20; // the deck never rises closer than this to the top edge
const AFTER_GAP = 28; // breathing room between the deck and `after`
const MIN_FIT = 0.7; // the most the deck will shrink to make room on short screens
// Every card is the same height. A sticky deck only reads cleanly when each
// card fully covers the one beneath it; mixed heights leave the bottom of a
// taller card exposed under a shorter one. Taller share of the screen on
// phones, where the column is narrow and text wraps more.
const CARD_H = "[--card-h:min(84vh,600px)] sm:[--card-h:min(70vh,560px)]";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** Sticky top for slot i, centring the whole deck (cards plus peeks). */
const slotTop = (i: number, n: number) => {
  const deckPeek = Math.min(n - 1, MAX_PEEK) * PEEK;
  const offset = Math.min(i, MAX_PEEK) * PEEK;
  return `max(${MIN_TOP}px, calc((100dvh - var(--card-h) - ${deckPeek}px) / 2)) + ${offset}px`;
};

export default function CardStack({
  children,
  after,
  scrollRef,
}: {
  children: ReactNode;
  /** Content below the deck (a sign-off). The deck makes room for it. */
  after?: ReactNode;
  scrollRef: RefObject<HTMLElement | null>;
}) {
  const reduce = !!useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const n = items.length;

  useLayoutEffect(() => {
    const sc = scrollRef.current;
    const wrap = wrapRef.current;
    if (!sc || !wrap) return;
    const slots = Array.from(wrap.querySelectorAll<HTMLElement>(":scope > [data-stack-item]"));

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = sc.clientHeight;
      const scTop = sc.getBoundingClientRect().top;
      // resolved sticky tops, in px from the top of the scroller
      const tops = slots.map((s) => parseFloat(getComputedStyle(s).top) || 0);

      // -- make room for `after`: glide the deck up, then shrink if needed ---
      let shift = 0;
      let fit = 1;
      const afterEl = afterRef.current;
      if (afterEl && slots.length) {
        const deckTop = tops[0];
        const deckBottom = tops[tops.length - 1] + slots[slots.length - 1].offsetHeight;
        const limit = afterEl.getBoundingClientRect().top - scTop - AFTER_GAP;
        const overlap = deckBottom - limit;
        if (overlap > 0) {
          shift = Math.min(overlap, Math.max(0, deckTop - MIN_TOP));
          const rest = overlap - shift;
          if (rest > 0) fit = Math.max(MIN_FIT, 1 - rest / (deckBottom - deckTop));
        }
      }
      slots.forEach((slot, i) => {
        if (shift === 0 && fit === 1) {
          slot.style.transform = "";
          return;
        }
        // scale every slot about the same point (the deck's top edge) so the
        // stepped peeks shrink together instead of drifting apart
        slot.style.transformOrigin = `50% ${tops[0] - tops[i]}px`;
        slot.style.transform = `translateY(${-shift}px) scale(${fit})`;
      });

      const rects = slots.map((s) => s.getBoundingClientRect());
      // distance each card still has to travel to reach its slot (0 = settled)
      const away = rects.map((r, i) => Math.max(0, r.top - scTop - tops[i]));

      slots.forEach((slot, i) => {
        const face = slot.firstElementChild as HTMLElement | null;
        const texts = slot.querySelectorAll<HTMLElement>("[data-stack-text]");
        const dim = slot.querySelector<HTMLElement>("[data-stack-dim]");
        if (reduce) {
          if (face) face.style.transform = "";
          if (dim) dim.style.opacity = "0";
          texts.forEach((t) => {
            t.style.opacity = "";
            t.style.transform = "";
          });
          return;
        }

        // how covered this card is: the sum of how far later cards have slid over it
        const h = Math.max(1, slot.offsetHeight);
        let depth = 0;
        for (let j = i + 1; j < slots.length; j++) depth += clamp(1 - away[j] / h);
        depth = Math.min(depth, 3);
        if (face) face.style.transform = `scale(${1 - 0.035 * depth})`;
        if (dim) dim.style.opacity = String(0.07 * depth);

        // text resolves over the last ~40% of a screen of travel into the slot
        const e = 1 - Math.pow(1 - clamp(1 - away[i] / (vh * 0.4)), 3);
        texts.forEach((t) => {
          t.style.opacity = String(e);
          t.style.transform = `translateY(${(1 - e) * 10}px)`;
        });
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    sc.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Layout can shift with no scroll at all: a photo finishing its load on
    // first open pushes every later card down. Without this, a card measured
    // before that shift keeps its text faded in while still off its slot.
    const ro = new ResizeObserver(onScroll);
    ro.observe(wrap);
    slots.forEach((slot) => ro.observe(slot));
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      sc.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollRef, reduce, n]);

  return (
    // `after` sits inside this container, so the sticky slots' range runs to
    // the very end and the deck never releases and scrolls off the top
    <div ref={wrapRef} className={`relative pb-[6vh] ${CARD_H}`}>
      {/* Snap anchors, one per card, at the scroll position where that card
          has just settled into its slot. The scroller uses proximity snapping,
          so a scroll that ends near a card lands it cleanly; one that ends
          elsewhere is left alone. */}
      {items.map((_, i) => (
        <span
          key={`snap-${i}`}
          aria-hidden
          className="pointer-events-none absolute left-0 h-px w-px snap-start"
          style={{
            top: `calc(${i} * (var(--card-h) + ${GAP}))`,
            scrollMarginTop: `calc(${slotTop(i, n)})`,
          }}
        />
      ))}
      {items.map((child, i) => (
        <Fragment key={i}>
          <div
            data-stack-item
            className="sticky"
            style={{ top: `calc(${slotTop(i, n)})`, zIndex: i + 1 }}
          >
            <div className="h-[var(--card-h)] origin-top will-change-transform">{child}</div>
          </div>
          {/* The gap is a separate spacer, not the card's margin: a sticky
              box's margin must stay inside its container, so a card carrying
              the gap as margin-bottom gets shoved upward at the end of the
              scroll on short screens, past the top edge. */}
          {i < n - 1 && <div aria-hidden style={{ height: GAP }} />}
        </Fragment>
      ))}
      {after && (
        <div ref={afterRef} className="relative" style={{ marginTop: GAP }}>
          {after}
        </div>
      )}
    </div>
  );
}
