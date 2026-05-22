import { gotoAndWait } from "../helper";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await gotoAndWait(page, "/qa/");
});

test("検索", async ({ page }) => {
  const searchBox = page.getByRole("searchbox", { name: "検索" });
  const resultLink = page.getByRole("link", {
    name: /Q\. 金銭的な支援は受け付けていますか？/,
  });

  await test.step("検索ワードを入力すると検索結果が表示される", async () => {
    await searchBox.fill("金銭的な支援");
    await expect(page.getByRole("heading", { name: /検索結果/ })).toBeVisible();
    await expect(resultLink).toBeVisible();
  });

  await test.step("検索結果を選ぶと質問へ移動する", async () => {
    await resultLink.click();
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: "Q. 金銭的な支援は受け付けていますか？",
      }),
    ).toBeInViewport();
  });

  await test.step("検索ワードを消去すると検索結果が消える", async () => {
    await page.getByRole("button", { name: "検索ワードを消去" }).click();
    await expect(searchBox).toHaveValue("");
    await expect(
      page.getByRole("heading", { name: /検索結果/ }),
    ).not.toBeVisible();
  });
});
