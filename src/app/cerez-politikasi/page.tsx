import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/company-info";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Growtify.ai çerez politikası — web sitemizde kullanılan çerezler hakkında bilgi.",
  alternates: { canonical: "/cerez-politikasi" },
};

export default function CerezPolitikasiPage() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white">
          Çerez Politikası
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
          Son güncelleme: 9 Nisan 2026
        </p>

        <div className="mt-10 space-y-8 text-gray-600 dark:text-dark-muted leading-relaxed">
          <p>
            Bu çerez politikası, Birleşik Krallık&apos;ta kayıtlı{" "}
            <strong>{COMPANY.legalName}</strong> (&ldquo;Şirket&rdquo;,
            &ldquo;biz&rdquo;) tarafından işletilen {COMPANY.website} web
            sitesinde kullanılan çerezler hakkında sizi bilgilendirmek amacıyla
            hazırlanmıştır. {COMPANY.brand} markaları ({COMPANY.brand}.ai,{" "}
            {COMPANY.brand}.app) {COMPANY.legalName} bünyesinde yönetilmektedir.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              1. Çerez Nedir?
            </h2>
            <p className="mt-3">
              Çerezler, web sitelerinin tarayıcınıza yerleştirdiği küçük metin
              dosyalarıdır. Bu dosyalar; web sitesinin düzgün çalışmasını
              sağlamak, kullanıcı deneyimini iyileştirmek ve site trafiğini
              analiz etmek amacıyla kullanılır.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              2. Kullanılan Çerez Türleri
            </h2>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                a) Zorunlu Çerezler
              </h3>
              <p className="mt-2">
                Web sitesinin temel işlevlerinin çalışması için gerekli olan
                çerezlerdir. Bu çerezler devre dışı bırakılamaz.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 dark:border-dark-border">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-dark-card">
                      <th className="border border-gray-200 dark:border-dark-border px-4 py-2 text-left text-dark dark:text-white">
                        Çerez
                      </th>
                      <th className="border border-gray-200 dark:border-dark-border px-4 py-2 text-left text-dark dark:text-white">
                        Amaç
                      </th>
                      <th className="border border-gray-200 dark:border-dark-border px-4 py-2 text-left text-dark dark:text-white">
                        Süre
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Oturum çerezi
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Oturum yönetimi ve güvenlik
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Oturum süresi
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Tema tercihi
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Açık/koyu mod tercihinin saklanması
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        1 yıl
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Çerez onayı
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Çerez tercihlerinizin hatırlanması
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        1 yıl
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                b) Analiz Çerezleri
              </h3>
              <p className="mt-2">
                Web sitesinin nasıl kullanıldığını anlamamıza yardımcı olan
                çerezlerdir. Bu çerezler anonim istatistiksel veriler toplar.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 dark:border-dark-border">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-dark-card">
                      <th className="border border-gray-200 dark:border-dark-border px-4 py-2 text-left text-dark dark:text-white">
                        Çerez
                      </th>
                      <th className="border border-gray-200 dark:border-dark-border px-4 py-2 text-left text-dark dark:text-white">
                        Amaç
                      </th>
                      <th className="border border-gray-200 dark:border-dark-border px-4 py-2 text-left text-dark dark:text-white">
                        Süre
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Google Analytics (_ga, _gid)
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Sayfa görüntüleme, ziyaretçi sayısı, trafik kaynakları analizi
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        2 yıl / 24 saat
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-sm italic">
                Not: Google Analytics henüz aktif değildir; ileride
                etkinleştirilecektir.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                c) Pazarlama Çerezleri
              </h3>
              <p className="mt-2">
                Reklam kampanyalarının etkinliğini ölçmek ve size ilgi
                alanlarınıza uygun içerik sunmak amacıyla kullanılan
                çerezlerdir.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 dark:border-dark-border">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-dark-card">
                      <th className="border border-gray-200 dark:border-dark-border px-4 py-2 text-left text-dark dark:text-white">
                        Çerez
                      </th>
                      <th className="border border-gray-200 dark:border-dark-border px-4 py-2 text-left text-dark dark:text-white">
                        Amaç
                      </th>
                      <th className="border border-gray-200 dark:border-dark-border px-4 py-2 text-left text-dark dark:text-white">
                        Süre
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Meta Pixel (_fbp)
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Reklam dönüşüm takibi
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        90 gün
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Google Tag Manager
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Etiket yönetimi ve dönüşüm takibi
                      </td>
                      <td className="border border-gray-200 dark:border-dark-border px-4 py-2">
                        Değişken
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-sm italic">
                Not: Pazarlama çerezleri yalnızca onayınızla etkinleştirilir.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              3. Üçüncü Taraf Çerezleri
            </h2>
            <p className="mt-3">
              Web sitemizde aşağıdaki üçüncü taraf hizmetlerin çerezleri
              kullanılabilir:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Google Analytics (GA4):</strong> Web sitesi trafik
                analizi (ileride etkinleştirilecektir)
              </li>
              <li>
                <strong>Google Tag Manager (GTM):</strong> Etiket yönetimi
                (ileride etkinleştirilecektir)
              </li>
              <li>
                <strong>Stripe:</strong> Ödeme işlemi güvenliği için gerekli
                çerezler
              </li>
            </ul>
            <p className="mt-3">
              Her üçüncü taraf hizmet sağlayıcının kendi çerez ve gizlilik
              politikaları bulunmaktadır. Detaylı bilgi için ilgili hizmet
              sağlayıcıların web sitelerini ziyaret edebilirsiniz.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              4. Çerez Tercihlerinin Yönetimi
            </h2>
            <p className="mt-3">
              Çerez tercihlerinizi aşağıdaki yöntemlerle yönetebilirsiniz:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Tarayıcı ayarları:</strong> Tarayıcınızın ayarlar
                menüsünden tüm çerezleri veya belirli çerezleri
                engelleyebilir, silebilir veya yönetebilirsiniz.
              </li>
              <li>
                <strong>Çerez onay penceresi:</strong> Web sitemizi ilk
                ziyaretinizde görüntülenen çerez onay penceresinden
                tercihlerinizi belirleyebilirsiniz.
              </li>
            </ul>
            <p className="mt-3">
              Zorunlu çerezler dışındaki çerezleri devre dışı bırakmanız
              halinde web sitesinin bazı işlevleri düzgün çalışmayabilir.
            </p>
            <p className="mt-3">
              Popüler tarayıcılarda çerez ayarları için:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Google Chrome: Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler</li>
              <li>Mozilla Firefox: Ayarlar &gt; Gizlilik &amp; Güvenlik</li>
              <li>Safari: Tercihler &gt; Gizlilik</li>
              <li>Microsoft Edge: Ayarlar &gt; Çerezler ve Site İzinleri</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              5. Daha Fazla Bilgi
            </h2>
            <p className="mt-3">
              Çerezler hakkında daha detaylı bilgi almak veya sorularınızı
              iletmek için{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-primary hover:underline"
              >
                {COMPANY.email}
              </a>{" "}
              adresine e-posta gönderebilirsiniz.
            </p>
            <p className="mt-3">
              Çerezler hakkında genel bilgi almak için{" "}
              <a
                href="https://www.aboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                aboutcookies.org
              </a>{" "}
              adresini ziyaret edebilirsiniz.
            </p>
          </div>

          {/* Cross-reference links */}
          <div className="border-t border-gray-200 dark:border-dark-border pt-8">
            <h3 className="text-lg font-semibold text-dark dark:text-white">
              İlgili Sayfalar
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/gizlilik-politikasi" className="text-primary hover:underline">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/kvkk-aydinlatma" className="text-primary hover:underline">
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link href="/kullanim-kosullari" className="text-primary hover:underline">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/iade-politikasi" className="text-primary hover:underline">
                  İade Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
