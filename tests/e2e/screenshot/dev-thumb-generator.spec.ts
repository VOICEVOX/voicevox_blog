import { gotoAndWait } from "../helper";
import { characterEntries, characterKeys } from "@/constants/characterEntry";
import { waitForFonts, waitForImages } from "@/helper/playwrightHelper";
import { expect, test } from "@playwright/test";

test.describe("dev/thumb_generator", () => {
  test.skip(
    ({ isMobile }) => isMobile,
    "固定サイズのサムネイル生成ページのためモバイル環境ではテストしない",
  );

  const characterEntry = characterEntries[characterKeys[0]];

  test("product", async ({ page }) => {
    // `pnpm run generateThumb` と同じ表示サイズに揃える
    await page.setViewportSize({ width: 1200, height: 630 });
    await gotoAndWait(
      page,
      `/dev/thumb_generator/product/${characterEntry.id}/`,
    );
    await waitForImages(page);
    await waitForFonts(page);

    await expect(page).toHaveScreenshot();
  });

  test("dormitory", async ({ page }) => {
    // `pnpm run generateThumb` と同じ表示サイズに揃える
    await page.setViewportSize({ width: 1400, height: 1000 });
    await gotoAndWait(
      page,
      `/dev/thumb_generator/dormitory/${characterEntry.id}/`,
    );
    await waitForImages(page);
    await waitForFonts(page);

    await expect(page.getByTestId("dormitory-character-card")).toHaveScreenshot(
      {
        omitBackground: true,
      },
    );
  });
});
