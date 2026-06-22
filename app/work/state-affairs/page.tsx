import type { Metadata } from "next";
import { CaseLayout, CaseLead, CaseHero, Section, CaseImage, Hi, NextCase } from "@/components/CaseStudy";
import AgentStack from "@/components/AgentStack";

export const metadata: Metadata = {
  title: "State Affairs · Policy Intelligence AI | Anton Castro",
  description:
    "Designing State Affairs' first AI product: an agentic policy-intelligence system, a dozen custom agents across three layers, that turned dense legislative data into decisions and helped land Walmart and DoorDash.",
};

// Images: processed from Figma exports in source-images/SA images (all demo data).
export default function StateAffairs() {
  return (
    <article>
      <CaseHero
        src="/work/sa-hero.png"
        alt="A policy professional reviewing the State Affairs intelligence dashboard on a laptop"
      />
      <CaseLayout
        company="State Affairs · Policy Intelligence"
        title="From a chatbot that answers to an agent that does the job"
        meta={[
          { label: "Role", value: "Sr. Interaction Designer (first design hire on AI), the workflow designer for the agentic system" },
          { label: "Timeline", value: "Feb 2026 – Present" },
          { label: "Scope", value: "Led 360° Views + AI Chat: the agentic system design (a dozen agents across three layers), voice & tone, interaction patterns" },
          { label: "Outcome", value: "First enterprise contracts: Walmart, DoorDash, trade associations" },
        ]}
      >

      <CaseLead
        hook="State Affairs' first AI product, in a domain where a wrong answer costs credibility in front of executives and regulators. I led the shift from a chatbot that answers questions to an agentic system that does the analyst's job, and helped land the company's first enterprise contracts."
        stats={[
          { value: "0→1", label: "the company's first AI product" },
          { value: "12", label: "custom agents, 3 layers" },
          { value: "First", label: "enterprise contracts" },
        ]}
      />

      <Section id="context" kicker="Context" title="High stakes, dense data, skeptical buyers">
        <p>
          Corporate policy teams drown in legislative text, committee schedules,
          and fragmented local reporting. State Affairs had the data and the
          journalists but no product turning it into decisions, and had never
          shipped AI. I led <Hi>360° Views and AI Chat</Hi> through the rebrand. If
          users didn&apos;t trust the AI on first contact, there was no second chance.
        </p>
      </Section>

      <Section id="chat-vs-agent" kicker="Chat vs. agent" title="Answering a question is not doing the job">
        <p>
          V1 could answer impressively specific queries: <em>&quot;show me all the
          bills on this topic, in this state, by this legislator.&quot;</em> Pilot
          testers were impressed, and kept asking the same thing:{" "}
          <Hi>&quot;so what?&quot;</Hi> A chatbot answers. It doesn&apos;t decide. And
          aggregating legislative data wasn&apos;t the product: knowing what it meant
          for <em>their</em> business was.
        </p>
        <p>
          A shallow answer here doesn&apos;t just disappoint: policy teams act on it
          in front of executives and regulators. So I stopped designing a better
          conversation and started <Hi>designing the job</Hi>: a system that pulls
          the bills, weighs what is moving, drafts the brief, and shapes it to the
          person, end to end.
        </p>
      </Section>

      <Section id="job-not-conversation" kicker="Designing a job, not a conversation" title="Four jobs, a dozen agents, three layers">
        <p>
          The user never meets a chatbot. They meet four jobs: <Hi>Bill Compare,
          Create a Report, Generate 360° View, and What&apos;s Changed</Hi>. Behind
          each one, about a dozen custom agents run the tool calls that assemble
          and personalize the answer, organized into the three-layer stack the
          best agentic teams build on today: ground it, reason over it, shape it to
          the person.
        </p>
        <AgentStack />
        <p>
          The design work wasn&apos;t prompts. It was deciding <Hi>what each layer
          owns</Hi>: the retrieval agent grounds and cites, the momentum-scoring
          and drafting agents reason and assemble, the personalization agent voices
          it for each user. Robust on a few jobs beats shallow on many, because in
          this arena you only get one first try.
        </p>
      </Section>

      <Section id="expose-process" kicker="Expose process, not just output" title="Make the work legible, or it won't get used">
        <p>
          An autonomous answer you can&apos;t trace is unusable in a legislative and
          political context. So the system shows its work, not just its conclusion:{" "}
          <Hi>every claim is cited back to its source</Hi>. The agent doesn&apos;t ask
          to be trusted; it earns it by making its reasoning legible.
        </p>
        <CaseImage
          src="/work/sa-ai-chat.png"
          alt="AI Chat expanded: policy intelligence on demand, with cited answers over legislative data"
          caption="AI Chat: every claim cited back to the source, so an analyst can verify before they brief"
        />
      </Section>

      <Section id="humans-steer" kicker="Humans steer, agents execute" title="Proactive, never on autopilot">
        <p>
          The agents run on their own, retrieving, scoring momentum, drafting, and
          monitoring, but the human re-enters at every decision.{" "}
          <Hi>What&apos;s Changed</Hi> proactively surfaces the top five things that
          moved since your last visit. The agent proposes; the analyst disposes.
        </p>
        <p>
          The human-in-the-loop is a single click: tap any update and the{" "}
          <Hi>360° View routes you straight to that insight</Hi>, the underlying
          data point behind it, so a person verifies the source before a decision
          gets made, in real time. Proactive enough to be useful, accountable
          enough to be trusted.
        </p>
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
          A great policy analyst has a process: what to check, how to weigh
          momentum, how to brief an executive without burying the point. My job was
          to <Hi>encode that process into the system</Hi>: what each agent owns,
          where the human steers and where the agents execute, and a voice and tone
          that translates government for two audiences at once, credible to policy
          experts and legible to the executives they brief.
        </p>
        <p>
          Because this was the company&apos;s first AI product, those decisions
          became the template. The layer boundaries, the cite-everything standard,
          and the steer-and-execute model are now how State Affairs ships AI, not
          just how these two features shipped. As the first design hire on AI, I was{" "}
          <Hi>defining the bar the next features get held to</Hi>.
        </p>
      </Section>

      <Section id="outcome" kicker="Outcome" title="Validated with the people who'd bet their jobs on it">
        <p>
          We piloted the jobs with policy experts at{" "}
          <Hi>Intuit, DoorDash, Walmart, and Mastercard</Hi>, co-validating not
          just whether each one worked, but how each persona would actually{" "}
          <em>ask</em> for it. That co-design turned pilots into adoption, and
          adoption into <Hi>State Affairs&apos; first enterprise contracts</Hi>.
        </p>
        <p>
          The result is an experience that feels{" "}
          <Hi>personalized, proactive, and relevant</Hi> in a context as critical
          as the legislative and political arena, the bar an agentic product has to
          clear before anyone bets a decision on it.
        </p>
        <CaseImage
          src="/work/sa-report.png"
          alt="Draft bill report generated by the Create a Report job"
          caption="Create a Report, validated: executive-ready output drafted by the system"
        />
        <p>
          What I&apos;d build next: make the agents&apos; <em>output</em> as adaptive as
          their input, notifications and view depth tunable in a couple of chat
          queries, until the system is modular to each org and user.
        </p>
      </Section>

      </CaseLayout>

      <NextCase href="/work/augmedix" label="Augmedix · scaling AI clinical documentation" />
    </article>
  );
}
