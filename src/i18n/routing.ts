// ================================================================
// StudentOS — i18n Routing Configuration
// Defines supported locales and default locale
// ================================================================

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bn"],
  defaultLocale: "en",
  localePrefix: "as-needed", // Only show prefix for non-default locale
});
