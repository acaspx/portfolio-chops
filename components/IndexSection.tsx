"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CaseGateLink from "@/components/CaseGateLink";

export type IndexItem = {
  label: string;
  /** Right column. Carries the outcome, not a date: in a list this is the proof. */
  meta: string;
  href?: string;
  external?: boolean;
  locked?: boolean;
  /** Shown beside the column on hover. Omit for rows with nothing to show. */
  img?: string;
  alt?: string;
  /** Below lg: one line under the title, and a swipeable row of images. */
  desc?: string;
  gallery?: { src: string; alt: string }[];
};

/** The item's link, whichever kind it is: gated case, page, external, or none. */
function ItemLink({
  it,
  className,
  children,
}: {
  it: IndexItem;
  className: string;
  children: ReactNode;
}) {
  if (it.locked && it.href)
    return (
      <CaseGateLink
        href={it.href}
        locked
        ariaLabel={`Unlock the ${it.label} case study`}
        className={`${className} text-left`}
      >
        {children}
      </CaseGateLink>
    );
  if (it.href)
    return (
      <Link
        href={it.href}
        {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={className}
      >
        {children}
      </Link>
    );
  return <div className={className}>{children}</div>;
}

/**
 * A horizontal row of large image cards that bleeds to the screen edge, with a
 * thin progress track underneath standing in for the hidden native scrollbar
 * (which iOS only shows mid-scroll, so nobody would know there is more).
 */
function Gallery({ images, label }: { images: { src: string; alt: string }[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ w: 1, x: 0 });
  const single = images.length === 1;

  useEffect(() => {
    const el = ref.current;
    if (!el || single) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      const w = Math.min(1, el.clientWidth / el.scrollWidth);
      setBar({ w, x: max > 0 ? (el.scrollLeft / max) * (1 - w) : 0 });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener("scroll", on, { passive: true });
    const ro = new ResizeObserver(on);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("scroll", on);
    };
  }, [single]);

  return (
    <div className="mt-4">
      <div
        ref={ref}
        role={single ? undefined : "region"}
        aria-label={single ? undefined : `${label} images`}
        tabIndex={single ? undefined : 0}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((im) => (
          <div
            key={im.src}
            className={`relative aspect-[16/11] shrink-0 snap-start overflow-hidden rounded-[14px] bg-white ring-1 ring-ink/[0.07] ${
              single ? "w-full" : "w-[82%]"
            }`}
          >
            <Image
              src={im.src}
              alt={im.alt}
              fill
              sizes={single ? "100vw" : "82vw"}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {!single && (
        <div aria-hidden className="mt-3 h-[3px] overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-ink/35"
            style={{ width: `${bar.w * 100}%`, transform: `translateX(${(bar.x / bar.w) * 100}%)` }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Dense index section: a quiet label over rows of label-left, meta-right.
 *
 * At lg and up, the hover preview lives in the dead space beside the narrow
 * column rather than inside it, so the list keeps its density and the work is
 * still one gesture away. Keyboard focus drives it too, not just pointer.
 *
 * Below lg there is no margin to park a preview in and no hover to trigger it,
 * so sections whose items carry a gallery switch to a showcase: title, one
 * line, and a swipeable row of large images per item.
 */
export default function IndexSection({
  title,
  items,
  className = "",
}: {
  title: string;
  items: IndexItem[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const showcase = items.some((it) => it.gallery?.length);

  const shown = active !== null ? items[active] : null;
  const top =
    active !== null && rowRefs.current[active] && listRef.current
      ? rowRefs.current[active]!.offsetTop
      : 0;

  return (
    <section className={`mt-12 first:mt-0 ${className}`}>
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">{title}</h2>

      {showcase && (
        <div className="mt-5 space-y-12 lg:hidden">
          {items.map((it) => (
            <article key={it.label}>
              <ItemLink
                it={it}
                className="inline-block text-[18px] tracking-tight underline decoration-ink/20 decoration-1 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
              >
                {it.label}
              </ItemLink>
              {it.desc && (
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{it.desc}</p>
              )}
              {it.gallery && <Gallery images={it.gallery} label={it.label} />}
            </article>
          ))}
        </div>
      )}

      <ul ref={listRef} className={`relative mt-3 ${showcase ? "hidden lg:block" : ""}`}>
        {items.map((it, i) => (
          <li
            key={it.label}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <ItemLink
              it={it}
              className={`flex w-full items-baseline justify-between gap-2 py-[7px] text-[15px] transition-colors ${
                it.href ? "hover:text-accent" : ""
              }`}
            >
              <span className="truncate">{it.label}</span>
              <span className="shrink-0 pl-6 text-right font-mono text-[12px] text-muted">
                {it.meta}
              </span>
            </ItemLink>
          </li>
        ))}

        {/* Preview, parked in the margin beside the column. */}
        <AnimatePresence>
          {shown?.img && (
            <motion.div
              key={shown.label}
              aria-hidden
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ top: top - 44 }}
              className="pointer-events-none absolute left-full ml-12 hidden w-[17rem] lg:block"
            >
              <div className="rounded-[7px] bg-white p-[6px] shadow-[0_14px_30px_-10px_rgba(22,20,15,0.3)] ring-1 ring-ink/[0.06]">
                <Image
                  src={shown.img}
                  alt={shown.alt ?? ""}
                  width={544}
                  height={374}
                  sizes="260px"
                  className="aspect-[16/11] w-full rounded-[3px] object-cover object-top"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </section>
  );
}
