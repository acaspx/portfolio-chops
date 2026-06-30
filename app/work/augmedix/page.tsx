import type { Metadata } from "next";
import { CaseLayout, CaseLead, CaseHero, Section, CaseImage, Hi, NextCase } from "@/components/CaseStudy";
import { PhoneShowcase } from "@/components/PhoneFrame";
export const metadata: Metadata = {
  title: "Augmedix · AI Clinical Documentation | Anton Castro",
  description:
    "Scaling AI clinical documentation from one product to four: +65% engagement, agentic AI shipped in four months, $139M acquisition by Commure.",
};

export default function Augmedix() {
  return (
    <article>
      <CaseHero
        src="/work/ax-mobile.png"
        alt="Augmedix Assist marketing hero: phone showing an AI-drafted clinical note, with HCA, AdventHealth, CommonSpirit, and Sutter Health logos"
        width={1920}
        height={1080}
      />
      <CaseLayout
        company="Augmedix (acquired by Commure, $139M)"
        title="Scaling AI clinical documentation from one product to four"
        meta={[
          { label: "Role", value: "Product Designer, AI & Growth" },
          { label: "Timeline", value: "Oct 2023 – Nov 2024" },
          { label: "Scope", value: "Web + mobile products, design system, agentic AI integration" },
          { label: "Outcome", value: "+65% engagement in a year; acquisition by Commure (2024)" },
        ]}
        liveSite={{
          href: "https://www.commure.com/",
          label: "Visit Commure",
          image: "https://cdn.prod.website-files.com/66b319e3933cb4cb9c43ebdc/66cb9c13447baaa8b66e7511_Commure%20-%20Open%20Graph%20Image.jpg",
        }}
      >

      <CaseLead
        hook="Scaling Augmedix's AI clinical documentation from one product to four, then through a $139M acquisition. I owned the design system, and the bet on modular over one-size-fits-all that let it scale without fragmenting."
        stats={[
          { value: "+65%", label: "engagement in a year" },
          { value: "1→4", label: "products, web and mobile" },
          { value: "$139M", label: "acquisition by Commure" },
        ]}
      />

      <Section id="context" kicker="Context" title="Clinicians were paying for AI with their evenings">
        <p>
          Healthcare systems face a worsening clinician shortage; documentation is a
          leading driver of burnout, with notes written on personal time long after
          patients leave. Augmedix&apos;s AI already drafted clinical notes, but as
          one rigid product in a market where every clinic, specialty, and
          clinician works differently.
        </p>
      </Section>

      <Section id="problem" kicker="The challenge" title="One agentic system, four purpose-built products, zero tolerance for error in healthcare">
        <p>
          Growth meant expanding from one offering to four, across web and mobile,
          emergency and primary care, without fragmenting the experience or the
          team&apos;s velocity. Research made two things clear:{" "}
          <Hi>~40% of clinicians wanted a human in the loop</Hi>, and{" "}
          <Hi>30% asked for a desktop workflow</Hi> to finish notes where they
          already lived: the EHR. We rebuilt around both. Capture on the move,
          finish at the desk, specialist support one tap away.
        </p>
        <blockquote className="border-l-2 border-accent pl-5 italic text-ink/75">
          &quot;So far the technology speeds up my workflow, but I still have to
          remember to check when the note is ready, and spend time reviewing it. I
          don&apos;t fully trust the AI to get it right.&quot;
          <footer className="mt-2 not-italic font-mono text-xs text-muted">
            M.D., HCA Health, pilot research
          </footer>
        </blockquote>
        <CaseImage
          src="/work/ax-platform.png"
          alt="Augmedix platform diagram: visit, documentation, and EHR stages"
          caption="The platform loop: visit → AI documentation → EHR, with humans in the loop"
        />
        <CaseImage
          src="/work/ax-research.png"
          alt="Research stats: 30% requested desktop workflow, ~40% preferred a human in the loop"
          caption="The research that drove both pivots"
          width={3285}
          height={1274}
        />
      </Section>

      <Section id="decision" kicker="The decision" title="A flexibility flywheel, and the system that shipped it">
        <p>
          The first product, <Hi>Augmedix Go</Hi>, launched as a pure-AI scribe.
          Then the data complicated the story: model accuracy kept improving, but
          note creation dropped and retention settled near <Hi>43%</Hi>. The
          blocker wasn&apos;t the model. It was fit: clinicians were bending their
          work to the tool instead of the other way around.
        </p>
        <p>
          Under tight deadlines, our PMs advocated a one-size-fits-all workflow,
          the clearest path to shipping. I argued the opposite, and not on empathy
          grounds alone: <Hi>rigid workflows would cap the AI itself</Hi>. My
          system mappings showed a modular alternative (templates, preferences,
          self-serve settings) where every clinician who adapted the tool
          generated the feedback the models needed to improve.
        </p>
        <p>
          The evidence came from onsite visits to HCA hospitals: clinicians
          weren&apos;t rejecting AI; they were rejecting being told how to work. We
          shipped the modular approach within the timeline we had, and it became
          the foundation the product scaled on.
        </p>
        <p>
          To make the modular approach work across the four product lines (Go,
          Assist, Live, and the MDS console), I built the web and mobile design
          system in Figma: the connective tissue that let me work across nine PMs
          and AI leads, fold a new agentic AI model into the core flow, and ship it
          in four months.
        </p>
        <p>
          The agentic model raised the design stakes. An agent that drafts a
          clinical note is making <Hi>consequential calls a clinician signs their
          name to</Hi>, so I built the interaction around review and repair, not
          automation theater: the AI drafts, the clinician
          sees what it was confident about and what it flagged, and every
          correction becomes signal the model learns from. Human-in-the-loop
          wasn&apos;t a safety toggle; it was the core interaction, because the{" "}
          <Hi>~40% who wanted a human in the loop</Hi> were right about where the
          trust had to live.
        </p>
        <PhoneShowcase
          framed={false}
          phones={[
            { src: "/work/ax-app-tracker.png", alt: "Augmedix patient visit tracker: a shift queue of patients with note status and a capture mic", step: "Capture", note: "The shift queue. One tap on the mic starts an ambient recording." },
            { src: "/work/ax-app-record.png", alt: "Live voice transcription waveform during a patient visit", step: "Listen", note: "Augmedix listens to the visit; the transcript builds in the background." },
            { src: "/work/ax-app-note.png", alt: "AI-generated clinical note with vitals, HPI, and a re-evaluation action", step: "Note", note: "Seconds later, a structured note the clinician can sign or refine." },
          ]}
          caption="The everyday loop on iOS: capture a visit and the note writes itself, intelligence at the point of conversation."
        />
        <p>
          One agentic model sat behind all of it, the <Hi>Augmedix LCM</Hi>,
          reading and writing across the mobile app, the web app, and the MDS
          console, so a correction in one surface improved every other.
        </p>
        <CaseImage
          src="/work/ax-agentic-lcm.png"
          alt="Architecture diagram: the Augmedix LCM agentic model reading and writing across the iOS app, internal web app, Augmedix web app, and MDS notebuilder"
          caption="The agentic core: one model, the Augmedix LCM, reading and writing across every surface"
          width={4096}
          height={2963}
        />
        <PhoneShowcase
          framed={false}
          phones={[
            { src: "/work/ax-app-carecues.png", alt: "AI CareCues surfacing EKG interpretation insights for clinician review", step: "Surface", note: "The AI surfaces clinical insights in context, to accept or correct." },
            { src: "/work/ax-fb-rate.png", alt: "A generated clinical note with a thumbs up or down rating control", step: "Rate", note: "Any note can be rated in one tap, the lightest possible correction." },
            { src: "/work/ax-fb-feedback.png", alt: "Structured note feedback chips: inferences, missing content, too verbose, not medically relevant", step: "Repair", note: "Structured feedback turns a correction into labeled training signal." },
          ]}
          caption="Review and repair, designed as the core interaction: every correction teaches the model."
        />
      </Section>

      <Section id="outcome" kicker="Outcome" title="+65% engagement, then an acquisition">
        <p>
          <Hi>Engagement grew 65% in a year</Hi> as the product line went from one
          offering to four, measured on notes volume, workflow completion, and
          transcription accuracy. Not vanity metrics: they proved the promise that
          turns a pilot into a workflow: capture the conversation, deliver a note
          clinicians trust into the EHR.
        </p>
        <p>
          The pilot scaled from <Hi>25 clinicians to contracts for thousands</Hi>{" "}
          across HCA and Sutter Health. In late 2024, Augmedix was{" "}
          <Hi>acquired by Commure for $139M</Hi>. The design system and product
          breadth were part of what made the platform worth buying. The modular
          principle I&apos;d argued for stopped being my position and became the
          default the four product lines were planned against.
        </p>
      </Section>

      </CaseLayout>

      <NextCase href="/work/rocket" label="Rocket · Liv, conversational AI" />
    </article>
  );
}
