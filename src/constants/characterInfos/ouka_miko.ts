import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "櫻歌ミコ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "第二形態", id: "2nd", type: "talk" },
  { name: "ロリ", id: "loli", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "第二形態", id: "2nd", type: "humming" },
  { name: "ロリ", id: "loli", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "櫻歌ミコ",
  id: "ouka_miko",
  rubyName:
    "<ruby>櫻歌<rp>(</rp><rt>おうか</rt><rp>)</rp></ruby><ruby>ミコ</ruby>",
  voiceFeature: "かわいらしい少女の声",
  color: "#F9344C",
  lightColor: "#FBB4C4",
  description:
    "ニホンオオカミの女の子。<br />もうひとりのミコ（通称：第二ちゃん）がいる。",
  labelInfos: [
    { label: "年齢", value: "3.5 歳", size: 1 },
    { label: "身長", value: "135 cm", size: 1 },
    { label: "体重", value: "35 kg", size: 1 },
    { label: "誕生日", value: "12月24日", size: 1 },
    { label: "性格", value: "ガブデレ", size: 1 },
    { label: "持ち物", value: "りんご/骨", size: 1 },
    { label: "愛称", value: "みこみこ/第二ちゃん", size: 2 },
  ],
  policyUrl: "https://voicevox35miko.studio.site/rule",
  detailUrl: "https://voicevox35miko.studio.site/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
