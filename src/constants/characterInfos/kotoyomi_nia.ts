import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "琴詠ニア" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "琴詠ニア",
  id: "kotoyomi_nia",
  rubyName: "<ruby>琴詠<rp>(</rp><rt>ことよみ</rt><rp>)</rp>ニア</ruby>",
  voiceFeature: "滑らかで無機質な声",
  color: "#FB8028",
  lightColor: "#FFD6B8",
  description:
    "N Airのシルエットが推し。ニコ生のコメントを<br />読み上げている、宇宙を旅する女の子。",
  labelInfos: [
    { label: "誕生日", value: "11月25日", size: 1 },
    { label: "CV", value: "ﾄﾞﾜﾝｺﾞの中の人", size: 1 },
    { label: "趣味", value: "グッズ制作", size: 1 },
    { label: "ルーティン", value: "配信チェック", size: 1 },
  ],
  policyUrl: "https://commons.nicovideo.jp/works/nc315435",
  detailUrl: "https://n-air-app.nicovideo.jp/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
