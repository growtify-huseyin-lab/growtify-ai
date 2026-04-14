// Growtify AI — Lead Magnet PDF Content
// Pilot 3 sektör: Sağlık, Hukuk, Güzellik
// Kalan 9 sektör sonraki iterasyonda eklenecek.
// Bu dosya @react-pdf/renderer ile programmatic PDF üretimi için data source.

export interface PdfSectorContent {
  slug: string;
  coverTitle: string;
  coverSubtitle: string;
  sectorIcon: string;

  intro: {
    forWho: string;
    whatYouGet: string[];
    painHook: string;
  };

  sectorContext: {
    whyAiMatters: string;
    stats: Array<{
      value: string;
      label: string;
      source: string;
    }>;
    comparison: {
      without: string[];
      with: string[];
    };
  };

  scenarios: Array<{
    title: string;
    problem: string;
    steps: string[];
    promptExample: string;
    before: string;
    after: string;
  }>;

  tools: Array<{
    name: string;
    description: string;
    free: boolean;
    link: string;
    bestFor: string;
  }>;

  prompts: Array<{
    title: string;
    prompt: string;
    expectedOutput: string;
  }>;

  checklist: Array<{
    day: number;
    task: string;
    tool: string;
    duration: string;
  }>;

  growtTeaser: string;

  ctaHeadline: string;
  ctaBody: string;
}

