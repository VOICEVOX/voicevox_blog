import { test, type Page } from "playwright/test";

/** Playwright内で画像の読み込みが完了するまで待つ */
export async function waitForImages(page: Page) {
  const executor = async () => {
    // ページ内の画像がすべて読み込まれるまで待機する。
    // 3秒間画像の読み込みが変化しなければ読み込み完了とみなす。
    let previousCompleteCount = 0;
    let unchangedStartTime = Date.now();

    while (true) {
      const { total, completeCount } = await page.evaluate(() => {
        const images = Array.from(document.images);
        return {
          total: images.length,
          completeCount: images.filter((img) => img.complete).length,
        };
      });

      if (completeCount == total) {
        break;
      }

      if (completeCount != previousCompleteCount) {
        previousCompleteCount = completeCount;
        unchangedStartTime = Date.now();
      }

      if (Date.now() - unchangedStartTime >= 3000) {
        break;
      }

      await page.waitForTimeout(100);
    }
  };

  // テスト中の場合はステップを記録する
  // NOTE: テスト外では `test.step` がエラーになる
  try {
    await test.step("画像の読み込みが完了するまで待つ", executor);
  } catch {
    await executor();
  }
}
