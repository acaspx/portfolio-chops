import type { Metadata } from "next";
import { CaseHeader, Section, Todo, ImageSlot, NextCase } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "State Affairs — Policy Intelligence AI | Anton Castro",
  description:
    "Designing State Affairs' first AI product: an enterprise policy-intelligence platform that helped land Walmart and DoorDash as customers.",
};

export default function StateAffairs() {
  return (
    <article>
      <CaseHeader
        company="State Affairs — Policy Intelligence"
        title="Turning dense policy data into decisions enterprise teams act on"
        meta={[
          { label: "Role", value: "Sr. Interaction Designer (first design hire on AI)" },
          { label: "Timeline", value: "Feb 2026 – Present" },
          { label: "Scope", value: "0→1 product, system architecture, voice & tone, interaction patterns" },
          { label: "Outcome", value: "First enterprise contracts: Walmart, DoorDash, trade associations" },
        ]}
      />

      <Section kicker="Context" title="High stakes, dense data, skeptical buyers">
        <p>
          State-level policy moves fast and the people tracking it — corporate policy
          teams, trade associations — drown in legislative text, committee schedules,
          and fragmented local reporting. State Affairs had the data and the
          journalists. It didn&apos;t have a product that turned that raw material into
          decisions, and it had never shipped AI.
        </p>
        <Todo>
          1–2 sentences on the business stakes: why now, what failure would have
          meant (revenue model, competitive pressure).
        </Todo>
      </Section>

      <Section kicker="The hard problem" title="How much should the AI conclude on its own?">
        <p>
          Policy teams act on this information in front of executives and regulators.
          A hallucinated bill summary isn&apos;t an embarrassing chatbot moment — it&apos;s a
          briefing that gets someone fired. The core design question wasn&apos;t the
          interface; it was the trust contract: what the AI asserts, what it hedges,
          and where it shows its sources.
        </p>
        <p>
          I used research with policy teams to map which workflows deserved AI
          leverage at all, then designed interaction patterns around verifiable
          output — every claim traceable to the underlying bill text or reporting.
        </p>
        <ImageSlot caption="Interaction pattern: AI summary with inline source traceability" />
        <Todo>
          The specific tradeoff story: one decision where you argued for less (or
          more) automation than stakeholders wanted, and what happened.
        </Todo>
      </Section>

      <Section kicker="System" title="Architecture, voice, and patterns — designed as one system">
        <p>
          As the product&apos;s first designer I defined its system architecture, its
          voice and tone, and its reusable interaction patterns together, so every
          future feature inherits the same trust contract instead of renegotiating it.
        </p>
        <ImageSlot caption="System map: skills/workflows architecture" />
        <ImageSlot caption="Voice & tone: how the product hedges, cites, and escalates" />
      </Section>

      <Section kicker="Outcome" title="The first enterprise contracts">
        <p>
          The work focused the product on the highest-impact workflows and gave
          enterprise buyers something they could trust in front of their own
          leadership — helping land State Affairs&apos; first enterprise contracts with
          policy teams at Walmart, DoorDash, and trade associations.
        </p>
        <Todo>
          What you&apos;d do differently / what&apos;s next — one honest paragraph. Confirm
          all client names are cleared for publication; swap to descriptors if not.
        </Todo>
      </Section>

      <NextCase href="/work/augmedix" label="Augmedix — scaling AI clinical documentation" />
    </article>
  );
}
