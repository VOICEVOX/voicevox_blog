import { test } from "@playwright/test";
import { takeScreenshots } from "./helper";
import { gotoAndWait } from "../helper";

test.describe("screenshots", () => {
  test("talk", async ({ page }) => {
    await gotoAndWait(page, "/");

    // <video> の controls が差異になってしまうので削除する
    await page.evaluate(() => {
      document.querySelectorAll("video").forEach((video) => {
        video.removeAttribute("controls");
      });
    });

    await takeScreenshots(page);
  });

  test("song", async ({ page }) => {
    await gotoAndWait(page, "/song/");
    await takeScreenshots(page);
  });

  test("dormitory", async ({ page }) => {
    await gotoAndWait(page, "/dormitory/");
    await takeScreenshots(page);
  });

  test("dormitory call_names", async ({ page }) => {
    await gotoAndWait(page, "/dormitory/call_names/");
    await takeScreenshots(page);
  });

  test("nemo", async ({ page }) => {
    await gotoAndWait(page, "/nemo/");
    await takeScreenshots(page);
  });

  test("nemo term", async ({ page }) => {
    await gotoAndWait(page, "/nemo/term/b");
    await takeScreenshots(page);
  });

  test("how_to_use", async ({ page }) => {
    await gotoAndWait(page, "/how_to_use/");
    await takeScreenshots(page);
  });

  test("term", async ({ page }) => {
    await gotoAndWait(page, "/term/");
    await takeScreenshots(page);
  });

  test("qa", async ({ page }) => {
    await gotoAndWait(page, "/qa/");
    await takeScreenshots(page);
  });

  test("update_history", async ({ page }) => {
    await gotoAndWait(page, "/update_history/");
    await takeScreenshots(page);
  });
});
