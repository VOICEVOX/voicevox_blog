import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import remarkPrefixBaseUrl from "./plugins/remark/prefixBaseUrl";

const site = process.env.NETLIFY
  ? process.env.DEPLOY_URL
  : "https://voicevox.hiroshiba.jp";

export default defineConfig({
  site,

  markdown: {
    syntaxHighlight: false, // 使い方の途中とかに小さいコードブロックがあるだけなのでハイライトは無い方が良い
    remarkPlugins: [
      [remarkPrefixBaseUrl, { baseUrl: site }],
    ],
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/dev/"),
    }),
    react(),
    /*
    // ClientRouter を使う場合gtagがうまく動かない。ページの移動のたびにロードされてしまう。
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
