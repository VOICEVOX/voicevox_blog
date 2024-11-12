import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "四国めたん" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "あまあま", id: "ama", type: "talk" },
  { name: "ツンツン", id: "tsun", type: "talk" },
  { name: "セクシー", id: "sexy", type: "talk" },
  { name: "ささやき", id: "whis", type: "talk" },
  { name: "ヒソヒソ", id: "hiso", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "あまあま", id: "ama", type: "humming" },
  { name: "ツンツン", id: "tsun", type: "humming" },
  { name: "セクシー", id: "sexy", type: "humming" },
  { name: "ヒソヒソ", id: "hiso", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "四国めたん",
  id: "shikoku_metan",
  rubyName: "<ruby>四国<rp>(</rp><rt>しこく</rt><rp>)</rp>めたん</ruby>",
  voiceFeature: "はっきりした芯のある声",
  color: "#DF4C94",
  lightColor: "#E3ADD5",
  description:
    "高等部二年生。常に金欠。趣味は中二病妄想。<br />誰にでも遠慮しないので、基本的にタメ口。",
  labelInfos: [
    { label: "年齢", value: "17 歳", size: 1 },
    { label: "身長", value: "150 cm", size: 1 },
    { label: "性格", value: "若干ツンデレ気味", size: 2 },
  ],
  policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  detailUrl: "https://zunko.jp/#charaSM",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
