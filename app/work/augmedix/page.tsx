import type { Metadata } from "next";
import { CaseHeader, CaseHero, Section, CaseImage, Hi, NextCase } from "@/components/CaseStudy";
import CaseNav from "@/components/CaseNav";

const sections = [
  { id: "context", label: "Context" },
  { id: "problem", label: "The hard problem" },
  { id: "decision", label: "The decision" },
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
      <CaseHero
        src="/work/ax-mobile.png"
        alt="Augmedix Assist marketing hero: phone showing an AI-drafted clinical note, with HCA, AdventHealth, CommonSpirit, and Sutter Health logos"
      />
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
          team&apos;s velocity. Research made two things clear:{" "}
          <Hi>~40% of clinicians wanted a human in the loop</Hi>, and{" "}
          <Hi>30% asked for a desktop workflow</Hi> to finish notes where they
          already lived — the EHR. We rebuilt around both: capture on the move,
          finish at the desk, specialist support one tap away.
        </p>
        <CaseImage
          src="/work/ax-platform.png"
          alt="Augmedix platform diagram: visit, documentation, and EHR stages"
          caption="The platform loop: visit → AI documentation → EHR, with humans in the loop"
        />
        <CaseImage
          src="/work/ax-research.png"
          alt="Research stats: 30% requested desktop workflow, ~40% preferred a human in the loop"
          caption="The research that drove both pivots"
        />
      </Section>

      <Section id="decision" kicker="The decision" title="One-size-fits-all vs. the flexibility flywheel">
        <p>
          Under tight deadlines, our PMs advocated a one-size-fits-all workflow —
          the clearest path to shipping. I argued the opposite, and not on empathy
          grounds alone: <Hi>rigid workflows would cap the AI itself</Hi>. My
          system mappings showed a modular alternative — templates, preferences,
          self-serve settings — where every clinician who adapted the tool
          generated the feedback the models needed to improve.
        </p>
        <p>
          The evidence came from onsite visits to HCA hospitals: clinicians
          weren&apos;t rejecting AI — they were rejecting being told how to work. We
          shipped the modular approach within the timeline we had, and it became
          the foundation the product scaled on.
        </p>
      </Section>

      <Section id="system" kicker="System" title="A design system that let nine PMs ship without breaking the product">
        <p>
          I built the web and mobile design system in Figma that kept four fast-moving
          product lines consistent — the connective tissue that let me work across
          nine PMs and AI leads, fold a new agentic AI model into the core flow, and
          ship it in four months.
        </p>
        <CaseImage
          src="/work/ax-design-system.png"
          alt="Internal tooling and design system components"
          caption="System work: components and internal tooling keeping four product lines consistent"
        />
        <CaseImage
          src="/work/ax-web-app.png"
          alt="Augmedix web app dashboard"
          caption="The web app: where clinicians finalize notes into the EHR"
        />
      </Section>

      <Section id="outcome" kicker="Outcome" title="+65% engagement, then an acquisition">
        <p>
          <Hi>Engagement grew 65% in a year</Hi> as the product line went from one
          offering to four — measured on notes volume, workflow completion, and
          transcription accuracy. Not vanity metrics: they proved the promise that
          turns a pilot into a workflow — capture the conversation, deliver a note
          clinicians trust into the EHR.
        </p>
        <p>
          The pilot scaled from <Hi>25 clinicians to contracts for thousands</Hi>{" "}
          across HCA and Sutter Health. In late 2024, Augmedix was{" "}
          <Hi>acquired by Commure for $139M</Hi> — the design system and product
          breadth were part of what made the platform worth buying.
        </p>
      </Section>

      <NextCase href="/work/rocket" label="Rocket — Liv, conversational AI" />
    </article>
  );
}
