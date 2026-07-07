export type FmBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "table"; headers: [string, string]; rows: [string, string][] }
  | { kind: "h3"; text: string }
  | { kind: "checks"; items: string[] };

export type FmSection = {
  id: string;
  navLabel: string;
  title: string;
  blocks: FmBlock[];
};

export type FunctionalMedicinePageContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  navTitle: string;
  sections: FmSection[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

export const FUNCTIONAL_MEDICINE_REFERENCE_TR: FunctionalMedicinePageContent = {
  metaTitle: "Fonksiyonel Tıp ve Beslenme",
  metaDescription:
    "Çocuklarda fonksiyonel tıp ve beslenme yaklaşımı — kök neden analizi, bağırsak sağlığı, bireysel değerlendirme ve entegre pediatri.",
  eyebrow: "Fonksiyonel Tıp",
  title: "Fonksiyonel Tıp ve Beslenme",
  lead:
    "Fonksiyonel tıp; belirtileri yönetmenin ötesinde altta yatan nedenleri ve vücut sistemleri arasındaki ilişkileri değerlendiren bilimsel bir yaklaşımdır.",
  navTitle: "Konu başlıkları",
  sections: [
    {
      id: "nedir",
      navLabel: "Fonksiyonel Tıp Nedir?",
      title: "Fonksiyonel Tıp Nedir?",
      blocks: [
        {
          kind: "p",
          text: "Fonksiyonel tıp yaklaşımı; hastalıkları yalnızca ortaya çıkan belirtiler üzerinden değil, altta yatan nedenleri ve vücut sistemleri arasındaki ilişkileri dikkate alarak değerlendiren bilimsel bir yaklaşımdır.",
        },
        {
          kind: "p",
          text: "Geleneksel tıp genellikle “Bu hastalığı nasıl tedavi ederim?” sorusuna odaklanırken, fonksiyonel tıp “Bu hastalık neden oluştu?” sorusunu da sormaktadır.",
        },
        {
          kind: "p",
          text: "Bu yaklaşımda her birey benzersiz kabul edilir. Aynı tanıyı alan iki çocuğun bile hastalığa yol açan nedenleri, tetikleyicileri ve tedaviye yanıtları farklı olabilir.",
        },
      ],
    },
    {
      id: "beslenme",
      navLabel: "Fonksiyonel Beslenme Nedir?",
      title: "Fonksiyonel Beslenme Nedir?",
      blocks: [
        {
          kind: "p",
          text: "Fonksiyonel beslenme, fonksiyonel tıbbın beslenme ayağını oluşturur. Bu yaklaşım, besinlerin yalnızca kalori kaynağı değil, vücutta biyolojik etkileri olan güçlü araçlar olduğunu kabul eder.",
        },
        { kind: "h3", text: "Fonksiyonel Beslenmenin Temel İlkeleri" },
        {
          kind: "ul",
          items: [
            "Besinler bilgi taşır: Yediğimiz her şey genlerimize, hormonlarımıza ve bağışıklık sistemimize mesaj gönderir.",
            "Bireysellik: Her çocuğun beslenme ihtiyacı farklıdır.",
            "Bağırsak sağlığı: Sindirim sistemi, bağışıklık ve beyin sağlığının temelidir.",
            "Besin yoğunluğu: Kalori değil, besin değeri önemlidir.",
            "Denge: Tek bir besine değil, genel beslenme örüntüsüne odaklanılır.",
          ],
        },
      ],
    },
    {
      id: "hedefler",
      navLabel: "Hedefler",
      title: "Fonksiyonel Tıp Yaklaşımının Hedefleri",
      blocks: [
        { kind: "p", text: "Fonksiyonel tıp yaklaşımının temel amacı:" },
        {
          kind: "table",
          headers: ["Geleneksel Yaklaşım", "Fonksiyonel Yaklaşım"],
          rows: [
            ["Hastalığı baskılamak", "Altta yatan nedeni bulmak"],
            ["Semptomları yönetmek", "Vücudun dengesini desteklemek"],
            ["Standart protokoller", "Kişiye özel planlama"],
            ["Organ bazlı değerlendirme", "Sistemler arası ilişkileri görmek"],
            ["Tedavi odaklı", "Önleme ve sağlığı koruma odaklı"],
          ],
        },
        {
          kind: "checks",
          items: [
            "Hastalığı baskılamak yerine kök nedeni anlamak",
            "Vücudun denge (homeostaz) mekanizmalarını desteklemek",
            "Uzun vadeli sağlığı korumak ve güçlendirmek",
          ],
        },
      ],
    },
    {
      id: "bilimsel",
      navLabel: "Bilimsel mi?",
      title: "Fonksiyonel Tıp Bilimsel Bir Yaklaşım mıdır?",
      blocks: [
        {
          kind: "p",
          text: "Evet. Fonksiyonel tıp, kanıta dayalı tıbbın dışına çıkmaz; aksine klasik tıbbi değerlendirmeyi daha geniş bir çerçevede ele alır.",
        },
        { kind: "h3", text: "Fonksiyonel Tıbbın Bilimsel Temelleri" },
        {
          kind: "ul",
          items: [
            "Sistemler biyolojisi: Vücudu birbirine bağlı sistemler ağı olarak inceler.",
            "Nutrigenomik: Besinlerin gen ifadesi üzerindeki etkileri.",
            "Mikrobiyom araştırmaları: Bağırsak florasının sağlık üzerindeki rolü.",
            "Epigenetik: Çevresel faktörlerin gen aktivitesi üzerindeki etkisi.",
            "Kronik hastalık patofizyolojisi: İnflamasyon, oksidatif stres, mitokondriyal fonksiyon.",
          ],
        },
        {
          kind: "p",
          text: "Fonksiyonel tıp, bu güncel bilimsel verileri klinik pratiğe entegre eder.",
        },
      ],
    },
    {
      id: "durumlar",
      navLabel: "Hangi Durumlarda Uygulanır?",
      title: "Çocuklarda Fonksiyonel Tıp Hangi Durumlarda Uygulanır?",
      blocks: [
        {
          kind: "p",
          text: "Fonksiyonel yaklaşım özellikle aşağıdaki durumlarda destekleyici bir değerlendirme olarak uygulanabilir:",
        },
        { kind: "h3", text: "Bağışıklık Sistemi Sorunları" },
        {
          kind: "ul",
          items: [
            "Tekrarlayan enfeksiyonlar (sık üst solunum yolu enfeksiyonu, orta kulak iltihabı)",
            "Antibiyotik kullanımı sonrası bağırsak dengesizliği",
            "Bağışıklık sisteminin güçlendirilmesi ihtiyacı",
          ],
        },
        { kind: "h3", text: "Alerjik Hastalıklar" },
        {
          kind: "ul",
          items: [
            "Atopik dermatit (egzama)",
            "Alerjik astım",
            "Alerjik rinit (saman nezlesi)",
            "Besin alerjileri",
            "Ürtiker (kurdeşen)",
          ],
        },
        { kind: "h3", text: "Sindirim Sistemi Sorunları" },
        {
          kind: "ul",
          items: [
            "Kronik kabızlık",
            "Gaz ve şişkinlik",
            "Gastroözofageal reflü",
            "Karın ağrısı",
            "İshal veya düzensiz dışkılama",
            "Besin intoleransları (laktoz, gluten vb.)",
          ],
        },
        { kind: "h3", text: "Nörogelişimsel ve Davranışsal Durumlar" },
        {
          kind: "ul",
          items: [
            "Dikkat eksikliği ve odaklanma problemleri",
            "Hiperaktivite",
            "Uyku sorunları",
            "Davranış düzensizlikleri",
            "Duygu düzenleme güçlükleri",
          ],
        },
        { kind: "h3", text: "Büyüme ve Gelişme" },
        {
          kind: "ul",
          items: [
            "Büyüme geriliği",
            "Kilo alamama veya fazla kilo",
            "İştahsızlık",
            "Seçici yeme davranışı",
          ],
        },
        { kind: "h3", text: "Genel Sağlık Durumu" },
        {
          kind: "ul",
          items: [
            "Kronik yorgunluk",
            "Sık hastalanma eğilimi",
            "Enerji düşüklüğü",
            "Cilt sorunları",
          ],
        },
      ],
    },
    {
      id: "degerlendirme",
      navLabel: "Klinik Değerlendirme Süreci",
      title: "Fonksiyonel Tıp Yaklaşımında Klinik Değerlendirme",
      blocks: [
        {
          kind: "p",
          text: "Fonksiyonel tıp yaklaşımıyla yapılan klinik değerlendirme, sistematik ve kapsamlı bir süreç izler:",
        },
        { kind: "h3", text: "1. Ayrıntılı Öykü Alma" },
        {
          kind: "p",
          text: "İlk değerlendirmede çocuğun tüm sağlık geçmişi detaylı şekilde ele alınır:",
        },
        { kind: "h3", text: "Beslenme Öyküsü" },
        {
          kind: "ul",
          items: [
            "Günlük beslenme düzeni",
            "Besin tercihleri ve reddettiği besinler",
            "Su tüketimi",
            "Şeker ve işlenmiş gıda alımı",
            "Bebeklikteki beslenme (anne sütü, formül, ek gıda geçişi)",
          ],
        },
        { kind: "h3", text: "Uyku ve Yaşam Düzeni" },
        {
          kind: "ul",
          items: [
            "Uyku kalitesi ve süresi",
            "Yatış ve uyanış saatleri",
            "Gün içi enerji düzeyi",
            "Fiziksel aktivite",
          ],
        },
        { kind: "h3", text: "Tıbbi Geçmiş" },
        {
          kind: "ul",
          items: [
            "Geçirilmiş hastalıklar",
            "Kullanılan ilaçlar (özellikle antibiyotikler)",
            "Aşı geçmişi",
            "Hastane yatışları ve ameliyatlar",
          ],
        },
        { kind: "h3", text: "Aile Öyküsü" },
        {
          kind: "ul",
          items: [
            "Ailede kronik hastalıklar",
            "Alerjik yatkınlık",
            "Otoimmün hastalıklar",
            "Metabolik sorunlar",
          ],
        },
        { kind: "h3", text: "Çevresel Faktörler" },
        {
          kind: "ul",
          items: ["Ev ortamı", "Kreş/okul durumu", "Stres faktörleri", "Ekran süresi"],
        },
        { kind: "h3", text: "2. Kapsamlı Fizik Muayene" },
        {
          kind: "ul",
          items: [
            "Cilt, saç ve tırnak değerlendirmesi (beslenme durumu göstergeleri)",
            "Karın muayenesi",
            "Büyüme parametreleri",
            "Nörolojik değerlendirme",
          ],
        },
        { kind: "h3", text: "3. Laboratuvar Değerlendirmesi" },
        {
          kind: "p",
          text: "Gerekli durumlarda kanıta dayalı testler istenir:",
        },
        {
          kind: "ul",
          items: [
            "Tam kan sayımı ve demir parametreleri",
            "Vitamin D, B12, folik asit düzeyleri",
            "Tiroid fonksiyon testleri",
            "Alerji testleri (gerektiğinde)",
            "Dışkı analizi (gerektiğinde)",
            "Besin intolerans testleri (gerektiğinde)",
          ],
        },
        {
          kind: "p",
          text: "Not: Gereksiz test yaptırılmaz; her test klinik değerlendirmeye göre bireysel olarak planlanır.",
        },
        { kind: "h3", text: "4. Kişiye Özel Plan Oluşturma" },
        { kind: "p", text: "Değerlendirme sonrasında çocuğun bireysel ihtiyaçlarına göre:" },
        { kind: "h3", text: "Beslenme Düzenlemeleri" },
        {
          kind: "ul",
          items: [
            "Yaşa uygun, sürdürülebilir öneriler",
            "Eliminasyon veya rotasyon diyetleri (gerektiğinde)",
            "Anti-inflamatuar beslenme prensipleri",
            "Bağırsak sağlığını destekleyen besinler",
          ],
        },
        { kind: "h3", text: "Yaşam Tarzı Önerileri" },
        {
          kind: "ul",
          items: [
            "Uyku hijyeni",
            "Fiziksel aktivite planı",
            "Stres yönetimi",
            "Ekran süresi düzenlemesi",
          ],
        },
        { kind: "h3", text: "Destek Ürünleri (Gerektiğinde)" },
        {
          kind: "ul",
          items: ["Probiyotikler", "Vitamin ve mineral destekleri", "Omega-3 yağ asitleri"],
        },
      ],
    },
    {
      id: "bagirsak",
      navLabel: "Bağırsak Sağlığı İlişkisi",
      title: "Bağırsak Sağlığı ve Çocuk Sağlığı İlişkisi",
      blocks: [
        {
          kind: "p",
          text: "Fonksiyonel tıbbın önemle üzerinde durduğu konulardan biri bağırsak sağlığıdır. Günümüz bilimsel araştırmaları, bağırsağın “ikinci beyin” olarak adlandırılmasına yol açmıştır.",
        },
        { kind: "h3", text: "Bağırsak Mikrobiyomunun Etkilediği Sistemler" },
        {
          kind: "ul",
          items: [
            "Bağışıklık sistemi",
            "Beyin ve davranış",
            "Besin emilimi",
            "İnflamasyon düzeyi",
          ],
        },
        { kind: "h3", text: "Çocuklarda Bağırsak Dengesizliğinin Belirtileri" },
        {
          kind: "ul",
          items: [
            "Kronik kabızlık veya ishal",
            "Gaz, şişkinlik, karın ağrısı",
            "Tekrarlayan enfeksiyonlar",
            "Alerjik hastalıklar",
            "Cilt sorunları (egzama)",
            "Davranış değişiklikleri",
            "Uyku bozuklukları",
          ],
        },
      ],
    },
    {
      id: "degildir",
      navLabel: "Ne Değildir?",
      title: "Fonksiyonel Tıp Yaklaşımı Ne DEĞİLDİR?",
      blocks: [
        {
          kind: "p",
          text: "Fonksiyonel tıp hakkındaki yanlış anlamaları düzeltmek önemlidir:",
        },
        { kind: "h3", text: "Fonksiyonel Tıp Bunlar Değildir" },
        {
          kind: "table",
          headers: ["Yanlış Algı", "Gerçek"],
          rows: [
            ["Bilim dışı veya alternatif tıp", "Kanıta dayalı, bilimsel bir yaklaşımdır"],
            ["Klasik tıbbın yerine geçer", "Klasik tıbbı tamamlar ve zenginleştirir"],
            ["Her hastalığı beslenmeyle tedavi eder", "Beslenme, bütüncül yaklaşımın bir parçasıdır"],
            ["İlaç karşıtı bir yaklaşım", "Gerektiğinde ilaç tedavisi desteklenir"],
            ["Herkese aynı protokol uygulanır", "Her birey için özel plan oluşturulur"],
            ["Sürekli test ve tahlil gerektirir", "Sadece gerekli testler istenir"],
            ["Pahalı ve ulaşılmaz", "Çoğu öneri günlük yaşamda uygulanabilir"],
          ],
        },
        { kind: "h3", text: "Fonksiyonel Tıp Budur" },
        {
          kind: "checks",
          items: [
            "Kanıta dayalı pediatrinin üzerine inşa edilen bütüncül bir bakış açısı",
            "Hastalığın nedenini anlamaya çalışan kök neden analizi",
            "Vücudu bir bütün olarak gören sistemik yaklaşım",
            "Kişiye özel, bireyselleştirilmiş değerlendirme",
            "Önleme ve sağlığı korumaya odaklanan proaktif tıp",
            "Aileyi sürecin aktif parçası yapan katılımcı yaklaşım",
          ],
        },
      ],
    },
    {
      id: "aileler",
      navLabel: "Aileler İçin Bilgilendirme",
      title: "Aileler İçin Bilgilendirme",
      blocks: [
        {
          kind: "p",
          text: "Fonksiyonel tıp yaklaşımı; aileleri karmaşık tedavilere yönlendirmek veya sürekli tetkik yaptırmak anlamına gelmez. Tam tersine; aileyi doğru bilgiyle güçlendirmeyi ve gereksiz müdahalelerden kaçınmayı hedefler.",
        },
        { kind: "h3", text: "Bu Süreçte Aileler Ne Öğrenir?" },
        { kind: "h3", text: "Vücut Nasıl Çalışır?" },
        {
          kind: "ul",
          items: [
            "Bağışıklık sisteminin işleyişi",
            "Sindirim ve emilim süreci",
            "Bağırsak-beyin bağlantısı",
            "İnflamasyon kavramı",
          ],
        },
        { kind: "h3", text: "Beslenme Neden Önemli?" },
        {
          kind: "ul",
          items: [
            "Besinlerin vücut üzerindeki etkileri",
            "Şeker ve işlenmiş gıdaların rolü",
            "Antioksidanlar ve anti-inflamatuar besinler",
            "Probiyotik ve prebiyotik kavramları",
          ],
        },
        { kind: "h3", text: "Günlük Hayatta Neler Değişebilir?" },
        {
          kind: "ul",
          items: [
            "Pratik beslenme önerileri",
            "Uyku düzeni iyileştirmeleri",
            "Stres azaltma teknikleri",
            "Hareket ve oyunun önemi",
          ],
        },
        {
          kind: "p",
          text: "Aileler bu bilgilerle sürecin aktif bir parçası haline gelir ve çocuklarının sağlığını desteklemek için güçlenir.",
        },
      ],
    },
    {
      id: "entegre",
      navLabel: "Entegre Yaklaşım",
      title: "Fonksiyonel Tıp ve Pediatri: Entegre Yaklaşım",
      blocks: [
        {
          kind: "p",
          text: "Kliniğimizde fonksiyonel tıp, klasik pediatri pratiğinin içine entegre edilmiş şekilde uygulanır.",
        },
        { kind: "h3", text: "Entegre Yaklaşımın Avantajları" },
        {
          kind: "table",
          headers: ["Durum", "Klasik Değerlendirme + Fonksiyonel Bakış"],
          rows: [
            [
              "Tekrarlayan enfeksiyon",
              "Antibiyotik tedavisi + bağışıklık sistemi desteği, bağırsak sağlığı",
            ],
            ["Egzama", "Nemlendirici, steroid + besin tetikleyicileri, bağırsak-cilt bağlantısı"],
            ["Kabızlık", "Laksatif + beslenme düzeni, su alımı, bağırsak florası"],
            [
              "Dikkat sorunu",
              "Değerlendirme, gerekirse ilaç + beslenme, uyku, omega-3, şeker alımı",
            ],
            ["İştahsızlık", "Vitamin + çinko, bağırsak sağlığı, besin tercihleri"],
          ],
        },
      ],
    },
  ],
  ctaTitle: "Randevu oluşturun",
  ctaBody: "Çocuğunuz için fonksiyonel tıp değerlendirmesi planlamak isterseniz bizimle iletişime geçebilirsiniz.",
  ctaButton: "Randevu Al",
};

export function getFunctionalMedicineReferenceContent(
  locale: string,
): FunctionalMedicinePageContent {
  if (locale === "tr") return FUNCTIONAL_MEDICINE_REFERENCE_TR;
  return {
    ...FUNCTIONAL_MEDICINE_REFERENCE_TR,
    metaTitle: "Functional medicine and nutrition",
    metaDescription:
      "Functional medicine approach in pediatrics — root-cause analysis, gut health and individualized care.",
    eyebrow: "Functional medicine",
    title: "Functional medicine and nutrition",
    lead: "Functional medicine evaluates underlying causes and relationships between body systems — not only symptoms.",
    navTitle: "Topics",
    ctaTitle: "Book a visit",
    ctaBody: "Contact us to plan a functional medicine evaluation for your child.",
    ctaButton: "Book appointment",
  };
}
