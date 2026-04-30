import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "里石ユカ" satisfies CharacterKey;

const styles = [
  { name: "つぼみ", id: "tsubomi", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "里石ユカ",
  id: "satoishi_yuka",
  rubyName: "<ruby>里石<rp>(</rp><rt>さといし</rt><rp>)</rp>ユカ</ruby>",
  // TODO: 声の特徴を設定する
  voiceFeature: undefined,
  color: "#DF4C94",
  lightColor: "#E3ADD5",
  description:
    "愛を糧に戦う魔法少女。<br />大人になるのが怖くて、18歳の誕生日に世界をやり直している。",
  labelInfos: [
    { label: "年齢", value: "17歳", size: 1 },
    { label: "身長", value: "168cm", size: 1 },
    { label: "体重", value: "52kg", size: 1 },
    { label: "誕生日", value: "1月第二月曜日", size: 2 },
    { label: "好物", value: "チョコレート", size: 1 },
    { label: "色", value: "濃いめのピンク", size: 2 },
    { label: "CV", value: "黒岩秀太", size: 1 },
    { label: "チャームポイント", value: "ツインテールの空洞", size: 2 },
    { label: "性格", value: "開花:天真爛漫 つぼみ:引っ込み思案", size: 2 },
    { label: "相棒", value: "ダダちゃん（剣）", size: 2 },
    { label: "語尾", value: "開花:なのです つぼみ:特になし", size: 2 },
  ],
  policyUrl: "https://satoishiyuka.wixsite.com/satoishi/kiyaku",
  detailUrl: "https://satoishiyuka.wixsite.com/satoishi",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
