"use client";

import { Children, useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A deck of cards that stack as you scroll. Each child sits in a sticky slot a
 * few pixels lower than the last, so arriving cards slide up over earlier ones
 * and the edges of the cards beneath peek out at the top as a running count.
 *
 * Positioning is plain CSS `position: sticky`, so the browser's own scrolling
 * drives it: keyboard, trackpad, momentum and screen readers all behave
 * normally. One rAF-throttled scroll listener layers the polish on top:
 *   - a covered card recedes (scales down a touch and dims) in proportion to
 *     how far the next card has slid over it;
 *   - each card's [data-stack-text] content fades and rises in as the card
 *     arrives in its slot, so text resolves as the card settles.
 * Cards may also carry a [data-stack-dim] overlay for the dimming.
 *
 * Under prefers-reduced-motion the deck still stacks (that's layout, not
 * animation) but nothing scales, dims, or fades.
 */

const TOP = 64; // first slot, px from the top of the scroll container
const PEEK = 10; // each card sits this much lower than the one before
const MAX_PEEK = 4; // past this many, slots stop stepping down
const GAP = "8vh"; // scroll travel between one card settling and the next
// Every card is the same height. A sticky deck only reads cleanly when each
// card fully covers the one beneath it; mixed heights leave the bottom of a
// taller card exposed under a shorter one. Taller share of the screen on
// phones, where the column is narrow and text wraps more.
const CARD_H = "[--card-h:min(84vh,600px)] sm:[--card-h:min(70vh,560px)]";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export const stackSlotTop = (i: number) => TOP + Math.min(i, MAX_PEEK) * PEEK;

export default function CardStack({
  children,
  scrollRef,
}: {
  children: ReactNode;
  scrollRef: RefObject<HTMLElement | null>;
}) {
  const reduce = !!useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

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
      const rects = slots.map((s) => s.getBoundingClientRect());
      // distance each card still has to travel to reach its slot (0 = settled)
      const away = rects.map((r, i) => Math.max(0, r.top - scTop - stackSlotTop(i)));

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
        const h = Math.max(1, rects[i].height);
        let depth = 0;
        for (let j = i + 1; j < slots.length; j++) depth += clamp(1 - away[j] / h);
        depth = Math.min(depth, 3);
        if (face) face.style.transform = `scale(${1 - 0.035 * depth})`;
        if (dim) dim.style.opacity = String(0.07 * depth);

        // text resolves over the last ~45% of a screen of travel into the slot
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
  }, [scrollRef, reduce, items.length]);

  return (
    // bottom padding holds the finished deck in place for a beat before it
    // releases and scrolls away, uncovering whatever follows it
    <div ref={wrapRef} className={`relative pb-[22vh] ${CARD_H}`}>
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
            scrollMarginTop: stackSlotTop(i),
          }}
        />
      ))}
      {items.map((child, i) => (
        <div
          key={i}
          data-stack-item
          className="sticky"
          style={{
            top: stackSlotTop(i),
            zIndex: i + 1,
            marginBottom: i < items.length - 1 ? GAP : 0,
          }}
        >
          <div className="h-[var(--card-h)] origin-top will-change-transform">{child}</div>
        </div>
      ))}
    </div>
  );
}
