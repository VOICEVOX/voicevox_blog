import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "東北ずん子" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "東北ずん子",
  id: "tohoku_zunko",
  rubyName: "<ruby>東北<rp>(</rp><rt>とうほく</rt><rp>)</rp>ずん子</ruby>",
  voiceFeature: undefined, // TODO: 埋める
  color: "#33A65E",
  lightColor: "#CCEBC5",
  description:
    "前向きで明るい母性の塊のような性格。<br />ずんだの話をし始めると饒舌になる。",
  labelInfos: [
    { label: "身長", value: "157 cm", size: 1 },
    { label: "年齢", value: "17歳", size: 1 },
    { label: "趣味", value: "ずんだ餅作り", size: 1 },
    { label: "必殺技", value: "ずんだアロー", size: 1 },
  ],
  policyUrl: undefined, // TODO: 埋める
  detailUrl: undefined, // TODO: 埋める
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
