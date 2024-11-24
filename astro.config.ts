import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

export default defineConfig({
  integrations: [
    mdx(),
    sitemap(),
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"], // for `gtag`
      },
    }),
  ],

  site: "https://voicevox.hiroshiba.jp",

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true, // Bulmaの警告を抑制
        },
      },
    },
  },

  devToolbar: {
    enabled: false,
  },
});
