// @ts-check
import { defineConfig } from "astro/config";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isProjectPages = !!repo && !repo.endsWith(".github.io");

export default defineConfig({
  site: "https://kunalgehlot.github.io",
  base: isProjectPages ? `/${repo}` : "/",
  trailingSlash: "always",
  devToolbar: {
    enabled: false,
  },
});
