import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { GROWTSteps } from "@/components/sections/GROWTSteps";
import { Stats } from "@/components/sections/Stats";
import { SectorGrid } from "@/components/sections/SectorGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <GROWTSteps />
      <Stats />
      <SectorGrid />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
