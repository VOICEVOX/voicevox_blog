import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "玄野武宏" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "喜び", id: "fun", type: "talk" },
  { name: "ツンギレ", id: "angry", type: "talk" },
  { name: "悲しみ", id: "sad", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "喜び", id: "fun", type: "humming" },
  { name: "ツンギレ", id: "angry", type: "humming" },
  { name: "悲しみ", id: "sad", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "玄野武宏",
  id: "kurono_takehiro",
  rubyName:
    "<ruby>玄野<rp>(</rp><rt>くろの</rt><rp>)</rp>武宏<rp>(</rp><rt>たけひろ</rt><rp>)</rp></ruby>",
  voiceFeature: "爽やかな青年の声",
  color: "#1AA18E",
  lightColor: "#B3E2D8",
  description: "サッパリした青年。<br />やや短気だが面倒見は良い。",
  labelInfos: [
    { label: "身長", value: "177 cm", size: 2 },
    { label: "体重", value: "66 kg", size: 2 },
    { label: "年齢", value: "20代前後", size: 2 },
    { label: "誕生日", value: "12月24日", size: 2 },
  ],
  policyUrl: "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
  detailUrl: "https://virvoxproject.wixsite.com/official/玄野武宏",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
