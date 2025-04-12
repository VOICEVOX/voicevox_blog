import { gotoAndWait } from "../helper";
import { getLocators, isMobile } from "./helper";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await gotoAndWait(page, "/nemo/");
});

test("ダウンロードボタン", async ({ page }) => {
  const { header, modal } = getLocators(page);

  await test.step("ファーストビューのダウンロードボタンでモーダルが表示される", async () => {
    const downloadButton = page.getByTestId("first-view").getByRole("button", {
      name: "ダウンロード",
    });
    await downloadButton.scrollIntoViewIfNeeded();
    await downloadButton.click();
    await expect(modal).toContainText("VOICEVOX Nemo ご利用案内");
  });

  await test.step("モーダルを閉じれる", async () => {
    await page.getByRole("button", { name: "close" }).click();
    await expect(modal).toHaveCount(0);
  });

  await test.step("ヘッダーのダウンロードボタンで１つ目のモーダルが表示される", async () => {
    if (isMobile(page)) await header.getByLabel("menu").click();
    const headerDownloadButton = header.getByRole("button", {
      name: "ダウンロード",
    });
    await headerDownloadButton.click();
    await expect(modal).toContainText("VOICEVOX Nemo ご利用案内");
    await expect(page).toHaveScreenshot();
  });

  await test.step("モーダル内のVOICEVOXダウンロードボタンで２つ目のモーダルが表示される", async () => {
    await modal
      .getByRole("button", { name: "VOICEVOX ダウンロード", exact: true })
      .click();
    await expect(modal).toHaveCount(2);
    await expect(page).toHaveScreenshot();
  });

  await test.step("２つ目のモーダルを閉じれる", async () => {
    await modal
      .locator("header")
      .filter({ hasText: "VOICEVOX ダウンロード" })
      .getByLabel("close")
      .click();
    await expect(modal).toHaveCount(1);
  });

  await test.step("モーダル内のNemoエンジンダウンロードボタンで２つ目のモーダルが表示される", async () => {
    await modal
      .getByRole("button", { name: "Nemo エンジン ダウンロード", exact: true })
      .click();
    await expect(modal).toHaveCount(2);
    await expect(page).toHaveScreenshot();
  });
});

test("利用規約", async ({ page }) => {
  const { modal } = getLocators(page);

  await test.step("利用規約モーダルを表示できる", async () => {
    await page.getByRole("button", { name: "利用規約", exact: true }).click();
    await expect(modal).toHaveCount(1);
    await expect(page).toHaveScreenshot();
  });

  await test.step("利用規約を表示できる", async () => {
    await modal.getByRole("link", { name: "利用規約", exact: true }).click();
    await expect(page).toHaveURL("/nemo/term/");
  });
});
