import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Growtify.ai — 6698 sayılı KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
  alternates: { canonical: "/kvkk-aydinlatma" },
};

export default function KVKKAydinlatmaPage() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
          Son güncelleme: 9 Nisan 2026
        </p>

        <div className="mt-10 space-y-8 text-gray-600 dark:text-dark-muted leading-relaxed">
          <p>
            İşbu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması
            Kanunu (&ldquo;KVKK&rdquo;) md. 10 ve Aydınlatma Yükümlülüğünün
            Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ
            uyarınca, veri sorumlusu sıfatıyla Growtify tarafından
            hazırlanmıştır.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              1. Veri Sorumlusunun Kimliği
            </h2>
            <p className="mt-3">
              Veri Sorumlusu: Growtify (Birleşik Krallık&apos;ta kayıtlı şirket)
            </p>
            <p className="mt-1">
              İletişim:{" "}
              <a
                href="mailto:info@growtify.app"
                className="text-primary hover:underline"
              >
                info@growtify.app
              </a>
            </p>
            <p className="mt-1">Web Sitesi: growtify.ai</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              2. Kişisel Verilerin İşlenme Amacı
            </h2>
            <p className="mt-3">
              Toplanan kişisel verileriniz aşağıdaki amaçlarla KVKK&apos;nın 5. ve
              6. maddelerinde belirtilen kişisel veri işleme şartları
              dahilinde işlenmektedir:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                Dijital içerik hizmetlerinin (GROWT Programı) sunulması ve
                sözleşme yükümlülüklerinin yerine getirilmesi
              </li>
              <li>Üyelik işlemlerinin gerçekleştirilmesi ve hesap yönetimi</li>
              <li>Ödeme süreçlerinin yürütülmesi</li>
              <li>
                Sektöre özel içerik ve hizmet önerilerinin oluşturulması
              </li>
              <li>
                Ticari elektronik ileti gönderimi (açık rızanız dahilinde)
              </li>
              <li>
                Web sitesi kullanımının analiz edilmesi ve hizmetlerin
                geliştirilmesi
              </li>
              <li>
                Yasal düzenlemelerin gerektirdiği bilgi saklama, raporlama ve
                bilgilendirme yükümlülüklerinin yerine getirilmesi
              </li>
              <li>
                Quiz ve değerlendirme sonuçlarının analiz edilerek kişiselleştirilmiş
                önerilerin sunulması
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              3. İşlenen Kişisel Veriler
            </h2>
            <p className="mt-3">
              Aşağıdaki kategorilerde kişisel verileriniz işlenmektedir:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Kimlik verileri:</strong> Ad, soyad
              </li>
              <li>
                <strong>İletişim verileri:</strong> E-posta adresi, telefon
                numarası
              </li>
              <li>
                <strong>Mesleki veriler:</strong> Sektör, iş unvanı, şirket adı
              </li>
              <li>
                <strong>Müşteri işlem verileri:</strong> Quiz cevapları,
                değerlendirme sonuçları, sipariş bilgileri
              </li>
              <li>
                <strong>İşlem güvenliği verileri:</strong> IP adresi, tarayıcı
                bilgileri, oturum verileri
              </li>
              <li>
                <strong>Pazarlama verileri:</strong> Çerez kayıtları, tercih
                bilgileri
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              4. Kişisel Verilerin Aktarılması
            </h2>
            <p className="mt-3">
              Kişisel verileriniz, yukarıda belirtilen amaçların
              gerçekleştirilmesi doğrultusunda, KVKK&apos;nın 8. ve 9. maddelerinde
              belirtilen şartlara uygun olarak aşağıdaki taraflara
              aktarılabilir:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                CRM hizmet sağlayıcısı (GoHighLevel) — müşteri ilişkileri
                yönetimi amacıyla
              </li>
              <li>
                Ödeme hizmet sağlayıcısı (Stripe) — ödeme işlemlerinin güvenli
                gerçekleştirilmesi amacıyla
              </li>
              <li>
                Hosting ve altyapı sağlayıcıları — hizmetin teknik olarak
                sunulması amacıyla
              </li>
              <li>
                Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları
              </li>
            </ul>
            <p className="mt-3">
              Şirketimiz Birleşik Krallık&apos;ta (UK) kayıtlı olduğundan, kişisel
              verileriniz yurtdışına aktarılmaktadır. Bu aktarım, KVKK md. 9
              kapsamında açık rızanız veya yeterli koruma bulunması şartıyla
              gerçekleştirilmektedir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              5. Kişisel Veri Toplama Yöntemi ve Hukuki Sebebi
            </h2>
            <p className="mt-3">
              Kişisel verileriniz; web sitemiz üzerindeki formlar, quiz
              uygulamaları, iletişim formları ve çerezler aracılığıyla
              elektronik ortamda toplanmaktadır.
            </p>
            <p className="mt-3">Hukuki sebepler:</p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Açık rıza (KVKK md. 5/1):</strong> Ticari elektronik
                ileti gönderimi, pazarlama çerezleri
              </li>
              <li>
                <strong>Sözleşmenin kurulması veya ifası (KVKK md. 5/2-c):</strong>{" "}
                Hizmet sunumu, ödeme işlemleri
              </li>
              <li>
                <strong>Hukuki yükümlülük (KVKK md. 5/2-ç):</strong> Yasal
                saklama ve raporlama yükümlülükleri
              </li>
              <li>
                <strong>Meşru menfaat (KVKK md. 5/2-f):</strong> Hizmet
                kalitesinin iyileştirilmesi, istatistiksel analiz
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              6. İlgili Kişi Hakları
            </h2>
            <p className="mt-3">
              KVKK&apos;nın 11. maddesi uyarınca, veri sorumlusuna başvurarak
              aşağıdaki haklarınızı kullanabilirsiniz:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                Kişisel verilerinizin işlenip işlenmediğini öğrenme
              </li>
              <li>
                Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
              </li>
              <li>
                Kişisel verilerinizin işlenme amacını ve bunların amacına uygun
                kullanılıp kullanılmadığını öğrenme
              </li>
              <li>
                Yurtiçinde veya yurtdışında kişisel verilerin aktarıldığı
                üçüncü kişileri bilme
              </li>
              <li>
                Kişisel verilerin eksik veya yanlış işlenmiş olması halinde
                bunların düzeltilmesini isteme
              </li>
              <li>
                KVKK md. 7 çerçevesinde kişisel verilerinizin silinmesini veya
                yok edilmesini isteme
              </li>
              <li>
                Düzeltme, silme ve yok etme işlemlerinin kişisel verilerinizin
                aktarıldığı üçüncü kişilere bildirilmesini isteme
              </li>
              <li>
                İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla
                analiz edilmesi suretiyle aleyhinize bir sonucun ortaya
                çıkmasına itiraz etme
              </li>
              <li>
                Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle
                zarara uğramanız halinde zararın giderilmesini talep etme
              </li>
            </ul>
            <p className="mt-3">
              Başvurularınızı{" "}
              <a
                href="mailto:info@growtify.app"
                className="text-primary hover:underline"
              >
                info@growtify.app
              </a>{" "}
              e-posta adresi üzerinden iletebilirsiniz. Başvurularınız en geç 30
              gün içinde sonuçlandırılacaktır.
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
