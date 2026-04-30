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
  // TODO: 開花スタイルのリリース後に削除する
  temporaryToppageCardText: "開花スタイルは今後実装予定",
  color: "#DF4C94",
  lightColor: "#E3ADD5",
  description:
    "愛を糧に戦う魔法少女。大人になるのが怖くて、<br />18歳の誕生日に世界をやり直している。",
  additionalProductDescription:
    "つぼみは引っ込み思案、開花は天真爛漫。開花スタイル（画像右）は今後実装予定。",
  labelInfos: [
    { label: "年齢", value: "17歳", size: 1 },
    { label: "身長", value: "168cm", size: 1 },
    { label: "好物", value: "チョコレート", size: 1 },
    { label: "誕生日", value: "1月第二月曜日", size: 1 },
    { label: "性格", value: "開花：天真爛漫　つぼみ：引っ込み思案", size: 2 },
    { label: "語尾", value: "開花：なのです　つぼみ：特になし", size: 2 },
  ],
  policyUrl: "https://satoishiyuka.wixsite.com/satoishi/kiyaku",
  detailUrl: "https://satoishiyuka.wixsite.com/satoishi",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
