# Türkçe Çeviri — Sürüm Takibi

Growtify'ın İngilizce gelen arayüzlerini (GHL tabanlı) Türkçeye çeviren bütün katmanların tek sürüm kaydı.
Her yayın burada bir satırla görünür; D1'deki takip kaydı (`ART-growtify-ai-dev-tr-i18n-tracker-rNNN`)
bu dosyanın o anki özetidir.

## Sürüm kuralı

- Sürüm biçimi `ANA.ARA.YAMA`:
  - **YAMA** — metin düzeltmesi, birkaç eksik çeviri, terim düzeltmesi.
  - **ARA** — yeni ekran/modül kapsamı, katalog genişlemesi, yeni özellik (ör. TR/EN düğmesi).
  - **ANA** — yöntem değişikliği (ör. DOM sözlüğünden katalog katmanına geçiş) veya geriye dönük uyumsuz değişiklik.
- Yayına giden her değişiklik: sürüm artışı + bu dosyaya bir satır + (ARA/ANA ise) D1'de yeni revizyon kaydı
  (`supersedes` ile bir öncekine bağlı). YAMA'lar bir sonraki D1 revizyonunda toplu görünür.
- Katalog dosyası sürümü taşır; sayfada doğrulanır:
  - CRM: `<html data-gai-crm-tr="X.Y.Z">` (sürüm `scripts/crm-i18n/VERSION` dosyasından gelir)
  - Panel: değişiklik kaydı bu dosyada; yükleyici `?v=1` sabit kalır (dosyalar 60 sn önbellekle yenilenir).
- GHL güncellemesi bir çeviriyi bozarsa: belirti + kök neden + düzeltme YAMA satırına yazılır.

## Bileşenler ve güncel sürüm

