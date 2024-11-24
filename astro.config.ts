import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

const site = process.env.NETLIFY
  ? process.env.DEPLOY_URL
  : "https://voicevox.hiroshiba.jp";

export default defineConfig({
  site,

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
