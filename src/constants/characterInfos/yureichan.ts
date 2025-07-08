import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "ユーレイちゃん" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "甘々", id: "ama", type: "talk" },
  { name: "哀しみ", id: "sad", type: "talk" },
  { name: "ささやき", id: "whisper", type: "talk" },
  { name: "ツクモちゃん", id: "tsukumo", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "ユーレイちゃん",
  id: "yureichan",
  rubyName: "ユーレイちゃん",
  voiceFeature: "柔和な揺蕩う声",
  color: "#1D86AE",
  lightColor: "#B3D7DD",
  description: "ユーステラのメインヒロイン<br />『ユーレイちゃん』こと雛菊ルミ",
  labelInfos: [
    { label: "本名", value: "雛菊ルミ", size: 1 },
    { label: "誕生日", value: "5月1日", size: 1 },
    { label: "体重", value: "軽い", size: 1 },
    { label: "CV", value: "神崎零", size: 1 },
    { label: "年齢", value: "かなり生きてます", size: 2 },
    { label: "好きなもの", value: "クレープ", size: 1 },
    { label: "相棒", value: "ツクモちゃん", size: 1 },
  ],
  policyUrl: "https://u-stella.co.jp/voicevox-ure-chan-tucumo-terms-of-use/",
  detailUrl: "http://u-stella.co.jp/u-rey-profile/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
