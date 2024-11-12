import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "モチノキョウコ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "セクシー／あん子", id: "sexy", type: "talk" },
  { name: "泣き", id: "cry", type: "talk" },
  { name: "怒り", id: "angry", type: "talk" },
  { name: "喜び", id: "joy", type: "talk" },
  { name: "のんびり", id: "relax", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "セクシー／あん子", id: "sexy", type: "humming" },
  { name: "泣き", id: "cry", type: "humming" },
  { name: "怒り", id: "angry", type: "humming" },
  { name: "喜び", id: "joy", type: "humming" },
  { name: "のんびり", id: "relax", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "もち子さん",
  id: "mochikosan",
  rubyName:
    "<ruby>もち</ruby><ruby>子<rp>(</rp><rt>こ</rt><rp>)</rp>さん</ruby>",
  voiceFeature: "明瞭で穏やかな声",
  color: "#1D86AE",
  lightColor: "#B3D7DD",
  description:
    "小さい背丈で頑張る君を応援！<br />福島県生まれのプラモ好き犬系ヲタ娘です",
  labelInfos: [
    { label: "本名", value: "ﾓﾁﾉ･ｷｮｳｺ", size: 1 },
    { label: "CV", value: "明日葉よもぎ", size: 1 },
    { label: "相棒（？）", value: "あん子ちゃん", size: 1 },
    { label: "身長", value: "142 cm", size: 1 },
  ],
  policyUrl: "https://vtubermochio.wixsite.com/mochizora/利用規約",
  detailUrl:
    "https://vtubermochio.wixsite.com/mochizora/もち子さんとは-設定資料",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
