import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "猫使ビィ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "おちつき", id: "ochitsuki", type: "talk" },
  { name: "人見知り", id: "shy", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "おちつき", id: "ochitsuki", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "猫使ビィ",
  id: "nekotsuka_bi",
  rubyName: "<ruby>猫使<rp>(</rp><rt>ねこつか</rt><rp>)</rp>ビィ</ruby>",
  voiceFeature: "ピュアであどけない声",
  color: "#1D86AE",
  lightColor: "#B3D7DD",
  description: "謎の研究所で作られた<br />猫使シリーズの タイプ:Blue",
  labelInfos: [
    { label: "身長", value: "140 cm", size: 1 },
    { label: "誕生日", value: "6月17日", size: 1 },
    { label: "年齢", value: "外見年齢10代前半", size: 2 },
    { label: "性格", value: "シャイで臆病", size: 1 },
    { label: "好きなもの", value: "サーモン", size: 1 },
    { label: "苦手なもの", value: "おばけ", size: 1 },
    { label: "趣味", value: "おひるね", size: 1 },
  ],
  policyUrl: "https://nekotukarb.wixsite.com/nekonohako/利用規約",
  detailUrl: "https://nekotukarb.wixsite.com/nekonohako",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
