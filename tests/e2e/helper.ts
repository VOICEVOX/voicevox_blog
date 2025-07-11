import { waitForImages, waitForAudios } from "@/helper/playwrightHelper";
import { expect, type Page, test } from "playwright/test";

export async function gotoAndWait(
  page: Page,
  url: string,
  timeout: number = 10,
) {
  await test.step("ページを読み込んで少し待つ", async () => {
    await page.goto(url);
    await page.waitForTimeout(timeout);
  });
}

/** 一番下まで少しずつスクロールする */
export async function progressiveScroll(
  page: Page,
  callback?: () => Promise<void>,
) {
  await test.step("一番下まで少しずつスクロールする", async () => {
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
  });
}

export async function preparePage(page: Page) {
  await test.step("最初に全部表示してリソースを読み込んでトップに戻る", async () => {
    await progressiveScroll(page, async () => {
      await page.waitForTimeout(10); // 画像の読み込みリクエストが走るのを待つ
    });
    await waitForImages(page);
    await waitForAudios(page);
    await page.evaluate(() => window.scrollTo(0, 0));
  });
}
