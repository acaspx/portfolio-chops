import type { Metadata } from "next";
import { CaseLayout, CaseLead, CaseHero, Section, CaseImage, Hi, NextCase } from "@/components/CaseStudy";
import ShareDemo from "@/components/ShareDemo";
import CaptureJourney from "@/components/CaptureJourney";
import { PhoneShowcase } from "@/components/PhoneFrame";

export const metadata: Metadata = {
  title: "Custoria · Founding a Digital Vault | Anton Castro",
  description:
    "Co-founding Custoria: from MBA Design Strategy thesis to an AI-powered digital vault for people's most valuable possessions, now available on the App Store.",
};

export default function Custoria() {
  return (
    <article>
      <CaseHero
        src="/work/cu-event.jpg"
        alt="Anton Castro presenting Custoria Labs at a demo day, the 'How Custoria Labs Works' slide projected behind him to a seated audience"
        width={2600}
        height={1300}
      />
      <CaseLayout
        company="Custoria Labs · co-founded with Yiyi Qin"
        title="Founding Custoria: a digital vault for what people value most"
        meta={[
          { label: "Role", value: "Co-founder & Founding Designer: design, strategy, and code" },
          { label: "Timeline", value: "Oct 2025 – Present" },
          { label: "Scope", value: "0→1: strategy, capture-to-share flow, design system, security model, iOS build" },
          { label: "Status", value: "Available on the App Store" },
        ]}
      >

      <CaseLead
        hook="Co-founding Custoria: a digital vault for what people value most. I designed it end to end and built the iOS app in Swift, design and code in one pair of hands."
        stats={[
          { value: "2×", label: "more accurate item records" },
          { value: "~90%", label: "less loss-and-risk exposure" },
          { value: "Available", label: "on the App Store" },
        ]}
      />

      <Section id="origin" kicker="Origin" title="Product-market fit wasn't enough">
        <p>
          Custoria began as our MBA Design Strategy thesis: a consumer data privacy
          app. <Hi>It found product-market fit, and we killed it anyway.</Hi> The
          strategy interrogation exposed the real problem: distribution. Privacy is
          owned by legacy trust brands (Norton, McAfee), privacy-first challengers
          (DuckDuckGo, Brave), and platforms that embed it free (Apple, Google).
          When your competitors are already installed, trusted, or free, a better
          product doesn&apos;t win; a different market does.
        </p>
      </Section>

      <Section id="pivot" kicker="The pivot" title="From protecting data to proving ownership">
        <p>
          The wedge came from my co-founder, Yiyi Qin, who works in the jewelry and
          art gallery world: galleries, collectors, and appraisers carry real
          privacy, insurance, and consignment risk around the objects they hold,
          and track ownership with tools never designed for it. Niche but hungry:{" "}
          <Hi>~20,000 commercial galleries worldwide</Hi>, plus the long tail of
          collectors, appraisers, and small businesses.
        </p>
        <blockquote className="border-l-2 border-accent pl-5 italic text-ink/75">
          &quot;Every time an agent takes that Yayoi Kusama Pumpkin for a client
          viewing, I&apos;m on edge. As a gallery manager, once the work leaves my
          hands, I can&apos;t sleep.&quot;
          <footer className="mt-2 not-italic font-mono text-xs text-muted">
            Gallery manager, pilot research
          </footer>
        </blockquote>
        <p>
          Our privacy playbook mapped cleanly onto it. Custoria became a digital
          vault for the things people value most: capture an item in seconds, keep
          storage and tracking effortless, and prove ownership and value (or
          transfer it) with security and privacy as the product&apos;s spine, not a
          settings page.
        </p>
      </Section>

      <Section id="problem" kicker="The hard problem" title="Sharing that proves, without exposing">
        <p>
          The security and sharing model is the product. The vault is encrypted and
          biometric-locked, but the hard design problem was the share: an owner
          needs to prove ownership, value, and authenticity to an insurer,
          appraiser, or buyer <em>without</em> surrendering their privacy.
        </p>
        <p>
          The model gives the owner three dials. <Hi>What</Hi>: field-level
          control over which facts a share exposes. <Hi>How long</Hi>: every
          share is time-boxed. <Hi>Who they are</Hi>: named or anonymous, because
          proving you own something and revealing who you are shouldn&apos;t be the
          same act.
        </p>
        <p>
          Every shared record carries a Custoria watermark and stamp of
          authenticity. It does two jobs: makes the record trustworthy to whoever
          receives it, and puts our brand in front of the insurers, appraisers, and
          buyers we need to reach. That&apos;s the distribution lesson that killed v1,
          designed into v2.
        </p>
        <p>
          Underneath it all: zero-knowledge, end-to-end encryption (even Custoria
          can&apos;t see inside your vault) with blockchain-backed chain of ownership
          and expiring access links doing the enforcement the legalese usually
          pretends to.
        </p>
        <ShareDemo />
      </Section>

      <Section id="building" kicker="Building it" title="Designed and coded by the same two hands">
        <p>
          The whole product is one flow: point a camera at something you own and,
          seconds later, it&apos;s a protected, valued record in your vault. Here is
          that path, and who does the work at each step.
        </p>
        <CaptureJourney />
        <p>
          As co-founder I own design end-to-end, and the code. Custoria is a
          native iOS app in Swift, with Gemini Flash doing the unglamorous work
          that makes the vault effortless: scan an item and the AI identifies it,
          fills in the metadata (value, brand, identification) and labels it
          with categories and tags. No forms, no manual cataloging.
        </p>
        <p>
          Documentation compounds it: add a receipt or certificate and the record
          gets stronger. The vault isn&apos;t an archive; it&apos;s where the work of
          owning valuable things happens.
        </p>
        <p>
          Coding it changed how I design. Owning the dependencies forced me to
          think about systems at scale; owning the data pipeline taught me it&apos;s a
          differentiator, not plumbing. And it surfaced the intangibles a Figma
          file can&apos;t capture: how fast the app feels, how reliably it behaves,
          the qualities users now expect from AI-native products and judge in the
          first thirty seconds.
        </p>
        <PhoneShowcase
          phones={[
            { src: "/work/cu-capture.png", alt: "Custoria AI camera scan capturing photos of an item", step: "Capture", note: "Snap a few photos. No forms, no manual entry." },
            { src: "/work/cu-analyze.png", alt: "Photos captured, ready to analyze with AI", step: "Analyze", note: "One tap hands the photos to Gemini Flash." },
            { src: "/work/cu-identify.png", alt: "AI-identified Heath Ceramics wall clock valued at $180", step: "Identify", note: "It names the piece, prices it, files the record." },
            { src: "/work/cu-vault.png", alt: "My Vault showing total value and item list", step: "Vault", note: "Everything you own, valued and searchable." },
            { src: "/work/cu-share.png", alt: "Ownership and sharing controls for an item", step: "Share", note: "Field-level, time-boxed control over who sees what." },
            { src: "/work/cu-prove.png", alt: "Generate appraisal and proof-of-ownership reports", step: "Prove", note: "Appraisal and proof-of-ownership reports on demand." },
          ]}
          caption="Live on iOS: capture to vault, and the proof that travels with it."
        />
      </Section>

      <Section id="status" kicker="Where it stands" title="Piloted, measured, and shipped">
        <p>
          MVP pilots have run since late 2025, and the numbers say the workflow
          replacement is real: item records <Hi>2× more accurate</Hi> on details,
          value, origin, and ownership than manual methods, and a{" "}
          <Hi>~90% reduction in loss-and-risk exposure</Hi>.
        </p>
        <p>
          The app is <Hi>available on the App Store</Hi> now. Next: converting
          the gallery pilot network into the first paying customers.
        </p>
      </Section>

      </CaseLayout>

      <NextCase href="/work/state-affairs" label="State Affairs · policy intelligence AI" />
    </article>
  );
}
