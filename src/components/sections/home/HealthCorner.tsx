import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

export async function HealthCorner({ locale }: { locale: string }) {
  const t = await getTranslations("home.healthCorner");
  const tBlog = await getTranslations("blog");

  return (
    <Section className="bg-white">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-900)] text-balance">
                {t("title")}
              </h2>
              <p className="mt-3 text-[var(--color-muted)] text-base sm:text-lg text-pretty">{t("subtitle")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:gap-2.5 transition-all"
            >
              {tBlog("viewAll")}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </Container>
      <BlogPreviewSection locale={locale} blogBasePath="/blog" embedded />
    </Section>
  );
}
