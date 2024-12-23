import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "九州そら" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "あまあま", id: "ama", type: "talk" },
  { name: "ツンツン", id: "tsun", type: "talk" },
  { name: "セクシー", id: "sexy", type: "talk" },
  { name: "ささやき", id: "whis", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "あまあま", id: "ama", type: "humming" },
  { name: "ツンツン", id: "tsun", type: "humming" },
  { name: "セクシー", id: "sexy", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "九州そら",
  id: "kyushu_sora",
  rubyName: "<ruby>九州<rp>(</rp><rt>きゅうしゅう</rt><rp>)</rp>そら</ruby>",
  voiceFeature: "気品のある大人な声",
  color: "#6964AD",
  lightColor: "#B2B6D8",
  description:
    "宇宙開拓用に開発されたアンドロイド。<br />正式名称は「九州そらmk=II」（まーくつー）。",
  labelInfos: [
    {
      label: "年齢",
      value: "0 歳（外見年齢は17歳）",
      size: 2,
    },
    {
      label: "身長",
      value: "173 cm（ヒールなしだと160cm）",
      size: 2,
    },
  ],
  policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  detailUrl: "https://zunko.jp/#charaKS2",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
