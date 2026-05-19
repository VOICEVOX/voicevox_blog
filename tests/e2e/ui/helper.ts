import { assertNonNullable } from "@/helper";
import type { Page } from "playwright";

/** 固定のいろんなコンポーネントを取得する */
export function getLocators(page: Page) {
  const header = page.getByRole("navigation");
  const modal = page.getByRole("dialog");
  return {
    header,
    modal,
  };
}

/** スマホ画面サイズかどうか */
export function isMobile(page: Page) {
  const viewport = page.viewportSize();
  assertNonNullable(viewport);
  return viewport.width < 768;
}
