# Growtify.app CRM (GoHighLevel) — Turkish UI translation guide

## Context
Growtify.app is a white-labeled GoHighLevel CRM used by Turkish small-business owners and by the students
of Growtify AI's GROWT program (beginners learning to run their business with a CRM + AI). Areas in this
work: navigation and shared UI, contacts (smart lists, contact detail, custom fields, bulk actions, tasks,
notes), conversations (unified inbox: SMS, e-mail, WhatsApp, social DMs, AI replies), calendars and
appointments, opportunities (sales pipelines and stages), launchpad (getting-started screen),
notifications, media library, basic settings, login. We override the app's English vue-i18n catalogs with
Turkish key by key; every string is shown in the real UI.

You get a JSON file of `"instance::dotted.key": "English text"`. The part before `::` only says which app
bundle the string belongs to (`shell`, `conv-a`, `conv-b`, `cal-a`, `cal-b`) — keep the key exactly as is.
Key names tell you where the string is used (`...placeholder`, `...tooltip`, `...ariaLabel`, `...title`,
`...description`, `...error`, `...success`, `...toast`). Read neighbouring keys for context.

## Voice
- Natural, fluent Turkish product copy — like a well-made Turkish SaaS. Short, clear, professional but warm.
- Address the user informally with "sen" (never "siz"): "Kişiyi kaydet", "Takvimini bağla",
  "Bu işlemi geri alamazsın."
- No slang, no exclamation marks unless the source has one.

## Capitalization & punctuation
- Mirror the source: Title Case labels/buttons/tabs → Turkish Title Case ("Kişi Ekle", "Toplu İşlemler");
  sentence case → sentence case. Turkish capitals: i→İ, ı→I. Keep end punctuation and "..." vs "…" as in
  source.

## Glossary (use consistently)
Navigation: Dashboard → Pano · Launchpad → Başlangıç · Conversations → Sohbetler · Calendars → Takvimler ·
Contacts → Kişiler · Opportunities → Fırsatlar · Payments → Ödemeler · Marketing → Pazarlama ·
Automation → Otomasyon · Sites → Siteler · Memberships → Üyelikler · Media Storage/Library → Medya Kütüphanesi ·
Reputation → İtibar · Reporting → Raporlama · Settings → Ayarlar · App Marketplace → Uygulama Pazarı ·
Ask AI → Yapay Zekaya Sor · AI Agents → Yapay Zeka Ajanları
CRM objects: Contact → Kişi · Company → Şirket · Opportunity → Fırsat · Pipeline → Süreç (Sales pipeline →
Satış süreci) · Stage → Aşama · Lead → Potansiyel müşteri · Customer → Müşteri · Owner / Assigned to →
Sorumlu / Atanan · Follower → Takipçi · Tag → Etiket · Smart List → Akıllı Liste · Custom Field → Özel Alan ·
Custom Value → Özel Değer · Note → Not · Task → Görev · Due date → Son tarih · Bulk Actions → Toplu İşlemler ·
Import → İçe aktar · Export → Dışa aktar · Merge → Birleştir · Duplicate (record) → Yinelenen kayıt ·
Source → Kaynak · Status → Durum · Won/Lost/Open/Abandoned → Kazanıldı/Kaybedildi/Açık/Vazgeçildi ·
Value (opportunity) → Değer · Board view → Pano görünümü · List view → Liste görünümü
Conversations: Inbox → Gelen Kutusu · Unread → Okunmamış · Starred → Yıldızlı · All → Tümü ·
Assigned to me → Bana atanan · Unassigned → Atanmamış · Team inbox → Ekip gelen kutusu · Snooze → Ertele ·
Template → Şablon · Snippet → Hazır metin · Attachment → Ek · Call (phone, action) → Telefonla ara ·
Call (noun) → Arama · Voicemail → Sesli mesaj · DND / Do Not Disturb → Rahatsız Etmeyin ·
Mark as read/unread → Okundu/Okunmadı olarak işaretle · Reply → Yanıtla · Internal comment → Dahili not
Calendars: Appointment → Randevu · Calendar → Takvim · Event → Etkinlik · Booking → Rezervasyon ·
Availability → Müsaitlik · Time slot → Zaman aralığı · Blocked time / Block slot → Kapalı zaman ·
Reschedule → Yeniden planla · No-show → Gelmedi · Confirmed → Onaylandı · Guest → Davetli ·
Recurring → Tekrarlanan · Time zone → Saat dilimi · Today → Bugün · Week → Hafta · Month → Ay · Day → Gün
Automation & marketing: Workflow → İş akışı · Trigger → Tetikleyici · Action → Eylem · Campaign → Kampanya ·
Funnel → Satış hunisi · Website → Web sitesi · Form → Form · Survey → Anket · Trigger link → Tetikleyici bağlantı
Payments: Invoice → Fatura · Product → Ürün · Transaction → İşlem · Subscription → Abonelik · Coupon → Kupon ·
Refund → İade · Paid → Ödendi · Due → Vadesi gelen
General: Settings → Ayarlar · Profile → Profil · User → Kullanıcı · Team / Staff → Ekip / Ekip üyesi ·
Location / sub-account (GHL term) → Alt hesap (never "Konum" when it means the business account; a physical
place stays "Konum") · Agency → Ajans · Integration → Entegrasyon · Connect → Bağla · Disconnect → Bağlantıyı
kes · Search → Ara · Filter → Filtre · Sort → Sırala · Save → Kaydet · Cancel → Vazgeç (dialog) / İptal et
(cancel an appointment/subscription) · Delete → Sil · Remove → Kaldır · Edit → Düzenle · Add → Ekle ·
Create → Oluştur · Close → Kapat · Back → Geri · Next → İleri/Sonraki · Done → Tamam · Apply → Uygula ·
Reset → Sıfırla · Clear → Temizle · Upload → Yükle · Download → İndir · Copy → Kopyala · Copied → Kopyalandı ·
Learn more → Daha fazla bilgi · Something went wrong → Bir şeyler ters gitti · Try again → Tekrar dene ·
Loading... → Yükleniyor... · Email → E-posta · Phone → Telefon · Name → Ad · First/Last name → Ad/Soyad
Keep unchanged: brand and product names (Growtify, Stripe, PayPal, Google,
Facebook, Instagram, WhatsApp, Zoom, Outlook, Gmail, Twilio, Mailgun, Zapier, QuickBooks…), technical tokens
(SMS, MMS, API, URL, ID, CSV, PDF, DNS, SMTP, A2P, 10DLC), keyboard keys (Enter, Esc, Ctrl, ⌘).

