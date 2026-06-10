# Anton Castro — Portfolio

Personal portfolio for Anton Castro (Sr. Product Designer / Design Engineer, SF).
Career goal: Sr/Staff Product Designer or Design Engineer roles now; Lead/Manager within 3 years.
Benchmark: https://www.korolev.uk/ — typography-first, motion-precise, clearly hand-coded.

## Repo

Remote: `github.com/acaspx/portfolio-chops` — this is the only repo for the portfolio code. Do NOT push portfolio code to `acaspx/CLabs` (separate project; it's only *featured* in the SideProjects section).

## Stack

Next.js 15 (App Router, static output) · Tailwind CSS 4 (`@theme` tokens in `app/globals.css`) · Motion (`motion/react`) · TypeScript strict.

- `npm run dev` / `npm run build`. The production build must always pass.
- Fonts: system stack now; optional Inter + JetBrains Mono via next/font (see README).

## Structure

- `app/page.tsx` — home: Hero → Selected work → How I work → Contact
- `app/work/state-affairs/page.tsx` — flagship case study (0→1 enterprise AI)
- `app/work/augmedix/page.tsx` — merged Augmedix platform story
- `components/CaseStudy.tsx` — CaseHeader / Section / Todo / ImageSlot / NextCase primitives
- `components/Reveal.tsx` — scroll-reveal wrapper; `Hero.tsx`, `WorkCard.tsx` (metric chips), `Nav.tsx` (reading-progress bar on /work/*)
- `components/Marquee.tsx` (company strip), `SideProjects.tsx` (GitHub-linked prototypes — TODO descriptions), `Experience.tsx` (canonical resume timeline)

Reference sites: korolev.uk (motion restraint), alexnguyen.online (metric chips, side-projects-as-proof, experience timeline).

## Content rules (critical — credibility)

1. **Canonical facts only.** Dates and metrics must match Anton's resume exactly:
   - State Affairs: Sr. Interaction Designer, Feb 2026–Present. Outcome: first enterprise contracts (Walmart, DoorDash, trade associations).
   - Augmedix: Oct 2023–Nov 2024. +65% engagement in a year; 1→4 offerings; agentic AI shipped in 4 months; $139M acquisition by Commure (2024).
   - Rocket: Sep 2022–Aug 2023. −75% client onboarding time. (Case study is "coming soon" — do not publish until every sentence is verified true and about Rocket.)
   - Never reuse a metric across companies. Never extend a date range.
2. **`Todo` and `ImageSlot` components mark content only Anton can supply** (decision stories, metric definitions, images). Don't invent this content — ask Anton, then replace.
3. **Confidentiality:** confirm client names (Walmart, DoorDash, HCA) are cleared before anything goes live. No model-stack disclosure (e.g., specific LLM vendors at employers).
4. Voice: first person, active, plain. No "let er rip" energy, no passive "product pivoted." What did *I* decide and why.

## Motion principles

Few, precise moves (the benchmark wins on restraint): once-only scroll reveals, easing `[0.22, 1, 0.36, 1]`, springs for continuous values. Every animation must respect `prefers-reduced-motion` (use `useReducedMotion()` like existing components). Keep keyboard focus states and semantic HTML — design engineers will view-source this site.

## Roadmap

1. Fill all `Todo` blocks via interview with Anton; replace `ImageSlot` with `next/image` artifacts
2. One interactive in-code demo embedded in a case study (design-engineer proof)
3. Rocket case study (truthful rebuild), then remove `comingSoon`
4. Custom domain + deploy on Vercel; OG image; analytics (privacy-light, e.g. Plausible)
5. Optional: dark mode, /resume page
