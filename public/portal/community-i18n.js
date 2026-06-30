(function () {
  try {
    /* ===== EN GUARD (tek eklenen blok) — EN grupta TR çeviriyi atlar ===== */
    var EN_GROUP_SLUGS = ["en-growtify-ai"];
    function isEnglishContext() {
      var p = location.pathname;
      var m = p.match(/\/communities\/groups\/([^\/?#]+)/);
      if (m && EN_GROUP_SLUGS.indexOf(m[1]) !== -1) return true;
      var r = location.href.match(/[?&]redirectUrl=([^&]+)/);
      if (r) {
        try {
          var d = decodeURIComponent(r[1]);
          for (var gi = 0; gi < EN_GROUP_SLUGS.length; gi++) {
            if (d.indexOf(EN_GROUP_SLUGS[gi]) !== -1) return true;
          }
        } catch (e) {}
      }
      return false;
    }
    /* ===== /EN GUARD ===== */

    if (!isEnglishContext() && !document.getElementById("__tr_placeholder_css")) {
      const __style = document.createElement("style");
      __style.id = "__tr_placeholder_css";
      __style.textContent = `
.ProseMirror p[data-placeholder="Write a comment..."]::before,
.ProseMirror p[data-placeholder="Write a comment.."]::before,
.ProseMirror p[data-placeholder="Write a comment"]::before {
  content: "Yorum yaz..." !important;
}
.ProseMirror p[data-placeholder="What's on your mind"]::before {
  content: "Aklında ne var" !important;
}
.ProseMirror p[data-placeholder="Type your comment here..."]::before,
.ProseMirror p[data-placeholder="Type your comment here.."]::before {
  content: "Yorumunu buraya yaz..." !important;
}
.ProseMirror p[data-placeholder="Type your answer"]::before {
  content: "Cevabını yaz" !important;
}
.ProseMirror p[data-placeholder="Write here..."]::before,
.ProseMirror p[data-placeholder="Write here.."]::before,
.ProseMirror p[data-placeholder="Write here"]::before {
  content: "Buraya yaz..." !important;
}
`;
      document.head.appendChild(__style);
    }

    const translations = {
      // LOGIN / AUTH
      "Welcome Back": "Tekrar Hoş Geldin",
      "Welcome back": "Tekrar hoş geldin",
      "Sign In": "Giriş Yap",
      "Sign in": "Giriş Yap",
      "Sign in to your account": "Hesabına giriş yap",
      "Log In": "Giriş Yap",
      "Log in": "Giriş Yap",
      Login: "Giriş",
      Email: "E-posta",
      "Email Address": "E-posta Adresi",
      Password: "Şifre",
      "Full Name": "Ad Soyad",
      "Enter your email": "E-posta adresini gir",
      "Enter your password": "Şifreni gir",
      "Remember Me": "Beni Hatırla",
      "Remember me": "Beni hatırla",
      "Create an Account": "Hesap Oluştur",
      "Sign Up": "Kayıt Ol",
      "Sign up": "Kayıt Ol",
      "Don't have an account?": "Hesabın yok mu?",
      "Please enter your name": "Lütfen adını gir",
      "Please enter your email": "Lütfen e-posta adresini gir",
      "Please enter your password": "Lütfen şifreni gir",
      "Please enter a valid mail": "Lütfen geçerli bir e-posta gir",
      "Please enter a valid email": "Lütfen geçerli bir e-posta gir",
      "Password must be at least 8 characters": "Şifre en az 8 karakter olmalı",
      "Invalid credentials": "Hatalı bilgiler",
      "Invalid email or password": "Hatalı e-posta veya şifre",
      "Show Password": "Şifreyi Göster",
      "Hide Password": "Şifreyi Gizle",
      "Loading...": "Yükleniyor...",
      "Please wait": "Lütfen bekle",

      // OTP / 2FA
      "Enter OTP": "Kodu Gir",
      "Secure code": "Güvenlik Kodu",
      "Verify secure code": "Güvenlik Kodunu Doğrula",
      "Generate secure code": "Güvenlik kodu gönder",
      "Reach out to business.": "Destek ile iletişime geç.",
      "Reach out to business": "Destek ile iletişime geç",

      // SET PASSWORD
      "Set new password": "Yeni şifre belirle",
      "Set Password": "Şifreyi Belirle",
      "New Password": "Yeni Şifre",

      // PANEL / COURSES
      "All Courses": "Tüm Kurslar",
      "My Courses": "Kurslarım",
      "In Library": "Aktif Eğitim",
      "In library": "Aktif Eğitim",
      Course: "Kurs",
      Courses: "Kurslar",
      Lessons: "Dersler",
      Lesson: "Ders",
      Progress: "İlerleme",
      Continue: "Devam Et",
      Start: "Başla",
      Complete: "Tamamlandı",
      "In Progress": "Devam Ediyor",
      "Not Started": "Başlanmadı",
      Learning: "Öğrenme",
      Discussion: "Sohbet",
      About: "Hakkında",
      "Take a course": "Bir kursa başla",
      "Course Progress": "Kurs İlerlemesi",
      "Continue Course": "Kursa Devam Et",
      "Hi,": "Merhaba,",
      "Start Course": "Kursa Başla",
      "Start assignment": "Ödeve Başla",
      Instructor: "Eğitmen",
      "Instructor Name": "Eğitmen Adı",
      "Instructor only": "Sadece eğitmen",
      Instructions: "Talimatlar",
      "Course Contents": "Kurs İçerikleri",
      "Previous Category": "Önceki Kategori",
      "Next Category": "Sonraki Kategori",
      Comments: "Yorumlar",
      Comment: "Yorum",
      Cancel: "Vazgeç",
      Answer: "Cevap",
      "Upload Assignment": "Ödev Yükle",
      Upload: "Yükle",
      Submit: "Gönder",
      Submitted: "Gönderilen",
      Completed: "Tamamlandı",
      Assessment: "Değerlendirme",
      Assignment: "Ödev",
      Instructor: "Eğitmen",
      "Back to lesson": "Derse Dön",
      "Next lesson": "Sonraki Ders",
      "Mark as Complete": "Tamamlandı Olarak İşaretle",
      "Mark As Complete": "Tamamlandı Olarak İşaretle",
      "Mark As Tamamlandı": "Tamamlandı Olarak İşaretle",
      "Mark as Tamamlandı": "Tamamlandı Olarak İşaretle",

      // COMMUNITY / PROFILE
      Public: "Herkese Açık",
      Products: "Kurslar",
      Communities: "Topluluklar",
      Community: "Topluluk",
      Conversations: "Sohbetler",
      Conversation: "Sohbet",
      Notifications: "Bildirimler",
      Read: "Okundu",
      Unread: "Okunmadı",
      "Mark all as read": "Tümünü okundu olarak işaretle",
      Home: "Ana Sayfa",
      Members: "Üye",
      members: "üye",
      Posts: "Gönderiler",
      Admin: "Yönetici",
      Search: "Ara",
      Chat: "Sohbet",
      Confirm: "Onayla",
      Free: "Ücretsiz",
      Back: "Geri",
      "Posting in": "paylaşıyor:",
      "Owned by": "Sahibi:",
      "Enable Comments": "Yorumları Aç",
      "Enable Yorumlar": "Yorumları Aç",
      "Publish Post": "Gönderiyi Yayınla",
      "Publish Gönderi": "Gönderiyi Yayınla",
      "Report Post": "Gönderiyi Bildir",
      "Copy Link": "Bağlantıyı Kopyala",
      "Invite Members": "Üye Davet Et",
      "INVITE MEMBERS": "ÜYE DAVET ET",
      "Public Group": "Herkese Açık Grup",
      "Add Attachment": "Dosya Ekle",
      "Add Link": "Bağlantı Ekle",
      "Add Video": "Video Ekle",
      "Add video": "Video Ekle",
      "Add image": "Görsel Ekle",
      "Add GIF": "GIF Ekle",
      "Add emoji": "Emoji Ekle",
      "Add imoji": "Emoji Ekle",
      "No Likes": "Beğeni yok",
      Open: "Kursa Başla",
      OPEN: "KURSA BAŞLA",
      "Tag channels, events and courses": "Kanal, etkinlik ve kurs etiketle",
      "You have unsaved changes": "Kaydedilmemiş değişikliklerin var",
      "Please fill the worksheet(s) and upload the assignment":
        "Lütfen çalışma kağıtlarını doldur ve ödevi yükle",
      "Click or drag a file to this area to upload":
        "Yüklemek için bir dosyayı bu alana tıkla veya sürükle",
      "Type your answer": "Cevabını yaz",
      "This Lesson is locked": "Bu ders kilitli",
      "This Ders is locked": "Bu ders kilitli",
      "Search courses, categories and lessons": "Kurs, kategori ve ders ara",
      "No notifications yet": "Henüz bildirim yok",
      "What is your title?": "Başlık ne?",
      "What is your title": "Başlık ne",
      "Deleted User": "Silinmiş Kullanıcı",
      Reply: "Yanıtla",
      Active: "Aktif",
      PROFILE: "PROFİL",
      FOLLOWING: "TAKİP EDİLİYOR",
      Profile: "Profil",
      Following: "Takip Ediliyor",
      Follow: "Takip Et",
      Followers: "Takipçiler",
      Contributions: "Katkılar",
      "Contributions for:": "Katkılar:",
      VIEW: "GÖRÜNTÜLE",
      View: "Görüntüle",
      "Check your email": "E-postanı kontrol et",
      "Reset Password": "Şifre Sıfırla",
      "Full name": "Ad soyad",
      // — added 2026-06-02 (canlı portal taraması): eksik UI string'leri —
      "Add Channel": "Kanal Ekle",
      "Go Live": "Yayına Geç",
      "Settings": "Ayarlar",
      "SETTINGS": "AYARLAR",
      "Update": "Güncelle",
      "Member": "Üye",
      "Create Post": "Gönderi Oluştur",
      "Like content": "İçeriği Beğen",
      "Post Actions": "Gönderi Seçenekleri",
      "Post Avatar": "Gönderi Avatarı",
      "Chats": "Sohbetler",
      "App Switcher": "Uygulamalar",
      "Tab Switcher": "Sekmeler",
      "User Avatar": "Kullanıcı Avatarı",
    };

    const phrases = [
      // — added 2026-06-28 (CEO mobil portal taraması): eksik portal/ayarlar/bildirim string'leri.
      //   phrases dict'ten ÖNCE çalışır → İngilizce orijinali yakala, kelime-dict mangle'ını pre-empt et.
      //   NOT: /courses/ kurs-oynatıcı string'leri loader o sayfaya enjekte olmadığı için HENÜZ
      //   çevrilmez (GHL admin gerek); buradaki entry'ler loader gelince otomatik çalışır.
      // Portal home / app switcher
      { pattern: /^Select Your App$/i, replacement: "Uygulamanı Seç" },
      { pattern: /Engage in community/gi, replacement: "Toplulukta etkileşime geç" },
      { pattern: /Explore available courses/gi, replacement: "Mevcut kursları keşfet" },
      { pattern: /Explore Here/gi, replacement: "Buradan Keşfet" },
      { pattern: /^Hello$/i, replacement: "Merhaba" },
      { pattern: /^All courses$/i, replacement: "Tüm Kurslar" },
      // Kurs oynatıcı (/courses/ loader gelince çalışır)
      { pattern: /^Overview$/i, replacement: "Genel Bakış" },
      { pattern: /^Start Learning$/i, replacement: "Öğrenmeye Başla" },
      { pattern: /^Resume Learning$/i, replacement: "Öğrenmeye Devam Et" },
      { pattern: /^Syllabus$/i, replacement: "Müfredat" },
      { pattern: /^Curriculum$/i, replacement: "Ders İçeriği" },
      // Kurs genel-bakış sayfası (mobil /categories) — bölüm başlığı İngilizce kalıyordu
      { pattern: /^Categories$/i, replacement: "Kategoriler" },
      { pattern: /^Category$/i, replacement: "Kategori" },
      { pattern: /Expand All Sections/gi, replacement: "Tüm Bölümleri Genişlet" },
      { pattern: /Collapse All Sections/gi, replacement: "Tüm Bölümleri Daralt" },
      { pattern: /Lesson (\d+) of (\d+)/gi, replacement: "Ders $1 / $2" },
      // Genel kısa etiketler (whole-node anchor — kısmi eşleşme mangle'ı yok)
      { pattern: /^More$/i, replacement: "Daha Fazla" },
      { pattern: /^Details$/i, replacement: "Detaylar" },
      { pattern: /^Save$/i, replacement: "Kaydet" },
      { pattern: /^Add$/i, replacement: "Ekle" },
      { pattern: /^Edit$/i, replacement: "Düzenle" },
      { pattern: /^Edit [Pp]rofile$/i, replacement: "Profili Düzenle" },
      { pattern: /^Timezone$/i, replacement: "Saat Dilimi" },
      { pattern: /No recent changes/gi, replacement: "Son değişiklik yok" },
      // Kısmi-çeviri düzeltmeleri (İngilizce orijinali yakala → mangle'ı önle)
      { pattern: /Push Notifications/gi, replacement: "Push Bildirimleri" },
      { pattern: /Email Notifications/gi, replacement: "E-posta Bildirimleri" },
      { pattern: /View Group/gi, replacement: "Grubu Görüntüle" },
      { pattern: /New Comment/gi, replacement: "Yeni Yorum" },
      { pattern: /New Member Request to Join Group/gi, replacement: "Yeni Gruba Katılma İsteği" },
      { pattern: /Profile Picture/gi, replacement: "Profil Fotoğrafı" },
      { pattern: /Profile Cover/gi, replacement: "Profil Kapağı" },
      // Profil düzenleme: alan etiketi + "Add X" placeholder'ları (İngilizce-kaynak)
      { pattern: /^Title$/i, replacement: "Unvan" },
      { pattern: /Add title/gi, replacement: "Unvan ekle" },
      { pattern: /Add bio/gi, replacement: "Biyografi ekle" },
      { pattern: /Add location/gi, replacement: "Konum ekle" },
      { pattern: /Add timezone/gi, replacement: "Saat dilimi ekle" },
      { pattern: /Add phone number/gi, replacement: "Telefon Numarası ekle" },
      { pattern: /Add email/gi, replacement: "E-posta ekle" },
      { pattern: /Add twitter/gi, replacement: "Twitter ekle" },
      { pattern: /Add instagram/gi, replacement: "Instagram ekle" },
      { pattern: /Add facebook/gi, replacement: "Facebook ekle" },
      { pattern: /Add youtube/gi, replacement: "YouTube ekle" },
      { pattern: /Add linkedin/gi, replacement: "LinkedIn ekle" },
      // Ayarlar açıklamaları
      { pattern: /Manage your group details here/gi, replacement: "Grup detaylarını burada yönet" },
      { pattern: /Choose chat settings for your groups & contacts/gi, replacement: "Grupların ve kişilerin için sohbet ayarlarını seç" },
      { pattern: /Manage when and what you get notified for/gi, replacement: "Ne zaman ve ne için bildirim alacağını yönet" },
      { pattern: /Download & share certificates you have earned\.?/gi, replacement: "Kazandığın sertifikaları indir ve paylaş." },
      { pattern: /You have not earned any certificates yet\.?/gi, replacement: "Henüz sertifika kazanmadın." },
      { pattern: /Control which group users can contact you by toggling your chat availability on or off below\.?/gi, replacement: "Aşağıdan sohbet uygunluğunu açıp kapatarak hangi grup kullanıcılarının sana ulaşabileceğini belirle." },
      { pattern: /You can receive messages only from members of the group you are part of\.?/gi, replacement: "Yalnızca parçası olduğun grubun üyelerinden mesaj alabilirsin." },
      { pattern: /Control which users you don['’]?t want to chat with\.?/gi, replacement: "Sohbet etmek istemediğin kullanıcıları belirle." },
      { pattern: /Select your preferred language for viewing Customer Portal items, community content, courses,? and affiliate information\.?/gi, replacement: "Müşteri Portalı öğelerini, topluluk içeriğini, kursları ve iş ortağı bilgilerini görüntülemek için tercih ettiğin dili seç." },
      { pattern: /This setting allows you to see content in the language you['’]?re most comfortable with\.?/gi, replacement: "Bu ayar, içeriği en rahat olduğun dilde görmeni sağlar." },
      // Bildirim tercihleri
      { pattern: /Turn on\/off all push notifications/gi, replacement: "Tüm push bildirimlerini aç/kapat" },
      { pattern: /Turn on\/off all email notifications/gi, replacement: "Tüm e-posta bildirimlerini aç/kapat" },
      { pattern: /When someone likes your post/gi, replacement: "Biri gönderini beğendiğinde" },
      { pattern: /Get notified when someone you follow creates a new post\.?/gi, replacement: "Takip ettiğin biri yeni gönderi paylaştığında bildirim al." },
      { pattern: /When someone posts @mention/gi, replacement: "Biri @bahsetme ile paylaşım yaptığında" },
      { pattern: /When someone posts @everyone tagged/gi, replacement: "Biri @herkes etiketleyerek paylaşım yaptığında" },
      { pattern: /When someone comments on your post/gi, replacement: "Biri gönderine yorum yaptığında" },
      { pattern: /When someone likes your comment/gi, replacement: "Biri yorumunu beğendiğinde" },
      { pattern: /When someone comments @mention/gi, replacement: "Biri @bahsetme ile yorum yaptığında" },
      { pattern: /When someone comments @everyone tagged/gi, replacement: "Biri @herkes etiketleyerek yorum yaptığında" },
      { pattern: /When someone requests to join your group/gi, replacement: "Biri grubuna katılmak istediğinde" },
      { pattern: /When someone['’]?s group joining request is approved/gi, replacement: "Birinin grup katılım isteği onaylandığında" },
      { pattern: /When someone['’]?s group joining request is rejected/gi, replacement: "Birinin grup katılım isteği reddedildiğinde" },
      { pattern: /When someone['’]?s role is updated in a private channel/gi, replacement: "Birinin özel kanaldaki rolü güncellendiğinde" },
      { pattern: /When a new course is available/gi, replacement: "Yeni bir kurs eklendiğinde" },
      // — added 2026-06-02: kelime sırası / kısmi çeviri düzeltmeleri (dict'ten önce) —
      { pattern: /Search members?/gi, replacement: "Üye Ara" },
      { pattern: /Notifications List/gi, replacement: "Bildirim Listesi" },
      // POST/COMMENT eylem menüsü (… menü) — dict'ten önce tam-phrase yakala
      { pattern: /Delete Post/gi, replacement: "Gönderiyi Sil" },
      { pattern: /Edit Post/gi, replacement: "Gönderiyi Düzenle" },
      { pattern: /Move to Channel/gi, replacement: "Kanala Taşı" },
      { pattern: /Disable (Comments|Yorumlar)/gi, replacement: "Yorumları Kapat" },
      { pattern: /(?:Comments|Yorumlar) are disabled for this post\.?/gi, replacement: "Bu gönderide yorumlar kapalı." },
      { pattern: /Pin Post/gi, replacement: "Gönderiyi Sabitle" },
      { pattern: /\bUnpin\b/g, replacement: "Sabitlemeyi Kaldır" },
      { pattern: /\bPinned\b/g, replacement: "Sabitlendi" },
      { pattern: /\bPin\b/g, replacement: "Sabitle" },
      // UI label'ları
      { pattern: /\bLanguage\b/g, replacement: "Dil" },
      { pattern: /\bSort by\b/gi, replacement: "Sırala" },
      { pattern: /\bSort\b/g, replacement: "Sırala" },
      // Dil filtresi seçenekleri — tam-node eşleşme (yaygın kelime güvenliği)
      { pattern: /^All$/, replacement: "Tümü" },
      { pattern: /^Turkish$/, replacement: "Türkçe" },
      { pattern: /^English$/, replacement: "İngilizce" },
      // Sort seçenekleri
      { pattern: /Title A-Z/gi, replacement: "Başlık A-Z" },
      { pattern: /Title Z-A/gi, replacement: "Başlık Z-A" },
      { pattern: /Library Order \(Low to High\)/gi, replacement: "Kütüphane Sırası (Düşükten Yükseğe)" },
      { pattern: /Library Order \(High to Low\)/gi, replacement: "Kütüphane Sırası (Yüksekten Düşüğe)" },
      { pattern: /Most (?:Lessons|Dersler)/gi, replacement: "En Çok Ders" },
      { pattern: /Least (?:Lessons|Dersler)/gi, replacement: "En Az Ders" },
      // VALIDATION (dict "Password→Şifre" yemeden önce yakala)
      {
        pattern: /Password field is required/gi,
        replacement: "Şifre zorunludur",
      },
      { pattern: /Şifre field is required/gi, replacement: "Şifre zorunludur" },
      {
        pattern: /Email field is required/gi,
        replacement: "E-posta zorunludur",
      },
      {
        pattern: /E-posta field is required/gi,
        replacement: "E-posta zorunludur",
      },
      { pattern: /(\w+) field is required/gi, replacement: "$1 zorunludur" },
      {
        pattern: /This field is required/gi,
        replacement: "Bu alan zorunludur",
      },
      // RESET PASSWORD (eksik olan phrase'ler)
      {
        pattern: /No worries,?\s*we'?ll send you a reset link\.?/gi,
        replacement: "Endişelenme, sana bir sıfırlama bağlantısı göndereceğiz.",
      },
      { pattern: /Back to login/gi, replacement: "Girişe geri dön" },
      {
        pattern: /Didn'?t receive the email\?/gi,
        replacement: "E-posta gelmedi mi?",
      },
      {
        pattern: /Click to resend\.?/gi,
        replacement: "Tekrar göndermek için tıkla",
      },
      // GROUP
      { pattern: /JOIN GROUP/g, replacement: "GRUBA KATIL" },
      { pattern: /Join Group/g, replacement: "Gruba Katıl" },
      { pattern: /JOIN A GROUP/g, replacement: "GRUBA KATIL" },
      { pattern: /Join a Group/g, replacement: "Gruba Katıl" },
      { pattern: /View all groups/gi, replacement: "Tüm grupları görüntüle" },
      { pattern: /Switch to other groups/gi, replacement: "Diğer gruplara geç" },
      { pattern: /Recently opened/gi, replacement: "Son açılanlar" },
      {
        pattern: /You need to be part of this group to view the courses\.?/gi,
        replacement: "Kursları görüntülemek için bu gruba katılman gerekiyor.",
      },

      // PASSWORD SUCCESS
      {
        pattern: /(Password|Şifre)\s+(Set|set)\s+(Successfully|successfully)/g,
        replacement: "Şifren belirlendi",
      },
      {
        pattern: /(Password|Şifre) has been set successfully/gi,
        replacement: "Şifren başarıyla belirlendi",
      },

      // OTP email instruction (parçalı + tam varyantları)
      {
        pattern: /Please check your email:\s*(\S+)\s*for the secure code\.?/gi,
        replacement: "Güvenlik kodu için $1 e-postanı kontrol et.",
      },
      {
        pattern:
          /If you did not receive any email from us,?\s*tap here to resend\.?/gi,
        replacement: "Mail gelmediyse tekrar göndermek için buraya tıkla.",
      },
      {
        pattern:
          /Please check your email:\s*(\S+)\s*for the secure code\. If you did not receive any email from us,?\s*tap here to resend/gi,
        replacement:
          "Güvenlik kodu için $1 e-postanı kontrol et. Mail gelmediyse tekrar göndermek için buraya tıkla",
      },
      {
        pattern: /Please check your email:/gi,
        replacement: "Güvenlik kodu için e-postanı kontrol et:",
      },
      { pattern: /\s*for the secure code\.?/gi, replacement: "." },
      {
        pattern: /If you did not receive any email from us,?/gi,
        replacement: "Mail gelmediyse",
      },
      {
        pattern: /tap here to resend\.?/gi,
        replacement: "tekrar göndermek için buraya tıkla",
      },

      // AUTH
      { pattern: /Forgot [Pp]assword\?/g, replacement: "Şifreni mi unuttun?" },
      {
        pattern: /Forgot your [Pp]assword\?/g,
        replacement: "Şifreni mi unuttun?",
      },
      { pattern: /New user\?/g, replacement: "Yeni kullanıcı mısın?" },
      {
        pattern: /Already have an account\?/g,
        replacement: "Zaten hesabın var mı?",
      },
      {
        pattern: /Or, sign in with your email/g,
        replacement: "veya e-posta ile giriş yap",
      },
      {
        pattern: /Or, sign up with your email/g,
        replacement: "veya e-posta ile kayıt ol",
      },
      {
        pattern: /Login with secure code/g,
        replacement: "Güvenli kod ile giriş",
      },
      {
        pattern: /Login with security code/g,
        replacement: "Güvenli kod ile giriş",
      },
      { pattern: /Login with password/g, replacement: "Şifre ile giriş" },
      { pattern: /Giriş with password/g, replacement: "Şifre ile giriş" },

      // SET PASSWORD
      {
        pattern:
          /Your password must be at least 8 characters and should include a combination of uppercase and lowercase letters, numbers and special characters \(!\$%\)/g,
        replacement:
          "Şifren en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter (!$%) içermeli",
      },
      { pattern: /Confirm New Password/g, replacement: "Yeni Şifreyi Onayla" },
      { pattern: /Onayla New Password/g, replacement: "Yeni Şifreyi Onayla" },

      // COMMUNITY
      {
        pattern: /What's on your mind, (\w+)\?/g,
        replacement: "Aklında ne var, $1?",
      },
      {
        pattern: /What's on your mind, (\w+)/g,
        replacement: "Aklında ne var, $1",
      },
      {
        pattern: /Welcome to Growtify\.ai/g,
        replacement: "Growtify.ai'a hoş geldin",
      },
      {
        pattern: /Memberships \((\d+) in common\)/g,
        replacement: "Üyelikler ($1 ortak)",
      },
      {
        pattern: /(\d+) contributions? to Growtify\.ai/g,
        replacement: "Growtify.ai'da $1 katkı",
      },

      // COURSE
      {
        pattern: /You marked (\d+)\/(\d+) in course/g,
        replacement: "Kursta $1/$2 tamamlandı",
      },
      {
        pattern: /(\d+) of (\d+) Lessons? are completed/g,
        replacement: "$2 dersten $1'i tamamlandı",
      },
      { pattern: /(\d+) Lessons?/g, replacement: "$1 Ders" },
      {
        pattern: /Your unsaved changes will be lost/g,
        replacement: "Kaydedilmemiş değişikliklerin kaybolacak",
      },
      {
        pattern: /Do you still want to proceed/g,
        replacement: "Devam etmek istiyor musun",
      },
      {
        pattern:
          /To gain access to this (?:lesson|Lesson|Ders), please complete (?:lesson|Lesson|Ders):/g,
        replacement: "Bu derse erişim için önce şu dersi tamamla:",
      },
      {
        pattern:
          /To gain access to this (?:lesson|Lesson|Ders), please complete (?:category|Category):/g,
        replacement: "Bu içeriğe erişim için önce şu kategoriyi tamamla:",
      },
      // KATEGORİ kilidi (erişilen = kategori) — mevcut sadece "to this lesson" idi
      { pattern: /This (?:Category|Kategori) is locked/gi, replacement: "Bu kategori kilitli" },
      {
        pattern:
          /To gain access to this (?:category|Category|Kategori), please complete (?:lesson|Lesson|Ders):/g,
        replacement: "Bu kategoriye erişmek için önce şu dersi tamamla:",
      },
      {
        pattern:
          /To gain access to this (?:category|Category|Kategori), please complete (?:category|Category):/g,
        replacement: "Bu kategoriye erişmek için önce şu kategoriyi tamamla:",
      },

      // ASSIGNMENT / ASSESSMENT (quiz & ödev akışı)
      {
        pattern: /Good job!?\s*Keep going!?/gi,
        replacement: "Harika! Böyle devam!",
      },
      {
        pattern: /Assessment under review/gi,
        replacement: "Değerlendirme inceleniyor",
      },
      {
        pattern:
          /Your assignment is currently under review by the instructor\.?\s*We appreciate your patience during this process\.?\s*You will receive feedback and your final grade once the review is complete\.?/gi,
        replacement:
          "Ödevin şu anda eğitmen tarafından inceleniyor. Bu süreçteki sabrın için teşekkürler. İnceleme tamamlandığında geri bildirim ve nihai notunu alacaksın.",
      },
      {
        pattern: /Submitted Answer/gi,
        replacement: "Gönderilen Cevap",
      },
      {
        pattern: /Retake Assignment/gi,
        replacement: "Ödevi Tekrar Al",
      },
      // QUIZ aksiyonları (dict "View→Görüntüle" yemeden önce tam-phrase)
      { pattern: /Retake Quiz/gi, replacement: "Quizi Tekrar Çöz" },
      { pattern: /(?:View|Görüntüle) Result/gi, replacement: "Sonucu Görüntüle" },
      { pattern: /Start Quiz/gi, replacement: "Quize Başla" },
      { pattern: /Submit Quiz/gi, replacement: "Quizi Gönder" },
      { pattern: /Quiz Passed/gi, replacement: "Quiz Geçildi" },
      { pattern: /Quiz Failed/gi, replacement: "Quiz Geçilemedi" },
      // QUIZ sonuç ekranı
      { pattern: /You failed the quiz\.?/gi, replacement: "Quizi geçemedin." },
      { pattern: /You passed the quiz\.?/gi, replacement: "Quizi geçtin." },
      { pattern: /Question (\d+) of (\d+)/gi, replacement: "Soru $1 / $2" },
      { pattern: /Single Choice/gi, replacement: "Tek Seçim" },
      { pattern: /Multiple Choice/gi, replacement: "Çoklu Seçim" },
      { pattern: /The answer is incorrect/gi, replacement: "Cevap yanlış" },
      { pattern: /The answer is correct/gi, replacement: "Cevap doğru" },
      { pattern: /\bAttempted\b/g, replacement: "Cevaplanan" },
      { pattern: /\bScore\b/g, replacement: "Puan" },
      { pattern: /\bIncorrect\b/g, replacement: "Yanlış" },
      { pattern: /\bCorrect\b/g, replacement: "Doğru" },
      // QUIZ geç/kal mesajları + nav
      { pattern: /You have failed to reach the minimum score of this quiz\.?/gi, replacement: "Bu quizin geçme puanına ulaşamadın." },
      { pattern: /You have reached the minimum score of this quiz\.?/gi, replacement: "Bu quizin geçme puanına ulaştın." },
      { pattern: /Please try again\.?/gi, replacement: "Lütfen tekrar dene." },
      { pattern: /Questions answered correctly/gi, replacement: "soru doğru cevaplandı" },
      { pattern: /Next Question/gi, replacement: "Sonraki Soru" },
      { pattern: /Finish Quiz/gi, replacement: "Quizi Bitir" },
      { pattern: /Review Answers/gi, replacement: "Cevapları Gözden Geçir" },

      // GREETING / WELCOME (portal karşılama — isim dinamik, lookahead ile korunur)
      {
        pattern: /Hi,\s+(?=[A-ZÇĞİÖŞÜ])/g,
        replacement: "Merhaba, ",
      },
      { pattern: /Welcome back/gi, replacement: "Tekrar hoş geldin" },
      { pattern: /Welcome to\b/g, replacement: "Hoş geldin" },

      // ACCOUNT / PROFILE MENU (sağ-üst avatar menüsü)
      { pattern: /Manage your account/gi, replacement: "Hesabını yönet" },
      { pattern: /Log\s?out/gi, replacement: "Çıkış yap" },

      // THEME / DARK MODE
      { pattern: /Switch to light mode/gi, replacement: "Açık moda geç" },
      { pattern: /Switch to dark mode/gi, replacement: "Koyu moda geç" },

      // "About this Lesson/Course" — tam phrase (yarım çeviri "Hakkında this Ders" fix;
      // hem ham hem dict'in kısmen çevirdiği hali yakalar, doğru TR sırasıyla)
      { pattern: /(About|Hakkında) this (Lesson|Ders)/gi, replacement: "Bu Ders Hakkında" },
      { pattern: /(About|Hakkında) this (Course|Kurs)/gi, replacement: "Bu Kurs Hakkında" },

      // CHAT / CONVERSATIONS (boş durum + başlat)
      {
        pattern: /No conversations found/gi,
        replacement: "Sohbet bulunamadı",
      },
      // Kanal empty-state + izin
      { pattern: /Only community admins can post in this channel\.?/gi, replacement: "Bu kanalda yalnızca topluluk yöneticileri gönderi paylaşabilir." },
      { pattern: /No posts found/gi, replacement: "Gönderi bulunamadı" },
      { pattern: /No posts yet/gi, replacement: "Henüz gönderi yok" },
      // PROFİL / HESAP ayarları
      { pattern: /Basic Information/gi, replacement: "Temel Bilgiler" },
      { pattern: /(?:Update|Güncelle) your profile details/gi, replacement: "Profil bilgilerini güncelle" },
      { pattern: /Basic Details/gi, replacement: "Temel Detaylar" },
      { pattern: /This information will be displayed on your profile/gi, replacement: "Bu bilgiler profilinde gösterilecek" },
      { pattern: /Enter your Title/gi, replacement: "Unvanını gir" },
      { pattern: /(?:Profile|Profil) Slug/gi, replacement: "Profil Bağlantısı" },
      { pattern: /Use this URL to find and share your profile/gi, replacement: "Profilini bulmak ve paylaşmak için bu bağlantıyı kullan" },
      { pattern: /Enter a brief description about yourself/gi, replacement: "Kendin hakkında kısa bir açıklama gir" },
      { pattern: /Digital Marketing Specialist passionate about helping businesses grow online/gi, replacement: "İşletmelerin online büyümesine tutkuyla yardım eden Dijital Pazarlama Uzmanı" },
      { pattern: /Enter your Location/gi, replacement: "Konumunu gir" },
      { pattern: /Account Information/gi, replacement: "Hesap Bilgileri" },
      { pattern: /(?:Update|Güncelle) your account details/gi, replacement: "Hesap bilgilerini güncelle" },
      { pattern: /Account Details/gi, replacement: "Hesap Detayları" },
      { pattern: /Social Media Information/gi, replacement: "Sosyal Medya Bilgileri" },
      { pattern: /Add your social media details here/gi, replacement: "Sosyal medya bilgilerini buraya ekle" },
      { pattern: /Social Media/gi, replacement: "Sosyal Medya" },
      { pattern: /Phone Number/gi, replacement: "Telefon Numarası" },
      // Sertifikalar / Rozetler
      { pattern: /Download Your Certificates/gi, replacement: "Sertifikalarını İndir" },
      { pattern: /(?:View|Görüntüle) and download all your certificates here/gi, replacement: "Tüm sertifikalarını burada görüntüle ve indir" },
      { pattern: /(?:Course|Kurs)\/(?:Assignment|Ödev) Name/gi, replacement: "Kurs/Ödev Adı" },
      { pattern: /Completion Date/gi, replacement: "Tamamlanma Tarihi" },
      { pattern: /Expiry Date/gi, replacement: "Son Geçerlilik Tarihi" },
      { pattern: /Source Name/gi, replacement: "Kaynak Adı" },
      { pattern: /Download Your Badges/gi, replacement: "Rozetlerini İndir" },
      { pattern: /(?:View|Görüntüle) and download all your badges here/gi, replacement: "Tüm rozetlerini burada görüntüle ve indir" },
      { pattern: /(?:Badge|Rozet) Name/gi, replacement: "Rozet Adı" },
      { pattern: /Issued Date/gi, replacement: "Verilme Tarihi" },
      { pattern: /No Data/gi, replacement: "Veri Yok" },
      // Engellenenler / Gruplar
      { pattern: /Blocked Users/gi, replacement: "Engellenen Kullanıcılar" },
      { pattern: /Control Users/gi, replacement: "Kullanıcıları Yönet" },
      { pattern: /No users blocked/gi, replacement: "Engellenen kullanıcı yok" },
      { pattern: /Control Groups/gi, replacement: "Grupları Yönet" },
      // Dil ayarları
      // NOT: \b kullanma — Türkçe "ı" JS regex'te kelime-dışı sayıldığından
      // "Ayarları" içindeki "Ayarlar"ı tekrar eşleştirip sonsuz "ı" ekliyordu.
      // "Ayarları" alternatifi başta → kendi çıktısını tam yakalar, idempotent.
      { pattern: /(?:Language|Dil) (?:Settings|Ayarları|Ayarlar)/gi, replacement: "Dil Ayarları" },
      { pattern: /(?:Update|Güncelle) language settings here/gi, replacement: "Dil ayarlarını buradan güncelle" },
      { pattern: /Choose your preferred language/gi, replacement: "Tercih ettiğin dili seç" },
      // Bildirim tercihleri
      { pattern: /Notification preferences/gi, replacement: "Bildirim Tercihleri" },
      { pattern: /Manage how you receive notifications/gi, replacement: "Bildirimleri nasıl alacağını yönet" },
      { pattern: /Client portal/gi, replacement: "Müşteri Portalı" },
      { pattern: /New activity/gi, replacement: "Yeni Aktivite" },
      { pattern: /All notifications/gi, replacement: "Tüm Bildirimler" },
      { pattern: /Get notified when someone follows you\.?/gi, replacement: "Biri seni takip ettiğinde bildirim al." },
      { pattern: /New post from followed user/gi, replacement: "Takip edilen kullanıcıdan yeni gönderi" },
      { pattern: /Post @mention/gi, replacement: "Gönderide @bahsetme" },
      { pattern: /Post @everyone tagged/gi, replacement: "Gönderide @herkes etiketlendi" },
      { pattern: /Post like/gi, replacement: "Gönderi beğenisi" },
      { pattern: /(?:Comment|Yorum) @mention/gi, replacement: "Yorumda @bahsetme" },
      { pattern: /(?:Comment|Yorum) @everyone tagged/gi, replacement: "Yorumda @herkes etiketlendi" },
      { pattern: /(?:Comment|Yorum) like/gi, replacement: "Yorum beğenisi" },
      { pattern: /New member request to join group/gi, replacement: "Gruba katılmak için yeni üye isteği" },
      { pattern: /Group joining request approved/gi, replacement: "Grup katılım isteği onaylandı" },
      { pattern: /Group joining request rejected/gi, replacement: "Grup katılım isteği reddedildi" },
      { pattern: /Role updated in private channel/gi, replacement: "Özel kanalda rol güncellendi" },
      { pattern: /New course added to the group/gi, replacement: "Gruba yeni kurs eklendi" },
      { pattern: /New event created/gi, replacement: "Yeni etkinlik oluşturuldu" },
      { pattern: /Newsletter/gi, replacement: "Bülten" },
      { pattern: /Certificate issued/gi, replacement: "Sertifika verildi" },
      // Bildirim ayarları — ek başlıklar/aksiyonlar
      { pattern: /Notification type/gi, replacement: "Bildirim Türü" },
      { pattern: /Social and engagement/gi, replacement: "Sosyal ve etkileşim" },
      { pattern: /(?:Posts|Gönderiler) and comments activity/gi, replacement: "Gönderi ve yorum etkinliği" },
      { pattern: /(?:Community|Topluluk) and group management/gi, replacement: "Topluluk ve grup yönetimi" },
      { pattern: /Allow notifications/gi, replacement: "Bildirimlere izin ver" },
      { pattern: /Save and copy to/gi, replacement: "Kaydet ve şuraya kopyala" },
      // tekil label'lar (tam-node, yaygın kelime güvenliği)
      { pattern: /^Type$/, replacement: "Tür" },
      { pattern: /^Action$/, replacement: "İşlem" },
      { pattern: /^Groups$/, replacement: "Gruplar" },
      { pattern: /^Bio$/, replacement: "Hakkında" },
      { pattern: /^Location$/, replacement: "Konum" },
      { pattern: /^Visibility$/, replacement: "Görünürlük" },
      // Ayar sekmesi label'ları (tam-node)
      { pattern: /^Account$/, replacement: "Hesap" },
      { pattern: /^Certificates$/, replacement: "Sertifikalar" },
      { pattern: /^Badges$/, replacement: "Rozetler" },
      { pattern: /^Profile$/, replacement: "Profil" },
      { pattern: /^Notifications$/, replacement: "Bildirimler" },
      // Üye davet modalı
      { pattern: /Invite (?:Members?|Üye)/gi, replacement: "Üye Davet Et" },
      { pattern: /Build your community by inviting a new member/gi, replacement: "Yeni bir üye davet ederek topluluğunu büyüt" },
      { pattern: /Share your group link/gi, replacement: "Grup bağlantını paylaş" },
      { pattern: /Invite via (?:Email|E-posta)/gi, replacement: "E-posta ile davet et" },
      { pattern: /Invited (?:member|üye) will be auto approved to join group/gi, replacement: "Davet edilen üye gruba katılmak için otomatik onaylanır" },
      { pattern: /Enter Name/gi, replacement: "Adı gir" },
      { pattern: /Enter (?:Email|E-posta)/gi, replacement: "E-posta gir" },
      { pattern: /Give Administrative Privileges/gi, replacement: "Yönetici Yetkileri Ver" },
      { pattern: /Allow this member to perform all administrative actions/gi, replacement: "Bu üyenin tüm yönetici işlemlerini yapmasına izin ver" },
      { pattern: /Send Invite/gi, replacement: "Davet Gönder" },
      { pattern: /^Name$/, replacement: "Ad" },
      // Grup/üye yönetim menüsü
      { pattern: /Group Cover/gi, replacement: "Grup Kapağı" },
      { pattern: /Change Role/gi, replacement: "Rolü Değiştir" },
      { pattern: /(?:View|Görüntüle) Membership Answers/gi, replacement: "Üyelik Yanıtlarını Görüntüle" },
      { pattern: /Ban from group/gi, replacement: "Gruptan Yasakla" },
      { pattern: /Manage (?:Courses|Kurslar)/gi, replacement: "Kursları Yönet" },
      { pattern: /Resume (?:Course|Kurs)/gi, replacement: "Kursa Devam Et" },
      { pattern: /Remove from group/gi, replacement: "Gruptan Çıkar" },
      { pattern: /I understand that my answers will be saved and visible to group administrators\.?/gi, replacement: "Yanıtlarımın kaydedileceğini ve grup yöneticileri tarafından görülebileceğini anlıyorum." },
      // Topluluk empty-state
      { pattern: /No Communities Found/gi, replacement: "Topluluk Bulunamadı" },
      { pattern: /Start creating your own communities and engage with your audience!?/gi, replacement: "Kendi topluluklarını oluşturmaya başla ve kitlenle etkileşime geç!" },
      { pattern: /Go to Homepage/gi, replacement: "Ana Sayfaya Git" },
      {
        pattern: /Looks like you haven'?t chatted with anyone yet\.?/gi,
        replacement: "Görünüşe göre henüz kimseyle sohbet etmemişsin.",
      },
      {
        pattern: /Search a contact and take the first step!?/gi,
        replacement: "Bir kişi ara ve ilk adımı at!",
      },
      { pattern: /Start Chatting/gi, replacement: "Sohbete Başla" },
      {
        pattern: /When you get notifications, they/g,
        replacement: "Bildirim aldığında",
      },
      { pattern: /show up here/g, replacement: "burada görünecek" },
      {
        pattern: /points to level up/g,
        replacement: "puan seviye atlamana kaldı",
      },

      // TIME
      { pattern: /(\d+) days? ago/g, replacement: "$1 gün önce" },
      { pattern: /(\d+) hours? ago/g, replacement: "$1 saat önce" },
      { pattern: /(\d+) minutes? ago/g, replacement: "$1 dakika önce" },
      { pattern: /(\d+) seconds? ago/g, replacement: "$1 saniye önce" },
      { pattern: /(\d+) weeks? ago/g, replacement: "$1 hafta önce" },
      { pattern: /(\d+) months? ago/g, replacement: "$1 ay önce" },
      { pattern: /(\d+) years? ago/g, replacement: "$1 yıl önce" },
      { pattern: /a month ago/gi, replacement: "1 ay önce" },
      { pattern: /a week ago/gi, replacement: "1 hafta önce" },
      { pattern: /a day ago/gi, replacement: "1 gün önce" },
      { pattern: /an hour ago/gi, replacement: "1 saat önce" },
      { pattern: /a minute ago/gi, replacement: "1 dakika önce" },
      { pattern: /a few seconds ago/gi, replacement: "az önce" },
      { pattern: /just now/gi, replacement: "az önce" },
      { pattern: /(\d+)d ago/g, replacement: "$1g önce" },
      { pattern: /(\d+)h ago/g, replacement: "$1s önce" },
      // abbreviated time eksikleri (mo, m, w, y, s) — "mo" mutlaka "m"den ÖNCE
      { pattern: /(\d+)mo ago/g, replacement: "$1ay önce" },
      { pattern: /(\d+)m ago/g, replacement: "$1dk önce" },
      { pattern: /(\d+)w ago/g, replacement: "$1hf önce" },
      { pattern: /(\d+)y ago/g, replacement: "$1y önce" },
      { pattern: /(\d+)s ago/g, replacement: "$1sn önce" },
      { pattern: /New comment/g, replacement: "Yeni yorum" },
      // BİLDİRİM paneli
      { pattern: /\bBadge\b/g, replacement: "Rozet" },
      {
        pattern: /A new course (.+?) is now available within the group (.+)/gi,
        replacement: "$1 adlı yeni kurs $2 grubunda yayınlandı",
      },
      { pattern: /\bLevel\s+(\d+)/gi, replacement: "Seviye $1" },
      { pattern: /(Active|Aktif) (?:long ago|a long time ago)/gi, replacement: "Uzun süre önce aktifti" },
      { pattern: /\blong ago\b/gi, replacement: "uzun süre önce" },
      { pattern: /\bin\s+(#\S+)/g, replacement: "$1 kanalında" },
      // — added 2026-06-30 (CEO mobil tam-tarama; edge-proxy sonrası loader her sayfada erken çalışıyor) —
      // Kurs lesson player: "Next Lesson" word-dict "Lesson→Ders" yapıp "Next Ders" bırakıyordu
      { pattern: /Next Lesson/gi, replacement: "Sonraki Ders" },
      { pattern: /Previous Lesson/gi, replacement: "Önceki Ders" },
      { pattern: /Next Ders/g, replacement: "Sonraki Ders" },
      { pattern: /Previous Ders/g, replacement: "Önceki Ders" },
      // Ayarlar: Meeting sekmesi (yeni GHL özelliği — tamamen İngilizceydi)
      { pattern: /^Meeting$/i, replacement: "Toplantı" },
      { pattern: /Generate and manage your meeting URL/gi, replacement: "Toplantı bağlantını oluştur ve yönet" },
      { pattern: /No meeting link yet/gi, replacement: "Henüz toplantı bağlantın yok" },
      { pattern: /Create your personal booking link to schedule events and sessions directly from your communities\.?/gi, replacement: "Topluluklarından doğrudan etkinlik ve oturum planlamak için kişisel rezervasyon bağlantını oluştur." },
      { pattern: /Why this matters:?/gi, replacement: "Neden önemli:" },
      { pattern: /Use your link to create and manage community events/gi, replacement: "Bağlantını topluluk etkinlikleri oluşturmak ve yönetmek için kullan" },
      { pattern: /Use it for 1:1 sessions,? calls,? or community events/gi, replacement: "1:1 oturumlar, görüşmeler veya topluluk etkinlikleri için kullan" },
      { pattern: /Personalize your booking link anytime/gi, replacement: "Rezervasyon bağlantını istediğin zaman kişiselleştir" },
      { pattern: /Customize your URL anytime/gi, replacement: "URL'ini istediğin zaman özelleştir" },
      { pattern: /Works seamlessly on mobile and desktop/gi, replacement: "Mobil ve masaüstünde sorunsuz çalışır" },
      { pattern: /Generate meeting link/gi, replacement: "Toplantı bağlantısı oluştur" },
      // Ayarlar > Hesap: şifre değiştirme (etiket + placeholder). "Re-type new" ÖNCE → "New" mangle'ını önle
      { pattern: /Re-?type new password/gi, replacement: "Yeni Şifreyi Tekrar Gir" },
      { pattern: /Current password/gi, replacement: "Mevcut Şifre" },
      { pattern: /New password/gi, replacement: "Yeni Şifre" },
      { pattern: /Hide password change/gi, replacement: "Şifre değişikliğini gizle" },
      { pattern: /Change password/gi, replacement: "Şifre Değiştir" },
      // Bildirimler: "Push" kolon başlığı (E-posta çevrildi, bu kalmıştı)
      { pattern: /^Push$/, replacement: "Anlık" },
      // Kanal erişim uyarısı
      { pattern: /You don'?t have access to this channel\.?/gi, replacement: "Bu kanala erişimin yok" },
      // Sohbet/destek widget'ı (LeadConnector)
      { pattern: /Hi there! Have a question\??/gi, replacement: "Merhaba! Bir sorun mu var?" },
      { pattern: /Chat with us here\.?/gi, replacement: "Buradan bizimle sohbet et." },
      // About bölümü editör placeholder'ı (text node varyantı)
      { pattern: /Write here\.{0,3}/gi, replacement: "Buraya yaz..." },
      // — added 2026-06-30 (CEO 2. tur tarama): ödev dersi + aktivite akışı + arama + modül sayısı —
      { pattern: /No Recent Searches/gi, replacement: "Son Arama Yok" },
      { pattern: /(\d+)\s+Modules?\b/gi, replacement: "$1 Modül" },
      { pattern: /(\d+)\s+Lessons?\b/gi, replacement: "$1 Ders" },
      // Aktivite akışı / bildirim (kullanıcı adı + bu metin)
      { pattern: /Just shared a new post!?/gi, replacement: "yeni bir gönderi paylaştı!" },
      { pattern: /Just unlocked the (.+?) course by joining the private channel/gi, replacement: "özel kanala katılarak $1 kursunu açtı" },
      { pattern: /Added you to private channel as a member in/gi, replacement: "seni özel kanala üye olarak ekledi:" },
      // Ödev (assignment) dersi — "Start/Submit Assignment" dict'te "Başla Ödev/Gönder Ödev"e mangle oluyordu
      { pattern: /\bASSIGNMENT\b/g, replacement: "ÖDEV" },
      { pattern: /\bLESSON\b/g, replacement: "DERS" },
      { pattern: /Start Assignment/gi, replacement: "Ödeve Başla" },
      { pattern: /Submit Assignment/gi, replacement: "Ödevi Gönder" },
      { pattern: /Başla Ödev/g, replacement: "Ödeve Başla" },
      { pattern: /Gönder Ödev/g, replacement: "Ödevi Gönder" },
      { pattern: /Please fill the worksheet\(s\) and upload your assignment\.?/gi, replacement: "Lütfen çalışma sayfalarını doldur ve ödevini yükle." },
      { pattern: /Your answers/gi, replacement: "Cevapların" },
      // — added 2026-06-30 (CEO 2. tur, ekran 2): dosya yükleme alanı + kilitli ders —
      { pattern: /Click to upload or drag and drop/gi, replacement: "Yüklemek için tıkla veya sürükle bırak" },
      { pattern: /Click to upload/gi, replacement: "Yüklemek için tıkla" },
      { pattern: /or drag and drop/gi, replacement: "veya sürükle bırak" },
      { pattern: /\bare supported\.?/gi, replacement: "destekleniyor." },
      { pattern: /This lesson Is Locked/gi, replacement: "Bu Ders Kilitli" },
      { pattern: /To gain access to this lesson,?\s*please complete/gi, replacement: "Bu derse erişmek için şunu tamamla:" },
    ];

    function translateString(text) {
      if (!text) return text;
      let out = text;
      for (const p of phrases) {
        out = out.replace(p.pattern, p.replacement);
      }
      const keys = Object.keys(translations).sort(function (a, b) {
        return b.length - a.length;
      });
      for (const en of keys) {
        const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp("\\b" + escaped + "\\b", "g");
        out = out.replace(regex, translations[en]);
      }
      return out;
    }

    function translate() {
      if (isEnglishContext()) return; // EN grupta dokunma

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      let node;
      while ((node = walker.nextNode())) {
        const original = node.textContent;
        const tr = translateString(original);
        if (tr !== original) node.textContent = tr;
      }
      document
        .querySelectorAll("[placeholder], [title], [aria-label], [alt]")
        .forEach(function (el) {
          ["placeholder", "title", "aria-label", "alt"].forEach(function (
            attr
          ) {
            if (!el.hasAttribute(attr)) return;
            const v = el.getAttribute(attr);
            const tr = translateString(v);
            if (tr !== v) el.setAttribute(attr, tr);
          });
        });
      // Shadow DOM (web component) içindeki metin — ana TreeWalker shadow root'a girmez.
      // Mobil kurs müfredatındaki LESSON/ASSIGNMENT gibi shadow-render text node'ları yakala.
      // Additive + try/catch: mevcut akışı değiştirmez, bozulursa sessiz geçer.
      try {
        document.querySelectorAll("*").forEach(function (host) {
          var sr = host.shadowRoot;
          if (!sr) return;
          var sw = document.createTreeWalker(sr, NodeFilter.SHOW_TEXT);
          var sn;
          while ((sn = sw.nextNode())) {
            var so = sn.textContent;
            var stt = translateString(so);
            if (stt !== so) sn.textContent = stt;
          }
        });
      } catch (e) {}
      // Login secure code button (Naive UI)
      const secBtn = document.getElementById("sec-log-btn-login-page");
      if (secBtn) {
        const span = secBtn.querySelector(".n-button__content");
        if (span && /secure code|security code/i.test(span.textContent)) {
          span.textContent = "Güvenli kod ile giriş";
        }
      }
      // Generate secure code button (Naive UI)
      const genBtn = document.getElementById("login-secure-form-btn");
      if (genBtn) {
        const span = genBtn.querySelector(".n-button__content");
        if (span && /generate secure code/i.test(span.textContent)) {
          span.textContent = "Güvenlik kodu gönder";
        }
      }
      // Forgot password submit button (Naive UI)
      const fpBtn = document.getElementById("forgot-password-form-btn");
      if (fpBtn) {
        const span = fpBtn.querySelector(".n-button__content");
        if (span && /reset password/i.test(span.textContent)) {
          span.textContent = "Şifre Sıfırla";
        }
      }
      // OTP email instruction span targeted fix
      document.querySelectorAll("span").forEach(function (span) {
        const t = span.textContent;
        if (
          t.includes("Please check your email:") &&
          t.includes("for the secure code") &&
          t.includes("If you did not receive")
        ) {
          const strong = span.querySelector("strong");
          const email = strong ? strong.textContent : "e-postanı";
          span.innerHTML =
            "Güvenlik kodu için <strong>" +
            email +
            "</strong> adresine gelen kodu gir. Mail gelmediyse";
        }
      });
      // Reset password confirmation — "If an account exists for EMAIL..."
      document.querySelectorAll("div.divider-text").forEach(function (div) {
        if (div.children.length !== 1) return;
        const strong = div.querySelector("strong");
        if (!strong) return;
        const t = div.textContent;
        if (
          !t.includes("If an account exists for") ||
          !t.includes("reset password link")
        )
          return;
        const email = strong.textContent;
        div.innerHTML =
          "Eğer <strong>" +
          email +
          "</strong> için bir hesap varsa, şifre sıfırlama bağlantısı e-postana gelecek. Gelmezse spam klasörünü kontrol et.";
      });
    }

    // — added 2026-06-30: Kurs kütüphanesi cover fix —
    // Mobil "Tüm Kurslar"da GHL, 16:9 cover'ı 16:9-olmayan (daha dar/yüksek) kutuda
    // object-fit:cover ile merkezden kırpıyor → köşedeki logo kesiliyor. Class ismine
    // bağlı kalmadan: kırpılan 16:9 cover'ı tespit edip kapsayıcısını 16:9'a zorla
    // (kırpma yok, letterbox yok). Eşleşen kapsayıcılar (desktop/Öğrenme) zaten 16:9
    // olduğu için dokunulmaz. Idempotent: düzeltilince aspect eşit olur, tekrar girmez.
    function fixCroppedCovers() {
      if (location.pathname.indexOf("courses") === -1) return;
      document.querySelectorAll("img").forEach(function (img) {
        if (img.naturalWidth < 600) return;
        var ar = img.naturalWidth / img.naturalHeight;
        if (ar < 1.6 || ar > 2.05) return; // sadece ~16:9 cover
        if (getComputedStyle(img).objectFit !== "cover") return;
        var p = img.parentElement;
        if (!p) return;
        var pr = p.getBoundingClientRect();
        if (pr.width < 80 || pr.height < 40) return;
        if (Math.abs(pr.width / pr.height - ar) > 0.12) {
          p.style.setProperty("aspect-ratio", "16 / 9", "important");
          p.style.setProperty("height", "auto", "important");
        }
      });
    }

    translate();
    fixCroppedCovers();
    setInterval(translate, 500);
    // React hızlı yeniden basınca 500ms interval kaçırabiliyor (ör. mobil kurs
    // müfredatı LESSON/ASSIGNMENT label'ları İngilizce kalıyordu). DOM değişince
    // ~120ms debounce ile yeniden çevir. translate() idempotent → döngü oluşmaz.
    try {
      var _trT = null;
      var _obs = new MutationObserver(function () {
        if (_trT) return;
        _trT = setTimeout(function () {
          _trT = null;
          try {
            translate();
          } catch (e) {}
        }, 120);
      });
      _obs.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    } catch (e) {}
    setInterval(fixCroppedCovers, 800);
    console.log(
      "[Panel TR] Active + Login + OTP + Password + Library + Group + CSS Placeholder + EN-guard"
    );
  } catch (e) {
    console.error("[Panel TR] ERROR:", e);
  }
})();

/* G1 DeepGap link enricher — load the portal-side token bridge (no separate GHL
   Header Code edit needed; this script is already injected into the portal). */
(function () {
  if (document.getElementById("__gai_g1_link")) return;
  var s = document.createElement("script");
  s.id = "__gai_g1_link";
  s.src = "https://growtify.ai/portal/g1-link.js?v=1";
  s.async = true;
  document.head.appendChild(s);
})();
