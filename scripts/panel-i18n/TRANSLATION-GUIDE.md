# Panel (GHL Client Portal) — Turkish UI translation guide

## Context
Growtify AI's student panel (panel.growtify.ai) is a white-labeled GoHighLevel "Client Portal" app:
communities (posts, comments, channels, members, leaderboard), courses (lessons, quizzes, assignments,
certificates), chat, events/live sessions, appointments, announcements, notifications, account settings,
billing (subscriptions, invoices, estimates, contracts, payments), affiliates, file manager, and admin-only
group settings. The app has no Turkish locale, so we override its English vue-i18n catalog with Turkish,
key by key. Every string you translate will be shown in the real UI to Turkish-speaking students
(entrepreneurs in the GROWT AI program) and to the admin team.

You get a JSON file of `"dotted.key": "English text"`. Key names tell you where the string is used
(e.g. `courses.filters.sortLabel`, `auth.validation.passwordWeak`, `...ariaLabel` = screen-reader label,
`...placeholder` = input placeholder, `...title`/`...description` = empty-state or dialog copy,
`...toast`/`...success`/`...error` = notifications). Read neighbouring keys to understand the context.

## Voice
- Natural, fluent Turkish UI copy — not word-for-word. Short and clear like a well-made Turkish app.
- Address the user informally with "sen" (never "siz"): "Şifreni gir", "Hesabına giriş yap",
  "Biri gönderini beğendiğinde", "Bu işlemi geri alamazsın."
- Warm but not cutesy. No slang. No exclamation marks unless the source has one.

## Capitalization & punctuation
- Mirror the source style. Title Case source (buttons, menu items, tab and dialog titles)
  → Turkish Title Case ("Gönderi Oluştur", "Hesap Ayarları", "Kursa Başla").
  Sentence case source → sentence case ("Tümünü okundu olarak işaretle").
- Turkish capitals: i→İ, ı→I ("İptal", "İndir", "İleri", "İLERİ").
- Keep end punctuation as in source (no period added/removed). Keep "..." vs "…" as in source.

## Glossary (use these — the existing panel already uses them)
Navigation / places: Dashboard → Pano · Memberships → Üyelikler · Business & Operations → İşletme ve
Operasyonlar · Client Portal → Panel · Home → Ana Sayfa · About → Hakkında · Overview → Genel Bakış ·
Discover → Keşfet · Feed → Akış · Library → Kütüphane · Settings → Ayarlar · Account → Hesap ·
Account Settings → Hesap Ayarları · Profile → Profil · Preferences → Tercihler

Community: Community/Communities → Topluluk/Topluluklar · Group → Grup · Private group → Özel grup ·
Public group → Herkese açık grup · Channel → Kanal · Post → Gönderi · All Posts → Tüm Gönderiler ·
Create Post → Gönderi Oluştur · Comment → Yorum · Reply → Yanıtla (action) / Yanıt (noun) ·
Like → Beğen · Likes → Beğeniler · Share → Paylaş · Pin → Sabitle · Unpin → Sabitlemeyi Kaldır ·
Pinned → Sabitlenen/Sabitlendi · Mention → Bahsetme ("@mention" → "{'@'}bahsetme", "@everyone" →
"{'@'}herkes") · Poll → Anket · Vote → Oy ver · Draft → Taslak · Schedule → Planla ·
Scheduled → Planlandı · Publish → Yayınla · Report (a post) → Bildir · Member → Üye ·
Admin → Yönetici · Owner → Sahip · Moderator → Moderatör · Contributor → Katkıda Bulunan ·
Invite → Davet et · Join → Katıl · Leave → Ayrıl · Join request → Katılım isteği · Approve → Onayla ·
Decline/Reject → Reddet · Ban → Yasakla (Banned → Yasaklanan) · Block (user) → Engelle ·
Blocked Users → Engellenen Kullanıcılar · Follow → Takip Et · Following → Takip Ediliyor ·
Followers → Takipçiler · Leaderboard → Liderlik Tablosu · Points → Puan · Level → Seviye ·
Rewards → Ödüller · Gamification → Oyunlaştırma · Streak → Seri · Badge → Rozet ·
Certificate → Sertifika · Content moderation → İçerik Denetimi · Branding → Marka ·
Appearance → Görünüm · Theme → Tema · Dark mode → Koyu mod · Light mode → Açık mod

