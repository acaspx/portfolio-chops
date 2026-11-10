"use client";

/**
 * useFluidHover, from Fluid Functionalism by @micka_design
 * (https://www.fluidfunctionalism.com/docs/fluid-hover). Installed from its registry
 * item `use-fluid-hover`, unchanged in behavior; long comments are shortened.
 *
 * Tracks which registered item is under the pointer in a container and measures every
 * item's rect, so one highlight (FluidHoverHighlight) can spring between them.
 */

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";

export interface ItemRect {
  top: number;
  height: number;
  left: number;
  width: number;
}

export interface UseFluidHoverOptions {
  /** With `nearest`: "y" lists (default), "x" strips, "xy" grids. */
  axis?: "x" | "y" | "xy";
  /** Skips an item without unregistering it. Consulted per mouse move. */
  isItemDisabled?: (element: HTMLElement) => boolean;
  /** With `nearest`: route a click between items to the lit one. */
  gapClick?: boolean | { maxDistance?: number };
  /** Light the nearest item even over empty space (off: only the item under the pointer). */
  nearest?: boolean;
}

/** The highlighted index as a store rows can subscribe to (see useFluidHoverSelect). */
export interface FluidHoverActiveStore {
  subscribe: (listener: () => void) => () => void;
  get: () => number | null;
}

export interface UseFluidHoverReturn {
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  activeStore: FluidHoverActiveStore;
  itemRects: ItemRect[];
  /** True once every registered item is measured and no remeasure is pending. */
  isMeasured: boolean;
  /** Steps on each pointer entry, so the highlight fades in instead of sliding over. */
  session: number;
  sessionRef: RefObject<number>;
  handlers: {
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: (e: React.MouseEvent) => void;
  };
  registerItem: (index: number, element: HTMLElement | null) => void;
  /** Invalidate the rects and measure again; call it when a popup opens. */
  remeasure: () => void;
  /** Re-read the rects synchronously (for rows animating under a visible highlight). */
  measureItems: () => void;
}

export interface PickNearestInput {
  axis: "x" | "y" | "xy";
  point: { x: number; y: number };
  rects: readonly (ItemRect | undefined)[];
  containerRect: { left: number; top: number; width: number; height: number };
  scroll: { x: number; y: number };
  border: { x: number; y: number };
  layoutSize: { width: number; height: number };
  isDisabled?: (index: number) => boolean;
}

/** An item the pointer is inside wins; otherwise the item whose center is nearest. */
export function pickNearest({
  axis,
  point,
  rects,
  containerRect,
  scroll,
  border,
  layoutSize,
  isDisabled,
}: PickNearestInput): number | null {
  const scaleX = layoutSize.width > 0 ? containerRect.width / layoutSize.width : 1;
  const scaleY = layoutSize.height > 0 ? containerRect.height / layoutSize.height : 1;
  let closestIndex: number | null = null;
  let closestDistance = Infinity;
  let containingIndex: number | null = null;

  for (let index = 0; index < rects.length; index++) {
    const r = rects[index];
    if (!r) continue;
    if (isDisabled?.(index)) continue;

    if (axis === "xy") {
      const left = containerRect.left + (border.x + r.left - scroll.x) * scaleX;
      const top = containerRect.top + (border.y + r.top - scroll.y) * scaleY;
      const width = r.width * scaleX;
      const height = r.height * scaleY;
      if (point.x >= left && point.x <= left + width && point.y >= top && point.y <= top + height) {
        containingIndex = index;
      }
      const distance = Math.hypot(point.x - (left + width / 2), point.y - (top + height / 2));
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
      continue;
    }

    const horizontal = axis === "x";
    const mousePos = horizontal ? point.x : point.y;
    const scale = horizontal ? scaleX : scaleY;
    const itemStart =
      (horizontal ? containerRect.left : containerRect.top) +
      ((horizontal ? border.x : border.y) + (horizontal ? r.left : r.top) - (horizontal ? scroll.x : scroll.y)) * scale;
    const itemSize = (horizontal ? r.width : r.height) * scale;
    if (mousePos >= itemStart && mousePos <= itemStart + itemSize) {
      containingIndex = index;
    }
    const distance = Math.abs(mousePos - (itemStart + itemSize / 2));
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  }

  return containingIndex ?? closestIndex;
}

/** Whether an event happened inside the element whose handler hears it (not a portal). */
export function isOwnEvent(e: { currentTarget?: EventTarget | null; target?: EventTarget | null }) {
  const { currentTarget, target } = e;
  if (!(currentTarget instanceof Node) || !(target instanceof Node)) return true;
  return currentTarget.contains(target);
}

/** Set on the highlighted item (boolean attribute). */
export const ACTIVE_ATTR = "data-fluid-hover-active";
/** Set on the container: the highlighted index, or absent. */
export const ACTIVE_INDEX_ATTR = "data-fluid-hover-active-index";

const ACTIVATOR_SELECTOR =
  "a[href], button, [role='menuitem'], [role='menuitemradio'], [role='menuitemcheckbox'], [role='option'], [role='radio'], [role='checkbox'], [role='tab'], [role='link'], [role='button']";

