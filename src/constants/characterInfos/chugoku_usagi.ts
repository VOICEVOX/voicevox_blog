import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "中国うさぎ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "おどろき", id: "surprise", type: "talk" },
  { name: "こわがり", id: "fear", type: "talk" },
  { name: "へろへろ", id: "tired", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "おどろき", id: "surprise", type: "humming" },
  { name: "こわがり", id: "fear", type: "humming" },
  { name: "へろへろ", id: "tired", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "中国うさぎ",
  id: "chugoku_usagi",
  rubyName: "<ruby>中国<rp>(</rp><rt>ちゅうごく</rt><rp>)</rp>うさぎ</ruby>",
  voiceFeature: "幽玄で初々しい声",
  color: "#FC4E32",
  lightColor: "#FDCDB7",
  description:
    "巫女みこネットワークの一員で、日本各地で怪異の情報を集める。ぼそぼそしゃべるタイプの無口キャラ",
  labelInfos: [
    { label: "身長", value: "147 cm", size: 1 },
    { label: "年齢", value: "14 歳", size: 1 },
    { label: "相棒", value: "ぬいぐるみ「いなば」", size: 2 },
  ],
  policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  detailUrl: "https://zunko.jp/#charaCU",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
