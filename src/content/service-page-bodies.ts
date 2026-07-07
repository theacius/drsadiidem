/** Referans hizmet detay sayfaları — Eskişehir · Uzm. Dr. Şadi İdem */

type Section = { h2: string; paragraphs: string[] };
type FaqItem = { q: string; a: string };

function buildServiceHtml(
  intro: string[],
  sections: Section[],
  faq: FaqItem[],
): string {
  const parts: string[] = intro.map((p) => `<p class="service-intro">${p}</p>`);
  for (const s of sections) {
    parts.push(`<h2 class="service-section-title">${s.h2}</h2>`);
    parts.push(...s.paragraphs.map((p) => `<p class="service-body">${p}</p>`));
  }
  parts.push('<h2 class="service-faq-title">Sık Sorulan Sorular</h2>');
  parts.push('<div class="service-faq-list">');
  for (const f of faq) {
    parts.push(
      `<div class="service-faq-item"><p class="service-faq-q">${f.q}</p><p class="service-faq-a">${f.a}</p></div>`,
    );
  }
  parts.push("</div>");
  parts.push(
    '<blockquote class="service-disclaimer"><p>Bu sayfadaki bilgiler genel bilgilendirme amaçlıdır. Tanı ve tedavi için hekim muayenesinin yerini tutmaz.</p></blockquote>',
  );
  return parts.join("");
}

export const SERVICE_PAGE_INTRO_TR: Record<string, string[]> = {
  "saglikli-cocuk-muayenesi-ve-izlemi": [
    "Sağlıklı çocuk muayenesi ve izlemi, çocuğun yalnızca hastalık dönemlerinde değil; sağlıklı olduğu zamanlarda da düzenli olarak değerlendirilmesini kapsayan koruyucu hekimlik yaklaşımıdır. Eskişehir’de kendi kliniğinde hizmet veren Uzm. Dr. Şadi İdem, sağlıklı çocuk izlemini çocuğun yaşına, gelişim dönemine ve bireysel ihtiyaçlarına göre ele alır.",
    "Bu süreçte amaç; çocuğun büyüme ve gelişiminin düzenli olarak izlenmesi, olası risklerin erken dönemde fark edilmesi ve ailelerin doğru bilgiyle desteklenmesidir.",
  ],
  "yenidogan-takibi": [
    "Yenidoğan dönemi, bebeğin doğumdan sonraki ilk aylarını kapsayan ve yakından izlem gerektiren özel bir süreçtir. Bu dönemde bebeğin genel durumu, beslenmesi ve gelişimi düzenli olarak değerlendirilir. Eskişehir’de kendi kliniğinde hizmet veren Uzm. Dr. Şadi İdem, yenidoğan ve prematüre takibini bebeğin bireysel ihtiyaçları doğrultusunda ele alır.",
    "Bu izlem sürecinin temel amacı; bebeğin sağlıklı gelişiminin desteklenmesi ve ailelerin bu hassas dönemde doğru bilgiyle yönlendirilmesidir.",
  ],
  "cocuk-hastaliklarinin-klinik-degerlendirilmesi": [
    "Çocukluk döneminde karşılaşılan sağlık sorunları, sistematik bir hekim muayenesi ve klinik değerlendirme süreci ile ele alınır. Eskişehir’de kendi kliniğinde hizmet veren Uzm. Dr. Şadi İdem, çocuk hastalıklarının değerlendirilmesini çocuğun yaşı, genel durumu ve bireysel özellikleri doğrultusunda planlar.",
    "Bu yaklaşımda amaç; mevcut durumun doğru şekilde değerlendirilmesi, izlem gerektiren durumların belirlenmesi ve ailelerin süreç hakkında açık ve anlaşılır biçimde bilgilendirilmesidir.",
  ],
  "fonksiyonel-beslenme-ve-fonksiyonel-tip-yaklasimi": [
    "Fonksiyonel beslenme ve fonksiyonel tıp yaklaşımı, çocuğun sağlık durumunun yalnızca mevcut şikâyetler üzerinden değil; beslenme düzeni, günlük alışkanlıklar ve bireysel özellikler birlikte ele alınarak değerlendirilmesini amaçlayan bir bakış açısıdır. Eskişehir’de kendi kliniğinde hizmet veren Uzm. Dr. Şadi İdem, bu yaklaşımı hekim değerlendirmesini destekleyici bir çerçeve olarak uygular.",
    "Bu yaklaşımın temelinde; çocuğun yaşına, gelişim dönemine ve ihtiyaçlarına uygun yaşam düzeninin değerlendirilmesi yer alır.",
  ],
};