Courses: Course → Kurs · Lesson → Ders · Category → Kategori · Module → Modül ·
Product (course product) → Kurs (but in billing contexts → Ürün) · Offer (course checkout offer) → Teklif ·
Instructor → Eğitmen · Assignment → Ödev · Assessment → Değerlendirme · Quiz → Quiz ·
Submission → Teslim · Submit → Gönder · Mark as complete → Tamamlandı Olarak İşaretle ·
Completed → Tamamlandı · In progress → Devam Ediyor · Not started → Başlanmadı · Progress → İlerleme ·
Enrolled → Kayıtlı · Start Course → Kursa Başla · Continue → Devam Et · Locked → Kilitli ·
Drip / unlocks on → … tarihinde açılır

Events & time: Event → Etkinlik · Live session → Canlı oturum · Go Live → Yayına Geç ·
Meeting → Toplantı · Attendees → Katılımcılar · Appointment → Randevu · Book Appointment → Randevu Al ·
Reschedule → Yeniden planla · Upcoming → Yaklaşan · Past → Geçmiş · Today → Bugün ·
Time zone → Saat dilimi · "{time} ago" → "{time} önce" · min → dk · hr/h → sa ·
month names / weekday names → Turkish (Ocak…, Pazartesi…)

Messaging: Announcement → Duyuru · Notification → Bildirim · Push notifications → Push Bildirimleri ·
Email notifications → E-posta Bildirimleri · Chat / Conversation → Sohbet · Message → Mesaj

Auth: Sign in / Log in → Giriş Yap · Sign up → Kayıt Ol · Log out → Çıkış Yap · Password → Şifre ·
Email → E-posta · Secure code / OTP → Güvenlik kodu · Forgot password → Şifremi unuttum ·
Reset password → Şifreyi Sıfırla · Verify → Doğrula · Full name → Ad soyad

Actions: Search → Ara · Filter → Filtre · Sort by → Sırala · Newest → En yeni · Oldest → En eski ·
Default → Varsayılan · Recommended → Önerilen · Upload → Yükle · Download → İndir · Save → Kaydet ·
Cancel → Vazgeç · Delete → Sil · Remove → Kaldır · Edit → Düzenle · Confirm → Onayla · Close → Kapat ·
Back → Geri · Next → İleri (step navigation) / Sonraki (next item) · Previous → Önceki · Done → Tamam ·
Apply → Uygula · Reset → Sıfırla · Clear → Temizle · Copy link → Bağlantıyı Kopyala · Link → Bağlantı ·
See all → Tümünü gör · Show more → Daha fazla göster · Load more → Daha fazla yükle ·
Learn more → Daha fazla bilgi · Try again → Tekrar dene · Something went wrong → Bir şeyler ters gitti

Billing & affiliates: Subscription → Abonelik · Billing → Faturalandırma · Invoice → Fatura ·
Estimate → Fiyat Teklifi · Contract → Sözleşme · Payment → Ödeme · Payment method → Ödeme yöntemi ·
Checkout → Ödeme · Coupon → Kupon · Discount → İndirim · Tax → Vergi · Subtotal → Ara toplam ·
Total → Toplam · Due date → Son ödeme tarihi · Paid → Ödendi · Unpaid → Ödenmedi · Overdue → Gecikmiş ·
Refund → İade · Affiliate program → Satış Ortaklığı Programı · Affiliate (person) → Satış ortağı ·
Commission → Komisyon · Referral → Yönlendirme · Payout → Hakediş ödemesi · Earnings → Kazanç ·
Campaign → Kampanya · Lead → Potansiyel müşteri · Analytics → Analitik · Engagement → Etkileşim ·
Views → Görüntülenme · File manager → Dosya Yöneticisi · Folder → Klasör · File → Dosya

Keep unchanged: brand and product names (GoKollab, HighLevel, Growtify, Stripe, PayPal, Google, Zoom,
Skool, Apple, Facebook, Instagram, LinkedIn, YouTube, TikTok, WhatsApp…), file types and tech tokens
(GIF, PDF, CSV, PNG, URL, API, ID, SMS, OTP), units (MB, KB).

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
8. Single words that are English UI labels must be translated even if short ("All" → "Tümü",
   "New" → "Yeni", "Status" → "Durum", "Role" → "Rol").
9. Screen-reader labels (`aria…`): natural descriptive Turkish ("Profil menüsünü aç").

## Output
Write ONE flat JSON object (`"dotted.key": "Türkçe"`) with every key from the input file, same order.
UTF-8, valid JSON, nothing else. Then validate and iterate until there are 0 ERRORS:

    node scripts/panel-i18n/validate.mjs /tmp/panel-todo.en.json /tmp/panel-todo.tr.json

Review every WARNING: fix real problems (untranslated text, English words left over, suffix on a
placeholder). Leave intentional ones (brand names, "GIF", "Quiz").
