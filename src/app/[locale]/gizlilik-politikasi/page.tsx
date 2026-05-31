import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo-alternates";
import { PrivacyPolicyEN } from "@/components/legal/en/PrivacyPolicyEN";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/company-info";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    title: en ? "Privacy Policy" : "Gizlilik Politikası",
    description: en
      ? "Growtify.ai Privacy Policy — how we process and protect your personal data under UK GDPR."
      : "Growtify.ai gizlilik politikası — kişisel verilerinizin nasıl işlendiğini öğrenin.",
    alternates: localeAlternates(locale, "/gizlilik-politikasi"),
  };
}

export default async function GizlilikPolitikasiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === "en") return <PrivacyPolicyEN />;
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white">
          Gizlilik Politikası
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
          Son güncelleme: 9 Nisan 2026
        </p>

        <div className="mt-10 space-y-8 text-gray-600 dark:text-dark-muted leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              1. Veri Sorumlusu
            </h2>
            <p className="mt-3">
              Kişisel verileriniz, Birleşik Krallık&apos;ta (UK) kayıtlı{" "}
              {COMPANY.legalName} (&ldquo;Şirket&rdquo;) tarafından veri
              sorumlusu sıfatıyla işlenmektedir. {COMPANY.brand} markaları
              ({COMPANY.brand}.ai, {COMPANY.brand}.app) {COMPANY.legalName}{" "}
              bünyesinde yönetilmektedir.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Şirket Unvanı: {COMPANY.legalName}</li>
              <li>UK Companies House No: {COMPANY.companyNumber}</li>
              <li>Adres: {COMPANY.address}</li>
              <li>Ülke: {COMPANY.country}</li>
              <li>
                E-posta:{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-primary hover:underline"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>Telefon (UK): {COMPANY.phoneUK}</li>
              <li>Telefon (US): {COMPANY.phoneUS}</li>
              <li>Web Sitesi: {COMPANY.website}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              1.1. Veri Koruma Sorumlusu (DPO / Privacy Officer)
            </h2>
            <p className="mt-3">
              {COMPANY.legalName} bünyesinde, GDPR Art. 37 ve UK GDPR
              kapsamında veri koruma sorumlusu (Privacy Officer) görevi CTO
              ofisi tarafından yürütülmektedir. Veri ile ilgili her türlü
              talebini, şikayetini veya sorunu bildirmek için aşağıdaki
              kanalları kullanabilirsin:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                E-posta:{" "}
                <a
                  href={`mailto:${COMPANY.email}?subject=Privacy%20%E2%80%93%20DPO`}
                  className="text-primary hover:underline"
                >
                  {COMPANY.email}
                </a>{" "}
                (konu: &ldquo;Privacy / DPO&rdquo;)
              </li>
              <li>Posta: {COMPANY.address}</li>
              <li>Yanıt SLA: 30 gün (GDPR Art. 12/3)</li>
              <li>
                Veri ihlali bildirimi: 72 saat içinde yetkili otoriteye (GDPR
                Art. 33) + ilgili kişiye yüksek risk halinde (Art. 34)
              </li>
            </ul>
            <p className="mt-3">
              <strong>Şikayet hakkı:</strong> Bizimle iletişime geçtikten
              sonra çözüm bulamazsan, ilgili denetim otoritesine başvuru
              hakkın saklıdır:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>
                <strong>UK GDPR:</strong> Information Commissioner&apos;s Office
                (ICO) — <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a>
              </li>
              <li>
                <strong>KVKK (TR):</strong> Kişisel Verileri Koruma Kurumu —{" "}
                <a href="https://www.kvkk.gov.tr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">kvkk.gov.tr</a>
              </li>
              <li>
                <strong>EEA / GDPR:</strong> AB üyesi ülkelerin yerel veri
                koruma otoriteleri
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              2. İşlenen Kişisel Veriler
            </h2>
            <p className="mt-3">
              Web sitemiz ve hizmetlerimiz aracılığıyla aşağıdaki kişisel
              veriler toplanmakta ve işlenmektedir:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Kimlik bilgileri: ad, soyad</li>
              <li>İletişim bilgileri: e-posta adresi, telefon numarası</li>
              <li>Mesleki bilgiler: sektör, iş unvanı, şirket adı</li>
              <li>
                Quiz ve form verileri: sektör tercihleri, değerlendirme
                cevapları
              </li>
              <li>
                Teknik veriler: IP adresi, tarayıcı bilgileri, cihaz türü
              </li>
              <li>Çerez verileri: oturum çerezleri, analiz çerezleri</li>
              <li>Ödeme bilgileri: ödeme işlemi Stripe üzerinden gerçekleşir; kart bilgileri tarafımızca saklanmaz</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              3. Veri İşleme Amaçları
            </h2>
            <p className="mt-3">Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>GROWT Programı ve dijital içerik hizmetlerinin sunulması</li>
              <li>Üyelik ve hesap yönetimi</li>
              <li>Ödeme işlemlerinin gerçekleştirilmesi</li>
              <li>
                Pazarlama iletişimi (e-posta bülteni, kampanya bildirimleri —
                açık rızanız dahilinde)
              </li>
              <li>
                Web sitesi kullanım analizi ve hizmet kalitesinin
                iyileştirilmesi
              </li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Müşteri destek taleplerinin yönetimi</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              4. Hukuki Dayanaklar
            </h2>
            <p className="mt-3">
              Kişisel verilerinizin işlenmesinde aşağıdaki hukuki dayanaklar
              esas alınmaktadır:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Açık rıza:</strong> Pazarlama iletişimi, çerez
                kullanımı
              </li>
              <li>
                <strong>Sözleşmenin ifası:</strong> Hizmet sunumu, ödeme
                işlemleri, hesap yönetimi
              </li>
              <li>
                <strong>Meşru menfaat:</strong> Hizmet kalitesinin
                iyileştirilmesi, güvenlik
              </li>
              <li>
                <strong>Yasal yükümlülük:</strong> Vergi ve muhasebe
                düzenlemeleri
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              5. Veri Paylaşımı ve Aktarımı
            </h2>
            <p className="mt-3">
              Kişisel verileriniz, hizmetlerimizin sunulması amacıyla aşağıdaki
              üçüncü taraflarla paylaşılabilir:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>GoHighLevel (CRM):</strong> Müşteri ilişkileri yönetimi
                ve pazarlama otomasyonu
              </li>
              <li>
                <strong>Stripe:</strong> Ödeme işlemlerinin güvenli şekilde
                gerçekleştirilmesi
              </li>
              <li>
                <strong>Hosting sağlayıcıları:</strong> Web sitesi ve uygulama
                barındırma hizmetleri
              </li>
              <li>
                <strong>Analiz araçları:</strong> Google Analytics (ileride
                aktifleştirilecektir)
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              6. Yurtdışı Veri Aktarımı (Schrems II + SCC)
            </h2>
            <p className="mt-3">
              {COMPANY.legalName} Birleşik Krallık&apos;ta kayıtlı olup,
              hizmetlerimizin bir kısmı yurtdışında yerleşik üçüncü taraf
              processor&apos;lar tarafından işlenmektedir. Kişisel veriler,
              6698 sayılı KVKK m.9, UK GDPR ve EU GDPR (Schrems II kararı
              sonrası modüler SCC&apos;ler) çerçevesinde, yeterli koruma
              önlemleri (Standard Contractual Clauses 2021/914/EU + UK
              International Data Transfer Agreement) ile aktarılır.
            </p>
            <p className="mt-3 font-medium text-dark dark:text-white">
              Aktif processor&apos;lar:
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border">
                    <th className="text-left py-2 pr-3 font-semibold">Sağlayıcı</th>
                    <th className="text-left py-2 pr-3 font-semibold">Amaç</th>
                    <th className="text-left py-2 pr-3 font-semibold">Bölge</th>
                    <th className="text-left py-2 font-semibold">Yasal Dayanak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                  <tr>
                    <td className="py-2 pr-3">Vercel Inc.</td>
                    <td className="py-2 pr-3">Hosting (Next.js)</td>
                    <td className="py-2 pr-3">US + EU edge</td>
                    <td className="py-2">EU SCCs + Vercel DPA</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3">Cloudflare, Inc.</td>
                    <td className="py-2 pr-3">CDN, KV storage, Workers</td>
                    <td className="py-2 pr-3">Global edge</td>
                    <td className="py-2">EU SCCs + Cloudflare DPA</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3">HighLevel Inc. (GoHighLevel)</td>
                    <td className="py-2 pr-3">CRM, e-posta otomasyonu</td>
                    <td className="py-2 pr-3">US</td>
                    <td className="py-2">EU SCCs + DPA</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3">Google LLC</td>
                    <td className="py-2 pr-3">Workspace, Analytics, Search Console</td>
                    <td className="py-2 pr-3">US</td>
                    <td className="py-2">EU SCCs + Google DPA</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3">Meta Platforms Ireland</td>
                    <td className="py-2 pr-3">Pixel, ad delivery</td>
                    <td className="py-2 pr-3">EU/US</td>
                    <td className="py-2">EU SCCs + Meta DPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              Tüm uluslararası transferler, Schrems II (C-311/18) kararı
              sonrası güncel SCC modülleri ve Transfer Impact Assessment
              (TIA) ile yürütülmektedir. DPA kopyası talebi için:{" "}
              <a
                href={`mailto:${COMPANY.email}?subject=DPA%20Request`}
                className="text-primary hover:underline"
              >
                {COMPANY.email}
              </a>
            </p>
          </div>

          <div id="ccpa">
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              6.1. California Sakinleri (CCPA / CPRA) — Do Not Sell or Share
            </h2>
            <p className="mt-3">
              California Consumer Privacy Act (CCPA, 2018) ve California
              Privacy Rights Act (CPRA, 2020) kapsamında, California
              sakinlerinin aşağıdaki hakları bulunmaktadır:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Bilme Hakkı:</strong> Hakkınızda topladığımız kişisel
                veri kategorilerini, kaynaklarını, işleme amaçlarını ve
                paylaşıldığı tarafları öğrenme hakkı.
              </li>
              <li>
                <strong>Erişim Hakkı:</strong> Son 12 aya ait kişisel
                verilerinizin bir kopyasını talep etme hakkı.
              </li>
              <li>
                <strong>Silme Hakkı:</strong> Sınırlı istisnalar dışında,
                tutulan kişisel verilerin silinmesini talep etme.
              </li>
              <li>
                <strong>Düzeltme Hakkı:</strong> Yanlış kişisel verilerin
                düzeltilmesi.
              </li>
              <li>
                <strong>Satışı / Paylaşımı Reddetme Hakkı (Do Not Sell or
                Share):</strong> Kişisel verilerinizin reklam hedefleme
                (cross-context behavioral advertising) veya satış amacıyla
                üçüncü taraflarla paylaşılmasını reddetme.
              </li>
              <li>
                <strong>Hassas Veri Kullanımını Sınırlandırma Hakkı:</strong>{" "}
                Hassas kişisel verilerin kullanımını yasal olarak gerekli
                amaçlarla sınırlandırma.
              </li>
              <li>
                <strong>Ayrımcılık Yasağı:</strong> Bu hakları kullanmanız
                nedeniyle ürün/hizmet kalitesinde fark gözetilmez.
              </li>
            </ul>
            <p className="mt-3">
              <strong>Mevcut Uygulama:</strong> {COMPANY.legalName} kişisel
              verileri CCPA kapsamında geleneksel anlamda &ldquo;satmaz&rdquo;
              (parasal karşılık almaz). Ancak CPRA&apos;nın geniş
              &ldquo;share&rdquo; tanımı kapsamında, reklam ekosistemi (Meta
              Pixel, Google Ads remarketing — aktifse) cross-context
              behavioral advertising olarak değerlendirilebilir. Bu
              paylaşımları reddetmek için aşağıdaki yöntemleri kullanın:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                E-posta:{" "}
                <a
                  href={`mailto:${COMPANY.email}?subject=Do%20Not%20Sell%20or%20Share%20Request%20%E2%80%93%20CCPA`}
                  className="text-primary hover:underline"
                >
                  {COMPANY.email}
                </a>{" "}
                (konu: &ldquo;Do Not Sell or Share Request – CCPA&rdquo;)
              </li>
              <li>
                Sayfanın altındaki çerez tercih merkezinden &ldquo;Pazarlama
                Çerezleri&rdquo; seçeneğini reddetme (Global Privacy Control
                sinyali otomatik olarak işlenir).
              </li>
              <li>
                Posta: {COMPANY.legalName}, {COMPANY.address} (CCPA Request
                ibareli)
              </li>
            </ul>
            <p className="mt-3 text-sm">
              Yanıt süresi: 45 gün (CCPA §1798.130). Uzatma gerekirse 45 gün
              ek süre + bildirim. Talebiniz, kimliğinizin doğrulanmasını
              gerektirebilir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              7. Veri Saklama Süreleri
            </h2>
            <p className="mt-3">
              Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca
              saklanır:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Hesap verileri: Hesap aktif olduğu sürece ve kapanıştan itibaren 3 yıl</li>
              <li>Ödeme kayıtları: Yasal zorunluluk gereği 10 yıl</li>
              <li>Pazarlama verileri: Rıza geri çekilene kadar</li>
              <li>Çerez verileri: İlgili çerez politikasında belirtilen süreler</li>
              <li>İletişim kayıtları: 2 yıl</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              8. İlgili Kişi Hakları (KVKK md. 11)
            </h2>
            <p className="mt-3">
              6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun 11. maddesi
              uyarınca aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>
                İşlenme amacını ve bunların amacına uygun kullanılıp
                kullanılmadığını öğrenme
              </li>
              <li>
                Yurtiçinde veya yurtdışında kişisel verilerin aktarıldığı
                üçüncü kişileri bilme
              </li>
              <li>
                Eksik veya yanlış işlenmişse düzeltilmesini isteme
              </li>
              <li>
                KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde
                silinmesini veya yok edilmesini isteme
              </li>
              <li>
                Düzeltme veya silme işlemlerinin, verilerin aktarıldığı üçüncü
                kişilere bildirilmesini isteme
              </li>
              <li>
                İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla
                analiz edilmesi suretiyle aleyhinize bir sonucun ortaya
                çıkmasına itiraz etme
              </li>
              <li>
                Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız
                halinde zararın giderilmesini talep etme
              </li>
            </ul>
            <p className="mt-3">
              Haklarınızı kullanmak için{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-primary hover:underline"
              >
                {COMPANY.email}
              </a>{" "}
              adresine başvurabilirsiniz.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              9. İletişim
            </h2>
            <p className="mt-3">
              Gizlilik politikamız hakkında sorularınız için bizimle iletişime
              geçebilirsiniz:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>Şirket: {COMPANY.legalName}</li>
              <li>UK Companies House No: {COMPANY.companyNumber}</li>
              <li>Adres: {COMPANY.address}</li>
              <li>
                E-posta:{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-primary hover:underline"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>Telefon (UK): {COMPANY.phoneUK}</li>
              <li>Telefon (US): {COMPANY.phoneUS}</li>
              <li>Web sitesi: {COMPANY.website}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              10. Değişiklikler
            </h2>
            <p className="mt-3">
              Bu gizlilik politikası zaman zaman güncellenebilir. Önemli
              değişiklikler yapılması halinde web sitemiz üzerinden bilgilendirme
              yapılacaktır. Güncel versiyonu her zaman bu sayfada
              bulabilirsiniz.
            </p>
          </div>

          {/* Cross-reference links */}
          <div className="border-t border-gray-200 dark:border-dark-border pt-8">
            <h3 className="text-lg font-semibold text-dark dark:text-white">
              İlgili Sayfalar
            </h3>
            <ul className="mt-3 space-y-2">
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
              <li>
                <Link href="/cerez-politikasi" className="text-primary hover:underline">
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