export const SERVICE_PAGE_BODY_TR: Record<string, string> = {
  "saglikli-cocuk-muayenesi-ve-izlemi": buildServiceHtml(
    [],
    [
      {
        h2: "Sağlıklı Çocuk Muayenesi Nedir?",
        paragraphs: [
          "Sağlıklı çocuk muayenesi, çocuğun genel sağlık durumunun belirli aralıklarla değerlendirilmesini ifade eder. Bu muayenelerde çocuğun boy, kilo ve gelişim basamakları yaşına uygun şekilde gözden geçirilir.",
          "Muayene süreci, yalnızca fiziksel ölçümlerle sınırlı değildir. Çocuğun beslenme düzeni, uyku alışkanlıkları, günlük rutinleri ve genel davranışları da bütüncül bir bakış açısıyla ele alınır.",
        ],
      },
      {
        h2: "Sağlıklı Çocuk İzlemi Kimler İçin Uygundur?",
        paragraphs: [
          "Sağlıklı çocuk izlemi; bebeklik döneminden ergenliğe kadar tüm çocuklar için önerilen bir değerlendirme sürecidir. Özellikle hızlı büyüme ve gelişmenin olduğu ilk yıllarda düzenli izlem, çocuk sağlığının önemli bir parçasıdır.",
          "Her çocuğun gelişim süreci farklıdır. Bu nedenle izlem planı, çocuğun bireysel özellikleri ve ihtiyaçları doğrultusunda şekillendirilir.",
        ],
      },
      {
        h2: "Klinik Yaklaşım",
        paragraphs: [
          "Sağlıklı çocuk muayenesi ve izleminde öncelik, ayrıntılı hekim değerlendirmesidir. Muayene sırasında elde edilen bulgular, çocuğun önceki izlemleri ve aileden alınan bilgilerle birlikte değerlendirilir.",
          "Gerekli görülen durumlarda izlem aralıkları planlanır ve aileler süreç hakkında bilgilendirilir. Amaç; çocuğun gelişiminin düzenli şekilde takip edilmesi ve ailelerin bu süreci bilinçli şekilde yönetebilmesidir.",
        ],
      },
      {
        h2: "Aileler İçin Genel Bilgilendirme",
        paragraphs: [
          "Sağlıklı çocuk izlemi, yalnızca muayene günü ile sınırlı değildir. Günlük yaşamda dikkat edilen küçük ayrıntılar, çocuğun genel sağlığını doğrudan etkileyebilir.",
          "Beslenme düzeni, uyku alışkanlıkları ve fiziksel aktivite gibi faktörler; çocuğun gelişim sürecinin önemli parçalarıdır. Ailelerin bu konularda doğru bilgiye sahip olması, izlem sürecinin etkinliğini artırır.",
        ],
      },
      {
        h2: "Ne Zaman Hekim Değerlendirmesi Gerekir?",
        paragraphs: [
          "Bazı durumlarda, rutin izlem dışında hekim değerlendirmesi gerekebilir. Çocuğun büyüme eğrisinde beklenmeyen değişiklikler, gelişim basamaklarında belirgin farklılıklar veya aileyi endişelendiren durumlar bu kapsamda ele alınabilir.",
          "Bu gibi durumlarda, çocuğun genel durumu hekim muayenesi ile değerlendirilir ve izlem süreci buna göre planlanır.",
        ],
      },
    ],
    [
      {
        q: "Sağlıklı çocuk muayenesi hangi aralıklarla yapılır?",
        a: "İzlem aralıkları çocuğun yaşına ve gelişim dönemine göre planlanır. Bebeklik döneminde daha sık, ilerleyen yaşlarda ise daha geniş aralıklarla değerlendirme yapılabilir.",
      },
      {
        q: "Sağlıklı çocuk izlemi sadece bebekler için midir?",
        a: "Hayır. Sağlıklı çocuk izlemi, çocukluk çağının tüm dönemlerini kapsar.",
      },
      {
        q: "Muayene sırasında neler değerlendirilir?",
        a: "Çocuğun büyüme ölçümleri, genel durumu ve gelişim basamakları hekim tarafından bütüncül olarak ele alınır.",
      },
    ],
  ),

  "yenidogan-takibi": buildServiceHtml(
    [],
    [
      {
        h2: "Yenidoğan Takibi Nedir?",
        paragraphs: [
          "Yenidoğan takibi, doğumdan sonraki ilk haftalar ve aylar boyunca bebeğin gelişiminin düzenli aralıklarla değerlendirilmesini kapsar. Bu değerlendirmelerde bebeğin kilo alımı, beslenme düzeni ve genel durumu hekim muayenesi ile ele alınır.",
          "Yenidoğan döneminde yapılan izlem, yalnızca mevcut durumun değerlendirilmesiyle sınırlı değildir. Ailelerin günlük bakım, beslenme ve rutinler konusunda bilgilendirilmesi de bu sürecin önemli bir parçasıdır.",
        ],
      },
      {
        h2: "Prematüre Bebeklerde İzlem Süreci",
        paragraphs: [
          "Prematüre bebekler, doğum haftasına bağlı olarak özel izlem gerektirebilir. Bu bebeklerde gelişim süreci, bireysel özellikler dikkate alınarak planlanır ve düzenli hekim değerlendirmesi ile takip edilir.",
          "Prematüre takibinde amaç; bebeğin büyüme ve gelişim sürecinin yakından izlenmesi ve ihtiyaç duyulan durumlarda uygun yönlendirmelerin yapılmasıdır.",
        ],
      },
      {
        h2: "Klinik Yaklaşım",
        paragraphs: [
          "Yenidoğan ve prematüre takibinde öncelik, ayrıntılı hekim muayenesidir. Değerlendirme sürecinde bebeğin öyküsü, muayene bulguları ve önceki izlemler birlikte ele alınır.",
          "Gerekli görülen durumlarda izlem aralıkları planlanır ve aileler süreç hakkında bilgilendirilir. Her bebek için izlem planı, bireysel ihtiyaçlara göre şekillendirilir.",
        ],
      },
      {
        h2: "Aileler İçin Genel Bilgilendirme",
        paragraphs: [
          "Yenidoğan döneminde beslenme düzeni, uyku alışkanlıkları ve günlük bakım uygulamaları bebeğin gelişimi açısından önemlidir. Ailelerin bu konularda doğru bilgiye sahip olması, izlem sürecinin sağlıklı ilerlemesine katkı sağlar.",
          "Bu süreçte ailelerin sorularının yanıtlanması ve sürecin anlaşılır şekilde anlatılması, hekim izleminin önemli bir parçasıdır.",
        ],
      },
      {
        h2: "Ne Zaman Hekim Değerlendirmesi Gerekir?",
        paragraphs: [
          "Bebeğin beslenmesinde belirgin değişiklikler, kilo alımında beklenmeyen durumlar veya aileyi endişelendiren bulgular olduğunda hekim değerlendirmesi gerekebilir.",
          "Bu gibi durumlarda bebeğin genel durumu muayene ile değerlendirilir ve izlem süreci buna göre planlanır.",
        ],
      },
    ],
    [
      {
        q: "Yenidoğan takibi ne sıklıkla yapılır?",
        a: "İzlem sıklığı, bebeğin doğum haftasına ve genel durumuna göre planlanır.",
      },
      {
        q: "Prematüre bebeklerde izlem farklı mıdır?",
        a: "Evet. Prematüre bebeklerde izlem süreci bireysel ihtiyaçlara göre şekillendirilir.",
      },
      {
        q: "Yenidoğan döneminde hangi konular değerlendirilir?",
        a: "Bebeğin beslenmesi, kilo alımı ve genel durumu hekim tarafından bütüncül olarak ele alınır.",
      },
    ],
  ),

  "cocuk-hastaliklarinin-klinik-degerlendirilmesi": buildServiceHtml(
    [],
    [
      {
        h2: "Klinik Değerlendirme Nedir?",
        paragraphs: [
          "Klinik değerlendirme, çocuğun şikâyetlerinin ayrıntılı öykü alınması ve hekim muayenesi ile birlikte ele alınmasını kapsar. Bu süreçte çocuğun genel durumu, muayene bulguları ve önceki sağlık öyküsü birlikte değerlendirilir.",
          "Klinik değerlendirme; tek bir bulguya odaklanmak yerine, çocuğun bütüncül sağlık durumunu anlamayı hedefler.",
        ],
      },
      {
        h2: "Klinik Değerlendirme Kimler İçin Gündeme Gelir?",
        paragraphs: [
          "Çocuk hastalıklarının klinik değerlendirilmesi; ateş, öksürük, sindirim sistemiyle ilgili şikâyetler veya aileyi endişelendiren genel durum değişiklikleri gibi farklı nedenlerle gündeme gelebilir.",
          "Her çocuğun durumu farklıdır. Bu nedenle değerlendirme süreci, standart kalıplar yerine bireysel ihtiyaçlar doğrultusunda ele alınır.",
        ],
      },
      {
        h2: "Klinik Yaklaşım",
        paragraphs: [
          "Değerlendirme sürecinde öncelik, ayrıntılı hekim muayenesidir. Gerekli görülen durumlarda tanısal süreci destekleyici değerlendirmeler planlanabilir.",
          "İzlem gerektiren durumlarda, çocuğun genel durumu düzenli aralıklarla takip edilir ve aileler süreç hakkında bilgilendirilir. Gerekli durumlarda ilgili branşlara yönlendirme yapılabilir.",
        ],
      },
      {
        h2: "Aileler İçin Genel Bilgilendirme",
        paragraphs: [
          "Çocukluk çağında görülen sağlık sorunlarında, erken ve doğru değerlendirme sürecin sağlıklı yönetilmesine katkı sağlar. Ailelerin gözlemleri ve geri bildirimleri, klinik değerlendirmenin önemli bir parçasıdır.",
          "Bu süreçte ailelerin doğru bilgiye ulaşması ve süreci anlayarak takip etmesi hedeflenir.",
        ],
      },
      {
        h2: "Ne Zaman Hekim Değerlendirmesi Gerekir?",
        paragraphs: [
          "Çocuğun genel durumunda belirgin değişiklikler, şikâyetlerin uzaması veya aileyi endişelendiren durumlar olduğunda hekim değerlendirmesi gerekebilir.",
          "Bu tür durumlarda çocuğun genel durumu muayene ile ele alınır ve izlem planı buna göre şekillendirilir.",
        ],
      },
    ],
    [
      {
        q: "Çocuk hastalıklarının klinik değerlendirmesi neyi kapsar?",
        a: "Değerlendirme; hekim muayenesi, öykü alınması ve gerekli görülen durumlarda izlem sürecini kapsar.",
      },
      {
        q: "Her durumda tetkik yapılır mı?",
        a: "Hayır. Tetkik gerekliliği, hekim değerlendirmesi sonucunda belirlenir.",
      },
      {
        q: "Klinik değerlendirme tedavi anlamına gelir mi?",
        a: "Hayır. Klinik değerlendirme, mevcut durumun doğru şekilde anlaşılmasını amaçlayan bir süreçtir.",
      },
    ],
  ),

  "fonksiyonel-beslenme-ve-fonksiyonel-tip-yaklasimi": buildServiceHtml(
    [],
    [
      {
        h2: "Fonksiyonel Beslenme ve Fonksiyonel Tıp Yaklaşımı Nedir?",
        paragraphs: [
          "Fonksiyonel beslenme, çocuğun günlük beslenme alışkanlıklarının genel sağlık durumu ile birlikte ele alınmasını ifade eder. Fonksiyonel tıp yaklaşımı ise, bu değerlendirmeyi bütüncül bir bakış açısıyla yorumlamayı amaçlar.",
          "Bu yaklaşım, klasik tıbbın yerine geçen bir yöntem değildir. Hekim muayenesi ve tıbbi değerlendirme sürecini tamamlayıcı bir bakış açısı olarak ele alınır.",
        ],
      },
      {
        h2: "Hangi Durumlarda Gündeme Gelebilir?",
        paragraphs: [
          "Fonksiyonel beslenme ve fonksiyonel tıp yaklaşımı; büyüme-gelişme sürecinin değerlendirilmesi, beslenme düzeninin gözden geçirilmesi veya günlük yaşam alışkanlıklarının ele alınması gereken durumlarda gündeme gelebilir.",
          "Her çocuk için değerlendirme süreci farklıdır. Bu nedenle yaklaşım, standart kalıplar yerine bireysel ihtiyaçlar doğrultusunda planlanır.",
        ],
      },
      {
        h2: "Klinik Yaklaşım",
        paragraphs: [
          "Değerlendirme sürecinde öncelik, ayrıntılı hekim muayenesidir. Çocuğun genel durumu, beslenme düzeni ve günlük alışkanlıkları birlikte ele alınır.",
          "Gerekli görülen durumlarda izlem süreci planlanır ve aileler bu süreç hakkında bilgilendirilir. Amaç, çocuğun genel sağlık durumunun daha iyi anlaşılmasına katkı sağlamaktır.",
        ],
      },
      {
        h2: "Aileler İçin Genel Bilgilendirme",
        paragraphs: [
          "Beslenme düzeni ve günlük yaşam alışkanlıkları, çocukların gelişim sürecinde önemli bir rol oynar. Ailelerin bu konularda doğru bilgiye sahip olması, sağlıklı bir izlem sürecinin önemli bir parçasıdır.",
          "Fonksiyonel beslenme yaklaşımı, ailelere süreci daha iyi anlamaları için rehberlik etmeyi amaçlar.",
        ],
      },
      {
        h2: "Bu Yaklaşım Ne Değildir?",
        paragraphs: [
          "Fonksiyonel tıp yaklaşımı; alternatif tıp uygulaması değildir, tıbbi tedavilerin yerine geçmez ve kısa sürede sonuç vaat eden bir yöntem değildir.",
          "Bu yaklaşım, hekim değerlendirmesini destekleyen tamamlayıcı bir bakış açısı olarak ele alınır. Ayrıntılı bilgi için <a href=\"/fonksiyonel-tip?tab=beslenme\">Fonksiyonel Tıp ve Beslenme</a> sayfamızı inceleyebilirsiniz.",
        ],
      },
    ],
    [
      {
        q: "Fonksiyonel tıp yaklaşımı tedavi anlamına gelir mi?",
        a: "Hayır. Bu yaklaşım, hekim değerlendirmesini destekleyen bir çerçevedir.",
      },
      {
        q: "Her çocuk için uygulanır mı?",
        a: "Değerlendirme süreci, çocuğun bireysel ihtiyaçlarına göre planlanır.",
      },
      {
        q: "Fonksiyonel beslenme klasik beslenme önerilerinden farklı mıdır?",
        a: "Beslenme değerlendirmesi, çocuğun bireysel özellikleri dikkate alınarak ele alınır.",
      },
    ],
  ),
};

