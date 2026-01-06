import { preparePage, progressiveScroll } from "../helper";
import test, { expect, type Page } from "playwright/test";

export async function takeScreenshots(
  page: Page,
  options?: { fromBottom?: boolean },
) {
  const fromBottom = options?.fromBottom ?? false;
  const direction = fromBottom ? "下から" : "上から";

  await test.step(
    `スクリーンショットを${direction}撮ってスクロールしてを繰り返す`,
    async () => {
      await preparePage(page, { fromBottom });

      await progressiveScroll(
        page,
        async () => {
          await expect(page).toHaveScreenshot();
        },
        { fromBottom },
      );
    },
  );
}
