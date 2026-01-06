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

/** 少しずつスクロールする */
export async function progressiveScroll(
  page: Page,
  callback?: () => Promise<void>,
  options?: { fromBottom?: boolean },
) {
  const fromBottom = options?.fromBottom ?? false;
  const direction = fromBottom ? "上" : "下";

  await test.step(`一番${direction}まで少しずつスクロールする`, async () => {
    let isAtEnd = false;
    for (let i = 0; i < 50; i++) {
      await callback?.();

      const currentPosition = await page.evaluate(() => window.scrollY);
      const scrollDelta = fromBottom
        ? -(window.innerHeight - 100)
        : window.innerHeight - 100; // 100pxだけオーバーラップさせる
      await page.evaluate((delta) => window.scrollBy(0, delta), scrollDelta);
      const newPosition = await page.evaluate(() => window.scrollY);
      if (currentPosition === newPosition) {
        isAtEnd = true;
        break;
      }
    }
    expect(isAtEnd).toBeTruthy();
  });
}

export async function preparePage(
  page: Page,
  options?: { fromBottom?: boolean },
) {
  const fromBottom = options?.fromBottom ?? false;
  const destination = fromBottom ? "最下部" : "トップ";

  await test.step(
    `最初に全部表示してリソースを読み込んで${destination}に移動する`,
    async () => {
      await progressiveScroll(page, async () => {
        await page.waitForTimeout(10); // 画像の読み込みリクエストが走るのを待つ
      });
      await waitForImages(page);
      await waitForAudios(page);
      const scrollY = fromBottom ? document.body.scrollHeight : 0;
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    },
  );
}
