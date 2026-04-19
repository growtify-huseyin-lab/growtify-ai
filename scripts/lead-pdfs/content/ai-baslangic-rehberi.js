/**
 * Lead Magnet Content — ai-baslangic-rehberi
 *
 * Bu dosya tek bir lead magnet PDF'inin içeriğini taşır.
 * Yeni magnet eklemek için bu dosyayı kopyalayıp düzenle,
 * sonra `node scripts/lead-pdfs/render.js <slug>` çalıştır.
 *
 * İçerik standardı: website/LEAD-MAGNET-CONTENT-BRIEF.md
 */

module.exports = {
  slug: "ai-baslangic-rehberi",
  title: "Yapay Zeka ile İşini Büyütme",
  subtitle: "Başlangıç Rehberi",
  tagline: "5 AI aracı + 3 pratik senaryo + 7 günlük aksiyon planı",
  author: "Hüseyin Şanlıtürk",
  brand: "Growtify AI",
  date: "2026",

  // İçindekiler — sayfa başlıklarını yansıtır
  toc: [
    { title: "Neden bu rehber?", page: 3 },
    { title: "Sana uygun 5 AI aracı", page: 4 },
    { title: "3 pratik uygulama senaryosu", page: 6 },
    { title: "7 günlük aksiyon planı", page: 8 },
    { title: "Sonraki adımın", page: 10 },
  ],

  // ═══════════════════════════════════════════════════════════
  // BÖLÜM 1 — NEDEN BU REHBER?
  // ═══════════════════════════════════════════════════════════
  intro: {
    heading: "Neden bu rehber?",
    body: [
      "Yapay zeka son iki yılda her yerde. ChatGPT, Claude, Gemini, Midjourney… Ama muhtemelen senin için durum şu: <strong>biliyorsun işine yarayabilir, ama nereden başlayacağını bilmiyorsun</strong>.",
      "Bu rehber genel bir yapay zeka tanıtımı değil. İşini büyütmek isteyen bir profesyonelin ilk 7 günde atması gereken somut adımları içeriyor. Okuyunca hemen uygulayabilirsin.",
      "TÜİK 2025 verisine göre Türkiye'deki işletmelerin <strong>%92.5'i</strong> hâlâ yapay zeka kullanmıyor. %74'ü aynı cevabı veriyor: <em>\"Nasıl yapacağımı bilmiyorum.\"</em> Bu rehber tam o boşluğu kapatmak için.",
    ],
    callout: {
      heading: "Bu rehberden nasıl en iyi şekilde faydalanırsın?",
      body: "Hızlıca tüketip kapatma. <strong>Bir</strong> araç seç, <strong>bir</strong> senaryo seç, <strong>bir</strong> iş problemini çöz. Tek bir şeyi uygulamak, 10 şey okuyup hiçbirini yapmamaktan değerlidir.",
    },
  },

  // ═══════════════════════════════════════════════════════════
  // BÖLÜM 2 — 5 AI ARACI
  // ═══════════════════════════════════════════════════════════
  tools: {
    heading: "Sana uygun 5 AI aracı",
    intro:
      "Piyasada 500'den fazla AI aracı var. Başlangıç için sana 5 tanesi yeter. Her biri farklı bir iş problemini çözüyor:",
    items: [
      {
        name: "ChatGPT (veya Claude)",
        category: "Metin üretimi ve asistan",
        whatFor:
          "Müşteri mesajlarına yanıt, teklif hazırlama, email yazma, blog/sosyal medya içeriği, sözleşme/ihtar taslağı.",
        pricing: "Ücretsiz sürüm iyi başlangıç. Plus: $20/ay (aylık 200-300 TL).",
        sectorExample:
          "<strong>Avukat için:</strong> Danışman talebi mailine ilk yanıt taslağı 10 sn'de hazır. Kendisi revize edip gönderiyor. Eski hali: 15-20 dk/mail.",
        tryIt: "chat.openai.com — hesap aç, ilk sorunu yaz: \"Sen 10 yıllık deneyimli bir [mesleğin] asistanısın. Bana...\"",
      },
      {
        name: "Perplexity",
        category: "Araştırma ve kaynaklı yanıt",
        whatFor:
          "Rakip analizi, pazar araştırması, güncel mevzuat taraması, teknik konuda hızlı araştırma. ChatGPT'den farklı olarak kaynak linkini gösterir.",
        pricing: "Ücretsiz. Pro: $20/ay.",
        sectorExample:
          "<strong>Emlakçı için:</strong> \"Kadıköy bölgesinde son 6 ayda konut fiyat trendi\" sorusuna 30 sn'de kaynaklı yanıt. Google'da 1 saatlik iş.",
        tryIt: "perplexity.ai — hesap bile gerekmez, direkt sor.",
      },
      {
        name: "Canva AI (Magic Design)",
        category: "Görsel tasarım",
        whatFor:
          "Sosyal medya görseli, poster, broşür, sunum. Metin yazıyorsun, görsel üretiyor. Hiç tasarım bilgisi gerektirmiyor.",
        pricing: "Ücretsiz başlangıç. Pro: ~250 TL/ay.",
        sectorExample:
          "<strong>Güzellik uzmanı için:</strong> \"Bahar cilt bakımı kampanyası Instagram görseli\" yaz, 5 seçenek gelsin. Eski hali: ajansa 500-2.000 TL.",
        tryIt: "canva.com/magic-design — ücretsiz sürümle başla.",
      },
      {
        name: "Otter.ai (veya Gemini Live)",
        category: "Ses-yazı dönüşümü ve toplantı özeti",
        whatFor:
          "Müşteri görüşmeleri, seminer, podcast kaydı → otomatik transkript + özet + aksiyon maddeleri.",
        pricing: "Ücretsiz (300 dk/ay). Pro: $17/ay.",
        sectorExample:
          "<strong>Doktor için:</strong> Hasta anamnezi kaydı → otomatik notlar. Hasta dosyasına 5 sn'de yapıştır. Gün sonu 2 saatlik yazışma işi bitti.",
        tryIt: "otter.ai — ücretsiz hesap. Telefonla bir konuşma kaydet, sonucu gör.",
      },
      {
        name: "Make (veya Zapier)",
        category: "Otomasyon — araçları birbirine bağla",
        whatFor:
          "\"Bu olduğunda şunu yap\" mantığı. Örnek: Instagram yorumu geldiğinde otomatik DM gönder. Form doldurulduğunda CRM'e ekle.",
        pricing: "Ücretsiz (1.000 işlem/ay). Core: $9/ay.",
        sectorExample:
          "<strong>Fitness koçu için:</strong> Web form dolduran lead → otomatik WhatsApp mesajı + randevu linki + Google Sheet'e kayıt. Tek seferde kur, sürekli çalışır.",
        tryIt: "make.com — ilk senaryon için hazır şablon seç, 15 dk'da aktif.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // BÖLÜM 3 — 3 PRATİK SENARYO
  // ═══════════════════════════════════════════════════════════
  scenarios: {
    heading: "3 pratik uygulama senaryosu",
    intro:
      "Araçları biliyorsun. Şimdi onları birleştirip somut iş problemine nasıl uyguladığını göster. Aşağıdaki 3 senaryo farklı sektörlerden — kendi işine uyarla.",
    items: [
      {
        number: "01",
        sector: "Güzellik Uzmanı",
        problem:
          "Haftada 8-10 saat sosyal medya içerik üretimine gidiyor. Rekabet yüksek, içerik fikri bitiyor.",
        solution: [
          "<strong>ChatGPT:</strong> \"Cildin için üç yaygın efsane\" başlıklı 30 saniyelik Reels senaryosu yaz. Konu hazır.",
          "<strong>Canva AI:</strong> Bu senaryo için 3 Instagram post görseli üret. Seçeneklerden birini seç.",
          "<strong>Make:</strong> Haftanın her pazartesi 09:00'da bu prompt'u otomatik çalıştır → yeni içerik her pazartesi Google Drive'a düşsün.",
        ],
        result: "Haftalık içerik planlama 8 saatten 1 saate düştü.",
      },
      {
        number: "02",
        sector: "Emlakçı",
        problem:
          "Yeni ilan çıktığında ilan metni, sosyal medya tanıtımı, müşterilere özel mail — hepsi ayrı iş. 1 ilan = 2 saat.",
        solution: [
          "<strong>ChatGPT:</strong> Dairenin 5 özelliğini gir (kaç m², kaç oda, konum vs). Çıktı: MLS ilan metni + Instagram caption + 3 adet WhatsApp müşteri mesajı.",
          "<strong>Perplexity:</strong> \"Bu mahallede son 3 ayda satılan benzer daire fiyatları\" sorusuna kaynaklı yanıt — pazarlık için hazır bilgi.",
          "<strong>Canva AI:</strong> Fotoğrafları yükle, Instagram carousel + TikTok video otomatik üretilsin.",
        ],
        result: "İlan başına harcanan süre 2 saatten 20 dakikaya düştü.",
      },
      {
        number: "03",
        sector: "Muhasebeci",
        problem:
          "Müşteri soruları WhatsApp'tan geliyor, her birine manuel yanıt yazıyorsun. Basit sorulara bile 5-10 dk.",
        solution: [
          "<strong>ChatGPT:</strong> En sık gelen 20 müşteri sorusunu liste yap, her biri için hazır yanıt taslakları oluştur. Bunu bir dokümanda tut.",
          "<strong>Make + WhatsApp Business:</strong> Müşteriden mesaj gelince otomatik \"Merhaba, [sorun nedir] başlığıyla bir araştırma yapıyorum, 2 saat içinde dönüş yapacağım\" yanıtı.",
          "<strong>Otter:</strong> Ayda bir grup danışmanlık saati kaydı → otomatik FAQ güncelleme.",
        ],
        result: "WhatsApp yanıt süresi 10 dk'dan 2 dk'ya düştü, memnuniyet arttı.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // BÖLÜM 4 — 7 GÜNLÜK PLAN
  // ═══════════════════════════════════════════════════════════
  plan: {
    heading: "7 günlük aksiyon planı",
    intro:
      "Bu plan rehberi okuyup kapatmaman için. Her gün 30-45 dakika ayır. Hafta sonunda elinde bir AI workflow'u, somut bir verim kazancı olacak.",
    days: [
      {
        day: "1. Gün",
        label: "Pazartesi",
        focus: "İşini haritalandır",
        tasks: [
          "Haftalık yaptığın 5 tekrarlayan işi yaz (mail yanıtı, içerik üretimi, rapor, araştırma, müşteri takibi…)",
          "Her biri haftalık kaç saatini alıyor? Toplam rakamı yaz.",
          "Bu 5 işten hangisi senin için en sıkıcı veya zaman alıcı? Onu işaretle — hafta boyunca bunu çözeceksin.",
        ],
      },
      {
        day: "2. Gün",
        label: "Salı",
        focus: "ChatGPT hesabı + ilk prompt",
        tasks: [
          "chat.openai.com üzerinden ücretsiz hesap aç.",
          "1. günde işaretlediğin iş için şu formatta prompt yaz: <em>\"Sen [mesleğinde] 10 yıllık deneyimli bir uzmansın. Ben [iş durumun]. Sana [somut sorun] konusunda yardım etmeni istiyorum.\"</em>",
          "5 defa farklı şekilde sor, en iyi yanıtı veren prompt'u kaydet.",
        ],
      },
      {
        day: "3. Gün",
        label: "Çarşamba",
        focus: "Perplexity + araştırma",
        tasks: [
          "perplexity.ai aç (hesap gerekmez).",
          "İşin/sektörün için güncel bir soru sor: \"[Sektörümde] 2026'da en çok büyüyen 3 fırsat nedir?\"",
          "Aldığın yanıttan 1 fırsatı seç — bu hafta onu test et.",
        ],
      },
      {
        day: "4. Gün",
        label: "Perşembe",
        focus: "Canva AI + görsel",
        tasks: [
          "canva.com/magic-design aç.",
          "Bir sosyal medya post için görsel üret: \"[Meslek] için [konu] hakkında bir carousel\".",
          "3 varyant indir, birini sosyal medyada yayınla. Etkileşimi takip et.",
        ],
      },
      {
        day: "5. Gün",
        label: "Cuma",
        focus: "İş akışını birleştir",
        tasks: [
          "Bu hafta kullandığın 3 aracı (ChatGPT + Perplexity + Canva) bir iş problemine aynı anda uygula.",
          "Örnek: \"Yeni hizmetim için pazar araştır (Perplexity) → satış metni yaz (ChatGPT) → sosyal medya görseli üret (Canva).\"",
          "Kaç dakika sürdü? Eski hâlinden ne kadar hızlı?",
        ],
      },
      {
        day: "6-7. Gün",
        label: "Hafta sonu",
        focus: "Değerlendir ve planla",
        tasks: [
          "Hafta boyunca kazandığın toplam saati hesapla.",
          "En çok faydasını gördüğün 1 aracı seç — onu gelecek hafta günlük rutinine yerleştir.",
          "Kendine sor: <em>\"Sıradaki 7 günde hangi iş problemine AI uygulayabilirim?\"</em>",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // BÖLÜM 5 — CTA
  // ═══════════════════════════════════════════════════════════
  cta: {
    heading: "Sıradaki adımın",
    body: [
      "Bu rehber sana 5 araç, 3 senaryo ve 7 günlük plan verdi. Uygulayınca ilk somut kazanımı göreceksin.",
      "Ama asıl soru şu: <strong>senin sektörüne, senin iş modeline, senin büyüklüğünde bir işletmeye özel AI yol haritası neye benzer?</strong> Bu rehber genel başlangıçtı. Sıradaki adım kişisel olan.",
    ],
    offer: {
      heading: "2 dakikalık ücretsiz quiz",
      description:
        "growtify.ai/test — sektörüne özel AI fırsat analizi + kişisel 4 haftalık dönüşüm planı + sana özel program fiyatı.",
      url: "https://growtify.ai/test",
      buttonText: "Kişisel Planımı Oluştur →",
    },
    closing:
      "Ben süreci veriyorum — sonucu belirleyen senin uygulamaların. Soruların olursa info@growtify.app adresinden veya Instagram/LinkedIn üzerinden yaz.",
    signature: "Hüseyin Şanlıtürk — Growtify AI",
  },
};
