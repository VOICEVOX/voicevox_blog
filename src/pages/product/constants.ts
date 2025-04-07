import type { CharacterInfo } from "@/constants/type";

export function buildDescription(characterInfo: CharacterInfo) {
  const voiceFeature = characterInfo.voiceFeature
    ? characterInfo.voiceFeature
    : "声";
  const description =
    `VOICEVOXは「${characterInfo.name}」の${voiceFeature}で誰でも簡単に音声を作成できる、無料のテキスト読み上げソフトウェアです。` +
    (characterInfo.releaseDate
      ? `${characterInfo.releaseDate}にリリース予定。`
      : "");
  return description;
}
