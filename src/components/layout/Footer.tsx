import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import {
  SITE_PHONE_DISPLAY,
  SITE_WHATSAPP_DISPLAY,
  SITE_EMAIL,
  SITE_ADDRESS,
  telLink,
  waLink,
} from "@/lib/utils";
import { getPublishedBlogPosts } from "@/lib/blog-posts-prisma";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("footer");
  const tSite = await getTranslations("site");
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  let recentPosts: Awaited<ReturnType<typeof getPublishedBlogPosts>> = [];
  try {
    recentPosts = (await getPublishedBlogPosts(locale)).slice(0, 5);
  } catch {
    recentPosts = [];
  }

  return (
    <footer className="mt-10 sm:mt-16 bg-gradient-to-b from-[var(--color-cream-100)] to-[var(--color-cream-200)] border-t border-[var(--color-ink-100)]">
      <div className="container-x py-10 sm:py-14 lg:py-16 grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h4 className="font-display text-lg font-semibold text-[var(--color-ink-900)]">
            {tSite("name")}
          </h4>
          <p className="mt-3 text-sm text-[var(--color-ink-700)] flex items-start gap-2">
            <MapPin className="size-4 shrink-0 mt-0.5 text-[var(--color-primary)]" />
            {SITE_ADDRESS}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-ink-700)]">
            <li>
              <a href={telLink} className="inline-flex items-center gap-2 hover:text-[var(--color-primary)]">
                <Phone className="size-4 shrink-0" />
                {SITE_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[var(--color-primary)]"
              >
                <MessageCircle className="size-4 shrink-0" />
                {SITE_WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-[var(--color-primary)] break-all"
              >
                <Mail className="size-4 shrink-0" />
                {SITE_EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2 pt-1">
              <Clock className="size-4 shrink-0 mt-0.5 text-[var(--color-primary)]" />
              <div className="space-y-0.5">
                <div>{t("weekdays")}</div>
                <div>{t("saturday")}</div>
                <div className="text-[var(--color-muted)]">{t("sunday")}</div>
              </div>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4">
            {t("recentPosts")}
          </h4>
          <ul className="space-y-2.5 text-sm text-[var(--color-ink-700)]">
            {recentPosts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="hover:text-[var(--color-primary)] line-clamp-2">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4">
            {t("quickLinks")}
          </h4>
          <ul className="space-y-2.5 text-sm text-[var(--color-ink-700)]">
            <li><Link href="/" className="hover:text-[var(--color-primary)]">{tNav("home")}</Link></li>
            <li><Link href="/hakkimda" className="hover:text-[var(--color-primary)]">{tNav("hakkimda")}</Link></li>
            <li><Link href="/hizmet-alanlarimiz" className="hover:text-[var(--color-primary)]">{tNav("services")}</Link></li>
            <li><Link href="/fonksiyonel-tip" className="hover:text-[var(--color-primary)]">{tNav("healthyChildMonitoring")}</Link></li>
            <li><Link href="/blog" className="hover:text-[var(--color-primary)]">{tNav("blog")}</Link></li>
            <li><Link href="/iletisim" className="hover:text-[var(--color-primary)]">{tNav("iletisim")}</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-sm text-[var(--color-ink-700)] text-pretty leading-relaxed">{t("tagline")}</p>
          <p className="mt-4 text-xs text-[var(--color-muted)] leading-relaxed">{t("disclaimer")}</p>
        </div>
      </div>

      <div className="border-t border-[var(--color-ink-100)]">
        <div className="container-x py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-[var(--color-muted)]">
          <span>
            © {year} {tSite("name")}. {t("rights")}
          </span>
          <span className="text-pretty break-words max-w-full text-[0.7rem] sm:text-xs">
            Eskişehir · Tepebaşı · Çocuk Sağlığı ve Hastalıkları Uzmanı
          </span>
        </div>
      </div>
    </footer>
  );
}
