import type { Metadata } from "next";
import { CaseHeader, CaseHero, Section, CaseImage, NextCase } from "@/components/CaseStudy";
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
          team&apos;s velocity. And clinicians made one thing clear in research: they
          wanted AI with humans reachable in the loop, not a black box — in our
          research, <strong>~40% preferred keeping a human in the loop</strong>, and{" "}
          <strong>30% asked for a desktop workflow</strong> to finalize notes where
          they already lived: the EHR. We rebuilt the product around both — generated
          notes a medical documentation specialist could access and refine with the
          clinician always in control, and a web app built 1:1 with mobile so
          clinicians could capture on the move and finish at their desk.
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
          Under tight deadlines and real AI constraints, our PMs advocated a
          one-size-fits-all workflow — the clearest path to shipping. I argued the
          opposite, and not on empathy grounds alone: rigid workflows would cap the
          AI itself. I brought visual examples and system mappings showing a modular
          alternative — templates, preferences, self-serve settings — where feedback
          intake was built into the product, so every clinician who adapted the tool
          to their workflow generated the engagement and corrections the models
          needed to improve.
        </p>
        <p>
          The evidence came from quantitative feedback and onsite visits to HCA
          hospitals: clinicians weren&apos;t rejecting AI — they were rejecting being
          told how to work. Flexible, self-serve systems meant easier adoption in
          their specific workflows, which meant sustained engagement, which meant
          better LLM output as we scaled.
        </p>
        <p>
          The team shipped the modular approach within the timeline and engineering
          resources we had — and it became the foundation the product scaled on.
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
          Engagement grew 65% in a year as the product line expanded from one
          offering to four — measured across the three drivers we&apos;d defined as
          success: <strong>notes volume</strong>, <strong>workflow completion
          efficiency</strong>, and <strong>visit transcription accuracy</strong>.
          Those weren&apos;t vanity metrics; they validated the core promise — capture
          the conversation, deliver a note clinicians trust into the EHR — which is
          what turns a pilot into a workflow.
        </p>
        <p>
          The pilot scaled from 25 clinicians to contracts for thousands across HCA
          and Sutter Health. In late 2024, Augmedix was acquired by Commure for
          $139M — the design system and product breadth were part of what made the
          platform worth buying.
        </p>
      </Section>

      <NextCase href="/work/rocket" label="Rocket — Liv, conversational AI" />
    </article>
  );
}
