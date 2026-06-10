import type { Metadata } from "next";
import { CaseHeader, Section, Todo, ImageSlot, NextCase } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "State Affairs — Policy Intelligence AI | Anton Castro",
  description:
    "Designing State Affairs' first AI product: an enterprise policy-intelligence platform that helped land Walmart and DoorDash as customers.",
};

/*
 * IMAGE EXPORTS (Anton): from Figma "360 Views Design" (2ftkxAYp2q8KO9uZ5qg1Sk),
 * export at 2x PNG into public/work/ :
 *  - node 8166:12002 ("page" — overview w/ What You Need To Know + state map) → sa-360-overview.png
 *  - node 9200:153294 ("just created" — What's Changed empty state)          → sa-whats-changed-empty.png
 *  - a filled What's Changed panel (e.g. under 9200:152374 "this week")      → sa-whats-changed.png
 *  - AI Chat frame (file cL6yXY2m9udDWQUtR80hpi — need node link)            → sa-ai-chat.png
 * Then replace <ImageSlot> with <Image src="/work/..." /> (next/image).
 * Screen real data before export — swap in demo data if any client info is visible.
 */
export default function StateAffairs() {
  return (
    <article>
      <CaseHeader
        company="State Affairs — Policy Intelligence"
        title="Turning dense policy data into decisions enterprise teams act on"
        meta={[
          { label: "Role", value: "Sr. Interaction Designer (first design hire on AI)" },
          { label: "Timeline", value: "Feb 2026 – Present" },
          { label: "Scope", value: "Led 360° Views + AI Chat — the company's first AI features. System architecture, voice & tone, interaction patterns" },
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

      <Section kicker="The hard problem" title="Aggregation isn't insight">
        <p>
          I led 360° Views and AI Chat — the company&apos;s first AI features. V1 could
          already answer impressively specific queries: <em>&quot;show me all the bills on
          this topic, in this state, by this legislator.&quot;</em> Pilot testers were
          impressed. And then they kept asking the same thing: <strong>&quot;so
          what?&quot;</strong> Aggregating legislative data wasn&apos;t the product — knowing
          what it meant for <em>their</em> business was.
        </p>
        <p>
          Policy teams act on this in front of executives and regulators; a wrong
          or merely shallow answer doesn&apos;t just disappoint, it erodes the trust the
          whole platform depends on while you&apos;re trying to win enterprise contracts.
          So instead of expanding query coverage, I argued for going deeper on fewer
          things: trust signals in the UI (citations on every claim) and
          personalization that closes the so-what gap.
        </p>
        <ImageSlot caption="AI Chat: cited, personalized answers over legislative data" />
      </Section>

      <Section kicker="The decision" title="Three robust skills — then a fourth that answers 'what changed?'">
        <p>
          Working with our AI/ML product and engineering leads, I focused V1 on
          three skills we could make genuinely robust: <strong>Bill Compare</strong>,{" "}
          <strong>Create a Report</strong>, and <strong>Generate 360° View</strong> —
          where AI Chat builds a 360° View around an individual user&apos;s needs,
          probabilistically personalizing its data, with the user choosing between a
          static or dynamic view. Get it right on the first try, and users trust the
          platform as a reliable source.
        </p>
        <p>
          As 360° Views matured, I made the call to add a fourth skill:{" "}
          <strong>What&apos;s Changed</strong>. Opened in the context of a 360° View, the
          AI surfaces the top five insights on what&apos;s moved — bills, momentum,
          activity — since the user&apos;s last visit. It turns a data product into a
          briefing that starts where you left off.
        </p>
        <ImageSlot caption="The four skills: Bill Compare, Create a Report, Generate 360° View, What's Changed" />
        <ImageSlot caption="What's Changed: top-five movement insights in 360° View context" />
      </Section>

      <Section kicker="Craft under constraint" title="Translating legislatese, mid-rebrand">
        <p>
          All of this meant digesting the language of government — bills,
          legislative process, regulatory nuance — and translating it into
          conversational, intuitive experiences, while the company ran a full brand
          overhaul underneath us. The voice and tone system I defined had to hold
          both: credible to policy experts, legible to the executives they brief.
        </p>
        <ImageSlot caption="Voice & tone: how the product cites, hedges, and escalates" />
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
