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
const AFTER_GAP = 20; // the deck yields if `after` comes closer than this (less than AFTER_SPACE, so it holds still at rest)
// The band under the deck reserved for `after` (the sign-off). The deck is
// centred together WITH this band, so when the last card settles the sign-off
// is already on screen beneath it. Nothing is left to scroll to, so proximity
// snapping can't pull the reader back above it.
const AFTER_SPACE = 24; // deck bottom to the top of `after`
const AFTER_H = 112; // fixed height of the `after` band
const MIN_FIT = 0.7; // the most the deck will shrink to make room on short screens
// Every card is the same height. A sticky deck only reads cleanly when each
// card fully covers the one beneath it; mixed heights leave the bottom of a
// taller card exposed under a shorter one. Taller share of the screen on
// phones, where the column is narrow and text wraps more.
const CARD_H = "[--card-h:min(84vh,600px)] sm:[--card-h:min(70vh,560px)]";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** Nearest ancestor that scrolls vertically. */
const findScroller = (el: HTMLElement): HTMLElement | null => {
  for (let p = el.parentElement; p; p = p.parentElement) {
    const oy = getComputedStyle(p).overflowY;
    if (oy === "auto" || oy === "scroll") return p;
  }
  return null;
};

/** Sticky top for slot i: centres the deck (cards plus peeks), together with
 *  the band reserved for `after` when there is one. */
const slotTop = (i: number, n: number, reserve: number) => {
  const deckPeek = Math.min(n - 1, MAX_PEEK) * PEEK;
  const offset = Math.min(i, MAX_PEEK) * PEEK;
  return `max(${MIN_TOP}px, calc((100dvh - var(--card-h) - ${deckPeek + reserve}px) / 2)) + ${offset}px`;
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
  const reserve = after ? AFTER_SPACE + AFTER_H : 0;
  const lastTop = `calc(${slotTop(n - 1, n, reserve)})`;

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    // React runs a child's layout effects before it attaches the parent's
    // ref, so on first mount scrollRef.current is still null here and the
    // effect used to bail out for good: no fades, no dimming, no sign-off.
    // Fall back to finding the scroller from the DOM, which always exists.
    const sc = scrollRef.current ?? findScroller(wrap);
    if (!sc) return;
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

      // `after` arrives with the last card: it fades up over the same travel,
      // and anything marked [data-stack-write] (the signature) writes itself on
      // left to right over the back half of it, finishing as the card lands.
      if (afterEl && slots.length) {
        const last = away[away.length - 1];
        const e = reduce ? 1 : 1 - Math.pow(1 - clamp(1 - last / (vh * 0.4)), 3);
        afterEl.style.opacity = String(e);
        afterEl.style.transform = reduce ? "" : `translateY(${(1 - e) * 12}px)`;
        const w = reduce ? 1 : clamp((e - 0.35) / 0.65);
        afterEl.querySelectorAll<HTMLElement>("[data-stack-write]").forEach((el) => {
          el.style.clipPath = `inset(0 ${(1 - w) * 100}% 0 0)`;
        });
      }
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
    <div
      ref={wrapRef}
      className={`relative ${CARD_H}`}
      // End the scroll exactly where the last card settles: whatever room is
      // left under the reserved band at that moment becomes bottom padding.
      style={{
        paddingBottom: after
          ? `max(0px, calc(100dvh - (${lastTop} + var(--card-h) + ${AFTER_SPACE + AFTER_H}px)))`
          : "6vh",
      }}
    >
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
            scrollMarginTop: `calc(${slotTop(i, n, reserve)})`,
          }}
        />
      ))}
      {items.map((child, i) => (
        <Fragment key={i}>
          <div
            data-stack-item
            className="sticky"
            style={{ top: `calc(${slotTop(i, n, reserve)})`, zIndex: i + 1 }}
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
        <div
          ref={afterRef}
          className="relative flex flex-col items-center justify-center"
          style={{ marginTop: AFTER_SPACE, height: AFTER_H, opacity: reduce ? 1 : 0 }}
        >
          {after}
        </div>
      )}
    </div>
  );
}
