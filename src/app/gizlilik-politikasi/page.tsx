import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/company-info";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Growtify.ai gizlilik politikası — kişisel verilerinizin nasıl işlendiğini öğrenin.",
  alternates: { canonical: "/gizlilik-politikasi" },
};

export default function GizlilikPolitikasiPage() {
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
              6. Yurtdışı Veri Aktarımı
            </h2>
            <p className="mt-3">
              {COMPANY.legalName} Birleşik Krallık&apos;ta (UK) kayıtlı olup sunucularımız
              ve hizmet sağlayıcılarımızın bir kısmı yurtdışında
              bulunmaktadır. Kişisel verileriniz, 6698 sayılı KVKK&apos;nın 9.
              maddesi ve UK GDPR düzenlemeleri çerçevesinde, yeterli koruma
              önlemleri alınarak yurtdışına aktarılabilir. Bu aktarımlar;
              standart sözleşme hükümleri veya açık rızanız dahilinde
              gerçekleştirilir.
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
