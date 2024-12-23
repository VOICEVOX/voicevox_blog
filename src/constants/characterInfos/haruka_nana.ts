import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "春歌ナナ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "春歌ナナ",
  id: "haruka_nana",
  rubyName: "<ruby>春歌<rp>(</rp><rt>はるか</rt><rp>)</rp>ナナ</ruby>",
  voiceFeature: "はつらつとした力強い声",
  color: "#DF4C94",
  lightColor: "#E3ADD5",
  description: "いつだって元気いっぱいな女の子です。",
  labelInfos: [
    { label: "年齢", value: "10 歳", size: 1 },
    { label: "誕生日", value: "1月30日", size: 1 },
    { label: "身長", value: "137 cm（アホ毛込み）", size: 2 },
    { label: "好物", value: "サラミ、わらびもち", size: 2 },
    { label: "CV", value: "ななひら", size: 2 },
  ],
  policyUrl: "https://nanahira.jp/haruka_nana/guideline.html",
  detailUrl: "https://nanahira.jp/haruka_nana/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
