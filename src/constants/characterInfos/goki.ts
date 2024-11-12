import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "後鬼" satisfies CharacterKey;

const styles = [
  { name: "人間ver.", id: "normal", type: "talk" },
  { name: "ぬいぐるみver.", id: "nuigurumi", type: "talk" },
  { name: "人間（怒り）ver.", id: "angry", type: "talk" },
  { name: "鬼ver.", id: "oni", type: "talk" },
  { name: "人間ver.", id: "normal", type: "humming" },
  { name: "ぬいぐるみver.", id: "nuigurumi", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "後鬼",
  id: "goki",
  rubyName: "<ruby>後鬼<rp>(</rp><rt>ごき</rt><rp>)</rp></ruby>",
  voiceFeature: "包容力のある奥ゆかしい声",
  color: "#386CB0",
  lightColor: "#B3CDE3",
  description:
    "鬼っ子ハンターついなちゃんの式神。<br />人間態では色っぽい大人の女性の話し方になる。",
  labelInfos: [
    { label: "CV", value: "七海映子", size: 1 },
    { label: "年齢", value: "少なくとも1300歳以上", size: 2 },
    { label: "身長", value: "ヒール込みで170cm", size: 2 },
    { label: "体重", value: "スイカ2つ分（某部分が）", size: 2 },
  ],
  policyUrl: "https://ついなちゃん.com/voicevox_terms/",
  detailUrl: "https://ついなちゃん.com/character/?goki",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
