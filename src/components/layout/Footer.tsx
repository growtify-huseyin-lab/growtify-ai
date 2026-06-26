"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { LogoLarge } from "@/components/ui/Logo";
import { COMPANY } from "@/lib/company-info";

// EN English-slug taxonomy (CEO 2026-06-01): map TR footer paths → English EN paths
// so EN footer links go directly (no 308 hop). External + anchor hrefs pass through.
const FOOTER_EN_PATHS: Record<string, string> = {
  "/kurumsal": "/enterprise",
  "/gelismeler": "/news",
  "/hakkimizda": "/about",
  "/iletisim": "/contact",
  "/sektor": "/sectors",
  "/rehber": "/guide",
  "/gizlilik-politikasi": "/privacy-policy",
  "/kvkk-aydinlatma": "/privacy-policy",
  "/kullanim-kosullari": "/terms-of-service",
  "/program-sartlari": "/program-sartlari",
  "/iade-politikasi": "/refund-policy",
  "/cerez-politikasi": "/cookie-policy",
  "/gizlilik-politikasi#ccpa": "/privacy-policy#ccpa",
};

export function Footer() {
  const t = useTranslations("FooterC");
  const locale = useLocale();
  const locHref = (href: string) =>
    locale === "en" && FOOTER_EN_PATHS[href] ? FOOTER_EN_PATHS[href] : href;

  const footerLinks = [
    {
      title: t("groupPlatform"),
      links: [
        { label: "GROWT Method", href: "/growt-method" },
        { label: t("linkBusinessSolutions"), href: "/kurumsal" },
        { label: "Blog", href: "/blog" },
        { label: locale === "en" ? "News" : "Gelişmeler", href: "/gelismeler" },
      ],
    },
    {
      title: t("groupCompany"),
      links: [
        { label: t("linkAbout"), href: "/hakkimizda" },
        { label: t("linkContact"), href: "/iletisim" },
      ],
    },
    {
      title: t("groupSocial"),
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/growtify-app" },
        { label: "Instagram", href: "https://www.instagram.com/growtify.app/" },
        { label: "YouTube", href: "https://www.youtube.com/@Growtifyappp" },
      ],
    },
    {
      title: t("groupLegal"),
      links: [
        { label: t("linkPrivacyPolicy"), href: "/gizlilik-politikasi" },
        { label: t("linkKvkk"), href: "/kvkk-aydinlatma" },
        { label: t("linkTerms"), href: "/kullanim-kosullari" },
        { label: t("linkProgramTerms"), href: "/program-sartlari" },
        { label: t("linkRefundPolicy"), href: "/iade-politikasi" },
        { label: t("linkCookiePolicy"), href: "/cerez-politikasi" },
        { label: t("linkCookiePreferences"), href: "#cookie-preferences" },
        { label: "Do Not Sell or Share (CCPA)", href: "/gizlilik-politikasi#ccpa" },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-100 dark:border-dark-border bg-dark text-white">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <LogoLarge />
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              {t("brandTagline")}
            </p>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.href === "#cookie-preferences" ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(
                              new CustomEvent("growtify:open_cookie_preferences"),
                            );
                          }
                        }}
                        className="text-sm text-gray-300 transition-colors hover:text-accent text-left"
                      >
                        {link.label}
                      </button>
                    ) : link.href.startsWith("http") ? (
                      <a
                        href={locHref(link.href)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-300 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={locHref(link.href)}
                        className="text-sm text-gray-300 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center space-y-2">
          <p className="text-sm text-gray-400">
            <strong>{COMPANY.legalName}</strong> · UK Companies House No:{" "}
            {COMPANY.companyNumber} · {COMPANY.address}
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {COMPANY.legalName} —{" "}
            {t("rightsReserved", { legalName: COMPANY.legalName })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
