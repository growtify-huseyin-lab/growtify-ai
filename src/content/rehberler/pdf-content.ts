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

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 4: EMLAK
  // ─────────────────────────────────────────────────────────────
  emlak: {
    slug: "emlak",
    coverTitle: "Emlak Profesyonelleri için AI Rehberi",
    coverSubtitle: "İlan yazmaktan müşteri eşleştirmeye — haftada 10 saat geri kazan",
    sectorIcon: "🏠",

    intro: {
      forWho:
        "Bu rehber; her ilan için saatler harcayan, müşteri-mülk eşleştirmesini sezgiye bırakan, piyasa analizini elle yapan gayrimenkul danışmanları ve emlak ofisi sahipleri için hazırlandı. Portföyün büyüdükçe idari yük de büyüyorsa, AI bu denklemi değiştiriyor.",
      whatYouGet: [
        "3 pratik senaryo — ilan üretim hattı, müşteri eşleştirme, piyasa raporu",
        "5 AI aracı karşılaştırması — emlak pratiği için hangisi ne zaman",
        "15 kopyala-yapıştır prompt — konut/ticari/arsa ilanından bölge analizine",
        "İlk 7 gün checklist — sıfırdan sistemi kurmak için adım adım",
        "Eskiden → Şimdi karşılaştırma — somut zaman tasarrufu rakamlarıyla",
      ],
      painHook:
        "Bir gayrimenkul danışmanının zamanının %40'ı içerik üretimine ve idari işlere gidiyor — satışa değil. Her ilan sıfırdan yazılıyor, her müşteri görüşmesi ayrı bir rapor gerektiriyor, piyasa analizi hissiyata dayanıyor. AI bu tekrar eden yükü alır; sen alıcı-satıcıya odaklanırsın.",
    },

    sectorContext: {
      whyAiMatters:
        "Türkiye gayrimenkul sektöründe dijitalleşme hız kazanıyor. Sahibinden, Hepsiemlak ve Emlakjet gibi platformlarda rekabetin arttığı ortamda öne çıkmak için hem içerik kalitesi hem de hız kritik. AI, ilan metni üretimini dakikalara indiriyor, müşteri profilini analiz ederek mülk eşleştirmesini sistematik hale getiriyor ve bölge bazlı piyasa raporlarını otomatikleştiriyor.\n\nUluslararası veriler de trendi doğruluyor: Zillow ve Redfin gibi platform devleri AI'ı operasyonlarının merkezine aldı. Türkiye'deki bağımsız danışmanlar ve küçük ofisler için fırsat tam da burada — büyük platformların kaynaklarına gerek kalmadan aynı içerik kalitesine ulaşmak.",
      stats: [
        {
          value: "%40",
          label: "Emlak danışmanlarının idari işler ve içerik üretimine harcadığı zaman oranı — satış zamanı değil.",
          source: "National Association of Realtors, Productivity Study 2023",
        },
        {
          value: "3x",
          label: "AI destekli ilan metni kullanan danışmanların platform görüntülenme artışı — aynı mülk, farklı sunum.",
          source: "Zillow Agent Insights Report, 2024",
        },
        {
          value: "8 saat",
          label: "Haftalık ortalama zaman tasarrufu — ilan yazımı, müşteri iletişimi ve rapor hazırlığında AI kullanan danışmanlarda.",
          source: "NAR Technology Survey, 2024",
        },
      ],
      comparison: {
        without: [
          "Her ilan metni sıfırdan yazılıyor, aynı mülk tipi için defalarca aynı iş",
          "Müşteri-mülk eşleştirmesi sezgiye ve hafızaya dayanıyor",
          "Piyasa analizi için saatler süren manuel araştırma",
          "Takip mailleri ve referans talepleri unutuluyor veya gecikiyor",
        ],
        with: [
          "Mülk özelliklerini giriyorsun, AI profesyonel ilan metni ve SEO başlığını 5 dakikada çıkarıyor",
          "Müşteri kriterlerini prompt'a koyuyorsun, AI portföyden en uygun 3 mülkü gerekçesiyle öneriyor",
          "Bölge verilerini giriyorsun, AI piyasa raporu taslağını hazırlıyor — sen onaylıyorsun",
          "Takip, referans talebi ve açık ev daveti şablonları AI ile dakikada hazır",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: Profesyonel İlan Üretim Hattı",
        problem:
          "Yeni bir mülk portföyüne girdiğinde her platform için ayrı, SEO uyumlu, dikkat çekici ilan metni yazman gerekiyor. Sahibinden için kısa, Hepsiemlak için detaylı, Instagram için görsel odaklı — her format farklı. Bu iş saatler alıyor ve tekrar ediyor.",
        steps: [
          "Mülkün temel bilgilerini bir forma dök: konum, tip, m², oda sayısı, özellikler, fiyat",
          "Claude'a aşağıdaki ilan prompt'unu ver, mülk bilgilerini doldur",
          "AI'ın ürettiği metni gözden geçir, varsa kişisel notlarını ekle",
          "Farklı platformlar için formatı uyarla (kısa/uzun/Instagram caption)",
          "SEO başlığını da aynı oturumda üret — ayrı prompt gerekmez",
          "Tüm varyantları bir klasörde kaydet, portföy için şablon haline getir",
        ],
        promptExample: `Sen deneyimli bir gayrimenkul copywriter'sın. Aşağıdaki mülk bilgileriyle profesyonel bir emlak ilanı yaz.

Mülk bilgileri:
- Tip: [Daire / Villa / Dükkan / Arsa / Ofis]
- Konum: [İlçe, mahalle, cadde]
- m²: [Brüt/Net]
- Oda sayısı: [bilgi]
- Kat: [bilgi] / Toplam kat: [bilgi]
- Özellikler: [Asansör, otopark, balkon, bahçe vb.]
- Isıtma: [Merkezi/Kombi/Klima]
- Bina yaşı: [bilgi]
- Fiyat: [TL / dolar / euro]
- Satılık mı / Kiralık mı: [bilgi]
- Öne çıkan avantaj: [en güçlü özellik]

Lütfen şunları üret:
1. Platform ilanı (300-400 kelime, ikna edici, duygusal tetikleyici içeren)
2. SEO başlığı (60-70 karakter, anahtar kelime içeren)
3. Instagram caption (150 kelime, 10 hashtag)
4. WhatsApp ön tanıtım mesajı (3-4 cümle, merak uyandıran)

Türkçe, profesyonel ama samimi dil. "Sen" hitabı değil, mülkü anlatan tarafsız bir ton.`,
        before: "Her ilan için 45-90 dakika — farklı platformlar için farklı metinler",
        after: "Mülk bilgisi girişi + kontrol: 10-15 dakika — tüm platform varyantları hazır",
      },
      {
        title: "Senaryo 2: Müşteri-Mülk Eşleştirme Asistanı",
        problem:
          "Alıcı müşteri geliyor: bütçesi var, kriterleri var, ama portföyünde onlarca mülk var. Hangisini önerirsin? Çoğu zaman bu karar hafızana ve sezgine kalıyor. Yanlış eşleştirme = zaman kaybı = müşteri memnuniyetsizliği.",
        steps: [
          "Müşteri görüşmesinde standart bir kriter formu doldur (bütçe, konum, tip, öncelikler)",
          "Portföyündeki uygun mülklerin özelliklerini kısa bir liste olarak hazırla",
          "Her ikisini Claude'a ver, aşağıdaki eşleştirme prompt'unu kullan",
          "AI en uygun 3 mülkü gerekçesiyle sıralar — senin onayına sunar",
          "Onaylanan mülkler için sunum metni de aynı oturumda üret",
        ],
        promptExample: `Aşağıda bir alıcı müşterinin kriterleri ve portföyümdeki mülk listesi var. En uygun 3 mülkü belirle ve neden önerdiğini açıkla.

Müşteri kriterleri:
- Bütçe: [TL aralığı]
- Konum tercihi: [ilçe/semt listesi]
- Mülk tipi: [daire/villa/ticari]
- Minimum alan: [m²]
- Oda sayısı: [en az]
- Öncelikler: [okul yakını / toplu taşıma / bahçe / sessiz semt / yatırım amaçlı vb.]
- Veto kriterleri: [kesinlikle istemediği şeyler]

Portföy listesi:
[Her mülk için: ID, konum, tip, m², fiyat, öne çıkan özellik — satır satır ekle]

Çıktı:
1. En uygun 3 mülk (ID ile), neden uygun olduğu gerekçesiyle
2. Her mülk için müşteriye söylenecek 2-3 cümlelik sunum notu
3. Varsa dikkat edilmesi gereken potansiyel itirazlar ve yanıtları`,
        before: "Portföyü zihinsel olarak taramak + sunum hazırlamak: 30-60 dakika",
        after: "Kriter formu + AI çıktı + kontrol: 10-15 dakika",
      },
      {
        title: "Senaryo 3: Bölge Piyasa Analizi Raporu",
        problem:
          "Satıcı müşteri soruyor: 'Bu semtte fiyatlar nerede?' Alıcı soruyor: 'Bu fiyat gerçekçi mi?' Piyasa bilgisi hissiyata dayanıyor, rakipler ise profesyonel raporlarla geliyor. Analiz raporu hazırlamak saatler sürüyor.",
        steps: [
          "Sahibinden, Hepsiemlak veya Endeksa'dan bölge verilerini topla (fiyat aralıkları, ortalama m² fiyatı)",
          "Verileri kısa bir liste halinde düzenle",
          "Claude'a ver ve aşağıdaki rapor prompt'unu kullan",
          "AI rapor taslağını üretir — sen kendi gözlemlerini eklersin",
          "PDF olarak kaydet, müşteriye sunuş materyali olarak kullan",
        ],
        promptExample: `Aşağıdaki verileri kullanarak [Bölge Adı] için profesyonel bir gayrimenkul piyasa analizi raporu hazırla.

Bölge: [İlçe / Mahalle]
Mülk tipi: [Konut / Ticari / Arsa]
Analiz dönemi: [Son 6 ay / 1 yıl]

Ham veriler:
- Ortalama satış fiyatı: [TL/m²]
- Fiyat aralığı: [min - max]
- Ortalama kiralama fiyatı: [varsa]
- Son 6 ayda gerçekleşen tahmini işlem sayısı: [bilgi]
- Bölgenin öne çıkan özellikleri: [ulaşım, okul, AVM, gelişim projeleri vb.]
- Rakip bölgelerle fiyat kıyası: [varsa]

Raporda şunlar olsun:
1. Yönetici özeti (3-4 cümle)
2. Fiyat analizi ve m² karşılaştırması
3. Bölgenin güçlü ve zayıf yönleri (yatırımcı perspektifinden)
4. Kısa vadeli trend tahmini (spekülatif değil, mevcut verilere dayalı)
5. Alıcı ve satıcıya özet tavsiyeler

Rapor profesyonel, nesnel ve Türkçe olsun. Spekülatif ifadelerden kaçın.`,
        before: "Manuel araştırma + rapor yazımı: 2-3 saat",
        after: "Veri toplama + AI rapor + düzenleme: 30-45 dakika",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "Uzun ilan metinleri, piyasa raporları, müşteri yazışmaları ve eşleştirme analizleri için en güçlü AI asistanı.",
        free: true,
        link: "https://claude.ai",
        bestFor: "İlan metni, piyasa raporu, müşteri eşleştirme, sunum metni",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description: "Alternatif ilan versiyonları, yaratıcı başlıklar ve hızlı içerik fikirleri için kullanılabilir.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Başlık alternatifleri, sosyal medya içeriği, kampanya fikirleri",
      },
      {
        name: "Canva AI (canva.com)",
        description: "Mülk tanıtım görselleri, broşürler, Instagram postları ve sunum slaytları için AI destekli tasarım.",
        free: true,
        link: "https://canva.com",
        bestFor: "İlan görseli, broşür, Instagram post, müşteri sunum slaytı",
      },
      {
        name: "Endeksa (endeksa.com)",
        description: "Türkiye'ye özel gayrimenkul analiz platformu — bölge fiyatları, trend verileri ve değerleme.",
        free: false,
        link: "https://endeksa.com",
        bestFor: "Bölge analizi, fiyat trendi, yatırım kararı desteği",
      },
      {
        name: "Notion AI (notion.so)",
        description: "Portföy takibi, müşteri notları ve proje yönetimi için AI destekli verimlilik aracı.",
        free: false,
        link: "https://notion.so",
        bestFor: "Portföy yönetimi, müşteri CRM, görev takibi",
      },
    ],

    prompts: [
      {
        title: "1. Konut İlan Metni",
        prompt: `Sen profesyonel bir gayrimenkul copywriter'sın. Şu bilgilerle [ilçe, mahalle] semtinde [m²], [oda sayısı]+[banyo] [satılık/kiralık] daire için ikna edici bir ilan metni yaz. Özellikler: [liste]. Fiyat: [fiyat]. Öne çıkan avantaj: [özellik]. Platform: Sahibinden. 350 kelime, duygusal bağ kuran açılış, teknik detaylar ortada, güçlü kapanış.`,
        expectedOutput: "Platform ilanı, SEO başlığı ve Instagram caption versiyonu",
      },
      {
        title: "2. Ticari Mülk İlan Metni",
        prompt: `[Konum] adresinde [m²] [dükkan/ofis/depo] için yatırımcı ve kiracı odaklı ticari mülk ilanı yaz. Kira getirisi: [bilgi]. Tapu durumu: [bilgi]. Öne çıkan özellikler: [liste]. Yatırım değerini ve potansiyel kullanım alanlarını vurgula. 300 kelime, nesnel ve yatırımcı diline uygun.`,
        expectedOutput: "Ticari mülk ilanı, yatırım özeti ve WhatsApp tanıtım mesajı",
      },
      {
        title: "3. Arsa İlan Metni",
        prompt: `[İlçe/köy] sınırlarında [m²] [imarlı/imarsız/tarla] arsa için ilan yaz. KAKS/TAKS: [varsa]. İmar durumu: [bilgi]. Konuma özel avantajlar: [liste]. Yatırım potansiyelini öne çıkar. 250 kelime.`,
        expectedOutput: "Arsa ilanı, imar bilgisi özeti ve potansiyel kullanım notları",
      },
      {
        title: "4. SEO Başlığı Üretimi",
        prompt: `Şu mülk için 5 farklı SEO başlığı üret: [mülk tipi + konum + öne çıkan özellik]. Her başlık maksimum 65 karakter, anahtar kelime içermeli, tıklama oranı yüksek olmalı. Platform: Sahibinden, Hepsiemlak ve Google Ads.`,
        expectedOutput: "5 farklı SEO başlığı, platform önerileriyle",
      },
      {
        title: "5. Müşteri-Mülk Eşleştirme",
        prompt: `Alıcı profili: Bütçe [TL], tercih: [semt listesi], tip: [daire/villa], öncelikler: [liste], veto: [istemediği şeyler]. Portföyüm: [mülk listesi — ID, konum, fiyat, özellikler]. En uygun 3 mülkü seç, her biri için 2 cümle gerekçe ve olası itiraz yanıtı yaz.`,
        expectedOutput: "Önceliklendirilmiş 3 mülk önerisi, gerekçe ve itiraz yanıtları",
      },
      {
        title: "6. Bölge Fiyat Analizi",
        prompt: `[Semt] için gayrimenkul fiyat analizi yap. Elimdeki veriler: ortalama satış fiyatı [TL/m²], kira fiyatı [TL], son dönem işlem hacmi [tahmini]. Bölgenin güçlü-zayıf yönleri, kısa vadeli trend ve alıcı/satıcıya tavsiyeler içeren 1 sayfalık rapor yaz.`,
        expectedOutput: "1 sayfalık bölge analizi raporu, müşteriye sunuma hazır",
      },
      {
        title: "7. Müşteri Takip Maili",
        prompt: `[Ad] ile dün [mülk gösterimi/telefon görüşmesi] yaptım. İlgilendiği mülk: [bilgi]. Bir sonraki adım: [bilgi]. Profesyonel ve samimi bir takip maili yaz. 4-5 cümle, değer katan 1 bilgi ekle (bölge veya mülk hakkında), sonraki adım için net yönlendirme.`,
        expectedOutput: "Göndermeye hazır takip maili",
      },
      {
        title: "8. Piyasa Raporu (Aylık)",
        prompt: `[Ay] ayı [ilçe] gayrimenkul piyasası raporu için şu verileri kullan: [satış fiyatı trendi, kira trendi, en çok satılan mülk tipi, dikkat çeken gelişmeler]. Yatırımcılara ve mülk sahiplerine göndermek için 1 sayfalık bülteni Türkçe yaz.`,
        expectedOutput: "Aylık piyasa bülteni, e-posta listesine gönderilebilir format",
      },
      {
        title: "9. Portföy Özeti Sunum Metni",
        prompt: `Aşağıdaki [X] mülklük portföyüm için yatırımcıya sunulacak kısa portföy özeti yaz: [Mülk listesi: konum, tip, m², fiyat, potansiyel getiri]. Toplam portföy değeri, çeşitliliği ve güçlü yanları öne çıkar. 300 kelime, yatırım perspektifinden.`,
        expectedOutput: "Yatırımcı sunumuna hazır portföy özet metni",
      },
      {
        title: "10. Açık Ev Daveti",
        prompt: `[Adres] adresindeki [mülk özeti] için [tarih, saat] açık ev etkinliği daveti hazırla. WhatsApp mesajı versiyonu (3 cümle) + e-posta versiyonu (kısa, merak uyandıran) + Instagram story metni (tek cümle + emoji). Katılım için net CTA içermeli.`,
        expectedOutput: "3 kanal için hazır açık ev daveti içeriği",
      },
      {
        title: "11. Referans Talebi Mesajı",
        prompt: `[Ad] adlı müşterimle [işlem türü: alım/satım/kiralama] işlemini başarıyla tamamladım. Bu deneyimi çevresinde paylaşmasını ve beni potansiyel müşterilere önermesini isteyen samimi ama baskı yapmayan bir WhatsApp mesajı yaz. 3-4 cümle.`,
        expectedOutput: "Doğal ve etkili referans talep mesajı",
      },
      {
        title: "12. Değerleme Özeti",
        prompt: `[Mülk: konum, tip, m², yaş, özellikler] için tahmini piyasa değeri analizi yaz. Bölgedeki emsal satışlar: [bilgi]. Güçlü yönler: [liste]. Değeri olumsuz etkileyen faktörler: [liste]. Sonuç: tahmini fiyat aralığı ve gerekçesi. 200 kelime, nesnel ve dürüst.`,
        expectedOutput: "Müşteriyle paylaşılabilir tahmini değerleme özeti",
      },
      {
        title: "13. Kampanya Duyuru Metni",
        prompt: `[Kampanya adı/promosyon detayı] için gayrimenkul kampanyası duyurusu yaz. Hedef: [alıcı/satıcı/yatırımcı]. Kampanya süresi: [tarih aralığı]. E-posta, WhatsApp ve Instagram için 3 ayrı versiyon — kısa, dikkat çekici, CTA net.`,
        expectedOutput: "3 kanal kampanya metni, aciliyet hissi veren",
      },
      {
        title: "14. İlan Güncelleme Metni",
        prompt: `Bu mülk [X hafta/ay] dır satılmıyor: [mülk özeti + mevcut ilan metni]. Fiyat değişmedi. Müşteri geri bildirimi: [varsa]. İlanı taze tutmak için yeni bir sunum açısıyla yaz — farklı özelliği öne çıkar, farklı alıcı kitlesine hitap et.`,
        expectedOutput: "Yeni sunum açısıyla güncellenmiş ilan metni",
      },
      {
        title: "15. Müşteri Profili Özeti",
        prompt: `Aşağıdaki görüşme notlarından alıcı müşteri profili çıkar: [notlar]. Çıktıda şunlar olsun: net bütçe, kesin konum tercihleri, mülk tipi önceliği, zaman baskısı (acil mi, değil mi), karar vericiler (eş, aile), potansiyel itirazlar. Kısa, yapılandırılmış, kullanılabilir format.`,
        expectedOutput: "Yapılandırılmış müşteri profil özeti, sonraki görüşme için hazır",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. Portföyündeki en son mülk için Prompt 1'i kullan — ilan metnini, SEO başlığını ve Instagram caption'ını üret.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 2,
        task: "Standart müşteri kriter formu şablonu hazırla (konum, bütçe, tip, öncelikler). Mevcut 3 aktif alıcın için Prompt 5 ile portföy eşleştirmesi yap.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 3,
        task: "Canva'ya üye ol. En son 2 mülk için broşür şablonu oluştur. Canva AI ile görsel üret.",
        tool: "Canva AI",
        duration: "60 dakika",
      },
      {
        day: 4,
        task: "En çok çalıştığın bölge için Prompt 6 ile piyasa analizi raporu üret. Sonraki müşteri toplantısında kullan.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 5,
        task: "Son 5 müşteriye Prompt 7 ile takip maili gönder. Referans vermeyenlere Prompt 11 ile referans talebi yolla.",
        tool: "Claude.ai",
        duration: "30 dakika",
      },
      {
        day: 6,
        task: "3 aydır satılmayan ilanlarını seç, Prompt 14 ile yeni sunum açısı üret ve ilanları güncelle.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 7,
        task: "Bu haftanın AI kullanımını değerlendir. En çok hangi prompt işe yaradı? Gelecek ay için aylık piyasa bülteni şablonunu kur.",
        tool: "Claude.ai",
        duration: "30 dakika",
      },
    ],

    growtTeaser:
      "Bu rehberde ilan üretimini, müşteri eşleştirmeyi ve piyasa raporlamayı otomatize etmenin temelini attın. Ama emlak işinde asıl büyüme, müşteri edinme sistemi kurmaktan geçiyor — sosyal medya, e-posta listesi, referans ağı ve dijital itibar. GROWT Method ile bu adımları sırayla kur, her aşamada somut ölçütlerle ilerlediğini gör. Kişisel planını oluşturmak için growtify.ai/test adresine git.",

    ctaHeadline: "Bir sonraki adım: Emlak Pratiğine Özel AI Planını Oluştur",
    ctaBody:
      "İlan yazımından kazandığın saatler başlangıç. Peki müşteriler seni nasıl buluyor, portföyün nasıl büyüyor, referans sistemi nasıl otomatize oluyor? Tüm bu akışı kurmak için growtify.ai/test adresindeki ücretsiz AI Dijital Olgunluk Testi'ni tamamla — 5 dakikada sektörüne özel yol haritası.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 5: E-TİCARET
  // ─────────────────────────────────────────────────────────────
  eticaret: {
    slug: "eticaret",
    coverTitle: "E-Ticaret Satıcıları için AI İçerik & Büyüme Rehberi",
    coverSubtitle: "Yüzlerce ürün açıklaması, müşteri hizmetleri ve reklam — hepsini AI ile yönet",
    sectorIcon: "🛒",

    intro: {
      forWho:
        "Bu rehber; Trendyol, Hepsiburada veya kendi e-ticaret sitesinde satış yapan, yüzlerce ürün için içerik üretmekte güçlük çeken, müşteri sorularına yetişemeyen ve reklam bütçesini verimli kullanamayan online mağaza sahipleri ve dropshipper'lar için hazırlandı.",
      whatYouGet: [
        "3 pratik senaryo — ürün içerik fabrikası, müşteri hizmetleri asistanı, reklam optimizasyonu",
        "5 AI aracı — e-ticaret operasyonu için seçilmiş",
        "12 kopyala-yapıştır prompt — giyimden elektroniğe, kozmetikten gıdaya",
        "İlk 7 gün checklist — AI sistemini mağazana entegre etmek için adım adım",
        "Eskiden → Şimdi karşılaştırma — ürün başına zaman ve dönüşüm oranı",
      ],
      painHook:
        "100 ürünlük bir mağaza için 100 farklı açıklama — her biri SEO uyumlu, ikna edici, platforma özel. Bu işe haftalar harcıyorsun ya da düşük kaliteli içerikle geçiştiriyorsun. Müşteri sorularına yetişemiyorsun, rakiplerin öne geçiyor. AI bu üç sorunu aynı anda çözüyor.",
    },

    sectorContext: {
      whyAiMatters:
        "Türkiye e-ticaret pazarı 2024 yılında 1,2 trilyon TL'yi aştı — ve rekabetin en yoğun olduğu pazarlardan biri haline geldi. Trendyol'da günde 3 milyonun üzerinde ürün arama yapılıyor. Bu ortamda öne çıkmak için ürün içeriği kalitesi, müşteri deneyimi ve reklam verimliliği kritik. AI, küçük ve orta ölçekli satıcılara büyük mağazaların operasyonel hızını veriyor.\n\nDünyanın önde gelen e-ticaret platformları AI'ı çoktan operasyonlarına entegre etti — Amazon ürün açıklamalarının %40'ından fazlası AI destekli üretiliyor. Türkiye'deki bağımsız satıcılar için bu araçlar artık ücretsiz veya çok düşük maliyetle erişilebilir.",
      stats: [
        {
          value: "%34",
          label: "Kaliteli ürün açıklamalarının dönüşüm oranına etkisi — aynı fiyat, daha iyi içerik.",
          source: "Baymard Institute E-Commerce UX Research, 2024",
        },
        {
          value: "1,2 trilyon TL",
          label: "Türkiye e-ticaret pazar büyüklüğü (2024) — her geçen yıl rekabetle birlikte büyüyor.",
          source: "ETID E-Ticaret Sektör Raporu, 2024",
        },
        {
          value: "%68",
          label: "Müşterilerin kötü ürün açıklaması nedeniyle satın almaktan vazgeçme oranı.",
          source: "Salsify Product Experience Report, 2023",
        },
      ],
      comparison: {
        without: [
          "Her ürün için açıklama sıfırdan yazılıyor — 100 ürün = 100 saatlik iş",
          "Müşteri sorularına saatler içinde yanıt veriliyor, rakip önce davranıyor",
          "Reklam metinleri sezgiye dayanıyor, hangi açının işe yaradığı bilinmiyor",
          "Mevsimsel kampanya hazırlığı son dakikaya kalıyor",
        ],
        with: [
          "Ürün bilgilerini giriyor, AI SEO uyumlu açıklamayı 3 dakikada üretiyor",
          "Sık sorulan sorular için hazır yanıt şablonları — müşteri hizmetleri 3x hızlanıyor",
          "Farklı reklam açılarını AI ile test ediyorsun, kazanan metni ölçekle",
          "Sezon kampanyaları 1 oturumda planlanıyor — içerik, kampanya metni, indirim hesabı",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: Ürün İçerik Fabrikası",
        problem:
          "50 yeni ürün geldi. Her birinin Trendyol ilanı, ürün açıklaması, başlığı ve anahtar kelimeleri lazım. Bu işe bir hafta harcar ya da hızlı yapıp kaliteyi düşürürsün. Rakipler daha iyi içerikle öne geçiyor.",
        steps: [
          "Ürünler için standart bir bilgi şablonu hazırla (kategori, özellikler, hedef kitle, fiyat)",
          "Her ürün için bu şablonu doldur — 5 dakikalık iş",
          "Claude'a ver ve aşağıdaki prompt ile tüm içerik paketini üret",
          "Çıktıyı kontrol et, varsa eksik bilgileri tamamla",
          "Platforma göre format düzenle (Trendyol karakter limitleri, Hepsiburada kuralları)",
          "Toplu ürünler için aynı şablonu tekrar kullan — sistem kurulduktan sonra hızlanır",
        ],
        promptExample: `Sen e-ticaret içerik uzmanısın. Aşağıdaki ürün bilgileriyle platform ilanı, ürün açıklaması ve SEO içeriği üret.

Ürün bilgileri:
- Kategori: [Giyim / Elektronik / Kozmetik / Ev / Gıda / Spor / Diğer]
- Ürün adı: [Ürün adı]
- Marka: [Marka / Markasız]
- Temel özellikler: [madde madde liste]
- Hedef müşteri: [kim kullanıyor, ne için]
- Fiyat: [TL]
- Rakip ürünlere göre avantajı: [en güçlü fark]
- Varsa sertifika/garanti: [bilgi]

Lütfen üret:
1. Trendyol ürün başlığı (maksimum 75 karakter, anahtar kelime içeren)
2. Ürün açıklaması (300-400 kelime, faydalar önce, teknik detaylar sonra)
3. 5 maddelik özellik listesi (bullet format, ikna edici)
4. 8-10 anahtar kelime (Trendyol arama optimizasyonu için)
5. Instagram ürün tanıtım caption'ı (150 kelime, CTA içeren)

Türkçe, alıcıyı ikna eden, sorularına önceden yanıt veren bir dil kullan.`,
        before: "Her ürün için 30-45 dakika — başlık, açıklama, anahtar kelime, görsel not",
        after: "Bilgi girişi + AI üretim + kontrol: 5-8 dakika/ürün",
      },
      {
        title: "Senaryo 2: Müşteri Hizmetleri Asistanı",
        problem:
          "Müşteriler aynı soruları soruyor: kargo süresi, iade politikası, beden uyumu, ürün orijinalliği. Her soruya tek tek, sıfırdan yanıt vermek saatler alıyor. Yorum bölümünde yanıtsız sorular satışı öldürüyor.",
        steps: [
          "Mağazana gelen en sık 20 soruyu listele",
          "Claude ile her soru için hazır yanıt şablonu üret",
          "Yanıtları bir Google Doküman veya Notion sayfasına kaydet",
          "Yeni sorular geldiğinde şablondan kopyala, kişiselleştir, gönder",
          "Platform chatbot entegrasyonu için temel yanıtları otomatize et",
        ],
        promptExample: `Aşağıdaki müşteri soruları için mağazama özel hazır yanıt şablonları üret.

Mağaza bilgileri:
- Kategori: [ürün kategorisi]
- İade politikası: [X gün, koşullar]
- Kargo süresi: [X iş günü]
- Kargo ücretsiz limiti: [TL]
- İletişim kanalları: [WhatsApp/mail/telefon]

Şu sorular için profesyonel, samimi, müşteriyi memnun eden yanıtlar üret:
1. "Bu ürün orjinal mi?"
2. "Kargo ne zaman gelir?"
3. "İade edebilir miyim?"
4. "Beden tablosu var mı?"
5. "Toplu sipariş indirimi var mı?"
6. [Kategoriyle ilgili sektöre özel soru ekle]

Her yanıt: doğrudan, dürüst, müşteriyi mağazada tutacak şekilde. Maksimum 100 kelime.`,
        before: "Her soruya tek tek, sıfırdan 3-5 dakika — günde 20 soru = 1 saat+",
        after: "Şablon kütüphanesi hazır, her yanıt için 30 saniye kişiselleştirme",
      },
      {
        title: "Senaryo 3: Reklam Metni Optimizasyonu",
        problem:
          "Meta veya Google Ads kullanıyorsun ama hangi başlık, hangi açı daha iyi çalışıyor bilmiyorsun. Tek bir reklam metniyle gidiyorsun — ya tuttu ya tutmadı. Bütçen verimsiz yanıyor.",
        steps: [
          "Ürün için 3 farklı açı belirle: fayda odaklı, aciliyet odaklı, sosyal kanıt odaklı",
          "Claude ile her açı için 3 farklı başlık ve gövde metni üret",
          "Toplam 9 varyant — bunları A/B testine sok",
          "İlk 3-5 günde en iyi performansı seç, bütçeyi ona kaydır",
          "Kazanan formatı şablon olarak kaydet, sonraki kampanyada kullan",
        ],
        promptExample: `Aşağıdaki ürün için Meta Ads (Facebook/Instagram) reklam metni varyantları üret.

Ürün: [ürün adı + kısa açıklama]
Hedef kitle: [yaş, cinsiyet, ilgi alanları]
Bütçe seviyesi: [düşük/orta/yüksek]
Kampanya amacı: [satış/trafik/bilinirlik]
Öne çıkan özellik: [en güçlü fark]
Fiyat ve indirim: [bilgi]

3 farklı açı için reklam metni üret:

Açı 1 — Fayda odaklı:
- Başlık (30 karakter):
- Ana metin (125 karakter):
- Açıklama (30 karakter):

Açı 2 — Aciliyet odaklı (kıtlık/süre):
- Başlık: Metin: Açıklama:

Açı 3 — Sosyal kanıt odaklı (yorum/kullanıcı sayısı):
- Başlık: Metin: Açıklama:

Her açı için ayrıca 1 CTA önerisi ver.`,
        before: "Tek reklam metni, düşük ROAS, bütçe israfı",
        after: "9 varyant, sistematik A/B testi, kazanan formatla ölçekleme",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "Ürün açıklamaları, müşteri yanıtları, kampanya metinleri ve toplu içerik üretimi için en güçlü AI asistanı.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Ürün açıklaması, müşteri hizmetleri şablonları, reklam metni",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description: "Alternatif ürün açıklaması varyantları ve yaratıcı kampanya fikirleri için kullanılabilir.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "İçerik alternatifleri, sezon kampanyası fikirleri",
      },
      {
        name: "Canva AI (canva.com)",
        description: "Ürün görselleri, kampanya bannerleri, Instagram postları ve hikaye tasarımları için AI destekli araç.",
        free: true,
        link: "https://canva.com",
        bestFor: "Ürün görseli, kampanya banneri, sosyal medya içeriği",
      },
      {
        name: "Meta Ads Manager (business.facebook.com)",
        description: "Facebook ve Instagram reklam yönetimi — A/B testi, hedef kitle ve bütçe optimizasyonu.",
        free: true,
        link: "https://business.facebook.com",
        bestFor: "Reklam kampanyası yönetimi, A/B testi, dönüşüm takibi",
      },
      {
        name: "Trendyol Seller Center",
        description: "Trendyol mağaza yönetimi — ürün yükleme, stok takibi, sipariş ve kampanya yönetimi.",
        free: true,
        link: "https://partner.trendyol.com",
        bestFor: "Ürün listeleme, kampanya başvurusu, sipariş yönetimi",
      },
    ],

    prompts: [
      {
        title: "1. Giyim Ürünü Açıklaması",
        prompt: `[Ürün adı] için e-ticaret ürün açıklaması yaz. Kategori: giyim. Materyal: [bilgi]. Beden aralığı: [bilgi]. Kullanım: [günlük/spor/özel gün]. Öne çıkan özellik: [bilgi]. 300 kelime, fayda önce teknik detay sonra, beden seçimi için yönlendirme içersin.`,
        expectedOutput: "SEO uyumlu ürün açıklaması, bullet özellik listesi, başlık",
      },
      {
        title: "2. Elektronik Ürün Açıklaması",
        prompt: `[Ürün adı] için teknik ama anlaşılır e-ticaret açıklaması yaz. Kategori: elektronik. Teknik özellikler: [liste]. Hedef kullanıcı: [profil]. Rakip avantajı: [fark]. 350 kelime, teknik jargonu basitleştir, pratik kullanım senaryosu ekle.`,
        expectedOutput: "Teknik ve ikna edici elektronik ürün açıklaması",
      },
      {
        title: "3. Kozmetik Ürün Açıklaması",
        prompt: `[Ürün adı] kozmetik ürünü için açıklama yaz. İçerikler: [ana bileşenler]. Cilt tipi: [uygun cilt tipleri]. Kullanım şekli: [nasıl uygulanır]. Sertifikalar: [varsa]. 300 kelime, duyusal dil kullan, sonuç odaklı yaz, güvenlik bilgisi ekle.`,
        expectedOutput: "Sezgisel ve güven veren kozmetik ürün açıklaması",
      },
      {
        title: "4. Gıda Ürünü Açıklaması",
        prompt: `[Ürün adı] gıda ürünü için açıklama yaz. İçerikler: [liste]. Allerjen uyarısı: [varsa]. Besin değerleri özeti: [bilgi]. Kullanım önerisi: [tarif/tüketim şekli]. 250 kelime, iştah açıcı dil, sağlık faydaları, saklama koşulları içersin.`,
        expectedOutput: "İştah açıcı ve bilgilendirici gıda ürünü açıklaması",
      },
      {
        title: "5. SEO Başlığı Optimizasyonu",
        prompt: `Şu ürün için 5 farklı Trendyol başlığı üret: [ürün adı + kategori + öne çıkan özellik]. Her başlık max 75 karakter, arama hacmi yüksek anahtar kelime içersin, tıklama oranı yüksek olsun. Başlıkları arama hacmi tahminine göre sırala.`,
        expectedOutput: "5 farklı SEO başlığı, sıralı ve gerekçeli",
      },
      {
        title: "6. Müşteri Sorusu Yanıtı — İade",
        prompt: `Müşteri soruyor: "Ürünü iade edebilir miyim?" Mağaza iade politikam: [X gün, koşullar, iade süreci]. Müşteriyi mağazada tutacak, net ve dürüst bir yanıt yaz. 2-3 cümle, samimi, gereksiz resmiyet yok.`,
        expectedOutput: "Müşteriyi memnun eden iade yanıtı",
      },
      {
        title: "7. Kampanya Metni — İndirim",
        prompt: `[Ürün veya kategori] için [indirim oranı veya miktar] indirim kampanyası metni yaz. Platform: [Trendyol / Instagram / e-posta]. Kampanya süresi: [tarih aralığı]. 3 farklı başlık (kıtlık, fayda, merak) + kısa gövde metni + CTA. Aciliyet hissi ver ama abartma.`,
        expectedOutput: "3 farklı kampanya başlığı ve metni",
      },
      {
        title: "8. Ürün Karşılaştırma Tablosu Metni",
        prompt: `[Ürün A] ve [Ürün B] karşılaştırması için ürün sayfasına eklenecek metin yaz. [Ürün A] benim ürünüm. Özellikler: [her ikisi için liste]. Fiyat: [her ikisi]. Kimin için daha uygun: [hedef kitle farkı]. Tarafsız ama [Ürün A]'nın avantajlarını öne çıkaran 200 kelime.`,
        expectedOutput: "Dönüşüm artıran ürün karşılaştırma metni",
      },
      {
        title: "9. Stok Tükenme Uyarısı Metni",
        prompt: `[Ürün adı] için stok tükenme uyarısı metni yaz. Kalan stok: [X adet]. Platform: [Instagram story / e-posta / SMS]. 2 versiyon: agresif kıtlık (acil) ve yumuşak hatırlatma (kaçırma). Her biri 2-3 cümle.`,
        expectedOutput: "Kıtlık etkisi yaratan stok uyarısı metni",
      },
      {
        title: "10. Değerlendirme (Yorum) Talebi",
        prompt: `Sipariş teslim edilen müşteriye yorum ve değerlendirme talebi mesajı yaz. Ürün: [ürün adı]. Platform: [Trendyol / e-posta / WhatsApp]. Samimi, baskı yapmayan, müşterinin deneyimini paylaşmasını kolaylaştıran 3 cümle. Yorum bırakma adımını kısaca açıkla.`,
        expectedOutput: "Yorum oranını artıran nazik değerlendirme talebi",
      },
      {
        title: "11. Sezon Kampanyası Planı",
        prompt: `[Yılbaşı / Sevgililer Günü / Ramazan / Okul Sezonu / Yaz] kampanyası için [X] günlük içerik ve promosyon planı yaz. Mağaza kategorisi: [bilgi]. Her gün için: 1 sosyal medya postu, 1 promosyon önerisi. Başlangıç ve bitiş tarihine göre ivme kur — zirve günde en güçlü CTA.`,
        expectedOutput: "Günlük kampanya takvimi, içerik ve promosyon planı",
      },
      {
        title: "12. Ürün Geri Kazanma Mesajı",
        prompt: `Sepete ürün ekleyen ama satın almayan müşteriye hatırlatma mesajı yaz. Ürün: [ürün adı + fiyat]. Kanal: [e-posta / SMS]. Versiyon 1: fayda hatırlatma. Versiyon 2: kısa süreli özel indirim teklifi. Her biri max 3 cümle, CTA içermeli.`,
        expectedOutput: "Terk edilen sepet geri kazanma mesajı, 2 versiyon",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. En çok satan 5 ürünün açıklamasını Prompt 1, 2 veya 3 ile yeniden üret. Trendyol'daki mevcut açıklamalarla karşılaştır.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 2,
        task: "Mağazana gelen en sık 15 soruyu listele. Prompt 6 formatıyla her biri için hazır yanıt şablonu üret. Google Doküman'a kaydet.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 3,
        task: "Canva'ya üye ol. En iyi 3 ürünün için ürün görseli ve Instagram post şablonu oluştur.",
        tool: "Canva AI",
        duration: "60 dakika",
      },
      {
        day: 4,
        task: "Bir ürün için Prompt 7 ile 3 farklı reklam metni varyantı üret. Meta Ads Manager'da küçük bütçeyle A/B testi başlat.",
        tool: "Claude.ai + Meta Ads",
        duration: "45 dakika",
      },
      {
        day: 5,
        task: "Yaklaşan bir sezon veya özel gün için Prompt 11 ile kampanya planı çıkar. İçerikleri zamanlama takvimi olarak kaydet.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 6,
        task: "En az yorum alan ürünlerine Prompt 10 ile değerlendirme talebi gönder. Sepet terk oranı yüksekse Prompt 12 ile geri kazanma mesajı kur.",
        tool: "Claude.ai",
        duration: "30 dakika",
      },
      {
        day: 7,
        task: "Bu haftaki A/B testi sonuçlarına bak. Kazanan reklam metni hangisi? Başarılı prompt'ları şablon olarak arşivle.",
        tool: "Meta Ads Manager",
        duration: "30 dakika",
      },
    ],

    growtTeaser:
      "Ürün içeriğini ve müşteri iletişimini sistematize ettin — bu başlangıç. Asıl büyüme, müşteri edinme maliyetini düşürmek, tekrar satın alma oranını artırmak ve yeni kanallar açmaktan geliyor. GROWT Method ile e-ticaret büyüme motorunun tüm bileşenlerini adım adım kur. Kişisel planın için growtify.ai/test.",

    ctaHeadline: "Bir sonraki adım: E-Ticaret Mağazana Özel AI Büyüme Planı",
    ctaBody:
      "İçerik üretimini hızlandırdın. Sırada müşteri edinme maliyetini düşürmek, tekrar alım döngüsünü kısaltmak ve ölçeklenebilir bir operasyon kurmak var. growtify.ai/test üzerinden ücretsiz AI Dijital Olgunluk Testi'ni tamamla — mağazana ve mevcut durumuna göre kişisel yol haritası.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 6: DİŞ HEKİMLİĞİ
  // ─────────────────────────────────────────────────────────────
  dis: {
    slug: "dis",
    coverTitle: "Dental Klinikler için AI İletişim & Pazarlama Rehberi",
    coverSubtitle: "Çok dilli hasta iletişimi, klinik itibar ve tedavi bilgilendirmesi — AI ile sistematik",
    sectorIcon: "🦷",

    intro: {
      forWho:
        "Bu rehber; yabancı hastalara ulaşmakta güçlük çeken, hasta bilgilendirmesini her seferinde sıfırdan yapan, online itibarını aktif yönetemeyen diş hekimleri, ortodontistler ve dental klinik sahipleri için hazırlandı.",
      whatYouGet: [
        "3 pratik senaryo — çok dilli hasta iletişim sistemi, tedavi bilgilendirme, itibar yönetimi",
        "5 AI aracı — dental klinik için seçilmiş",
        "12 kopyala-yapıştır prompt — İngilizce/Almanca hasta yazışmasından Google yorum yanıtına",
        "İlk 7 gün checklist — sistemi kurmak için adım adım",
        "Dental turizm için özel sunum şablonu",
      ],
      painHook:
        "Dental turizm Türkiye için büyük bir fırsat — ama klinikler yabancı hastalara ulaşamıyor çünkü dil bariyeri var ve online varlık yeterli değil. Aynı zamanda Türk hastalar da tedavi süreçleri hakkında yeterli bilgiye sahip olmadan kliniklere geliyor ve beklentiler çakışıyor. AI her iki sorunu çözüyor.",
    },

    sectorContext: {
      whyAiMatters:
        "Türkiye dental turizmi 2023 yılında 1,5 milyar dolar gelir üretti — ve büyüme devam ediyor. Avrupalı ve Orta Doğulu hastalar Türkiye'deki klinikleri hem fiyat hem kalite açısından tercih ediyor. Ancak bu pazara girebilmek için çok dilli iletişim, güçlü online itibar ve sistematik hasta deneyimi şart. AI bu üç bileşeni aynı anda güçlendiriyor.\n\nYurt içinde de tablo değişiyor: hastaların %72'si klinikleri seçmeden önce Google yorumlarını okuyor. Tek bir yanıtsız olumsuz yorum, potansiyel onlarca hastayı kaybettiriyor. AI ile yorum yönetimi ve hasta iletişimi sistematik hale geliyor.",
      stats: [
        {
          value: "1,5 milyar $",
          label: "Türkiye dental turizm geliri (2023) — en hızlı büyüyen sağlık turizmi segmenti.",
          source: "Türkiye Sağlık Turizmi Derneği, 2024",
        },
        {
          value: "%72",
          label: "Hastaların klinik seçmeden önce online yorumları okuyan oranı — itibar yönetimi kritik.",
          source: "BrightLocal Local Consumer Review Survey, 2024",
        },
        {
          value: "3 dil",
          label: "Türkiye'ye gelen dental turizm hastalarının en çok kullandığı diller: İngilizce, Almanca, Arapça.",
          source: "Sağlık Bakanlığı Sağlık Turizmi İstatistikleri, 2023",
        },
      ],
      comparison: {
        without: [
          "Yabancı hasta sorularına yanıt vermek için çevirmen tutmak veya yetersiz İngilizceyle geçiştirmek",
          "Her yeni hasta için tedavi süreci baştan anlatılıyor — zaman ve enerji kaybı",
          "Olumsuz Google yorumları yanıtsız kalıyor, yeni hastalar kaçıyor",
          "Dental turizm paketi hazırlamak için saatler harcanıyor",
        ],
        with: [
          "Yabancı hasta sorusu geliyor, AI dakikada İngilizce/Almanca/Arapça yanıt üretiyor",
          "Tedavi bilgilendirme şablonları hazır — implant, kaplama, ortodonti için ayrı ayrı",
          "Google yorum yanıtları AI ile anında hazırlanıyor — olumlu teşekkür, olumsuz profesyonel yanıt",
          "Dental turizm paket sunumu 1 oturumda hazır, 5 dilde",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: Çok Dilli Hasta İletişim Sistemi",
        problem:
          "WhatsApp'a İngilizce mesaj geliyor: fiyat soruyor, tedavi soruyum, nasıl geleyim diyor. Yanıt veremedin ya da yetersiz yanıt verdin. Hasta başka kliniğe gitti.",
        steps: [
          "Kliniğe sık gelen yabancı hasta soru tiplerini listele (fiyat, tedavi, ulaşım, konaklama)",
          "Claude ile her soru tipi için İngilizce, Almanca ve Arapça hazır yanıt üret",
          "Yanıtları kısa kod sistemiyle kaydet (örn: TR-FİYAT-EN = İngilizce fiyat yanıtı)",
          "Yeni soru geldiğinde ilgili şablonu kopyala, klinik ismi ve tarih ekle, gönder",
          "Daha kapsamlı sorgular için Claude'a doğrudan gir, bağlam ver, yanıt al",
        ],
        promptExample: `Sen bir dental kliniğin uluslararası hasta koordinatörüsün. Aşağıdaki hasta sorusuna kliniğim adına profesyonel bir yanıt yaz.

Klinik bilgileri:
- Klinik adı: [Klinik Adı]
- Şehir: [İstanbul / Ankara / İzmir / vb.]
- Uzmanlık alanları: [implant, kaplama, ortodonti vb.]
- Fiyat aralığı: [genel bilgi — "competitive pricing" kullan, net fiyat verme]
- Paket hizmetleri: [transfer / konaklama / tercüman vb.]

Hasta sorusu: [Soruyu buraya yapıştır]
Yanıt dili: [İngilizce / Almanca / Arapça / Rusça]

Yanıt şunları içermeli:
1. Nazik ve profesyonel karşılama
2. Soruya net yanıt (belirsiz bilgi için "detayları görüşelim" yönlendirmesi)
3. Sonraki adım için net CTA (WhatsApp, randevu, muayene)
4. İmza (Dr. [Ad], klinik adı, iletişim)

Medically accurate, empathetic, conversion-focused tone.`,
        before: "Yabancı hasta sorusuna yanıt: 30 dakika + çevirmen ihtiyacı ya da kaybedilen hasta",
        after: "Şablon seç + kişiselleştir + gönder: 3-5 dakika, dil bariyeri yok",
      },
      {
        title: "Senaryo 2: Tedavi Planı + Hasta Bilgilendirme Otomasyonu",
        problem:
          "Her implant hastasına aynı bilgileri anlatıyorsun: kaç seans, iyileşme süresi, ne yiyecek, ne yemeyecek. Bu bilgilendirme hem zaman alıyor hem hasta hasta değişiyor — bazen eksik kalıyor.",
        steps: [
          "En sık uyguladığın 5 tedavi için bilgilendirme şablonu oluştur",
          "Claude ile her tedavi için Türkçe + İngilizce hasta bilgi dokümanı üret",
          "Dokümanları PDF'e dönüştür veya WhatsApp'ta mesaj olarak gönder",
          "Tedavi öncesi, tedavi günü ve tedavi sonrası olmak üzere 3 aşamalı mesaj dizisi kur",
          "Aynı şablonları web sitesindeki SSS bölümü için de kullan",
        ],
        promptExample: `Aşağıdaki dental tedavi için kapsamlı hasta bilgilendirme dokümanı hazırla.

Tedavi: [İmplant / Porselen Kaplama / Ortodonti (Şeffaf Plak) / Diş Beyazlatma / Kanal Tedavisi]
Hedef hasta profili: [Türk hasta / Uluslararası hasta]
Dil: [Türkçe / İngilizce]

Doküman şunları içermeli:
1. Tedavi özeti (2-3 cümle, teknik jargon yok)
2. Tedavi öncesi hazırlık (hasta ne yapmalı)
3. Tedavi gününde neler olacak (adım adım, kaygıyı azaltacak dil)
4. İyileşme süreci ve tahmini süre
5. Beslenme ve aktivite kısıtlamaları
6. Ne zaman bizi aramalısın (acil durum işaretleri)
7. Bakım ve koruma önerileri (uzun vadeli)

Not: Medikal açıdan doğru, anlaşılır, hastayı rahatlatacak dil kullan. "Uzman hekiminizin yönlendirmesini takip edin" uyarısını ekle.`,
        before: "Her hastaya sözlü bilgilendirme: 10-15 dakika, tutarsız, unutulan detaylar",
        after: "Hazır PDF dokümanı + mesaj dizisi: 2 dakika gönderme, eksiksiz bilgilendirme",
      },
      {
        title: "Senaryo 3: Klinik İtibar Yönetimi",
        problem:
          "Google'da klinikle ilgili yorum var — hem olumlu hem olumsuz. Olumlu yorumlar yanıtsız kalıyor, teşekkür etmiyorsun. Olumsuz yoruma yanlış veya savunmacı yanıt veriyorsun. Bu durum yeni hastaların klinik tercihini olumsuz etkiliyor.",
        steps: [
          "Google My Business profilini aç, yorumları listele",
          "Her yorum tipi için (olumlu/nötr/olumsuz) AI ile yanıt şablonu üret",
          "Haftalık 15 dakika: o haftaki yorumları yanıtla — şablonları özelleştirerek",
          "Memnun hastalardan aktif olarak yorum isteyen mesaj şablonu hazırla",
          "Sosyal medya için hasta deneyimi içeriği üret (izinli)",
        ],
        promptExample: `Dental kliniğim için Google yorumuna profesyonel yanıt yaz.

Klinik adı: [Klinik Adı]
Hekim: Dr. [Ad Soyad]

Yorum: [Yorumu buraya yapıştır]
Yorum puanı: [1-5 yıldız]
Yorum dili: [Türkçe / İngilizce / Diğer]

Yanıt kuralları:
- Olumlu yorum (4-5 yıldız): İçten teşekkür, kişisel detay varsa ona değin, geri gelmeye davet
- Nötr yorum (3 yıldız): Teşekkür + neyi iyileştirebileceğimizi öğrenmek isteme + doğrudan iletişim daveti
- Olumsuz yorum (1-2 yıldız): Deneyim için üzüldüğünü belirt, savunmacı olma, çözüm için özel iletişim daveti, ASLA hasta bilgisi paylaşma

KVKK/GDPR uyumu: Hasta adını veya tıbbi bilgisini yanıtta kullanma.
Yanıt: maksimum 150 kelime, profesyonel ama samimi.`,
        before: "Yorumlar yanıtsız kalıyor veya yanlış yanıtlanıyor — potansiyel hasta kaybı",
        after: "Haftada 15 dakika ile tüm yorumlar yanıtlanmış, itibar aktif yönetiliyor",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "Çok dilli hasta yazışmaları, tedavi bilgilendirme dokümanları ve Google yorum yanıtları için.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Hasta iletişimi, tedavi dokümanı, çok dilli yanıt",
      },
      {
        name: "Google My Business (business.google.com)",
        description: "Klinik Google profilini yönet — yorumlara yanıt ver, fotoğraf ekle, saat/bilgi güncelle.",
        free: true,
        link: "https://business.google.com",
        bestFor: "Yorum yönetimi, local SEO, klinik görünürlüğü",
      },
      {
        name: "Canva AI (canva.com)",
        description: "Hasta bilgilendirme broşürleri, sosyal medya görselleri ve klinik tanıtım materyalleri.",
        free: true,
        link: "https://canva.com",
        bestFor: "Hasta broşürü, sosyal medya, tanıtım görseli",
      },
      {
        name: "Calendly (calendly.com)",
        description: "Online randevu sistemi — uluslararası hastalar kendi saat dilimiyle randevu alabilir.",
        free: true,
        link: "https://calendly.com",
        bestFor: "Online randevu, uluslararası hasta koordinasyonu",
      },
      {
        name: "WhatsApp Business (business.whatsapp.com)",
        description: "Hızlı mesajlaşma, hazır yanıt şablonları ve uluslararası hasta iletişimi için.",
        free: true,
        link: "https://business.whatsapp.com",
        bestFor: "Hasta iletişimi, hazır yanıt, mesaj şablonları",
      },
    ],

    prompts: [
      {
        title: "1. Uluslararası Hasta İlk Sorgu Yanıtı (İngilizce)",
        prompt: `Write a professional response in English to a patient inquiry about dental treatment at our clinic. Clinic: [Name], Location: [City, Turkey]. Treatment asked about: [implant/veneers/orthodontics]. The response should: welcome warmly, confirm we offer this treatment, mention our general price advantage vs. EU/UK (without specific numbers), invite them to a free online consultation, include WhatsApp contact. Max 150 words.`,
        expectedOutput: "Professional English dental inquiry response, conversion-focused",
      },
      {
        title: "2. Fiyat Teklifi Yazışması",
        prompt: `[Ad] adlı hastaya [tedavi tipi] için fiyat teklifi yazışması yaz. Dil: [Türkçe / İngilizce]. Teklif: [fiyat + neleri kapsıyor]. Ödeme seçenekleri: [bilgi]. Paketin neden değer sunduğunu vurgula, karşılaştırma yapmadan. 200 kelime, güven veren, şeffaf ton.`,
        expectedOutput: "Fiyat teklifi yazışması, güven veren ve net",
      },
      {
        title: "3. Tedavi Planı Açıklaması — İmplant",
        prompt: `İmplant tedavisi planlanan [Ad] adlı hastaya tedavi sürecini anlatan Türkçe bilgilendirme metni yaz. Kaç seans, iyileşme süresi, geçici diş, sonuç beklentisi. Teknik terimler yok, kaygıyı azaltan, güven veren dil. 300 kelime. Sonunda: "Tüm sorularınız için Dr. [Ad] ile iletişime geçin" uyarısı.`,
        expectedOutput: "Hastayı rahatlatacak implant tedavi bilgilendirme metni",
      },
      {
        title: "4. Bakım Sonrası Talimatlar",
        prompt: `[Tedavi tipi: diş çekimi / implant yerleştirme / kaplama / kanal] sonrası hasta bakım talimatları yaz. Türkçe + İngilizce iki versiyon. 24 saat, 1 hafta ve 1 ay için ayrı öneriler. Yemek kısıtlamaları, ağrı yönetimi, ne zaman aranmalı. Kısa madde madde, basit dil.`,
        expectedOutput: "Tedavi sonrası bakım talimatları, iki dilde",
      },
      {
        title: "5. Google Yorum Yanıtı — Olumlu",
        prompt: `Kliniğimize 5 yıldız veren şu yoruma profesyonel teşekkür yanıtı yaz: [yorumu yapıştır]. Klinik adı: [isim]. İçten ama kısa, kişisel detaya değin (varsa), geri gelmeye davet et. Maksimum 80 kelime. Hasta adı veya tıbbi bilgi kullanma.`,
        expectedOutput: "Sıcak ve profesyonel olumlu yorum yanıtı",
      },
      {
        title: "6. Google Yorum Yanıtı — Olumsuz",
        prompt: `Kliniğimize 2 yıldız veren şu olumsuz yoruma yanıt yaz: [yorumu yapıştır]. Savunmacı olma, empati kur, çözüm için özel iletişim davetiyle kapat. Klinik adı: [isim]. İletişim: [telefon / e-posta]. Maksimum 100 kelime. KVKK: hasta adı veya tıbbi detay kullanma.`,
        expectedOutput: "Profesyonel ve empati kuran olumsuz yorum yanıtı",
      },
      {
        title: "7. Dental Turizm Paket Sunumu",
        prompt: `Uluslararası hastalar için [tedavi paketi: örn. tam ağız restorasyonu] paket sunumu yaz. Dil: İngilizce. Paketin içeriği: [tedaviler, transfer, konaklama, tercüman desteği]. Fiyat avantajı vs. Avrupa: [genel ifade, sayı verme]. CTA: free consultation. 250 kelime, güven odaklı, lüks hissi veren.`,
        expectedOutput: "Dental turizm paketi tanıtım metni, İngilizce",
      },
      {
        title: "8. Randevu Hatırlatma Mesajı",
        prompt: `[Ad] adlı hastaya yarınki saat [saat] randevusu için hatırlatma mesajı yaz. Klinik: [Klinik Adı], Adres: [adres]. Varsa hazırlık talimatı: [bilgi — örn. aç karnına gelme, röntgen getirim]. WhatsApp mesajı formatı. 3-4 cümle, samimi ve hatırlatıcı. Türkçe + İngilizce iki versiyon.`,
        expectedOutput: "Randevu hatırlatma mesajı, iki dilde",
      },
      {
        title: "9. Kontrol Randevusu Daveti",
        prompt: `[Son tedavi] üzerinden [X ay] geçti — [Ad] adlı hastaya kontrol randevusu için hatırlatma mesajı yaz. WhatsApp formatı. Tedaviyi hatırlat, kontrolün önemini vurgula, randevu almak için kolayca tıklanabilir yönlendirme yap. 3-4 cümle, sıcak ton.`,
        expectedOutput: "Kontrol randevu daveti mesajı",
      },
      {
        title: "10. Sosyal Medya — Tedavi Bilgi Postu",
        prompt: `[Diş implantı / Laminate kaplama / Invisalign / Diş beyazlatma] hakkında Instagram için eğitici post metni yaz. Hedef: bilgilendirme + klinik güveni artırma. Caption: merak uyandıran soru ile aç, 3-4 bilgi maddesi, CTA (randevu). 150 kelime, 10 hashtag. Tıbbi iddia yok, sadece bilgilendirme.`,
        expectedOutput: "Eğitici dental sosyal medya postu, hashtag dahil",
      },
      {
        title: "11. Hasta Memnuniyet Yorum Talebi",
        prompt: `Tedavisi başarıyla tamamlanan [Ad] adlı hastaya Google yorumu bırakmasını isteyen WhatsApp mesajı yaz. Baskı yapmayan, içten, 3-4 cümle. Yorum bırakma adımı için kolaylaştırıcı yönlendirme. Türkçe versiyon + İngilizce versiyon.`,
        expectedOutput: "Yorum oranını artıran nazik yorum talebi mesajı",
      },
      {
        title: "12. Klinik Tanıtım E-postası",
        prompt: `Kliniğimizi araştıran potansiyel uluslararası hastaya gönderilecek tanıtım e-postası yaz. Dil: İngilizce. Klinik: [isim, konum]. Uzmanlıklar: [liste]. Fark: [deneyim, ekipman, dil desteği]. Dental turizm avantajı: [maliyet tasarrufu — sayı vermeden]. CTA: ücretsiz online konsültasyon. 200 kelime, profesyonel ve güven veren.`,
        expectedOutput: "Uluslararası hasta çekmeye yönelik tanıtım e-postası",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. Kliniğe sık gelen 10 yabancı hasta sorusunu listele. Prompt 1 formatıyla İngilizce hazır yanıt şablonları üret.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 2,
        task: "Google My Business profilini güncelle (fotoğraf, saat, hizmetler). Bu haftaki yorumları Prompt 5 ve 6 ile yanıtla.",
        tool: "Google My Business + Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 3,
        task: "En sık uyguladığın 3 tedavi için Prompt 3 ve 4 ile Türkçe/İngilizce bilgilendirme dokümanı üret. PDF'e kaydet.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 4,
        task: "WhatsApp Business'a geç. Hazırladığın şablonları hızlı yanıt olarak kaydet. Calendly randevu sayfasını kur.",
        tool: "WhatsApp Business + Calendly",
        duration: "45 dakika",
      },
      {
        day: 5,
        task: "Dental turizm hedefliyorsan Prompt 7 ile İngilizce paket sunumunu hazırla. Kliniğin web sitesine veya Instagram'a ekle.",
        tool: "Claude.ai + Canva AI",
        duration: "60 dakika",
      },
      {
        day: 6,
        task: "Son 10 tedaviyi tamamlayan hastaya Prompt 11 ile yorum talebi gönder.",
        tool: "Claude.ai + WhatsApp Business",
        duration: "30 dakika",
      },
      {
        day: 7,
        task: "Bu haftaki yeni yorumları kontrol et ve yanıtla. 6 aylık kontrolü gelen hastalar için Prompt 9 ile hatırlatma gönder.",
        tool: "Google My Business + Claude.ai",
        duration: "30 dakika",
      },
    ],

    growtTeaser:
      "Hasta iletişimini ve itibar yönetimini sistematize ettin. Asıl büyüme, yeni hasta edinmeyi otomatize etmek ve sadakat sistemi kurmaktan geçiyor — sosyal medya, SEO, referans ağı ve dental turizm kanalları. GROWT Method ile tüm büyüme motorunu adım adım kur. Kişisel planın için growtify.ai/test.",

    ctaHeadline: "Bir sonraki adım: Kliniğine Özel AI Büyüme Planı",
    ctaBody:
      "İletişim ve itibar sistemini kurdun. Sırada yeni hasta akışını otomatize etmek, dental turizm kanalı açmak ve tekrar ziyaret oranını artırmak var. growtify.ai/test üzerinden ücretsiz AI Dijital Olgunluk Testi'ni tamamla — kliniğine özel yol haritası 5 dakikada.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 7: MUHASEBE
  // ─────────────────────────────────────────────────────────────
  muhasebe: {
    slug: "muhasebe",
    coverTitle: "Mali Müşavirler için AI Otomasyon Rehberi",
    coverSubtitle: "Ay sonu kapanışından mevzuat takibine — tekrar eden işleri AI'a bırak",
    sectorIcon: "📊",

    intro: {
      forWho:
        "Bu rehber; ay sonu kapanış kaosunu yaşayan, mevzuat değişikliklerini takip etmekte güçlük çeken, müşteri danışmanlığına vakit ayıramayan SMMM'ler, mali müşavirler ve muhasebe bürosu sahipleri için hazırlandı.",
      whatYouGet: [
        "3 pratik senaryo — belge işleme otomasyonu, mevzuat takibi, aylık müşteri raporu",
        "5 AI aracı — muhasebe pratiği için seçilmiş",
        "12 kopyala-yapıştır prompt — belge sınıflandırmadan vergi planlama notuna",
        "İlk 7 gün checklist — sistemi büronuza entegre etmek için adım adım",
        "Eskiden → Şimdi karşılaştırma — ay sonu kapanış süresinde somut tasarruf",
      ],
      painHook:
        "Ay sonu geliyor: yüzlerce belge, son dakika beyannameler, müşteri telefonları. Her şey aynı anda — ve danışmanlık yapmak için vakit kalmıyor. AI bu belge yükünü azaltıyor; sen değer katan işe odaklanıyorsun.",
    },

    sectorContext: {
      whyAiMatters:
        "Muhasebe ve mali müşavirlik, AI'dan en çok faydalanacak meslekler arasında gösteriliyor — ancak bu tehdit değil, fırsat. Tekrar eden belgeler işleme, veri girişi ve standart raporlama AI ile otomatize edilebilir; müşavi danışmanlık, strateji ve ilişki yönetimine odaklanabilir. Türkiye'de vergi mevzuatı sık değişiyor — bu değişiklikleri takip etmek ve müşterilere anlaşılır biçimde aktarmak başlı başına bir iş.\n\nDünyada Big 4 muhasebe firmaları (Deloitte, PwC, EY, KPMG) AI'ı belge analizi ve raporlamada yoğun kullanıyor. Küçük ve orta ölçekli müşavirler için aynı araçlar artık ücretsiz veya çok düşük maliyetle erişilebilir.",
      stats: [
        {
          value: "%40",
          label: "Muhasebe uzmanlarının veri girişi ve belge işlemeye harcadığı zaman oranı — AI ile bu süre dramatik düşebilir.",
          source: "Accenture Finance 2025 Report",
        },
        {
          value: "4x",
          label: "AI araçları kullanan muhasebe bürolarının rapor hazırlama hızı artışı — aynı kalitede, çok daha kısa sürede.",
          source: "AICPA Digital CPA Survey, 2024",
        },
        {
          value: "%78",
          label: "KOBİ müşterilerinin mali müşavirlerinden daha proaktif danışmanlık beklentisi — AI bu zamanı açıyor.",
          source: "Sage SME Accounting Report, 2023",
        },
      ],
      comparison: {
        without: [
          "Yüzlerce fatura ve belge manuel olarak sınıflandırılıyor ve eşleştiriliyor",
          "Mevzuat değişikliklerini takip etmek için ayrı zaman harcıyorsun, bazen kaçırıyorsun",
          "Aylık müşteri raporu her seferinde sıfırdan hazırlanıyor",
          "Müşterilere danışmanlık verecek zaman kalmıyor — sadece beyanname yapılıyor",
        ],
        with: [
          "Belge listesini AI'a veriyorsun, sınıflandırma ve özet dakikalar içinde hazır",
          "Mevzuat güncellemelerini AI ile özetleyip müşteriye hazır bilgilendirme mektubu gönderiyorsun",
          "Aylık müşteri raporu şablonu AI ile 20 dakikada hazır, kişiselleştirme 10 dakika",
          "Tekrar işler AI'da — sen danışmanlığa, büyüme fırsatlarına odaklanıyorsun",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: Belge İşleme ve Sınıflandırma Otomasyonu",
        problem:
          "Müşteriden yüzlerce fatura, fiş ve dekont geliyor — her biri farklı format, bazıları okunamıyor. Bunları sınıflandırmak, muhasebe hesaplarına eşleştirmek saatler alıyor. Bu iş ne AI ne de sen olmadan hızlanamıyor — ama AI bu sürecin önemli bir bölümünü üstlenebiliyor.",
        steps: [
          "OCR aracı ile belgelerden metin çıkar (Google Lens, Adobe Scan veya benzeri)",
          "Çıkan metni Claude'a yapıştır ve aşağıdaki sınıflandırma prompt'unu kullan",
          "AI her belgeyi tip, tutar, tarih ve hesap kodu önerisiyle sınıflandırır",
          "Sınıflandırmayı kontrol et, varsa düzelt ve muhasebe programına aktar",
          "Hatalı veya eksik belgeleri otomatik olarak müşteriye bildiren şablon mesajı hazırla",
        ],
        promptExample: `Sen deneyimli bir muhasebe uzmanısın. Aşağıdaki belge listesini sınıflandır ve her biri için muhasebe kaydı önerisi yap.

Müşteri tipi: [KOBİ / Şahıs firması / Limited şirket / Anonim şirket]
Dönem: [Ay/Yıl]
Faaliyet alanı: [Sektör]

Belge listesi (her satır bir belge):
[Belge 1: OCR metni veya manuel giriş]
[Belge 2: ...]
[...]

Her belge için şunları ver:
1. Belge tipi (fatura/fiş/dekont/banka ekstresi/sözleşme/diğer)
2. Tarih
3. Tutar (KDV hariç/dahil ayrımıyla)
4. Karşı taraf adı
5. Önerilen hesap kodu (Tek Düzen Hesap Planı'na göre)
6. Özel not (varsa: eksik bilgi, dikkat edilmesi gereken durum)

Çıktıyı tablo formatında ver. Emin olmadığın durumları "kontrol gerekli" olarak işaretle.`,
        before: "100 belge için sınıflandırma: 3-4 saat manuel iş",
        after: "OCR + AI sınıflandırma + kontrol: 45-60 dakika",
      },
      {
        title: "Senaryo 2: Mevzuat Takibi ve Müşteri Bilgilendirme",
        problem:
          "Vergi usul kanunu değişti, yeni bir tebliğ yayınlandı, e-fatura zorunluluk eşiği düştü. Bu değişiklikleri takip etmek zaten bir iş — bir de müşterilere anlaşılır biçimde aktarmak ayrı bir iş. Çoğu zaman ya geç kalınıyor ya yetersiz anlatılıyor.",
        steps: [
          "Maliye Bakanlığı, Gelir İdaresi Başkanlığı veya muhasebe derneklerinin bültenlerini takip et",
          "Yeni mevzuat metnini veya özetini Claude'a ver",
          "AI müşteriye gönderilecek anlaşılır bilgilendirme mektubunu üretir",
          "Mektubu büronun marka diliyle düzenle, müşteri tipine göre uyarla",
          "Toplu gönderim için e-posta listeni kullan — tüm müşterilere tek seferde",
        ],
        promptExample: `Aşağıdaki vergi mevzuatı değişikliğini müşterilerime göndermek üzere anlaşılır Türkçeye çevir.

Mevzuat/tebliğ özeti: [Buraya metni yapıştır veya kısaca özetle]
Yürürlük tarihi: [Tarih]
Etkilenen müşteri tipleri: [Hangi firmalar etkileniyor]

Müşteri bilgilendirme mektubu hazırla:
- Başlık: Dikkat çekici ama teknik olmayan
- Ne değişti: 3-4 madde, basit dil, jargon yok
- Müşterimiz ne yapmalı: Somut adımlar, tarihler
- Son tarih uyarısı: Net ve vurgulu
- "Bu konuda yardımcı olmaktan memnuniyet duyarım" kapanışı

Format: E-posta gövdesi, maksimum 300 kelime, profesyonel ama anlaşılır.
Not: "Ayrıntılı bilgi ve danışmanlık için mali müşavirinizle görüşün" uyarısı ekle.`,
        before: "Mevzuat metni okuma + müşteri mektubu yazma: 2-3 saat (tüm müşteriler için)",
        after: "Mevzuat özeti + AI mektup + düzenleme: 30-45 dakika, toplu gönderim",
      },
      {
        title: "Senaryo 3: Aylık Müşteri Mali Raporu",
        problem:
          "Her ay müşteriye mali rapor vermek istiyorsun — ama rapor hazırlamak için vakit kalmıyor. Ya hiç gönderilmiyor ya da çok geç gönderiliyor. Müşteri muhasebecisine ne yapıldığını, ne durumda olduğunu bilmiyor.",
        steps: [
          "Müşteri için aylık temel verileri hazırla: gelir, gider, KDV, ana kalemler",
          "Bu verileri Claude'a ver, aşağıdaki rapor prompt'unu kullan",
          "AI rapor taslağını üretir — yönetici özeti, grafikler için veri, öneriler",
          "Kendi gözlemlerini ve varsa uyarıları ekle",
          "PDF olarak kaydet ve müşteriye gönder — ayda bir kez, her müşteri için 20 dakika",
        ],
        promptExample: `Aşağıdaki verileri kullanarak [Ay/Yıl] dönemi için müşteri mali rapor özeti hazırla.

Müşteri: [Firma adı]
Faaliyet alanı: [Sektör]
Dönem: [Ay/Yıl]

Mali veriler:
- Toplam gelir: [TL]
- Toplam gider: [TL]
- Net kar/zarar: [TL]
- KDV yükü: [TL]
- En büyük 3 gider kalemi: [liste]
- En büyük 3 gelir kalemi: [liste]
- Geçen aya göre değişim: [+/- %]
- Banka bakiyesi (dönem sonu): [TL]
- Vadesi geçmiş alacaklar: [TL]
- Yaklaşan ödeme yükümlülükleri: [tarih + tutar]

Raporda şunlar olsun:
1. Yönetici özeti (3-4 cümle, teknik olmayan dil)
2. Dönem performansı (geçen ayla karşılaştırma)
3. Dikkat edilmesi gereken 2-3 finansal nokta
4. Gelecek dönem için 2 öneri
5. Yaklaşan önemli tarihler (beyanname, vergi ödeme vb.)

Türkçe, müşterinin anlayacağı dil, teknik muhasebe jargonu minimum.`,
        before: "Aylık rapor hazırlama: 1-2 saat/müşteri (çoğu zaman yapılmıyor)",
        after: "Veri girişi + AI taslak + kontrol: 20-25 dakika/müşteri",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "Belge analizi, mevzuat özetleme, müşteri mektupları ve raporlama için en kapsamlı AI asistanı.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Belge sınıflandırma, mevzuat özeti, müşteri raporu, danışmanlık notu",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description: "Alternatif metin üretimi ve Excel formül yardımı için kullanılabilir.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Excel formülleri, alternatif rapor metni, hızlı soru-cevap",
      },
      {
        name: "Adobe Scan / Google Lens",
        description: "Kağıt belgeleri OCR ile dijitale çeviren ücretsiz araçlar — AI işleme için ön adım.",
        free: true,
        link: "https://acrobat.adobe.com/tr/tr/mobile/scanner-app.html",
        bestFor: "Fatura ve fiş tarama, OCR metin çıkarma",
      },
      {
        name: "Notion AI (notion.so)",
        description: "Müşteri dosyaları, görev takibi ve büro süreç yönetimi için AI destekli araç.",
        free: false,
        link: "https://notion.so",
        bestFor: "Müşteri CRM, görev takibi, iç süreç dokümantasyonu",
      },
      {
        name: "Microsoft Copilot (Excel AI)",
        description: "Excel tablolarında AI destekli analiz, formül üretimi ve otomatik özet raporlama.",
        free: false,
        link: "https://www.microsoft.com/tr-tr/microsoft-365/copilot",
        bestFor: "Mali tablo analizi, otomatik grafik, pivot tablo yardımı",
      },
    ],

    prompts: [
      {
        title: "1. Belge Sınıflandırma",
        prompt: `Aşağıdaki belge listesini Türk muhasebe standartlarına göre sınıflandır. Her belge için: belge tipi, tarih, tutar, karşı taraf, önerilen hesap kodu (TDP), özel not. Tablo formatında ver. [Belge listesini buraya yapıştır]`,
        expectedOutput: "Yapılandırılmış belge sınıflandırma tablosu, hesap kodu önerileriyle",
      },
      {
        title: "2. Fatura Özet Raporu",
        prompt: `Şu dönem faturaları için özet rapor çıkar: [fatura listesi]. Toplam KDV hariç/dahil tutarlar, tedarikçi bazında gruplandırma, en büyük 5 harcama kalemi. Tablo + kısa yorum.`,
        expectedOutput: "Fatura özet tablosu ve harcama analizi",
      },
      {
        title: "3. Mevzuat Özeti — Müşteri Mektubu",
        prompt: `Şu mevzuat değişikliğini müşteri bilgilendirme mektubuna dönüştür: [mevzuat metni veya özeti]. Yürürlük: [tarih]. 300 kelime, teknik jargon yok, müşterinin yapması gerekenler net. "Detaylar için müşavirinizle görüşün" uyarısı ekle.`,
        expectedOutput: "Müşteriye göndermeye hazır mevzuat bilgilendirme mektubu",
      },
      {
        title: "4. Müşteri Bilgilendirme — Yeni Mevzuat",
        prompt: `E-fatura zorunluluk eşiği [X TL] olarak güncellendi. [Kapsam, tarih, istisna bilgileri]. KOBİ müşterimize bu değişikliği açıklayan kısa e-posta yaz. Şimdi ne yapmalılar, son tarih ne, büromuz ne yapacak — net, sade, 200 kelime.`,
        expectedOutput: "Yeni mevzuatı anlatan müşteri e-postası",
      },
      {
        title: "5. Aylık Mali Rapor",
        prompt: `[Ay/Yıl] dönemi için [Firma adı] mali raporu hazırla. Gelir: [TL], Gider: [TL], Net: [TL], Önemli değişimler: [liste]. Yönetici özeti (3 cümle), dönem değerlendirmesi, 2 öneri, yaklaşan önemli tarihler. Teknik jargon minimum.`,
        expectedOutput: "Müşteriye göndermeye hazır aylık mali rapor",
      },
      {
        title: "6. Vergi Planlama Notu",
        prompt: `[Müşteri tipi ve faaliyet alanı] için [Yıl] yılı vergi planlama notu hazırla. Mevcut vergi yükü: [özet]. Yararlanılabilecek istisna ve indirimler: [varsa]. 3 somut aksiyon önerisi — kısa vadeli (bu ay), orta vadeli (3 ay), uzun vadeli (yıl sonu). Teknik ama anlaşılır.`,
        expectedOutput: "Müşteriye özel vergi planlama aksiyon notları",
      },
      {
        title: "7. Müşteri Danışmanlık Önerisi",
        prompt: `[Müşteri] için şu finansal tabloya bakarak proaktif danışmanlık önerisi hazırla: [özet finansal durum]. Büyüme fırsatı, risk uyarısı ve optimize edilebilecek alan olmak üzere 3 madde. Danışmanlık toplantısında sunulacak format, kısa ve güçlü.`,
        expectedOutput: "Müşteri toplantısına hazır proaktif danışmanlık notları",
      },
      {
        title: "8. Beyanname Kontrol Listesi",
        prompt: `[KDV / Muhtasar / Kurumlar Vergisi / Gelir Vergisi] beyannamesi için dönem kontrol listesi hazırla. Hangi belgeler gerekli, hangi hesaplar kontrol edilmeli, hangi istisnalar ve indirimler değerlendirilmeli, son tarih. Büro kullanımı için madde madde, onay kutusu formatında.`,
        expectedOutput: "Beyanname hazırlık kontrol listesi, büro içi kullanıma hazır",
      },
      {
        title: "9. Borç Takip Hatırlatma",
        prompt: `[Müşteri] adına [Borçlu firma] için vadesi [tarih] geçen [TL] tutarındaki alacak için hatırlatma mektubu yaz. İlk hatırlatma: nazik ve profesyonel. İkinci hatırlatma: daha net, hukuki süreç imasıyla. İki versiyon.`,
        expectedOutput: "İki kademeli alacak hatırlatma mektubu",
      },
      {
        title: "10. Dönem Kapanış Raporu",
        prompt: `[Dönem: Ay/Çeyrek/Yıl] kapanış raporu hazırla. Veriler: [özet]. Kapanış kontrol listesi durumu: [tamamlanan/eksik]. Beyanname durumu: [bilgi]. Müşteri için kapanış özet mektubu: 200 kelime, ne yapıldı, sonuç ne, sırada ne var.`,
        expectedOutput: "Dönem kapanış özet raporu ve müşteri mektubu",
      },
      {
        title: "11. Asgari Ücret / SGK Bilgilendirmesi",
        prompt: `Yeni asgari ücret/SGK oranı değişikliği bildirimi: [değişiklik detayı, yürürlük tarihi]. Çalışanı olan müşterilerime gönderilecek bilgilendirme mektubu yaz. İşverenin yapması gerekenler, etkisi, son tarih — 200 kelime, net ve uygulanabilir.`,
        expectedOutput: "İşveren müşterilere asgari ücret/SGK bilgilendirme mektubu",
      },
      {
        title: "12. Yıllık Değerlendirme Özeti",
        prompt: `[Müşteri] için [Yıl] yılı değerlendirme özeti hazırla. Veriler: [yıllık gelir, gider, kar, vergi yükü, önemli gelişmeler]. Yılın değerlendirmesi, öğrenilenler, gelecek yıl için 3 öncelikli öneri. Yıllık toplantı sunumuna hazır format, 1 sayfa.`,
        expectedOutput: "Yıllık değerlendirme özeti, müşteri toplantısına hazır",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. Geçen ay müşteriden gelen belge listesini Al ve Prompt 1 ile sınıflandırma testini yap. Sonucu mevcut sisteminle karşılaştır.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 2,
        task: "Son vergi mevzuatı değişikliğini Prompt 3 ile müşteri mektubuna dönüştür. 1 müşteriye test olarak gönder, geri bildirim al.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 3,
        task: "En büyük 3 müşteri için Prompt 5 ile aylık mali rapor taslağı üret. Kendi değerlendirmelerini ekle, sonucu gözlemle.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 4,
        task: "Adobe Scan veya Google Lens'i kur. Kağıt belge tarama iş akışını test et — OCR → Claude → sınıflandırma.",
        tool: "Adobe Scan + Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 5,
        task: "Yaklaşan beyanname dönemi için Prompt 8 ile kontrol listesi hazırla. Büronun standart sürecine entegre et.",
        tool: "Claude.ai",
        duration: "30 dakika",
      },
      {
        day: 6,
        task: "Vadesi geçmiş alacakları olan müşteriler için Prompt 9 ile hatırlatma mektuplarını hazırla ve gönder.",
        tool: "Claude.ai",
        duration: "30 dakika",
      },
      {
        day: 7,
        task: "Bu haftanın AI denemelerini değerlendir. Hangi süreçler en çok hızlandı? Büro iş akışına kalıcı olarak eklenecek 3 prompt'u belirle.",
        tool: "Claude.ai",
        duration: "30 dakika",
      },
    ],

    growtTeaser:
      "Tekrar eden işlerin büyük bölümünü AI'a devretti ve müşteri raporlamasını sistematize ettin. Asıl fırsat, müşteri danışmanlığını derinleştirmek ve büro kapasiteni artırmaktan geçiyor. GROWT Method ile bu geçişi adım adım yönet — teknik süreçlerden stratejik danışmanlığa. Kişisel planın için growtify.ai/test.",

    ctaHeadline: "Bir sonraki adım: Büronuza Özel AI Dönüşüm Planı",
    ctaBody:
      "Belge işleme ve raporlamayı hızlandırdın. Sırada müşteri portföyünü büyütmek, danışmanlık gelirini artırmak ve büro operasyonunu ölçeklendirmek var. growtify.ai/test üzerinden ücretsiz AI Dijital Olgunluk Testi'ni tamamla — büronuza özel yol haritası 5 dakikada.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 8: ECZACILIK
  // ─────────────────────────────────────────────────────────────
  eczacilik: {
    slug: "eczacilik",
    coverTitle: "Eczacılar için AI Stok, Müşteri & İçerik Rehberi",
    coverSubtitle: "Stok tahmini, kronik hasta takibi ve e-eczane içeriği — hepsini sistematize et",
    sectorIcon: "💊",

    intro: {
      forWho:
        "Bu rehber; stok tahminini sezgiye bırakan, kronik hasta takibini manuel yapan, e-eczane ve online içerik fırsatını kaçıran serbest eczacılar ve eczane sahipleri için hazırlandı.",
      whatYouGet: [
        "3 pratik senaryo — stok ve talep tahmini, e-eczane içerik üretimi, müşteri sadakat sistemi",
        "5 AI aracı — eczane operasyonu için seçilmiş",
        "10 kopyala-yapıştır prompt — ürün açıklamasından kronik hasta takibine",
        "İlk 7 gün checklist — sistemi eczanenize entegre etmek için adım adım",
        "Yasal uyarı şablonları — ilaç içeriğinde zorunlu uyarıları otomatize et",
      ],
      painHook:
        "Mevsim değişiyor ama hangi ürünün stoğunu ne kadar artıracağını tam bilemiyorsun. Kronik hastalara düzenli hatırlatma göndermek istiyorsun ama vakit yok. E-eczane için içerik üretmek ayrı bir iş. AI bu üç sorunu aynı anda çözüyor.",
    },

    sectorContext: {
      whyAiMatters:
        "Türkiye eczacılık sektörü dijital dönüşümde kritik bir kavşakta. E-eczane yasal düzenlemelerle birlikte büyüyor, müşteriler online araştırma yapıp eczaneye geliyor ve kronik hasta yönetimi giderek daha fazla önem kazanıyor. AI bu değişimin tam ortasında eczacılara güçlü araçlar sunuyor.\n\nDünyada CVS, Walgreens gibi eczane zincirleri AI ile stok optimizasyonunda %20-30 maliyet düşüşü sağladığını raporluyor. Türkiye'deki bağımsız eczacılar için aynı araçlar artık erişilebilir — ve rekabet avantajı yaratıyor.",
      stats: [
        {
          value: "%23",
          label: "Eczanelerde ilaç stok israfı oranı — doğru tahminle bu oran dramatik düşebilir.",
          source: "WHO Pharmaceutical Management Report, 2023",
        },
        {
          value: "3,2 milyar TL",
          label: "Türkiye e-eczane pazar büyüklüğü (2024 tahmini) — online kanalda büyüme hızlanıyor.",
          source: "IQVIA Turkey Pharmaceutical Market Report, 2024",
        },
        {
          value: "%67",
          label: "Kronik hasta ilaç uyumunu artıran hatırlatma sistemlerinin etkinliği — düzenli iletişim fark yaratıyor.",
          source: "Journal of Medical Internet Research, 2023",
        },
      ],
      comparison: {
        without: [
          "Stok kararları geçen yılın verilerine ve sezgiye dayanıyor — ya fazla alım ya stok kesintisi",
          "Kronik hastalar ilacını bitirince hatırlıyor — uyum düşük, hasta kayıpları var",
          "E-eczane veya Instagram için içerik üretmek ayrı bir zaman yükü",
          "Her ürün için yasal uyarı ve kullanım bilgisi sıfırdan yazılıyor",
        ],
        with: [
          "Geçmiş satış verisi + mevsim faktörü girişiyle AI talep tahmini yapıyor",
          "Kronik hasta hatırlatma mesajları AI ile hazır, otomatik döngüde",
          "E-eczane ürün açıklamaları ve Instagram içeriği AI ile hızlı üretiliyor",
          "İlaç bilgi şablonları ve yasal uyarılar tek seferinde kurulup tekrar kullanılıyor",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: Stok ve Talep Tahmin Sistemi",
        problem:
          "Grip sezonu geliyor ama ne kadar C vitamini, ne kadar antihistaminik alacaksın? Geçen yıl fazla aldın, bitti. Bu yıl az alırsın, stok bitecek. Bu kararı sezgiye bırakmak hem maliyet hem müşteri memnuniyeti kaybı.",
        steps: [
          "Geçen yılın aynı dönem satış verilerini hazırla (en az 3 aylık, ürün bazında)",
          "Mevsimsel faktörleri ve yerel demografik bilgileri ekle",
          "Claude'a bu verileri ver ve talep tahmini prompt'unu çalıştır",
          "AI önceliklendirme listesi ve tahmini sipariş miktarları üretir",
          "Sonucu kendi gözlemlerinle karşılaştır, gerekirse ayarla — ama veri odaklı karar ver",
        ],
        promptExample: `Sen deneyimli bir eczane stok yönetim uzmanısın. Aşağıdaki verileri analiz ederek gelecek dönem için stok önerisi hazırla.

Eczane profili:
- Bölge tipi: [Şehir merkezi / Semt / Kırsal]
- Hasta profili: [Yaşlı ağırlıklı / Genç aile / Karma]
- Yakın çevrede: [Hastane / Klinik / Okul / Sanayi vb.]

Geçen yıl aynı dönem satış verileri:
[Ürün adı — Aylık satış adedi — Ortalama fiyat]
[Ürün 2 — ...]
[...]

Bu dönem özel faktörler:
- Mevsim: [İlkbahar / Yaz / Sonbahar / Kış]
- Bilinen salgın/hastalık: [Varsa belirt]
- Yerel gelişme: [Okul açılışı / Fabrika kurulumu vb.]

Şunları üret:
1. En kritik 10 ürün için tahmini sipariş miktarı (gerekçesiyle)
2. Aşırı stok riski olan ürünler (azalt önerisi)
3. Stok kesintisi riski olan ürünler (artır önerisi)
4. Bu dönem için 3 mevsimsel fırsat ürün önerisi

Not: Tahminler geçmiş veriye dayalı — nihai karar eczacının sorumluluğunda.`,
        before: "Stok kararı: sezgi + geçen yılı hatırlamaya çalışmak — hatalı tahminler",
        after: "Veri + AI analiz + eczacı onayı: sistematik, veri odaklı stok kararı",
      },
      {
        title: "Senaryo 2: E-Eczane İçerik Üretimi",
        problem:
          "E-eczane kanalı açtın ya da açmayı düşünüyorsun. Yüzlerce ürün için açıklama, kullanım bilgisi ve yasal uyarı lazım. Bunları tek tek yazmak haftalar alıyor.",
        steps: [
          "Önce en çok satan 20 OTC ürününü belirle",
          "Her ürün için ürün bilgisi dokümanından temel bilgileri çıkar (prospektüs/kısa ürün bilgisi)",
          "Claude'a bu bilgileri ver ve aşağıdaki içerik üretim prompt'unu kullan",
          "AI yasal uyarılı ürün açıklaması üretir — sen kontrol edip yayınlarsın",
          "Onaylananları şablon olarak kaydet — benzer kategorilerde hızlıca uyarla",
        ],
        promptExample: `Aşağıdaki OTC ilaç/sağlık ürünü için e-eczane ürün sayfası içeriği hazırla.

Ürün bilgileri:
- Ürün adı: [Ürün adı]
- Kategori: [Ağrı kesici / Vitamin / Cilt bakımı / Soğuk algınlığı / Sindirim vb.]
- Etken madde: [varsa]
- Formülasyon: [Tablet / Kapsül / Şurup / Krem / vb.]
- Kullanım endikasyonu: [ne için kullanılır]
- Dozaj: [genel kullanım dozu]
- Kontraendikasyonlar: [kimler kullanmamalı]
- Yan etkiler: [önemli olanlar]
- Saklama koşulları: [bilgi]

İçerik şunları içermeli:
1. Ürün başlığı (SEO uyumlu, max 60 karakter)
2. Kısa açıklama (2-3 cümle, tüketici dilinde)
3. Detaylı ürün açıklaması (300 kelime, fayda odaklı ama dikkatli dil)
4. Kullanım bilgisi (madde madde, anlaşılır)
5. Uyarılar ve yasal disclaimer (zorunlu)

ZORUNLU UYARI — her içeriğin sonuna ekle:
"Bu ürün ile ilgili bilgiler genel bilgilendirme amaçlıdır. İlaç kullanımı konusunda eczacınıza veya hekiminize danışınız. Reçetesiz satılabilir olsa dahi her ilaç veya sağlık ürünü herkes için uygun olmayabilir."`,
        before: "Her ürün içeriği: 30-45 dakika — yasal kontrol dahil",
        after: "Şablon + AI üretim + eczacı kontrolü: 10-15 dakika/ürün",
      },
      {
        title: "Senaryo 3: Kronik Hasta Takip ve Sadakat Sistemi",
        problem:
          "Diyabet, hipertansiyon, tiroid hastaların var. İlacı bitince hatırlatmak istiyorsun ama manuel takip yapılamıyor. Bir eczaneye bağlı kalmayan hastalar var — sadakat yok çünkü iletişim yok.",
        steps: [
          "Kronik hasta listeni oluştur (ad, ilaç, kullanım süresi, son temin tarihi)",
          "Her hasta için yaklaşık ilaç bitiş tarihini hesapla",
          "Claude ile kişiselleştirilmiş hatırlatma mesajı şablonları üret",
          "WhatsApp Business'ta hazır yanıt olarak kaydet",
          "Her hafta 15 dakika: o hafta ilacı bitecek hastalara mesaj gönder",
        ],
        promptExample: `Kronik ilaç kullanan hastam için WhatsApp hatırlatma mesajı şablonu hazırla.

Hasta bilgileri:
- Ad: [Ad — sadece şablonda, gerçek mesajda dolduracaksın]
- İlaç kategorisi: [Hipertansiyon / Diyabet / Tiroid / Kolesterol / Diğer]
- Kullanım süresi: [Aylık / 3 aylık]
- Son temin tarihi: [Tarih]
- Tahmini bitiş: [Tarih]

Şu mesaj tiplerini hazırla:
1. İlaç bitimine 1 hafta kala hatırlatma (nazik, bilgilendirici)
2. İlaç bitimine 2 gün kala acele hatırlatma (daha direkt)
3. İlaç bittikten sonra geri kazanma mesajı (3-5 gün sonra)
4. Mevsimsel sağlık ipucu (ilaçla ilgili — örn. diyabet + Ramazan orucu)

Her mesaj: max 3 cümle, samimi, eczane adı ve iletişim bilgisi içersin.
UYARI: "İlaç değişikliği için doktorunuza danışın" uyarısını uygun yerlere ekle.`,
        before: "Kronik hasta takibi: manuel, tutarsız, çoğu zaman yapılmıyor",
        after: "Şablon + haftalık 15 dakika = sistematik hatırlatma, sadakat artışı",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "E-eczane içeriği, hasta iletişim şablonları, stok analizi ve mevzuat özetleme için.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Ürün açıklaması, hasta mesajı, stok analizi, yasal uyarı metni",
      },
      {
        name: "WhatsApp Business (business.whatsapp.com)",
        description: "Kronik hasta hatırlatmaları, kampanya duyuruları ve hızlı yanıt şablonları için.",
        free: true,
        link: "https://business.whatsapp.com",
        bestFor: "Hasta hatırlatma, hazır yanıt, toplu mesaj",
      },
      {
        name: "Google Maps / My Business",
        description: "Eczane Google profilini yönet — yorumlara yanıt ver, çalışma saatlerini güncelle.",
        free: true,
        link: "https://business.google.com",
        bestFor: "Yerel görünürlük, yorum yönetimi, eczane bilgi güncellemesi",
      },
      {
        name: "Canva AI (canva.com)",
        description: "Instagram için sağlık içeriği, kampanya görselleri ve hasta bilgilendirme broşürleri.",
        free: true,
        link: "https://canva.com",
        bestFor: "Sosyal medya görseli, kampanya afişi, hasta bilgilendirme broşürü",
      },
      {
        name: "Notion (notion.so)",
        description: "Kronik hasta listesi, stok takibi ve eczane iş akışı yönetimi için.",
        free: true,
        link: "https://notion.so",
        bestFor: "Hasta listesi, stok takip, süreç yönetimi",
      },
    ],

    prompts: [
      {
        title: "1. OTC Ürün Açıklaması",
        prompt: `[Ürün adı] OTC ürünü için e-eczane/Instagram açıklaması yaz. Kategori: [bilgi]. Ne işe yarar: [endikasyon]. Kimler kullanabilir: [hedef]. Kimler kullanmamalı: [kontraendikasyon özeti]. 200 kelime, tüketici dili, zorunlu uyarı sonda: "Kullanmadan önce eczacınıza danışınız."`,
        expectedOutput: "Yasal uyarılı OTC ürün açıklaması",
      },
      {
        title: "2. İlaç Etkileşim Uyarı Metni",
        prompt: `[İlaç A] ve [İlaç B] kullanan bir hasta için etkileşim uyarısı hazırla. Bilinen etkileşim: [bilgi]. Uyarı kısa, anlaşılır, panik yaratmayan ama ciddiye alındıran dilde. Sonunda: "Bu konuda doktorunuzu veya eczacınızı bilgilendirin" yönlendirmesi. UYARI: Bu metin eczacı kontrolünden geçmeden kullanılmamalı.`,
        expectedOutput: "Hasta için ilaç etkileşim uyarı notu",
      },
      {
        title: "3. Kronik Hasta İlaç Hatırlatma",
        prompt: `[Ad] adlı [diyabet/hipertansiyon/tiroid] hastama ilacının biteceğine dair WhatsApp hatırlatma mesajı yaz. İlaç bitimine [X gün] kaldı. 2-3 cümle, samimi, eczane adı ve telefon içersin. "İlaç değişikliği veya yan etki için doktorunuza başvurun" uyarısı ekle.`,
        expectedOutput: "Kişiselleştirilmiş ilaç hatırlatma mesajı",
      },
      {
        title: "4. Mevsimsel Kampanya Metni",
        prompt: `[Grip sezonu / Ramazan / Yaz / Okul dönemi] için eczane kampanyası metni yaz. Öne çıkan ürün veya kategori: [bilgi]. Platform: [Instagram / WhatsApp / eczane afişi]. 3 versiyon: kısa (30 kelime), orta (80 kelime), uzun (150 kelime). Sağlık tavsiyesi tonu, reklam değil bilgilendirme.`,
        expectedOutput: "Mevsimsel sağlık kampanyası içeriği, 3 formatta",
      },
      {
        title: "5. Google Profil Açıklaması",
        prompt: `Eczanemiz için Google My Business profil açıklaması yaz. Eczane adı: [isim]. Bölge: [mahalle/ilçe]. Özellikler: [24 saat açık / Otomasyon sistemi / Danışmanlık hizmeti / E-reçete / Diğer]. 150 kelime, yerel SEO anahtar kelimeleri içersin, güven veren, samimi.`,
        expectedOutput: "Google My Business profil açıklaması",
      },
      {
        title: "6. Stok Uyarı Mesajı",
        prompt: `[Ürün adı] ürünümüz tükenmeye yaklaştı / geçici olarak stokta yok. Bunu soran veya düzenli alan müşteriye WhatsApp mesajı yaz. 2 versiyon: 1) Alternatif ürün öner, 2) "Gelince haber verelim" seçeneği sun. Samimi, özür dileyen değil çözüm sunan ton.`,
        expectedOutput: "Stok kesintisi müşteri iletişim mesajı",
      },
      {
        title: "7. Sadakat Programı Mesajı",
        prompt: `Eczanemizin sadakat programına davet mesajı yaz. Program avantajları: [puan sistemi / özel indirim / öncelikli stok / kronik hasta hatırlatma]. WhatsApp mesajı: 3-4 cümle, fayda odaklı. Instagram postu versiyonu: 100 kelime + 8 hashtag.`,
        expectedOutput: "Sadakat programı tanıtım mesajı, iki kanal için",
      },
      {
        title: "8. İlaç Kullanım Bilgisi",
        prompt: `[İlaç/ürün adı] için hastaya verilecek kullanım bilgi notu hazırla. Doz: [bilgi]. Ne zaman alınmalı: [yemek öncesi/sonrası vb.]. Ne kadar süre: [bilgi]. Saklama: [bilgi]. Önemli uyarılar: [varsa]. Kısa madde madde, anlaşılır dil, A5 kağıda yazılabilir format. Sonunda: "Sorularınız için eczacınıza danışın."`,
        expectedOutput: "Hastaya verilecek ilaç kullanım bilgi notu",
      },
      {
        title: "9. Reçete Takip Hatırlatma",
        prompt: `Reçeteli ilacı düzenli alan [Ad] adlı hastaya reçete yenileme hatırlatması yaz. Reçete bitimine [X hafta] kaldı. Doktora gitmesi gerektiğini hatırlat, reçetesini yenileyince eczanede temin edebileceğini belirt. WhatsApp: 2-3 cümle, yardımsever ton.`,
        expectedOutput: "Reçete yenileme hatırlatma mesajı",
      },
      {
        title: "10. Instagram Sağlık İpucu Postu",
        prompt: `[Konu: grip önleme / diyabet yönetimi / yaz sıcaklarında ilaç saklama / Ramazan'da ilaç kullanımı] hakkında Instagram sağlık ipucu postu yaz. Eğitici, güven veren, eczane uzmanlığını sergileyen. Caption: 150 kelime, 10 hashtag. UYARI: Tıbbi tavsiye değil bilgilendirme — bu notu içeriğe ekle.`,
        expectedOutput: "Sağlık eğitici Instagram postu, yasal uyarı dahil",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. En çok satan 10 OTC ürünü için Prompt 1 ile ürün açıklamaları üret. Google My Business profilini Prompt 5 ile güncelle.",
        tool: "Claude.ai + Google My Business",
        duration: "60 dakika",
      },
      {
        day: 2,
        task: "WhatsApp Business'a geç. Kronik hasta hatırlatma şablonlarını Prompt 3 ile üret ve hazır yanıt olarak kaydet.",
        tool: "Claude.ai + WhatsApp Business",
        duration: "45 dakika",
      },
      {
        day: 3,
        task: "Kronik hasta listenizi Notion'a kaydet. İlacı bu ay bitecek hastaları belirle ve Prompt 3 ile hatırlatma gönder.",
        tool: "Notion + WhatsApp Business",
        duration: "45 dakika",
      },
      {
        day: 4,
        task: "Canva'ya üye ol. Yaklaşan mevsim için Prompt 4 ile kampanya metni üret. Canva AI ile görsel hazırla.",
        tool: "Claude.ai + Canva AI",
        duration: "60 dakika",
      },
      {
        day: 5,
        task: "Geçen yılın aynı dönem satış verisini hazırla. Prompt 'Stok ve Talep Tahmini' ile AI analizi yap.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 6,
        task: "Instagram hesabı için Prompt 10 ile 3 sağlık ipucu postu yaz. Canva AI ile görselleri üret, zamanla.",
        tool: "Claude.ai + Canva AI",
        duration: "45 dakika",
      },
      {
        day: 7,
        task: "Bu haftanın sonuçlarını değerlendir. Hangi mesajlara geri dönüş geldi? Sadakat programı için Prompt 7 ile duyuru hazırla.",
        tool: "Claude.ai",
        duration: "30 dakika",
      },
    ],

    growtTeaser:
      "Stok yönetimini veri odaklı hale getirdin, kronik hasta iletişimini sistematize ettin ve e-eczane içeriği üretmeye başladın. Asıl büyüme fırsatı, dijital kanalları (Instagram, Google, e-eczane) tam entegre bir sisteme bağlamak ve müşteri yaşam boyu değerini artırmaktan geçiyor. GROWT Method ile bu adımları planla. Kişisel planın için growtify.ai/test.",

    ctaHeadline: "Bir sonraki adım: Eczanenize Özel AI Büyüme Planı",
    ctaBody:
      "Stok, hasta iletişimi ve içerik üretimini hızlandırdın. Sırada dijital kanalları entegre etmek, e-eczane büyümesini hızlandırmak ve müşteri sadakatini ölçeklemek var. growtify.ai/test üzerinden ücretsiz AI Dijital Olgunluk Testi'ni tamamla — eczanenize özel yol haritası 5 dakikada.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 9: TURİZM
  // ─────────────────────────────────────────────────────────────
  turizm: {
    slug: "turizm",
    coverTitle: "Turizm Profesyonelleri için AI Rehberi",
    coverSubtitle: "Çok dilli 7/24 hizmet, kişisel tur planı ve rezervasyon otomasyonu tek rehberde",
    sectorIcon: "✈️",

    intro: {
      forWho:
        "Bu rehber; gece 2'de yabancı müşterinin WhatsApp mesajına cevap yetiştirmeye çalışan, tur planlamasını hâlâ manuel yapan, TripAdvisor ve Google yorumlarına düzenli yanıt veremeyen tur operatörleri, butik otel sahipleri ve seyahat acenteleri için hazırlandı.",
      whatYouGet: [
        "5 AI aracı — turizm operasyonu için seçilmiş (Claude, ChatGPT, ManyChat, Calendly, Canva AI)",
        "3 pratik senaryo — çok dilli chatbot, kişisel tur planı, yorum yönetimi",
        "10 kopyala-yapıştır prompt — rezervasyon onayından gezi programına her şey hazır",
        "İlk 7 gün checklist — sıfırdan çok dilli sistemi kurmak için adım adım",
        "5 dil şablonu — TR, EN, AR, DE, RU için hazır mesajlar",
      ],
      painHook:
        "Rusça müşteri mesaj attı, Almanca misafir özel tur istedi, İngilizce bir soru Instagram DM'de bekliyor. Hepsi anında cevap bekliyor — ama sen sadece bir kişisin. AI bu çok dilli iletişimi 7/24 üstlenir; sen deneyimi tasarlamaya odaklanırsın.",
    },

    sectorContext: {
      whyAiMatters:
        "Türkiye 2024'te 52 milyon turist ağırladı ve bu turistlerin %78'i rezervasyondan önce online araştırma yapıyor. Rekabet artık sadece fiyatla değil, cevap hızı ve kişiselleştirilmiş deneyimle kazanılıyor. Çok dilli, anında ve tutarlı iletişim — AI olmadan imkansız; AI ile tek kişilik bir işletme bile büyük acentelerle yarışabilir.\n\nBooking.com, Airbnb ve büyük tur operatörleri AI chatbot'larla rezervasyon dönüşümünü %30'a kadar artırdı. Aynı araçlar artık bağımsız tur operatörleri, butik oteller ve rehberler için erişilebilir. Fark, bunu sistematik olarak kuran ve kurmayan arasındaki rekabet avantajı.",
      stats: [
        {
          value: "%74",
          label:
            "Turistlerin bir işletmeden 1 saatten kısa sürede yanıt beklediği oran — gecikirsen rezervasyon rakibine gidiyor.",
          source: "Google Travel Study, 2024",
        },
        {
          value: "5 dil",
          label:
            "Türkiye'ye gelen turistlerin %80'ini kapsayan dil sayısı: İngilizce, Arapça, Almanca, Rusça, Türkçe.",
          source: "Türkiye Kültür ve Turizm Bakanlığı İstatistikleri, 2024",
        },
        {
          value: "3.2x",
          label:
            "Kişiselleştirilmiş tur deneyimi sunan operatörlerin tekrar rezervasyon oranı — jenerik tura göre kat kat yüksek.",
          source: "Skift Travel Trends Report, 2023",
        },
      ],
      comparison: {
        without: [
          "Gelen mesajların yarısına geç veya hiç cevap verilmiyor — rezervasyonlar kayboluyor",
          "Her müşteri için tur programı sıfırdan yazılıyor, saatler harcanıyor",
          "Çok dilli iletişim çeviri uygulamaları ve tahminlerle yürüyor",
          "TripAdvisor ve Google yorumlarına düzensiz yanıt veriliyor, bazıları cevapsız kalıyor",
        ],
        with: [
          "Chatbot 7/24 5 dilde cevap veriyor, sadece karmaşık sorular sana geliyor",
          "Müşteri profiline göre kişisel tur programı AI ile 10 dakikada hazırlanıyor",
          "Tüm mesaj ve içerik anadil kalitesinde 5 dile çevriliyor",
          "Her yoruma 24 saat içinde profesyonel, kişisel yanıt gidiyor",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: 5 Dilli AI WhatsApp/Instagram Chatbot",
        problem:
          "WhatsApp, Instagram DM ve email'den gün boyu sorular geliyor: 'Bu turda ne var?', 'Fiyat?', 'Rezervasyon nasıl?', 'Çocuklar katılabilir mi?'. Hepsi farklı dilde, hepsi aynı soru. Cevap verinceye kadar müşterinin %40'ı rakibe gidiyor.",
        steps: [
          "En çok sorulan 20 soruyu listele (SSS) ve her biri için cevabı tek dilde yaz",
          "Claude'a bu SSS'yi ver ve 5 dile (TR, EN, AR, DE, RU) çeviri yaptır",
          "ManyChat veya WhatsApp Business API ile chatbot kur — her soru için hazır yanıtları yükle",
          "Karmaşık sorular için 'canlı destek' yönlendirmesi ekle — sana sadece gerçekten lazım olanlar gelsin",
          "Haftada bir chatbot'un cevaplayamadığı soruları kontrol et, SSS'ye ekle — sistem sürekli gelişsin",
        ],
        promptExample: `Tur operatörü işletmem için aşağıdaki SSS'yi 5 dile çevirerek chatbot yanıt şablonları hazırla.

İşletme profili:
- Tür: [Günübirlik tur / Çoklu gün tur / Butik otel / Rehberlik]
- Lokasyon: [Şehir/bölge]
- Ton: [Samimi / Profesyonel / Karma]

SSS (Türkçe):
1. [Soru 1] — [Cevap]
2. [Soru 2] — [Cevap]
[...]

Her SSS için şunları üret:
- TR: Samimi ve net cevap (max 3 cümle)
- EN: Doğal İngilizce, turist odaklı
- AR: Standart Arapça, saygılı ton
- DE: Net Almanca, detay odaklı
- RU: Samimi Rusça

Her cevabın sonunda: "Daha fazla bilgi veya rezervasyon için: [iletişim]" yönlendirmesi olsun.
Not: Fiyat, tarih ve kişi sayısı gibi değişkenleri [placeholder] olarak bırak.`,
        before: "Mesajlara yanıt: gün içinde saatte 1 kez, gece hiç — kaybedilen rezervasyonlar",
        after: "7/24 5 dilli anında yanıt + sana sadece karar gerektiren sorular geliyor",
      },
      {
        title: "Senaryo 2: Kişisel Tur Programı Üretimi",
        problem:
          "Müşteri geliyor: '3 gün Kapadokya'da olacağız, 2 çocuk, 1 yaşlı var, yürüyüş zor' — ya da '1 hafta İstanbul, tarih ve gastronomi ağırlıklı'. Her biri için özel program çıkarmak saatler alıyor. Standart paketleri gönderince de satış düşüyor.",
        steps: [
          "Rezervasyon formuna 5-6 soru ekle: süre, grup tipi, ilgi alanları, fiziksel kısıt, bütçe",
          "Bu bilgileri Claude'a ver ve aşağıdaki tur planı prompt'unu kullan",
          "AI gün gün detaylı program üretir — yerler, restoranlar, ulaşım, zamanlama",
          "Programı kendi yerel bilgilerinle düzenle, fiyatlandır",
          "PDF veya paylaşılabilir link olarak müşteriye gönder — rezervasyon kapanma oranı %2-3 katına çıkabilir",
        ],
        promptExample: `Aşağıdaki müşteri profiline göre kişiselleştirilmiş [X gün] [destinasyon] tur programı hazırla.

Müşteri profili:
- Grup: [Kişi sayısı, yaş dağılımı, çocuk/yaşlı varsa]
- İlgi alanları: [Tarih / Gastronomi / Doğa / Macera / Alışveriş / Kültür]
- Bütçe seviyesi: [Ekonomik / Orta / Lüks]
- Fiziksel kısıt: [Yürüyüş zorluğu / engellilik / diğer]
- Özel istek: [Varsa]
- Tarih: [Dönem]

Program şunları içersin:
1. Gün gün özet (sabah / öğle / akşam blokları)
2. Her gün için 3-4 etkinlik/durak (açıklama + neden seçildiği)
3. Önerilen restoranlar (grup profiline uygun)
4. Ulaşım önerileri (özel araç / toplu / yürüme)
5. Akıllı ipuçları (ne zaman gidilmeli, bilet ön alınmalı mı, kalabalık saatler)
6. Tahmini günlük bütçe
7. Yedek plan (kötü hava, kapalı olursa alternatif)

Format: Müşteriye sunulacak, samimi ama bilgi yüklü, destinasyon hakkında yerel ipuçları serpiştirilmiş.`,
        before: "Özel tur programı: 2-3 saat/müşteri (çoğu zaman yapılmıyor, standart paket gönderiliyor)",
        after: "Form + AI + yerel düzenleme: 15-20 dakika/müşteri, rezervasyon dönüşümü 2-3x",
      },
      {
        title: "Senaryo 3: Yorum Yönetimi ve İtibar",
        problem:
          "TripAdvisor'da yeni yorum var, Google'da 4 yorum bekliyor, Booking'de 2 tanesi kötü. Her birine kişisel, profesyonel yanıt yazmak zaman alıyor — ama cevap yoksa itibar düşüyor, SEO kötü etkileniyor. 1 kötü yorum cevapsız kalırsa gelecek müşteri adayı rakibe gidiyor.",
        steps: [
          "Her hafta TripAdvisor + Google + Booking yorumlarını topla (ekran görüntüsü veya kopya)",
          "Claude'a yorumları ve işletme tonunu ver, yanıt prompt'unu çalıştır",
          "AI her yoruma kişisel (isim + somut referans), profesyonel ve işletme tonuna uygun yanıt üretir",
          "Kötü yorumlara özel: empati + somut düzeltme eylemi + offline davet",
          "Yanıtları platform(lar)a yapıştır ve yayınla — haftalık 30 dakika",
        ],
        promptExample: `Aşağıdaki [TripAdvisor / Google / Booking] yorumuna işletmem adına yanıt yaz.

İşletme: [Ad]
Tür: [Tur operatörü / Otel / Rehberlik]
Ton: [Samimi / Profesyonel / Sıcak]
Yorum yazanın adı: [İsim veya takma ad]
Yorumun dili: [TR / EN / Diğer]
Puan: [5 üzerinden]

Yorum metni:
[Yorumu buraya yapıştır]

Yanıt şunları içersin:
1. Müşteriyi adıyla selamla (varsa)
2. Yorumdaki somut bir detaya referans ver (jenerik yanıt olmasın)
3. Olumlu yorumsa: İçten teşekkür + işletmeye özgü küçük bir detay paylaş
4. Olumsuz yorumsa: Empati + somut düzeltme eylemi + offline iletişim daveti (asla savunma değil)
5. Yorumun dilinde yanıt ver (TR yorumsa TR, EN yorumsa EN)
6. Maksimum 4 cümle
7. Samimi kapanış + işletme imzası

Önemli: Savunmacı olma, şablon gibi durma, işletmenin değerlerini (misafirperverlik, kalite) dolaylı yansıt.`,
        before: "Yorum yanıtları: ayda bir kez, sadece iyilere + çoğu yanıtsız",
        after: "Haftalık 30 dakika + AI yanıt + yayın: tüm yorumlar 7 gün içinde yanıtlanmış",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "Çok dilli içerik üretimi, tur programı oluşturma ve yorum yanıtları için en kapsamlı AI asistanı.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Kişisel tur programı, çok dilli çeviri, yorum yanıtı, blog içerik",
      },
      {
        name: "ManyChat (manychat.com)",
        description: "Instagram ve WhatsApp için otomatik yanıt sistemi — SSS, rezervasyon yönlendirme, dil tespiti.",
        free: false,
        link: "https://manychat.com",
        bestFor: "Instagram DM otomasyonu, WhatsApp chatbot, kampanya mesajı",
      },
      {
        name: "Calendly (calendly.com)",
        description: "Rezervasyon ve tur takvimi yönetimi için basit ama güçlü araç — çok dilli destek.",
        free: true,
        link: "https://calendly.com",
        bestFor: "Tur rezervasyonu, konsültasyon takvimi, otomatik hatırlatma",
      },
      {
        name: "Canva AI (canva.com)",
        description: "Tur afişi, Instagram reel kapağı, broşür ve menü tasarımları için AI destekli görsel araç.",
        free: true,
        link: "https://canva.com",
        bestFor: "Sosyal medya görseli, tur broşürü, reel kapağı",
      },
      {
        name: "Google Translate (translate.google.com)",
        description: "Hızlı çeviri ve yan kontrol için — ama kalite kritik içerikte Claude'u tercih et.",
        free: true,
        link: "https://translate.google.com",
        bestFor: "Hızlı kısa çeviri, menü, tabela, acil mesaj",
      },
    ],

    prompts: [
      {
        title: "1. Rezervasyon Onay Mesajı (5 Dil)",
        prompt: `[Tur/hizmet adı] için [tarih] rezervasyonu onay mesajı yaz. Müşteri adı: [ad]. Kişi: [sayı]. Buluşma noktası: [yer] [saat]. Getirilmesi gerekenler: [liste]. 5 dilde (TR, EN, AR, DE, RU), her biri 3-4 cümle, samimi profesyonel ton. Sonunda WhatsApp iletişim bilgisi.`,
        expectedOutput: "5 dilli rezervasyon onay mesaj seti",
      },
      {
        title: "2. Kişisel Tur Programı",
        prompt: `[X gün] [destinasyon] için kişisel tur programı. Grup: [kişi/yaş]. İlgi: [alanlar]. Bütçe: [seviye]. Fiziksel kısıt: [varsa]. Gün gün sabah/öğle/akşam bloklarında 3-4 etkinlik, restoran, ulaşım, tahmini bütçe, yedek plan. Destinasyonel yerel ipuçları serpiştir.`,
        expectedOutput: "Müşteriye sunulacak detaylı kişisel tur programı",
      },
      {
        title: "3. Olumsuz Yorum Yanıtı",
        prompt: `[Platform: TripAdvisor/Google/Booking] olumsuz yorumuna [işletme] adına yanıt yaz. Yorum: [metin]. Puan: [X/5]. Yanıt: empati + somut düzeltme eylemi + offline iletişim daveti, asla savunmacı değil. Yorum dilinde, max 4 cümle, samimi.`,
        expectedOutput: "Profesyonel olumsuz yorum yanıtı",
      },
      {
        title: "4. Olumlu Yorum Yanıtı",
        prompt: `[Platform] olumlu yoruma yanıt yaz. Müşteri: [ad]. Yorum: [metin]. Yanıt: adıyla selamla, yoruma özgü bir detaya referans ver, içten teşekkür, işletme değerine küçük bir dokunuş, tekrar davet. Max 3 cümle, samimi, yorum dilinde.`,
        expectedOutput: "Kişisel olumlu yorum yanıtı",
      },
      {
        title: "5. Instagram Reel Senaryosu",
        prompt: `[Tur/destinasyon] için 30 saniyelik Instagram reel senaryosu yaz. Hook (3 sn) + 3 sahne + CTA. Hedef: rezervasyon. Stil: [heyecanlı / dingin / mizahi]. Türkçe + İngilizce alt yazı. Caption: 100 kelime + 10 hashtag.`,
        expectedOutput: "Reel senaryosu + caption",
      },
      {
        title: "6. Hava Durumu Değişikliği Bildirimi",
        prompt: `[Tarih] turuna kayıtlı müşterilere hava koşulu nedeniyle tur programı değişikliği bildir. Ne değişti: [bilgi]. Yeni plan: [özet]. 5 dilde, sakinleştirici ton, alternatif heyecan verici, iptal yerine yeniden düzenleme vurgusu.`,
        expectedOutput: "Çok dilli tur değişikliği bildirimi",
      },
      {
        title: "7. Erken Rezervasyon Kampanyası",
        prompt: `[Sezon: yaz/kış/bayram] için erken rezervasyon kampanyası metni yaz. İndirim: [%X]. Son tarih: [tarih]. Hedef: [grup türü]. Instagram postu (100 kelime), WhatsApp broadcast (60 kelime), email (200 kelime). 5 dilde TR+EN versiyonu.`,
        expectedOutput: "3 format + 2 dilde kampanya metni",
      },
      {
        title: "8. Tur Sonrası Takip Mesajı",
        prompt: `Turu biten müşteriye takip mesajı. Amaç: yorum rica + tekrar davet + referans. Kişisel detay: [turda yaşanan anı veya moment]. WhatsApp mesajı, 3 cümle, samimi, yorum linki + yaklaşan turlar hatırlatması. 5 dilde.`,
        expectedOutput: "Tur sonrası kişisel takip mesajı",
      },
      {
        title: "9. Google Business Profil Açıklaması",
        prompt: `[İşletme adı] için Google Business profil açıklaması yaz. Tür: [tur operatörü / otel / rehber]. Lokasyon: [bölge]. Öne çıkan: [3 özellik]. 150 kelime TR + 150 kelime EN, yerel SEO anahtar kelimeleri, güven veren, samimi.`,
        expectedOutput: "Çift dilli Google profil açıklaması",
      },
      {
        title: "10. Blog: Destinasyon Rehberi",
        prompt: `[Destinasyon] için '3 Günde [yer] — Kaçırılmaması Gereken Deneyimler' konulu blog yazısı. 800 kelime TR. Hedef: SEO + rezervasyon. Yerel ipuçları, yemek önerileri, en iyi saatler, kendi tur paketine doğal yönlendirme (sert satış yok). Başlık, meta desc, H2'ler dahil.`,
        expectedOutput: "SEO optimize tam blog yazısı",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. En çok sorulan 20 soruyu listele ve Prompt 1 mantığı ile 5 dile çevirt. İlk 10 soruyu hazır yanıt olarak WhatsApp Business'a kaydet.",
        tool: "Claude.ai + WhatsApp Business",
        duration: "90 dakika",
      },
      {
        day: 2,
        task: "Calendly hesabı aç ve rezervasyon takvimini kur. Tur türlerini, süreleri ve buluşma noktalarını tanımla. Prompt 1 ile otomatik onay mesajı 5 dilde hazırla.",
        tool: "Calendly + Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 3,
        task: "Geçen ay gelen 5 müşteri profilini al, her biri için Prompt 2 ile kişisel tur programı denemesi yap. Karşılaştır — ne kadar süre kazandırdı?",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 4,
        task: "TripAdvisor + Google + Booking'deki son 10 yorumu topla. Prompt 3 ve 4 ile yanıtları hazırla ve yayınla. Yanıtsız yorum bırakma.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 5,
        task: "ManyChat hesabı aç. Instagram DM otomasyonu için temel akışı kur — selamlama, dil seçimi, SSS yönlendirme, canlı destek çıkışı.",
        tool: "ManyChat",
        duration: "75 dakika",
      },
      {
        day: 6,
        task: "Canva AI ile 3 Instagram reel kapağı üret. Prompt 5 ile senaryolarını yaz ve haftaya zamanla.",
        tool: "Canva AI + Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 7,
        task: "Bu haftanın sonuçlarını değerlendir. Yanıt hızı nasıl değişti? Rezervasyon dönüşümü? Sıradaki sezon için Prompt 7 ile erken rezervasyon kampanyası hazırla.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
    ],

    growtTeaser:
      "7/24 çok dilli iletişimi kurdu, kişisel tur programlarıyla rezervasyon dönüşümünü artırdın ve yorum yönetimini sistematize ettin. Asıl büyüme fırsatı, bu sistemi ölçeklenebilir bir marka deneyimine dönüştürmekten geçiyor — sezonluk değil, yıllık sürdürülebilir büyüme. GROWT Method ile bu geçişi planla. Kişisel planın için growtify.ai/test.",

    ctaHeadline: "Bir sonraki adım: İşletmenize Özel AI Turizm Büyüme Planı",
    ctaBody:
      "Çok dilli hizmet, kişisel deneyim ve yorum yönetimi hızlandı. Sırada sezon dışı talebi büyütmek, ortalama müşteri değerini artırmak ve sürdürülebilir tekrar rezervasyon sistemi kurmak var. growtify.ai/test üzerinden ücretsiz AI Dijital Olgunluk Testi'ni tamamla — işletmenize özel yol haritası 5 dakikada.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 10: MİMARLIK
  // ─────────────────────────────────────────────────────────────
  mimarlik: {
    slug: "mimarlik",
    coverTitle: "Mimarlar için AI Render & Sunum Rehberi",
    coverSubtitle: "2 günlük render beklentisini 2 dakikaya düşüren AI araçları — konsept, sunum, proje yönetimi",
    sectorIcon: "📐",

    intro: {
      forWho:
        "Bu rehber; müşteri 3 konsept istediğinde 'bir hafta sonra' demek zorunda kalan, konsept aşamasında rakiplere iş kaptıran, proje sunumlarına saatler harcayan mimarlar, iç mimarlar, peyzaj mimarları ve proje tasarım ofisleri için hazırlandı.",
      whatYouGet: [
        "5 AI aracı — mimarlık için seçilmiş (Midjourney, Leonardo AI, Claude, Canva, Stable Diffusion)",
        "3 pratik senaryo — AI render üretimi, müşteri sunumu, proje akışı otomasyonu",
        "10 prompt kütüphanesi — iç mekan, dış cephe, peyzaj, detay render için",
        "İlk 7 gün checklist — AI render sisteminizi kurmak için adım adım",
        "Müşteri sunumu pitch deck şablonu — konseptten teslim planına",
      ],
      painHook:
        "Müşteri 'şöyle bir şey hayal ediyorum' dediğinde, 3 farklı konsept görmesi için bir haftayı beklemek zorunda mı? O bir hafta içinde rakibine gidiyor. AI render araçları o süreyi saatlere, hatta dakikalara indiriyor — karar hızlanıyor, iş seni seçiyor.",
    },

    sectorContext: {
      whyAiMatters:
        "Mimarlık sektörü AI görsel üretim devriminin en hızlı benimseyenlerinden biri. 2024'te Midjourney ve Leonardo AI gibi araçlar, konsept aşamasını aylar değil dakikalar meselesine çevirdi. Dünyada Zaha Hadid Architects, Foster+Partners gibi ofisler erken konsept için AI render kullanıyor — klasik render süreçlerini final aşamaya erteliyorlar.\n\nTürkiye'deki bağımsız mimarlar ve orta ölçekli ofisler için fırsat net: müşteri karar hızını saatlerle ölçmeye başladığında, AI olmayan ofisler yarışın dışında kalıyor. Konsept aşamasında 3 farklı stil sunabilen, müşteri geri bildiriminden sonra saatler içinde revize edebilen mimar, projeyi kazanıyor.",
      stats: [
        {
          value: "%70",
          label:
            "AI render kullanan mimarlık ofislerinin konsept aşaması süre tasarrufu — haftalardan günlere.",
          source: "AIA Architectural AI Adoption Report, 2024",
        },
        {
          value: "3-5x",
          label:
            "Konsept aşamasında müşteriye sunulan alternatif sayısı artışı — AI olmadan 1, AI ile 3-5 konsept.",
          source: "ArchDaily AI Practice Survey, 2024",
        },
        {
          value: "%40",
          label:
            "Erken konsept onayı ile proje toplam süresinde tasarruf — revizyonlar konsept aşamasında çözülüyor.",
          source: "McKinsey Construction Insights, 2023",
        },
      ],
      comparison: {
        without: [
          "Konsept render: 2-5 gün, tek stil, müşteri beğenmezse baştan",
          "Sunumlar PowerPoint'te manuel, saatlerce hazırlanıyor",
          "Revizyonlar için 3D modelde manuel değişiklik, saatler",
          "Müşteri beğenene kadar 3-4 tur gidip gelme — proje başlamıyor",
        ],
        with: [
          "AI ile 3 konsept 30 dakikada, müşteri en beğendiğiyle ilerliyoruz",
          "Sunum şablonu + AI render + Claude yazım = 1 saatte profesyonel pitch",
          "Revizyon promptu değiştir, yeni render 2-3 dakika",
          "İlk görüşmede onay alacak kadar seçenek → proje hızla başlıyor",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: Konsept Aşamasında AI Render",
        problem:
          "Müşteri 'modern loft tarzı ofis istiyorum, doğal ışık, ahşap dokular' dedi. Sen normalde SketchUp'ta 2 gün çalışıp bir alternatif sunuyordun. Sonraki revizyon bir gün daha. Müşteri 3 alternatif istese bir hafta. Bu sırada başka ofis hızlı dönüyor ve işi kapıyor.",
        steps: [
          "Müşteri brifini Claude'a ver, AI render prompt'u oluşturttur (stil, malzeme, ışık, açı bilgisi)",
          "Prompt'u Midjourney veya Leonardo AI'ya yapıştır, 3-4 varyasyon üret",
          "En iyi 3'ü seç, Claude'a her birini açıklatarak sunum metni hazırla",
          "Müşteriye 3 konsept sun — seçimi aldıktan sonra detaylandırmaya geç (klasik 3D modelleme)",
          "Onay alınan yön üzerinde klasik workflow'a dön: SketchUp/Revit/Rhino — ama artık net yön var",
        ],
        promptExample: `Sen deneyimli bir mimari render prompt mühendisisin. Aşağıdaki müşteri brifinden Midjourney/Leonardo AI için kullanılabilir render prompt'ları üret.

Müşteri brifi:
- Proje tipi: [Konut / Ofis / Cafe / Villa / Peyzaj]
- Lokasyon/iklim: [Örn. İstanbul, nemli, yoğun şehir]
- Alan: [m²]
- Stil yönü: [Modern / Minimalist / Endüstriyel / Biyofilik / Klasik / Karma]
- Temel istekler: [Doğal ışık / Açık plan / Aile odaklı / Ergonomik ofis vb.]
- Malzeme tercihleri: [Ahşap / Taş / Metal / Cam / Yeşil duvar]
- Kaçınılması gerekenler: [Müşteri hoşlanmadıkları]

3 farklı stil yönü için render prompt'u üret:
1. Saf yorum (müşteri isteklerinin direkt uygulanması)
2. Bir adım ileri (daha cesur bir yorum, benzer ama farklı bir stil)
3. Beklenmedik alternatif (müşterinin düşünmediği ama beğenebileceği yön)

Her prompt şunları içersin:
- Mekan tipi + açı (eye-level, aerial, axonometric vs.)
- Işık durumu (golden hour, cloudy, bright daylight)
- Malzeme ve doku
- Atmosfer (warm, serene, dynamic)
- Teknik: "photorealistic, architectural photography, 8k, professional"
- Negative prompt (ne istemediği)

Format: Her prompt'u İngilizce yaz (AI araçları için), sonuna Türkçe tek cümle açıklama ekle.`,
        before: "3 konsept: 5-7 iş günü manuel 3D modelleme",
        after: "AI prompt + 3 render: 30-60 dakika, müşteri anında 3 alternatif görüyor",
      },
      {
        title: "Senaryo 2: Müşteri Sunumu Pitch Deck",
        problem:
          "Konsept hazır, şimdi müşteriye sunmak gerekiyor. PowerPoint'te slide'ları manuel düzenlemek, metin yazmak, render'ları yerleştirmek — 3-4 saat. Çoğu zaman sunum hazır değilken toplantıya gidiyor ya da hazırlanmak için geceyi harcıyorsun.",
        steps: [
          "Proje bilgilerini Claude'a ver (konsept, müşteri profili, temel çözüm fikri)",
          "AI sunum yapısını ve her slide'ın metnini üretir — konsept, çözüm, malzeme, zaman çizelgesi, yatırım",
          "Render'ları Canva'daki sunum şablonuna yerleştir, AI üretilen metinleri ekle",
          "Her slide'ı kendi yorumlarınla zenginleştir (1-2 cümle düzeltme yeter)",
          "PDF veya canlı slide olarak müşteriye gönder — toplantı öncesi ön hazırlık sağlar",
        ],
        promptExample: `[Proje adı] için müşteri sunumu içerik hazırla.

Proje bilgileri:
- Tür: [Konut / Ofis / Ticari / Peyzaj]
- Lokasyon: [Bölge]
- Alan: [m²]
- Müşteri profili: [Aile / Kurumsal / Yatırımcı / vb.]
- Ana çözüm fikri: [Tek cümle konsept]
- Malzeme paleti: [Liste]
- Özel vurgu: [Sürdürülebilirlik / Aydınlatma / Akıllı ev / vb.]
- Tahmini bütçe aralığı: [Varsa]
- Tahmini süre: [Hafta/ay]

8 slide sunum içeriği hazırla:
1. Kapak: Proje adı + kısa slogan + tarih
2. Brif ve müşteri ihtiyacı (3 madde)
3. Konsept fikri (2 cümle + 3 anahtar kelime)
4. Mekan yorumu (render açıklaması, 3 özellik)
5. Malzeme ve doku (3 ana madde, neden seçildiği)
6. Zaman çizelgesi (5 aşama, hafta bazında)
7. Yatırım aralığı ve kapsam (şeffaf, detaylı)
8. Sonraki adımlar + iletişim (net çağrı)

Her slide için: başlık (max 6 kelime) + gövde metni (max 40 kelime) + konuşma notu (sunum sırasında anlatılacak). Ton: profesyonel, güven veren, vizyoner ama somut.`,
        before: "Sunum hazırlık: 3-4 saat (çoğu zaman eksik veya gece yapılıyor)",
        after: "AI içerik + Canva şablon + kişisel dokunuş: 45-60 dakika, profesyonel sonuç",
      },
      {
        title: "Senaryo 3: Proje Yönetim ve Revizyon Akışı",
        problem:
          "Müşteri email atıyor: 'Mutfağı biraz daha büyütebilir miyiz, masif ahşap yerine laminat olabilir mi?'. Bu değişiklik için Revit'te modeli açıp, düzenleyip, render alıp, yeni açıklama yazmak — 3-4 saat. Günde 2 müşteri geri bildirimi olursa haftan bitiyor.",
        steps: [
          "Müşteri email/WhatsApp geri bildirimini Claude'a yapıştır",
          "AI geri bildirimi 'yapılacaklar listesi'ne dönüştürür — değişiklikler net, öncelikli",
          "Hangi değişiklikler AI render'la hızlı test edilebilir, hangileri Revit/Rhino gerektirir — ayrıştır",
          "AI testini yap (prompt güncelle, yeni render al), müşteriye hızlı ön-görsel gönder",
          "Onay gelirse Revit/Rhino'da kalıcı uygula — aksi halde AI turu sürdür, zaman kaybı yok",
        ],
        promptExample: `Aşağıdaki müşteri geri bildirimini proje aksiyon listesine dönüştür.

Proje: [Ad]
Aşama: [Konsept / Ön tasarım / Uygulama]

Müşteri mesajı (email/WhatsApp):
[Mesajı buraya yapıştır]

Üret:
1. Yapılacaklar listesi (değişiklikler, önceliğe göre sıralı)
2. Her değişiklik için:
   - Açıklama (net, teknik terim minimum)
   - Etki (sadece görsel mi, malzeme listesi değişir mi, maliyet etkisi var mı)
   - Uygulama yolu: [AI render ile hızlı test / Revit'te kalıcı değişiklik / Müşteriden ek bilgi gerekli]
   - Tahmini süre
3. Müşteriye dönüş mesajı taslağı:
   - Aldığını onayla
   - Her değişikliği kısaca özetle
   - Bir sonraki adımı net söyle (render ne zaman hazır olacak, kaç kalem değişiklik var)
   - Varsa uyarı (örn. bütçe etkisi) — nazik ama net
4. Eğer müşteri talebi bütçe/statik/yasal olarak sakıncalıysa uyarı ve alternatif öneri

Ton: Profesyonel, çözüm odaklı, aceleci değil.`,
        before: "Her geri bildirim: 3-4 saat Revit + render + yanıt",
        after: "AI ayrıştırma + hızlı AI test + seçmeli Revit: 1-1.5 saat",
      },
    ],

    tools: [
      {
        name: "Midjourney (midjourney.com)",
        description: "En güçlü fotogerçekçi AI render aracı — mimari konsept görselleri için endüstri standardı.",
        free: false,
        link: "https://midjourney.com",
        bestFor: "Dış cephe, iç mekan konsepti, atmosfer render, stil varyasyonu",
      },
      {
        name: "Leonardo AI (leonardo.ai)",
        description: "Mimari odaklı preset'ler ve kontrol seçenekleri — ControlNet ile 3D tel kafes'ten render üretebilir.",
        free: true,
        link: "https://leonardo.ai",
        bestFor: "Plan şemasından render, malzeme varyasyonu, detay zoom",
      },
      {
        name: "Claude (claude.ai)",
        description: "Prompt mühendisliği, sunum içeriği, müşteri yanıtları ve proje dokümantasyonu için.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Render prompt yazma, sunum metni, proje açıklaması, müşteri iletişimi",
      },
      {
        name: "Canva (canva.com)",
        description: "Mimari sunum şablonları, portfolyo tasarımı ve sosyal medya görselleri için hızlı araç.",
        free: true,
        link: "https://canva.com",
        bestFor: "Pitch deck, portfolyo, Instagram reel, kartvizit",
      },
      {
        name: "Stable Diffusion + ControlNet",
        description: "Açık kaynak, tamamen özelleştirilebilir — 3D modelinizi render'a dönüştürebilen ileri araç.",
        free: true,
        link: "https://stability.ai",
        bestFor: "Tel kafes → render, kendi stilinize model eğitimi, yüksek kontrol",
      },
    ],

    prompts: [
      {
        title: "1. İç Mekan Render (Oturma Odası)",
        prompt: `Modern minimalist living room, large floor-to-ceiling windows with golden hour light, natural oak flooring, neutral beige linen sofa, matte black steel accents, indoor plants, Scandinavian aesthetic, warm atmosphere, photorealistic architectural photography, wide-angle eye-level view, 8k, professional interior magazine quality, shallow depth of field. --ar 16:9 --v 6`,
        expectedOutput: "Fotogerçekçi iç mekan render görseli",
      },
      {
        title: "2. Dış Cephe Render (Villa)",
        prompt: `Contemporary Mediterranean villa exterior, white stucco walls with natural stone accents, large glass openings, terracotta flat roof with solar panels, olive trees and cypress landscape, swimming pool in foreground reflecting architecture, golden hour lighting, cinematic architectural photography, dramatic sky, photorealistic, 8k --ar 16:9 --v 6`,
        expectedOutput: "Villa dış cephe konsept render",
      },
      {
        title: "3. Peyzaj / Bahçe Render",
        prompt: `Modern urban residential garden, biophilic design with native drought-resistant plants, corten steel planters, wooden deck seating area with pergola, ambient lighting, stone pathway with gravel, soft evening light, photorealistic landscape architecture photograph, aerial 45-degree view, natural and inviting atmosphere --ar 16:9 --v 6`,
        expectedOutput: "Çağdaş peyzaj konsept görseli",
      },
      {
        title: "4. Ofis İç Mekan (Konsept)",
        prompt: `Creative co-working office interior, exposed concrete ceiling with industrial lighting, warm wooden collaborative tables, acoustic felt panels in mustard and teal, biophilic green walls, natural daylight from large windows, mixed seating zones, modern workplace photography, vibrant yet professional, eye-level wide angle, 8k photorealistic --ar 16:9 --v 6`,
        expectedOutput: "Yaratıcı ofis iç mekan render",
      },
      {
        title: "5. Restoran/Cafe Konsept",
        prompt: `Intimate boutique cafe interior, exposed brick wall with vintage pendant lights, walnut bar counter with brass fixtures, mix of leather banquettes and bistro chairs, evening warm lighting, greenery accents, rustic modern atmosphere, cozy ambiance, photorealistic hospitality photography, eye-level perspective, 8k --ar 16:9 --v 6`,
        expectedOutput: "Butik cafe konsept görseli",
      },
      {
        title: "6. Plan Çizimi Açıklaması",
        prompt: `[Proje] için plan çizimine eşlik eden açıklama metni yaz. Mekânlar: [liste + m²]. Ana sirkülasyon: [açıklama]. Işık stratejisi: [yön]. Özel çözümler: [varsa]. Müşteri sunumunda anlatılacak şekilde 200 kelime, teknik ama anlaşılır.`,
        expectedOutput: "Plan sunumu için açıklama metni",
      },
      {
        title: "7. Malzeme Paleti Açıklaması",
        prompt: `[Proje] için malzeme paleti açıklaması. Ana malzemeler: [liste]. Her birinin: seçilme nedeni, lokasyonu, duygu etkisi, bakım bilgisi. Müşteri sunumu için 250 kelime, duyusal dil (sıcak, serin, dokunsal), ama teknik güvenilirlik korunsun.`,
        expectedOutput: "Malzeme paleti sunum metni",
      },
      {
        title: "8. Müşteri Geri Bildirim Yanıtı",
        prompt: `Müşteri aşağıdaki geri bildirimi verdi: [metin]. Proje: [ad]. Profesyonel yanıt yaz: 1) Aldığını onayla, 2) Her değişikliği teknik etkisiyle özetle, 3) Önerilen süre ve sonraki adım, 4) Varsa bütçe/statik uyarı nazikçe. 250 kelime, çözüm odaklı, aceleci değil.`,
        expectedOutput: "Profesyonel müşteri geri bildirim yanıtı",
      },
      {
        title: "9. Portfolyo Proje Açıklaması",
        prompt: `Tamamlanmış [proje] için portfolyo/web sitesi açıklaması yaz. Proje: [tip, m², lokasyon]. Temel meydan okuma: [problem]. Çözüm: [yaklaşım]. Sonuç: [etki]. 200 kelime, vizyoner ama somut, SEO uyumlu, Instagram caption versiyonu da 80 kelime.`,
        expectedOutput: "Portfolyo ve sosyal medya proje açıklaması",
      },
      {
        title: "10. Konsept Stil Tanımı",
        prompt: `Müşteri '[müşteri cümlesi, örn. 'sıcak ama modern, ailece yaşanabilir']' dedi. Bu belirsiz istekten 3 net mimari stil yorumu çıkar. Her biri için: 1 cümle felsefe, 5 anahtar kelime, 3 malzeme, 1 örnek ikon (mimar veya proje adı). Bu 3'lü konsept brifi render prompt üretimi için kullanılacak.`,
        expectedOutput: "Müşteri dilinden 3 net stil yorumu",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Midjourney veya Leonardo AI'a üye ol. Geçen projenin konsept aşamasını al, Prompt 1-3 ile 3 farklı render üret. Gerçek üretilen render'larla karşılaştır.",
        tool: "Midjourney / Leonardo AI",
        duration: "90 dakika",
      },
      {
        day: 2,
        task: "Claude.ai'a üye ol. Aktif müşteri brif'lerinden birini al, Prompt 10 ile stil yorumu + Prompt 1-3 mantığıyla render prompt'u üretttir. Render'ları dene.",
        tool: "Claude.ai + Midjourney",
        duration: "75 dakika",
      },
      {
        day: 3,
        task: "Aktif bir projenin sunumunu Prompt 6-7 ile hazırla. Canva'da 8 slide şablon seç ve içeriği yerleştir. Kendi 1-2 cümlelik dokunuşunu ekle.",
        tool: "Claude.ai + Canva",
        duration: "90 dakika",
      },
      {
        day: 4,
        task: "Son gelen müşteri geri bildirimi email'ini al. Prompt 8 ile ayrıştırmayı ve yanıt taslağını hazırla. Kendi kontrolünle gönder.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 5,
        task: "En iyi 3 tamamlanmış projenin portfolyo açıklamasını Prompt 9 ile güncelle. Instagram caption'larını da üret ve posta.",
        tool: "Claude.ai + Canva",
        duration: "60 dakika",
      },
      {
        day: 6,
        task: "ControlNet denemesi: mevcut bir 2D plan veya 3D tel kafes görüntüsünden Stable Diffusion ile render denemesi yap (veya Leonardo AI upload).",
        tool: "Leonardo AI / Stable Diffusion",
        duration: "90 dakika",
      },
      {
        day: 7,
        task: "Bu haftanın AI denemelerini değerlendir: hangi prompt'lar işe yaradı, hangileri iterasyon istedi? En iyi 5 prompt'u 'kütüphane'ne kaydet — ofis standart süreci olsun.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
    ],

    growtTeaser:
      "Konsept aşamasını AI ile hızlandırdın, sunumlarını profesyonelleştirdin, müşteri iletişimini sistematize ettin. Asıl büyüme fırsatı, bu hızı ofis kapasitesine dönüştürmekten geçiyor — aynı ekiple 2x proje kapasitesi. GROWT Method ile büyüme planını yap. Kişisel planın için growtify.ai/test.",

    ctaHeadline: "Bir sonraki adım: Ofisinize Özel AI Dönüşüm Planı",
    ctaBody:
      "Konsept, sunum ve müşteri iletişimini hızlandırdın. Sırada ofis kapasiteni büyütmek, yüksek değerli projelere odaklanmak ve tekrar eden gelir kanalları kurmak var. growtify.ai/test üzerinden ücretsiz AI Dijital Olgunluk Testi'ni tamamla — ofisinize özel yol haritası 5 dakikada.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 11: EĞİTİM
  // ─────────────────────────────────────────────────────────────
  egitim: {
    slug: "egitim",
    coverTitle: "Eğitmenler için AI Materyal Üretim Rehberi",
    coverSubtitle: "Soru bankası, sunum, kişisel geri bildirim — 10 saatlik materyal işi 90 dakikada",
    sectorIcon: "🎓",

    intro: {
      forWho:
        "Bu rehber; ders materyali hazırlamaya haftada 10 saat harcayan, her öğrenciye kişisel geri bildirim vermeyi fizibil bulmayan, online kurs yapmak isteyip başlayamayan eğitmenler, akademisyenler, özel ders öğretmenleri ve online kurs yapımcıları için hazırlandı.",
      whatYouGet: [
        "5 AI aracı — eğitim için seçilmiş (Claude, ChatGPT, Canva, Kahoot, Notion AI)",
        "3 pratik senaryo — soru bankası, sunum üretimi, kişisel geri bildirim sistemi",
        "10 kopyala-yapıştır prompt — her konu ve zorluk seviyesinde materyal için",
        "İlk 7 gün checklist — materyal iş akışını AI ile yeniden tasarlamak için",
        "Kişisel geri bildirim şablonu — 30 öğrenciye özel yorum 30 dakikada",
      ],
      painHook:
        "Pazar gecesi, önündeki yığın: hafta için ders sunumu, 3 sınıfa soru, 20 ödev değerlendirmesi. Bunlar bitince ders anlatmaya ya da kurs üretmeye mecal kalmıyor. AI bu yığını 1/5'ine indiriyor — sen asıl işin olan öğretmeye geri dönüyorsun.",
    },

    sectorContext: {
      whyAiMatters:
        "Eğitim sektörü, AI'nın en güçlü uygulama alanlarından biri. Farklı öğrenme hızları, farklı zorluk seviyeleri, kişiselleştirilmiş geri bildirim — tüm bunlar öğretmen zamanını tüketirken AI bunu ölçeklenebilir hale getiriyor. Harvard, MIT ve Stanford'da AI destekli ders materyali üretimi artık standart; Coursera gibi platformlar AI eğitmen asistanları kullanıyor.\n\nTürkiye'de online eğitim pazarı 2024'te %35 büyüdü. Bu büyüme içinde kazananlar, AI ile kişiselleştirilmiş deneyim sunup ölçeklenebilen eğitmenler. Özel ders öğretmeni AI ile 30 öğrenciye kişisel geri bildirim verebiliyor, akademisyen saatlerce süren soru hazırlığını dakikalara indiriyor, online kurs yapımcısı tek başına Udemy koleksiyonu üretebiliyor.",
      stats: [
        {
          value: "10 saat → 90 dk",
          label:
            "AI kullanan öğretmenlerin haftalık materyal hazırlık süresi tasarrufu ortalaması.",
          source: "EdTech Magazine AI in Education Survey, 2024",
        },
        {
          value: "%42",
          label:
            "Kişiselleştirilmiş geri bildirim alan öğrencilerin akademik performans artışı.",
          source: "Journal of Educational Psychology, 2023",
        },
        {
          value: "%68",
          label:
            "Eğitmenlerin AI materyal araçlarını kullandıktan sonra 'daha çok öğretmeye odaklanabildiğimi hissediyorum' yanıtı.",
          source: "Common Sense Media Teacher AI Report, 2024",
        },
      ],
      comparison: {
        without: [
          "Her hafta 10+ saat sunum, soru, değerlendirme — ders anlatmaya vakit kalmıyor",
          "Her öğrenciye aynı jenerik geri bildirim — ya da hiç geri bildirim",
          "Online kurs fikri var ama 'zamanım yok' engeli yıllardır aşılamıyor",
          "Farklı seviye öğrenciler aynı materyali aynı şekilde alıyor",
        ],
        with: [
          "Materyal hazırlığı 90 dakikada, kalan zaman öğrenciye ve kendine yatırıma",
          "Her öğrenciye kişisel geri bildirim — 30 öğrenci 30 dakikada",
          "Online kurs müfredatı + ilk 3 ders 1 haftada hazır, yayına başla",
          "3 seviye materyal paralel üretiliyor — başlangıç, orta, ileri",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: Soru Bankası Otomasyonu",
        problem:
          "Hafta sonu 3 farklı sınıfa 3 farklı seviyede 20'şer soru lazım. Çoktan seçmeli, açık uçlu, uygulamalı — hepsi farklı. Geçen yılkileri tekrar kullansan öğrenciler biliyor. Sıfırdan yazsan 4-5 saat. Bu yüzden genelde kalite zayıflıyor.",
        steps: [
          "Konu başlıklarını ve öğrenme hedeflerini listele (Bloom taksonomisi: bilgi, kavrama, uygulama, analiz)",
          "Claude'a bu bilgiyi ver, aşağıdaki soru bankası prompt'unu kullan",
          "AI her zorluk seviyesinde ve tipinde sorular üretir — çeldirici ve cevap anahtarıyla",
          "Sorular üzerinden hızlı git, 1-2'sini revize et, 1-2'sini çıkart — sen onaylar yayınlarsın",
          "Sorun bankasını Notion veya Excel'de kategorilere kaydet — gelecek dönemlerde de kullanabilirsin",
        ],
        promptExample: `Sen deneyimli bir eğitim materyal tasarımcısısın. Aşağıdaki konu için çok formatlı soru bankası hazırla.

Ders bilgileri:
- Konu: [Örn. "Hücre biyolojisi — mitoz bölünme"]
- Sınıf/yaş: [Örn. 10. sınıf, 15-16 yaş]
- Öğrenme hedefleri: [Madde madde]
- Müfredat bağlamı: [MEB / IB / AP / Diğer]
- Zaman: [Sınav/quiz/ödev için]

Üret:
1. Çoktan seçmeli sorular (10 tane, 3 farklı zorlukta)
   - Her soru: 4 şık, 1 doğru cevap, 3 gerçekçi çeldirici (yaygın yanlış anlamaları yansıtan)
   - Cevap anahtarı + neden doğru/yanlış açıklaması
2. Açık uçlu sorular (5 tane, uygulama + analiz seviyesinde)
   - Her soru: beklenen cevabın 3 anahtar noktası, puanlama rubriği (0-3)
3. Uygulamalı/senaryo sorusu (3 tane)
   - Her biri: gerçek hayat senaryosu, yanıt için rehber sorular, değerlendirme kriterleri

Ton: Yaş grubuna uygun, soru dili net, kültürel olarak uygun (Türkiye bağlamı).
Önemli: Her zorluk seviyesi hedef kitleyi zorlasın ama umutsuzluğa düşürmesin. Bloom taksonomisi etiketini (Bilgi/Kavrama/Uygulama/Analiz/Değerlendirme) ekle.`,
        before: "3 sınıf × 20 soru: 4-5 saat, sıfırdan",
        after: "3 prompt × 15 dakika + kontrol: 1-1.5 saat, yüksek çeşitlilik",
      },
      {
        title: "Senaryo 2: Sunum ve Ders Notu Üretimi",
        problem:
          "Pazartesi dersin var: 'Fransız Devrimi'nin Ekonomik Nedenleri'. Önünde boş bir PowerPoint. Konuya hakimsin ama slaytları tasarlamak, doğru sıralamayı kurmak, öğrenci ilgisini çekecek hikaye yapısını oluşturmak ayrı iş. Gece yarısı hâlâ 3. slaytta.",
        steps: [
          "Konu başlığı ve sınıf seviyesini Claude'a ver — aşağıdaki sunum prompt'unu kullan",
          "AI 8-12 slaytlık yapı önerir: giriş hook'u, ana bölümler, aktiviteler, özet",
          "Her slayt için: başlık + ana fikirler + konuşma notu + önerilen görsel",
          "Canva'da şablona yerleştir (AI üretilen metin kopyala-yapıştır)",
          "1-2 slaytı kendi anı/örneğinle zenginleştir — senin dokunuşun buraya",
        ],
        promptExample: `[Konu] için [X dakika] süren, [yaş grubu] öğrencilere yönelik etkileşimli ders sunumu hazırla.

Ders bilgileri:
- Konu: [Detay]
- Süre: [Dakika]
- Sınıf: [Yaş/sınıf]
- Müfredat bağlantısı: [Varsa]
- Öğrenme hedefleri: [2-3 net hedef]
- Sınıf dinamiği: [Sessiz/aktif/karma]
- Hangi ön bilgi var: [Bilinen konu]

10 slaytlık yapı üret:
1. Hook slaydı: Dikkat çekici bir soru, görsel veya paradoks
2. Öğrenme hedefleri (açık şekilde)
3. Bağlam/ön bilgi köprüsü
4-7. Ana içerik (her biri tek bir fikir, üst üste bilgi atlamadan)
8. Etkileşim aktivitesi (tartışma sorusu, ikili çalışma, hızlı quiz)
9. Kritik düşünme sorusu (sınıfı zorlayacak)
10. Özet + sıradaki derse köprü

Her slayt için şunları ver:
- Başlık (max 6 kelime)
- Slayt içi metin (3-4 madde, her biri max 8 kelime)
- Konuşma notu (öğretmenin anlatacağı, 3-4 cümle)
- Önerilen görsel (ne aranacak veya oluşturulacak)
- Tahmini süre (dakika)

Ton: Yaş grubuna uygun, merak uyandıran, ezber değil anlama odaklı. Mümkün oldukça güncel örnek ve Türkiye bağlamı serpiştir.`,
        before: "10 slaytlık ders sunumu: 3-4 saat",
        after: "AI yapı + Canva şablon + kişisel dokunuş: 45-60 dakika",
      },
      {
        title: "Senaryo 3: Kişisel Geri Bildirim Sistemi",
        problem:
          "30 öğrencinin ödevi geldi. Her birine kişisel, yapıcı geri bildirim vermek istiyorsun — ama 5 dakika/öğrenci × 30 = 2.5 saat. Genelde 'güzel', 'biraz daha çalış' gibi tekdüze yorumlara dönüyor. Öğrenci gelişmiyor çünkü spesifik geri bildirim yok.",
        steps: [
          "Öğrenci ödevlerini dijitalleştir (fotoğraf/PDF)",
          "Her ödev için 3-5 anahtar gözlem ve puan bileşenini Claude'a girişle",
          "AI her öğrenciye kişisel, yapıcı, spesifik geri bildirim üretir — güçlü yan + gelişim alanı + somut sonraki adım",
          "Üretilen geri bildirimleri hızlı gözden geçir, kendi dokunuşun (öğrenciyi tanıyorsan) ekle",
          "WhatsApp/email/sınıf platformu üzerinden öğrencilere gönder — velilerle paylaşılabilir",
        ],
        promptExample: `[Öğrenci adı] için [ödev türü] geri bildirimi yaz.

Öğrenci bilgisi:
- Ad: [Ad]
- Sınıf: [Sınıf/yaş]
- Güçlü yanı (genel): [Varsa — örn. yaratıcılık, analitik düşünme]
- Gelişim alanı (genel): [Varsa — örn. düzenli çalışma, yazım]

Ödev bilgileri:
- Ödev türü: [Yazılı / proje / problem çözümü / sunum]
- Konu: [Detay]
- Puan/not: [X/Y]

Gözlemler:
- Güçlü yanlar: [Bu ödevde iyi yapılanlar, somut]
- Gelişim alanları: [Bu ödevde eksik kalanlar, somut]
- Dikkat çeken özel nokta: [Yaratıcı bir fikir, farklı yaklaşım vb.]

Geri bildirim yaz:
1. Spesifik açılış: Öğrencinin ödevinde takdir edilen somut bir detayla başla (jenerik 'güzel' değil)
2. 1 güçlü yan — neden iyi olduğunu açıkla, hangi beceriyi gösterdiğini
3. 1-2 gelişim alanı — somut, suçlayıcı değil, 'bir dahaki sefere şunu dene' diliyle
4. 1 somut sonraki adım — ne yapabilir, hangi kaynağı kullanabilir (2 cümle)
5. Motivasyonel kapanış — öğrenciyi tanıdığını gösteren, kişisel

Toplam: Max 180 kelime. Ton: Sıcak, profesyonel, yapıcı. Öğrencinin özgüvenini artır, aynı zamanda net gelişim yolu çiz.
UYARI: Not düşükse 'başarısız' değil 'henüz ulaşmadı' dili kullan. Yüksekse 'bir sonraki meydan okuma' öner.`,
        before: "30 öğrenciye kişisel geri bildirim: 2.5-3 saat (çoğu zaman atlanıyor)",
        after: "Hızlı gözlem notu + AI geri bildirim + kontrol: 30-40 dakika",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "Soru bankası, ders sunumu, kişisel geri bildirim, müfredat planlama için en kapsamlı AI asistanı.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Soru üretme, ders sunumu, kişisel geri bildirim, müfredat",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description: "Alternatif soru ve aktivite fikri üretimi, hızlı yanıtlama için ikinci ses.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Alternatif soru, hızlı aktivite fikri, öğrenci sorularına yanıt",
      },
      {
        name: "Canva AI (canva.com)",
        description: "Ders sunumu tasarımı, öğrenci çalışma kağıdı, eğitim infografikleri için.",
        free: true,
        link: "https://canva.com",
        bestFor: "Sunum, çalışma kağıdı, infografik, eğitim görseli",
      },
      {
        name: "Kahoot (kahoot.com)",
        description: "Sınıf içi quiz ve etkileşimli oyunlar — AI üretilen soruları direkt aktarabilirsin.",
        free: true,
        link: "https://kahoot.com",
        bestFor: "Sınıf içi quiz, motivasyon, formatif değerlendirme",
      },
      {
        name: "Notion AI (notion.so)",
        description: "Müfredat planlama, öğrenci takip ve ders planı yönetimi için AI destekli alan.",
        free: false,
        link: "https://notion.so",
        bestFor: "Müfredat, ders planı, öğrenci notu, ileri seviye planlama",
      },
    ],

    prompts: [
      {
        title: "1. Çoktan Seçmeli Soru",
        prompt: `[Konu] için [sınıf/yaş] seviyesine 10 çoktan seçmeli soru yaz. Her soru: 4 şık, 1 doğru, 3 gerçekçi çeldirici (yaygın yanlış anlamaları yansıtan). Zorluk dağılımı: 4 kolay, 4 orta, 2 zor. Cevap anahtarı + her şık için kısa açıklama. Bloom seviyesi etiketle.`,
        expectedOutput: "10 çoktan seçmeli soru + cevap anahtarı + açıklamalar",
      },
      {
        title: "2. Açık Uçlu Soru + Rubrik",
        prompt: `[Konu] için [sınıf] seviyesine 5 açık uçlu soru yaz. Uygulama ve analiz seviyesinde. Her soru için: beklenen cevabın 3 anahtar noktası, 4'lük puanlama rubriği (0-1-2-3), 1 örnek tam cevap. Türkçe ve net.`,
        expectedOutput: "5 açık uçlu soru + rubrik + örnek cevap",
      },
      {
        title: "3. Ders Sunumu Yapısı",
        prompt: `[Konu] için [X dakikalık] [yaş grubu] dersi. 10 slayt: hook → hedef → ön bilgi → ana içerik (4 slayt) → aktivite → kritik soru → özet. Her slayt: başlık, içerik maddeleri, konuşma notu, önerilen görsel, süre.`,
        expectedOutput: "Tam 10 slayt ders sunumu yapısı",
      },
      {
        title: "4. Öğrenciye Kişisel Geri Bildirim",
        prompt: `[Öğrenci adı, sınıf] için [ödev türü] geri bildirimi. Gözlemler: güçlü yan: [A], gelişim: [B]. 180 kelime: spesifik açılış, 1 güçlü yan + neden iyi, 1-2 gelişim + somut öneri, sonraki adım, motivasyonel kapanış. Suçlayıcı değil yapıcı dil.`,
        expectedOutput: "Kişisel yapıcı öğrenci geri bildirimi",
      },
      {
        title: "5. Aktivite/Oyun Fikri",
        prompt: `[Konu] için [sınıf] seviyesine 20 dakikalık sınıf içi aktivite öner. Malzeme minimum. 3 alternatif: 1) Bireysel, 2) İkili, 3) Grup. Her biri: amaç, adımlar, materyal, değerlendirme kriterleri.`,
        expectedOutput: "3 aktivite alternatifi",
      },
      {
        title: "6. Veli Bilgilendirme Mektubu",
        prompt: `[Öğrenci] velisine [konu: genel performans / sınav / özel durum] hakkında bilgilendirme mektubu. Ton: sıcak profesyonel, öğrenciye saygılı, veliyi ortak hedefte yanına al. 250 kelime, net sonraki adım.`,
        expectedOutput: "Profesyonel veli mektubu",
      },
      {
        title: "7. Online Kurs Müfredatı",
        prompt: `[Konu] için online kurs müfredatı. Hedef kitle: [kim]. Süre: [haftalık / X saat]. 8-10 modül, her modülde: öğrenme hedefi, alt konular, video süre önerisi, ödev, değerlendirme. Kurs sonu yeterlik: [ne kazanacak].`,
        expectedOutput: "Tam online kurs müfredat iskeleti",
      },
      {
        title: "8. Ders Özeti / Ders Notu",
        prompt: `[Konu] dersinin öğrenci için çalışma notu. Sınıf: [seviye]. Süre: 2 sayfa. Yapı: net anahtar kavramlar, 3 gerçek hayat örneği, görsel/tablo önerisi, 5 kendini test sorusu cevabıyla.`,
        expectedOutput: "Öğrenciye çalışma notu",
      },
      {
        title: "9. Öğrenciye Motivasyon Mesajı",
        prompt: `[Öğrenci] şu durumda: [örn. son sınav başarısız, düşük motivasyon / yüksek performans sürüyor]. Kişisel motivasyon mesajı yaz, 100 kelime, samimi, büyüme zihniyeti diliyle, somut bir sonraki adım içersin.`,
        expectedOutput: "Kişisel motivasyon mesajı",
      },
      {
        title: "10. Ölçme ve Değerlendirme Planı",
        prompt: `[Dönem/ünite] için ölçme planı. [Konular]. 4 tip değerlendirme: formatif (her hafta), ara sınav, proje, dönem sonu. Her biri: amaç, içerik, süre, ağırlık. Öğrenci yüküne dikkat, çeşitlilik sağla.`,
        expectedOutput: "Dönemlik ölçme değerlendirme planı",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. Yaklaşan dersin konusu için Prompt 1 ile soru bankası üret. Kendin 3-4'ünü revize et, yayına hazırla.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 2,
        task: "Yaklaşan ders için Prompt 3 ile sunum yapısı al. Canva'da eğitim şablonu seç, AI üretilen içeriği yerleştir. 1-2 kişisel anı/örnek ekle.",
        tool: "Claude.ai + Canva",
        duration: "75 dakika",
      },
      {
        day: 3,
        task: "Geçen haftanın ödev yığını (veya en son 10 öğrenci) için Prompt 4 ile kişisel geri bildirim üret. Gönder, öğrenci tepkisini gözle.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 4,
        task: "Sınıf içi motivasyon için Prompt 5 ile aktivite al, Kahoot'ta quiz versiyonu yap. Sıradaki derste dene.",
        tool: "Claude.ai + Kahoot",
        duration: "45 dakika",
      },
      {
        day: 5,
        task: "Uzun süredir aklında olan online kurs fikri için Prompt 7 ile müfredat çıkar. İlk modülün içeriğini Prompt 3 + Prompt 8 ile başlat.",
        tool: "Claude.ai",
        duration: "90 dakika",
      },
      {
        day: 6,
        task: "3 öğrenci velisine Prompt 6 ile dönem bilgilendirme mektubu yaz ve gönder. Geri dönüşleri not al.",
        tool: "Claude.ai",
        duration: "45 dakika",
      },
      {
        day: 7,
        task: "Bu haftanın materyal üretim sürelerini kaydet ve geçen haftayla karşılaştır. En verimli 3 prompt'u kendi 'kütüphane'ne kaydet.",
        tool: "Claude.ai + Notion",
        duration: "30 dakika",
      },
    ],

    growtTeaser:
      "Materyal üretim yükünü 1/5'e indirdi, kişisel geri bildirim sistemi kurdu, online kurs iskeletini çıkardın. Asıl büyüme fırsatı, eğitmen ekonomisini ölçeklenebilir bir eğitim işine dönüştürmekten geçiyor. GROWT Method ile bu geçişi planla. Kişisel planın için growtify.ai/test.",

    ctaHeadline: "Bir sonraki adım: Öğretim Kariyerine Özel AI Büyüme Planı",
    ctaBody:
      "Materyal üretimini ve geri bildirimi hızlandırdın. Sırada online kursu yayınlamak, öğrenci sayını ölçeklemek ve pasif gelir kanalları kurmak var. growtify.ai/test üzerinden ücretsiz AI Dijital Olgunluk Testi'ni tamamla — öğretim kariyerine özel yol haritası 5 dakikada.",
  },

  // ─────────────────────────────────────────────────────────────
  // SEKTÖR 12: FITNESS
  // ─────────────────────────────────────────────────────────────
  fitness: {
    slug: "fitness",
    coverTitle: "Fitness Profesyonelleri için AI Program Rehberi",
    coverSubtitle: "Her müşteriye özel antrenman + beslenme + takip — dakikalar içinde, ölçeklenebilir",
    sectorIcon: "💪",

    intro: {
      forWho:
        "Bu rehber; her müşteriye özel program yazmaya saatler harcayan, takip gönderemediği için müşteri kaybeden, grup dersi ve kişisel eğitim arasında bölünmüş personal trainer'lar, fitness stüdyosu sahipleri ve beslenme danışmanları için hazırlandı.",
      whatYouGet: [
        "5 AI aracı — fitness pratiği için seçilmiş (Claude, ChatGPT, Trainerize, Canva AI, WhatsApp Business)",
        "3 pratik senaryo — antrenman programı üretimi, beslenme planı, motivasyon takibi",
        "10 kopyala-yapıştır prompt — seviye × hedef × ekipman matrisinde hazır program",
        "İlk 7 gün checklist — müşteri sisteminizi AI ile yeniden kurmak için",
        "Motivasyon mesajı şablon paketi — haftanın her günü için hazır",
      ],
      painHook:
        "15 müşterin var, her birine özel program yazmak haftada 10 saat. Motivasyon mesajları, takip, beslenme düzeltmeleri — hepsi birikiyor, sonra 'zamanım yok' deyince müşteri gidiyor. AI bu yükü senden alır; sen antrenman ve sonuca odaklanırsın.",
    },

    sectorContext: {
      whyAiMatters:
        "Fitness sektörü kişiselleştirme ekseninde dönüşüyor. Genel programlar yerine 'sana özel' deneyim beklentisi standart hale geldi. Ama kişiselleştirme zaman demek — eskiden 'sadece üst seviye PT'lerin lüksü'yken, AI ile her antrenör bu kapasiteye sahip olabiliyor. Nike Training Club, Future, Freeletics gibi global markalar AI destekli programlama ile milyonlarca kullanıcıya 'kişisel' deneyim veriyor.\n\nTürkiye'de bağımsız PT ve küçük stüdyoların fırsatı: aynı araçları kullanıp lokal/samimi hizmetle büyük markalara rakip olmak. 50 müşteriye aynı anda kişisel program + takip + motivasyon sunabilen PT, 10 müşteriyle maksimum kapasite çalışan PT'yle aynı saati harcıyor ama 5x gelir üretiyor.",
      stats: [
        {
          value: "%89",
          label:
            "Fitness müşterilerinin 'kişisel program' sunan hizmetleri 'genel programlara' tercih etme oranı.",
          source: "ACSM Health & Fitness Journal, 2024",
        },
        {
          value: "3x",
          label:
            "Düzenli takip ve motivasyon alan müşterilerin 6 ay sonra aktif kalma oranı — takip yoksa 1, varsa 3 kat.",
          source: "IHRSA Global Fitness Report, 2023",
        },
        {
          value: "%62",
          label:
            "Beslenme planı ile birlikte antrenman veren PT'lerin müşteri memnuniyet ve yeniden satın alma oranı artışı.",
          source: "NSCA Personal Trainer Journal, 2024",
        },
      ],
      comparison: {
        without: [
          "Her müşteriye özel program: 45-60 dakika yazım + güncelleme",
          "Motivasyon mesajları manuel, çoğu zaman gönderilmiyor — müşteri kayboluyor",
          "Beslenme planı ayrı bir uzmanlık olarak görülüyor, sunulamıyor",
          "Müşteri ilerlemesi subjektif takipte, objektif veri yok",
        ],
        with: [
          "Seviye + hedef + ekipman girdisi → AI 10 dakikada 4 haftalık program",
          "Haftanın her günü için hazır motivasyon şablonları, 2 dakikada gönderiliyor",
          "Kalori + makro bazlı beslenme planı AI ile hazır — ek gelir kanalı",
          "Fotoğraf + ölçüm analizi AI ile objektif ilerleme raporu",
        ],
      },
    },

    scenarios: [
      {
        title: "Senaryo 1: Kişisel Antrenman Programı Üretimi",
        problem:
          "Yeni müşteri geldi: 32 yaşında, 6 ay önce doğum yapmış, haftada 3 gün 45 dakika, ev ortamı, dambıl var, hedef 'toparlanma + zayıflama'. Bu profile özel 4 haftalık program yazmak normalde 1 saat. 10 müşterin varsa 10 saat haftada.",
        steps: [
          "Müşteri değerlendirme formunu standardize et (yaş, sağlık geçmişi, hedef, deneyim, ekipman, süre)",
          "Bu bilgiyi Claude'a ver ve aşağıdaki program prompt'unu kullan",
          "AI 4 haftalık progresif programı üretir — set/tekrar/dinlenme + form notları",
          "Kendi uzmanlığınla 2-3 hareketi revize et (müşterinin özel durumuna göre)",
          "PDF veya Trainerize/app'e aktar, müşteriye sun — 10 dakikada hazır",
        ],
        promptExample: `Sen deneyimli bir fitness antrenman tasarımcısısın. Aşağıdaki profile göre 4 haftalık kişisel antrenman programı hazırla.

Müşteri profili:
- Yaş: [X] | Cinsiyet: [K/E]
- Boy/Kilo: [X cm / Y kg]
- Fitness deneyim seviyesi: [Başlangıç / Orta / İleri]
- Sağlık durumu: [Varsa özel not: diz ağrısı, hamilelik sonrası, hipertansiyon vb.]
- Hedef: [Kilo ver / Kas yap / Kardiyovasküler kondisyon / Toparlanma / Performans]
- Mevcut aktivite: [Sedanter / Haftada X gün aktif]
- Süre: Haftada [X] gün, antrenman başına [Y] dakika
- Ekipman: [Ev / Stüdyo / Sınırsız spor salonu + liste]
- Özel istek: [Varsa — örn. ofiste öğle arası, erken sabah]

4 haftalık progresif program hazırla:
- Hafta 1: Adaptasyon — hafif yük, form odaklı
- Hafta 2: Hacim artışı
- Hafta 3: Yoğunluk/yük artışı
- Hafta 4: Peak + deload (son 3 gün hafif)

Her antrenman günü için:
1. Isınma (5 dakika, dinamik hareketler)
2. Ana bölüm: hareketler + set × tekrar + dinlenme (örn. 3 × 12, 60 sn din)
3. Finisher (isteğe göre — HIIT, koşu, foam roll)
4. Soğuma + esneme (5 dakika)

Her hareket için:
- Hareket adı + Türkçe karşılığı
- Set × tekrar (+ tempo, varsa)
- Dinlenme
- Form kritik notu (1 cümle)
- Alternatif hareket (ekipman yoksa veya ağrı varsa)

UYARI: Hamilelik sonrası, kronik ağrı, kardiyovasküler risk varsa başta "Bu program genel rehberdir. Ağrı veya rahatsızlık halinde sağlık profesyoneline danışın" notu ekle.

Ton: Motive edici ama güvenli, profesyonel, anlaşılır.`,
        before: "4 haftalık kişisel program: 45-60 dakika/müşteri",
        after: "Form + AI program + kişisel revizyon: 10-15 dakika/müşteri",
      },
      {
        title: "Senaryo 2: Beslenme Planı ve Kalori Hesabı",
        problem:
          "Müşteri soruyor: 'Ne yemem gerekiyor?'. Beslenme diyetisyenin işi — ama genel bir yol haritası sunamayınca değer algısı düşüyor. Kendi beslenme planı yapsan saatler alıyor, kalori hesabı ayrı bir iş.",
        steps: [
          "Müşteri profilini al (TDEE hesabı için: yaş, kilo, boy, aktivite, hedef)",
          "Claude'a girişle ve beslenme planı prompt'unu kullan",
          "AI TDEE + makro hedefleri + 7 günlük örnek menü üretir (Türk mutfağına uygun)",
          "Standart disclaimer ekle: 'Genel rehber, kronik hastalık varsa diyetisyen'",
          "Müşteriye PDF olarak sun — opsiyonel ek hizmet olarak pakete dahil et",
        ],
        promptExample: `[Müşteri adı] için kişiselleştirilmiş beslenme rehberi hazırla.

Profil:
- Yaş/Cinsiyet: [X / K veya E]
- Boy/Kilo: [cm / kg]
- Aktivite seviyesi: [Sedanter / Hafif / Orta / Yoğun / Çok yoğun]
- Hedef: [Kilo ver / Kas yap / Korun / Performans]
- Hedef hızı: [Haftalık 0.5 kg değişim vb.]
- Alerji/hoşlanmama: [Varsa liste]
- Bütçe seviyesi: [Ekonomik / Orta / Esnek]
- Kültür: [Türk mutfağı ağırlıklı — helal/diyet kısıtı varsa belirt]

Üret:
1. TDEE hesabı (Mifflin-St Jeor formülü, adım adım)
2. Hedef kalori ve makro (protein/karbonhidrat/yağ) günlük
3. 7 günlük örnek menü (kahvaltı, öğle, akşam, 2 ara öğün)
   - Her öğün: yemek adı + porsiyon + tahmini kalori + makro
   - Türk mutfağına uygun (bulgur, kuru fasulye, mercimek çorbası, tavuk, zeytinyağlı, yoğurt)
   - Bütçe dostu tercihler
4. Pratik alışveriş listesi (haftalık)
5. Yemek hazırlama ipuçları (meal prep)
6. Hidrasyon ve takviye önerileri (genel)

UYARI — zorunlu, planın en başına:
"Bu plan genel bir rehberdir. Diyabet, tiroid, gebelik, böbrek hastalığı, yeme bozukluğu veya kronik bir sağlık durumu varsa lütfen bir beslenme ve diyet uzmanıyla görüşün. Hiçbir takviye ürünü doktor/eczacı onayı olmadan kullanılmamalıdır."

Ton: Pratik, cesaret verici, aşırı kısıtlayıcı değil ('yasak' dili yerine 'bu hafta şuna ağırlık ver').`,
        before: "Beslenme planı: ya ayrı uzmanlığa yönlendir (gelir kaybı) ya 2 saat harca",
        after: "AI beslenme rehberi + disclaimer + kişisel dokunuş: 20-25 dakika, ek gelir",
      },
      {
        title: "Senaryo 3: Motivasyon ve Takip Sistemi",
        problem:
          "Pazartesi antrenman sonrası müşteri 'süper hissettim' diyor. Salı sessizlik. Çarşamba antrenman yok. Perşembe 'motive olamadım, iptal'. Haftada bir kez motivasyon mesajı atsan 3 ayda müşteri memnun kalır — ama 20 müşteri × hafta 3 mesaj = haftada 60 mesaj manuel.",
        steps: [
          "Müşteri segmentlerini belirle (yeni başlayan, plato, hedef yakın, performans)",
          "Her segment × her gün için Claude'a motivasyon mesajı şablonu üretttir",
          "Bu şablonları WhatsApp Business'ta 'hazır yanıt' olarak kaydet — 30 şablon",
          "Günlük 10 dakika: o gün antrenmanı planlı olan müşterilere uygun şablonu kişiselleştirerek gönder",
          "Her 2 haftada bir ilerleme fotoğrafı + ölçüm iste — Claude'la ilerleme raporu hazırla",
        ],
        promptExample: `Fitness müşterilerim için haftanın her günü uygun motivasyon mesajı şablonları hazırla.

Müşteri segmentleri:
1. Yeni başlayan (0-4 hafta) — motive ama endişeli
2. Plato dönemi (8-12 hafta) — ilerleme yavaşlamış, demotive
3. Hedef yakın (son 4 hafta) — son gayret, baskı hissedebilir
4. Uzun vadeli (6+ ay) — sürdürülebilirlik, hayat tarzı

Her segment için haftanın 7 günü için (21 mesaj toplam):

Pazartesi: Haftanın başlangıcı, hedef belirleme
Salı: Motive tut, hareket hatırlat
Çarşamba: Orta hafta, zihinsel tazelenme
Perşembe: Enerji düşüş günü, destek
Cuma: Haftayı bitirme, özet
Cumartesi: Aktif dinlenme, dengeli yaklaşım
Pazar: Gelecek haftaya hazırlık

Her mesaj:
- Max 3 cümle
- WhatsApp tonu (samimi, emoji 1-2 tane maksimum)
- 'Sen' dili, kişisel
- Talimat değil davet (yap! değil "bugün ne kadar hareket edebilirsin görmek için küçük bir mental yarış başlatalım mı?")
- Segmente uygun (yeni başlayan için: özgüven; plato için: süreç güveni; hedef yakın için: dayanıklılık; uzun vadeli için: hayat anlamı)

UYARI: Beden şekli hakkında yargılayıcı dil olmasın. Süreç ve hissi öne çıkar, sonuç/dış görünüm arka planda.`,
        before: "20 müşteri × 3 motivasyon/hafta: manuel 60 mesaj yazma, çoğu unutuluyor",
        after: "21 şablon × kişiselleştirme: haftada 15 dakika, tüm müşteriler temas ediliyor",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "Antrenman programı, beslenme planı, motivasyon içeriği ve müşteri raporları için en kapsamlı AI asistanı.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Program tasarımı, beslenme planı, motivasyon, ilerleme raporu",
      },
      {
        name: "Trainerize / FitSW (trainerize.com)",
        description: "PT'ler için müşteri yönetimi, program dağıtımı ve ilerleme takibi platformu.",
        free: false,
        link: "https://trainerize.com",
        bestFor: "Müşteri takibi, program dağıtımı, ilerleme fotoğrafı, takip",
      },
      {
        name: "WhatsApp Business (business.whatsapp.com)",
        description: "Motivasyon mesajları, hızlı soru-cevap ve toplu duyurular için hazır yanıtlarla.",
        free: true,
        link: "https://business.whatsapp.com",
        bestFor: "Motivasyon mesajları, hatırlatma, hızlı cevap",
      },
      {
        name: "Canva AI (canva.com)",
        description: "Instagram fitness içeriği, PDF program şablonları, egzersiz kartları için.",
        free: true,
        link: "https://canva.com",
        bestFor: "Instagram reel, program PDF, egzersiz kartı, öncesi/sonrası kolajı",
      },
      {
        name: "MyFitnessPal / Yazio",
        description: "Müşteri kalori ve makro takibi — AI beslenme planını buraya entegre edebilirsin.",
        free: true,
        link: "https://myfitnesspal.com",
        bestFor: "Müşteri kalori takibi, makro, beslenme günlüğü",
      },
    ],

    prompts: [
      {
        title: "1. 4 Haftalık Antrenman Programı",
        prompt: `[Müşteri profili: yaş/cinsiyet/kilo/boy/hedef/deneyim/ekipman/haftalık gün×süre] için 4 haftalık progresif antrenman programı. Hafta 1 adaptasyon, 2 hacim, 3 yoğunluk, 4 peak+deload. Her gün: ısınma + ana bölüm (hareket × set × tekrar × dinlenme × form notu) + soğuma. Sağlık disclaimer başta.`,
        expectedOutput: "4 haftalık tam program, günlük detayla",
      },
      {
        title: "2. Beslenme Planı (TDEE + Menü)",
        prompt: `[Profil: yaş/kilo/boy/aktivite/hedef] için kişisel beslenme rehberi. Mifflin-St Jeor ile TDEE, hedef kalori + makro, 7 günlük Türk mutfağı menüsü (bütçe dostu), alışveriş listesi, meal prep ipucu, hidrasyon. Sağlık uyarısı zorunlu en başa.`,
        expectedOutput: "TDEE + 7 gün menü + alışveriş listesi",
      },
      {
        title: "3. Motivasyon Mesaj Seti",
        prompt: `[Segment: yeni/plato/hedef yakın/uzun vadeli] müşterim için haftanın 7 günü motivasyon mesaj şablonu. Her mesaj max 3 cümle, WhatsApp samimi tonu, sen dili, talimat değil davet, beden yargısız, süreç odaklı. 7 ayrı mesaj.`,
        expectedOutput: "7 günlük motivasyon şablonu",
      },
      {
        title: "4. İlerleme Raporu",
        prompt: `[Müşteri] için 4 haftalık ilerleme raporu. Veriler: kilo [X→Y], bel ölçüsü [A→B], antrenman devam oranı [Z%], subjektif not [X]. Rapor: takdir açılış, somut veriler, bir güçlü yan, 1 gelişim alanı + somut aksiyon, sıradaki 4 hafta odak. 200 kelime.`,
        expectedOutput: "Müşteriye sunulacak ilerleme raporu",
      },
      {
        title: "5. Instagram Reel Senaryosu",
        prompt: `[Konu: örn. 'ev için 5 dakika karın, evde sırt ağrısı egzersizi'] için 30 saniyelik Instagram reel senaryosu. Hook (3 sn) + 3 hareket (her biri çekim açısı + text overlay) + CTA. Caption 100 kelime + 10 hashtag. Türkçe + EN alt metin.`,
        expectedOutput: "Reel senaryo + caption",
      },
      {
        title: "6. Müşteri Değerlendirme Soruları",
        prompt: `Yeni müşteri onboarding için değerlendirme formu soru seti. 5 başlık: sağlık geçmişi, antrenman geçmişi, hedef, engeller, tercihler. Her başlık altında 4-6 açık soru + varsa hazır seçenekler. WhatsApp veya Google Form olarak gönderilecek.`,
        expectedOutput: "Müşteri onboarding form seti",
      },
      {
        title: "7. Grup Dersi Planı",
        prompt: `[Ders tipi: HIIT/Pilates/Bootcamp] için [X dakikalık] grup dersi planı. Seviye: [karma/başlangıç/ileri]. Isınma + ana bölüm (circuit/set yapısı) + cool-down. Her hareket için süre, seviye modifikasyonu (kolay/zor), eğitmen kontrol noktası. Müzik tempo önerisi.`,
        expectedOutput: "Tam grup dersi plan şablonu",
      },
      {
        title: "8. Sakatlık/Ağrı Modifikasyonu",
        prompt: `Müşteri [bölge: diz/bel/omuz] ağrısı bildirdi. Mevcut programında [hareket listesi] var. Güvenli alternatifler öner (her hareket için 2 alternatif), hangi hareketlerden kaçınmalı, ne zaman sağlık profesyoneline yönlendirmeli. Disclaimer: 'Akut ağrı, sağlık kontrolünden sonra.'`,
        expectedOutput: "Güvenli modifikasyon rehberi",
      },
      {
        title: "9. Fiyat/Paket Açıklama Mesajı",
        prompt: `[Paket: 1-1 PT / grup / online] için potansiyel müşteriye fiyat-değer açıklaması. Paket içeriği: [liste]. Değer vurgusu: ne alıyor. Ödeme koşulu: [detay]. 250 kelime WhatsApp + 100 kelime Instagram DM versiyonu. Samimi ama profesyonel.`,
        expectedOutput: "İki kanal için satış mesajı",
      },
      {
        title: "10. Eğitimsel Blog/Instagram Postu",
        prompt: `[Konu: örn. 'hangi kadın başlangıçta ne kadar ağırlık kaldırmalı', 'bel ağrısıyla çalışma nasıl'] hakkında Instagram eğitim postu. 250 kelime caption, 3 ana madde, mit/gerçek kontrastı, 10 hashtag. Türkçe, hedef kitlenin aradığı SSS diline hitap et.`,
        expectedOutput: "Eğitim Instagram postu",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Claude.ai'a üye ol. Yeni gelen veya mevcut 2 müşteri için Prompt 1 ile 4 haftalık antrenman programı üret. Kendi revizyonunla tamamla, gönder.",
        tool: "Claude.ai",
        duration: "60 dakika",
      },
      {
        day: 2,
        task: "En aktif 3 müşterin için Prompt 2 ile beslenme rehberi hazırla. Disclaimer'ı kontrol et, PDF olarak gönder.",
        tool: "Claude.ai",
        duration: "75 dakika",
      },
      {
        day: 3,
        task: "WhatsApp Business'a geç. Prompt 3 ile 3 segment × 7 gün motivasyon şablonu üret. Hazır yanıt olarak kaydet.",
        tool: "Claude.ai + WhatsApp Business",
        duration: "75 dakika",
      },
      {
        day: 4,
        task: "Onboarding için Prompt 6 ile değerlendirme formu hazırla. Google Form olarak kur, yeni müşteri akışına ekle.",
        tool: "Claude.ai + Google Forms",
        duration: "45 dakika",
      },
      {
        day: 5,
        task: "En uzun süreli müşterin için Prompt 4 ile ilerleme raporu hazırla. Önce/sonra fotoğraf + ölçümleri ekle, müşteriye sun.",
        tool: "Claude.ai + Canva",
        duration: "45 dakika",
      },
      {
        day: 6,
        task: "Canva AI ile 3 Instagram reel senaryosunu Prompt 5 ile üret, çekim yap, hafta için zamanla.",
        tool: "Claude.ai + Canva AI",
        duration: "90 dakika",
      },
      {
        day: 7,
        task: "Bu haftanın müşteri etkileşim süresini ölç. Prompt 10 ile eğitimsel post yaz ve yayınla. Sıradaki haftaya planı çıkar.",
        tool: "Claude.ai + Canva",
        duration: "45 dakika",
      },
    ],

    growtTeaser:
      "Program üretimini, beslenme planını ve motivasyon takibini sistematize ettin. Asıl büyüme fırsatı, bu sistemi kapasite büyütmeye ve online hizmete dönüştürmekten geçiyor — 10 müşteriden 50 müşteriye, stüdyodan online'a. GROWT Method ile bu geçişi planla. Kişisel planın için growtify.ai/test.",

    ctaHeadline: "Bir sonraki adım: PT/Stüdyonuza Özel AI Büyüme Planı",
    ctaBody:
      "Program, beslenme ve takip süreçlerini hızlandırdın. Sırada kapasiteni büyütmek, online gelir kanalı kurmak ve marka olarak büyümek var. growtify.ai/test üzerinden ücretsiz AI Dijital Olgunluk Testi'ni tamamla — işinize özel yol haritası 5 dakikada.",
  },
};

export const PDF_CONTENT_SLUGS = Object.keys(PDF_CONTENT) as Array<keyof typeof PDF_CONTENT>;

export function getPdfContent(slug: string): PdfSectorContent | null {
  return PDF_CONTENT[slug] ?? null;
}
