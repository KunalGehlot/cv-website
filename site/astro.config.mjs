// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gehlot.site",
  base: "/",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // The root only redirects to /en/, and the 404 is not a page to find.
      filter: (page) => page !== "https://gehlot.site/" && !page.includes("/404"),
      i18n: { defaultLocale: "en", locales: { en: "en", de: "de" } },
    }),
  ],
  devToolbar: {
    enabled: false,
  },
});
