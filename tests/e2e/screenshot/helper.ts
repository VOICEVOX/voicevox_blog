import { expect, type Page } from "playwright/test";
import { preparePage, progressiveScroll } from "../helper";

/** スクリーンショットを撮ってスクロールしてを繰り返す */
export async function takeScreenshots(page: Page) {
  await preparePage(page);

  // 最初からスクリーンショットを撮っていく
  await progressiveScroll(page, async () => {
    await expect(page).toHaveScreenshot();
  });
}
