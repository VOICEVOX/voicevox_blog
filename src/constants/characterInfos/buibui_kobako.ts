import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "ブイブイコバコ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "ブイブイ・コバコ",
  id: "buibui_kobako",
  rubyName: "<ruby>ブイブイ・コバコ</ruby>",
  voiceFeature: "無邪気でぱちっとした声",
  color: "#33A65E",
  lightColor: "#CCEBC5",
  description:
    "遠くの星からやってきた配送屋さん。<br />いろいろあって、ボイボ寮に住むことに…",
  labelInfos: [
    { label: "誕生日", value: "5月8.5日", size: 1 },
    { label: "体重", value: "5g", size: 1 },
    { label: "身長", value: "150cm", size: 1 },
    { label: "趣味", value: "デコること", size: 1 },
    { label: "好きなもの", value: "包まれているもの", size: 2 },
    { label: "嫌いなもの", value: "グー", size: 1 },
    { label: "地元", value: "コバコ星", size: 1 },
    { label: "お仕事・目的", value: "配達・配送／借金返済", size: 2 },
  ],
  policyUrl: "https://vv-cobaco.com/terms",
  detailUrl: "https://vv-cobaco.com/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
