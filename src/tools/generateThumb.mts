/**
 * サムネイル画像を生成する
 */
import { characterKeys, characterEntries } from "@/constants/characterEntry";
import { waitForImages } from "@/helper";
import fs from "fs";
import path from "path";
import { chromium } from "playwright";
import { type Page } from "playwright/test";

const imageDir = path.resolve(process.cwd(), "src", "assets");

const browser = await chromium.launch();
let page: Page;

/** Promiseがエラーになったら少し待ってからリトライする */
async function retry<T>(fn: () => Promise<T>, count: number = 5): Promise<T> {
  let error;
  for (let i = 0; i < count; i++) {
    try {
      return await fn();
    } catch (e) {
      error = e;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw error;
}

// キャラクターごとの製品ページ
page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
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

  await retry(async () => {
    await page.goto(
      `http://localhost:4321/dev/thumb_generator/product/${characterEntries[key].id}/`,
      { waitUntil: "load" },
    );
    await waitForImages(page);
    await page.screenshot({ path: savePath });
  });
}

// キャラクターごとのボイボ寮ページ
page = await browser.newPage({
  viewport: { width: 1400, height: 1000 }, // ヘッダーとかがあるので少し大きめに
  deviceScaleFactor: 1200 / 800, // 800pxで表示されるので1200pxに拡大
});
for (const key of characterKeys) {
  const savePath = path.join(
    imageDir,
    "dormitory-share-images",
    `dormitory-thumb-${characterEntries[key].id}.png`,
  );
  if (fs.existsSync(savePath)) {
    continue;
  }

  console.log(`Generating ${savePath}`);

  await retry(async () => {
    await page.goto(
      `http://localhost:4321/dev/thumb_generator/dormitory/${characterEntries[key].id}/`,
      { waitUntil: "load" },
    );
    await waitForImages(page);

    const target = page.locator(".dormitory-character").locator(".box");
    await target.screenshot({ path: savePath, omitBackground: true });
  });
}

await browser.close();
