import { gotoAndWait } from "../helper";
import { characterEntries, characterKeys } from "@/constants/characterEntry";
import { getProductPageUrl } from "@/constants/url";
import { expect, test } from "@playwright/test";

// NOTE: https://github.com/VOICEVOX/voicevox_blog/pull/267#pullrequestreview-2740302454
test("後ろの方のキャラクターの製品ページに遷移したとき、キャラクターリスト内のそのキャラクターが表示されている", async ({
  page,
}) => {
  const lastCharacterKey = characterKeys[characterKeys.length - 1];
  const lastCharacterEntry = characterEntries[lastCharacterKey];

  await gotoAndWait(page, getProductPageUrl(lastCharacterEntry));

  const characterList = page.getByLabel("キャラクター一覧");
  await expect(
    characterList.getByLabel(lastCharacterEntry.name, { exact: true }),
  ).toBeInViewport();
});

test("キャラクターの製品ページでは、そのキャラクターが中央に表示される", async ({
  page,
}) => {
  await test.step("真ん中のキャラクターのページへ遷移", async () => {
    const middleIndex = Math.floor(characterKeys.length / 2);
    const middleCharacterKey = characterKeys[middleIndex];
    const middleCharacterEntry = characterEntries[middleCharacterKey];
    await gotoAndWait(page, getProductPageUrl(middleCharacterEntry));
  });

  await test.step("キャラメニューリストのスクロール位置が大体真ん中になっている", async () => {
    const characterList = page.getByLabel("キャラクター一覧");
    const position = await characterList.evaluate((el) => el.scrollLeft);
    const scrollWidth = await characterList.evaluate((el) => el.scrollWidth);
    const clientWidth = await characterList.evaluate((el) => el.clientWidth);
    const middlePosition = scrollWidth / 2 - clientWidth / 2;
    const tolerance = clientWidth / 8;
    expect(position).toBeGreaterThan(middlePosition - tolerance);
    expect(position).toBeLessThan(middlePosition + tolerance);
  });
});
