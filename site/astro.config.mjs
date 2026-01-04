// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://gehlot.site",
  base: "/",
  trailingSlash: "always",
  devToolbar: {
    enabled: false,
  },
});
