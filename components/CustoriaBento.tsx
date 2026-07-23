"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

/**
 * The redesigned Custoria brand, shown as a bento: one oversized hero tile
 * (the item page, the most luxurious frame in the app) anchoring five
 * supporting crops of the core flow. Dark vault-like screens sit directly on
 * the light Custoria canvas, so the tiles themselves carry the new brand while
 * the page keeps the portfolio's own language. Tiles crop from the top of each
 * screen (object-top), where the signature UI lives.
 */

type TileDef = { src: string; alt: string; label: string };

const HERO: TileDef = {
  src: "/work/cu2-item.jpg",
  alt: "Custoria item page: a vintage gold-tone ring photographed large, with a serif title and an ownership-verification banner",
  label: "Item record",
};

const SUPPORT: TileDef[] = [
  { src: "/work/cu2-vaultanalysis.jpg", alt: "Vault analytics: average value and items and value broken down by category", label: "Analytics" },
  { src: "/work/cu2-result.jpg", alt: "AI analysis result: 80% confidence, processing time, and photos used", label: "AI result" },
  { src: "/work/cu2-saved.jpg", alt: "Item saved: the proof-of-ownership prompt listing accepted documents", label: "Proof of ownership" },
  { src: "/work/cu2-analyzing.jpg", alt: "AI analysis in progress, reading photos and estimating value", label: "AI at work" },
  { src: "/work/cu2-analysis.jpg", alt: "Full analysis: rarity, value estimate and range, and AI metadata", label: "Valuation" },
];

function Tile({ tile, className = "" }: { tile: TileDef; className?: string }) {
  const [missing, setMissing] = useState(false);
  return (
    <figure className={`relative overflow-hidden rounded-xl bg-[#0d0e12] ring-1 ring-black/30 ${className}`}>
      {missing ? (
        <div className="grid h-full min-h-[8rem] place-items-center px-3 text-center">
          <span className="font-mono text-[10px] text-paper/50">{tile.src.split("/").pop()}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tile.src}
          alt={tile.alt}
          loading="lazy"
          className="h-full w-full object-cover object-top"
          onError={() => setMissing(true)}
        />
      )}
      <figcaption className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-white/85 backdrop-blur-sm">
        {tile.label}
      </figcaption>
    </figure>
  );
}

export default function CustoriaBento() {
  return (
    <Reveal>
      <figure className="my-8">
        <div className="phone-canvas overflow-hidden rounded-2xl p-4 sm:p-6">
          {/* Hero + two stacked crops */}
          <div className="grid grid-cols-2 gap-3">
            <Tile tile={HERO} className="row-span-2" />
            <Tile tile={SUPPORT[0]} className="aspect-[4/3]" />
            <Tile tile={SUPPORT[1]} className="aspect-[4/3]" />
          </div>
          {/* Bottom band */}
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Tile tile={SUPPORT[2]} className="aspect-[3/4]" />
            <Tile tile={SUPPORT[3]} className="aspect-[3/4]" />
            <Tile tile={SUPPORT[4]} className="aspect-[3/4]" />
          </div>
        </div>
        <figcaption className="mt-2.5 font-mono text-xs text-muted">
          The rebrand in the product: vault-dark surfaces, appraisal serifs, and a status
          language that reads at a glance
        </figcaption>
      </figure>
    </Reveal>
  );
}
