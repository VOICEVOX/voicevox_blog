import type { AstroImage } from "@types";

import {
  characterKeys,
  characterInfos,
  type CharacterKey,
} from "./characterInfos";

const _bustupImages: Record<string, () => Promise<AstroImage>> =
  import.meta.glob<AstroImage>("./bustup-images/*.png");
export const bustupImages = Object.fromEntries(
  characterKeys.map((key) => [
    key,
    _bustupImages[`./bustup-images/${characterInfos[key].id}.png`],
  ]),
) as Record<CharacterKey, () => Promise<AstroImage>>;

// undefinedになっているものがないかチェック
for (const key of characterKeys) {
  if (!bustupImages[key]) {
    throw new Error(
      `bustupImages[${key}] is undefined, is there "./bustup-images/${characterInfos[key].id}.png"`,
    );
  }
}
