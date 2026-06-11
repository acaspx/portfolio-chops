import type { Metadata } from "next";
import { CaseHeader, Section, Todo, ImageSlot, NextCase } from "@/components/CaseStudy";
import CaseNav from "@/components/CaseNav";

export const metadata: Metadata = {
  title: "Custoria — Founding a Digital Vault | Anton Castro",
  description:
    "Co-founding Custoria: from MBA Design Strategy thesis to an AI-powered digital vault for people's most valuable possessions, now in App Store review.",
};

const sections = [
  { id: "origin", label: "Origin" },
  { id: "pivot", label: "The pivot" },
  { id: "problem", label: "The hard problem" },
  { id: "building", label: "Building it" },
  { id: "status", label: "Where it stands" },
];

export default function Custoria() {
  return (
    <article>
      <CaseNav sections={sections} />
      <CaseHeader
        company="Custoria Labs — co-founded with Yiyi Qin"
        title="Founding Custoria: a digital vault for what people value most"
        meta={[
          { label: "Role", value: "Co-founder & Founding Designer — design, strategy, and code" },
          { label: "Timeline", value: "Oct 2025 – Present" },
          { label: "Scope", value: "0→1: strategy, capture-to-share flow, design system, security model, iOS build" },
          { label: "Status", value: "In Apple App Store review" },
        ]}
      />

      <Section id="origin" kicker="Origin" title="Product-market fit wasn't enough">
        <p>
          Custoria began as our MBA Design Strategy (DMBA) thesis: a consumer data
          privacy and security app. It found product-market fit — and we killed it
          anyway. The strategy interrogation we&apos;d been trained to run exposed the
          real problem: distribution. Privacy is owned by legacy trust brands
          (Norton, McAfee), privacy-first challengers (DuckDuckGo, Brave), and
          platforms that embed it free (Apple, Google). When your competitors are
          already installed, already trusted, or already free, a better product
          doesn&apos;t win — a different market does.
        </p>
      </Section>

      <Section id="pivot" kicker="The pivot" title="From protecting data to proving ownership">
        <p>
          The wedge came from my co-founder, Yiyi Qin, who works in the jewelry and
          art gallery world: galleries, collectors, and appraisers carry real
          privacy, insurance, and consignment risk around the objects they hold —
          and track ownership with tools that were never designed for it. The
          market is niche but hungry: roughly 19,000–25,000 commercial galleries
          across 3,500+ cities, plus the much larger long tail of collectors,
          appraisers, hobbyists, and small businesses.
        </p>
        <p>
          Our privacy playbook mapped cleanly onto it. Custoria became a digital
          vault for the things people value most: capture an item in seconds, keep
          storage and tracking effortless, and prove ownership and value — or
          transfer it — with security and privacy as the product&apos;s spine, not a
          settings page.
        </p>
      </Section>

      <Section id="problem" kicker="The hard problem" title="Trust people with their irreplaceables">
        <p>
          The security and sharing model is the product: an encrypted,
          biometric-locked vault with owner-set, customizable sharing permissions —
          security that feels like ownership, not friction.
        </p>
        <ImageSlot caption="The vault: capture-to-share flow with owner-set permissions" />
        <Todo>
          Interview Q3: one hard security-UX decision (e.g., what does sharing a
          possession's record actually expose, and what did you argue about?)
        </Todo>
      </Section>

      <Section id="building" kicker="Building it" title="Designed and coded by the same two hands">
        <p>
          As co-founder I own design end-to-end — and the code. The capture-to-share
          flow, the design system, and the iOS app itself.
        </p>
        <ImageSlot caption="App: AI-powered capture and appraisal flow" />
        <Todo>
          Interview Q4: the AI's concrete job (appraisal? capture? claims?), the
          stack, and one thing building it taught you that designing alone wouldn&apos;t.
        </Todo>
      </Section>

      <Section id="status" kicker="Where it stands" title="In review, and what's next">
        <Todo>
          Interview Q5: traction/validation so far (pilot users, businesses,
          waitlist?) and the next milestone after App Store approval.
        </Todo>
      </Section>

      <NextCase href="/work/state-affairs" label="State Affairs — policy intelligence AI" />
    </article>
  );
}
