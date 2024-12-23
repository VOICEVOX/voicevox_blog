import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "波音リツ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "クイーン", id: "queen", type: "talk" },
  { name: "ノーマル", id: "normal", type: "song" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "クイーン", id: "queen", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "波音リツ",
  id: "namine_ritsu",
  rubyName: "<ruby>波音<rp>(</rp><rt>なみね</rt><rp>)</rp>リツ</ruby>",
  voiceFeature: "低めのクールな声",
  color: "#FC4E32",
  lightColor: "#FDCDB7",
  description:
    "地獄のような安価を踏み抜いて生まれた、<br />2ch・VIP発のキャラクター。",
  labelInfos: [
    { label: "年齢", value: "6 歳", size: 2 },
    { label: "身長", value: "156 cm", size: 2 },
    { label: "体重", value: "25 トン", size: 2 },
    { label: "好きなもの", value: "チョコクリスピー", size: 2 },
  ],
  policyUrl: "http://canon-voice.com/kiyaku.html",
  detailUrl: "https://www.canon-voice.com/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
