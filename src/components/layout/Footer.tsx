import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoLarge } from "@/components/ui/Logo";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "GROWT Method", href: "/growt-method" },
      { label: "İşletme Çözümleri", href: "/kurumsal" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Şirket",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
  {
    title: "Sosyal Medya",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com/company/growtify" },
      { label: "Instagram", href: "https://instagram.com/growtify.ai" },
      { label: "YouTube", href: "https://youtube.com/@growtify.ai" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
      { label: "KVKK Aydınlatma", href: "/kvkk-aydinlatma" },
      { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
      { label: "İade Politikası", href: "/iade-politikasi" },
      { label: "Çerez Politikası", href: "/cerez-politikasi" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-dark-border bg-dark text-white">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <LogoLarge />
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              AI ile işini büyüten profesyonellerin platformu. GROWT Method ile
              kendi hızında ölçülebilir dönüşüm.
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
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-300 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
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

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Growtify.ai — Tüm hakları saklıdır.
          </p>
        </div>
      </Container>
    </footer>
  );
}
