import type { ArticleCategory } from "@/content/articles";

/** İlk kurulum / seed için konu listesi — sitede yalnızca DB’de yayınlanmış Post olarak görünür. */
export type BaselineTopicPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  minRead: number;
};

export const BASELINE_TOPIC_POSTS: BaselineTopicPost[] = [
  {
    slug: "aile-ici-iliskiler-ve-cocuk-sagligi",
    title: "Aile İçi İlişkiler ve Çocuk Sağlığı",
    excerpt:
      "Ev ortamındaki ilişkilerin çocuğun fiziksel ve ruhsal sağlığı üzerindeki etkileri.",
    category: "davranis",
    minRead: 7,
  },
  {
    slug: "atesli-cocuga-yaklasim",
    title: "Ateşli Çocuğa Yaklaşım",
    excerpt:
      "Çocuğunuz ateşlendiğinde evde dikkat etmeniz gerekenler ve ne zaman doktora gidilmeli.",
    category: "saglik",
    minRead: 6,
  },
  {
    slug: "atesli-havale",
    title: "Ateşli Havale",
    excerpt:
      "Ateşli havalenin tanımı, nedenleri ve ailelerin nasıl davranması gerektiği.",
    category: "saglik",
    minRead: 5,
  },
  {
    slug: "sik-hastalanan-cocuk",
    title: "Sık Hastalanan Çocuk",
    excerpt:
      "Bağışıklık gelişimi, kreş/okul etkisi ve sık hastalanmanın doğal sınırları.",
    category: "saglik",
    minRead: 6,
  },
  {
    slug: "tamamlayici-beslenmenin-ilkeleri",
    title: "Tamamlayıcı Beslenmenin İlkeleri",
    excerpt:
      "6. aydan itibaren ek gıdalara geçiş; ne zaman, neyi, nasıl başlatmalı?",
    category: "beslenme",
    minRead: 8,
  },
  {
    slug: "yurutec-faydali-mi-zararli-mi",
    title: "Yürüteç Faydalı mı Zararlı mı?",
    excerpt:
      "Yürüteç kullanımının motor gelişime etkisi ve güvenlik tartışmaları.",
    category: "gelisim",
    minRead: 5,
  },
  {
    slug: "anne-sutu-ve-emzirme",
    title: "Anne Sütü ve Emzirme",
    excerpt:
      "Anne sütünün önemi, doğru emzirme tekniği ve sık karşılaşılan sorular.",
    category: "beslenme",
    minRead: 8,
  },
  {
    slug: "istahsiz-cocuk-ve-yemek-secme",
    title: "İştahsız Çocuk ve Yemek Seçme",
    excerpt:
      "Çocuk neden yemek seçer? Aile sofrasında sağlıklı yeme alışkanlığı nasıl kurulur?",
    category: "beslenme",
    minRead: 7,
  },
  {
    slug: "cocugumuz-ne-kadar-su-tuketmeli",
    title: "Çocuğumuz Ne Kadar Su Tüketmeli?",
    excerpt:
      "Yaş gruplarına göre günlük su gereksinimi ve susuzluğun belirtileri.",
    category: "beslenme",
    minRead: 4,
  },
  {
    slug: "bebeklerde-uyku-sorunu",
    title: "Bebeklerde Uyku Sorunu",
    excerpt:
      "Uyku düzeninin yaşa göre değişimi ve uyku sorunlarının başlıca nedenleri.",
    category: "uyku",
    minRead: 6,
  },
  {
    slug: "uyku-egitimi-nasil-verebilirim",
    title: "Uyku Eğitimi Nasıl Verebilirim?",
    excerpt:
      "Çocuk dostu, sıcak yaklaşımla uyku rutini oluşturma yöntemleri.",
    category: "uyku",
    minRead: 7,
  },
  {
    slug: "cocuga-asi-yaptirmali-miyim",
    title: "Çocuğa Aşı Yaptırmalı mıyım, Yaptırmamalı mıyım?",
    excerpt:
      "Aşıların önemi, güvenliği ve sık sorulan sorular üzerine bilimsel bir bakış.",
    category: "asi",
    minRead: 9,
  },
];
