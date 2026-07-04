import type { Metadata } from "next";
import { CaseLayout, CaseLead, CaseHero, Section, CaseImage, Hi, NextCase } from "@/components/CaseStudy";
import RocketSystem from "@/components/RocketSystem";

export const metadata: Metadata = {
  title: "Rocket · Liv, Conversational AI | Anton Castro",
  description:
    "Founding designer on Liv, Rocket's AI assistant for millions of homeowners: −75% client onboarding time, +22% routing to lending bankers, 94% routing accuracy.",
};

export default function Rocket() {
  return (
    <article>
      <CaseHero
        src="/work/rk-hero.png"
        alt="Rocket Mortgage homepage with the Liv chat assistant open"
      />
      <CaseLayout
        tone="charcoal"
        company="Rocket"
        title="Meeting homeowners where they are: designing Liv, Rocket's conversational AI"
        meta={[
          { label: "Role", value: "Conversational AI Experience Designer (founding designer on Liv)" },
          { label: "Timeline", value: "Sep 2022 – Aug 2023" },
          { label: "Scope", value: "End-to-end conversation journey, visual voice, conversation design system (B2B2C)" },
          { label: "Outcome", value: "−75% client onboarding time · +22% routing to lending bankers · 94% routing accuracy" },
        ]}
        liveSite={{
          href: "https://www.rocketmortgage.com/",
          label: "Visit Rocket Mortgage",
          image: "https://prod.rockmedialibrary.com/api/public/content/30bf1353-downloadOriginal-D-SiteOpenGraphImage-20250623.jpg?v=7a450e50",
        }}
      >

      <CaseLead
        hook="Founding designer on Liv, Rocket's conversational AI for millions of homeowners. The whole game was trust: knowing when the AI should stop talking and hand off to a human."
        stats={[
          { value: "−75%", label: "client onboarding time" },
          { value: "+22%", label: "routing to lending bankers" },
          { value: "94%", label: "banker-rated routing accuracy" },
        ]}
      />

      <Section id="context" kicker="Context" title="A legacy industry, at the worst possible moment">
        <p>
          A mortgage is the biggest financial decision most people make, and
          buyers were facing rate spikes, economic uncertainty, and record-low
          home buying. Research showed <Hi>~32% of customers dropping off during
          onboarding</Hi>. The mandate: meet them where they are with Liv, a
          conversational assistant across Rocket&apos;s ecosystem (Homes, Mortgage,
          Loans, Money) serving <Hi>millions of homeowners</Hi>.
        </p>
      </Section>

      <Section id="parity" kicker="Meeting them where they are" title="Two ways in: the familiar form, or a conversation">
        <p>
          Meeting homeowners where they are meant not forcing a channel on them.
          Some trust the familiar web form; others would rather just say where they
          are in the process. So I designed Liv in{" "}
          <Hi>parity with Rocket&apos;s new web onboarding</Hi>: the same questions,
          the same estimated-credit math, the same next step, offered either as the
          standard flow or as a conversation with Liv. Whichever channel someone
          picks, they share the same goals and land in the same place, so the choice
          never costs them progress.
        </p>
        <CaseImage
          src="/work/rk-parity.png"
          alt="Rocket onboarding designed for parity: the same intake as a familiar web form asking when the user plans to purchase, and as a conversation with Liv sharing the same goals"
          caption="Parity by design: the same onboarding as a familiar web form, or a conversation with Liv, sharing the same goals and the same next step."
          width={1324}
          height={898}
        />
      </Section>

      <Section id="problem" kicker="The hard problem" title="A chatbot can't fake its way through a mortgage">
        <p>
          People won&apos;t hand the largest transaction of their lives to a bot
          that bluffs, and lending agents won&apos;t trust a system that sends them
          the wrong clients. The design question wasn&apos;t
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
          conversation patterns that made it scalable: Pitstop, Queueing,
          Interstitial, and Agent Intro, reusable states for pacing a conversation,
          holding context, and handing off to a human without losing it.
          Rebuilding onboarding around these patterns{" "}
          <Hi>cut client onboarding time 75%</Hi>.
        </p>
        {/* Detailed system screenshot on larger screens; a clean simplified
            version stands in on mobile where the dense diagram is unreadable. */}
        <div className="hidden md:block">
          <CaseImage
            src="/work/rk-system.png"
            alt="The end-to-end Liv system: multiple entry points feed one personalized Q&A conversation that smart-routes to the right Rocket solution"
            caption="The end-to-end journey: every entry point flows into one personalized conversation, then smart-routes to the right banker, product, or resource."
            width={2416}
            height={964}
          />
        </div>
        <div className="md:hidden">
          <RocketSystem />
        </div>
        <p>
          The craft was in the unhappy path. Liv was designed to{" "}
          <Hi>hand off on low confidence rather than guess</Hi>: when it
          wasn&apos;t sure, it stopped talking, summarized what it had, and queued a
          human instead of bluffing through a mortgage question. Each handoff
          carried the full conversation context to the banker, so the homeowner
          never restarted from zero. That is what the 94% correct-routing number
          really measures: not just who Liv routed to, but how much the human
          already knew when the conversation landed in front of them.
        </p>
        <CaseImage
          src="/work/rk-patterns.png"
          alt="Conversation design patterns: Pitstop, Queueing, Interstitial, and Agent Intro flows"
          caption="The pattern library: Pitstop, Queueing, Interstitial, Agent Intro"
        />
      </Section>

      <Section id="outcome" kicker="Outcome" title="Trusted by users, and by the bankers behind them">
        <p>
          Where Liv ran, <Hi>engagement rose 11%</Hi> and{" "}
          <Hi>routing to a lending banker increased 22%</Hi>. The number I&apos;m
          proudest of is the quietest one: <Hi>94% of loan bankers said Liv was
          routing them the correct client</Hi>. That&apos;s the human side of the loop
          trusting the AI side.
        </p>
        <p>
          What didn&apos;t go to plan: conversion stayed softer than engagement as
          rates kept buyers sidelined; no conversation design outruns market
          conditions. And bankers needed real training on how client data reached
          them. Next time I ship a human handoff, the human&apos;s onboarding gets
          designed as deliberately as the user&apos;s.
        </p>
        <CaseImage
          src="/work/rk-routing.png"
          alt="Before and after of the banker console with routing accuracy results"
          caption="Banker-side view: correct-client routing, before and after"
        />
      </Section>

      </CaseLayout>

      <NextCase href="/work/custoria" label="Custoria Labs · the digital vault" />
    </article>
  );
}
