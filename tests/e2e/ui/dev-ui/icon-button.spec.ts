import { gotoAndWait } from "../../helper";
import { takeScreenshots } from "../../screenshot/helper";
import { test } from "@playwright/test";

test.describe("dev/ui/icon-button", () => {
  test("default", async ({ page }) => {
    await gotoAndWait(page, "/dev/ui/icon-button/");
    await takeScreenshots(page);
  });
});
