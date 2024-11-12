import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "No7" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "アナウンス", id: "announce", type: "talk" },
  { name: "読み聞かせ", id: "reading", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "アナウンス", id: "announce", type: "humming" },
  { name: "読み聞かせ", id: "reading", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "No.7",
  id: "number_seven",
  rubyName: "<ruby>No.7<rp>(</rp><rt>なんばーせぶん</rt><rp>)</rp></ruby>",
  voiceFeature: "しっかりした凛々しい声",
  color: "#A45AAA",
  lightColor: "#CAB2D6",
  description:
    "正体がつかめない不思議な女性。<br />得意のメイクで複数の「顔」を持つ。",
  labelInfos: [
    { label: "年齢", value: "23 歳", size: 1 },
    { label: "身長", value: "165 cm", size: 1 },
    { label: "CV", value: "小岩井ことり", size: 1 },
    { label: "好きなもの", value: "子供", size: 1 },
    {
      label: "性格",
      value: "ミニマリストで部屋の明かりは蝋燭のみ",
      size: 2,
    },
    { label: "趣味", value: "かいわれ大根の栽培", size: 2 },
  ],
  policyUrl: "https://voiceseven.com/#j0200",
  detailUrl: "https://voiceseven.com/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
