import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "ナースロボ＿タイプＴ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "楽々", id: "fun", type: "talk" },
  { name: "恐怖", id: "fear", type: "talk" },
  { name: "内緒話", id: "whis", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "楽々", id: "fun", type: "humming" },
  { name: "恐怖", id: "fear", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "ナースロボ＿タイプＴ",
  id: "nurserobo_typet",
  rubyName:
    "<ruby>ナースロボ＿タイプ</ruby><ruby>Ｔ<rp>(</rp><rt>てぃー</rt><rp>)</rp></ruby>",
  voiceFeature: "冷静で慎み深い声",
  color: "#FF9914",
  lightColor: "#FEE6AA",
  description:
    "医者に作られたナース形ロボット。<br />人格は少女と設定されている。",
  labelInfos: [
    { label: "年齢", value: "五ヶ月", size: 1 },
    { label: "誕生日", value: "12月3日", size: 1 },
    { label: "身長", value: "150～160 cm（パーツによる）", size: 2 },
    { label: "愛称", value: "ＴＴ", size: 2 },
    { label: "製造者", value: "そばの小型ロボット（医者）", size: 2 },
  ],
  policyUrl: "https://www.krnr.top/rules",
  detailUrl: "https://www.krnr.top/blank",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
