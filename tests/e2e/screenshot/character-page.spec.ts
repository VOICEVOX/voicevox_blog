import { test } from "@playwright/test";
import { characterKeys, characterEntries } from "@/constants/characterEntry";
import {
  getDormitoryCharacterPageUrl,
  getProductPageUrl,
} from "@/constants/url";
import { takeScreenshots } from "./helper";

characterKeys.forEach((characterKey) => {
  const characterEntry = characterEntries[characterKey];
  const characterId = characterEntry.id;
  test.describe(`${characterId}`, () => {
    test("product", async ({ page }) => {
      await page.goto(getProductPageUrl(characterEntry));
      await takeScreenshots(page);
    });

    test("dormitory profile", async ({ page }) => {
      await page.goto(getDormitoryCharacterPageUrl(characterEntry, "profile"));
      await takeScreenshots(page);
    });

    test("dormitory calls", async ({ page }) => {
      await page.goto(getDormitoryCharacterPageUrl(characterEntry, "calls"));
      await takeScreenshots(page);
    });
  });
});
