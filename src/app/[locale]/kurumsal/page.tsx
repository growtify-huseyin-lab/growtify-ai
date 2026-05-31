import type { Metadata } from "next";
import { KurumsalHero } from "@/components/sections/KurumsalHero";
import { KurumsalProblems } from "@/components/sections/KurumsalProblems";
import { KurumsalGROWT } from "@/components/sections/KurumsalGROWT";
import { KurumsalServices } from "@/components/sections/KurumsalServices";
import { KurumsalProcess } from "@/components/sections/KurumsalProcess";
import { KurumsalStats } from "@/components/sections/KurumsalStats";
import { KurumsalSectors } from "@/components/sections/KurumsalSectors";
import { KurumsalFAQ } from "@/components/sections/KurumsalFAQ";
import { KurumsalCTA } from "@/components/sections/KurumsalCTA";

export const metadata: Metadata = {
  title: "Kurumsal AI Dönüşümü — Growtify.ai",
  description:
    "GROWT Method\u2122 ile işletmenizin AI dönüşümünü planlayın. Stratejik değerlendirmeden tam ölçekli dönüşüme.",
  alternates: { canonical: "/kurumsal" },
};

export default function KurumsalPage() {
  return (
    <main>
      <KurumsalHero />
      <KurumsalProblems />
      <KurumsalGROWT />
      <KurumsalServices />
      <KurumsalProcess />
      <KurumsalStats />
      <KurumsalSectors />
      <KurumsalFAQ />
      <KurumsalCTA />
    </main>
  );
}
