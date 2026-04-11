/**
 * dev/showcaseのVRTテスト。
 * 一覧ページ（showcaseRoot直下のindex.astro）は対象外。
 * サブディレクトリ配下の個別コンポーネントページのみ収集する。
 */

import { gotoAndWait } from "../helper";
import { takeScreenshots } from "./helper";
import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const showcaseRoot = path.join(
  import.meta.dirname,
  "../../../src/pages/dev/showcase",
);

function collectAstroFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectAstroFiles(fullPath));
    } else if (entry.name.endsWith(".astro")) {
      files.push(fullPath);
    }
  }
  return files;
}

function toShowcaseUrl(filePath: string): string {
  const relative = path.relative(showcaseRoot, filePath);
  const withoutExt = relative.replace(/\.astro$/, "");
  const withoutIndex = withoutExt.replace(/(^|\/)index$/, "");
  return `/dev/showcase/${withoutIndex}/`.replace(/\/+/g, "/");
}

test.describe("dev/showcase", () => {
  const showcaseSubDirs = fs
    .readdirSync(showcaseRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => path.join(showcaseRoot, e.name));
  const astroFiles = showcaseSubDirs.flatMap(collectAstroFiles);
  const urls = astroFiles.map(toShowcaseUrl);

  for (const url of urls) {
    test(url, async ({ page }) => {
      await gotoAndWait(page, url);
      await takeScreenshots(page);
    });
  }
});
