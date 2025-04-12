import { gotoAndWait } from "../helper";
import { getLocators, isMobile } from "./helper";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await gotoAndWait(page, "/song/");
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
    if (isMobile(page)) await header.getByLabel("menu").click();
    const headerDownloadButton = header.getByRole("button", {
      name: "ダウンロード",
    });
    await headerDownloadButton.click();
    await expect(modal).toContainText("VOICEVOX ダウンロード");
  });
});
