import { preparePage, progressiveScroll } from "../helper";
import test, { expect, type Page } from "playwright/test";

export async function takeScreenshots(page: Page) {
  await test.step("スクリーンショットを撮ってスクロールしてを繰り返す", async () => {
    await preparePage(page);

    // 最初からスクリーンショットを撮っていく
    await progressiveScroll(page, async () => {
      await expect(page).toHaveScreenshot();
    });
  });
}
