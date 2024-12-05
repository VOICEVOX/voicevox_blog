import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@constants/characterEntry";

const key = "猫使アル" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "おちつき", id: "ochitsuki", type: "talk" },
  { name: "うきうき", id: "fun", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "おちつき", id: "ochitsuki", type: "humming" },
  { name: "うきうき", id: "fun", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "猫使アル",
  id: "nekotsuka_aru",
  rubyName: "<ruby>猫使<rp>(</rp><rt>ねこつか</rt><rp>)</rp>アル</ruby>",
  voiceFeature: "厚みのある気さくな声",
  color: "#F9344C",
  lightColor: "#FBB4C4",
  description: "謎の研究所で作られた<br />猫使シリーズの タイプ:Red",
  labelInfos: [
    { label: "身長", value: "140 cm", size: 1 },
    { label: "誕生日", value: "6月17日", size: 1 },
    { label: "年齢", value: "外見年齢10代前半", size: 2 },
    { label: "性格", value: "マイペース", size: 1 },
    { label: "好きなもの", value: "はまち", size: 1 },
    { label: "苦手なもの", value: "ねずみ", size: 1 },
    { label: "趣味", value: "噛むこと", size: 1 },
  ],
  policyUrl: "https://nekotukarb.wixsite.com/nekonohako/利用規約",
  detailUrl: "https://nekotukarb.wixsite.com/nekonohako",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
