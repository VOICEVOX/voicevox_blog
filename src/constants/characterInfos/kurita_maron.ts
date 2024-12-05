import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@constants/characterEntry";

const key = "栗田まろん" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "栗田まろん",
  id: "kurita_maron",
  rubyName: "<ruby>栗田<rp>(</rp><rt>くりた</rt><rp>)</rp>まろん</ruby>",
  voiceFeature: "深みのある中性的な声",
  color: "#1AA18E",
  lightColor: "#B3E2D8",
  description:
    "友人たちに乗せられて女装したら好評だった<br />男子高生。図書委員所属。",
  labelInfos: [
    { label: "身長", value: "165 cm", size: 1 },
    { label: "誕生日", value: "10月9日", size: 1 },
    { label: "色", value: "栗色", size: 1 },
    { label: "CV", value: "栗田穣崇", size: 1 },
    { label: "趣味", value: "読書", size: 2 },
    { label: "好物", value: "モンブラン、マロンパフェ", size: 2 },
  ],
  policyUrl: "https://aivoice.jp/character/maron/",
  detailUrl: "https://aivoice.jp/character/maron/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
