import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/company-info";

export const metadata: Metadata = {
  title: "İade Politikası",
  description:
    "Growtify.ai iade politikası — dijital içerik hizmetlerimize ilişkin iade koşulları.",
  alternates: { canonical: "/iade-politikasi" },
};

export default function IadePolitikasiPage() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white">
          İade Politikası
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
          Son güncelleme: 9 Nisan 2026
        </p>

        <div className="mt-10 space-y-8 text-gray-600 dark:text-dark-muted leading-relaxed">
          <p>
            İşbu İade Politikası, Birleşik Krallık&apos;ta kayıtlı{" "}
            <strong>{COMPANY.legalName}</strong> (&ldquo;Şirket&rdquo;)
            tarafından {COMPANY.website} üzerinden sunulan dijital içerik
            hizmetlerine ilişkin iade koşullarını düzenlemektedir.
            {COMPANY.brand} markaları ({COMPANY.brand}.ai, {COMPANY.brand}.app){" "}
            {COMPANY.legalName} bünyesinde yönetilmektedir.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              1. Dijital İçerik ve Cayma Hakkı
            </h2>
            <p className="mt-3">
              GROWT Programı ve ilişkili hizmetler, dijital içerik niteliğinde
              olup fiziksel teslimat gerektirmemektedir.
            </p>
            <p className="mt-3">
              <strong>Türk Hukuku (6502 sayılı Tüketicinin Korunması Hakkında Kanun):</strong>{" "}
              Mesafeli sözleşmelerde tüketici, cayma hakkına ilişkin olarak
              bilgilendirilmek kaydıyla, dijital içerik tesliminin başladığı
              andan itibaren cayma hakkından feragat etmiş sayılır (6502 sayılı
              Kanun md. 48 ve Mesafeli Sözleşmeler Yönetmeliği md. 15/ğ).
            </p>
            <p className="mt-3">
              <strong>Birleşik Krallık Hukuku (Consumer Rights Act 2015):</strong>{" "}
              Dijital içerik tesliminin, 14 günlük cayma süresi dolmadan
              başlaması halinde; tüketicinin açık onayı ve cayma hakkından
              feragat beyanı alınmış olması koşuluyla, cayma hakkı ortadan
              kalkar.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              2. Cayma Hakkından Feragat
            </h2>
            <p className="mt-3">
              Ödeme işlemi sırasında aşağıdaki koşullar sağlanmaktadır:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                Dijital içerik tesliminin derhal başlayacağı konusunda açık
                bilgilendirme yapılır.
              </li>
              <li>
                Tüketicinin, dijital içerik tesliminin başlamasıyla cayma
                hakkından feragat ettiğine dair onayı alınır.
              </li>
              <li>
                Bu bilgilendirme ve onay, ödeme öncesinde elektronik ortamda
                kayıt altına alınır.
              </li>
            </ul>
            <p className="mt-3">
              Dijital içerik teslimatı başladıktan sonra cayma hakkı
              kullanılamaz.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              3. İstisna Durumları
            </h2>
            <p className="mt-3">
              Aşağıdaki durumlarda iade değerlendirmesi yapılabilir:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li>
                <strong>Teknik erişim sorunu:</strong> Ödeme yapılmasına rağmen
                dijital içeriğe hiçbir şekilde erişim sağlanamaması ve sorunun
                Şirket tarafından makul sürede giderilememesi halinde tam iade
                yapılır.
              </li>
              <li>
                <strong>Mükerrer ödeme:</strong> Aynı hizmet için birden fazla
                ödeme alınması halinde fazla ödeme iade edilir.
              </li>
              <li>
                <strong>İçerik teslimi başlamamışsa:</strong> Dijital içerik
                teslimi henüz başlamamış ve kullanıcı hiçbir içeriğe erişmemişse,
                14 gün içinde yapılan başvurularda tam iade yapılır.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              4. İade Talep Süreci
            </h2>
            <ol className="mt-3 list-decimal pl-6 space-y-2">
              <li>
                İade talebinizi{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-primary hover:underline"
                >
                  {COMPANY.email}
                </a>{" "}
                adresine e-posta göndererek iletiniz.
              </li>
              <li>
                E-postanızda ad-soyad, kayıtlı e-posta adresi, ödeme tarihi ve
                iade gerekçenizi belirtiniz.
              </li>
              <li>
                Talebiniz en geç 10 iş günü içinde değerlendirilecek ve
                sonucu size e-posta ile bildirilecektir.
              </li>
              <li>
                Onaylanan iadeler, ödemenin yapıldığı yönteme (kredi kartı /
                banka kartı) 14 iş günü içinde yansıtılır. Bankanızın işlem
                süresine bağlı olarak bu süre uzayabilir.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              5. İletişim
            </h2>
            <p className="mt-3">
              İade politikamızla ilgili tüm sorularınız için:
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
                <Link href="/kullanim-kosullari" className="text-primary hover:underline">
                  Kullanım Koşulları
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