## Syntax rules — CRITICAL (the validator enforces these)
1. Placeholders: keep every `{name}`, `{count}`, `{date}`… exactly (same names, same number). You may
   move them within the sentence.
2. `{'@'}` renders an "@" — keep it exactly. NEVER type a raw `@`, `{`, `}`, `|` or `$` that is not in the
   source. (Email example: "you{'@'}example.com" → "sen{'@'}ornek.com".)
3. Plurals: a `|` separates plural variants. Keep exactly the same number of variants in the same order:
   "No posts | 1 post | {count} posts" → "Gönderi yok | 1 gönderi | {count} gönderi"
   (Turkish nouns stay singular after numbers).
4. English plural endings: placeholders like `{s}` or `{plural}` glued to a word ("result{s}",
   "day{plural}") add an English "s" — DROP them in Turkish: "{count} result{s}" → "{count} sonuç".
5. Leading/trailing spaces: preserve them exactly — these are fragments concatenated in code
   (' / month' → ' / ay', ' + tax' → ' + vergi').
6. Fragments: some sentences are built from parts around a dynamic value (e.g. `descriptionStart` +
   SUBSCRIPTION NAME + `descriptionEnd`, or prefix + NAME). Look at the sibling keys, imagine the full
   concatenated sentence, and make the Turkish read naturally — restructure if needed, e.g.
   start "Are you sure you want to cancel " + NAME + " subscription?" →
   start "Şu aboneliği iptal etmek istediğine emin misin: " + NAME + end "?"
7. Do not attach Turkish case suffixes directly to a placeholder ("{name}'in", "{group}'a",
   "{count}'den") — vowel harmony can't be known in advance. Rephrase instead:
   "{name}'s profile" → "{name} profili" or "Profil: {name}"; "Welcome to {group}" → "{group} topluluğuna
   hoş geldin" is fine (suffix is on "topluluk", not on the placeholder).
8. HTML: some strings contain HTML tags (`<a href=…>`, `<span class=…>`, `<br />`, `<img src="{src}" …>`).
   Keep every tag and attribute exactly; translate only the text between tags.
9. Single words that are English UI labels must be translated even if short ("All" → "Tümü",
   "New" → "Yeni", "Status" → "Durum", "Role" → "Rol").
