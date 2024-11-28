import { test } from "@playwright/test";
import { expect, type Page } from "playwright/test";
import { waitForAudios, waitForImages } from "@helper";
import { characterKeys, characterEntries } from "@/constants/characterEntry";
import {
  getDormitoryCharacterPageUrl,
  getProductPageUrl,
} from "@/constants/url";

/** スクリーンショットを撮る */
async function takeScreenshot(page: Page) {
  await waitForImages(page);
  await waitForAudios(page);
  await expect(page).toHaveScreenshot();
}

characterKeys.forEach((characterKey) => {
  const characterEntry = characterEntries[characterKey];
  const characterId = characterEntry.id;
  test.describe(`${characterId}`, () => {
    test("product", async ({ page }) => {
      await page.goto(getProductPageUrl(characterEntry));
      await takeScreenshot(page);
    });

    test("dormitory profile", async ({ page }) => {
      await page.goto(getDormitoryCharacterPageUrl(characterEntry, "profile"));
      await takeScreenshot(page);
    });

    test("dormitory calls", async ({ page }) => {
      await page.goto(getDormitoryCharacterPageUrl(characterEntry, "calls"));
      await takeScreenshot(page);
    });
  });
});
