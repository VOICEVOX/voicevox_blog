import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [mdx(), sitemap(), react()],

  site: "https://voicevox.hiroshiba.jp",

  devToolbar: {
    enabled: false,
  },
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
