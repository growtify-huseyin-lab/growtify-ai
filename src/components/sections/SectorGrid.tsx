import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  Heart,
  Scale,
  Sparkles,
  Home,
  ShoppingCart,
  Smile,
  Calculator,
  Pill,
  Plane,
  Ruler,
  GraduationCap,
  Dumbbell,
  ArrowRight,
} from "lucide-react";
import { SECTORS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Heart, Scale, Sparkles, Home, ShoppingCart, Smile,
  Calculator, Pill, Plane, Ruler, GraduationCap, Dumbbell,
};

const sectorSlugMap: Record<string, string> = {
  saglik: "saglik", hukuk: "hukuk", guzellik: "guzellik", emlak: "emlak",
  e_ticaret: "e-ticaret", dis: "dis-hekimligi", muhasebe: "muhasebe",
  eczacilik: "eczacilik", turizm: "turizm", mimarlik: "mimarlik",
  egitim: "egitim", fitness: "fitness",
};

export function SectorGrid() {
  return (
    <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            <span className="text-primary">Sektörüne özel</span> yapay zeka ile iş büyütme
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
            Her sektörün ihtiyacı farklı. GROWT Method sana özel şekilleniyor.
          </p>
        </div>

        <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {SECTORS.map((sector) => {
            const Icon = iconMap[sector.icon] || Heart;
            const slug = sectorSlugMap[sector.id] || sector.id;
            return (
              <Link
                key={sector.id}
                href={`/sektor/${slug}`}
                className="group rounded-2xl border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-primary/5 hover:border-primary/30"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 transition-colors">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-dark dark:text-white text-center">
                  {sector.label}
                </h3>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-dark-muted text-center leading-relaxed">{sector.hook}</p>
                <div className="mt-3 flex justify-center">
                  <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    İncele <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
