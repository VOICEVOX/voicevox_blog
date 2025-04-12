import { test, type Page } from "playwright/test";

/** Playwright内で画像の読み込みが完了するまで待つ */
export async function waitForImages(page: Page) {
  await test.step("画像の読み込みが完了するまで待つ", async () => {
    await page.waitForFunction(() =>
      Array.from(document.images).every((img) => img.complete),
    );
  });
}

/** Playwright内で音声の読み込みが完了するまで待つ */
export async function waitForAudios(page: Page) {
  await test.step("音声の読み込みが完了するまで待つ", async () => {
    // 読み込み中クラスがあるボタンが存在しないことを確認する
    await page.waitForFunction(() =>
      Array.from(document.querySelectorAll(".is-loading")).every(
        (element) => !(element instanceof HTMLButtonElement),
      ),
    );
  });
}