/** İçerik girişinin üstündeki konum başlığı (H2) */
export const SERVICE_LOCATION_HEADING_TR: Record<string, string> = {
  "saglikli-cocuk-muayenesi-ve-izlemi": "Eskişehir'de Sağlıklı Çocuk Muayenesi",
  "yenidogan-takibi": "Eskişehir'de Yenidoğan ve Prematüre Takibi",
  "cocuk-hastaliklarinin-klinik-degerlendirilmesi":
    "Eskişehir'de Çocuk Hastalıklarının Klinik Değerlendirilmesi",
  "fonksiyonel-beslenme-ve-fonksiyonel-tip-yaklasimi":
    "Eskişehir'de Fonksiyonel Beslenme ve Fonksiyonel Tıp Yaklaşımı",
};

export const SERVICE_LOCATION_HEADING_EN: Record<string, string> = {
  "saglikli-cocuk-muayenesi-ve-izlemi": "Well-child exams in Eskişehir",
  "yenidogan-takibi": "Newborn & preterm follow-up in Eskişehir",
  "cocuk-hastaliklarinin-klinik-degerlendirilmesi":
    "Clinical assessment of childhood illness in Eskişehir",
  "fonksiyonel-beslenme-ve-fonksiyonel-tip-yaklasimi":
    "Functional nutrition & medicine in Eskişehir",
};

