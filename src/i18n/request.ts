import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { deepMergeMessages } from "./merge-messages";
import { loadSiteContent } from "@/lib/site-content";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const trMessages = (await import("../../messages/tr.json")).default;
  const enMessages = (await import("../../messages/en.json")).default;

  let messages: Record<string, unknown>;

  if (locale === "tr") {
    messages = trMessages as Record<string, unknown>;
  } else if (locale === "en") {
    messages = enMessages as Record<string, unknown>;
  } else {
    let partial: Record<string, unknown> = {};
    try {
      partial = (
        await import(`../../messages/${locale}.json`)
      ).default as Record<string, unknown>;
    } catch {
      partial = {};
    }
    messages = deepMergeMessages(
      enMessages as Record<string, unknown>,
      partial,
    );
  }

  const siteContent = await loadSiteContent();
  const patch =
    locale === "tr"
      ? siteContent.messageOverrides?.tr
      : siteContent.messageOverrides?.en;
  if (
    patch &&
    typeof patch === "object" &&
    !Array.isArray(patch) &&
    Object.keys(patch).length > 0
  ) {
    messages = deepMergeMessages(messages, patch as Record<string, unknown>);
  }

  return {
    locale,
    messages,
  };
});