10. Screen-reader labels (`aria…`): natural descriptive Turkish ("Profil menüsünü aç").

## Output — work in as few steps as possible
1. Read this guide once and the whole input file once.
2. Write ONE flat JSON object with every input key (same keys, same order) → Turkish, with a single Write.
3. Validate: `node ../cat/validate.mjs batches/cNN.en.json batches/cNN.tr.json` (run from the `crm` folder).
4. Fix every ERROR (rewrite the file once if needed) and fix WARNINGs that are real problems
   (untranslated text, English words left over, suffix on a placeholder). Leave intentional ones (brand names,
   technical tokens). Do not re-read files you already have; keep tool calls to a minimum.

## Decisions already made in earlier batches (follow them)
- Product names stay in English: Conversation AI, Voice AI, Calendar AI, LC Phone, LC Email, Content AI,
  Agent Studio, Workflow AI. Snapshot → "Hesap Şablonu".
- "widget" stays "widget" (widget'ı, widget'lar). Social Planner → "Sosyal Planlayıcı".
  Attribution → "İlişkilendirme". Round robin → "Dönüşümlü Atama". Campaign steps ("events" inside a
  campaign: SMS, wait, call) → "Adım". Activity → "Aktivite" (Etkinlik = calendar Event).
  Prompt (AI) → "İstem". Review (reputation) → "Değerlendirme". Comment (social) → "Yorum".
- DND labels: "Rahatsız Etmeyin: SMS" / "Rahatsız Etmeyin: E-posta".
- "Discard changes" → "Değişiklikleri at". Dialog Cancel → "Vazgeç"; cancelling a thing → "İptal et".
- Words the user must type literally (confirm, CONFIRM, REMOVE, DELETE), SMS keywords (STOP, START…),
  raw codes/identifiers (`page-visit`, `appointment_v3`, `audit-location`), date-format tokens
  (`DD-MMM-YYYY`, `hh:mm A`), API field names and paths: keep exactly as in English.
- Country and US-state names: keep in English (dropdowns may store the label as data).
- Sentence pieces joined around a value: "of" → "/", "to" (ranges) → "-", "Gösterilen 1 - 10 / 50".
- vue-i18n drops a "%" written directly before "{": write "Yüzde {percent}" or "{percent}%", never "%{x}".
- A raw "@" breaks compilation: e-mail examples use {'@'} or are reworded ("E-posta adresini gir").
- Placeholders holding object labels ({contact}, {opportunities}, {objectLabel}…) are lowercase nouns:
  never start a sentence with them and never attach a suffix to them ("Yeni {opportunity} ekle",
  "Tüm {opportunities} içinde ara").
