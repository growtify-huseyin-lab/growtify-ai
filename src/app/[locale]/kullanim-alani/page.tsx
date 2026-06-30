// TR pSEO use-case hub at the Turkish-localized /kullanim-alani segment.
// Re-uses the path-aware /use-case index page; static params constrained to TR.
export { generateMetadata, default } from "../use-case/page";

export function generateStaticParams() {
  return [{ locale: "tr" }];
}
