import type { Metadata } from "next";
import { CaseHeader, Section, ImageSlot, NextCase } from "@/components/CaseStudy";

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
 * From "AI Chat v1" (cL6yXY2m9udDWQUtR80hpi) — these node links are BOARDS, pick
 * the polished frame inside each:
 *  - One desktop chat answer WITH citations visible (boards at 4970:43590
 *    "no chat → side chat → full chat", or 8089:22718)                        → sa-ai-chat.png
 *  - "Custom Report Skill" flow strip (board 6182:2, steps 01 Intake → Recap)
 *    exported as one wide image — process rigor evidence                      → sa-report-skill-flow.png
 * Then replace <ImageSlot> with <Image src="/work/..." /> (next/image).
 * Screen real data before export — swap in demo data if any client info is visible
 * (e.g. "Laura M." in 360 Views, real bill numbers/positions).
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
        <p>
          These were the company&apos;s first AI features, shipping while the business
          was converting its journalism and data into an enterprise platform — and
          while a full rebrand ran underneath. If users didn&apos;t trust the AI on
          first contact, there was no second chance at the contracts the company
          was built to win.
        </p>
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

      <Section kicker="Outcome" title="Validated with the people who'd bet their jobs on it">
        <p>
          We piloted the four skills with policy experts at Intuit, DoorDash,
          Walmart, and Mastercard — co-validating not just whether each skill
          worked, but how it should be <em>invoked</em>: mapping the natural-language
          questions each persona actually asks across their org, and tuning the
          skills to answer them. That co-design is what turned pilots into
          adoption, and adoption into State Affairs&apos; first enterprise contracts
          with policy teams at Walmart, DoorDash, and trade associations.
        </p>
        <p>
          What I&apos;d change in V2: the skills&apos; <em>output</em> should be as adaptive
          as their input. Customizable notifications, a 360° View that shows as
          much or as little as each user wants, and the ability to make those
          adjustments in a couple of AI Chat queries — the assistant getting
          context-aware enough that the platform becomes modular to each org and
          each user, shaped by their onboarding and every previous conversation.
        </p>
      </Section>

      <NextCase href="/work/augmedix" label="Augmedix — scaling AI clinical documentation" />
    </article>
  );
}