function resolveActivator(element: HTMLElement): HTMLElement {
  if (element.matches(ACTIVATOR_SELECTOR) || element.hasAttribute("tabindex")) {
    return element;
  }
  return element.querySelector<HTMLElement>(ACTIVATOR_SELECTOR) ?? element;
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Frames the remeasure retries while items have no layout box yet. */
const measurementAttempts = 3;

export function useFluidHover<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  options: UseFluidHoverOptions = {},
): UseFluidHoverReturn {
  const { axis = "y", isItemDisabled, gapClick = true, nearest = false } = options;
  const gapClickMaxDistance = typeof gapClick === "object" ? (gapClick.maxDistance ?? Infinity) : Infinity;
  const itemsRef = useRef(new Map<number, HTMLElement>());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const listenersRef = useRef(new Set<() => void>());
  const activeStore = useMemo<FluidHoverActiveStore>(
    () => ({
      subscribe: (listener) => {
        listenersRef.current.add(listener);
        return () => {
          listenersRef.current.delete(listener);
        };
      },
      get: () => activeIndexRef.current,
    }),
    [],
  );
  useIsoLayoutEffect(() => {
    activeIndexRef.current = activeIndex;
    listenersRef.current.forEach((listener) => listener());
  }, [activeIndex]);

  // The state, in the DOM: on the highlighted item and the container.
  useEffect(() => {
    const container = containerRef.current;
    const items = itemsRef.current;
    if (activeIndex === null) container?.removeAttribute(ACTIVE_INDEX_ATTR);
    else container?.setAttribute(ACTIVE_INDEX_ATTR, String(activeIndex));
    const active = activeIndex === null ? undefined : items.get(activeIndex);
    active?.setAttribute(ACTIVE_ATTR, "");
    return () => {
      active?.removeAttribute(ACTIVE_ATTR);
      if (activeIndex !== null) items.get(activeIndex)?.removeAttribute(ACTIVE_ATTR);
    };
  }, [activeIndex, containerRef]);
  const [itemRects, setItemRects] = useState<ItemRect[]>([]);
  const [isMeasured, setIsMeasured] = useState(false);
  const itemRectsRef = useRef<ItemRect[]>([]);
  const [session, setSession] = useState(0);
  const sessionRef = useRef(0);
  const sessionPendingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const remeasureRafIdRef = useRef<number | null>(null);

  /** Publishes a rect per item; false (and nothing published) if an item has no layout box. */
  const runMeasurement = useCallback(() => {
    const container = containerRef.current;
    if (!container) return false;
    const rects: ItemRect[] = [];
    let everyItemHasLayout = true;
    itemsRef.current.forEach((element, index) => {
      const hasLayoutBox = element.offsetParent !== null || element.offsetWidth > 0 || element.offsetHeight > 0;
      if (!hasLayoutBox) {
        everyItemHasLayout = false;
        return;
      }
      // offset* (not getBoundingClientRect), so transforms don't skew it; nested
      // positioned ancestors inside the container are accumulated.
      let top = element.offsetTop;
      let left = element.offsetLeft;
      let ancestor = element.offsetParent as HTMLElement | null;
      while (ancestor && ancestor !== container && container.contains(ancestor)) {
        top += ancestor.offsetTop + ancestor.clientTop;
        left += ancestor.offsetLeft + ancestor.clientLeft;
        ancestor = ancestor.offsetParent as HTMLElement | null;
      }
      rects[index] = { top, height: element.offsetHeight, left, width: element.offsetWidth };
    });
    if (!everyItemHasLayout) return false;
    const prev = itemRectsRef.current;
    let changed = prev.length !== rects.length;
    for (let i = 0; !changed && i < rects.length; i++) {
      const p = prev[i];
      const r = rects[i];
      if (p === r) continue;
      changed = !p || !r || p.top !== r.top || p.left !== r.left || p.width !== r.width || p.height !== r.height;
    }
    if (changed) {
      itemRectsRef.current = rects;
      setItemRects(rects);
    }
    return true;
  }, [containerRef]);

  const measureItems = useCallback(() => {
    runMeasurement();
  }, [runMeasurement]);

  /** One coalesced measurement pass per frame; the only place readiness is reported. */
  const scheduleMeasurement = useCallback(
    (attempts: number) => {
      const attempt = (attemptsLeft: number) => {
        if (remeasureRafIdRef.current !== null) {
          cancelAnimationFrame(remeasureRafIdRef.current);
        }
        remeasureRafIdRef.current = requestAnimationFrame(() => {
          remeasureRafIdRef.current = null;
          if (runMeasurement()) {
            setIsMeasured(true);
          } else if (attemptsLeft > 1) {
            attempt(attemptsLeft - 1);
          }
        });
      };
      attempt(attempts);
    },
    [runMeasurement],
  );

  const remeasure = useCallback(() => {
    setIsMeasured(false);
    scheduleMeasurement(measurementAttempts);
  }, [scheduleMeasurement]);

  // Items that change size in place invalidate the rects too.
  const itemRoRef = useRef<ResizeObserver | null>(null);
  const getItemRo = useCallback(() => {
    if (itemRoRef.current === null && typeof ResizeObserver !== "undefined") {
      itemRoRef.current = new ResizeObserver(() => scheduleMeasurement(measurementAttempts));
    }
    return itemRoRef.current;
  }, [scheduleMeasurement]);

  const registerItem = useCallback(
    (index: number, element: HTMLElement | null) => {
      if (element) {
        itemsRef.current.set(index, element);
        getItemRo()?.observe(element);
        if (index === activeIndexRef.current) element.setAttribute(ACTIVE_ATTR, "");
      } else {
        const previous = itemsRef.current.get(index);
        if (previous) itemRoRef.current?.unobserve(previous);
        previous?.removeAttribute(ACTIVE_ATTR);
        itemsRef.current.delete(index);
        if (index === activeIndexRef.current) {
          setActiveIndex((current) => (current === index && !itemsRef.current.has(index) ? null : current));
        }
      }
      remeasure();
    },
    [remeasure, getItemRo],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isOwnEvent(e)) return;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const target = e.target as Node;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const container = containerRef.current;
        if (!container) return;
        let next: number | null;
        if (!nearest) {
          // The item under the pointer (innermost when items nest), or none.
          next = null;
          let hit: HTMLElement | null = null;
          for (const [index, el] of itemsRef.current) {
            if (!el.contains(target) || isItemDisabled?.(el)) continue;
            if (!hit || hit.contains(el)) {
              hit = el;
              next = index;
            }
          }
        } else
          next = pickNearest({
            axis,
            point: { x: mouseX, y: mouseY },
            rects: itemRectsRef.current,
            containerRect: container.getBoundingClientRect(),
            scroll: { x: container.scrollLeft, y: container.scrollTop },
            border: { x: container.clientLeft, y: container.clientTop },
            layoutSize: { width: container.offsetWidth, height: container.offsetHeight },
            isDisabled: isItemDisabled
              ? (index) => {
                  const el = itemsRef.current.get(index);
                  return !!el && isItemDisabled(el);
                }
              : undefined,
          });
        if (sessionPendingRef.current && next !== activeIndexRef.current) {
          sessionPendingRef.current = false;
          sessionRef.current += 1;
          setSession(sessionRef.current);
        }
        if (next === null) sessionPendingRef.current = true;
        setActiveIndex(next);
      });
    },
    [axis, containerRef, isItemDisabled, nearest],
  );

  const handleMouseEnter = useCallback(() => {
    sessionPendingRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setActiveIndex(null);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      for (const element of itemsRef.current.values()) {
        if (element.contains(target)) return;
      }
      if (!target.isConnected) return;
      if (!isOwnEvent(e)) return;
      const control = (target as Element).closest?.(
        "input, textarea, select, button, a, summary, [contenteditable], [role='textbox'], [role='searchbox'], [role='button']",
      );
      if (control) return;
      if (gapClick === false || !nearest) return;
      const index = activeIndexRef.current;
      if (index === null) return;
      const element = itemsRef.current.get(index);
      if (!element || isItemDisabled?.(element)) return;
      if (gapClickMaxDistance !== Infinity) {
        const r = element.getBoundingClientRect();
        const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
        const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
        if (Math.hypot(dx, dy) > gapClickMaxDistance) return;
      }
      resolveActivator(element).click();
    },
    [isItemDisabled, gapClick, gapClickMaxDistance, nearest],
  );

  // A container reflow moves items: remeasure (readiness kept, to avoid flicker).
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => scheduleMeasurement(measurementAttempts));
    ro.observe(container);
    return () => ro.disconnect();
  }, [containerRef, scheduleMeasurement]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      if (remeasureRafIdRef.current !== null) cancelAnimationFrame(remeasureRafIdRef.current);
      itemRoRef.current?.disconnect();
      itemRoRef.current = null;
    };
  }, []);

  return {
    activeIndex,
    setActiveIndex,
    activeStore,
    itemRects,
    isMeasured,
    session,
    sessionRef,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
    },
    registerItem,
    remeasure,
    measureItems,
  };
}

const subscribeNever = () => () => {};

/** Reads one primitive derived from the highlighted index; re-renders only when it changes. */
export function useFluidHoverSelect<T>(
  store: FluidHoverActiveStore | null | undefined,
  select: (activeIndex: number | null) => T,
): T {
  return useSyncExternalStore(
    store?.subscribe ?? subscribeNever,
    () => select(store ? store.get() : null),
    () => select(null),
  );
}

/** Registers an item's element with its list for as long as it is mounted. */
export function useRegisterFluidHoverItem(
  registerItem: ((index: number, element: HTMLElement | null) => void) | undefined,
  index: number | undefined,
  ref: RefObject<HTMLElement | null>,
) {
  useIsoLayoutEffect(() => {
    if (!registerItem || index === undefined) return;
    registerItem(index, ref.current);
    return () => registerItem(index, null);
  }, [index, registerItem, ref]);
}
