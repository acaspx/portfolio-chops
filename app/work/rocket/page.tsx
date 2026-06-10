import type { Metadata } from "next";
import { CaseHeader, Section, CaseImage, NextCase } from "@/components/CaseStudy";
import CaseNav from "@/components/CaseNav";

export const metadata: Metadata = {
  title: "Rocket — Liv, Conversational AI | Anton Castro",
  description:
    "Founding designer on Liv, Rocket's AI assistant for millions of homeowners: −75% client onboarding time, +22% routing to lending bankers, 94% routing accuracy.",
};

const sections = [
  { id: "context", label: "Context" },
  { id: "problem", label: "The hard problem" },
  { id: "system", label: "The system" },
  { id: "outcome", label: "Outcome" },
];

export default function Rocket() {
  return (
    <article>
      <CaseNav sections={sections} />
      <CaseHeader
        company="Rocket"
        title="Meeting homeowners where they are — designing Liv, Rocket's conversational AI"
        meta={[
          { label: "Role", value: "Conversational AI Experience Designer (founding designer on Liv)" },
          { label: "Timeline", value: "Sep 2022 – Aug 2023" },
          { label: "Scope", value: "End-to-end conversation journey, visual voice, conversation design system (B2B2C)" },
          { label: "Outcome", value: "−75% client onboarding time · +22% routing to lending bankers · 94% routing accuracy" },
        ]}
      />

      <Section id="context" kicker="Context" title="A legacy industry, at the worst possible moment">
        <p>
          A mortgage is the biggest financial decision most people ever make — and
          buyers were facing a market whiplashed by the pandemic: rate spikes,
          economic uncertainty, record-low home buying. Rocket&apos;s research showed{" "}
          <strong>~32% of customers dropping off during onboarding</strong>. The
          mandate: meet customers where they are with Liv, a conversational
          assistant embodying Rocket&apos;s brand across the ecosystem — Homes,
          Mortgage, Loans, and Money — serving millions of homeowners, B2B2C.
        </p>
        <CaseImage
          src="/work/rk-hero.png"
          alt="Rocket Mortgage homepage with the Liv chat assistant open"
          caption="Liv on Rocket's front door — trust, in a legacy industry"
        />
      </Section>

      <Section id="problem" kicker="The hard problem" title="A chatbot can't fake its way through a mortgage">
        <p>
          Trust was the entire game. People won&apos;t hand the largest transaction of
          their lives to a bot that bluffs — and lending agents won&apos;t trust a
          system that sends them the wrong clients. The design question wasn&apos;t
          &quot;what can Liv say?&quot; but <em>when should Liv stop talking</em>: how the
          assistant collects context upfront, when it hands off to a human banker,
          and how it does both in Rocket&apos;s voice without pretending to be a person.
        </p>
        <CaseImage
          src="/work/rk-disaster.png"
          alt="Liv guiding a homeowner through natural disaster recovery resources after Hurricane Ian"
          caption="Beyond mortgage: Liv guiding Hurricane Ian recovery through FEMA and SBA resources"
        />
      </Section>

      <Section id="system" kicker="The system" title="A conversation design system, not a script">
        <p>
          I owned Liv&apos;s end-to-end journey and visual voice, and built the
          conversation patterns that made it scalable: <strong>Pitstop</strong>,{" "}
          <strong>Queueing</strong>, <strong>Interstitial</strong>, and{" "}
          <strong>Agent Intro</strong> — reusable states for pacing a conversation,
          holding context while users wait, and handing off to a human with the
          context intact. Rethinking the onboarding conversation flow around these
          patterns cut client onboarding time 75%.
        </p>
        <CaseImage
          src="/work/rk-patterns.png"
          alt="Conversation design patterns: Pitstop, Queueing, Interstitial, and Agent Intro flows"
          caption="The pattern library: Pitstop, Queueing, Interstitial, Agent Intro"
        />
      </Section>

      <Section id="outcome" kicker="Outcome" title="Trusted by users — and by the bankers behind them">
        <p>
          Where Liv was in production, engagement with Rocket rose{" "}
          <strong>11% across platforms</strong>, and routing to a lending banker or
          agent increased <strong>22%</strong>. The number I&apos;m proudest of is the
          quietest one: <strong>94% of loan bankers reported Liv was routing them
          the correct client</strong>, categorized from chat inputs — the human side
          of the loop trusting the AI side.
        </p>
        <p>
          What didn&apos;t go to plan: conversion stayed softer than engagement, as
          rates kept buyers on the sidelines — a reminder that no conversation
          design outruns market conditions. And bankers needed real training on how
          client data flowed into their workflow; the next time I ship a human
          handoff, the human&apos;s onboarding gets designed as deliberately as the
          user&apos;s.
        </p>
        <CaseImage
          src="/work/rk-routing.png"
          alt="Before and after of the banker console with routing accuracy results"
          caption="Banker-side view: correct-client routing, before and after"
        />
      </Section>

      <NextCase href="/work/state-affairs" label="State Affairs — policy intelligence AI" />
    </article>
  );
}
