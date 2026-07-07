import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr"],
  defaultLocale: "tr",
  localePrefix: {
    mode: "as-needed",
  },
});

export type Locale = (typeof routing.locales)[number];
