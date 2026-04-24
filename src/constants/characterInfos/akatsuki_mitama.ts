import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "暁記ミタマ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "怒り", id: "ikari", type: "talk" },
  { name: "哀しみ", id: "kanashimi", type: "talk" },
  { name: "ささやき", id: "sasayaki", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "暁記ミタマ",
  id: "akatsuki_mitama",
  rubyName: "<ruby>暁記<rp>(</rp><rt>あかつき</rt><rp>)</rp>ミタマ</ruby>",
  // TODO: 声の特徴を設定する
  voiceFeature: undefined,
  color: "#99D02B",
  lightColor: "#E6F5B0",
  description: "夜語トバリに仕える謎のメイドさん",
  labelInfos: [
    { label: "年齢", value: "不詳", size: 1 },
    { label: "身長", value: "146cm", size: 1 },
    { label: "誕生日", value: "3月0日（誤字じゃないよ）", size: 2 },
    { label: "性格", value: "クール系仕事人", size: 2 },
    { label: "好物", value: "マカロン", size: 1 },
    { label: "好きなもの", value: "家事", size: 1 },
    { label: "相棒", value: "夜語トバリ", size: 1 },
    { label: "CV", value: "椎名桃香", size: 1 },
  ],
  // TODO: 規約ページURLを設定する
  policyUrl: undefined,
  // TODO: キャラクターページURLを設定する
  detailUrl: undefined,
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
