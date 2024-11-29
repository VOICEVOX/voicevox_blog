import { expect, type Page } from "playwright/test";
import { waitForAudios, waitForImages } from "@helper";

/** 一番下まで少しずつスクロールする */
async function progressiveScroll(page: Page, callback?: () => Promise<void>) {
  let isAtBottom = false;
  for (let i = 0; i < 50; i++) {
    await callback?.();

    const currentPosition = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => window.scrollBy(0, window.innerHeight - 100)); // 100pxだけオーバーラップさせる
    const newPosition = await page.evaluate(() => window.scrollY);
    if (currentPosition === newPosition) {
      isAtBottom = true;
      break;
    }
  }
  expect(isAtBottom).toBeTruthy();
}

/** スクリーンショットを撮ってスクロールしてを繰り返す */
export async function takeScreenshots(page: Page) {
  // 最初に全部表示してリソースを読み込む
  await progressiveScroll(page);
  await waitForImages(page);
  await waitForAudios(page);

  // 最初からスクリーンショットを撮っていく
  await page.evaluate(() => window.scrollTo(0, 0));
  await progressiveScroll(page, async () => {
    await expect(page).toHaveScreenshot();
  });
}