- More terms fixed by later batches: App Marketplace (nav) → "Uygulama Pazarı", any other Marketplace →
  "Pazar Yeri". Promo → "Kampanya" (promo names such as "Summer of AI" stay English). Intent (AI) → "Niyet".
  Knowledge Base → "Bilgi Bankası", FAQ → "SSS", Web crawler → "Web Tarama". Transcript → "Transkript",
  transcription (speech→text) → "Metne dönüştürme", Recording → "Ses kaydı". Disclaimer/disclosure →
  "Bilgilendirme metni" (AI disclaimer → "Yapay zeka bilgilendirmesi"; "Bildirim" = Notification). Follow-up → "Takip". Legacy → "Eski Sürüm".
  Affiliate → "Satış Ortağı", Referral → "Referans". Human handover/escalation → "devretme"; call transfer →
  "aktarma". Phone call → "arama"; LLM/API call → "çağrı". Appointment Booking → "Randevu Oluşturma";
  booking page/link → "rezervasyon sayfası/bağlantısı"; slot → "zaman aralığı". Prompt Optimizer →
  "İstem Optimizasyonu". Testimonial → "Müşteri görüşü" ("Referans" = referral). Clone/Duplicate (make a copy of
  an item) → "Çoğalt" (Çoğaltıldı, çoğaltılıyor; the copy's name "{name} - Kopya"); "Kopyala" is ONLY copy to
  clipboard ("Kopyalandı"; never "Panoya kopyalandı" — Pano = Dashboard); voice cloning → "klonlama". Seconds unit "s" → "sn". "Explore X" buttons → "X ile Tanış".
- Text that a bot/agent says to the business's own customers (sample greetings, scripts) uses polite "siz";
  all UI text addressed to the user keeps "sen".
- White-label product: users see "Growtify.app", never the vendor. In running text do not name HighLevel,
  GHL or LeadConnector — say "platform" or reword ("destek ekibiyle iletişime geç"). Keep vendor names only
  inside URLs, code/identifiers, fixed product names (LC Phone, LC Email), or where the user must find
  that exact name elsewhere (e.g. the "LeadConnector" mobile app in the app stores).

## Round 2 bundles (2026-10-03 clicking tour)
- `phone` = Phone System settings (LC Phone): buying and porting numbers, number pools, call/SMS settings,
  IVR / voice navigation, WhatsApp Business setup, A2P / Trust Center regulatory registration, SIP.
  Terms: Phone number → Telefon numarası · Number pool → Numara havuzu · Port in (a number) → Numara taşıma ·
  Toll-free → Ücretsiz numara · Short code → Kısa kod · Caller ID → Arayan kimliği · Call forwarding → Çağrı
  yönlendirme · Call recording → Arama kaydı · Inbound/Outbound → Gelen/Giden · Voicemail → Sesli mesaj ·
  IVR → IVR (sesli yanıt menüsü) · Whisper message → Fısıltı mesajı · Missed call text-back → Cevapsız arama
  SMS'i · Trust Center → Güven Merkezi · Brand / Campaign registration (A2P) → Marka / Kampanya kaydı ·
  Business profile → İşletme profili · Opt-in → İzin verme · Opt-out → Abonelikten çıkma (the existing catalogs use this; never "izinden çıkma") · Compliance →
  Uyumluluk · WhatsApp Business Account (WABA) → WhatsApp Business Hesabı (WABA) · WhatsApp message template →
  Şablon · Quality rating → Kalite puanı · Messaging limit → Mesaj limiti · Suspension appeal → Askıya alma
  itirazı. Keep US regulatory names and acronyms (A2P 10DLC, TCPA, CTIA, EIN, CNAM, STIR/SHAKEN, SIP, E.164,
  ISV) and carrier/vendor names as they are; legal entity types (LLC, Sole Proprietor…) may be translated with
  the English in parentheses when the user must pick the official type.
- `calsched` = Calendar settings app: availability schedules (work hours, date-specific hours), calendar
  preferences, troubleshooting why slots don't show, staff, rooms and equipment (resources), service menus,
  notifications, onboarding. Terms: Schedule (availability) → Çalışma programı (short: Program) · Work Hours
  → Çalışma Saatleri · Date specific hours → Tarihe özel saatler · Service menu → Hizmet menüsü · Rooms →
  Odalar · Equipment → Ekipman · Resources → Kaynaklar · Staff → Ekip üyeleri · Buffer → Ara süre ·
  Minimum scheduling notice → Minimum planlama süresi · Slot interval → Zaman aralığı sıklığı · Add-ons →
  Ek hizmetler.

## Round 3 — shell sections GHL loads only when a page opens (2026-10-03)
Keys start with `shell::<section>.`; the section tells you the screen:
- `adPublishingApp` = Ad Manager (create and report Facebook/Instagram, Google, LinkedIn ads). Terms: Ad
  Manager → Reklam Yöneticisi · Ad account → Reklam hesabı · Campaign → Kampanya · Ad set → Reklam seti ·
  Ad → Reklam · Objective → Kampanya hedefi · Audience → Hedef kitle · Lookalike → Benzer hedef kitle ·
  Placement → Yerleşim · Budget → Bütçe · Daily/Lifetime budget → Günlük/Toplam bütçe · Bid (strategy) →
  Teklif (stratejisi) · Creative → Reklam görseli · Headline → Başlık · Primary text → Ana metin · Call to
  action → Harekete geçirici ifade · Impressions → Gösterim · Reach → Erişim · Clicks → Tıklama ·
  Conversions → Dönüşüm · Cost per result → Sonuç başına maliyet · Pixel → Piksel · Lead form → Potansiyel
  müşteri formu · Boost → Öne çıkar. Keep metric acronyms (CTR, CPC, CPM, ROAS) as they are.
- `yext` = Listings: the business's profile on online directories via Yext. Listing → Listeleme ·
  Directory / Publisher → Dizin / Yayıncı · Duplicate listing → Yinelenen listeleme · Suppress (a duplicate)
  → Bastır · Sync → Eşitle · Business information → İşletme bilgileri.
- `calendarServicesApp` = Services / service menu (v2) and `calendarRentalsApp` = rentals (booking rooms,
  equipment, rentable items). Service → Hizmet · Service menu → Hizmet menüsü · Rental → Kiralama ·
  Rentable item → Kiralanabilir öğe · Check-in / Check-out → Giriş / Çıkış · Inventory → Stok.
- `clientPortalBuilder` = Client Portal settings (branding, apps shown to members, chat widget, e-mail
  notifications for groups/communities/courses). Client portal → Müşteri portalı · Magic link → Sihirli
  bağlantı · Group → Grup · Member → Üye.
- `agency`, `reselling`, `domainResellingApp`, `saas`, `snapshots`, `aiProductRebilling`, `suspendModal`,
  `switchyard` = agency-level administration (sub-accounts, SaaS plans, reselling products and domains,
  rebilling usage to clients). Agency → Ajans · Sub-account → Alt hesap · Snapshot → Hesap Şablonu ·
  Rebilling → Yeniden faturalandırma · Markup → Kâr payı · Reseller → Bayi · Domain → Alan adı ·
  Registrar → Alan adı kayıt firması · Renewal → Yenileme. Keep WHOIS, DNS, SSL, A/CNAME/TXT record names.
- `templateLibraryApp` = template library · `estimatesApp` = Estimates (Estimate → Fiyat Teklifi) ·
  `goKollabApp` = GoKollab marketplace (keep "GoKollab") · `communitiesApp` = Communities (Topluluklar) ·
  `prospecting` = prospecting tool (Prospect → Potansiyel müşteri adayı) · `fpDebugger` = affiliate
  tracking debugger · `a2p`, `cnam`, `shakenStir`, `regulatoryBundle` = phone regulatory compliance.

- Values that are SUBMITTED to US carriers / registries (pre-filled A2P campaign texts such as auto-generated
  consent descriptions) stay in English; placeholders and help text around them are translated.

## Round 4 — `calapp` (2026-10-03)
`calapp` = GHL's legacy calendar settings app that opens inside Settings → Calendars (calendar list, groups,
service menus, rooms, equipment, calendar create/edit wizard, availability, notifications, booking widget,
appointment modal, activity log, SMS/e-mail/WhatsApp templates, tours, quick tips, aria labels). Keep every term
consistent with `cal-a` / `calsched` (Appointment → Randevu, Calendar → Takvim, Group → Grup, Service menu →
Hizmet menüsü, Room → Oda, Equipment → Ekipman, Availability → Müsaitlik, Buffer → Ara süre, Round robin →
Dönüşümlü Atama, Booking → Rezervasyon, Staff/Team member → Ekip üyesi, Slot → Zaman aralığı, Widget → widget,
Event (calendar type) → Etkinlik, Class booking → Grup dersi rezervasyonu, Collective booking → Ortak rezervasyon,
Date updated → Güncellenme tarihi). Messages with `{name}` placeholders are interpolated by our loader, so keep
placeholders exactly as usual.

