import Hero from "@/components/Hero";
import WorkCard from "@/components/WorkCard";
import Reveal from "@/components/Reveal";
import SideProjects from "@/components/SideProjects";
import Experience from "@/components/Experience";
import MobileHome from "@/components/MobileHome";
import EnjoyBubbles from "@/components/EnjoyBubbles";
import { works } from "@/content/works";

export default function Home() {
  return (
    <>
      {/* Soft gradient + grain backdrop, landing only */}
      <div aria-hidden className="bg-landing pointer-events-none fixed inset-0 -z-10" />

      {/* Mobile-only layout */}
      <div className="md:hidden">
        <MobileHome />
      </div>

      {/* Desktop layout (unchanged) */}
      <div className="hidden md:block">
        <Hero />

        <section id="work" aria-label="Selected work" className="mx-auto max-w-5xl px-6 pb-24">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
              Selected work
            </h2>
          </Reveal>
          <div className="space-y-5">
            {works.map((w, i) => (
              <WorkCard key={w.company} work={w} index={i} />
            ))}
          </div>
        </section>

        <SideProjects />

        <Experience />

        <EnjoyBubbles />
      </div>
    </>
  );
}