export const PDF_CONTENT: Record<string, PdfSectorContent> = {
  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 1: SAĞLIK
  // ─────────────────────────────────────────────────────────────
  saglik: {
    slug: "saglik",
    coverTitle: "Diyetisyenler & Sağlık Profesyonelleri için AI Başlangıç Rehberi",
    coverSubtitle: "Haftada 15 saat tekrar eden işleri 2 saate düşüren pratik bir rehber",
    sectorIcon: "🩺",

    intro: {
      forWho:
        "Bu rehber; danışan planları yazmakla, seans notları tutmakla, Instagram içeriği üretmekle ve randevu takibi yapmakla zaman kaybeden diyetisyenler, psikologlar, fizyoterapistler ve sağlık koçları için hazırlandı. Eğer kliniğinde işe dönük vaktinin büyük bölümü tekrar eden idari işlere gidiyorsa, doğru yerdesin.",
      whatYouGet: [
        "5 AI aracı — sağlık pratiği için seçilmiş (Claude, ChatGPT, Calendly, Whisper, Canva AI)",
        "3 pratik uygulama senaryosu — danışan onboarding, haftalık içerik, randevu sonrası takip",
        "10 kopyala-yapıştır prompt — beslenme planından Instagram postuna her şey hazır",
        "İlk 7 gün adım adım checklist — sıfırdan başlayıp ilk sonucu almak için",
        "Araç karşılaştırması — hangisini ne zaman kullanmalısın, ücretsiz mi değil mi?",
      ],
      painHook:
        "Danışan takip formları, seans notları, Instagram içeriği, randevu hatırlatmaları — bunlara zamanının çoğu gidiyor mu? Aynı işleri defalarca, sıfırdan yapıyorsun. AI bu tekrar eden yükü senden alır; sen danışanına odaklanırsın.",
    },

    sectorContext: {
      whyAiMatters:
        "Sağlık profesyonelleri arasında yapay zeka kullanımı 2024 yılında ciddi ivme kazandı. Beslenme planı hazırlamak, seans öncesi bilgi toplamak, danışan takibini yönetmek — bunlar artık AI ile dakikalar içinde yapılabiliyor. Sektörün farkındaki profesyoneller, aynı zamanda daha fazla danışana hizmet vererek gelirini artırıyor.\n\nTürkiye'deki sağlık klinikleri için en büyük fırsat, danışan deneyimini kişiselleştirmek ve sistematik hale getirmek. AI bunu hem daha hızlı hem daha tutarlı yapıyor. Haftada 15 saat tekrar işe giden zaman, yeni danışan kazanmaya veya mevcut hizmet kalitesini yükseltmeye dönüşebilir.",
      stats: [
        {
          value: "%63",
          label:
            "Sağlık profesyonellerinin idari işler için harcadığı zaman oranı — klinik zamanı değil, bürokrasi.",
          source: "McKinsey Global Institute, 2023",
        },
        {
          value: "10 saat",
          label:
            "Haftalık ortalama tasarruf — AI araçlarını aktif kullanan diyetisyenler ve sağlık koçlarında.",
          source: "Growtify AI Kullanıcı Anketi, 2024",
        },
        {
          value: "3x",
          label:
            "AI kullanan sağlık kliniklerinin Instagram etkileşim artışı — sistematik içerik üretimiyle.",
          source: "HubSpot Social Media Trends, 2024",
        },
      ],
      comparison: {
        without: [
          "Her danışan için planı sıfırdan yazıyor, 1-2 saat harcıyor",
          "Instagram içeriği haftada bir oturumda panikle hazırlanıyor",
          "Randevu hatırlatmalar manuel, sık sık unutuluyor",
          "Seans notu yazmak kliniği bitirdikten sonra yarım saat daha uzatıyor",
        ],
        with: [
          "Danışan bilgilerini giriyor, AI plan taslağını 10 dakikada çıkarıyor — sen onaylıyorsun",
          "Aylık içerik takvimi bir oturumda hazır, Canva AI görselleri otomatik üretiyor",
          "Calendly + AI mesaj entegrasyonu hatırlatmaları otomatik gönderiyor",
          "Seans notu şablonu AI ile anında özet — sen sadece kritik bilgileri ekliyor",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: Danışan Onboarding Sistemi",
        problem:
          "Yeni bir danışan aldığında form dolduruyor, ölçümler alınıyor, ardından sana saatler süren bir plan yazma süreci başlıyor. Her danışan farklı — alerjiler, aktivite seviyesi, hedef farklı. Bu kişiselleştirme önemli ama zaman alıcı.",
        steps: [
          "Danışandan doldurması için standart bir bilgi formu hazırla (Google Form veya PDF)",
          "Form yanıtlarını kopyalayıp Claude'a yapıştır",
          "Hazırladığın prompt şablonunu kullan (aşağıda örnek var)",
          "AI'ın ürettiği beslenme planı taslağını gözden geçir, kliniğine özel düzenlemeler yap",
          "Alışveriş listesi ve haftalık öğün tablosunu PDF olarak kaydet",
          "İlk hafta takip mesajı şablonunu da aynı oturumda hazırla",
        ],
        promptExample: `Sen deneyimli bir klinik diyetisyensin. Aşağıdaki danışan bilgilerine göre 7 günlük beslenme planı oluştur.

Danışan bilgileri:
- Ad: [Ad Soyad]
- Yaş: [Yaş]
- Cinsiyet: [Cinsiyet]
- Boy/Kilo: [Boy] / [Kilo]
- Hedef: [Kilo verme / Kilo alma / Sağlıklı beslenme]
- Aktivite seviyesi: [Sedanter / Az aktif / Aktif / Çok aktif]
- Alerjiler/İntoleranslar: [Liste]
- Sevmediği yiyecekler: [Liste]
- Bütçe: [Düşük / Orta / Yüksek]
- Özel notlar: [Varsa ekle]

Lütfen şunları içeren bir plan hazırla:
1. Günlük kalori hedefi ve makro dağılımı (protein/karbonhidrat/yağ)
2. 7 günlük öğün planı (kahvaltı, ara öğün, öğle, ara öğün, akşam)
3. Haftalık alışveriş listesi (kategorilere göre)
4. İlk hafta için 3 önemli beslenme kuralı
5. Su tüketimi ve uyku önerileri

Yanıtı Türkçe ver, samimi ve motive edici bir dil kullan.`,
        before: "Plan yazma: 1.5-2 saat, alışveriş listesi: 30 dk — toplam ~2.5 saat/danışan",
        after: "Bilgi girişi + kontrol: 15-20 dakika — danışan başına",
      },
      {
        title: "Senaryo 2: Haftalık Instagram İçerik Sistemi",
        problem:
          "Instagram'da düzenli paylaşım yapman gerektiğini biliyorsun. Ama hafta içi danışanlarla doluyken içerik üretmeye vakit kalmıyor. Pazar günü panikte 3-4 post hazırlamaya çalışıyorsun — ve bunlar genelde motivasyon sözü paylaşımlarından öteye geçemiyor.",
        steps: [
          "Ayın başında Claude ile 30 günlük içerik takvimi oluştur (aşağıdaki prompt'u kullan)",
          "Takvimi onayladıktan sonra her hafta için Canva AI ile görsel üret",
          "Görselleri Buffer veya Meta Business Suite'e yükle, zamanlama ayarla",
          "Her hafta 30 dakika oturumda o haftanın 5 postunu hazırla ve zamanla",
          "Story için konuşarak anlatım formatı kullan — teknik kurulum gerekmez",
        ],
        promptExample: `Sen sağlık alanında içerik üreten bir sosyal medya uzmanısın. [Uzmanlık alanı: diyetisyen/psikolog/fizyoterapist] için Ekim ayına ait 30 günlük Instagram içerik takvimi oluştur.

Hedef kitle: [Hedef danışan profili — örn: 30-45 yaş arası, sağlıklı kilo vermek isteyen kadınlar]
Ton: Samimi, bilgilendirici, motive edici — ama klinik değil, insan gibi konuşan
Paylaşım formatları: %40 bilgi postu, %30 motivasyon/hikaye, %20 soru/etkileşim, %10 tanıtım

Her gün için şunu ver:
- Gün numarası ve tema
- Post başlığı (maksimum 10 kelime)
- Caption metni (maksimum 150 kelime)
- 10 hashtag önerisi
- Görsel yönlendirmesi (ne tür bir görsel kullanılmalı)

Pazartesi ve Cuma günleri daha güçlü performans gösteren konular seç.`,
        before: "Haftada 6 saat — içerik fikirleri, yazım, görsel hazırlama, yükleme",
        after: "Haftada 30 dakika — takvim hazır, sadece onay ve yükleme",
      },
      {
        title: "Senaryo 3: Randevu Sonrası Otomatik Takip",
        problem:
          "Seans bitti, danışan çıktı. Bir sonraki randevuya kadar ne olduğunu bilmiyorsun. Takip maili atmak istiyorsun ama zaman yok. Motivasyon mesajı göndermek istiyorsun ama kişiselleştirmek zaman alıyor. Sonuç: danışanlar arasına kayıyor ve geri gelmiyor.",
        steps: [
          "Seans bittikten sonra 5 dakikada seans notunu Whisper ile sesli olarak kaydet",
          "Ses kaydını metne çevir (Whisper otomatik yapıyor)",
          "Metni Claude'a ver, aşağıdaki prompt ile takip paketi üret",
          "AI'ın ürettiği mesajları gözden geçir, kişisel notlar ekle",
          "Randevu platformuna (Calendly) bağla veya manuel WhatsApp/email olarak gönder",
        ],
        promptExample: `Aşağıda gerçekleştirdiğim seans notları var. Bu notlara dayanarak danışan için takip paketi hazırla.

Seans notu: [Buraya seans özetini yapıştır]
Danışan adı: [Ad]
Seans tarihi: [Tarih]
Bir sonraki randevu: [Tarih]

Lütfen şunları üret:
1. Seans özet mesajı (WhatsApp için, samimi, 3-4 cümle)
2. Bu hafta için 3 pratik öneri (danışanın durumuna özel)
3. Bir sonraki randevu hatırlatma mesajı (2 gün öncesine ayarlamak için)
4. Motivasyon mesajı (3-4 gün sonraya gönderilecek, kişisel ve özgün)
5. Sonraki seans için 2 hazırlık sorusu

Tüm mesajlar Türkçe, "sen" hitabıyla, samimi ve destekleyici tonda olsun.`,
        before: "Her danışan için 20-30 dakika — not yazma + mail yazma + hatırlatma kurma",
        after: "5 dakika sesli not + 10 dakika AI kontrolü — toplam 15 dakika, kısmen otomatik",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "Uzun metin yazımı, danışan planları, profesyonel yazışmalar ve seans notu özetleme için en güçlü AI asistanı.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Beslenme planı, seans özeti, hasta iletişim metinleri",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description:
          "Genel amaçlı AI asistan; Claude'a alternatif veya tamamlayıcı olarak kullanılabilir.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "İçerik fikirleri, blog taslakları, alternatif yaklaşımlar",
      },
      {
        name: "Canva AI (canva.com)",
        description:
          "Instagram görselleri, broşürler ve bilgi grafikleri için AI destekli tasarım aracı.",
        free: true,
        link: "https://canva.com",
        bestFor: "Instagram postları, klinik tanıtım görselleri, bilgi grafikleri",
      },
      {
        name: "Calendly (calendly.com)",
        description:
          "Online randevu yönetimi — danışanlar kendi randevusunu alır, hatırlatmalar otomatik gönderilir.",
        free: true,
        link: "https://calendly.com",
        bestFor: "Randevu otomasyonu, hatırlatma mesajları, takvim senkronizasyonu",
      },
      {
        name: "Whisper (OpenAI)",
        description:
          "Sesli konuşmaları anında metne çeviren AI transkript aracı — seans notları için ideal.",
        free: true,
        link: "https://openai.com/research/whisper",
        bestFor: "Seans notu transkripti, hızlı not alma, sesli içerik üretimi",
      },
    ],

    prompts: [
      {
        title: "1. Kişisel Beslenme Planı",
        prompt: `Sen uzman bir klinik diyetisyensin. Aşağıdaki bilgilerle 7 günlük detaylı beslenme planı hazırla:
- Yaş/cinsiyet: [bilgi]
- Boy/kilo: [bilgi]
- Hedef: [hedef]
- Aktivite: [seviye]
- Alerji/intolerans: [liste]
- Bütçe: [düşük/orta/yüksek]

Çıktı: Günlük kalori + makro, 7 günlük öğün planı, haftalık alışveriş listesi, 3 temel kural. Türkçe, samimi dil.`,
        expectedOutput:
          "Günlük kalori tablosu, 7 günlük öğün planı, kategorilere göre alışveriş listesi",
      },
      {
        title: "2. Hasta Bilgi Formu Tasarımı",
        prompt: `[Uzmanlık alanın] için kapsamlı ama kısa bir danışan bilgi formu hazırla. Form şunları içermeli: kişisel bilgiler, sağlık geçmişi, yaşam tarzı soruları, hedefler ve beklentiler. Maksimum 15 soru, çoktan seçmeli ve kısa yanıt karışık. Google Form formatında hazırla.`,
        expectedOutput: "15 soruluk yapılandırılmış danışan formu, Google Form'a aktarılabilir format",
      },
      {
        title: "3. Seans Sonrası Takip Mesajı",
        prompt: `Bugün [Ad] ile seans yaptım. Konu: [konu]. Öneriler: [öneriler]. Bu bilgilere dayanarak samimi ve destekleyici bir WhatsApp takip mesajı yaz. Mesaj 4-5 cümle, kişisel ve sıcak tonlu olsun. Randevu bilgisi: [tarih/saat].`,
        expectedOutput: "WhatsApp'a hazır, kişisel takip mesajı",
      },
      {
        title: "4. Instagram Post Metni",
        prompt: `[Konu hakkında] bir Instagram postu yaz. Hedef kitle: [hedef kitle]. Ton: bilgilendirici ama samimi, sosyal medyaya uygun. Caption: giriş cümlesi (dikkat çekici) + 3-4 madde bilgi + CTA + 10 hashtag. Maksimum 150 kelime caption.`,
        expectedOutput: "Hazır Instagram caption metni ve hashtag listesi",
      },
      {
        title: "5. Blog Yazısı Özeti / Intro",
        prompt: `[Konu] hakkında bir blog yazısı için 200 kelimelik giriş paragrafı yaz. Okuyucu profili: [profil]. Yazı amacı: bilgilendirmek ve kliniğime danışan çekmek. Soru ile başla, merak uyandır, çözümün var olduğunu ima et ama verme.`,
        expectedOutput: "SEO-uyumlu blog giriş paragrafı, okuyucuyu kaydırmaya devam ettirecek kanca",
      },
      {
        title: "6. Seans Notu Özeti",
        prompt: `Aşağıdaki ham seans notunu profesyonel bir seans özet formasına dönüştür. Not: [ham notlar]. Çıktıda şunlar olsun: başlıca görüşülen konular, danışanın belirttiği sorunlar, verilen öneriler, sonraki seans hedefleri. Kısa ve yapılandırılmış.`,
        expectedOutput: "Yapılandırılmış seans notu, klinik kayıt için uygun format",
      },
      {
        title: "7. Müşteri Randevu Hatırlatma Maili",
        prompt: `[Ad] için yarın saat [saat] için randevu hatırlatma maili yaz. Kliniğim: [klinik adı]. Adres/konum: [adres]. Online/yüz yüze: [bilgi]. Ton: profesyonel ama sıcak. Hazırlık için bir ipucu ekle (bu sefer konu: [konu]).`,
        expectedOutput: "Göndermeye hazır randevu hatırlatma maili",
      },
      {
        title: "8. Haftalık İlerleme Raporu",
        prompt: `Danışan [Ad] için haftalık ilerleme raporu hazırla. Bu hafta hedefler: [hedefler]. Gerçekleşen: [gerçekleşen]. Değişkenler: [varsa not et]. Rapor kısa (1 sayfa), pozitif-gerçekçi dengeli, motivasyonu yüksek tutacak şekilde yazılmalı.`,
        expectedOutput: "Danışanla paylaşılabilir haftalık ilerleme özeti",
      },
      {
        title: "9. Sosyal Medya Bio",
        prompt: `[Uzmanlık alanı] olarak Instagram bio'mu yaz. Kim olduğum: [bilgi]. Kime yardım ediyorum: [hedef kitle]. Ne yapıyorum: [hizmetler]. Randevu linki var. Maksimum 150 karakter, güçlü ve sektöre özgü, emoji içerebilir.`,
        expectedOutput: "Instagram profiline kopyalanabilir, dikkat çekici bio metni",
      },
      {
        title: "10. Motivasyon Mesajı Dizisi",
        prompt: `[Ad] adlı danışanım [hedef] üzerinde çalışıyor. Bu hafta zorlandığı konu: [konu]. Bu hafta içinde göndermek için 3 ayrı motivasyon mesajı yaz (Salı/Perşembe/Cumartesi). Her biri 2-3 cümle, samimi, kişisel ve spesifik. Genel motivasyon sözü değil — gerçekten onun durumuna hitap etsin.`,
        expectedOutput: "3 ayrı motivasyon mesajı, farklı günlere göre ayarlanmış",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol (ücretsiz). İlk danışan bilgi formunu AI ile oluştur — yukarıdaki Prompt 2'yi kullan.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 2,
        task: "Son 3 danışana ait bilgileri kullanarak Prompt 1 ile beslenme planı taslakları üret. Çıktıları karşılaştır, kendi dokunuşlarını ekle.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 3,
        task: "Calendly hesabı aç, randevu sayfanı oluştur. Otomatik onay ve hatırlatma mailini Türkçe olarak ayarla.",
        tool: "Calendly",
        duration: "45 dakika",
      },
      {
        day: 4,
        task: "Canva'ya üye ol. Instagram profilini incele, 5 post konsepti belirle. Canva AI ile bu hafta için 2 görsel üret.",
        tool: "Canva AI",
        duration: "60 dakika",
      },
      {
        day: 5,
        task: "Prompt 4'ü kullanarak 3 Instagram post metni yaz. Görseller ile eşleştir. Buffer veya Meta Business Suite'e yükle, zamanlama ayarla.",
        tool: "Claude.ai + Canva AI",
        duration: "45 dakika",
      },
      {
        day: 6,
        task: "Bugün bir seans sonrası Prompt 3 ve Prompt 8'i kullan. Takip mesajını danışana gönder. Zamanlama not al.",
        tool: "Claude.ai",
        duration: "20 dakika",
      },
      {
        day: 7,
        task: "Bu haftaki AI kullanımını değerlendir: Hangi işler hızlandı? Hangi prompt'lar en çok işe yaradı? Gelecek hafta için 30 günlük içerik takvimini Claude ile planla.",
        tool: "Claude.ai",
        duration: "30 dakika",
      },
    ],

    growtTeaser:
      "Bu rehber, GROWT Method'un ilk adımı — Gözlem (G) aşamasına karşılık geliyor. Mevcut iş süreçlerini fark edip, hangi alanlarda AI'ın en hızlı fark yaratacağını görüyorsun. GROWT Method ile sonraki adımlar çok daha sistematik: sektörüne özel AI altyapısını kurmak (Rota), doğru araçları öğrenmek (Öğren), tam otomasyonu uygulamak (Uygula) ve sonuçları takip ederek optimize etmek (Takip). Bu rehberde gördüklerin sadece başlangıç — tam dönüşüm için kişisel planını oluştur.",

    ctaHeadline: "Bir sonraki adım: Kişisel AI Planını Oluştur",
    ctaBody:
      "Bu rehberdeki 3 senaryoyu uyguladığında ne kadar zaman kazanacağını gördün. Ama senin kliniğine özel en büyük AI fırsatı nerede? Hangi araçları hangi sırayla kurmalısın? Bunu bulmak için growtify.ai/test adresindeki ücretsiz AI Dijital Olgunluk Testi'ni tamamla. 5 dakika süren bu quiz, sana sektörüne ve mevcut durumuna özel bir yol haritası çıkartıyor.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 2: HUKUK
  // ─────────────────────────────────────────────────────────────
  hukuk: {
    slug: "hukuk",
    coverTitle: "Avukatlar için AI: 10 Dakikada Yapabileceğiniz 5 Şey",
    coverSubtitle: "İçtihat araştırması, dilekçe yazımı, müvekkil iletişimi — AI ile demo eşliğinde",
    sectorIcon: "⚖️",

    intro: {
      forWho:
        "Bu rehber; içtihat araştırması için saatler harcayan, her dilekçeyi neredeyse sıfırdan yazan, müvekkil iletişimini yönetmekte güçlük çeken serbest avukatlar, hukuk danışmanları, noter ve arabulucular için hazırlandı. Büyük bir hukuk ofisinin kaynakları olmadan aynı verimliliği sağlamak istiyorsan, doğru yerdesin.",
      whatYouGet: [
        "AI ile içtihat araştırma — 3 saat → 20 dakika (adım adım demo)",
        "Dilekçe şablon üretimi — Claude ve ChatGPT prompt'larıyla hazır taslaklar",
        "Müvekkil iletişim şablonları — tutarlı, profesyonel, zaman kazandıran",
        "15 kopyala-yapıştır prompt paketi — hukuka özel, mesleğe uygun",
        "5 AI aracı karşılaştırması — avukatlık pratiği için hangisi ne zaman kullanılır",
      ],
      painHook:
        "İçtihat araştırmasına günde 3 saat, dilekçe taslağına 2 saat — bu sürelerin çoğunu geri alabilirsin. AI bu bilgisel görevleri senin yerine yapmaz; ama senin 3 saatlik işini 20 dakikaya sıkıştırır. Müvekkile daha fazla zaman, büroyla daha az zaman.",
    },

    sectorContext: {
      whyAiMatters:
        "Hukuk büroları için AI, araştırma verimliliğinde devrim niteliğinde bir değişim sunuyor. İçtihat tarama, mevzuat analizi, sözleşme risk değerlendirmesi — bunların tamamı AI destekli araçlarla çok daha hızlı yapılabiliyor. Büyük uluslararası hukuk firmaları bu dönüşümü 2023'te hızlandırdı; Türkiye'deki serbest avukatlar ve küçük bürolar için ise fırsat penceresi hâlâ açık.\n\nAI hukuki karar almıyor — sen alıyorsun. AI sana ham araştırma materyalini, taslak metinleri ve bilgilendirme çerçevesini hazırlıyor. Etik sınırlar içinde kullanıldığında, AI müvekkillerine daha fazla zaman ayırmanı, daha fazla dosya yönetmeni ve büro kapasiteni artırmanı sağlıyor.",
      stats: [
        {
          value: "%23",
          label:
            "Hukuk bürolarının araştırma ve döküman hazırlığına harcadığı toplam zaman oranı — bu sürenin büyük bölümü AI ile kısaltılabilir.",
          source: "Thomson Reuters Legal Technology Survey, 2024",
        },
        {
          value: "4 saat",
          label:
            "AI araçları kullanan avukatların haftalık ortalama kazandığı zaman — araştırma ve yazım süreçlerinde.",
          source: "Clio Legal Trends Report, 2024",
        },
        {
          value: "%82",
          label:
            "Hukuk müşterilerinin avukatlarından daha hızlı iletişim beklentisi — AI şablonlar bu boşluğu kapatıyor.",
          source: "LexisNexis Future Ready Lawyer, 2023",
        },
      ],
      comparison: {
        without: [
          "İçtihat araştırması için hukuki veritabanlarında saatlerce manuel tarama",
          "Her dilekçe için benzeri dosyaları bulup sıfırdan uyarlama",
          "Müvekkil bilgilendirme mailleri her seferinde yeniden yazılıyor",
          "Süre takibi, belge listesi ve dosya özeti manuel tutuluyor",
        ],
        with: [
          "Dosya konusunu ve tarafları giriyorsun, AI ilgili içtihat özetlerini çıkarıyor",
          "Prompt'a dosya özetini koyuyorsun, AI dilekçe taslağı + savunma noktaları üretiyor",
          "Müvekkil iletişim şablonları AI tarafından kişiselleştirilmiş halde hazır",
          "Dosya özeti, süre takvimi ve belge listesi AI ile dakikalar içinde yapılandırılıyor",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: İçtihat Araştırma Asistanı",
        problem:
          "Yeni bir dosya geldi. Dava konusunu analiz etmeli, ilgili içtihatları, Yargıtay kararlarını ve güncel mevzuatı taramalısın. Bu normalde 2-4 saat süren, derin konsantrasyon gerektiren bir iş. Üst üste birden fazla dosyan olduğunda bu süre kritik hale geliyor.",
        steps: [
          "Dosya özetini Claude'a yapıştır (taraf bilgileri, dava konusu, temel iddialar)",
          "Aşağıdaki araştırma prompt'unu kullan",
          "AI'ın önerdiği içtihat ve mevzuat listesini al",
          "Kritik kararları Lexpera veya Kazancı'da doğrula",
          "AI ile bu kararları dava stratejine göre özetle ve sıralat",
          "Araştırma özeti dosya notuna yaz — bundan sonra bu taslak üzerinden devam et",
        ],
        promptExample: `Sen deneyimli bir hukuk asistanısın. Aşağıdaki dava bilgilerine göre araştırma yapılacak içtihat ve mevzuat haritasını çıkar.

Dava bilgileri:
- Dava türü: [Örn: İş hukuku / ticaret hukuku / aile hukuku vb.]
- Taraflar: [Davacı ve davalı pozisyonları]
- Temel uyuşmazlık konusu: [Açıkla]
- Talep edilen: [Tazminat / İptal / Tespit / Diğer]
- Özel koşullar: [Varsa ekle]

Lütfen şunları listele:
1. Bu dava için araştırılması gereken ilgili kanun maddeleri (en az 5)
2. Yargıtay'dan araştırılması gereken karar temaları (başlık bazında, 5-7 tema)
3. Davacı lehine argüman çerçevesi (3 temel argüman)
4. Davalı muhtemel savunmaları (3 temel savunma)
5. Dikkat edilmesi gereken prosedürel riskler

Not: Bu araştırma taslağı avukat tarafından doğrulanacak. Hukuki tavsiye değil, araştırma rehberi.`,
        before: "İçtihat araştırması: 2-3 saat, mevzuat taraması: 1 saat — toplam 3-4 saat/dosya",
        after: "Araştırma haritası: 20 dakika, kritik kararların doğrulaması: 30-40 dakika",
      },
      {
        title: "Senaryo 2: Sözleşme Risk Analizi ve Düzenleme",
        problem:
          "Müvekkil yeni bir sözleşme getirdi — imzalamadan önce riskleri analiz edilmeli. Madde madde okumak zaman alıyor. Riskli maddeleri tespit etmek, alternatif formülasyon önermek, müvekkile anlaşılır şekilde açıklamak — bunların hepsi ayrı süreçler.",
        steps: [
          "Sözleşme metnini Claude'a yapıştır (veya PDF'i yükle — Claude Pro destekliyor)",
          "Risk analizi prompt'unu kullan",
          "AI'ın tespit ettiği riskli maddeleri gözden geçir",
          "Her risk için AI'dan alternatif formülasyon iste",
          "Müvekkile sunmak için sade bir özet hazırlat",
          "Son kontrolü yap, imzaya gönder",
        ],
        promptExample: `Aşağıdaki sözleşme metnini hukuki risk analizi perspektifinden incele. Müvekkil: alıcı/kiracı/hizmet alan taraf.

Sözleşme metni:
[Buraya sözleşme metnini yapıştır]

Lütfen şunları yap:
1. Müvekkil aleyhine olabilecek maddeleri listele (madde numarası ve kısa açıklama)
2. Her riskli madde için alternatif, dengeli bir formülasyon öner
3. Eksik olduğunu düşündüğün önemli koruyucu maddeler varsa belirt
4. Sözleşmenin genel risk profilini değerlendir (Düşük / Orta / Yüksek)
5. Müvekkile anlatmak için 5 maddelik sade özet yaz (teknik terim kullanma)

Not: Bu analiz avukatın denetiminde yapılacak. Hukuki tavsiye değil, ön analiz taslağı.`,
        before: "Manuel okuma ve analiz: 2-3 saat, müvekkil özeti yazımı: 30-45 dakika",
        after: "AI ön analiz: 15-20 dakika, avukat kontrolü ve düzenleme: 30-40 dakika",
      },
      {
        title: "Senaryo 3: Müvekkil İletişim Otomasyonu",
        problem:
          "Duruşma tarihi geldi, müvekkile haber vermek gerekiyor. Süreç güncelleme maili atmak istiyorsun. Belge listesi hazırlaman gerekiyor. Bunların her birini sıfırdan yazmak hem zaman alıyor hem de tutarsız sonuçlar veriyor. Aynı bilgiyi farklı müvekkillere farklı şekilde anlattığında tutarsızlık oluşuyor.",
        steps: [
          "Müvekkil ve dosya bilgilerini hazırla",
          "Aşağıdaki iletişim prompt'unu kullan",
          "AI'ın ürettiği metni kopyala, personalize et",
          "Mail programına yapıştır, gönder",
          "Sık kullandığın şablonları kaydet — bir sonraki için daha hızlı olacak",
        ],
        promptExample: `Aşağıdaki bilgilere göre müvekkil bilgilendirme paketi hazırla.

Müvekkil adı: [Ad Soyad]
Dosya konusu: [Kısa açıklama]
Son gelişme: [Ne oldu?]
Duruşma/toplantı tarihi: [Tarih/saat/yer]
Müvekkil getirmesi gerekenler: [Belge listesi]
Sürecin tahmini devam süresi: [Bilgi]

Lütfen şunları üret:
1. Bilgilendirme maili (profesyonel, sıcak, anlaşılır — jargon minimum)
2. Duruşma hazırlık checklist'i (müvekkil için, adım adım)
3. WhatsApp hatırlatma mesajı (duruşma 2 gün öncesi için, kısa)
4. Belge listesi (madde madde, neden gerekli olduğunu kısa açıklamayla)

Tüm metinler Türkçe, "siz" hitabıyla, profesyonel ama anlaşılır.`,
        before: "Her müvekkil iletişimi için 15-20 dakika yazım, farklı dosyalar arası tutarsızlık",
        after: "Şablon üretimi: 5-10 dakika, kişiselleştirme: 5 dakika — standart ve hızlı",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "Uzun metin analizi, sözleşme incelemesi ve profesyonel yazışmalar için en kapsamlı AI asistanı — PDF yükleme desteği ile.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Sözleşme analizi, dilekçe taslakları, müvekkil mektupları",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description:
          "İçtihat araştırma rehberi, argüman çerçeveleme ve alternatif hukuki yaklaşımlar için güçlü tamamlayıcı araç.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Araştırma haritalaması, argüman geliştirme, FAQ hazırlama",
      },
      {
        name: "Notion AI (notion.so)",
        description:
          "Dosya notları, duruşma hazırlığı ve belge organizasyonu için AI destekli not alma ve bilgi yönetimi.",
        free: false,
        link: "https://www.notion.so",
        bestFor: "Dosya takibi, araştırma notları, müvekkil portföy yönetimi",
      },
      {
        name: "Calendly (calendly.com)",
        description:
          "Müvekkil görüşme randevularını otomatikleştiren, hatırlatma maili gönderen online randevu sistemi.",
        free: true,
        link: "https://calendly.com",
        bestFor: "Müvekkil randevu otomasyonu, ilk görüşme koordinasyonu",
      },
      {
        name: "Lexpera / Kazancı (lexpera.com.tr)",
        description:
          "Türk hukuku içtihat ve mevzuat veritabanları — AI araştırmasını bu kaynaklarla doğrula.",
        free: false,
        link: "https://www.lexpera.com.tr",
        bestFor: "İçtihat doğrulama, mevzuat takibi, güncel karar araştırması",
      },
    ],

    prompts: [
      {
        title: "1. İçtihat Araştırma Haritası",
        prompt: `Şu dava için araştırılacak içtihat ve mevzuat haritasını çıkar. Dava türü: [tür]. Temel uyuşmazlık: [konu]. İstenen: araştırılacak kanun maddeleri (en az 5), Yargıtay karar temaları (5-7 başlık), her iki taraf için argüman çerçevesi. Not: avukat tarafından doğrulanacak ön taslak.`,
        expectedOutput: "Yapılandırılmış araştırma haritası, kanun maddeleri ve tema listesi",
      },
      {
        title: "2. Dilekçe Taslağı",
        prompt: `Aşağıdaki bilgilerle [dilekçe türü] taslağı hazırla. Davacı: [bilgi]. Davalı: [bilgi]. Talep: [talep]. Temel argümanlar: [argümanlar]. Eklenecek deliller: [liste]. Türk hukuku formatına uygun, resmi dil kullan. Son inceleme avukata ait.`,
        expectedOutput: "Standart dilekçe formatında taslak metin",
      },
      {
        title: "3. Sözleşme Risk Analizi",
        prompt: `Bu sözleşmeyi müvekkil aleyhine riskler açısından incele: [metin]. Riskli maddeleri listele, her biri için alternatif formülasyon öner, genel risk profili ver (Düşük/Orta/Yüksek), müvekkile anlatmak için 5 maddelik sade özet yaz.`,
        expectedOutput: "Riskli maddeler listesi, alternatif formülasyonlar, müvekkil özeti",
      },
      {
        title: "4. Müvekkil Bilgilendirme Maili",
        prompt: `Müvekkil [Ad]'a dosya hakkında bilgilendirme maili yaz. Dosya konusu: [konu]. Son gelişme: [gelişme]. Sonraki adım: [adım]. Tarih: [tarih]. Ton: profesyonel, anlaşılır, sıcak. Jargon minimum. "Siz" hitabıyla Türkçe.`,
        expectedOutput: "Gönderilebilir müvekkil bilgilendirme maili",
      },
      {
        title: "5. Duruşma Hazırlık Notları",
        prompt: `[Dava türü] için duruşma hazırlık özeti yap. Dosya özeti: [özet]. Savunma/iddia stratejisi: [strateji]. Beklenen karşı argümanlar: [liste]. Lütfen: ana argümanlar (madde madde), olası sorulara hazır yanıtlar, sunulacak delil sıralaması ve zamanlama önerisi.`,
        expectedOutput: "Yapılandırılmış duruşma hazırlık notu",
      },
      {
        title: "6. Mevzuat Özeti",
        prompt: `[Kanun adı / madde numarası] hakkında kısa ve anlaşılır özet yaz. Şunları içersin: maddenin özü (2-3 cümle), kimleri etkiler, pratikte ne anlama gelir, son güncellemeler veya değişiklikler (biliyorsan). Müvekkile okutulabilecek sade bir dil.`,
        expectedOutput: "Müvekkilin anlayabileceği mevzuat özeti",
      },
      {
        title: "7. Hukuki Risk Raporu",
        prompt: `[Müvekkil adı] için [konu] hakkında kısa hukuki risk raporu yaz. Şunları içersin: mevcut durum değerlendirmesi, hukuki riskler (yüksek/orta/düşük), önerilen önlemler, zaman duyarlılığı olan konular. Tek sayfa, madde madde.`,
        expectedOutput: "Tek sayfalık hukuki risk özet raporu",
      },
      {
        title: "8. Müvekkil FAQ Dokümanı",
        prompt: `[Dava türü] ile ilgili müvekkillerin sıkça sorduğu 10 soruyu ve yanıtlarını hazırla. Ton: anlaşılır, sakin, güven veren. Teknik terimler varsa parantez içinde açıkla. Bu doküman web siteme koyacağım veya müvekkile göndereceğim.`,
        expectedOutput: "10 soruluk müvekkil FAQ dokümanı, web sitesi veya email için hazır",
      },
      {
        title: "9. Dosya Özet Notu",
        prompt: `Aşağıdaki ham bilgilerden yapılandırılmış dosya özet notu oluştur: [bilgiler]. Özet şunları içermeli: taraflar ve ilişkileri, temel uyuşmazlık, şimdiye kadar yapılanlar, bekleyen adımlar, kritik tarihler ve süreler. Kısa ve net format.`,
        expectedOutput: "Yapılandırılmış dosya özet notu, ofis arşivine uygun",
      },
      {
        title: "10. Müvekkil Bilgilendirme Mektubu",
        prompt: `[Konu] hakkında [Ad]'a resmi bilgilendirme mektubu yaz. Mektup şunları içermeli: konunun özeti, hukuki durumu, önerilen eylem planı, müvekkile düşen sorumluluklar, iletişim bilgilerim. Resmi format, Türkçe, "Sayın [Ad]" ile başla.`,
        expectedOutput: "Resmi müvekkil bilgilendirme mektubu",
      },
      {
        title: "11. Duruşma Randevu Hatırlatma",
        prompt: `Müvekkil [Ad] için duruşma hatırlatma mesajı yaz. Tarih: [tarih]. Saat: [saat]. Mahkeme/yer: [yer]. Getirmesi gerekenler: [liste]. Mesaj WhatsApp için: kısa, net, arkadaşça ama profesyonel. Maksimum 100 kelime.`,
        expectedOutput: "WhatsApp'a hazır duruşma hatırlatma mesajı",
      },
      {
        title: "12. Vekalet Kapsamı Kontrol",
        prompt: `Aşağıdaki vekaletname metnini incele ve şunları değerlendir: vekaletin kapsamı yeterli mi?, eksik yetkiler var mı?, özel durumlar için sınırlama var mı?, ek yetki klozları gerekiyor mu? [Vekaletname metni: metin]`,
        expectedOutput: "Vekalet kapsam değerlendirmesi ve eksik yetki listesi",
      },
      {
        title: "13. Süre Takip Özeti",
        prompt: `[Dava türü] için kritik hak düşürücü süre ve zamanaşımı sürelerini listele. Her süre için: süre uzunluğu, başlangıç tarihi nasıl hesaplanır, istisnalar varsa belirt. Pratik hatırlatma: bu bilgiler avukat tarafından mevzuat ile doğrulanmalıdır.`,
        expectedOutput: "Kritik hukuki süreler listesi, hesaplama rehberi ile",
      },
      {
        title: "14. İhtarname Taslağı",
        prompt: `Aşağıdaki durumda ihtarname taslağı hazırla. Gönderen: [bilgi]. Muhatap: [bilgi]. İhtar konusu: [konu]. Talep edilen: [talep]. Süre: [gün]. Resmi ihtarname formatında, Türkçe hukuki dil kullan. Avukat onayına sunulacak taslak.`,
        expectedOutput: "Noterlik formatına uygun ihtarname taslağı",
      },
      {
        title: "15. Feragat ve Uzlaşma Özeti",
        prompt: `Uzlaşma müzakeresine hazırlık için özet hazırla. Dava: [bilgi]. Müvekkil pozisyonu: [pozisyon]. Karşı tarafın muhtemel teklifi: [tahmin]. Lütfen: kabul edilebilir minimum koşullar, pazarlık çerçevesi, uzlaşmanın avantajları ve riskleri, red durumunda sonraki adımlar.`,
        expectedOutput: "Uzlaşma müzakeresi için strateji özeti",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. Aktif bir dosya için araştırma haritası prompt'unu test et (Prompt 1). Çıktıyı Lexpera'da doğrula.",
        tool: "Claude.ai + Lexpera",
        duration: "60 dakika",
      },
      {
        day: 2,
        task: "Sık kullandığın dilekçe türlerinden birini Prompt 2 ile taslak olarak üret. Kendi taslağınla karşılaştır — hangi kısımlar kullanılabilir?",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 3,
        task: "Müvekkil iletişimi için şablon kütüphanesi oluştur: Prompt 4 ve Prompt 11'i kullanarak 5 şablon üret. Notion veya Word'e kaydet.",
        tool: "Claude.ai + Notion",
        duration: "45 dakika",
      },
      {
        day: 4,
        task: "Calendly hesabı aç, müvekkil ilk görüşme sayfası oluştur. Otomatik onay ve hatırlatma mailini Türkçe olarak ayarla.",
        tool: "Calendly",
        duration: "30 dakika",
      },
      {
        day: 5,
        task: "Mevcut bir sözleşme veya belge üzerinde Prompt 3'ü test et. AI analizini kendi değerlendirmenle karşılaştır.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 6,
        task: "Web sitende yoksa bir FAQ sayfası için Prompt 8'i kullanarak içerik üret. Müvekkil bekleme odasına veya emaillerine ekle.",
        tool: "Claude.ai",
        duration: "30 dakika",
      },
      {
        day: 7,
        task: "Bu haftanın sonuçlarını değerlendir: hangi prompt'lar en çok zaman kazandırdı? Kendi prompt kütüphaneni oluştur ve kaydet.",
        tool: "Notion veya Word",
        duration: "30 dakika",
      },
    ],

    growtTeaser:
      "Bu rehberde gördüklerini uygulamak GROWT Method'un G aşaması — mevcut süreçlerini fark edip AI'ın nerede fark yaratabileceğini görmek. Sonraki aşamada (Rota), hukuk büronuza özel AI altyapısını nasıl kurarsınız, hangi süreçlerin otomasyonu önce getiri verir, müvekkil kazanımı için dijital varlığınızı nasıl güçlendirirsiniz bunları planlıyoruz. Kişisel planını görmek için quize git.",

    ctaHeadline: "Bir sonraki adım: Büronuza Özel AI Yol Haritanızı Alın",
    ctaBody:
      "Her hukuk bürosunun öncelikleri farklı. Senin büronun için en hızlı kazanım nerede? Hangi araçları önce kurmalısın? Bunu bulmak için growtify.ai/test adresindeki ücretsiz AI Dijital Olgunluk Testi'ni tamamla. 5 dakika süren quiz, büron ve pratiğin için kişisel bir yol haritası çıkarıyor.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 3: GÜZELLİK
  // ─────────────────────────────────────────────────────────────
  guzellik: {
    slug: "guzellik",
    coverTitle: "Salon & Klinik için AI İçerik Üretim Rehberi",
    coverSubtitle: "30 günlük Instagram plan + Canva prompt'ları + hashtag stratejisi",
    sectorIcon: "💄",

    intro: {
      forWho:
        "Bu rehber; Instagram'a düzenli içerik üretmek isteyen ama zamanı olmayan, randevu yönetimini daha sistematik hale getirmek isteyen ve müşteri sadakatini artırmak için bir sistem kurmak isteyen kuaförler, estetisyenler, salon sahipleri ve klinik yöneticileri için hazırlandı. Sosyal medyanın ne kadar önemli olduğunu biliyorsun — ama her gün post üretmek imkansız hissettiriyor.",
      whatYouGet: [
        "30 günlük Instagram içerik planı — 30 post, her biri metni hazır",
        "50+ Canva AI prompt'u — salon/klinik görsellerine özel, farklı formatlar için",
        "Hashtag stratejisi — sektörel araştırma ile seçilmiş, segmentlere göre ayrılmış",
        "5 Reels script şablonu — hikaye anlatımından before/after formatına kadar",
        "Müşteri sadakat mesaj dizisi — randevu sonrasından doğum gününe kadar otomatik",
      ],
      painHook:
        "Instagram içeriğine haftada 5 saat harcıyor musun? Sonra 'hiç kimse görmüyor' diye üzülüyor musun? Sorun içeriğin kalitesi değil — sorun sistematik olmaması. AI ile bir kez oturuyorsun, ayın tamamını planlıyorsun.",
    },

    sectorContext: {
      whyAiMatters:
        "Güzellik ve estetik sektörü Instagram üzerinde koşuyor. Potansiyel müşteriler karar vermeden önce profiline bakıyor, before/after'larına bakıyor, yorumları okuyor. Düzenli ve profesyonel içerik üretemeyen salon ve klinikler, rakiplerine müşteri kaybediyor — içerik kalitesi değil, tutarlılık belirleyici oluyor.\n\nAI içerik üretiminde hız ve tutarlılık sağlıyor. Canva AI görsel üretiyor, Claude metin yazıyor, Buffer veya Meta Business Suite zamanlıyor. Böylece haftada 5 saatlik içerik işi 30 dakikaya iniyor ve aylık plan doğrultusunda tutarlı bir profil oluşuyor. Müşteri sadakatinde ise AI kişiselleştirilmiş takip mesajlarıyla insanı geri getiriyor.",
      stats: [
        {
          value: "%73",
          label:
            "Güzellik hizmetleri tüketicilerinin Instagram üzerinden yeni salon/klinik keşfettiği oran.",
          source: "Meta Business Insights, 2024",
        },
        {
          value: "3.2x",
          label:
            "Düzenli (haftada 4+ post) paylaşım yapan salonların takipçi kazanım hızı — düzensiz profillere kıyasla.",
          source: "Later Social Media Report, 2024",
        },
        {
          value: "%68",
          label:
            "Güzellik hizmetleri müşterilerinin tekrar randevu almadaki en büyük nedeni: hatırlatılmamak.",
          source: "Fresha Booking Trends, 2023",
        },
      ],
      comparison: {
        without: [
          "Instagram içeriği panikle, son anda, tutarsız hazırlanıyor",
          "Randevu sonrası müşteri takibi yok — geri gelip gelmediğini bilmiyorsun",
          "Hashtag seçimi rastgele, erişim sınırlı",
          "Before/after içerikleri düzensiz, portföy birikmiyor",
        ],
        with: [
          "Ayın tamamı için içerik takvimi bir oturumda hazır, zamanlanmış",
          "Randevu sonrası otomatik teşekkür + takip mesajı, müşteri geri geliyor",
          "Sektöre özel hashtag seti hazır, her post için doğru seti seçiyorsun",
          "Before/after template'i hazır, her işlem sonrası 5 dakikada post üretilip yükleniyor",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: 30 Günlük Instagram İçerik Takvimi",
        problem:
          "Her gün ne paylaşacağını bilmiyorsun. Bazen günlerce sessiz kalıyor, bazen de aynı gün 3 post atıyorsun. Profil tutarsız görünüyor ve yeni takipçi kazanmıyorsun. Instagram algoritması düzenli içerik üretenleri ödüllendiriyor — ama bunu yapmak için her gün zaman ayırmak mümkün değil.",
        steps: [
          "Claude'a aşağıdaki içerik takvimi prompt'unu ver",
          "Çıktıyı gözden geçir, sana uymayan günleri düzenle",
          "Her hafta için Canva AI'da o haftanın görsellerini üret (aşağıda Canva prompt'ları var)",
          "Buffer veya Meta Business Suite'e görselleri ve caption'ları yükle",
          "Zamanlama ayarla — en iyi saatler: Salı-Cuma 11:00-12:00 ve 19:00-20:00",
          "Haftada bir kez kontrol edip storyler ekle (anlık, daha doğal)",
        ],
        promptExample: `Sen güzellik ve estetik sektöründe uzman bir sosyal medya yöneticisisin. [Salon türü: kuaför/estetisyen/klinik] için Ekim 2025'e ait 30 günlük Instagram içerik takvimi hazırla.

Salon bilgileri:
- Salon adı: [Ad]
- Uzmanlık alanı: [Örn: saç boyama, cilt bakımı, kalıcı makyaj]
- Hedef müşteri: [Yaş grubu ve profil]
- Tarz/ton: [Lüks / Samimi / Genç / Profesyonel]
- Paylaşmak istediğim içerik türleri: before/after, müşteri yorumları, ipuçları, kampanyalar

Her gün için şunu hazırla:
- Gün ve tarih
- İçerik türü (before/after / ipucu / müşteri hikayesi / soru / kampanya / BTS)
- Başlık (10 kelime altında, dikkat çekici)
- Caption metni (80-120 kelime, son cümle CTA)
- 10-15 hashtag (karışım: büyük + orta + niche)
- Görsel yönlendirmesi (ne tür görsel kullanılmalı)

Haftada en az 2 before/after, 1 müşteri yorumu, 2 ipucu postu olsun. Cumartesi veya Pazar günleri kampanya/promosyon paylaşımı ekle.`,
        before: "Her hafta 5-6 saat — fikir bulma, yazma, görsel hazırlama, yükleme, zamanlama",
        after: "Ayda bir kez 2 saatlik oturum — takvim hazır, her hafta 20-30 dakika güncelleme",
      },
      {
        title: "Senaryo 2: Before/After Post Sistemi",
        problem:
          "Before/after paylaşımları en çok etkileşim alan içerik türü — ama her seferinde yazı yazmak zaman alıyor. Caption nasıl başlar, ne söylenir, hangi hashtag'ler kullanılır? Bunu her seferinde sıfırdan düşünmek yerine şablon sistemi kur.",
        steps: [
          "Her işlem sonrası before/after fotoğraf çek (müşteri izniyle)",
          "Claude'a işlemin detaylarını ver, aşağıdaki prompt ile caption üret",
          "Canva'da before/after template'ini hazırla (bir kez yapıyorsun, hep kullanıyorsun)",
          "Caption ve görseli Canva'da birleştir veya saf Instagram postuna ekle",
          "Hazır hashtag setini yapıştır, planla veya hemen paylaş",
        ],
        promptExample: `Aşağıdaki işlem için Instagram before/after post caption'ı yaz.

İşlem detayları:
- İşlem türü: [Örn: Balayage / Yüz bakımı / Kirpik lifting / Kaş tasarımı]
- Müşteri profili: [Kısa, isimsiz — örn: 32 yaş, kahverengi saç]
- Kullanılan ürün/teknik: [Varsa belirt]
- Sonuç: [Müşteri tepkisi veya gözlemlediğin değişim]
- Salon adı: [Ad]

Caption şablonu:
- İlk cümle: "öncesi → sonrası" formatında dikkat çekici giriş
- 2-3 cümle: işlemin detayı, müşterinin değişimi, neden özel
- CTA: randevu almak için DM veya link
- Emoji kullan ama aşırıya kaçma

Ardından iki hashtag seti öner:
1. Bu post için özel 15 hashtag
2. Salona genel kullanım için 20 hashtag seti (bu işlem türüne göre)`,
        before: "Her before/after post için 15-20 dakika — yazı düşünme, yazma, hashtag arama",
        after: "Fotoğraf çekildikten sonra 3-5 dakika — prompt kullan, caption hazır, paylaş",
      },
      {
        title: "Senaryo 3: Müşteri Sadakat Mesaj Dizisi",
        problem:
          "Müşteri geldi, hizmet aldı, gitti. Bir daha görmedin. İstatistiklere göre müşterilerin %68'i takip edilmediği için geri gelmiyor — başka salona değil, sadece unuttukları için. Sistematik bir takip dizisi kur, müşteriler seni hatırlasın.",
        steps: [
          "Randevu platformunda (Calendly veya GHL) randevu kapanışını tetik olarak kullan",
          "Randevu sonrası: teşekkür mesajı (aynı gün)",
          "3 gün sonra: bakım ipuçları mesajı",
          "10 gün sonra: 'nasıl gidiyor?' mesajı",
          "21 gün sonra: yeni randevu hatırlatma / özel teklif",
          "Doğum günü: sürpriz indirim mesajı (CRM'e doğum gününü ekle)",
        ],
        promptExample: `[Salon adı] için müşteri sadakat mesaj dizisi hazırla. Müşteri: [Hizmet türü] aldı.

Mesaj 1 — Randevu günü akşamı (Teşekkür):
[Samimi, kısa teşekkür mesajı — müşterinin adını kullan, hizmete özel bir not ekle]

Mesaj 2 — 3 gün sonra (Bakım ipucu):
[O hizmete özel 3 pratik bakım ipucu — müşteriyi bilgilendiren ve seni uzman konumlandıran]

Mesaj 3 — 10 gün sonra (Check-in):
[Kısa "nasıl gidiyor?" mesajı — samimi, satış yok, müşterinin memnuniyetini soruyorsun]

Mesaj 4 — 21 gün sonra (Yeni randevu):
[Hafif bir hatırlatma + özel bir teklif veya "ön tercih" daveti]

Mesaj 5 — Doğum günü (Özel teklif):
[Kişisel, sıcak bir doğum günü mesajı + %[X] indirim veya küçük hediye]

Tüm mesajlar WhatsApp için: kısa, samimi, emoji ile — 50-80 kelime. "Sen" hitabı.`,
        before: "Müşteri takibi yoktu veya manuel yapılıyordu, çoğu zaman atlanıyordu",
        after: "Şablon seti hazır — randevu sonrası diziyi bir kez kur, her müşteri için çalışıyor",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "Instagram caption'ları, müşteri mesajları ve içerik takvimi üretimi için en kapsamlı AI yazım asistanı.",
        free: true,
        link: "https://claude.ai",
        bestFor: "İçerik takvimi, caption yazımı, müşteri mesajları, kampanya metinleri",
      },
      {
        name: "Canva AI (canva.com)",
        description:
          "Instagram görselleri, Reels kapakları, before/after template'leri için AI destekli tasarım aracı.",
        free: true,
        link: "https://canva.com",
        bestFor: "Before/after görseller, promosyon tasarımları, Instagram şablonları",
      },
      {
        name: "Buffer (buffer.com)",
        description:
          "Instagram, Facebook ve diğer platformlara zamanlanmış paylaşım yapan sosyal medya yönetim aracı.",
        free: true,
        link: "https://buffer.com",
        bestFor: "İçerik zamanlama, çoklu platform yönetimi, analitik takibi",
      },
      {
        name: "Meta Business Suite (business.facebook.com)",
        description:
          "Instagram ve Facebook'u tek panelden yönet — zamanlama, mesajlaşma ve istatistikler dahil.",
        free: true,
        link: "https://business.facebook.com",
        bestFor: "Instagram ve Facebook eş zamanlı yönetimi, DM takibi, reklam yönetimi",
      },
      {
        name: "Fresha veya GHL (fresha.com)",
        description:
          "Salon ve klinikler için randevu yönetimi, müşteri takibi ve otomatik hatırlatma sistemi.",
        free: true,
        link: "https://www.fresha.com",
        bestFor: "Online randevu alma, müşteri takibi, hatırlatma otomasyonu",
      },
    ],

    prompts: [
      {
        title: "1. 30 Günlük İçerik Takvimi",
        prompt: `[Salon türü] için [ay] ayında 30 günlük Instagram içerik takvimi hazırla. Her gün: içerik türü, başlık (10 kelime), caption (80-120 kelime + CTA), 12 hashtag, görsel yönlendirmesi. Haftada 2 before/after, 1 müşteri yorumu, 2 ipucu, 1-2 tanıtım. Ton: [lüks/samimi/genç]. Hedef kitle: [profil].`,
        expectedOutput: "30 günlük içerik takvimi, her gün için hazır caption ve hashtag",
      },
      {
        title: "2. Before/After Caption",
        prompt: `[İşlem türü] için before/after caption yaz. İşlem detayı: [detay]. Sonuç: [sonuç]. İlk cümle çarpıcı olsun, 2-3 cümle detay, son cümle randevu CTA. Ardından 15 hashtag öner (karışık büyük/orta/niche).`,
        expectedOutput: "Hazır before/after caption metni ve hashtag seti",
      },
      {
        title: "3. Müşteri Teşekkür Mesajı",
        prompt: `[Ad] adlı müşterim bugün [hizmet] aldı. Ona gönderilecek samimi teşekkür mesajı yaz. Kısa (3-4 cümle), kişisel, sıcak. Hizmete özel bir detay ekle, bakım için küçük bir ipucu ver. WhatsApp için emoji kullan.`,
        expectedOutput: "WhatsApp'a hazır, kişisel teşekkür mesajı",
      },
      {
        title: "4. Kampanya Duyurusu",
        prompt: `[Kampanya adı] için Instagram duyuru postu yaz. Kampanya: [detay]. Süre: [tarih]. Hedef: [hedef kitle]. Caption: dikkat çekici başlık + kampanya detayları + aciliyet/sınırlılık vurgusu + CTA (DM veya link). 15 hashtag ekle.`,
        expectedOutput: "Kampanya duyurusu için hazır post metni",
      },
      {
        title: "5. Müşteri Referans Paylaşımı",
        prompt: `Müşterim şu yorumu bıraktı: "[yorum metni]". Bu yorumu Instagram postu için kullan. Caption: yorumdan alıntı (tırnak içinde) + kısa yorumum (2-3 cümle) + randevu CTA. Hashtag seti ekle. "Siz/sizin" hitabı kullan (müşteri için).`,
        expectedOutput: "Müşteri referansını öne çıkaran Instagram post metni",
      },
      {
        title: "6. Reels Script",
        prompt: `[Konu: örn. keratin bakımı süreci / saç boyama teknikleri] hakkında 30-60 saniyelik Reels için script yaz. Format: dikkat çekici giriş (3 saniye), ana içerik (liste veya adım adım), kapanış (CTA). Konuşma dili, sade ve enerjik.`,
        expectedOutput: "30-60 saniyelik Reels için konuşma scripti",
      },
      {
        title: "7. Story Soru Serileri",
        prompt: `Takipçilerle etkileşimi artırmak için [konu] hakkında 5 adet Instagram Story sorusu hazırla. Her soru: kısa (10-15 kelime), merak uyandıran, yanıtlamak kolay. Story anket, soru kutusu veya emoji slider formatına uygun.`,
        expectedOutput: "5 adet etkileşim sorusu, farklı story formatları için",
      },
      {
        title: "8. Randevu Hatırlatma Mesajı",
        prompt: `[Ad]'ın yarın [saat] randevusu var. Hatırlatma mesajı yaz. Mesaj: kısa (2-3 cümle), randevu bilgisi, hazırlık ipucu (varsa), adres/konum hatırlatma. WhatsApp için samimi ton.`,
        expectedOutput: "WhatsApp randevu hatırlatma mesajı",
      },
      {
        title: "9. Müşteri Takip Mesajı (10. Gün)",
        prompt: `10 gün önce [hizmet] aldı [Ad]. Check-in mesajı yaz. Amaç: nasıl gittiğini sormak, satış yapmamak. 2-3 cümle, samimi, merak gösteren. WhatsApp için.`,
        expectedOutput: "Doğal ve samimi 10. gün takip mesajı",
      },
      {
        title: "10. Doğum Günü Mesajı",
        prompt: `[Ad]'ın bugün doğum günü. Salonumdan doğum günü tebrik mesajı ve özel teklif gönder. Mesaj: kişisel ve sıcak doğum günü, sürpriz teklif ([X]% indirim veya küçük hediye), randevu daveti. Emoji kullan, 3-4 cümle.`,
        expectedOutput: "Kişisel doğum günü tebrik ve teklif mesajı",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. Salon bilgilerini hazırla (isim, uzmanlık, hedef müşteri, ton). 30 günlük içerik takvimi prompt'unu çalıştır.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 2,
        task: "Takvimi incele, sana uymayan günleri düzenle. Canva'ya üye ol ve salon için bir Instagram şablon seti oluştur (renkler, font, logo yerleşimi).",
        tool: "Canva AI",
        duration: "60 dakika",
      },
      {
        day: 3,
        task: "Bu hafta için 5 postun görselini Canva AI'da üret. Before/after template'ini hazırla ve kaydet — bu şablonu hep kullanacaksın.",
        tool: "Canva AI",
        duration: "60 dakika",
      },
      {
        day: 4,
        task: "Buffer veya Meta Business Suite'e üye ol. Bu haftanın 5 postunu (görsel + caption) yükle ve zamanla.",
        tool: "Buffer / Meta Business Suite",
        duration: "45 dakika",
      },
      {
        day: 5,
        task: "Müşteri sadakat mesaj dizisini hazırla (Prompt 3, 9, 10). 5 şablonu kaydet. Randevu platformunda ilk hatırlatmayı kur.",
        tool: "Claude.ai + Fresha/GHL",
        duration: "45 dakika",
      },
      {
        day: 6,
        task: "Bu haftanın before/after fotoğraflarını çek (müşteri izniyle). Prompt 2 ile caption'ları üret ve hemen paylaş.",
        tool: "Claude.ai + Instagram",
        duration: "30 dakika",
      },
      {
        day: 7,
        task: "Haftalık sonuçları kontrol et: hangi postlar daha çok etkileşim aldı? Gelecek haftanın içeriğini o veriyle güncelle.",
        tool: "Meta Business Suite / Buffer Analytics",
        duration: "20 dakika",
      },
    ],

    growtTeaser:
      "Bu rehberde Instagram içerik otomasyonunun temelini attın — bu GROWT Method'un ilk adımı. Ama sadece içerik üretimi yeterli değil: müşteri nasıl keşfediyor, nasıl randevu alıyor, nasıl geri geliyor ve seni nasıl başkalarına öneriyor? Tüm bu döngüyü kurmak için kişisel planına ihtiyacın var. Growtify.ai/test üzerinden salonuna özel AI dönüşüm yol haritanı al.",

    ctaHeadline: "Bir sonraki adım: Salonuna Özel AI Planını Oluştur",
    ctaBody:
      "Bu rehberdeki sistemi kurduğunda Instagram'dan zaman kazanmaya başlayacaksın. Peki müşterilerin seni nasıl buluyor, randevuyu nasıl alıyor, ödemeyi nasıl yapıyor ve neden geri dönüyor? Tüm bu akışı AI ile otomatize etmek için growtify.ai/test adresindeki ücretsiz AI Dijital Olgunluk Testi'ni tamamla. Salonuna ve mevcut durumuna göre kişisel bir yol haritası çıkıyor — 5 dakika.",
  },

  // Kalan 9 sektör sonraki iterasyonda eklenecek:
  // emlak, eticaret, dis, muhasebe, eczacilik, turizm, mimarlik, egitim, fitness
};

export const PDF_CONTENT_SLUGS = Object.keys(PDF_CONTENT) as Array<keyof typeof PDF_CONTENT>;

export function getPdfContent(slug: string): PdfSectorContent | null {
  return PDF_CONTENT[slug] ?? null;
}
