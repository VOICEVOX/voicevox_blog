import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@constants/characterEntry";

const key = "冥鳴ひまり" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "冥鳴ひまり",
  id: "meimei_himari",
  rubyName: "<ruby>冥鳴<rp>(</rp><rt>めいめい</rt><rp>)</rp>ひまり</ruby>",
  voiceFeature: "柔らかく温かい声",
  color: "#A45AAA",
  lightColor: "#CAB2D6",
  description: "冥界から来た死神。<br />可愛いものに目がない。",
  labelInfos: [
    { label: "年齢", value: "18 歳", size: 1 },
    { label: "種族", value: "死神", size: 1 },
    { label: "誕生日", value: "9月1日", size: 1 },
    { label: "好きな日本語", value: "不渡り", size: 1 },
    { label: "好きなもの", value: "可愛い女の子", size: 2 },
    { label: "性格", value: "優しくて清楚（自称）", size: 2 },
  ],
  policyUrl: "https://meimeihimari.wixsite.com/himari/terms-of-use",
  detailUrl: "https://meimeihimari.wixsite.com/himari/voicevox",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
