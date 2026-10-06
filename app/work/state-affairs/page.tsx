import type { Metadata } from "next";
import { CaseLayout, CaseLead, CaseHero, Section, CaseImage, Hi, KeyPoints, NextCase } from "@/components/CaseStudy";
import AgentStack from "@/components/AgentStack";
import CaseVideo from "@/components/CaseVideo";
import LegislativeLadder from "@/components/LegislativeLadder";
import CaseGate from "@/components/CaseGate";

export const metadata: Metadata = {
  title: "State Affairs · Policy Intelligence AI | Anton Castro",
  description:
    "Designing State Affairs' first AI product: an agentic policy-intelligence system, a dozen custom agents across three layers, that turned dense legislative data into decisions and helped land Walmart and DoorDash.",
};

// Images: processed from Figma exports in source-images/SA images (all demo data).
export default function StateAffairs() {
  return (
    <CaseGate>
    <article>
      <CaseHero
        src="/work/sa-hero.png"
        alt="A policy professional reviewing the State Affairs intelligence dashboard on a laptop"
      />
      <CaseLayout
        tone="sage"
        company="State Affairs · Policy Intelligence"
        title="From a chatbot that answers to an agent that does the job"
        meta={[
          { label: "Role", value: "Sr. Interaction Designer (first design hire on AI), the workflow designer for the agentic system" },
          { label: "Timeline", value: "Feb 2026 – Present" },
          { label: "Scope", value: "Led 360° Views + AI Chat: the agentic system design (a dozen agents across three layers), voice & tone, interaction patterns" },
          { label: "Outcome", value: "First enterprise contracts: Walmart, DoorDash, trade associations" },
        ]}
        liveSite={{
          href: "https://pro.stateaffairs.com/ca",
          label: "Visit State Affairs Pro",
          image: "/work/sa-360-overview.png",
        }}
      >

      <CaseLead
        hook="State Affairs' first AI product, in a field where one wrong answer costs credibility in front of executives and regulators. I led the shift from a chatbot that answers questions to an agent that does the analyst's job, and it helped land the company's first enterprise contracts."
        stats={[
          { value: "0→1", label: "the company's first AI product" },
          { value: "12", label: "custom agents, 3 layers" },
          { value: "First", label: "enterprise contracts" },
        ]}
      />

      <Section id="context" kicker="Context" title="High stakes, dense data, skeptical buyers">
        <p>
          Corporate policy teams drown in legislative text, committee schedules, and
          scattered local reporting. State Affairs had the data and the journalists,
          but <Hi>nothing that turned either into a decision</Hi>, and it had never
          shipped AI. I led the two features that would: <Hi>360° Views and AI
          Chat</Hi>.
        </p>
        <CaseImage
          src="/work/sa-previous-state.png"
          alt="The previous state of 360 Views: an empty prompt box with a Generate button and four suggested prompts, marked In Testing"
          caption="Previous state: 360° Views began as an empty prompt box. The burden of knowing what to ask sat entirely with the user."
          width={2000}
          height={1104}
        />
      </Section>

      <Section id="chat-vs-agent" kicker="Chat vs. agent" title="Answering a question isn't doing the job">
        <p>
          V1 answered impressively specific queries: <em>&quot;show me every bill on
          this topic, in this state, by this legislator.&quot;</em> Testers were
          impressed, then asked the same thing every time: <Hi>&quot;so what?&quot;</Hi>{" "}
          A chatbot answers. It doesn&apos;t decide. Aggregating legislative data was
          never the product; knowing what it meant for <em>their</em> business was.
        </p>
        <p>
          So I stopped designing a better conversation and started{" "}
          <Hi>designing the job</Hi>: pull the bills, weigh what&apos;s moving, draft
          the brief, shape it to the person, end to end.
        </p>
      </Section>

      <Section id="job-not-conversation" kicker="Designing a job, not a conversation" title="Four jobs, a dozen agents, three layers">
        <p>Users never meet a chatbot. They meet four jobs:</p>
        <KeyPoints
          items={[
            <><Hi>Bill Compare</Hi>: weigh related bills against each other.</>,
            <><Hi>Create a Report</Hi>: draft an executive-ready brief.</>,
            <><Hi>Generate 360° View</Hi>: assemble the full picture on a topic or state.</>,
            <><Hi>What&apos;s Changed</Hi>: surface what moved since the last visit.</>,
          ]}
        />
        <p>
          Behind each, about <Hi>a dozen agents across three layers</Hi>: ground it,
          reason over it, shape it to the person.
        </p>
        <AgentStack />
        <p>
          The design work wasn&apos;t prompting. It was <Hi>drawing the
          boundaries</Hi>: what each layer owns, where it hands off, where it cites.
          Robust on four jobs beats shallow on forty, because in front of a
          regulator, shallow gets caught.
        </p>
      </Section>

      <Section id="builder" kicker="How it was built" title="A deterministic builder became the training set">
        <p>
          The 360° View didn&apos;t start as a model. It started as a{" "}
          <Hi>deterministic builder</Hi>: a guided flow that captured intent, the
          states, the date range, the position, the reason, and showed users exactly
          what their query would return before it generated anything. Users got a
          legible way to refine. We got <Hi>labeled intent at scale</Hi>.
        </p>
        <CaseImage
          src="/work/sa-builder-entry.png"
          alt="State Affairs bills page: the entry point where a user's intent starts as a structured, trackable query"
          caption="The entry point: intent starts as a structured query on the bills page"
          width={1600}
          height={1091}
        />
        <CaseImage
          src="/work/sa-builder-review.png"
          alt="The deterministic 360° View builder confirming scope, states, date range, position, and reason before generating"
          caption="The builder confirms every parameter before generating, so intent is explicit and easy to label"
          width={1600}
          height={1091}
        />
        <p>
          We fine-tuned on the hottest queries across six personas and four priority
          jobs. The builder that captured intent became the <Hi>training set for the
          agent that acts on it</Hi>.
        </p>
      </Section>

      <Section id="prioritize" kicker="Prioritizing the signal" title="Eight stages in, one signal out">
        <p>
          A bill moves through eight stages, introduced to enacted, and most
          of that motion is noise. The value is knowing <Hi>which bills, at which
          stage, matter to you</Hi>. So we scored every stage for momentum and
          surfaced it in AI Chat and the 360° View, the same pointed way whether you
          track <Hi>one state or all fifty</Hi>.
        </p>
        <LegislativeLadder />
      </Section>

      <Section id="expose-process" kicker="Expose process, not just output" title="Make the work legible, or it won't get used">
        <p>
          An answer you can&apos;t trace is useless in a legislative fight. So the
          system shows its work: <Hi>every claim cites its source</Hi>. The agent
          doesn&apos;t ask to be trusted. It earns it, one citation at a time.
        </p>
        <CaseImage
          src="/work/sa-ai-chat.png"
          alt="AI Chat expanded: policy intelligence on demand, with cited answers over legislative data"
          caption="AI Chat: every claim cited back to the source, so an analyst can verify before they brief"
        />
      </Section>

      <Section id="humans-steer" kicker="Humans steer, agents execute" title="Proactive, never on autopilot">
        <p>
          The agents run on their own, retrieving, scoring, drafting, and monitoring,
          but the human re-enters at every decision.
        </p>
        <KeyPoints
          items={[
            <><Hi>The agent proposes.</Hi> What&apos;s Changed surfaces the top five things that moved since your last visit.</>,
            <><Hi>The analyst disposes.</Hi> One click drops you on the exact data point behind an update, so you verify the source before you brief.</>,
          ]}
        />
        <CaseImage
          src="/work/sa-whats-changed.png"
          alt="What's Changed panel: the most important items since your last visit, ranked high to medium priority, each clickable"
          caption="What's Changed: the agent surfaces what moved; one click verifies it against the source"
        />
        <CaseImage
          src="/work/sa-360-overview.png"
          alt="AI Chat generating a 360° View: briefing, active-states map, momentum and forecast in one surface"
          caption="Generate 360° View: a click on any update routes the analyst to that exact data point"
        />
      </Section>

      <Section id="workflow-designer" kicker="My role" title="Encoding an expert's process as a design act">
        <p>
          A great policy analyst has a process: what to check, how to weigh momentum,
          how to brief an executive without burying the point. My job was to{" "}
          <Hi>encode that process into the system</Hi>, in a voice credible to policy
          experts and legible to the executives they brief.
        </p>
        <p>
          As the <Hi>first design hire on AI</Hi>, those calls outlived the features.
          The layer boundaries, the cite-everything rule, and the steer-and-execute
          model are now <Hi>how State Affairs ships AI</Hi>.
        </p>
      </Section>

      <Section id="outcome" kicker="Outcome" title="Validated with the people who'd bet their jobs on it">
        <p>
          We piloted with policy experts at{" "}
          <Hi>Intuit, DoorDash, Walmart, and Mastercard</Hi>, testing not just whether
          each job worked but how each persona would actually <em>ask</em> for it.
          That co-design turned pilots into adoption, and adoption into{" "}
          <Hi>State Affairs&apos; first enterprise contracts</Hi>.
        </p>
        <CaseImage
          src="/work/sa-report.png"
          alt="Draft bill report generated by the Create a Report job"
          caption="Create a Report, validated: executive-ready output drafted by the system"
        />
        <p>
          What I&apos;d build next: the agent as a <Hi>standing partner, not a feature
          you open</Hi>. Assignees, positions, and priorities already live on the bill.
          An agent that reads that shared context, who owns what and what the account
          already decided, could be queried from anywhere in the platform and answer
          for the team rather than the session, until the system{" "}
          <Hi>shapes itself to each org</Hi>.
        </p>
        <CaseVideo
          src="/work/sa-collab-context.mp4"
          poster="/work/sa-collab-context-poster.jpg"
          label="Assigning a bill to teammates on the bill detail page, alongside labels, priority, and position"
          caption="Direction, not shipped: the shared context an account already builds on a bill. The next step is an agent that reads it and answers from it, anywhere in the platform."
        />
      </Section>

      </CaseLayout>

      <NextCase href="/work/augmedix" label="Augmedix · scaling AI clinical documentation" />
    </article>
    </CaseGate>
  );
}
