import type { Metadata } from "next";
import { CaseHeader, CaseHero, Section, CaseImage, NextCase } from "@/components/CaseStudy";
import CaseNav from "@/components/CaseNav";

const sections = [
  { id: "context", label: "Context" },
  { id: "problem", label: "The hard problem" },
  { id: "decision", label: "The decision" },
  { id: "craft", label: "Craft" },
  { id: "outcome", label: "Outcome" },
];

export const metadata: Metadata = {
  title: "State Affairs — Policy Intelligence AI | Anton Castro",
  description:
    "Designing State Affairs' first AI product: an enterprise policy-intelligence platform that helped land Walmart and DoorDash as customers.",
};

/*
 * IMAGES (Anton): save the product screenshots into public/work/ as:
 *  sa-360-overview.png  — Surveillance Pricing 360 View (briefing + map + AI agent)
 *  sa-whats-changed.png — "most important since your last visit" priority panel
 *  sa-bill-detail.png   — A9349 bill page (AI Analysis + momentum forecast)
 *  sa-portfolio.png     — Energy Bills table + Create 360 View
 *  sa-ai-chat.png       — AI agent chat panel crop (skills `/` input visible)
 * All demo data (verify before publish). 16:9-ish; CaseImage handles sizing.
 */
export default function StateAffairs() {
  return (
    <article>
      <CaseNav sections={sections} />
      {/* Drop the marketing hero into public/work/sa-hero-raw.png and I'll crop the text overlay out → sa-hero.png */}
      <CaseHero
        src="/work/sa-hero.png"
        alt="A policy professional reviewing the State Affairs intelligence dashboard on a laptop"
      />
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

      <Section id="context" kicker="Context" title="High stakes, dense data, skeptical buyers">
        <p>
          State-level policy moves fast and the people tracking it — corporate policy
          teams, trade associations — drown in legislative text, committee schedules,
          and fragmented local reporting. State Affairs had the data and the
          journalists. It didn&apos;t have a product that turned that raw material into
          decisions, and it had never shipped AI.
        </p>
        <p>
          These were the company&apos;s first AI features, shipping mid-rebrand while
          the business converted its journalism into an enterprise platform. If
          users didn&apos;t trust the AI on first contact, there was no second chance.
        </p>
      </Section>

      <Section id="problem" kicker="The hard problem" title="Aggregation isn't insight">
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
        <CaseImage
          src="/work/sa-ai-chat.png"
          alt="State Affairs AI agent panel identifying the most advanced bills and offering to build a 360 view from them"
          caption="The AI agent: cited bill insights, then 'Would you like to build a 360 view from these bills?'"
        />
      </Section>

      <Section id="decision" kicker="The decision" title="Three robust skills — then a fourth that answers 'what changed?'">
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
        <CaseImage
          src="/work/sa-360-overview.png"
          alt="A 360° View: AI briefing, active-states map, legislative progress, attention, geographic reach, passage forecast, and top movers"
          caption="A generated 360° View — briefing, momentum, forecast, and top movers in one surface"
        />
        <CaseImage
          src="/work/sa-whats-changed.png"
          alt="What's Changed panel: the most important items since your last visit, ranked high to medium priority"
          caption="What's Changed in production: 'Here's what's most important since your last visit' — ranked, in 360° View context"
        />
      </Section>

      <Section id="craft" kicker="Craft under constraint" title="Translating legislatese, mid-rebrand">
        <p>
          The product&apos;s language had to translate government — bills, process,
          regulatory nuance — into conversational experiences. The voice and tone
          system I defined holds both audiences: credible to policy experts,
          legible to the executives they brief.
        </p>
        <CaseImage
          src="/work/sa-bill-detail.png"
          alt="Bill detail page with AI analysis, momentum score with reasoning, legislative progress, and team management panel"
          caption="Bill detail: AI analysis that cites, a momentum forecast that explains its reasoning — the voice system at work"
        />
        <CaseImage
          src="/work/sa-portfolio.png"
          alt="Bill portfolio table with AI activity insight and Create 360 View action"
          caption="Where teams live: the portfolio view, with AI insight and 360° View one click away"
        />
      </Section>

      <Section id="outcome" kicker="Outcome" title="Validated with the people who'd bet their jobs on it">
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
