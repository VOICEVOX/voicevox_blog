import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "東北きりたん" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "東北きりたん",
  id: "tohoku_kiritan",
  rubyName: "<ruby>東北<rp>(</rp><rt>とうほく</rt><rp>)</rp>きりたん</ruby>",
  voiceFeature: undefined, // TODO: 埋める
  color: "#FB8028",
  lightColor: "#FFD6B8",
  description:
    "ひきこもり気質で夜型の生活をしている。<br />他人に対してはクールで毒舌。包丁は髪飾り。",
  labelInfos: [
    { label: "身長", value: "135 cm", size: 1 },
    { label: "年齢", value: "11歳", size: 1 },
    { label: "特技", value: "ゲーム", size: 1 },
    { label: "必殺技", value: "きりたん砲", size: 1 },
  ],
  policyUrl: undefined, // TODO: 埋める
  detailUrl: undefined, // TODO: 埋める
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
