import { gotoAndWait } from "../../helper";
import { takeScreenshots } from "../../screenshot/helper";
import { test } from "@playwright/test";

test.describe("dev/ui/base", () => {
  test("index", async ({ page }) => {
    await gotoAndWait(page, "/dev/ui/base/");
    await takeScreenshots(page);
  });

  test("dark", async ({ page }) => {
    await gotoAndWait(page, "/dev/ui/base/dark/");
    await takeScreenshots(page);
  });

  test("nemo", async ({ page }) => {
    await gotoAndWait(page, "/dev/ui/base/nemo/");
    await takeScreenshots(page);
  });
});
