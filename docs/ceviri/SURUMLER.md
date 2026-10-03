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
| Ödeme sayfası | odeme.growtify.app (GHL ödeme linki) | **1.1.0** | Yayında (2026-10-03 doğrulandı) |
| Program satın alma sayfası | panel.growtify.ai/courses/offers/* | **1.1.0** | Yayında |
| CRM | Growtify.app CRM (admin.growtify.app) | **1.8.2** | Yayında — varsayılan Türkçe (Harrington Housing ve Rentser İngilizce) |
| CRM iframe ekranları: takvim ayarları, İşletme Profili, E-posta Hizmetleri, Otomasyon, E-postalar, Satış Ortaklığı, Sohbet Sağlayıcıları | crm-takvim / crm-ayarlar / crm-eposta / crm-otomasyon / crm-epostalar / crm-ortaklik / crm-sohbet .growtify.app (workers/crm-frames) | **1.4.1** | Yayında |
| Yapay Zeka Stüdyosu | crm-studyo.growtify.app (leadgen-vibe-ai-builder) | **1.5.1** | Yayında |
| Form / Anket / Test oluşturucu | crm-formlar.growtify.app (leadgen-apps-form-survey-builder) | **1.6.2** | Yayında |
| Satış hunisi / web sitesi sayfa oluşturucu | crm-sayfa.growtify.app (page-builder) | **1.6.6** | Yayında |
| E-posta oluşturucu | crm-eposta-tasarim.growtify.app (email-builder-prod) — şablon düzenleyici CRM sayfasında; kampanya düzenleyicisi E-postalar içinde iç içe | **1.8.1** | Açık (önce hazırla ile): şablon düzenleyici CRM sayfasında, kampanya düzenleyicisi E-postalar içinde iç içe |
| Mobil | Telefon tarayıcısı + ana ekran simgesi | — | Lansman sonrası test; kendi uygulamamız yok (CEO kararı) |

## Değişiklik kaydı

### CRM (Growtify.app CRM)
- **1.8.2** — 2026-10-03 — Kişinin kendi verdiği adlar korunur: web sitesi sayfa adları (`#website-header h6`) ve satış
  hunisi adımları (`#step-container p`, `#funnel-step-details span.truncate`) sözlükteki bir ifadeyle aynı olsa da çevrilmez
  ("Home" adlı sayfa "Ana sayfa" olmuyordu). Sayfa oluşturucu bölüm başlığı "Formlar & Anketler" (uygulama başlığı CSS ile
  kelime kelime büyütüyor; "ve" → "Ve" oluyordu).
- **1.8.1** — 2026-10-03 — Şablon düzenleyicinin CRM'deki üst çubuğu: "Otomatik kaydetme açık/kapalı", "Şablonu kaydet",
  "Test E-postası", "Sürüm Geçmişini Gör", "Değişiklikleri senkronize et" (sayfa sözlüğü; çubuk tuvalin dışında). Kampanya
  düzenleyicisi açıldı: E-postalar çerçevesinin `nested` alanı (önce hazırla kuralıyla). CEO'nun tarayıcısında ölçüldü:
  oluşturucunun dosyaları hazırken vekilden açılışı 1,5 sn (GHL'in kendisi 1,7 sn); E-postalar ekranı iç içe vekil
  desteğiyle sorunsuz (hata ve başarısız istek yok). Arka plan hazırlığı tarayıcıda düşük öncelikle yavaş ilerliyor
  (takvim 3,2 MB → 38 sn) — kullanıcı görmüyor; vekilin kendisi hızlı (aynı dosyalar 1,6 sn).
- **1.8.0** — 2026-10-03 — **Önce hazırla: Türkçe ekranlar hiçbir zaman GHL'den yavaş açılmaz (CEO: "tık diye gelmesi lazım").**
  Ölçüm: vekilden açılan uygulamaların açılış dosyaları GHL'inkinden ayrı iniyor (sıkıştırılmış: e-posta oluşturucu 7,1 MB,
  E-postalar 4,8, sayfa oluşturucu 4,7, İşletme Profili 3,7, takvim 3,2, form 2,7, sohbet/ortaklık 1,3–1,5 MB; Otomasyon
  dosyalarını zaten GHL'den aldığı için ek yok). İlk açılışta e-posta oluşturucu 65 sn sürdü; dosyalar tarayıcıdayken
  2,1 sn (GHL'in kendisi 1,7 sn). Kural: `crm-config.json` `warm` listesindeki ekran ancak dosyaları bu tarayıcıda hazırsa
  vekilden (Türkçe) açılır; hazır değilse GHL'in kendi sürümü anında açılır ve dosyalar arka planda, görünmez bir çerçevede
  (vekilin `/__gai/warm` sayfası) yalnız iyi bağlantıda (mobil veri tasarrufu / 2G / 3G'de hiç), sırayla ve düşük öncelikle
  hazırlanır; CRM açıldıktan 8 sn sonra başlar, 12 saatte bir tazelenir, 7 günden eski kayıt geçersiz. Vekil: adında içerik
  özeti olan dosyalar tarayıcıda 1 yıl (`immutable`; GHL yeni sürümde adı değiştiriyor), diğerleri 1 gün. Yükleme süresi
  güvenlik ağı: çerçeve "buradayım" dediyse en çok 45 sn beklenir. Adres çevirmede hata olursa GHL adresi kullanılır.
  E-posta şablonu düzenleyicisi (`email-builder-prod`) `frames`'e eklendi: CEO'nun tarayıcısında Türkçe açıldı (Email AI
  paneli, öneriler, düğmeler), şablon içeriği olduğu gibi. Kampanya düzenleyicisi (E-postalar içinde iç içe) henüz kapalı.
- **1.7.1** — 2026-10-03 — **Güvenlik ağı büyük uygulamaları beklesin.** Şablon düzenleyici CEO'nun tarayıcısında denendi:
  oluşturucu E-postalar'ın içinde değil, CRM'in kendi sayfasında açılıyor (`/emails/create/<id>/builder`, iframe
  `email-builder`) → üst düzey `frames` listesiyle çevrilebilir (kampanya düzenleyicisi E-postalar içinde iç içe). Vekilden
  açılış başladı ama uygulama ilk açılışta 26 MB indiği için 25 sn'de bitmedi ve güvenlik ağı GHL'in kendi (İngilizce)
  sürümüne döndü (ekran bozulmadı; GHL'inki tarayıcı önbelleğinden geldiği için hızlı). Artık çerçevedeki yükleyici açılır
  açılmaz üst pencereye "buradayım" der (`gaiFrameAlive`, uygulamaya iletilmez); bu haber geldiyse vekil çalışıyor demektir,
  yükleme bitene kadar beklenir (en çok 2 dk). Haber gelmezse eskisi gibi 25 sn'de GHL'e dönülür. Vekilin kenar önbelleği
  oluşturucu dosyalarıyla dolduruldu (72 dosya, 26 MB). Düzeltme: 1.7.0 notundaki "Kampanyalar/Şablonlar GHL'de açılmıyor"
  tespiti yanlıştı — sekmeler çalışıyor; bakım aracım CRM'deki gömülü ekranların içine tıklayamıyordu.
- **1.7.0** — 2026-10-03 — **İç içe çerçeve desteği + e-posta oluşturucu kataloğu (kullanıcıya kapalı).** E-postalar
  (`crm-epostalar`) kampanya/şablon düzenlerken e-posta oluşturucuyu (`email-builder-prod`) kendi içinde postmate ile gömüyor;
  CRM'deki yükleyici oraya ulaşamıyordu. Artık çerçevedeki yükleyici de iç içe iframe'i vekile çevirebiliyor: liste
  `frames.json` → `<id>.nested` (derlemede çerçeve kataloğuna), yalnız GHL adresi → `crm-*.growtify.app` kabul; deneme için
  yalnız bir sekmede üst pencereden `{gaiNested: …}` mesajı. Oluşturucu kendi ebeveyninin adresini doğrulamıyor (postmate
  el sıkışmasındaki adresi öğreniyor) → vekilden açılan ebeveynle uyumlu. Vekil: `crm-eposta-tasarim.growtify.app`
  (dosyaları CORS vermiyor → vekilden, kenar önbelleğiyle). Katalog 3.555 metin; 3.550'si E-postalar kataloğuyla birebir
  aynı anahtarlardan (aynı mesaj dosyası), kalan 5'i "1/3 : 2/3" gibi sütun oranları (çeviri gerekmez). Tuval kişinin
  e-postası → `noDom`; öğe tür adları uygulama yüklenirken bir kez hesaplandığı için sınırlı sözlük üst araç çubuğu, kenar
  panelleri ve ipuçlarında (`domText: catalog`).
- **1.6.7** — 2026-10-03 — **Yükleyici önceliği (CEO onayı).** GHL Ajans Ayarları → White Label → Custom JS satırına
  `s.fetchPriority="high"` eklendi (başka değişiklik yok; 893 → 916 karakter). Kök neden: GHL yükleyiciyi `async` ve düşük
  öncelikli ekliyordu; ağır sayfalarda Chrome isteği 15–28 sn kuyrukta bekletiyor, o arada açılan çerçeveler İngilizce
  kalıyordu. Canlı ölçüm (sayfa doğrudan açılarak): Pano, Otomasyon, Sohbetler — kuyruk 0–3 ms; yükleyici GHL'in Custom JS'i
  eklediği anda (4–7,6 sn) iniyor, Otomasyon çerçevesi vekilden (`crm-otomasyon`) Türkçe açıldı. Kalan gecikme GHL'in kendi
  açılış sırası (Custom JS'i ayarları çektikten sonra ekliyor) — bizim tarafımızda değil.
- **1.6.6** — 2026-10-03 — **Sayfa oluşturucu kullanıcıya açık.** `frames`'e `crm-sayfa` eklendi. CEO'nun tarayıcısında denendi:
  üst çubuk (Geri, Otomatik kaydetme kapalı, Yayınla, Alan Adı Bağla), Yapay Zekaya Sor paneli, öğe ekleme paneli (Hızlı Ekle,
  Bölümler, Satırlar, Öğeler; "1 Sütun", "Başlık", "Paragraf") Türkçe; tuvaldeki sayfa (müşterinin içeriği) ve sayfa adları
  olduğu gibi; tanıda hata yok. Araç çubuğu ipuçları (`.hr-tooltip__content`) iki oluşturucuda da sınırlı sözlükte.
  Bilinen kozmetik: uygulama bazı başlıkları CSS ile kelime kelime büyütüyor ("Formlar Ve Anketler").
- **1.6.5** — 2026-10-03 — Sayfa oluşturucu öğe paleti: tanının kapsayıcı izi kartların `.gui__builder-card` olduğunu gösterdi
  → sınırlı sözlüğe eklendi. Vekil yükleyiciyi `?f=2` ile ekliyor (çerçeve önbelleği eski yükleyicide takılı kalmıştı;
  gerektiğinde bu sayı artırılır).
- **1.6.4** — 2026-10-03 — Sayfa oluşturucu: öğe paleti ("1 Column", "Headline", "Paragraph"…) açılışta bir kez hesaplanıyor →
  sınırlı sözlük yalnız araç panellerinde (öğe ekleme, ayarlar, katmanlar, yazı tipi, arka plan, SEO, açılır pencereler);
  sayfalar listesi (kişinin sayfa adları) ve tuval hariç. Bu çerçevede genel sayfa sözlüğü kullanılmıyor, yalnız uygulamanın
  kendi kataloğundan eşlemeler (`domText: catalog`).
- **1.6.3** — 2026-10-03 — Bakım: çerçeve tanısı İngilizce kalan metnin kapsayıcılarını da bildiriyor (`where`); sınırlı
  sözlük seçicisi tahminle değil kanıtla seçilsin (sayfa oluşturucunun öğe paleti için).
- **1.6.2** — 2026-10-03 — **Form / Anket / Test oluşturucu kullanıcıya açık + sayfa oluşturucu kataloğu (kapalı).**
  `frames`'e `crm-formlar` eklendi. CEO'nun tarayıcısında denendi: üst menü, sekmeler, düğmeler ve öğe paleti Türkçe (Kişisel
  Bilgiler, Ad Soyad, Telefon, E-posta, Gönder); tuvaldeki form (müşterinin kendi alanları) olduğu gibi; tanıda hata yok.
  Sayfa oluşturucu (page-builder, `crm-sayfa`) kataloğu 6.380 metin (902'si mevcut çeviriden, 8 çeviri grubu); "zekâ" →
  CRM'deki "zeka" yazımı, "Generate with AI" → "Yapay Zekayla Oluştur", şema alanlarında terim birliği (Genel puan,
  Yayın tarihi, İl/Bölge). Not: ağır sayfalar doğrudan açıldığında yükleyici kuyrukta beklediği için oluşturucu o ziyarette
  İngilizce açılabiliyordu (1.6.7'de Custom JS öncelik ayarıyla çözüldü).
- **1.6.1** — 2026-10-03 — **Oluşturucularda sınırlı sözlük (`domOnly`).** Form oluşturucunun öğe paleti ("Personal Info",
  "Full Name", "Email"…) uygulama açılışında bir kez hesaplanıyor; Türkçe katalog sonradan gelince güncellenmiyor. Sözlük artık
  yalnız izin verilen arayüz alanlarında uygulanıyor (form: sol öğe paleti + alan ayarı etiketleri), tuval yine dokunulmaz.
  Bu alanların sözlüğü uygulamanın kendi kataloğundan üretiliyor (kısa, tek anlamlı İngilizce → Türkçe).
- **1.6.0** — 2026-10-03 — **Form / Anket / Test oluşturucu kataloğu (henüz kullanıcıya kapalı) + oluşturucu koruması.**
  Oluşturucu ayrı bir uygulama (leadgen-apps-form-survey-builder), vekil `crm-formlar.growtify.app`. Katalog 1.328 metin
  (346'sı mevcut çeviriden; "Filled" → "Dolgulu", yazı tipi "Weight" → "Kalınlık" bağlam düzeltmeleri; `{{contact.email}}`
  etiketi vue-i18n biçimiyle). Uygulama "form/anket/test" kelimesini `{product}` ile cümleye ekliyor → Türkçede bu yer
  tutucuya ek takılmadı ("{Product} kaydedildi", "{product} adı"). **Yeni: `noDom`** — oluşturucularda sayfa sözlüğü
  kapalı: tuvaldeki önizleme kişinin kendi içeriği; "Email", "Submit" gibi alan adları önizlemede Türkçeleşip kaydedilen
  formla çelişmesin. Yalnız uygulamanın kendi kataloğu çevrilir. Ayrıca vekilde sayfa oluşturucu adresi hazır
  (`crm-sayfa.growtify.app` → page-builder; katalog çeviride).
- **1.5.3** — 2026-10-03 — **Kalite turu.** En çok kullanılan 25 sayfada görünen 213 Türkçe metin tek tek okundu. Düzeltmeler:
  panodaki fırsat durumu grafiğinde İngilizce kalan "abandoned" → "vazgeçildi"; Başlangıç başlığı "Başarıya giden yolda ilk
  adımları birlikte atalım"; WhatsApp açıklamasındaki "anlık ve gerçek zamanlı" tekrarı kaldırıldı; her sayfadaki sohbet
  düğmesinin ekran okuyucu etiketi "Sohbeti aç". Bu sayfalarda başka çevrilmemiş arayüz metni yok (ürün adları hariç).
- **1.5.2** — 2026-10-03 — **Satış Ortaklığı tanıtım çizimi Türkçe.** Çizimdeki altı satır (Satış Ortaklarını Davet Et,
  Tanıt ve Takip Et, Hakedişleri Otomatikleştir + açıklamaları) SVG'de harf şekli olduğu için metin olarak çevrilemiyordu;
  aynı çizimin Türkçe yazılı kopyası `public/crm/frames/assets/aff-hero.tr.svg`, vekil (`ASSET_TR`) İngilizce dosya yerine
  onu sunuyor (kopya alınamazsa ya da GHL çizimi değiştirirse İngilizcesi gelir). İlke (CEO): iskelet Türkçe; müşteri verisi,
  yapay zekâ çıktısı ve sunucudan gelen adlar olduğu gibi kalır.
- **1.5.1** — 2026-10-03 — **Yapay Zeka Stüdyosu kullanıcıya açık.** `frames`'e eklendi (crm-studyo). CEO'nun tarayıcısında
  bakım ayarıyla denendi: ana sayfa (menü, yazı animasyonu, istem kutusu, sekmeler, şablon adları), Tüm projeler, boş durum
  Türkçe; tanıda hata yok. Şablon kartındaki istem açıklamaları ekran sözlüğüne de eklendi (uygulama dosyası tarayıcı
  önbelleğinden eski haliyle gelirse de Türkçe görünsün).
- **1.5.0** — 2026-10-03 — **Yapay Zeka Stüdyosu kataloğu (henüz kullanıcıya kapalı) + daha hızlı Türkçe.** Uygulama
  (`vibe`, leadgen-vibe-ai-builder) aslında kendi metin kataloğunu kullanıyor: 790 metin (157'si mevcut çeviriden; "Margin" →
  "Dış Boşluk" bağlam düzeltmesi). Kodda sabit olanlar uygulamaya özel sözlükte: şablon adları, Yenilikler penceresi. Ana sayfa
  başlığı harf harf yazılıyor ("Let's build" + ifade) → "Hadi bir açılış sayfası oluşturalım". Şablona tıklayınca kutuya
  yazılan 12 hazır istem Türkçe (yapay zekâ siteyi Türkçe kurar): vekil, uygulama dosyasında metni değiştiriyor
  (`JS_TEXT`, yalnız Türkçe arayüzde kullanılan `crm-studyo.growtify.app`). Yükleyici: Türkçe katalog ayar dosyasını beklemeden
  isteniyor (son ayardan kalan küçük özetle); gömülü ekranlarda ayar dosyası hiç beklenmiyor.
- **1.4.1** — 2026-10-03 — **Hızlı ve bozulmaz açılış.** Ölçüm: GHL yükleyici betiğini düşük öncelikle (async) ekliyor; CRM'in
  yoğun açılışlarında betiğin ağdan gelmesi iki kez 16–20 sn sürdü, o sürede ekran İngilizce kaldı. Betik artık tarayıcı
  önbelleğinden hemen çalışıyor ve arka planda yenileniyor (`stale-while-revalidate`; yeni sürüm ~1 dk sonra, en geç bir sonraki
  açılışta yayılır). Vekil (Worker) çerçevedeki uygulamayı yükleyiciyi beklemeden açıyor: dil işareti sayfa başındaki küçük
  betikte okunup adresten siliniyor, yükleyici `async` geliyor (growtify.ai yavaşlarsa uygulama bekletilmez). `/crm/*`
  yanıtlarına ölçüm için `Timing-Allow-Origin`.
- **1.4.0** — 2026-10-03 — **Sohbet Sağlayıcıları Türkçe.** Ayarlar > Sohbet Sağlayıcıları (`conv`,
  client-app-crm-conversations) `frames` listesine eklendi, `crm-sohbet.growtify.app` vekilinden açılıyor. Uygulamanın
  bütün kataloğu 10 metin (CRM içinde, el sıkışmadan sonra yükleniyor; bakım ayarıyla vekilden açılıp toplandı). Tablodaki
  sağlayıcı türü sunucudan İngilizce geliyor ("Call") → yalnız bu uygulamada geçerli sözlük: Arama / E-posta.
  Derleme: `frames.json` içinde uygulamaya özel `text` desteği.
- **1.3.1** — 2026-10-03 — **Satış Ortaklığı terimleri Türkçe, adres çubuğu temiz.** Satış Ortaklığı Yöneticisi "Affiliate",
  "Campaign", "Payout" kelimelerini çalışırken İngilizce olarak cümleye yerleştiriyordu ("Affiliate Ağını…", "bir Campaign
  başlat"). Bu yer tutucular kaldırıldı; 348 cümle Türkçe terimlerle, ekleri doğru olacak şekilde yeniden yazıldı: satış ortağı,
  kampanya, hakediş (ödeme yöntemi yine "ödeme yöntemi"). Kampanyanın gerçek adını gösteren tek uyarıda ad korunuyor. Üst menü
  çoğul: Kampanyalar · Satış Ortakları · Hakedişler. Not: Türkçe arayüzde bu terimlerin hesap ayarlarından özelleştirilmesi
  etkisiz (doğal Türkçe için bilinçli tercih). Yükleyici: çerçevedeki uygulamalar dil işaretini (`gai_frame`) açılmadan
  adresinden siliyor ve yalnız o sekmede saklıyor; Otomasyon'un CRM adres çubuğuna yansıttığı `?gai_frame=tr` artık görünmüyor,
  aynı anda TR ve EN hesap açıkken çerçeve dili birbirini değiştirmiyor. Otomasyon: "İnceleme gerekiyor" sekmesi kesiliyordu →
  "İncelenecek". Sözlük: "Global Workflow Settings", "Close drawer" (ekran okuyucu etiketleri).
- **1.3.0** — 2026-10-03 — **Otomasyon, E-postalar ve Satış Ortaklığı Türkçe** (CEO: "çeviri işiyle ilgili her şeyi bitirene kadar
  devam… markete native Türkçe gibi çıkmamız lazım, tam white-label"). Üç ekran `frames` listesine eklendi: iş akışı listesi ve
  kurucusu (`wf`, 7.055/7.060), Pazarlama > E-postalar (`email`, 3.546/3.555), Satış Ortaklığı Yöneticisi (`aff`, 1.446/1.447).
  Yükleyici: iframe'in adresi eklendikten sonra verilse de yakalanır (otomasyon bazen önce adressiz ekliyor — ilk denemede
  tutuyor, ikincide kaçıyordu); kişi yüklenmekte olan ekrandan çıkarsa güvenlik ağı vekili bozuk saymaz. Bu bilgisayarda
  CEO'nun dil tercihine dokunmadan denendi: otomasyon üç ziyarette de vekilden açıldı, liste ve kurucu Türkçe; tanı: hata yok,
  yüklenemeyen dosya yok, ekranda İngilizce kalan metin yok (E-postalar: "Updated On/by" sözlüğe eklendi).
- **1.2.3** — 2026-10-03 — Kataloglar ve düzeltmeler (yeni ekranlar henüz `frames` listesinde değil). E-postalar (`email`, 3.555
  metin; Zamanla, Akıllı Gönderim, Dizi, geri dönme) ve Satış Ortaklığı (`aff`, 1.447 metin; satış ortağı, komisyon, ödeme, kademe)
  katalogları `public/crm/frames/`. Satış Ortaklığı tanıtımındaki GHL örnek müşteri yorumu (kişi adı + "10 dakikada kurdum, bir
  haftada ilk satış") Türkçede kişisiz, rakamsız bir ipucuyla değiştirildi (uydurma vaka/rakam kuralı). Yükleyici: TR/EN düğmesi
  üst çubuğu olmayan tam ekran sayfalarda gizlenir (iş akışı kurucusunda Kaydet'in üstüne biniyordu); "Jun 02 2026, 2:50 PM" →
  "02 Haz 2026, 14:50"; bakım için çerçeve cevabına ekranda İngilizce kalan metinler, çerçevedeki hatalar ve yüklenemeyen
  dosyalar eklendi.
- **1.2.2** — 2026-10-03 — Otomasyon hazırlığı (otomasyon ekranı henüz `frames` listesinde değil). Otomasyon uygulamasının
  kataloğu (`wf`, 7.060 metin; 8 çeviri + 1 gözden geçirme alt ajanı, ortak terim listesi: İş Akışı, Tetikleyici, Eylem, Olay,
  Eğer/Değilse, Bekle, dahil etme, Çalışma Günlükleri…) `public/crm/frames/wf.json`. Yükleyici düzeltmeleri: çerçeve dil
  işareti `gai_frame` (bazı uygulamalar adreslerini CRM'in adres çubuğuna yansıtıyor; `gai_lang` olsaydı kişinin dil seçimi
  değişirdi — denemede yaşandı, geri alındı); kancaları atlayarak eklenen iframe'ler (otomasyon `workflow-builder`) eklendiği
  anda vekile çevrilir; uygulamanın geçerli dili boşsa (CRM içinde `en_US`, metinler `en` altında) eşleştirme yedek dilden;
  güvenlik ağı yükleme süresi 25 sn. Vekil: otomasyon kod dosyaları GHL'den doğrudan (tarayıcı önbelleği), diğer
  uygulamaların dosyaları Worker kenar önbelleğinde.
- **1.2.1** — 2026-10-03 — Bakım altyapısı (kullanıcıya görünen değişiklik yok; CEO: "çeviri işiyle ilgili her şeyi bitirene
  kadar devam"). Vekile dört yeni adres (henüz `frames` listesinde değil, kullanıcıya kapalı): `crm-otomasyon`
  (Otomasyon > İş Akışları), `crm-epostalar` (Pazarlama > E-postalar), `crm-sohbet` (Sohbet Sağlayıcıları),
  `crm-ortaklik` (Satış Ortaklığı). Yükleyici: çerçeve uygulaması istenince İngilizce kataloğunu CRM'e gönderir
  (`{gaiCollect: 1}`; E-postalar ve Sohbet Sağlayıcıları metinlerini yalnız CRM içinde yüklüyor), bakım için
  çerçeveyi İngilizce açma (`sessionStorage gai_frame_lang`); katalog alınamazsa saniyede bir yerine giderek
  seyrelen yeniden deneme.
- **1.2.0** — 2026-10-03 (#154 fcf74b4 + Cloudflare `growtify-crm-frames`, CEO "bitince yayınla son haliyle") — **iframe ekranları Türkçe** (CEO: "çözümüne bak", yerel deneme "denemeyi çalıştır",
  kalıcı sürüm "evet"). GHL'in ayrı alan adında çalışan üç uygulaması Growtify vekil adresinden açılır
  (`workers/crm-frames`, Cloudflare): takvim ayarları (`calapp`, 2.830 metin: takvim/hizmet menüsü/oda/ekipman
  listeleri, tercihler, bağlı hesaplar), İşletme Profili (`crmset`, 5.578 metin; 4.961'i mevcut çeviriden, 236
  kısa eşleşme bağlamına göre gözden geçirildi → 36 düzeltme), E-posta Hizmetleri (`isv`, 1.354 metin; "LeadConnector
  Email System" → "Platformun E-posta Sistemi"). Katalog toplam **87.047** metin. Kullanıcı aynı ekranda kalır;
  yalnız iframe kaynağı değişir. CEO'nun onayıyla bu bilgisayarda yerel vekille denendi: üç ekran Türkçe, CRM ↔
  uygulama köprüsü çalışıyor. **Güvenlik ağı:** vekil sağlık yoklaması + iframe
  birkaç saniyede cevap vermezse GHL'in kendi adresine dönüş (denendi: kapalı vekilde ekran ~6 sn'de
  İngilizce açıldı); `crm-config.json` `frames` silinerek tümü kapatılır. GHL bu uygulamalarda CSP/X-Frame-
  Options göndermiyor — vekil hiçbir korumayı kaldırmıyor; çerez iletilmez/saklanmaz. **Laboratuvar:** sunucudan
  gelen parçalı açıklamalar sayfaya özel sözlükle (`dom-pages.json`, 415 parça; 160 karakter sınırı yok).
  **Diğer:** Kullanıcılar sayfası "Ajans Sahibi / Hesap - yönetici"; Profilim > Bildirimler satırları; bildirim
  akışı ("5 dakika önce", "Yeni e-posta: …"); saatler 24 saat ("15:12"), "30 dk"; çeviri avı listesinden 152
  sayfa metni + 20 kalıp kuralı. Ana katalog küçüldü: iframe katalogları ayrı dosyada (`public/crm/frames/`).
  Hâlâ İngilizce: Sohbet Sağlayıcıları (katalogunu yalnız CRM içinde yüklüyor), otomasyon kurucusu, Yapay Zeka Stüdyosu.
  Canlı doğrulama: üç vekilin `/__gai/health` yanıtı tamam; canlı CRM'de üç iframe crm-*.growtify.app'ten açıldı, Takvimler Türkçe.
  D1: `ART-growtify-ai-dev-tr-i18n-tracker-r005`.
- **1.1.0** — 2026-10-03 (#153, CEO "birleştirip yayına al") — Eksiksizlik turu (CEO: "tümünü yeniden kontrol et tek tek tamamla", "tıklamalar dahil
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
- **1.1.0** — 2026-10-01 (#146 içinde) — "Powered by" yazısı gizlendi. Canlıda doğrulandı (2026-10-03): yayındaki sayfa
  depodaki `client.client.js` ve `brand.css` ile birebir aynı (Worker sürümü 9c603dbc, 2026-10-01 14:00).
- **1.0.0** — 2026-10-01 (#146) — Türkçe, Growtify markalı ödeme sayfası (Cloudflare Worker): tutar biçimi
  `40.000,00 TL`, "Sipariş Özeti", kart içi logo tekrarı kaldırıldı. CEO canlı deneme ödemesiyle doğruladı.

### Program satın alma sayfası (panel.growtify.ai/courses/offers/*)
- **1.1.0** — 2026-10-01 (#147, #148) — kişiye özel kupon otomatik uygulanır, geri sayım (kupon bitişi).
- **1.0.0** — 2026-10-01 (#147) — teklif ödeme ekranı Türkçe: metinler, Stripe kart alanları, TR telefon, TL biçimi.

## Bakım araçları
- **GHL güncelleme takibi** (2026-10-03): `scripts/crm-i18n/watch-ghl.mjs` + GitHub Actions `crm-i18n-watch` (dosya hazır, devreye almak için GitHub `workflow` izni gerekiyor) her gün CRM kabuğunun ve 8 gömülü uygulamanın sürüm izini karşılaştırır; değişen olursa repo'da issue açar (bilgisayardan bağımsız). İzler: `scripts/crm-i18n/source/ghl-versions.json`.
- Panel: `scripts/panel-i18n/` (EN katalog dökümü → fark → çeviri → doğrulama → derleme).
- CRM: `scripts/crm-i18n/` (katalog toplama, çeviri rehberi, doğrulama, terim kontrolü, derleme).
