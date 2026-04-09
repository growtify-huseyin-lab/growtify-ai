export type SectorExtendedContent = {
  introText: string;
  stats: { value: string; label: string }[];
  faq: { question: string; answer: string }[];
};

export const SECTOR_CONTENT: Record<string, SectorExtendedContent> = {
  saglik: {
    introText:
      "Sağlık sektörü, yapay zekanın en hızlı etki yarattığı alanlardan biri. Diyetisyenler, psikologlar, fizyoterapistler ve diş hekimleri gibi bireysel çalışan profesyoneller, günün büyük bölümünü tekrarlayan idari işlere harcıyor: danışan planları hazırlamak, sosyal medya içeriği üretmek, randevu takibi yapmak.\n\nYapay zeka bu yükü ortadan kaldırmıyor — ama saatler süren işleri dakikalara indiriyor. Bir diyetisyen, yapay zeka ile kişiselleştirilmiş beslenme planını 15 dakikada çıkarabilir. Bir psikolog, seans notlarını otomatik özetletip takip mesajlarını planlayabilir. Sonuç: daha fazla danışan, daha az idari yük, daha yüksek memnuniyet.\n\nGrowtify.ai olarak GROWT Method ile sağlık profesyonellerini 5 seviyede AI dönüşümüne taşıyoruz. İlk adım kliniğinin AI fırsatlarını keşfetmek — son adım tam otomasyonla çalışan bir dijital klinik kurmak.",
    stats: [
      { value: "%74", label: "Sağlık profesyonellerinin AI kullanmama oranı" },
      { value: "15 saat", label: "Haftada tekrarlayan işlere harcanan ortalama süre" },
      { value: "3x", label: "AI kullanan kliniklerin danışan artış oranı" },
      { value: "Kişisel", label: "Quiz ile sana özel fiyat — GROWT Programı" },
    ],
    faq: [
      {
        question: "Diyetisyen olarak yapay zekayı nasıl kullanabilirim?",
        answer:
          "Yapay zeka ile kişiselleştirilmiş beslenme planları oluşturabilir, alışveriş listeleri hazırlayabilir, danışan takip mesajlarını otomatikleştirebilir ve Instagram içeriklerinizi planlayabilirsiniz. GROWT Method ile adım adım kurulum yapıyoruz.",
      },
      {
        question: "Psikolog olarak AI kullanmak etik mi?",
        answer:
          "AI terapinin yerini almaz — ama idari yükü azaltır. Seans notu özeti, takip hatırlatması, içerik üretimi gibi operasyonel işlerde yapay zeka kullanmak etik açıdan sorun oluşturmaz. Hasta verisi gizliliği için KVKK uyumlu araçlar kullanıyoruz.",
      },
      {
        question: "Kliniğimde AI kullanmaya başlamak için teknik bilgi gerekli mi?",
        answer:
          "Hayır. GROWT Method, sıfır teknik bilgiyle başlayabileceğiniz şekilde tasarlandı. Level 1'de AI araçlarını tanıyorsunuz, Level 2'de kendi iş akışınıza uyarlıyorsunuz. Kod yazmak veya teknik kurulum yapmanız gerekmiyor.",
      },
      {
        question: "Yapay zeka danışan gizliliğini tehlikeye atar mı?",
        answer:
          "Doğru araçlar ve uygulamalarla hayır. GROWT Method'da KVKK ve hasta gizliliği uyumlu araç seçimi yapıyoruz. Hasta verileri paylaşılan AI modellerine gönderilmez — lokal ve şifreli çözümler kullanılır.",
      },
      {
        question: "Ne kadar sürede sonuç alırım?",
        answer:
          "GROWT Programı 4 haftalık yoğun bir dönüşüm süreci. İlk haftadan itibaren zaman tasarrufu görmeye başlarsınız. Program sonunda günde 2-3 saat kazanım hedefliyoruz.",
      },
      {
        question: "Hangi AI araçlarını kullanacağım?",
        answer:
          "Mesleğinize ve ihtiyaçlarınıza göre ChatGPT, Claude, Canva AI, Make.com gibi araçlar arasından sizin için en uygun kombinasyonu belirliyoruz. Tek araç değil, entegre bir sistem kuruyoruz.",
      },
    ],
  },
  hukuk: {
    introText:
      "Hukuk büroları, yapay zekanın en somut verimlilik artışı sağladığı sektörlerden biri. Avukatlar günlerinin önemli bir bölümünü içtihat araştırması, mevzuat taraması ve dilekçe taslağı hazırlamaya harcıyor — bu işlerin büyük kısmı AI ile dakikalara indirilebilir.\n\nBir avukat yapay zeka ile binlerce emsal kararı saniyeler içinde tarayabilir, dilekçe taslağını otomatik oluşturabilir ve müvekkil iletişimini sistematikleştirebilir. Sonuç: dosya başına harcanan süre düşer, daha fazla dosya alınabilir, müvekkil memnuniyeti artar.\n\nGROWT Method ile hukuk profesyonellerini araştırma verimliliğinden tam dijital büro otomasyonuna taşıyoruz. Gizlilik ve mesleki etik kurallarına tam uyumlu araç seçimi yapıyoruz.",
    stats: [
      { value: "3 saat", label: "Dosya başına ortalama içtihat araştırma süresi" },
      { value: "%60", label: "AI ile araştırma süresinde azalma" },
      { value: "2x", label: "AI kullanan büroların dosya kapasitesi artışı" },
      { value: "20 dk", label: "AI ile dilekçe taslağı hazırlama süresi" },
    ],
    faq: [
      {
        question: "Avukat olarak yapay zekayı hangi işlerde kullanabilirim?",
        answer:
          "İçtihat araştırması, mevzuat taraması, dilekçe taslağı hazırlama, sözleşme analizi, müvekkil iletişim otomasyonu ve içerik üretimi başlıca kullanım alanları. GROWT Method ile büronuza özel bir AI iş akışı kuruyoruz.",
      },
      {
        question: "AI ile hazırlanan dilekçeler güvenilir mi?",
        answer:
          "AI taslak oluşturur, son karar her zaman avukatındır. Yapay zeka mevzuata uygun şablon ve emsal referanslar sunar — ama hukuki değerlendirme insan kontrolünde kalır. GROWT Method'da bu iş akışını doğru kurmayı öğretiyoruz.",
      },
      {
        question: "Müvekkil bilgileri AI ile paylaşılır mı?",
        answer:
          "Hayır. KVKK ve avukatlık meslek etiğine uyumlu araç seçimi yapıyoruz. Müvekkil verileri şifreli ortamlarda işlenir, üçüncü taraflarla paylaşılmaz. Gizlilik en üst önceliğimiz.",
      },
      {
        question: "Küçük bir büro olarak AI'dan faydalanabilir miyim?",
        answer:
          "Özellikle küçük bürolar için AI büyük avantaj. Asistan maliyeti olmadan araştırma, taslak ve iletişim otomasyonu yapabilirsiniz. GROWT Programı tek kişilik bürolardan 10+ kişilik bürolara kadar ölçeklenebilir.",
      },
      {
        question: "SMMM ve mali müşavir olarak da katılabilir miyim?",
        answer:
          "Evet. Hukuk sektörü kapsamında avukat, noter, arabulucu ve SMMM'ler programa katılabilir. Her mesleğe özel AI iş akışları tasarlıyoruz.",
      },
    ],
  },
  guzellik: {
    introText:
      "Güzellik sektörü, müşteri ilişkisi ve görsel içerik ağırlıklı bir sektör — yapay zekanın en hızlı geri dönüş sağladığı alanlardan biri. Kuaförler, estetisyenler ve güzellik merkezi sahipleri zamanlarının büyük bölümünü Instagram yönetimi, randevu koordinasyonu ve müşteri takibi gibi işlere harcıyor.\n\nYapay zeka ile 30 günlük Instagram içerik planı dakikalar içinde çıkarılabilir, randevu hatırlatmaları otomatikleştirilebilir ve müşteri sadakat programları sistematik hale getirilebilir. Sonuç: daha düzenli bir dijital varlık, daha az iptal ve daha yüksek müşteri geri dönüş oranı.\n\nGROWT Method ile güzellik profesyonellerini Instagram'dan randevuya, randevudan sadakate uzanan tam bir AI dönüşüm sürecine taşıyoruz.",
    stats: [
      { value: "5 saat", label: "Haftalık Instagram içerik yönetimine harcanan süre" },
      { value: "%30", label: "Randevu iptal oranı (hatırlatma olmadan)" },
      { value: "3x", label: "AI ile içerik üretim hızı artışı" },
      { value: "%45", label: "Otomatik takiple müşteri geri dönüş oranı artışı" },
    ],
    faq: [
      {
        question: "Kuaför olarak yapay zekayı nasıl kullanabilirim?",
        answer:
          "Instagram içerik planı oluşturma, post caption yazma, randevu hatırlatma otomasyonu, müşteri sadakat mesajları ve kampanya planlaması başlıca kullanım alanları. Teknik bilgi gerektirmez.",
      },
      {
        question: "AI Instagram postlarımı otomatik paylaşabilir mi?",
        answer:
          "AI içerik planını, görseller için yönergeleri ve caption'ları hazırlar. Paylaşımı siz onaylarsınız veya otomasyon araçlarıyla zamanlanmış paylaşım kurulabilir. GROWT Method'da her iki yöntemi de öğretiyoruz.",
      },
      {
        question: "Müşterilerime otomatik mesaj göndermek spam olmaz mı?",
        answer:
          "Doğru zamanda, doğru mesajla iletişim spam değil — müşteri deneyimi. Doğum günü tebriği, randevu hatırlatması ve kişiselleştirilmiş kampanya mesajları müşteri memnuniyetini artırır.",
      },
      {
        question: "Güzellik salonumun büyüklüğü fark eder mi?",
        answer:
          "Hayır. Tek kişilik ev salonu da 5 koltuklu salon da aynı AI araçlarından faydalanabilir. GROWT Programı ölçeğinize göre uyarlanır.",
      },
      {
        question: "Estetisyen veya güzellik uzmanı olarak katılabilir miyim?",
        answer:
          "Evet. Kuaför, estetisyen, cilt bakım uzmanı, makyaj artisti — güzellik sektöründeki tüm profesyoneller programa katılabilir.",
      },
    ],
  },
  emlak: {
    introText:
      "Emlak sektöründe rekabet dijitale taşındı. Potansiyel alıcılar artık önce Google'da arıyor, sonra danışmana ulaşıyor. Bu ortamda yapay zeka, emlak danışmanlarına ciddi avantaj sağlıyor: ilan yazımından müşteri eşleştirmeye, lead takibinden piyasa analizine kadar her adımda.\n\nBir emlak danışmanı yapay zeka ile 50 mülk için profesyonel ilan metnini saatler yerine dakikalar içinde hazırlayabilir. Müşteri tercihlerini analiz edip en uygun mülkleri otomatik eşleştirebilir. Potansiyel alıcılara zamanında takip mesajları gönderebilir.\n\nGROWT Method ile emlak profesyonellerini ilan verimliliğinden portföy büyütmeye uzanan dijital dönüşüme taşıyoruz.",
    stats: [
      { value: "30 dk", label: "Profesyonel ilan yazımı için harcanan süre (ilan başına)" },
      { value: "2 dk", label: "AI ile aynı ilanın hazırlanma süresi" },
      { value: "%40", label: "Lead takip otomasyonu ile dönüşüm artışı" },
      { value: "50+", label: "Aynı anda yönetilebilir mülk sayısı" },
    ],
    faq: [
      {
        question: "Emlak danışmanı olarak yapay zekayı nasıl kullanabilirim?",
        answer:
          "İlan metni yazımı, müşteri-mülk eşleştirme, lead takip otomasyonu, piyasa analizi, sosyal medya içerik üretimi ve sanal tur açıklamaları başlıca kullanım alanları.",
      },
      {
        question: "AI ilanlarımı otomatik yazar mı?",
        answer:
          "Evet. Mülk bilgilerini (metrekare, oda sayısı, konum, özellikler) girdiğinizde AI SEO uyumlu, profesyonel ilan metni ve başlık alternatifleri oluşturur. Siz onaylayıp yayınlarsınız.",
      },
      {
        question: "Müşteri-mülk eşleştirme nasıl çalışır?",
        answer:
          "AI müşterilerinizin tercihlerini (bütçe, konum, oda sayısı, özellikler) analiz ederek portföyünüzdeki en uygun mülkleri önerir. Manuel arama yerine otomatik eşleştirme ile gösterim verimliliği artar.",
      },
      {
        question: "Küçük portföy ile de faydalanabilir miyim?",
        answer:
          "Evet. AI özellikle az portföyle çalışan danışmanların her mülkten maksimum değer çıkarmasını sağlar. İlan kalitesi, takip sistemi ve dijital varlık küçük portföylerde daha kritik.",
      },
      {
        question: "Emlak ofisi olarak ekibimizi dahil edebilir miyiz?",
        answer:
          "GROWT Programı bireysel katılım üzerine kurulu. Ancak ekip üyeleriniz ayrı ayrı katılabilir ve ofis genelinde AI iş akışları oluşturabilirsiniz.",
      },
    ],
  },
  "e-ticaret": {
    introText:
      "E-ticaret satıcıları için yapay zeka artık lüks değil, zorunluluk. Trendyol, Hepsiburada ve Shopify'da satış yapan binlerce satıcı, ürün açıklaması yazmaktan müşteri hizmetine, reklam optimizasyonundan stok yönetimine kadar her alanda zaman baskısı altında.\n\nYapay zeka ile yüzlerce ürün için SEO uyumlu açıklama saniyeler içinde yazılabilir. Müşteri sorularına otomatik yanıt verilebilir. Reklam metinleri A/B test için otomatik üretilebilir. Sonuç: daha az operasyonel yük, daha yüksek dönüşüm oranı.\n\nGROWT Method ile e-ticaret satıcılarını ürün sayfası optimizasyonundan satış otomasyonuna taşıyoruz. İster tek mağaza ister çoklu platform — AI ile rekabet avantajı kuruyoruz.",
    stats: [
      { value: "15 dk", label: "Ürün başına açıklama yazma süresi (manuel)" },
      { value: "30 sn", label: "AI ile aynı açıklamanın hazırlanma süresi" },
      { value: "%25", label: "AI destekli reklam metniyle dönüşüm artışı" },
      { value: "7/24", label: "Otomatik müşteri yanıt kapasitesi" },
    ],
    faq: [
      {
        question: "Trendyol satıcısı olarak AI'dan nasıl faydalanabilirim?",
        answer:
          "Toplu ürün açıklaması yazma, SEO uyumlu başlık oluşturma, müşteri sorularına otomatik yanıt, kampanya metni hazırlama ve rakip analizi başlıca kullanım alanları.",
      },
      {
        question: "AI ürün açıklamalarım benzersiz mi olur?",
        answer:
          "Evet. AI her ürün için ürün özelliklerine göre benzersiz, SEO uyumlu açıklama oluşturur. Şablon kopyala-yapıştır değil, ürüne özel metin üretimi.",
      },
      {
        question: "Birden fazla platformda satıyorum, AI yardımcı olur mu?",
        answer:
          "Kesinlikle. Trendyol, Hepsiburada, Amazon, Shopify — her platform için optimize edilmiş ürün açıklaması ve reklam metni oluşturulabilir. GROWT Method'da çoklu platform stratejisi de kapsanıyor.",
      },
      {
        question: "Reklam bütçemi daha verimli kullanabilir miyim?",
        answer:
          "AI ile reklam metinlerini otomatik A/B test edebilir, hedef kitle önerileri alabilir ve performans analizini otomatikleştirebilirsiniz. Daha az bütçeyle daha yüksek dönüşüm hedefliyoruz.",
      },
      {
        question: "Stok ve fiyat yönetiminde de AI kullanılabilir mi?",
        answer:
          "Evet. Talep tahmini, dinamik fiyatlama önerileri ve stok optimizasyonu AI'ın güçlü olduğu alanlar. GROWT Programı'nda bu araçları da kuruyoruz.",
      },
    ],
  },
  "dis-hekimligi": {
    introText:
      "Diş hekimliği, hem klinik hem dijital pazarlama açısından yapay zekanın büyük fark yarattığı bir alan. Yeni hasta kazanımı, dental turizm fırsatları, çok dilli web varlığı ve hasta iletişimi — tüm bu alanlarda AI sistematik çözümler sunuyor.\n\nBir diş hekimi yapay zeka ile Google profilini optimize edebilir, 5 dilde web sitesi içeriği oluşturabilir, hasta iletişimini otomatikleştirebilir ve tedavi planı sunumlarını profesyonelleştirebilir. Dental turizm pazarında rekabet edebilmek için dijital varlık artık zorunlu.\n\nGROWT Method ile diş hekimlerini hasta kazanımından dental turizm otomasyonuna taşıyoruz. Kliniğinizin dijital kapasitesini katlamak için 5 seviyeli dönüşüm programı sunuyoruz.",
    stats: [
      { value: "%80", label: "Hastaların klinik seçiminde Google araması kullanma oranı" },
      { value: "5 dil", label: "AI ile oluşturulabilecek web sitesi dil sayısı" },
      { value: "45 dk", label: "Tedavi planı hazırlama süresi (AI ile 10 dk)" },
      { value: "%35", label: "Otomatik hatırlatma ile randevu iptal azalması" },
    ],
    faq: [
      {
        question: "Diş hekimi olarak yapay zekayı nasıl kullanabilirim?",
        answer:
          "Google profil optimizasyonu, çok dilli web sitesi içeriği, hasta iletişim otomasyonu, tedavi planı hazırlama, sosyal medya içerik üretimi ve dental turizm pazarlaması başlıca kullanım alanları.",
      },
      {
        question: "Dental turizm için AI nasıl yardımcı olur?",
        answer:
          "AI kliniğiniz için İngilizce, Almanca, Rusça, Arapça ve Fransızca web sitesi içeriği oluşturur. Google Ads çeviri ve lokalizasyonu yapar. Yabancı hasta iletişiminde çeviri asistanı olarak çalışır.",
      },
      {
        question: "Hasta verilerimi AI ile paylaşmam gerekir mi?",
        answer:
          "Hayır. KVKK uyumlu araçlar kullanıyoruz. Hasta bilgileri şifreli ortamlarda kalır. AI genel şablonlar ve iş akışları ile çalışır — kişisel sağlık verisi paylaşımı gerekmez.",
      },
      {
        question: "Kliniğim küçük, AI benim için de uygun mu?",
        answer:
          "Özellikle küçük ve orta ölçekli klinikler için AI büyük avantaj. Büyük klinik bütçesi olmadan dijital pazarlama, hasta takibi ve içerik üretimi yapabilirsiniz.",
      },
      {
        question: "Google'da üst sıralara çıkmam için ne yapmalıyım?",
        answer:
          "Google Business Profile optimizasyonu, yerel SEO, hasta yorumları yönetimi ve düzenli içerik üretimi temel adımlar. GROWT Programı'nda tüm bu adımları AI destekli kuruyoruz.",
      },
    ],
  },
  muhasebe: {
    introText:
      "Mali müşavirlik mesleği, yapay zeka ile en radikal dönüşümü yaşayacak alanlardan biri. Belge işleme, mevzuat takibi ve rutin raporlama gibi tekrarlayan işler zamanın büyük bölümünü yiyor — stratejik danışmanlığa vakit kalmıyor.\n\nYapay zeka ile fatura ve makbuz tanıma otomatikleştirilebilir, günlük mevzuat değişiklikleri AI tarafından takip edilebilir ve müşterilere özel mali raporlar dakikalar içinde hazırlanabilir. Sonuç: ay sonu kapanış 3 günden 3 saate iner, müşterilere katma değerli danışmanlık yapılabilir.\n\nGROWT Method ile mali müşavirleri belge otomasyonundan stratejik danışmanlık modeline taşıyoruz. Tekrarlayan işleri AI'a devredip, müşterilerinize gerçek değer sunmaya odaklanın.",
    stats: [
      { value: "3 gün", label: "Ay sonu kapanış süresi (geleneksel)" },
      { value: "3 saat", label: "AI destekli ay sonu kapanış süresi" },
      { value: "%70", label: "Belge işleme süresinde AI ile azalma" },
      { value: "2 saat", label: "Müşteri başına rapor hazırlama süresi (AI ile 15 dk)" },
    ],
    faq: [
      {
        question: "Mali müşavir olarak AI'yı hangi işlerde kullanabilirim?",
        answer:
          "Belge tanıma ve sınıflandırma, mevzuat takibi, mali rapor hazırlama, müşteri iletişim otomasyonu, vergi hesaplama kontrolü ve danışmanlık sunumu hazırlama başlıca kullanım alanları.",
      },
      {
        question: "AI muhasebe hatası yapar mı?",
        answer:
          "AI taslak ve öneri üretir, son kontrol her zaman sizin. Belge tanıma doğruluğu %95+ seviyesindedir ama kritik işlemlerde insan kontrolü zorunlu kalır. GROWT Method'da doğru kontrol noktalarını kuruyoruz.",
      },
      {
        question: "Müşteri verilerinin güvenliği nasıl sağlanır?",
        answer:
          "KVKK uyumlu, şifreli ve yerel çözümler kullanıyoruz. Müşteri mali verileri bulut AI servislerine gönderilmez. Veri güvenliği GROWT Programı'nın temel taşlarından biri.",
      },
      {
        question: "Mevzuat değişikliklerini AI gerçekten takip edebilir mi?",
        answer:
          "Evet. AI günlük olarak Resmi Gazete, GİB duyuruları ve mevzuat kaynaklarını tarayarak müşterilerinize özel uyarılar hazırlayabilir. Kaçırılan değişiklik riski minimuma iner.",
      },
      {
        question: "Kaç müşterim olursa olsun faydalanabilir miyim?",
        answer:
          "Evet. İster 10 müşteri ister 100 müşteri — AI ölçeklenebilir. Özellikle müşteri sayısı arttıkça AI'ın sağladığı verimlilik katlanarak büyür.",
      },
    ],
  },
  eczacilik: {
    introText:
      "Eczacılık sektörü dijital dönüşümde geride kalan alanlardan biri — ama yapay zeka bu açığı hızla kapatıyor. Stok yönetimi, müşteri sadakati, e-eczane operasyonları ve sağlık danışmanlığı gibi alanlarda AI pratik çözümler sunuyor.\n\nBir eczacı yapay zeka ile geçmiş satış verilerine dayalı stok tahmini yapabilir, mevsimsel kampanyaları otomatik planlayabilir, müşterilerine kişiselleştirilmiş sağlık bilgilendirmesi gönderebilir ve e-eczane operasyonlarını verimli yönetebilir.\n\nGROWT Method ile eczacıları stok optimizasyonundan dijital müşteri deneyimine uzanan bir dönüşüm sürecine taşıyoruz. Reçetesiz ürün satışından online eczane yönetimine kadar her adımda AI desteği sağlıyoruz.",
    stats: [
      { value: "%15", label: "Fazla stok oranı (ortalama eczane)" },
      { value: "%20", label: "AI stok tahmini ile kayıp satış azalması" },
      { value: "3x", label: "Otomatik kampanya ile müşteri geri dönüş artışı" },
      { value: "7/24", label: "E-eczane operasyonlarında AI destek kapasitesi" },
    ],
    faq: [
      {
        question: "Eczacı olarak yapay zekayı nasıl kullanabilirim?",
        answer:
          "Stok tahmin ve optimizasyonu, müşteri sadakat programı, mevsimsel kampanya planlaması, sağlık bilgilendirme mesajları, e-eczane ürün açıklamaları ve ilaç etkileşim kontrolü başlıca kullanım alanları.",
      },
      {
        question: "AI stok tahminleri güvenilir mi?",
        answer:
          "AI geçmiş satış verileri, mevsimsel trendler ve bölgesel talep kalıplarını analiz ederek tahmin yapar. %100 kesinlik garanti etmez ama manuel tahminden çok daha tutarlı sonuç verir.",
      },
      {
        question: "E-eczane operasyonlarımda AI nasıl yardımcı olur?",
        answer:
          "Ürün açıklaması yazma, müşteri sorularına otomatik yanıt, sipariş takibi bilgilendirmesi ve kampanya e-postası hazırlama gibi operasyonel işlerde AI büyük zaman kazandırır.",
      },
      {
        question: "İlaç bilgilendirme konusunda AI güvenilir mi?",
        answer:
          "AI genel sağlık bilgilendirmesi için kullanılabilir ama reçeteli ilaç tavsiyeleri vermez. Eczacının mesleki bilgisinin yerini almaz — operasyonel destek sağlar.",
      },
      {
        question: "Tek şubeli eczane olarak da faydalanabilir miyim?",
        answer:
          "Kesinlikle. AI özellikle tek şubeli eczanelerin büyük zincirlerle rekabet edebilmesini sağlar. Kişiselleştirilmiş hizmet ve dijital varlık küçük eczanelerin en büyük avantajı.",
      },
    ],
  },
  turizm: {
    introText:
      "Turizm sektörü 7/24 hizmet, çok dilli iletişim ve kişiselleştirme gerektiren bir alan — yapay zekanın doğal kullanım alanı. Seyahat acenteleri ve tur rehberleri, farklı zaman dilimlerindeki turistlere hizmet verirken dil bariyeri ve operasyonel yükle mücadele ediyor.\n\nYapay zeka ile çok dilli chatbot kurarak 7/24 turistlere yanıt verilebilir, kişisel tur programları otomatik oluşturulabilir, sezon analizi ve dinamik fiyatlama yapılabilir. Sonuç: kaçırılan müşteri sayısı düşer, kişiselleştirilmiş deneyim sunan acente öne çıkar.\n\nGROWT Method ile turizm profesyonellerini dijital müşteri deneyiminden operasyonel verimlilik dönüşümüne taşıyoruz. Küçük acentelerden butik tur şirketlerine kadar her ölçekte AI çözümleri.",
    stats: [
      { value: "5+ dil", label: "AI chatbot ile desteklenebilecek dil sayısı" },
      { value: "7/24", label: "Otomatik müşteri yanıt kapasitesi" },
      { value: "%50", label: "Mesai dışı kaçırılan talep oranı (AI'sız)" },
      { value: "30 dk", label: "Kişisel tur programı hazırlama süresi (AI ile otomatik)" },
    ],
    faq: [
      {
        question: "Seyahat acentesi olarak AI'dan nasıl faydalanabilirim?",
        answer:
          "Çok dilli chatbot, kişisel tur programı oluşturma, sezon analizi, dinamik fiyatlama, müşteri iletişim otomasyonu ve sosyal medya içerik üretimi başlıca kullanım alanları.",
      },
      {
        question: "AI chatbot gerçekten turistlere yardımcı olabilir mi?",
        answer:
          "Evet. Sık sorulan sorular, tur bilgisi, fiyat bilgilendirmesi ve rezervasyon yönlendirmesi için AI chatbot çok etkili. Karmaşık talepler otomatik olarak size yönlendirilir.",
      },
      {
        question: "Butik tur şirketi olarak da kullanabilir miyim?",
        answer:
          "Özellikle butik turlar için AI büyük avantaj. Kişiselleştirilmiş deneyim sunan küçük şirketler, AI ile büyük acentelerin operasyonel kapasitesine ulaşabilir.",
      },
      {
        question: "Dinamik fiyatlama nasıl çalışır?",
        answer:
          "AI geçmiş rezervasyon verileri, mevsimsel trendler ve talep kalıplarını analiz ederek optimal fiyat önerileri sunar. Son karar her zaman sizin.",
      },
      {
        question: "Tur rehberi olarak katılabilir miyim?",
        answer:
          "Evet. Seyahat acentesi, tur rehberi, otel işletmecisi ve transfer şirketi gibi turizm sektöründeki tüm profesyoneller programa katılabilir.",
      },
    ],
  },
  mimarlik: {
    introText:
      "Mimarlık sektörü, yapay zekanın yaratıcı ve operasyonel süreçleri birlikte dönüştürdüğü nadir alanlardan biri. Mimarlar ve iç mimarlar, konsept geliştirmeden müşteri sunumuna, render bekleme süresinden proje yönetimine kadar birçok darboğazla karşılaşıyor.\n\nYapay zeka ile 2 dakikada konsept render oluşturulabilir, müşteri brief'i yapılandırılabilir, proje takibi sistematikleştirebilir ve sunum materyalleri otomatik hazırlanabilir. İlk toplantıda müşteriye görsel sunum yapabilmek, proje kazanma oranını dramatik artırır.\n\nGROWT Method ile mimarlık profesyonellerini tasarım verimliliğinden müşteri yönetimi otomasyonuna taşıyoruz. Küçük ofislerden büyük bürolara kadar AI ile rekabet avantajı.",
    stats: [
      { value: "2 gün", label: "Geleneksel konsept render süresi" },
      { value: "2 dk", label: "AI ile konsept render süresi" },
      { value: "%40", label: "Proje kazanma oranı artışı (ilk toplantı görselle)" },
      { value: "3x", label: "AI ile yönetilebilir eşzamanlı proje sayısı artışı" },
    ],
    faq: [
      {
        question: "Mimar olarak yapay zekayı nasıl kullanabilirim?",
        answer:
          "Hızlı konsept render, müşteri brief yapılandırma, proje takip sistemi, sunum materyali hazırlama, maliyet tahmini ve sosyal medya portföy içeriği başlıca kullanım alanları.",
      },
      {
        question: "AI render kalitesi profesyonel kullanıma uygun mu?",
        answer:
          "AI konsept aşamasında hızlı görselleştirme için mükemmel. Final render kalitesinde değil ama müşteriye ilk fikri göstermek, yön belirlemek ve revizyon döngüsünü kısaltmak için çok etkili.",
      },
      {
        question: "İç mimar olarak da katılabilir miyim?",
        answer:
          "Evet. Mimar, iç mimar, peyzaj mimarı ve tasarımcılar programa katılabilir. Her disipline özel AI iş akışları tasarlıyoruz.",
      },
      {
        question: "Müşteri brief sürecini AI nasıl iyileştirir?",
        answer:
          "AI yapılandırılmış sorular ile müşteriyle brief görüşmesi yürütür. Belirsiz talepler netleşir, ölçülebilir beklentiler ortaya çıkar. Revizyon sayısı ve iletişim kayıpları azalır.",
      },
      {
        question: "Küçük mimarlık ofisi olarak AI bütçem yeterli mi?",
        answer:
          "GROWT Programı tek seferlik yatırım — kişisel fiyatınızı AI Dijital Olgunluk Testi ile öğrenin. Bunun dışında kullanacağınız AI araçlarının büyük bölümü ücretsiz veya düşük maliyetli. Küçük ofisler için AI en büyük eşitleyici.",
      },
    ],
  },
  egitim: {
    introText:
      "Eğitim sektörü, yapay zekanın hem içerik üretimi hem kişiselleştirme kapasitesiyle en çok faydalanacağı alanlardan biri. Öğretmenler, eğitim danışmanları ve online koçlar, materyal hazırlamaktan katılımcı takibine kadar tekrarlayan işlerle boğuşuyor.\n\nYapay zeka ile her katılımcıya özel materyal dakikalar içinde hazırlanabilir, ilerleme takibi otomatikleştirilebilir, programlar farklı seviye ve sektörlere uyarlanabilir. Sonuç: birebir çalışma zorunluluğu kalkar, program ölçeklenir, katılımcı deneyimi kişiselleşir.\n\nGROWT Method ile eğitim profesyonellerini içerik üretiminden program ölçeklendirmeye taşıyoruz. Bir program yazıp AI ile 5 varyanta çıkarmak artık mümkün.",
    stats: [
      { value: "2 saat", label: "Katılımcı başına materyal hazırlama süresi" },
      { value: "10 dk", label: "AI ile aynı materyalin kişiselleştirilme süresi" },
      { value: "5x", label: "AI ile program varyant çoğaltma kapasitesi" },
      { value: "%60", label: "Katılımcı tamamlama oranı artışı (AI takiple)" },
    ],
    faq: [
      {
        question: "Eğitimci olarak yapay zekayı nasıl kullanabilirim?",
        answer:
          "Kişiselleştirilmiş materyal hazırlama, quiz ve alıştırma oluşturma, katılımcı ilerleme takibi, program uyarlama, sertifika ve rapor hazırlama başlıca kullanım alanları.",
      },
      {
        question: "Online koç olarak AI'dan nasıl faydalanabilirim?",
        answer:
          "Koçluk programınızı AI ile ölçekleyebilirsiniz: otomatik ödev değerlendirme, kişisel geri bildirim taslakları, grup koçluğu materyalleri ve katılımcı segmentasyonu yapabilirsiniz.",
      },
      {
        question: "AI eğitimin kalitesini düşürür mü?",
        answer:
          "Aksine artırır. AI tekrarlayan işleri devralınca siz asıl değer — katılımcılarla birebir etkileşim, strateji ve mentorluk — için vakit bulursunuz.",
      },
      {
        question: "Programımı farklı sektörlere uyarlayabilir miyim?",
        answer:
          "Evet. AI tek bir programı farklı sektör, seviye ve hedef kitleye göre uyarlayabilir. Bir program yazarsınız, AI 5 farklı versiyon çıkarır.",
      },
      {
        question: "Öğretmen olarak da katılabilir miyim?",
        answer:
          "Evet. Öğretmen, eğitim danışmanı, online koç, kurumsal eğitimci — eğitim sektöründeki tüm profesyoneller programa katılabilir.",
      },
    ],
  },
  fitness: {
    introText:
      "Fitness sektörü kişiselleştirme ve sürekli motivasyon gerektiren bir alan — yapay zekanın en pratik etki yarattığı sektörlerden biri. Personal trainerlar ve fitness koçları, program yazımından müşteri takibine kadar zamanlarının büyük bölümünü operasyonel işlere harcıyor.\n\nYapay zeka ile her müşteriye özel antrenman programı ve beslenme önerisi dakikalar içinde hazırlanabilir. Otomatik takip mesajları motivasyonu yüksek tutar. Online koçluk altyapısı AI destekli kurulabilir. Sonuç: daha fazla müşteri, daha yüksek elde tutma oranı.\n\nGROWT Method ile fitness profesyonellerini program verimliliğinden online koçluk ölçeklendirmeye taşıyoruz. Stüdyo sınırlarını aşıp dijital gelir kanalları oluşturun.",
    stats: [
      { value: "1 saat", label: "Müşteri başına program yazma süresi" },
      { value: "5 dk", label: "AI ile kişisel program hazırlama süresi" },
      { value: "%40", label: "Otomatik takiple müşteri elde tutma artışı" },
      { value: "3x", label: "Online koçlukla gelir çeşitlendirme potansiyeli" },
    ],
    faq: [
      {
        question: "Personal trainer olarak yapay zekayı nasıl kullanabilirim?",
        answer:
          "Kişisel antrenman programı yazma, beslenme önerisi, müşteri motivasyon mesajları, ilerleme takibi, online koçluk içerik üretimi ve sosyal medya paylaşımları başlıca kullanım alanları.",
      },
      {
        question: "AI yazdığı programlar müşteriye özel mi olur?",
        answer:
          "Evet. Müşterinin yaşı, hedefi, kısıtlamaları ve seviyesine göre AI tamamen kişiselleştirilmiş program oluşturur. Şablon değil, gerçek kişiselleştirme.",
      },
      {
        question: "Online koçluk kurmak için AI yeterli mi?",
        answer:
          "AI altyapıyı kurar — program içeriği, video planı, müşteri iletişimi, ödeme sistemi. Ama asıl değer sizin uzmanlığınız. AI operasyonu kolaylaştırır, siz koçluğa odaklanırsınız.",
      },
      {
        question: "Pilates veya yoga eğitmeni olarak da katılabilir miyim?",
        answer:
          "Evet. Personal trainer, pilates eğitmeni, yoga eğitmeni, grup fitness eğitmeni — fitness sektöründeki tüm profesyoneller programa katılabilir.",
      },
      {
        question: "Stüdyo sahibi olarak ekibimi de dahil edebilir miyim?",
        answer:
          "GROWT Programı bireysel katılım üzerine kurulu. Ekip üyeleriniz ayrı katılabilir. Stüdyo genelinde AI iş akışları oluşturmak için kurumsal seçeneğimizi değerlendirebilirsiniz.",
      },
    ],
  },
};

export function getSectorContent(slug: string): SectorExtendedContent | null {
  return SECTOR_CONTENT[slug] || null;
}
