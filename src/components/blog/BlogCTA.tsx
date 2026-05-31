import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function BlogCTA() {
  const t = await getTranslations("BlogCTAC");

  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-6 text-white">
      <h3 className="text-lg font-bold">
        {t("heading")}
      </h3>
      <p className="mt-2 text-white/80 text-sm leading-relaxed">
        {t("description")}
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <Button
          href="/test"
          variant="accent"
          size="sm"
          className="w-full"
        >
          {t("ctaButton")} <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
