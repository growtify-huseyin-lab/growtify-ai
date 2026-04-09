export type SectorPage = {
  slug: string;
  title: string;
  fullTitle: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  heroSubtitle: string;
  problems: { title: string; description: string; icon: string }[];
  scenarios: {
    title: string;
    description: string;
    beforeTime: string;
    afterTime: string;
  }[];
  growtContext: string;
  relatedBlogSlugs: string[];
};

export const SECTOR_PAGES: Record<string, SectorPage> = {
  saglik: {
    slug: "saglik",
    title: "Sağlık",
    fullTitle: "Sağlık Profesyonelleri",
    h1: "Sağlık Profesyonelleri İçin Yapay Zeka: Diyetisyen, Psikolog, Fizyoterapist",
    seoTitle: "Sağlık Profesyonelleri İçin Yapay Zeka",
    seoDescription:
      "Diyetisyen, psikolog, fizyoterapist — yapay zeka ile kliniğini büyüt. Danışan kazanımından takibe, GROWT Method ile 5 seviyede dönüşüm.",
    heroSubtitle:
      "Danışan kazanımından takibe, içerik üretiminden otomasyon kurmaya — yapay zeka ile kliniğini büyüt.",
    problems: [
      {
        title: "Hasta planları saatler alıyor",
        description:
          "Her danışana özel beslenme/tedavi planı hazırlamak günde 3-4 saatini yiyor. Bu zaman yeni danışan almaktan çalınıyor.",
        icon: "Clock",
      },
      {
        title: "İçerik üretmeye vakit yok",
        description:
          "Instagram'a düzenli paylaşım yapman gerektiğini biliyorsun ama vakit bulamıyorsun. Profil ölü, yeni danışanlar gelmiyor.",
        icon: "FileText",
      },
      {
        title: "Takip sistemi yok",
        description:
          "Danışan geldi gitti — takip maili yok, hatırlatma yok, memnuniyet sorulmadı. Sadakatsiz müşteri döngüsü.",
        icon: "UserX",
      },
    ],
    scenarios: [
      {
        title: "Danışan Onboarding Sistemi",
        description:
          "Danışanın formu dolduruyor → AI plan + alışveriş listesi + takip mesajları + randevu çıkarıyor. Sen onaylıyorsun.",
        beforeTime: "2-3 saat",
        afterTime: "15 dakika",
      },
      {
        title: "Haftalık İçerik Sistemi",
        description:
          "AI her hafta 5 Instagram postu + 2 story + 1 blog taslağı + danışanlara bilgilendirme mesajları hazırlıyor.",
        beforeTime: "Haftada 6 saat",
        afterTime: "30 dakika",
      },
      {
        title: "Randevu Sonrası Otomatik Takip",
        description:
          "Seans bittikten sonra AI not özeti + takip mesajı + sonraki seans hazırlığı + motivasyon mesajı.",
        beforeTime: "30 dk/danışan",
        afterTime: "Otomatik",
      },
    ],
    growtContext:
      "Sağlık profesyonelleri için GROWT Method, danışan kazanımından klinik otomasyonuna kadar tüm süreci kapsıyor. Gap Analysis'te senin kliniğinin AI fırsatlarını keşfediyoruz, Transform'da tam otomasyon kuruyoruz.",
    relatedBlogSlugs: ["saglik-profesyonelleri-icin-yapay-zeka", "diyetisyen-yapay-zeka-danisan-takibi", "psikolog-yapay-zeka-seans-yonetimi"],
  },
  hukuk: {
    slug: "hukuk",
    title: "Hukuk",
    fullTitle: "Hukuk Profesyonelleri",
    h1: "Avukatlar İçin Yapay Zeka: İçtihat Araştırmadan Büro Otomasyonuna",
    seoTitle: "Avukatlar İçin Yapay Zeka Araçları ve Rehber",
    seoDescription:
      "Avukat, noter, arabulucu — yapay zeka ile büro kapasiteni katla. İçtihat araştırmasından müvekkil kazanımına.",
    heroSubtitle:
      "İçtihat araştırmasından müvekkil kazanımına, dilekçe hazırlamadan müvekkil yönetimine — yapay zeka ile büro kapasiteni katla.",
    problems: [
      {
        title: "Araştırma saatlerce sürüyor",
        description:
          "İçtihat araştırması, mevzuat taraması, emsal kararlar — her dosya için saatler harcıyorsun.",
        icon: "Search",
      },
      {
        title: "Müvekkil iletişimi dağınık",
        description:
          "Mail, telefon, mesaj — müvekkil takibi sistemsiz. Bilgi kayıpları ve gecikmiş yanıtlar güven zedeliyor.",
        icon: "MessageSquare",
      },
      {
        title: "Yeni müvekkil bulmak zor",
        description:
          "Dijital varlığın zayıf, referans dışında yeni müvekkil gelmiyor. Rakipler dijitalde seni geçiyor.",
        icon: "UserX",
      },
    ],
    scenarios: [
      {
        title: "İçtihat Araştırma Asistanı",
        description:
          "Dosya bilgilerini giriyorsun → AI ilgili kararları, mevzuatı ve emsal içtihatları çıkarıyor. Sen filtreliyorsun.",
        beforeTime: "3 saat",
        afterTime: "15 dakika",
      },
      {
        title: "Dilekçe Taslak Sistemi",
        description:
          "Dosya özetini giriyorsun → AI dilekçe taslağı + ek belgeler listesi + savunma noktaları hazırlıyor.",
        beforeTime: "2 saat",
        afterTime: "20 dakika",
      },
      {
        title: "Müvekkil İletişim Otomasyonu",
        description:
          "Duruşma hatırlatma, süreç bilgilendirme, belge talebi — AI müvekkil iletişimini otomatikleştiriyor.",
        beforeTime: "Günde 1 saat",
        afterTime: "Otomatik",
      },
    ],
    growtContext:
      "Hukuk profesyonelleri için GROWT Method, araştırma verimliliğinden müvekkil kazanımına kadar tüm süreci kapsıyor.",
    relatedBlogSlugs: ["avukatlar-icin-yapay-zeka", "avukat-ictihat-arastirma-yapay-zeka", "hukuk-burosu-dijital-donusum-rehberi"],
  },
  guzellik: {
    slug: "guzellik",
    title: "Güzellik",
    fullTitle: "Güzellik Profesyonelleri",
    h1: "Kuaför ve Güzellik Salonu İçin Yapay Zeka",
    seoTitle: "Kuaför ve Güzellik Salonu İçin Yapay Zeka",
    seoDescription:
      "Kuaför, estetisyen, güzellik uzmanı — yapay zeka ile salonunu büyüt. Randevudan sadakate, Instagram'dan gelire.",
    heroSubtitle:
      "Randevudan sadakate, Instagram içerik üretiminden müşteri otomasyonuna — yapay zeka ile salonunu büyüt.",
    problems: [
      {
        title: "Instagram yönetimi zaman yiyor",
        description:
          "Her gün post hazırlamak, hikaye paylaşmak, yorum yanıtlamak — saatler gidiyor ama sistematik değil.",
        icon: "Camera",
      },
      {
        title: "Randevu takibi karışık",
        description:
          "Telefon, DM, WhatsApp — randevular dağınık. İptaller, kaçırmalar ve çift randevular oluyor.",
        icon: "Calendar",
      },
      {
        title: "Müşteri geri gelmiyor",
        description:
          "İlk randevu olur ama takip yok. Hatırlatma, kampanya, sadakat programı — hiçbiri sistematik değil.",
        icon: "UserX",
      },
    ],
    scenarios: [
      {
        title: "30 Günlük İçerik Planı",
        description:
          "AI 30 günlük Instagram planı çıkarıyor — görseller için yönerge, caption, hashtag, story fikirleri. Sen seçiyorsun.",
        beforeTime: "Haftada 5 saat",
        afterTime: "30 dakika/ay",
      },
      {
        title: "Randevu Otomasyonu",
        description:
          "Müşteri online randevu alıyor → AI onay + hatırlatma + sonrası takip mesajı gönderiyor. Sen işine odaklanıyorsun.",
        beforeTime: "Günde 1 saat",
        afterTime: "Otomatik",
      },
      {
        title: "Müşteri Sadakat Sistemi",
        description:
          "AI doğum günü mesajı + kampanya duyurusu + geri kazanma mesajı gönderiyor. Müşteriler geri geliyor.",
        beforeTime: "Yapılmıyor",
        afterTime: "Otomatik",
      },
    ],
    growtContext:
      "Güzellik sektörü için GROWT Method, Instagram'dan randevuya, randevudan sadakate kadar tüm müşteri yolculuğunu kapsıyor.",
    relatedBlogSlugs: ["guzellik-sektorunde-yapay-zeka", "kuafor-instagram-icerik-yapay-zeka", "guzellik-salonu-musteri-sadakati-ai"],
  },
  emlak: {
    slug: "emlak",
    title: "Emlak",
    fullTitle: "Emlak Profesyonelleri",
    h1: "Emlakçılar İçin Yapay Zeka: İlan Yazımından Müşteri Takibine",
    seoTitle: "Emlakçılar İçin Yapay Zeka Araçları ve Rehber",
    seoDescription:
      "Emlak danışmanı — yapay zeka ile portföyünü büyüt. İlan yazmaktan müşteri eşleştirmeye.",
    heroSubtitle:
      "İlan yazmaktan müşteri eşleştirmeye, piyasa analizinden portföy yönetimine — yapay zeka ile portföyünü büyüt.",
    problems: [
      {
        title: "İlan yazmak vakit alıyor",
        description: "Her mülk için profesyonel ilan hazırlamak saatler sürüyor. 50 ilanla uğraşmak imkansızlaşıyor.",
        icon: "FileText",
      },
      {
        title: "Doğru müşteriyi bulmak zor",
        description: "Mülk-müşteri eşleştirmesi manuel ve verimsiz. Yanlış gösterimler zaman kaybettiriyor.",
        icon: "Search",
      },
      {
        title: "Takip sistemi yetersiz",
        description: "Potansiyel alıcılar kayboluyor, geri dönüş yapılmıyor, fırsatlar kaçırılıyor.",
        icon: "UserX",
      },
    ],
    scenarios: [
      {
        title: "Otomatik İlan Yazımı",
        description: "Mülk bilgilerini giriyorsun → AI SEO uyumlu, profesyonel ilan metni + başlık alternatifleri çıkarıyor.",
        beforeTime: "30 dk/ilan",
        afterTime: "2 dakika",
      },
      {
        title: "Müşteri-Mülk Eşleştirme",
        description: "AI müşteri tercihlerini analiz edip en uygun mülkleri öneriyor. Gösterim verimliliği artıyor.",
        beforeTime: "Manuel arama",
        afterTime: "Otomatik öneri",
      },
      {
        title: "Lead Takip Otomasyonu",
        description: "Potansiyel alıcıya otomatik takip mesajı, yeni ilan bildirimi, randevu hatırlatma.",
        beforeTime: "Yapılmıyor",
        afterTime: "Otomatik",
      },
    ],
    growtContext: "Emlak sektörü için GROWT Method, ilan verimliliğinden portföy büyütmeye kadar tüm süreci kapsıyor.",
    relatedBlogSlugs: ["emlak-danismanlari-icin-yapay-zeka", "emlak-ilan-yazimi-yapay-zeka", "emlak-sektorunde-dijital-donusum"],
  },
  "e-ticaret": {
    slug: "e-ticaret",
    title: "E-Ticaret",
    fullTitle: "E-Ticaret Satıcıları",
    h1: "E-Ticaret İçin Yapay Zeka: Ürün Açıklamasından Satış Otomasyonuna",
    seoTitle: "E-Ticaret Yapay Zeka Araçları ve Otomasyon",
    seoDescription: "E-ticaret satıcısı — yapay zeka ile mağazanı büyüt. Ürün açıklamasından satış otomasyonuna.",
    heroSubtitle: "Ürün sayfasından satış otomasyonuna, müşteri hizmetinden reklam optimizasyonuna — yapay zeka ile mağazanı büyüt.",
    problems: [
      { title: "Ürün açıklamaları vakit alıyor", description: "Yüzlerce ürün için SEO uyumlu açıklama yazmak haftalar alıyor.", icon: "FileText" },
      { title: "Müşteri hizmeti yetersiz", description: "Aynı sorular tekrar tekrar geliyor. Yanıt süresi uzun, müşteri kaybediliyor.", icon: "MessageSquare" },
      { title: "Reklam bütçesi verimsiz", description: "Reklam harcaması yüksek ama dönüşüm düşük. Optimizasyon manuel ve yetersiz.", icon: "TrendingDown" },
    ],
    scenarios: [
      { title: "Toplu Ürün Açıklaması", description: "Ürün listesini veriyorsun → AI SEO uyumlu açıklama + başlık + anahtar kelime çıkarıyor.", beforeTime: "15 dk/ürün", afterTime: "30 sn/ürün" },
      { title: "Otomatik Müşteri Yanıtı", description: "Sık sorulan sorulara AI otomatik yanıt veriyor. Karmaşık konuları sana yönlendiriyor.", beforeTime: "Günde 2 saat", afterTime: "Otomatik" },
      { title: "Reklam Metin Optimizasyonu", description: "AI A/B test metinleri + hedef kitle önerileri + performans analizi yapıyor.", beforeTime: "Manuel deneme", afterTime: "AI destekli optimizasyon" },
    ],
    growtContext: "E-ticaret için GROWT Method, ürün sayfası optimizasyonundan satış otomasyonuna kadar tüm süreci kapsıyor.",
    relatedBlogSlugs: ["e-ticaret-yapay-zeka-urun-aciklamasi", "e-ticaret-otomasyon-yapay-zeka", "e-ticaret-rekabet-yapay-zeka"],
  },
  "dis-hekimligi": {
    slug: "dis-hekimligi",
    title: "Diş Hekimliği",
    fullTitle: "Diş Hekimleri",
    h1: "Diş Hekimleri İçin Yapay Zeka: Klinikten Dental Turizme",
    seoTitle: "Diş Hekimleri İçin Yapay Zeka ve Dijital Pazarlama",
    seoDescription: "Diş hekimi — yapay zeka ile kliniğini büyüt. Hasta iletişiminden dental turizme.",
    heroSubtitle: "Hasta iletişiminden dental turizme, tedavi planından itibar yönetimine — yapay zeka ile kliniğini büyüt.",
    problems: [
      { title: "Yeni hasta kazanımı zor", description: "Google'da çıkmıyorsun, sosyal medya boş. Referans dışında yeni hasta gelmiyor.", icon: "UserPlus" },
      { title: "Dental turizm fırsatı kaçıyor", description: "Yabancı hastalar arıyor ama çok dilli web siteniz yok, iletişim zayıf.", icon: "Globe" },
      { title: "Hasta iletişimi dağınık", description: "Randevu hatırlatma, tedavi bilgilendirme, kontrol çağrısı — hiçbiri sistematik değil.", icon: "MessageSquare" },
    ],
    scenarios: [
      { title: "Çok Dilli Web Sitesi + SEO", description: "AI kliniğin için 5 dilde web sitesi içeriği + Google profil optimizasyonu yapıyor.", beforeTime: "Yapılmıyor", afterTime: "AI destekli" },
      { title: "Hasta İletişim Otomasyonu", description: "Randevu öncesi hatırlatma, sonrası takip, kontrol çağrısı — hepsi otomatik.", beforeTime: "Günde 1 saat", afterTime: "Otomatik" },
      { title: "Tedavi Planı Asistanı", description: "AI hasta bilgilerine göre tedavi planı taslağı + maliyet hesabı + görsel sunum hazırlıyor.", beforeTime: "45 dk/hasta", afterTime: "10 dakika" },
    ],
    growtContext: "Diş hekimliği için GROWT Method, hasta kazanımından dental turizme kadar tüm süreci kapsıyor.",
    relatedBlogSlugs: ["dis-hekimleri-icin-yapay-zeka", "dental-turizm-yapay-zeka", "dis-klinigi-dijital-pazarlama-ai"],
  },
  muhasebe: {
    slug: "muhasebe",
    title: "Muhasebe",
    fullTitle: "Mali Müşavirler",
    h1: "Mali Müşavirler İçin Yapay Zeka: Belgeden Danışmanlığa Dönüşüm",
    seoTitle: "Mali Müşavir ve SMMM İçin Yapay Zeka",
    seoDescription: "Mali müşavir, SMMM — yapay zeka ile büronun değerini artır. Belge işlemeden danışmanlığa.",
    heroSubtitle: "Belge işlemeden müşteri danışmanlığına, mevzuat takibinden raporlamaya — yapay zeka ile büronun değerini artır.",
    problems: [
      { title: "Ay sonu kapanış kabus", description: "Belge toplama, eşleştirme, kontrol — ay sonu 3 gün boyunca mesai.", icon: "Calendar" },
      { title: "Mevzuat takibi zor", description: "Sürekli değişen mevzuatı takip etmek imkansız. Müşterilere zamanında bilgi veremiyorsun.", icon: "BookOpen" },
      { title: "Danışmanlığa vakit kalmıyor", description: "Tekrarlayan işler zamanını yiyor. Müşterilere stratejik danışmanlık yapamıyorsun.", icon: "Clock" },
    ],
    scenarios: [
      { title: "Belge İşleme Otomasyonu", description: "Fatura/makbuz fotoğrafı → AI otomatik tanıma, sınıflandırma, eşleştirme yapıyor.", beforeTime: "3 gün/ay sonu", afterTime: "3 saat" },
      { title: "Mevzuat Takip Asistanı", description: "AI günlük mevzuat değişikliklerini tarayıp, müşterilerine özel uyarılar hazırlıyor.", beforeTime: "Haftada 3 saat", afterTime: "Otomatik" },
      { title: "Müşteri Rapor Sistemi", description: "AI aylık mali rapor + analiz + öneri taslağı hazırlıyor. Sen onaylıyorsun.", beforeTime: "2 saat/müşteri", afterTime: "15 dakika" },
    ],
    growtContext: "Muhasebe sektörü için GROWT Method, belge otomasyonundan stratejik danışmanlığa dönüşümü kapsıyor.",
    relatedBlogSlugs: ["mali-musavirler-icin-yapay-zeka", "muhasebe-belge-otomasyonu-ai", "smmm-dijital-donusum-yapay-zeka"],
  },
  eczacilik: {
    slug: "eczacilik",
    title: "Eczacılık",
    fullTitle: "Eczacılar",
    h1: "Eczacılar İçin Yapay Zeka: Stok Yönetiminden Dijital Eczaneye",
    seoTitle: "Eczacılar İçin Yapay Zeka ve Dijital Dönüşüm",
    seoDescription: "Eczacı — yapay zeka ile eczaneni büyüt. Stok yönetiminden müşteri sadakatine.",
    heroSubtitle: "Stok yönetiminden müşteri sadakatine, e-eczane operasyonundan lokal pazarlamaya — yapay zeka ile eczaneni büyüt.",
    problems: [
      { title: "Stok tahminleri tutmuyor", description: "Recetesiz ürünlerde stok tahmini yapamıyorsun. Ya fazla stok ya kayıp satış.", icon: "Package" },
      { title: "E-eczane operasyonu zor", description: "Online satış büyüyor ama operasyonu yönetmek tek başına imkansız.", icon: "Globe" },
      { title: "Müşteri sadakati düşük", description: "Müşteriler fiyata göre karar veriyor. Farklılaşma ve sadakat programı yok.", icon: "UserX" },
    ],
    scenarios: [
      { title: "Stok Tahmin Sistemi", description: "AI geçmiş satış verilerine göre talep tahmini yapıyor. Sipariş önerileri sunuyor.", beforeTime: "Manuel tahmin", afterTime: "AI destekli tahmin" },
      { title: "Müşteri Bilgilendirme", description: "İlaç etkileşimleri, mevsimsel sağlık önerileri — AI müşteriye özel bilgilendirme yapıyor.", beforeTime: "Yapılmıyor", afterTime: "Otomatik" },
      { title: "Kampanya Planlama", description: "AI mevsimsel kampanya önerileri + hedef kitle seçimi + mesaj hazırlığı yapıyor.", beforeTime: "Manuel", afterTime: "AI destekli" },
    ],
    growtContext: "Eczacılık için GROWT Method, stok optimizasyonundan dijital müşteri deneyimine dönüşümü kapsıyor.",
    relatedBlogSlugs: ["eczacilar-icin-yapay-zeka", "eczane-stok-yonetimi-ai", "eczane-dijital-donusum"],
  },
  turizm: {
    slug: "turizm",
    title: "Turizm",
    fullTitle: "Turizm Profesyonelleri",
    h1: "Turizm Sektörü İçin Yapay Zeka: Acenteden Dijital Deneyime",
    seoTitle: "Turizm ve Seyahat Acenteleri İçin Yapay Zeka",
    seoDescription: "Seyahat acentesi, tur rehberi — yapay zeka ile acenteni büyüt. Rezervasyondan kişisel deneyime.",
    heroSubtitle: "Rezervasyondan kişisel tur deneyimine, çok dilli iletişimden müşteri yönetimine — yapay zeka ile acenteni büyüt.",
    problems: [
      { title: "7/24 hizmet veremiyorsun", description: "Turistler farklı zaman dilimlerinden arıyor. Mesai dışında kayıp oluyor.", icon: "Clock" },
      { title: "Dil bariyeri", description: "Yabancı turistlerle iletişim zor. Çok dilli hizmet veremiyorsun.", icon: "Globe" },
      { title: "Kişiselleştirme yetersiz", description: "Herkese aynı tur paketi sunuyorsun. Kişisel öneri yapamıyorsun.", icon: "UserX" },
    ],
    scenarios: [
      { title: "Çok Dilli Chatbot", description: "AI 7/24, 5+ dilde turistlere yanıt veriyor. Sık sorulan sorular, tur bilgisi, rezervasyon.", beforeTime: "Mesai saatleri", afterTime: "7/24 otomatik" },
      { title: "Kişisel Tur Önerisi", description: "Turistin tercihlerine göre AI kişisel tur programı + restoran + aktivite öneriyor.", beforeTime: "30 dk/müşteri", afterTime: "Otomatik" },
      { title: "Sezon Analizi + Fiyatlama", description: "AI geçmiş verilere göre sezon tahmini + dinamik fiyatlama önerisi sunuyor.", beforeTime: "Manuel analiz", afterTime: "AI destekli" },
    ],
    growtContext: "Turizm sektörü için GROWT Method, dijital müşteri deneyiminden operasyonel verimlilik dönüşümüne kadar kapsıyor.",
    relatedBlogSlugs: ["seyahat-acenteleri-yapay-zeka", "turizm-chatbot-yapay-zeka", "turizm-sektoru-dijital-donusum-ai"],
  },
  mimarlik: {
    slug: "mimarlik",
    title: "Mimarlık",
    fullTitle: "Mimarlık Profesyonelleri",
    h1: "Mimarlar İçin Yapay Zeka: Render'dan Proje Yönetimine",
    seoTitle: "Mimarlar İçin Yapay Zeka Araçları ve Rehber",
    seoDescription: "Mimar, iç mimar — yapay zeka ile ofisini büyüt. Konseptten müşteri sunumuna.",
    heroSubtitle: "Konseptten müşteri sunumuna, render'dan proje yönetimine — yapay zeka ile ofisini büyüt.",
    problems: [
      { title: "Render bekleme süresi uzun", description: "Bir konsept render için 2 gün bekliyorsun. Müşteriye hızlı sunum yapamıyorsun.", icon: "Clock" },
      { title: "Müşteri beklentisi yönetilemiyor", description: "Müşteri kafasındakini anlatamıyor, sen yanlış anlıyorsun. Revizyon döngüsü.", icon: "MessageSquare" },
      { title: "Proje yönetimi karışık", description: "Birden fazla proje, farklı müşteriler — takip sistemi yok.", icon: "Layers" },
    ],
    scenarios: [
      { title: "Hızlı Konsept Render", description: "Briefingi giriyorsun → AI 2 dakikada 3 farklı konsept render çıkarıyor. Müşteriye ilk toplantıda gösteriyorsun.", beforeTime: "2 gün", afterTime: "2 dakika" },
      { title: "Müşteri Brief Asistanı", description: "AI müşteriyle yapılandırılmış brief görüşmesi yürütüyor. Net, ölçülebilir brief çıkıyor.", beforeTime: "Kaotik brief", afterTime: "Yapılandırılmış brief" },
      { title: "Proje Takip Sistemi", description: "AI proje durumu, deadline'lar, müşteri iletişimi — hepsini tek yerden yönetiyor.", beforeTime: "Dağınık", afterTime: "Sistematik" },
    ],
    growtContext: "Mimarlık sektörü için GROWT Method, tasarım verimliliğinden müşteri yönetimine dönüşümü kapsıyor.",
    relatedBlogSlugs: ["mimarlar-icin-yapay-zeka", "mimari-render-yapay-zeka", "mimarlik-ofisi-dijital-donusum"],
  },
  egitim: {
    slug: "egitim",
    title: "Eğitim",
    fullTitle: "Eğitim Profesyonelleri",
    h1: "Eğitimciler ve Online Koçlar İçin Yapay Zeka Rehberi",
    seoTitle: "Eğitimciler ve Online Koçlar İçin Yapay Zeka",
    seoDescription: "Öğretmen, eğitim danışmanı, online koç — yapay zeka ile programını büyüt.",
    heroSubtitle: "Materyal üretiminden katılımcı takibine, program tasarımından ölçmeye — yapay zeka ile programını büyüt.",
    problems: [
      { title: "Materyal hazırlamak uzun sürüyor", description: "Her katılımcıya özel materyal hazırlamak günler alıyor.", icon: "FileText" },
      { title: "Katılımcı takibi yetersiz", description: "Kim ne kadar ilerlemiş, kim zorlanıyor — takip sistemi yok.", icon: "BarChart" },
      { title: "Program ölçeklenmiyor", description: "Birebir çalışıyorsun, daha fazla katılımcı alamıyorsun.", icon: "TrendingUp" },
    ],
    scenarios: [
      { title: "Kişiselleştirilmiş Materyal", description: "Katılımcı profiline göre AI özelleştirilmiş materyal + alıştırma + quiz hazırlıyor.", beforeTime: "2 saat/katılımcı", afterTime: "10 dakika" },
      { title: "Otomatik İlerleme Takibi", description: "AI katılımcı performansını analiz edip sana raporluyor. Zorlananlara otomatik destek.", beforeTime: "Manuel takip", afterTime: "Otomatik" },
      { title: "Program Çoğaltma", description: "AI programını farklı seviye/sektörlere uyarlıyor. Tek program → 5 varyant.", beforeTime: "Haftalarca", afterTime: "1 gün" },
    ],
    growtContext: "Eğitim sektörü için GROWT Method, içerik üretiminden program ölçeklendirmeye dönüşümü kapsıyor.",
    relatedBlogSlugs: ["egitimciler-icin-yapay-zeka", "online-egitim-icerik-uretimi-ai", "egitim-sektoru-yapay-zeka-donusum"],
  },
  fitness: {
    slug: "fitness",
    title: "Fitness",
    fullTitle: "Fitness Profesyonelleri",
    h1: "Personal Trainerlar İçin Yapay Zeka: Programdan Online Koçluğa",
    seoTitle: "Personal Trainer ve Fitness Koçları İçin Yapay Zeka",
    seoDescription: "Personal trainer, pilates eğitmeni — yapay zeka ile stüdyonu büyüt. Program yazımından takibe.",
    heroSubtitle: "Program yazımından müşteri takibine, içerik üretiminden online koçluğa — yapay zeka ile stüdyonu büyüt.",
    problems: [
      { title: "Program yazmak vakit alıyor", description: "Her müşteriye özel program hazırlamak saatler sürüyor. Daha fazla müşteri alamıyorsun.", icon: "Clock" },
      { title: "Müşteri motivasyonu düşüyor", description: "Antrenman arası takip yok. Müşteriler bırakıyor.", icon: "TrendingDown" },
      { title: "Online koçluk kuramıyorsun", description: "Online genişlemek istiyorsun ama altyapı yok, zaman yok.", icon: "Globe" },
    ],
    scenarios: [
      { title: "Kişisel Program Asistanı", description: "Müşteri bilgilerini giriyorsun → AI kişiselleştirilmiş program + beslenme önerisi çıkarıyor.", beforeTime: "1 saat/müşteri", afterTime: "5 dakika" },
      { title: "Otomatik Takip Sistemi", description: "AI antrenman hatırlatma, ilerleme tebriği, motivasyon mesajı gönderiyor.", beforeTime: "Yapılmıyor", afterTime: "Otomatik" },
      { title: "Online Koçluk Platformu", description: "AI senin tarzında eğitim içeriği + video planı + müşteri iletişimi hazırlıyor.", beforeTime: "Yapılmıyor", afterTime: "AI destekli" },
    ],
    growtContext: "Fitness sektörü için GROWT Method, program verimliliğinden online koçluk ölçeklendirmeye dönüşümü kapsıyor.",
    relatedBlogSlugs: ["personal-trainer-yapay-zeka", "fitness-program-yazimi-ai", "fitness-kocu-dijital-donusum"],
  },
};

export function getSectorBySlug(slug: string): SectorPage | null {
  return SECTOR_PAGES[slug] || null;
}

export function getAllSectorSlugs(): string[] {
  return Object.keys(SECTOR_PAGES);
}
