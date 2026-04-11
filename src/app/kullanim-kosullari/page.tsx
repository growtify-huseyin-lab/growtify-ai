import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/company-info";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description:
    "Growtify.ai kullanım koşulları — hizmetlerimizi kullanırken geçerli olan şart ve koşullar.",
  alternates: { canonical: "/kullanim-kosullari" },
};

export default function KullanimKosullariPage() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white">
          Kullanım Koşulları
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
          Son güncelleme: 9 Nisan 2026
        </p>

        <div className="mt-10 space-y-8 text-gray-600 dark:text-dark-muted leading-relaxed">
          <p>
            İşbu Kullanım Koşulları (&ldquo;Koşullar&rdquo;), Birleşik
            Krallık&apos;ta kayıtlı <strong>{COMPANY.legalName}</strong>{" "}
            (&ldquo;Şirket&rdquo;, &ldquo;biz&rdquo;) tarafından{" "}
            {COMPANY.website} web sitesi ve ilişkili dijital hizmetler
            üzerinden sunulan hizmetlerin kullanımına ilişkin şart ve
            koşulları düzenlemektedir. {COMPANY.brand} markaları{" "}
            ({COMPANY.brand}.ai, {COMPANY.brand}.app) {COMPANY.legalName}{" "}
            bünyesinde yönetilmektedir. Web sitemizi kullanarak veya
            hizmetlerimize kaydolarak bu koşulları kabul etmiş sayılırsınız.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              1. Hizmet Tanımı
            </h2>
            <p className="mt-3">
              Growtify.ai, yapay zeka destekli iş büyütme danışmanlığı ve
              dijital içerik hizmetleri sunmaktadır. Başlıca hizmetlerimiz:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>GROWT Programı:</strong> 5 seviyeli, sektöre özel AI
                dönüşüm programı (dijital içerik)
              </li>
              <li>
                <strong>Kurumsal çözümler:</strong> İşletmelere yönelik ekip
                eğitimi ve danışmanlık hizmetleri
              </li>
              <li>
                <strong>Quiz ve değerlendirmeler:</strong> Sektöre özel yapay
                zeka hazırlık değerlendirmeleri
              </li>
              <li>
                <strong>Blog ve içerikler:</strong> Ücretsiz eğitim içerikleri
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              2. Hesap ve Üyelik Koşulları
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                Hizmetlerimizden yararlanabilmek için 18 yaşından büyük
                olmanız gerekmektedir.
              </li>
              <li>
                Kayıt sırasında verdiğiniz bilgilerin doğru ve güncel olması
                sizin sorumluluğunuzdadır.
              </li>
              <li>
                Hesap bilgilerinizin gizliliğini korumak ve hesabınız üzerinden
                gerçekleştirilen tüm işlemlerden siz sorumlusunuz.
              </li>
              <li>
                Şirket, herhangi bir gerekçe göstermeksizin hesap başvurusunu
                reddetme veya mevcut bir hesabı askıya alma hakkını saklı
                tutar.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              3. Ödeme Koşulları
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                GROWT Programı ücreti 4.999 TL ile 9.999 TL arasında değişmekte
                olup güncel fiyatlar web sitemizde belirtilmektedir.
              </li>
              <li>
                Ödemeler, Stripe ödeme altyapısı üzerinden güvenli şekilde
                gerçekleştirilir.
              </li>
              <li>
                Tüm fiyatlara KDV dahildir (aksi belirtilmedikçe).
              </li>
              <li>
                Taksit seçenekleri, ödeme sayfasında kullanıcının bankasına
                göre sunulabilir.
              </li>
              <li>
                Ödeme sonrası fatura, kayıtlı e-posta adresinize
                gönderilecektir.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              4. İade Politikası
            </h2>
            <p className="mt-3">
              Dijital içerik hizmetlerimize ilişkin iade koşulları için lütfen{" "}
              <Link
                href="/iade-politikasi"
                className="text-primary hover:underline"
              >
                İade Politikası
              </Link>{" "}
              sayfamızı inceleyiniz.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              5. Fikri Mülkiyet Hakları
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                Web sitemizdeki tüm içerikler (metin, grafik, logo, video,
                yazılım, GROWT Method dahil) {COMPANY.legalName}&apos;in fikri
                mülkiyeti olup telif hakkı ile korunmaktadır.
              </li>
              <li>
                GROWT Programı kapsamında sunulan eğitim materyalleri yalnızca
                kişisel kullanımınız içindir. Bu materyalleri kopyalama,
                dağıtma, satma, paylaşma veya türev eser oluşturma amaçlı
                kullanmanız yasaktır.
              </li>
              <li>
                &ldquo;Growtify&rdquo;, &ldquo;GROWT Method&rdquo; ve ilgili
                logo ve tasarımlar Şirket&apos;in tescilli markalarıdır.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              6. Kullanıcı Yükümlülükleri
            </h2>
            <p className="mt-3">
              Hizmetlerimizi kullanırken aşağıdaki kurallara uymayı kabul
              edersiniz:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                Hesap bilgilerinizi üçüncü kişilerle paylaşmamak
              </li>
              <li>
                Eğitim materyallerini izinsiz kopyalamamak, dağıtmamak veya
                ticari amaçla kullanmamak
              </li>
              <li>
                Web sitesinin güvenliğini tehlikeye atacak eylemlerde
                bulunmamak
              </li>
              <li>
                Diğer kullanıcıların hizmetlerden yararlanmasını engelleyecek
                davranışlarda bulunmamak
              </li>
              <li>
                Yürürlükteki yasalara ve bu Koşullara uymak
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              7. Sorumluluk Sınırlaması
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                Growtify.ai bir danışmanlık ve eğitim platformudur. Programda
                sunulan bilgi ve stratejiler, belirli sonuçları garanti etmez.
              </li>
              <li>
                Elde edeceğiniz sonuçlar; sektörünüze, uygulamanıza ve pazar
                koşullarına bağlı olarak farklılık gösterebilir.
              </li>
              <li>
                Şirket, hizmetlerin kesintisiz veya hatasız olacağını garanti
                etmez.
              </li>
              <li>
                Şirket&apos;in toplam sorumluluğu, kullanıcının hizmet için
                ödediği tutarla sınırlıdır.
              </li>
              <li>
                Dolaylı, arızi veya sonuç olarak ortaya çıkan zararlardan
                Şirket sorumlu tutulamaz.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              8. Uyuşmazlık Çözümü
            </h2>
            <p className="mt-3">
              İşbu Koşullar Birleşik Krallık hukuku ve Türkiye Cumhuriyeti
              mevzuatına tabidir.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                Türkiye&apos;deki tüketiciler için: 6502 sayılı Tüketicinin
                Korunması Hakkında Kanun kapsamındaki uyuşmazlıklarda İstanbul
                Tüketici Hakem Heyetleri ve İstanbul Mahkemeleri yetkilidir.
              </li>
              <li>
                Diğer uyuşmazlıklar için: İngiltere ve Galler mahkemeleri
                yetkilidir.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              9. Değişiklik Hakkı
            </h2>
            <p className="mt-3">
              Şirket, işbu Kullanım Koşullarını dilediği zaman değiştirme
              hakkını saklı tutar. Değişiklikler web sitesinde yayınlandığı
              tarihte yürürlüğe girer. Önemli değişiklikler hakkında kayıtlı
              kullanıcılara e-posta yoluyla bilgilendirme yapılır. Değişiklik
              sonrası hizmetlerin kullanılmaya devam edilmesi, güncellenmiş
              koşulların kabul edildiği anlamına gelir.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              10. İletişim
            </h2>
            <p className="mt-3">
              Bu koşullarla ilgili sorularınız için bizimle iletişime
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
