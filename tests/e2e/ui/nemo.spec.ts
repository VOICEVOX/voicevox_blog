import { expect, test } from "@playwright/test";
import { getLocators, isMobile } from "./helper";
import { gotoAndWait } from "../helper";

test.beforeEach(async ({ page }) => {
  await gotoAndWait(page, "/nemo/");
});

test("ダウンロードボタン", async ({ page }) => {
  const { header, modal } = getLocators(page);

  // ファーストビューのダウンロードボタンでモーダルが表示される
  const downloadButton = page.getByTestId("first-view").getByRole("button", {
    name: "ダウンロード",
  });
  await downloadButton.scrollIntoViewIfNeeded();
  await downloadButton.click();
  await expect(modal).toContainText("VOICEVOX Nemo ご利用案内");

  // ヘッダーのダウンロードボタンでモーダルが表示される
  await page.getByRole("button", { name: "close" }).click();
  if (isMobile(page)) await header.getByLabel("menu").click();
  const headerDownloadButton = header.getByRole("button", {
    name: "ダウンロード",
  });
  await headerDownloadButton.click();
  await expect(modal).toContainText("VOICEVOX Nemo ご利用案内");

  // モーダルの表示状態を確認
  await expect(page).toHaveScreenshot();

  await modal
    .getByRole("button", { name: "VOICEVOX ダウンロード", exact: true })
    .click();
  await expect(modal).toHaveCount(2); // モーダルが２つ開かれてる
  await expect(page).toHaveScreenshot();

  await modal
    .locator("header")
    .filter({ hasText: "VOICEVOX ダウンロード" })
    .getByLabel("close")
    .click();
  await expect(modal).toHaveCount(1);

  await modal
    .getByRole("button", { name: "Nemo エンジン ダウンロード", exact: true })
    .click();
  await expect(modal).toHaveCount(2); // モーダルが２つ開かれてる
  await expect(page).toHaveScreenshot();
});

test("利用規約", async ({ page }) => {
  const { modal } = getLocators(page);

  // 利用規約モーダルを表示できる
  await page.getByRole("button", { name: "利用規約", exact: true }).click();
  await expect(page).toHaveScreenshot();

  // 利用規約を表示できる
  await modal.getByRole("link", { name: "利用規約", exact: true }).click();
  await expect(page).toHaveURL("/nemo/term/");
});
