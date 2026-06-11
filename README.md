# Anton Castro — Portfolio (coded)

Next.js 15 + Tailwind CSS 4 + Motion (framer-motion successor). Fully static output, verified production build.

## Run it

```bash
cd portfolio
rm -rf node_modules   # was installed on Linux; reinstall for your Mac
npm install
npm run dev           # http://localhost:3000
```

## Deploy (Vercel, free)

```bash
npx vercel
```

Or push to GitHub and import at vercel.com. Then point your custom domain at it.

## Structure

- `app/page.tsx` — home: hero, selected work, how-I-work, contact
- `app/work/state-affairs/page.tsx` — flagship case study
- `app/work/augmedix/page.tsx` — merged Augmedix platform story
- `components/` — Nav (reading-progress bar on case studies), Hero (staggered word reveal), WorkCard (hover micro-interactions), Reveal (scroll reveals), CaseStudy (header/section/placeholder primitives)

## Your TODOs (search the code for `Todo` / `ImageSlot`)

Blue dashed boxes render wherever content only you can supply is missing:
specific decision stories, metric definitions, images. Replace `ImageSlot`
with real `next/image` once you export artifacts. **Confirm client names
(Walmart, DoorDash, HCA) are cleared before publishing.**

All dates/metrics match your resume (canonical facts). If the resume changes, change them here too.

## Fonts

Self-hosted via npm (no Google Fonts dependency): **Inter Variable** (body/UI)
+ **Fraunces Variable** (serif display — case study titles, italic accents).
Imported in `app/layout.tsx`, mapped in `app/globals.css` `@theme`.

## Motion notes

Every animation respects `prefers-reduced-motion`. Reveals fire once on
scroll-into-view; hero staggers per word; work cards shift title + arrow on
hover; case studies get a spring-smoothed reading-progress bar. Keep this
restraint — the benchmark (korolev.uk) wins through few, precise moves, not
many.
