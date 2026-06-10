import type { Metadata } from "next";
import { CaseHeader, Section, Todo, ImageSlot, NextCase } from "@/components/CaseStudy";
import CaseNav from "@/components/CaseNav";

const sections = [
  { id: "context", label: "Context" },
  { id: "problem", label: "The hard problem" },
  { id: "system", label: "The system" },
  { id: "outcome", label: "Outcome" },
];

export const metadata: Metadata = {
  title: "Augmedix — AI Clinical Documentation | Anton Castro",
  description:
    "Scaling AI clinical documentation from one product to four: +65% engagement, agentic AI shipped in four months, $139M acquisition by Commure.",
};

export default function Augmedix() {
  return (
    <article>
      <CaseNav sections={sections} />
      <CaseHeader
        company="Augmedix (acquired by Commure, $139M)"
        title="Scaling AI clinical documentation from one product to four"
        meta={[
          { label: "Role", value: "Product Designer, AI & Growth" },
          { label: "Timeline", value: "Oct 2023 – Nov 2024" },
          { label: "Scope", value: "Web + mobile products, design system, agentic AI integration" },
          { label: "Outcome", value: "+65% engagement in a year; acquisition by Commure (2024)" },
        ]}
      />

      <Section id="context" kicker="Context" title="Clinicians were paying for AI with their evenings">
        <p>
          Healthcare systems face a worsening clinician shortage; documentation is a
          leading driver of burnout, with notes written on personal time long after
          patients leave. Augmedix&apos;s AI drafted clinical notes — but as a single
          product with a single rigid workflow, in a market where every clinic,
          specialty, and clinician works differently.
        </p>
      </Section>

      <Section id="problem" kicker="The hard problem" title="One AI, four products, zero tolerance for error">
        <p>
          Growth meant expanding from one offering to four — across web and mobile,
          emergency and primary care — without fragmenting the experience or the
          team&apos;s velocity. And clinicians made one thing clear in research: they
          wanted AI with humans reachable in the loop, not a black box. We rebuilt
          the product around that — generated notes a medical documentation
          specialist could access and refine, with the clinician always in control
          of the final note.
        </p>
        <ImageSlot caption="Workflow: clinician ↔ AI ↔ documentation specialist loop" />
        <Todo>
          One concrete design decision with a tradeoff (e.g., where you fought rigid
          guardrails vs. personalization — templates, preferences — and the
          adoption result).
        </Todo>
      </Section>

      <Section id="system" kicker="System" title="A design system that let nine PMs ship without breaking the product">
        <p>
          I built the web and mobile design system in Figma that kept four fast-moving
          product lines consistent — the connective tissue that let me work across
          nine PMs and AI leads, fold a new agentic AI model into the core flow, and
          ship it in four months.
        </p>
        <ImageSlot caption="Design system: core components across web + mobile" />
        <ImageSlot caption="Agentic AI integration in the core documentation flow" />
      </Section>

      <Section id="outcome" kicker="Outcome" title="+65% engagement, then an acquisition">
        <p>
          Engagement grew 65% in a year as the product line expanded from one
          offering to four. In late 2024, Augmedix was acquired by Commure for
          $139M — the design system and product breadth were part of what made the
          platform worth buying.
        </p>
        <Todo>
          Define the engagement metric in one sentence (what was measured, over what
          population) — this is what separates a credible number from a vanity one.
        </Todo>
      </Section>

      <NextCase href="/work/state-affairs" label="State Affairs — policy intelligence AI" />
    </article>
  );
}
