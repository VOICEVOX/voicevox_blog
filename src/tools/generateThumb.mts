/**
 * サムネイル画像を生成する
 */

import { characterKeys, characterEntries } from "@constants/characterEntry";
import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const imageDir = path.resolve(process.cwd(), "src", "constants");

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1200, height: 630 },
});
const page = await context.newPage();

// キャラクターごとの製品ページ
for (const key of characterKeys) {
  const savePath = path.join(
    imageDir,
    "product-share-images",
    `thumb-${characterEntries[key].id}.png`,
  );
  if (fs.existsSync(savePath)) {
    continue;
  }

  console.log(`Generating ${savePath}`);

  await page.goto(
    `http://localhost:4321/dev/thumb_generator/product/${characterEntries[key].id}/`,
    { waitUntil: "load" },
  );
  await page.screenshot({ path: savePath });
}

await browser.close();
