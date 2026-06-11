import type { Metadata } from "next";
import { CaseHeader, CaseHero, Section, CaseImage, Hi, NextCase } from "@/components/CaseStudy";
import CaseNav from "@/components/CaseNav";

const sections = [
  { id: "context", label: "Context" },
  { id: "problem", label: "The hard problem" },
  { id: "decision", label: "The decision" },
  { id: "outcome", label: "Outcome" },
];

export const metadata: Metadata = {
  title: "State Affairs · Policy Intelligence AI | Anton Castro",
  description:
    "Designing State Affairs' first AI product: an enterprise policy-intelligence platform that helped land Walmart and DoorDash as customers.",
};

// Images: processed from Figma exports in source-images/SA images (all demo data).
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
        company="State Affairs · Policy Intelligence"
        title="Turning dense policy data into decisions enterprise teams act on"
        meta={[
          { label: "Role", value: "Sr. Interaction Designer (first design hire on AI)" },
          { label: "Timeline", value: "Feb 2026 – Present" },
          { label: "Scope", value: "Led 360° Views + AI Chat, the company's first AI features. System architecture, voice & tone, interaction patterns" },
          { label: "Outcome", value: "First enterprise contracts: Walmart, DoorDash, trade associations" },
        ]}
      />

      <Section id="context" kicker="Context" title="High stakes, dense data, skeptical buyers">
        <p>
          Corporate policy teams drown in legislative text, committee schedules,
          and fragmented local reporting. State Affairs had the data and the
          journalists, but no product turning raw material into decisions, and it
          had never shipped AI. I led <Hi>360° Views and AI Chat, the company&apos;s
          first AI features</Hi>, shipping mid-rebrand. If users didn&apos;t trust the
          AI on first contact, there was no second chance.
        </p>
      </Section>

      <Section id="problem" kicker="The hard problem" title="Aggregation isn't insight">
        <p>
          V1 could answer impressively specific queries: <em>&quot;show me all the
          bills on this topic, in this state, by this legislator.&quot;</em> Pilot
          testers were impressed, and kept asking the same thing:{" "}
          <Hi>&quot;so what?&quot;</Hi> Aggregating legislative data wasn&apos;t the
          product. Knowing what it meant for <em>their</em> business was.
        </p>
        <p>
          A shallow answer here doesn&apos;t just disappoint: policy teams act on it
          in front of executives and regulators. So instead of expanding query
          coverage, I argued for going deeper on fewer things:{" "}
          <Hi>citations on every claim</Hi>, and personalization that closes the
          so-what gap.
        </p>
        <CaseImage
          src="/work/sa-ai-chat.png"
          alt="AI Chat expanded: policy intelligence on demand, with cited answers over legislative data"
          caption="AI Chat: policy intelligence on demand, every claim cited back to the source"
        />
      </Section>

      <Section id="decision" kicker="The decision" title="Three robust skills, then a fourth that answers 'what changed?'">
        <p>
          With our AI/ML product and engineering leads, I focused V1 on three
          skills we could make genuinely robust: Bill Compare, Create a Report,
          and Generate 360° View, where AI Chat builds a personalized 360° View
          around each user&apos;s needs. Get it right on the first try, and users
          trust the platform.
        </p>
        <p>
          As 360° Views matured, I made the call to add a fourth skill:{" "}
          <Hi>What&apos;s Changed</Hi>: the top five things that moved since your
          last visit. It turns a data product into a briefing that starts where
          you left off.
        </p>
        <CaseImage
          src="/work/sa-skills.png"
          alt="AI Chat with the expanded skills menu open"
          caption="The skills system: focused, invocable, robust"
        />
        <CaseImage
          src="/work/sa-360-overview.png"
          alt="AI Chat generating a 360° View: briefing, active-states map, momentum and forecast in one surface"
          caption="Generate 360° View: the AI builds the briefing surface around the user's needs"
        />
        <CaseImage
          src="/work/sa-whats-changed.png"
          alt="What's Changed panel: the most important items since your last visit, ranked high to medium priority"
          caption="What's Changed in production: 'Here's what's most important since your last visit', ranked, in 360° View context"
        />
        <p>
          Underneath the skills sat a voice and tone system that translates
          government (bills, process, regulatory nuance) for two audiences at
          once: credible to policy experts, legible to the executives they brief.
        </p>
        <CaseImage
          src="/work/sa-bills.png"
          alt="Bills grouped by AI momentum score, with tracking and assignment"
          caption="Bills grouped by AI momentum: scored, tracked, and assigned, with the reasoning visible"
        />
      </Section>

      <Section id="outcome" kicker="Outcome" title="Validated with the people who'd bet their jobs on it">
        <p>
          We piloted the four skills with policy experts at{" "}
          <Hi>Intuit, DoorDash, Walmart, and Mastercard</Hi>, co-validating not
          just whether each skill worked, but how each persona would actually{" "}
          <em>ask</em> for it. That co-design turned pilots into adoption, and
          adoption into <Hi>State Affairs&apos; first enterprise contracts</Hi>.
        </p>
        <CaseImage
          src="/work/sa-report.png"
          alt="Draft bill report generated by the Create a Report skill"
          caption="Create a Report, validated: executive-ready output drafted by the skill"
        />
        <p>
          What I&apos;d change in V2: make the skills&apos; <em>output</em> as adaptive as
          their input: notifications, view depth, all adjustable in a couple of
          chat queries, until the platform is modular to each org and user.
        </p>
      </Section>

      <NextCase href="/work/augmedix" label="Augmedix · scaling AI clinical documentation" />
    </article>
  );
}
