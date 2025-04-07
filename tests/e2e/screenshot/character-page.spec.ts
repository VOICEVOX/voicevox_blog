import { gotoAndWait } from "../helper";
import { takeScreenshots } from "./helper";
import {
  characterKeys,
  characterEntries,
  type CharacterKey,
} from "@/constants/characterEntry";
import {
  getDormitoryCharacterPageUrl,
  getProductPageUrl,
} from "@/constants/url";
import { test } from "@playwright/test";

async function runCharacterPageTests(
  characterKey: CharacterKey,
  testName: string,
) {
  const characterEntry = characterEntries[characterKey];

  test.describe(testName, () => {
    test("product", async ({ page }) => {
      await gotoAndWait(page, getProductPageUrl(characterEntry));
      await takeScreenshots(page);
    });

    test("dormitory profile", async ({ page }) => {
      await gotoAndWait(
        page,
        getDormitoryCharacterPageUrl(characterEntry, "profile"),
      );
      await takeScreenshots(page);
    });

    test("dormitory calls", async ({ page }) => {
      await gotoAndWait(
        page,
        getDormitoryCharacterPageUrl(characterEntry, "calls"),
      );
      await takeScreenshots(page);
    });
  });
}

// 最初のキャラクター
const firstCharacterKey = characterKeys[0];
runCharacterPageTests(firstCharacterKey, "first");

// 最後のキャラクター
const lastCharacterKey = characterKeys[characterKeys.length - 1];
runCharacterPageTests(lastCharacterKey, "last");
