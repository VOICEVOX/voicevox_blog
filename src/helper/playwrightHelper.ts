import { test, type Page } from "playwright/test";

interface ResourceCount {
  total: number;
  completeCount: number;
}

/**
 * リソースの読み込みが完了するまで待機する。
 * ３秒間状態が変化しなければ読み込み完了とみなす。
 */
async function waitForResourcesWithTimeout(
  page: Page,
  evaluateCallback: () => ResourceCount,
  stepName: string,
) {
  const timeoutMs = 5000;
  const checkIntervalMs = 100;

  const executor = async () => {
    let previousCompleteCount = 0;
    let unchangedStartTime = Date.now();

    while (true) {
      const { total, completeCount } = await page.evaluate(evaluateCallback);
      if (completeCount === total) {
        break;
      }

      if (completeCount !== previousCompleteCount) {
        previousCompleteCount = completeCount;
        unchangedStartTime = Date.now();
      }

      if (Date.now() - unchangedStartTime >= timeoutMs) {
        break;
      }

      await page.waitForTimeout(checkIntervalMs);
    }
  };

  await executeWithStepRecording(stepName, executor);
}

/**
 * テスト中の場合はステップを記録する
 * NOTE: テスト外では `test.step` がエラーになる
 */
async function executeWithStepRecording(
  stepName: string,
  executor: () => Promise<void>,
) {
  try {
    await test.step(stepName, executor);
  } catch {
    await executor();
  }
}

/** ページ内の画像がすべて読み込まれるまで待機する */
export async function waitForImages(page: Page) {
  const imageEvaluateCallback = () => {
    const images = Array.from(document.images);
    return {
      total: images.length,
      completeCount: images.filter((img) => img.complete).length,
    };
  };

  await waitForResourcesWithTimeout(
    page,
    imageEvaluateCallback,
    "画像の読み込みが完了するまで待つ",
  );
}

/** 読み込み中属性を持つボタンがなくなるまで待機する */
export async function waitForAudios(page: Page) {
  const audioEvaluateCallback = () => {
    const loadingButtons = document.querySelectorAll("button[aria-busy]");
    return {
      total: 1,
      completeCount: loadingButtons.length === 0 ? 1 : 0,
    };
  };

  await waitForResourcesWithTimeout(
    page,
    audioEvaluateCallback,
    "音声の読み込みが完了するまで待つ",
  );
}

/** ページ内のフォントがすべて読み込まれるまで待機する */
export async function waitForFonts(page: Page) {
  const fontEvaluateCallback = () => {
    return {
      total: 1,
      completeCount: document.fonts.status === "loaded" ? 1 : 0,
    };
  };

  await waitForResourcesWithTimeout(
    page,
    fontEvaluateCallback,
    "フォントの読み込みが完了するまで待つ",
  );
}
