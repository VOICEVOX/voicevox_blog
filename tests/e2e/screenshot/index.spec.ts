import { test } from "@playwright/test";
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
async function takeScreenshots(page: Page) {
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

test.describe("screenshots", () => {
  test("talk", async ({ page }) => {
    await page.goto("/");
    await takeScreenshots(page);
  });

  test("song", async ({ page }) => {
    await page.goto("/song/");
    await takeScreenshots(page);
  });

  test("dormitory", async ({ page }) => {
    await page.goto("/dormitory/");
    await takeScreenshots(page);
  });

  test("nemo", async ({ page }) => {
    await page.goto("/nemo/");
    await takeScreenshots(page);
  });

  test("how_to_use", async ({ page }) => {
    await page.goto("/how_to_use/");
    await takeScreenshots(page);
  });

  test("term", async ({ page }) => {
    await page.goto("/term/");
    await takeScreenshots(page);
  });

  test("qa", async ({ page }) => {
    await page.goto("/qa/");
    await takeScreenshots(page);
  });

  test("update_history", async ({ page }) => {
    await page.goto("/update_history/");
    await takeScreenshots(page);
  });
});