| Bileşen | Nerede | Güncel sürüm | Durum |
|---|---|---|---|
| Öğrenci paneli | panel.growtify.ai (GHL Client Portal) | **2.0.0** | Yayında |
| Ödeme sayfası | odeme.growtify.app (GHL ödeme linki) | **1.1.0** | 1.0.0 yayında; 1.1.0 deploy'u doğrulanacak |
| Program satın alma sayfası | panel.growtify.ai/courses/offers/* | **1.1.0** | Yayında |
| CRM | Growtify.app CRM (admin.growtify.app) | **1.1.0** | 1.0.0 yayında; 1.1.0 PR'da — varsayılan Türkçe (Harrington Housing ve Rentser İngilizce) |
| Otomasyon kurucusu, takvim ayarları, Ayarlar içeriği, Yapay Zeka Stüdyosu | GHL'in ayrı sitesinde çalışan iframe'ler | **0.0.0** | Başlamadı — vekil alt alan adı denemesi planlı |
| Mobil | Telefon tarayıcısı + ana ekran simgesi | — | Lansman sonrası test; kendi uygulamamız yok (CEO kararı) |

## Değişiklik kaydı

### CRM (Growtify.app CRM)
- **1.1.0** — 2026-10-03 — Eksiksizlik turu (CEO: "tümünü yeniden kontrol et tek tek tamamla", "tıklamalar dahil
  turla"). Katalog 59.580 → **77.432** metin. **Tıklamalı tur:** 296 sayfa, 367 tıklama (sekmeler, filtre/sütun/sıralama düğmeleri, açılır menüler;
  hiçbir şey kaydedilmedi/silinmedi/gönderilmedi) → 1.562 aday metin. **Katalog farkı turu:** GHL'in sayfa açılınca
  sonradan yüklediği kabuk bölümleri ilk toplamada yoktu (reklam yöneticisi, müşteri portalı ayarları,
  hizmetler/hizmet menüsü, kiralamalar, Yext ile listeleme, ajans/bayilik, şablon kütüphanesi, fiyat teklifleri…)
  → 11.742 yeni kabuk metni. **Yeni alt uygulama katalogları:** Telefon Sistemi ayarları (`phone`, 5.287 metin:
  numaralar, numara havuzları, WhatsApp Business, A2P/Güven Merkezi, SIP) ve takvim ayarları uygulaması
  (`calsched`, 1.612 metin: çalışma programları, tarihe özel saatler, sorun giderme, hizmetler, odalar/ekipman)
  + önceki turda bulunan toplu işlemler (`bulk`) ve Wave/Xero (`wave`). ABD operatörlerine gönderilen hazır A2P
  metinleri bilerek İngilizce. Sayfa sözlüğü 828 metne çıktı (GHL kodunda sabit metinler: Yapay Zeka
  Ajanları tanıtımı, Labs özellik listesi, kurs oluşturma/Kajabi içe aktarma, ödeme sağlayıcı açıklamaları,
  entegrasyon açıklamaları, faturalandırma uyarıları…), sayı kalıpları 52 kural (görüntülenme/arama/üye/kayıt
  sayıları, "Adım 2", "10 / sayfa", sekmelerdeki "(0)" sayaçları). **Yükleyici:** Türkçe büyük harf hatası
  düzeltmesi ("KişIler" → "Kişiler", "FıRsatlar" → "Fırsatlar"), sayıdan sonra tekil ("584 Kişi", "7/103 sütun"),
  "Ekle Kişi" → "Kişi Ekle", uzun ay adları ve tarih aralıkları ("28 Eylül 2026", "19 Eyl 2026 – 3 Eki 2026";
  ay adı tam listeyle eşleşir). Terim birliği: opt-out = "abonelikten çıkma", buffer = "ara süre", slug =
  "URL kısa adı". Kalan: takvim ayarlarındaki takvim/hizmet menüsü/oda/ekipman LİSTESİ ve otomasyon kurucusu
  GHL'in ayrı sitesinden iframe ile geliyor (dev-028); Voice AI arama puanları kataloğu (küçük) yakalanamadı.
- **1.0.0** — 2026-10-03 — Lansman. Yükleyici GHL Ajans Ayarları → White Label → Custom JS'te (CEO "yayına al";
  favicon betiği korundu). Varsayılan dil Türkçe; Harrington Housing ve Rentser alt hesapları İngilizce açılır
  (CEO kararı); kişinin TR/EN seçimi her zaman önce gelir (`crm-config.json`: `default`, `english`, `turkish`).
  Tarih seçicilerde ay ve gün adları Türkçe (Ekim 2026, Pz Pt Sa Ça Pe Cu Ct); takvim görünümünde gün başlıkları
  ("28 Pzt"), 24 saat etiketleri ve tarih aralığı ("28 Eyl – 4 Eki 2026"); listelerdeki tarih metinleri
  ("3 Eki 2026"). Panoda kalan başlıklar ve CEO'nun bildirdiği metinler Türkçe. Gizli bakım modu
  **çeviri avı** (`?gai_hunt=1` açar, `?gai_hunt=0` kapatır): Türkçe açıkken ekranda İngilizce kalan arayüz
  metinlerini ve eşleşmeyen katalogları yalnız tarayıcıda biriktirir, sol alttaki rozetten kopyalanır.
- **0.3.0** — 2026-10-03 (#151, aynı gün yayına alındı) — Yayın adayı: 97 parçanın tamamı çevrildi (58 bin metin; ana kabuk + sohbet, takvim,
  ödeme, pazar yeri, nesneler, hediye kartı uygulamaları). Son kontrol: terim birliği (Niyet, Fiyat Teklifi,
  Kampanya, Çoğalt/Kopyala, Google İşletme Profili, Transkript…), white-label (metinlerde HighLevel/GHL/
  LeadConnector adı yok), hitap (arayüz "sen"; müşterinin gördüğü sayfalar "siz"), birleştirme etiketleri
  (`{{ … }}`) olduğu gibi görünür. Yükleyici: GHL sonradan metin eklediğinde yalnız o bölümü yeniden yazar;
  katalogda olmayan sabit metinler için birebir eşleşen sayfa sözlüğü. CEO'nun CRM sekmesinde 178 sayfalık
  taramayla denendi.
- **0.2.0** — 2026-10-03 (sürüyor) — CRM'in tamamı çevriliyor: 84.959 metinlik tam katalog toplandı; 97 parçalık
  çeviri, terim tutarlılık kontrolü (`terms-check.mjs`) ve düzeltme katmanı (`overrides.tr.json`). Yükleyici
  sürümü sayfaya yazıyor (`data-gai-crm-tr`).
- **0.1.0** — 2026-10-03 — 1. aşama (24 parça, ~15 bin metin: menü, kişiler, sohbetler, fırsatlar, takvim, pano,
  başlangıç, ayarlar, giriş) + yükleyici: alt hesap listesi Türkçe açılır, herkese TR/EN düğmesi (tarayıcıda
  hatırlanır). CEO'nun CRM sekmesinde dosya yükleme yöntemiyle doğrulandı; yayında değil.

### Öğrenci paneli (panel.growtify.ai)
- **2.0.0** — 2026-10-03 (#150) — Panelin kendi metin kataloğu çevrildi: 4.327/4.327 metin (`public/portal/panel-tr.json`).
  Katalog katmanı GHL'in metin değişikliklerinde Türkçeyi yeniden uygular; EN grupta İngilizce korunur.
- **1.3.0** — 2026-10-03 (#149) — GHL güncellemesi metinleri boşlukla sarınca çevirilerin hiç eşleşmemesi düzeltildi.
- **1.2.0** — 2026-10-01 (#144) — GHL güncellemesinin bozduğu ~170 metin + yarım çeviri koruması.
- **1.1.0** — 2026-06-19 → 2026-07-10 (#59–#109) — sözlük genişletmeleri (bildirimler, profil, quiz, mesajlaşma, mobil).
- **1.0.0** — 2026-06-03 — Harici yükleyici (`community-i18n.js`, GHL Header Code'da tek satır), DOM sözlüğü.

### Ödeme sayfası (odeme.growtify.app)
- **1.1.0** — 2026-10-01 (#146 içinde) — "Powered by" yazısı gizlendi. Kod main'de; ikinci deploy CEO'da —
  canlıda olduğu henüz doğrulanmadı.
- **1.0.0** — 2026-10-01 (#146) — Türkçe, Growtify markalı ödeme sayfası (Cloudflare Worker): tutar biçimi
  `40.000,00 TL`, "Sipariş Özeti", kart içi logo tekrarı kaldırıldı. CEO canlı deneme ödemesiyle doğruladı.

### Program satın alma sayfası (panel.growtify.ai/courses/offers/*)
- **1.1.0** — 2026-10-01 (#147, #148) — kişiye özel kupon otomatik uygulanır, geri sayım (kupon bitişi).
- **1.0.0** — 2026-10-01 (#147) — teklif ödeme ekranı Türkçe: metinler, Stripe kart alanları, TR telefon, TL biçimi.

## Bakım araçları
- Panel: `scripts/panel-i18n/` (EN katalog dökümü → fark → çeviri → doğrulama → derleme).
- CRM: `scripts/crm-i18n/` (katalog toplama, çeviri rehberi, doğrulama, terim kontrolü, derleme).
