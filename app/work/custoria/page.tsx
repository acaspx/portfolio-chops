import type { Metadata } from "next";
import { CaseLayout, CaseLead, CaseHero, Section, Hi, KeyPoints, NextCase } from "@/components/CaseStudy";
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
        tone="custoria"
        company="Custoria Labs · co-founded with Yiyi Qin"
        title="Founding Custoria: a digital vault for what people value most"
        meta={[
          { label: "Role", value: "Co-founder & Founding Designer: design, strategy, and code" },
          { label: "Timeline", value: "Oct 2025 – Present" },
          { label: "Scope", value: "0→1: strategy, capture-to-share flow, design system, security model, iOS build" },
          { label: "Status", value: "Available on the App Store" },
        ]}
        appStore="https://apps.apple.com/us/app/custoria-vault/id6777615531"
      >

      <CaseLead
        hook="Co-founded and built Custoria, a digital vault for what people value most. The hard problem: let owners prove what they hold to an insurer, appraiser, or buyer without exposing their privacy. Designed it end to end, and shipped it to the App Store in Swift."
        stats={[
          { value: "2×", label: "more accurate item records" },
          { value: "~90%", label: "less loss-and-risk exposure" },
          { value: "Available", label: "on the App Store" },
        ]}
      />

      <Section id="origin" kicker="Origin" title="Product-market fit wasn't enough">
        <p>
          Custoria began as our MBA Design Strategy thesis: a consumer data-privacy
          app. <Hi>It found product-market fit, and we killed it anyway.</Hi>{" "}
          Interrogating the strategy exposed the real problem, <Hi>distribution</Hi>.
          Privacy is already owned: by legacy trust brands (Norton, McAfee),
          privacy-first challengers (DuckDuckGo, Brave), and the platforms that
          bundle it free (Apple, Google). When your competitor is already installed,
          trusted, or free, a better product doesn&apos;t win. A different market does.
        </p>
      </Section>

      <Section id="pivot" kicker="The pivot" title="From protecting data to proving ownership">
        <p>
          The wedge came from my co-founder, Yiyi Qin, who works in jewelry and art
          galleries. Galleries, collectors, and appraisers carry real privacy,
          insurance, and consignment risk on the objects they hold, and track
          ownership with tools never built for it. Niche but hungry:{" "}
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
          Our privacy playbook mapped straight onto it. Custoria became a{" "}
          <Hi>digital vault for the things people value most</Hi>: capture an item in
          seconds, keep tracking effortless, and prove ownership and value (or
          transfer it) with privacy as the spine, not a settings page.
        </p>
      </Section>

      <Section id="problem" kicker="The hard problem" title="Sharing that proves, without exposing">
        <p>
          The sharing model is the product. The vault is encrypted and
          biometric-locked; the hard part was the share: proving ownership, value,
          and authenticity to an insurer, appraiser, or buyer <em>without</em>{" "}
          compromising privacy. So the owner gets <Hi>three dials</Hi>:
        </p>
        <KeyPoints
          items={[
            <><Hi>What</Hi>: field-level control over which facts a share exposes.</>,
            <><Hi>How long</Hi>: every share is time-boxed.</>,
            <><Hi>Who</Hi>: named or anonymous, because proving you own something shouldn&apos;t force you to reveal who you are.</>,
          ]}
        />
        <p>
          Every shared record carries a Custoria watermark and stamp of authenticity.
          That does two jobs: it makes the record trustworthy to whoever receives it,
          and it puts our brand in front of the insurers, appraisers, and buyers we
          need to reach. <Hi>The distribution lesson that killed v1, designed into
          v2.</Hi>
        </p>
        <p>
          Underneath: <Hi>zero-knowledge, end-to-end encryption</Hi> (even Custoria
          can&apos;t see inside your vault), with a blockchain-backed chain of
          ownership and expiring access links doing the enforcement the legalese
          usually only pretends to.
        </p>
        <ShareDemo />
      </Section>

      <Section id="building" kicker="Building it" title="Designed and coded by the same two hands">
        <p>
          The whole product is one flow: point a camera at something you own, and
          seconds later it&apos;s a protected, valued record in your vault.
        </p>
        <CaptureJourney />
        <p>
          I own the design end to end, and the code. Custoria is a native iOS app in
          Swift, with <Hi>Gemini Flash</Hi> doing the unglamorous work that makes the
          vault effortless: scan an item and the AI names it, fills the metadata
          (value, brand, ID), and tags it. No forms, no manual cataloging. Add a
          receipt or certificate and the record gets stronger.
        </p>
        <p>Coding it changed how I design:</p>
        <KeyPoints
          items={[
            <>Owning the dependencies made me <Hi>think in systems at scale</Hi>.</>,
            <>Owning the data pipeline taught me it&apos;s a <Hi>differentiator, not plumbing</Hi>.</>,
            <>It surfaced what a Figma file can&apos;t: <Hi>how fast and how reliably the app feels</Hi>, the things users judge in the first thirty seconds.</>,
          ]}
        />
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
          MVP pilots have run since late 2025, and the early numbers say the workflow
          replacement is real: records <Hi>2× more accurate</Hi> on details, value,
          origin, and ownership than manual methods, and a{" "}
          <Hi>~90% cut in loss-and-risk exposure</Hi>.
        </p>
        <p>
          The app is <Hi>live on the App Store</Hi>. Next: converting the gallery
          pilot network into the first paying customers.
        </p>
      </Section>

      </CaseLayout>

      <NextCase href="/work/state-affairs" label="State Affairs · policy intelligence AI" />
    </article>
  );
}
