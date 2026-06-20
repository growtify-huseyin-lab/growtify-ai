import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/company-info";

// Program katılım şartları — genel site "Kullanım Koşulları"ndan (/kullanim-kosullari)
// ayrı, programa özgü sözleşme. Ton: resmi değil samimi; ama bağlayıcı + motive edici.
// Son güncelleme tarihi tek yerde:
const LAST_UPDATED = "20 Haziran 2026";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    title: en ? "Program Terms" : "Program Şartları, Koşullar ve Haklar",
    description: en
      ? "Growtify-AI program participation terms — clear and fair for both sides."
      : "Growtify-AI program şartları — bu ilişkiyi iki taraf için de açık ve adil tutmak için.",
  };
}

function H2({ n, children }: { n: number; children: ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-dark dark:text-white">
      <span className="text-primary">{n}.</span> {children}
    </h2>
  );
}

export default async function ProgramSartlariPage() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container className="max-w-4xl">
        {/* Başlık + sıcak giriş */}
        <p className="text-sm font-semibold tracking-wide text-primary">
          GROWTIFY-AI
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-dark dark:text-white">
          Kullanım Şartları, Koşullar ve Haklar
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
          Son güncelleme: {LAST_UPDATED}
        </p>
        <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
          Growtify-AI programlarına katılarak veya herhangi bir ürünümüzü satın
          alarak; bu şartları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan
          etmiş olursunuz. Katılmadan önce lütfen tümünü dikkatlice okuyunuz.
        </p>

        {/* FELSEFEMİZ — sıcak, öne çıkan blok (trigger edici) */}
        <div className="mt-10 rounded-2xl border-l-4 border-primary bg-primary/5 dark:bg-primary/10 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Felsefemiz
          </h2>
          <p className="mt-3 text-gray-700 dark:text-dark-muted leading-relaxed">
            Başlamadan önce, bu ilişkinin temelini oluşturan bakış açımızı
            paylaşmak isteriz. Biz size yapay zekâ araçları kullanım eğitimi
            satmıyoruz; <strong>kendi mesleğinizi olabildiğince yapay zekâyla
            dönüştürmenin yollarını</strong> öğretiyoruz. Bu ayrım, programımızın
            her köşesine sinmiştir:
          </p>
          <ul className="mt-4 space-y-3 text-gray-700 dark:text-dark-muted leading-relaxed">
            <li>
              <strong>İşi sizin yerinize yapmayız, sizinle birlikte yaparız.</strong>{" "}
              Yol gösteren biziz; uygulayan sizsiniz. Bu nedenle sonuç da sizin
              elinizdedir. Uyguladığınız ölçüde dönüşürsünüz; uygulamadığınızda
              içerik yalnızca içerik olarak kalır.
            </li>
            <li>
              <strong>Uzman sizsiniz.</strong> Yapay zekâ bir araçtır; ona asıl
              değeri katan, sizin mesleki birikiminizdir.
            </li>
            <li>
              <strong>Yöntemimiz GROWT&apos;tur:</strong> Gör, Rota, Operasyon,
              Kazanç ve Dönüşüm. İlerleme adım adım, basamak basamak gerçekleşir.
            </li>
          </ul>
          <p className="mt-4 text-gray-700 dark:text-dark-muted leading-relaxed">
            Aşağıdaki şartlar, bu ilişkiyi iki taraf için de açık ve adil tutmak
            amacıyla hazırlanmıştır.
          </p>
        </div>

        {/* MADDELER */}
        <div className="mt-12 space-y-10 text-gray-600 dark:text-dark-muted leading-relaxed">
          <div>
            <H2 n={1}>Taraflar</H2>
            <p className="mt-3">
              Growtify-AI; <strong>{COMPANY.legalName}</strong> tarafından
              işletilen bir eğitim, koçluk ve mentorluk markasıdır. Solo
              profesyonellere, işlerini yapay zekâyla dönüştürmeleri için dijital
              eğitim, topluluk ve destek hizmetleri sunarız. Programlarımıza
              katılım, bu şartların kabulüne bağlıdır.
            </p>
          </div>

          <div>
            <H2 n={2}>Program Erişimi ve Süre</H2>
            <p className="mt-3">
              Satın aldığınız programa bağlı olarak erişim kapsamınız ve süreniz
              değişiklik gösterir; ayrıntılar satın alım sırasında size açıkça
              bildirilir. Program süreniz dolduğunda erişiminiz sona erer.
              İçeriklerimiz güncel kalabilmesi için düzenli olarak yenilenir ve
              geliştirilir. Süre bitiminde dilerseniz üyeliğinizi yenileyerek
              güncel içeriklere erişmeye devam edebilirsiniz. Yenileme yapılmadığı
              takdirde; eğitimler, araçlar, topluluk ve kayıtlar dâhil tüm
              erişimler kaldırılır.
            </p>
          </div>

          <div>
            <H2 n={3}>Yapay Zekâ Kullanımı ve Mesleki Sorumluluk</H2>
            <p className="mt-3">
              Programda öğrettiğimiz yapay zekâ yöntemleri birer araçtır. Bu
              araçlarla ürettiğiniz çıktıların doğruluğu, uygunluğu ve
              müşterilerinize ya da danışanlarınıza sunulması tamamen sizin
              sorumluluğunuzdadır. Yapay zekâ hata yapabilir; eksik veya yanlış
              bilgi üretebilir. Çıktıları kendi uzmanlığınızla denetlemeden
              kullanmamanız gerekir. Mesleğinize ilişkin yasal, etik ve mesleki
              sorumluluklar — örneğin sağlık, hukuk, finans veya danışmanlık
              alanlarındaki kurallar — her durumda size aittir. Yapay zekâ
              kullanmanız bu sorumluluğu ortadan kaldırmaz veya hafifletmez.
              Growtify-AI; ürettiğiniz çıktılardan ya da bunların kullanımından
              doğabilecek sonuçlardan sorumlu tutulamaz.
            </p>
          </div>

          <div>
            <H2 n={4}>Üçüncü Taraf Araçlar</H2>
            <p className="mt-3">
              Eğitimlerimizde ChatGPT, Claude ve Gemini gibi üçüncü taraf yapay
              zekâ araçlarının kullanımını öğretiriz. Bu araçlar bize ait
              değildir. Ücretlendirmeleri, kullanım koşulları, erişilebilirliği,
              gizlilik politikaları ve performansı ilgili sağlayıcıların
              sorumluluğundadır ve zaman içinde değişebilir. Growtify-AI bu
              hizmetleri denetlemez ve garanti etmez. Bu araçlara yüklediğiniz
              veriler, özellikle hassas müşteri bilgileri, ilgili sağlayıcının
              koşullarına tabidir.
            </p>
          </div>

          <div>
            <H2 n={5}>İade ve Cayma</H2>
            <p className="mt-3">
              Dijital içeriğe erişim, satın alımın hemen ardından başlar.
              Yürürlükteki mevzuatın tanıdığı cayma hakkı saklı kalmak kaydıyla,
              içeriğe erişim sağlandıktan sonra ücret iadesi yapılmaz. Katılım,
              süreci sonuna kadar takip etme niyetiyle yapılmalıdır. Taksitli
              ödemelerde gecikme hâlinde, yürürlükteki mevzuata göre gecikme faizi
              uygulanabilir. Ayrıntılar için{" "}
              <Link href="/iade-politikasi" className="text-primary hover:underline">
                İade Politikası
              </Link>{" "}
              sayfamızı inceleyebilirsiniz.
            </p>
          </div>

          <div>
            <H2 n={6}>Sonuç ve Garanti Reddi</H2>
            <p className="mt-3">
              Programlarımızda hiçbir gelir, kazanç veya performans garantisi
              verilmez. Paylaşılan örnek çalışmalar ve referanslar tipik sonuçları
              temsil etmez. Elde edeceğiniz sonuçlar; çabanıza, becerinize ve
              uygulama düzeyinize bağlıdır. Biz rehberlik eder ve kaynak sağlarız;
              işi yapan sizsiniz. Programa katılarak; başarınızdan kendinizin
              sorumlu olduğunu, gelir garantisi bulunmadığını ve içeriklerin
              finansal, hukuki ya da tıbbi danışmanlık niteliği taşımadığını kabul
              edersiniz.
            </p>
          </div>

          <div>
            <H2 n={7}>Fikrî Mülkiyet</H2>
            <p className="mt-3">
              Program kapsamındaki tüm içerikler — videolar, şablonlar, rehberler,
              komut setleri, yapay zekâ sistemleri, GROWT yöntemi ve adlandırmaları
              ile koçluk materyalleri — Growtify-AI&apos;a aittir. Size; bu
              içerikleri yalnızca kişisel ve ticari gelişiminiz için
              kullanabileceğiniz, tek kullanıcıya özel ve devredilemez bir lisans
              tanınır. İçerikleri paylaşamaz, çoğaltamaz veya dağıtamaz; araç ve
              adlandırmalarımızı yazılı iznimiz olmadan başka programlarda
              kullanamazsınız. Aksi hâlde hukuki yollara başvurulur ve erişiminiz
              derhâl sonlandırılır.
            </p>
          </div>

          <div>
            <H2 n={8}>Gizlilik</H2>
            <p className="mt-3">
              Program veya topluluk içinde paylaşılan; stratejiler, iş modelleri,
              müşteri görüşmeleri ve özel araçlar dâhil tüm gizli bilgileri
              korumayı kabul edersiniz. Gizliliğin ihlali hâlinde, herhangi bir
              iade yapılmaksızın programdan çıkarılırsınız.
            </p>
          </div>

          <div>
            <H2 n={9}>Kişisel Verilerin Korunması</H2>
            <p className="mt-3">
              Kişisel verileriniz, yürürlükteki veri koruma mevzuatına (KVKK
              ve/veya GDPR) uygun olarak işlenir. Verilerinizi yalnızca
              hizmetlerimizi sunmak, üyeliğinizi yönetmek ve sizinle iletişim
              kurmak amacıyla kullanırız; açık izniniz olmadan üçüncü kişilerle
              paylaşmayız. Erişme, düzeltme ve silinme taleplerinizi iletişim
              adresimize iletebilirsiniz. Ayrıntılar{" "}
              <Link href="/gizlilik-politikasi" className="text-primary hover:underline">
                Gizlilik Politikamız
              </Link>{" "}
              içinde yer alır.
            </p>
          </div>

          <div>
            <H2 n={10}>Erişimin Sonlandırılması</H2>
            <p className="mt-3">
              Topluluğun düzenini bozan, bu şartları ihlal eden, saygı sınırlarını
              aşan veya değerlerimizle bağdaşmayan davranışlar sergileyen
              katılımcıların erişimini sonlandırma hakkımızı saklı tutarız.
            </p>
          </div>

          <div>
            <H2 n={11}>Ödeme İtirazları</H2>
            <p className="mt-3">
              Haksız bir ödeme itirazı (chargeback) girişimi, bu sözleşmeye
              dayanılarak ödeme sağlayıcıları nezdinde itiraz edilir ve erişiminizin
              sonlandırılmasına yol açabilir.
            </p>
          </div>

          <div>
            <H2 n={12}>Şartlardaki Değişiklikler</H2>
            <p className="mt-3">
              Bu şartları zaman zaman güncelleyebiliriz. Güncellemeler web
              sitemizde yayımlandığı anda yürürlüğe girer. Önemli değişiklikler
              hakkında kayıtlı üyelerimizi bilgilendiririz. Programa devam etmeniz,
              güncel şartları kabul ettiğiniz anlamına gelir.
            </p>
          </div>

          <div>
            <H2 n={13}>Yetkili Hukuk ve Uyuşmazlık Çözümü</H2>
            <p className="mt-3">
              Bu şartlar, hizmeti sunan {COMPANY.legalName}&apos;in tabi olduğu
              Birleşik Krallık hukuku ve Türkiye Cumhuriyeti mevzuatına göre
              yorumlanır ve uygulanır.
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

          {/* İLETİŞİM */}
          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              İletişim
            </h2>
            <p className="mt-3">
              Her türlü soru ve talebiniz için bizimle iletişime geçebilirsiniz:
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
              <li>Web sitesi: {COMPANY.website}</li>
            </ul>
          </div>

          {/* Sıcak kapanış (trigger edici) */}
          <div className="rounded-2xl bg-dark dark:bg-dark-card p-6 sm:p-8 text-center">
            <p className="text-lg font-semibold text-white">
              Hazırsan, dönüşümü birlikte başlatalım.
            </p>
            <p className="mt-2 text-gray-300 dark:text-dark-muted">
              Yol gösteren biziz; uygulayan sensin. Gör, Rota, Operasyon, Kazanç,
              Dönüşüm.
            </p>
          </div>

          {/* İlgili sayfalar */}
          <div className="border-t border-gray-200 dark:border-dark-border pt-8">
            <h3 className="text-lg font-semibold text-dark dark:text-white">
              İlgili Sayfalar
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/kullanim-kosullari" className="text-primary hover:underline">
                  Kullanım Koşulları (genel)
                </Link>
              </li>
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
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
