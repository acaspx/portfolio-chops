import Reveal from "@/components/Reveal";
import WorkCard, { type Work } from "@/components/WorkCard";

const custoria: Work = {
  slug: "custoria",
  company: "Custoria Labs",
  title: "Founding a digital vault for what people value most",
  tags: "0→1 · B2C · iOS",
  year: "2025",
  result:
    "Galleries and collectors track priceless objects with tools never built for it. I co-founded Custoria, designed it end to end, and built the iOS app in Swift.",
  metrics: [
    { value: "iOS", label: "designed + built" },
    { value: "Available", label: "on the App Store" },
  ],
  appStore: "https://apps.apple.com/us/app/custoria-vault/id6777615531",
  images: [
    { file: "cu-mobile.png", alt: "The Custoria iOS app: AI camera scan, an identified item with its value, and the vault" },
    { file: "cu-hero.jpg", alt: "The Custoria web app on a laptop in a jewelry studio: a private vault catalog" },
    { file: "cu-pipeline.png", alt: "Custoria's ML pipeline architecture: input, detection, and extraction across vision, language, and privacy models" },
  ],
};

export default function SideProjects() {
  return (
    <section id="prototypes" aria-label="Built">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Built
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Designed, built, and shipped by me.
          </p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {/* Custoria - same case-study card as the work grid */}
          <WorkCard work={custoria} index={0} />
        </div>
      </div>
    </section>
  );
}