## Round 5 — `crmset` + `isv` (2026-10-03)
`crmset` = GHL's settings app that renders Settings → Business Profile (also users/permissions, agency settings,
API keys, SSO, audit logs, custom menu links, calling schedule, marketplace). `isv` = the Email Services app
(Settings → Email Services). Both open in an iframe served through `workers/crm-frames`.
- crmset: location/account meaning the sub-account → Alt Hesap; business-niche dropdown options use the
  `shell::brandBoardsApp.builder.businessTypes.*` wording; audit-log actions are nouns/past forms (Birleştirme,
  Geri Yüklendi, Kuruldu); "Check" → Kontrol et (never "Çek"); "10 sn" lowercase.
- isv: bounce → geri dönme (Geri dönme oranı — never "Hemen çıkma", that is web analytics); warm-up → Isıtma as a
  feature/action ("Alan Adı Isıtma"), "ısınma sürecinde" as a state; dedicated domain → ayrılmış alan adı
  (sidebar "Ayrılmış Alan Adları"; "Özel Alan Adı" is Custom Domain); dedicated IP → özel IP; shared domain/IP →
  paylaşımlı alan adı/IP; sending domain → gönderim alan adı; deliverability → teslim edilebilirlik; sender
  reputation → gönderici itibarı; Postmaster Tools → Postmaster Araçları; Blacklist Monitor → Kara Liste İzleme;
  Hostname → Host Adı. White-label: "LeadConnector Email System/Service" → "platformun e-posta sistemi/hizmeti";
  "LC Email" stays as the product name; DNS values (`spf.leadconnectorhq.com`) untouched; example domains →
  ornek.com / alanadin.com.
