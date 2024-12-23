import { expect, test } from "@playwright/test";
import { getLocators, isMobile } from "./helper";
import { gotoAndWait, preparePage } from "../helper";

test.beforeEach(async ({ page }) => {
  await gotoAndWait(page, "/");
});

test("ヘッダー", async ({ page }) => {
  const { header } = getLocators(page);

  // 最初はヘッダーが表示されていない
  await expect(header).not.toBeVisible();

  // 少しスクロールするとヘッダーが表示される
  await page.evaluate(() => window.scrollBy(0, 500));
  await expect(header).toBeVisible();

  // トップに戻るとヘッダーが非表示になる
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).not.toBeVisible();
});

test("ダウンロードボタン", async ({ page }) => {
  const { header, modal } = getLocators(page);

  // ファーストビューのダウンロードボタンでモーダルが表示される
  const downloadButton = page.getByTestId("first-view").getByRole("button", {
    name: "ダウンロード",
  });
  await downloadButton.scrollIntoViewIfNeeded();
  await downloadButton.click();
  await expect(modal).toContainText("VOICEVOX ダウンロード");

  // ヘッダーのダウンロードボタンでモーダルが表示される
  await page.getByRole("button", { name: "close" }).click();
  await page.evaluate(() => window.scrollBy(0, 500));
  if (isMobile(page)) await header.getByLabel("menu").click();
  const headerDownloadButton = header.getByRole("button", {
    name: "ダウンロード",
  });
  await headerDownloadButton.click();
  await expect(modal).toContainText("VOICEVOX ダウンロード");

  // モーダルの表示状態を確認
  await expect(page).toHaveScreenshot();

  await modal.getByRole("button", { name: "Mac" }).click();
  await expect(page).toHaveScreenshot();

  await modal.getByRole("button", { name: "Linux" }).click();
  await expect(page).toHaveScreenshot();

  // 利用規約に飛べる
  await modal.getByRole("button", { name: "利用規約", exact: true }).click();
  await expect(page).toHaveURL("/term/");
});

test.describe("キャラクターカード", () => {
  test("スタイル", async ({ page }) => {
    await preparePage(page);
    const styleChangeButton = page.getByLabel(
      "ずんだもんのサンプルボイスのスタイルを選択",
    );
    await styleChangeButton.scrollIntoViewIfNeeded();

    // スタイルを変更できる
    await expect(styleChangeButton).toContainText("ノーマル");
    await styleChangeButton.click();
    await expect(page).toHaveScreenshot();
    await page.getByRole("menu").getByText("ささやき").click();
    await expect(styleChangeButton).toContainText("ささやき");
    await styleChangeButton.click();
    await expect(page).toHaveScreenshot();
  });

  test("利用規約", async ({ page }) => {
    const { modal } = getLocators(page);
    await preparePage(page);

    // 利用規約モーダルを表示できる
    await page
      .getByText("ずんだもん", { exact: true })
      .scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "ずんだもん 利用規約" }).click();
    await expect(modal.locator("header")).toContainText("ずんだもん 利用規約");
    await expect(page).toHaveScreenshot();

    // 別のキャラクターの利用規約も表示できる
    await page.getByRole("button", { name: "close" }).click();
    await page
      .getByText("冥鳴ひまり", { exact: true })
      .scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "冥鳴ひまり 利用規約" }).click();
    await expect(modal.locator("header")).toContainText("冥鳴ひまり 利用規約");
    await expect(page).toHaveScreenshot();
  });
});
