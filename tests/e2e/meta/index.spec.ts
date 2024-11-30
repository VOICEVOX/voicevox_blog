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
      const metaInfo = {} as Record<string, string | undefined>;

      metaInfo.canonicalUrl = http.match(
        /<link rel="canonical" href="(.*?)"/,
      )?.[1];

      metaInfo.title = http.match(/<title>(.*?)<\/title>/)?.[1];

      metaInfo.description = http.match(
        /<meta name="description" content="(.*?)"/,
      )?.[1];

      expect(JSON.stringify(metaInfo, null, 2)).toMatchSnapshot();

      // og:imageのテスト
      const ogImageUrl = http.match(
        /<meta property="og:image" content="(.*?)"/,
      )?.[1];
      if (ogImageUrl != undefined) {
        // 相対パスになっているものとURLになっているものがあるので両方に対応
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

test("末尾スラッシュがないURLは末尾スラッシュと同じcanonicalUrlを持つ", async ({
  baseURL,
}) => {
  const http = await fetch(baseURL + "/song").then((res) => res.text());
  const canonicalUrl = http.match(/<link rel="canonical" href="(.*?)"/)?.[1];
  expect(new URL(canonicalUrl!).pathname).toBe("/song/");
});
