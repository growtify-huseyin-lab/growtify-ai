// TR pSEO use-case pages, served at the Turkish-localized /kullanim-alani segment.
// Re-uses the path-aware /use-case page component + metadata (which render /kullanim-alani
// URLs when locale=tr); only the static params differ (TR slugs only). EN keeps /use-case.
import { getAllUseCases } from "@/lib/use-cases";

export { generateMetadata, default } from "../../use-case/[slug]/page";

export function generateStaticParams() {
  return getAllUseCases("tr").map((u) => ({ locale: "tr", slug: u.slug }));
}
