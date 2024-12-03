import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

const site = process.env.NETLIFY
  ? process.env.DEPLOY_URL
  : "https://voicevox.hiroshiba.jp";

export default defineConfig({
  site,

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/dev/"),
    }),
    react(),
    /*
    // ViewTransitions を使う場合gtagがうまく動かない。ページの移動のたびにロードされてしまう。
    partytown({
      config: {
        forward: ["dataLayer.push"], // for `gtag`
      },
    }),
    */
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
