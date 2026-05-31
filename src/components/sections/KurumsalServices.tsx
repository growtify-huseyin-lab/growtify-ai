import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ClipboardCheck,
  FileSearch,
  GraduationCap,
  Building2,
  Cpu,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { getKServices } from "@/lib/kurumsal-constants-i18n";

const iconMap = {
  ClipboardCheck,
  FileSearch,
  GraduationCap,
  Building2,
  Cpu,
  LayoutDashboard,
} as const;

export async function KurumsalServices() {
  const locale = await getLocale();
  const KURUMSAL_SERVICES = getKServices(locale);
  const t = await getTranslations("KurumsalServicesC");

  const mentorGroup = KURUMSAL_SERVICES.filter(
    (s) => s.category === "Mentorlük"
  );
  const appGroup = KURUMSAL_SERVICES.filter(
    (s) => s.category === "Growtify.app"
  );

  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="primary" className="mb-4">
            {t("servicesBadge")}
          </Badge>
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            {t("headingLead")}{" "}
            <span className="text-primary">{t("headingHighlight")}</span>
          </h2>
        </div>

        {/* Kategori 1: Mentorlük */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-dark dark:text-white uppercase tracking-wider">
              {t("mentorshipTitle")}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted max-w-xl mx-auto">
              {t("mentorshipDescription")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {mentorGroup.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <ServiceCard key={service.id} service={service} Icon={Icon} />
              );
            })}
          </div>
        </div>

        {/* Kategori 2: Growtify.app */}
        <div>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-dark dark:text-white uppercase tracking-wider">
              Growtify.app
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted max-w-xl mx-auto">
              {t("appDescription")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {appGroup.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <ServiceCard key={service.id} service={service} Icon={Icon} />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({
  service,
  Icon,
}: {
  service: ReturnType<typeof getKServices>[number];
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <Card hover className="flex flex-col">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
          <Icon size={24} className="text-primary" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-dark-muted mb-1">
            {service.category}
          </p>
          <h4 className="text-lg font-semibold text-dark dark:text-white">
            {service.title}
          </h4>
        </div>
      </div>

      <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed flex-1">
        {service.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {service.highlights.map((h) => (
          <span
            key={h}
            className="rounded-full bg-primary/5 dark:bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {h}
          </span>
        ))}
      </div>

      {service.id === "degerlendirme" && (
        <div className="mt-6">
          <Button href={service.ctaHref} variant="ghost" size="sm">
            {service.cta}
            <ArrowRight size={16} className="ml-1.5" />
          </Button>
        </div>
      )}
    </Card>
  );
}
