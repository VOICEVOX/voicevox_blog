import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@constants/characterEntry";

const key = "ずんだもん" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "あまあま", id: "ama", type: "talk" },
  { name: "ツンツン", id: "tsun", type: "talk" },
  { name: "セクシー", id: "sexy", type: "talk" },
  { name: "ささやき", id: "whis", type: "talk" },
  { name: "ヒソヒソ", id: "hiso", type: "talk" },
  { name: "ヘロヘロ", id: "herohero", type: "talk" },
  { name: "なみだめ", id: "namidame", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "あまあま", id: "ama", type: "humming" },
  { name: "ツンツン", id: "tsun", type: "humming" },
  { name: "セクシー", id: "sexy", type: "humming" },
  { name: "ヒソヒソ", id: "hiso", type: "humming" },
  { name: "ヘロヘロ", id: "herohero", type: "humming" },
  { name: "なみだめ", id: "namidame", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "ずんだもん",
  id: "zundamon",
  rubyName: "<ruby>ずんだもん</ruby>",
  voiceFeature: "子供っぽい高めの声",
  color: "#33A65E",
  lightColor: "#CCEBC5",
  description:
    "ずんだ餅の精。やや不幸属性が備わっており、<br />ないがしろにされることもしばしば。",
  labelInfos: [
    {
      label: "趣味",
      value: "ずんだ餅にかかわることはだいたい好き",
      size: 2,
    },
    { label: "将来の夢", value: "ずんだ餅のさらなる普及", size: 2 },
  ],
  policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  detailUrl: "https://zunko.jp/#charaZM",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
