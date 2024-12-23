import { expect, test } from "@playwright/test";
import { getLocators, isMobile } from "./helper";
import { gotoAndWait } from "../helper";

test.beforeEach(async ({ page }) => {
  await gotoAndWait(page, "/song/");
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
  if (isMobile(page)) await header.getByLabel("menu").click();
  const headerDownloadButton = header.getByRole("button", {
    name: "ダウンロード",
  });
  await headerDownloadButton.click();
  await expect(modal).toContainText("VOICEVOX ダウンロード");
});