export function serviceLocationHeading(
  slug: string,
  locale: string,
): string | undefined {
  return locale === "tr"
    ? SERVICE_LOCATION_HEADING_TR[slug]
    : SERVICE_LOCATION_HEADING_EN[slug] ?? SERVICE_LOCATION_HEADING_TR[slug];
}

export function fullServiceContentTr(slug: string): string {
  const locationH2 = SERVICE_LOCATION_HEADING_TR[slug];
  const intro = SERVICE_PAGE_INTRO_TR[slug] ?? [];
  const body = SERVICE_PAGE_BODY_TR[slug] ?? "";
  const prefix = locationH2 ? `<h2 class="service-location-title">${locationH2}</h2>` : "";
  const introHtml = intro.map((p) => `<p class="service-intro">${p}</p>`).join("");
  return prefix + introHtml + body;
}

export function fullServiceContentEn(slug: string): string {
  const locationH2 = SERVICE_LOCATION_HEADING_EN[slug];
  const intro = SERVICE_PAGE_INTRO_TR[slug] ?? [];
  const body = SERVICE_PAGE_BODY_TR[slug] ?? "";
  const prefix = locationH2 ? `<h2 class="service-location-title">${locationH2}</h2>` : "";
  const introHtml = intro.map((p) => `<p class="service-intro">${p}</p>`).join("");
  return prefix + introHtml + body.replace("Sık Sorulan Sorular", "Frequently Asked Questions");
}

/** @deprecated SEO — konum başlığını tercih edin */
export function servicePageHeadingTr(title: string): string {
  return `Eskişehir'de ${title}`;
}

/** @deprecated */
export function servicePageHeadingEn(title: string): string {
  return `${title} in Eskişehir`;
}
