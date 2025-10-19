import { gotoAndWait, preparePage } from "../helper";
import { getLocators, isMobile } from "./helper";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await gotoAndWait(page, "/");
});

test("ヘッダー", async ({ page }) => {
  const { header } = getLocators(page);

  await test.step("最初はヘッダーが表示されていない", async () => {
    await expect(header).not.toBeVisible();
  });

  await test.step("少しスクロールするとヘッダーが表示される", async () => {
    await page.evaluate(() => window.scrollBy(0, 500));
    await expect(header).toBeVisible();
  });

  await test.step("トップに戻るとヘッダーが非表示になる", async () => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).not.toBeVisible();
  });
});

test("ダウンロードボタン", async ({ page }) => {
  const { header, modal } = getLocators(page);

  await test.step("ファーストビューのダウンロードボタンでモーダルが表示される", async () => {
    const downloadButton = page.getByTestId("first-view").getByRole("button", {
      name: "ダウンロード",
    });
    await downloadButton.scrollIntoViewIfNeeded();
    await downloadButton.click();
    await expect(modal).toContainText("VOICEVOX ダウンロード");
  });

  await test.step("モーダルを閉じれる", async () => {
    await page.getByRole("button", { name: "close" }).click();
  });

  await test.step("ヘッダーのダウンロードボタンでモーダルが表示される", async () => {
    await page.evaluate(() => window.scrollBy(0, 500));
    if (isMobile(page)) await header.getByLabel("menu").click();
    const headerDownloadButton = header.getByRole("button", {
      name: "ダウンロード",
    });
    await headerDownloadButton.click();
    await expect(modal).toContainText("VOICEVOX ダウンロード");
  });

  await test.step("モーダルの表示状態を確認", async () => {
    await expect(page).toHaveScreenshot();

    await modal.getByRole("button", { name: "Mac" }).click();
    await expect(page).toHaveScreenshot();

    await modal.getByRole("button", { name: "Linux" }).click();
    await expect(page).toHaveScreenshot();
  });

  await test.step("利用規約に飛べる", async () => {
    await modal.getByRole("link", { name: "利用規約", exact: true }).click();
    await expect(page).toHaveURL("/term/");
  });
});

test.describe("キャラクターカード", () => {
  test("スタイル", async ({ page }) => {
    await preparePage(page);

    await test.step("スタイルを変更できる", async () => {
      const styleChangeButton = page.getByLabel(
        "ずんだもんのサンプルボイスのスタイルを選択",
      );
      await styleChangeButton.scrollIntoViewIfNeeded();

      await expect(styleChangeButton).toContainText("ノーマル");
      await styleChangeButton.click();
      await expect(page).toHaveScreenshot();
      await page.getByRole("menu").getByText("ささやき").click();
      await expect(styleChangeButton).toContainText("ささやき");
      await styleChangeButton.click();
      await expect(page).toHaveScreenshot();
    });
  });

  test("利用規約", async ({ page }) => {
    const { modal } = getLocators(page);
    await preparePage(page);

    await test.step("利用規約モーダルを表示できる", async () => {
      await page
        .getByText("ずんだもん", { exact: true })
        .scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: "ずんだもん 利用規約" }).click();
      await expect(modal.locator("header")).toContainText(
        "ずんだもん 利用規約",
      );
      await expect(page).toHaveScreenshot();
    });

    await test.step("モーダルを閉じれる", async () => {
      await page.getByRole("button", { name: "close" }).click();
    });

    await test.step("別のキャラクターの利用規約も表示できる", async () => {
      await page
        .getByText("冥鳴ひまり", { exact: true })
        .scrollIntoViewIfNeeded();
      await page.getByRole("button", { name: "冥鳴ひまり 利用規約" }).click();
      await expect(modal.locator("header")).toContainText(
        "冥鳴ひまり 利用規約",
      );
      await expect(page).toHaveScreenshot();
    });
  });
});
