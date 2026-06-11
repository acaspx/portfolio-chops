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

      <Section id="origin" kicker="Origin" title="Born in a strategy classroom, not a hackathon">
        <p>
          Custoria started as our MBA Design Strategy (DMBA) thesis — a data privacy
          and security application. The strategy training mattered more than the
          original idea: we were taught to interrogate the business model behind
          the design, and the interrogation is what killed v1.
        </p>
        <Todo>
          Interview Q1: what was the original privacy/security app, and what did
          you learn that killed it?
        </Todo>
      </Section>

      <Section id="pivot" kicker="The pivot" title="From protecting data to protecting what it represents">
        <p>
          We pivoted to a digital vault SaaS for people&apos;s and businesses&apos; most
          valuable possessions — AI-powered appraisal and insurance claims built on
          top of a security foundation we&apos;d already designed.
        </p>
        <Todo>
          Interview Q2: the pivot moment — what signal (user, market, advisor)
          triggered it, and what carried over from v1?
        </Todo>
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
