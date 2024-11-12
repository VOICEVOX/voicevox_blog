import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "青山龍星" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "熱血", id: "eager", type: "talk" },
  { name: "不機嫌", id: "grumpy", type: "talk" },
  { name: "喜び", id: "happy", type: "talk" },
  { name: "しっとり", id: "mellow", type: "talk" },
  { name: "かなしみ", id: "sad", type: "talk" },
  { name: "囁き", id: "whisper", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "熱血", id: "eager", type: "humming" },
  { name: "不機嫌", id: "grumpy", type: "humming" },
  { name: "喜び", id: "happy", type: "humming" },
  { name: "しっとり", id: "mellow", type: "humming" },
  { name: "かなしみ", id: "sad", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "青山龍星",
  id: "aoyama_ryusei",
  rubyName:
    "<ruby>青山<rp>(</rp><rt>あおやま</rt><rp>)</rp>龍星<rp>(</rp><rt>りゅうせい</rt><rp>)</rp></ruby>",
  voiceFeature: "重厚で低音な声",
  color: "#386CB0",
  lightColor: "#B3CDE3",
  description: "とにかく大柄で無骨な青年。<br />寡黙で冷静なストッパー枠。",
  labelInfos: [
    { label: "身長", value: "194 cm", size: 2 },
    { label: "体重", value: "94 kg", size: 2 },
    { label: "年齢", value: "24 歳", size: 2 },
    { label: "誕生日", value: "春生まれ", size: 2 },
  ],
  policyUrl: "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
  detailUrl: "https://virvoxproject.wixsite.com/official/青山龍星",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
