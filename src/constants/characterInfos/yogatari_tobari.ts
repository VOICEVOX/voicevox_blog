import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "夜語トバリ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "明るい", id: "cheerful", type: "talk" },
  { name: "哀しみ", id: "sad", type: "talk" },
  { name: "呆れ", id: "akire", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "夜語トバリ",
  id: "yogatari_tobari",
  rubyName: "<ruby>夜語<rp>(</rp><rt>よがたり</rt><rp>)</rp>トバリ</ruby>",
  voiceFeature: "理知的で輪郭のある声",
  color: "#6964AD",
  lightColor: "#B2B6D8",
  description: "高校2年生の文学少女。<br />本を読むのが好きだがクラスは理系",
  labelInfos: [
    { label: "年齢", value: "16歳", size: 1 },
    { label: "身長", value: "168cm", size: 1 },
    { label: "誕生日", value: "10月8日", size: 1 },
    { label: "性格", value: "冷静沈着？", size: 1 },
    { label: "好物", value: "あたりめ", size: 1 },
    { label: "好きなもの", value: "読書", size: 1 },
    { label: "相棒", value: "暁記ミタマ", size: 1 },
    { label: "CV", value: "行成とあ", size: 1 },
  ],
  policyUrl: "https://yogataritobari.studio.site/#rules",
  detailUrl: "https://yogataritobari.studio.site/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
