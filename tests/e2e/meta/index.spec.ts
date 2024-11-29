import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { buffer } from "node:stream/consumers";
import path from "node:path";

const sitemapPath = path.join(
  import.meta.dirname,
  "../../../dist/sitemap-0.xml",
);
const xmlText = fs.readFileSync(sitemapPath, "utf-8");
const pagePaths = Array.from(
  xmlText.matchAll(/<loc>(.*?)<\/loc>/g),
  (match) => new URL(match[1]).pathname,
);

test.describe("http meta", () => {
  for (const pathname of pagePaths) {
    test(pathname, async ({ baseURL }) => {
      const http = await fetch(baseURL + pathname).then((res) => res.text());

      // メタ情報のテスト
      let metaText = "";

      const canonicalUrl = http.match(
        /<link rel="canonical" href="(.*?)"/,
      )?.[1];
      metaText += `canonicalUrl: ${canonicalUrl}\n`;

      const title = http.match(/<title>(.*?)<\/title>/)?.[1];
      metaText += `title: ${title}\n`;

      const description = http.match(
        /<meta name="description" content="(.*?)"/,
      )?.[1];
      metaText += `description: ${description}\n`;

      expect(metaText).toMatchSnapshot();

      // og:imageのテスト
      const ogImageUrl = http.match(
        /<meta property="og:image" content="(.*?)"/,
      )?.[1];
      if (ogImageUrl != undefined) {
        // 相対パスになっているものとURLになっているものがある
        const ogImagePathname = ogImageUrl.startsWith("/")
          ? ogImageUrl
          : new URL(ogImageUrl).pathname;
        const ogImage = await fetch(baseURL + ogImagePathname)
          .then((res) => res.body)
          .then((body) => buffer(body!));
        expect(ogImage).toMatchSnapshot(
          `share${pathname.replaceAll("/", "-")}.webp`,
        );
      }
    });
  }
});
