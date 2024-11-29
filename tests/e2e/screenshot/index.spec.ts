import { test } from "@playwright/test";
import { takeScreenshots } from "./helper";

test.describe("screenshots", () => {
  test("talk", async ({ page }) => {
    await page.goto("/");
    await takeScreenshots(page);
  });

  test("song", async ({ page }) => {
    await page.goto("/song/");
    await takeScreenshots(page);
  });

  test("dormitory", async ({ page }) => {
    await page.goto("/dormitory/");
    await takeScreenshots(page);
  });

  test("nemo", async ({ page }) => {
    await page.goto("/nemo/");
    await takeScreenshots(page);
  });

  test("how_to_use", async ({ page }) => {
    await page.goto("/how_to_use/");
    await takeScreenshots(page);
  });

  test("term", async ({ page }) => {
    await page.goto("/term/");
    await takeScreenshots(page);
  });

  test("qa", async ({ page }) => {
    await page.goto("/qa/");
    await takeScreenshots(page);
  });

  test("update_history", async ({ page }) => {
    await page.goto("/update_history/");
    await takeScreenshots(page);
  });
});
