import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [mdx(), sitemap()],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true, // Bulmaの警告を抑制
        },
      },
    },
  },
});
