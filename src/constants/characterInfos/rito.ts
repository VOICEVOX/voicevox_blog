import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "離途" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "離途",
  id: "rito",
  rubyName: "<ruby>離途<rp>(</rp><rt>りと</rt><rp>)</rp></ruby>",
  voiceFeature: "包み込む息遣いな声",
  color: "#386CB0",
  lightColor: "#B3CDE3",
  description:
    "記憶喪失のアンドロイドの青年。<br />自分のことを人間だと思い込んでいるようだ。",
  labelInfos: [
    { label: "身長", value: "180 cm", size: 1 },
    { label: "誕生日", value: "10月10日", size: 1 },
    { label: "年齢", value: "不明", size: 1 },
    { label: "種族", value: "アンドロイド", size: 1 },
    { label: "性格", value: "穏やか、不思議くん", size: 2 },
    { label: "好きなもの", value: "日光浴、さつまいも", size: 2 },
  ],
  policyUrl: "https://litmus9.com/#/voicebank#rules",
  detailUrl: "https://litmus9.com/#/voicebank",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
