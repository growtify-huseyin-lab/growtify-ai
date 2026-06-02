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
      "Back to lesson": "Derse Dön",
      "Next lesson": "Sonraki Ders",
      "Mark as Complete": "Tamamlandı Olarak İşaretle",
      "Mark As Complete": "Tamamlandı Olarak İşaretle",
      "Mark As Tamamlandı": "Tamamlandı Olarak İşaretle",
      "Mark as Tamamlandı": "Tamamlandı Olarak İşaretle",

      // COMMUNITY / PROFILE
      Public: "Herkese Açık",
      Products: "Ürünler",
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
      // — added 2026-06-02: kelime sırası / kısmi çeviri düzeltmeleri (dict'ten önce) —
      { pattern: /Search member/gi, replacement: "Üye Ara" },
      { pattern: /Notifications List/gi, replacement: "Bildirim Listesi" },
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
      { pattern: /(\d+)d ago/g, replacement: "$1g önce" },
      { pattern: /(\d+)h ago/g, replacement: "$1s önce" },
      { pattern: /New comment/g, replacement: "Yeni yorum" },
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

    translate();
    setInterval(translate, 500);
    console.log(
      "[Panel TR] Active + Login + OTP + Password + Library + Group + CSS Placeholder + EN-guard"
    );
  } catch (e) {
    console.error("[Panel TR] ERROR:", e);
  }
})();
