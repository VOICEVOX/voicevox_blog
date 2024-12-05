import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@constants/characterEntry";

const key = "WhiteCUL" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "たのしい", id: "joy", type: "talk" },
  { name: "かなしい", id: "sad", type: "talk" },
  { name: "びえーん", id: "cry", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "たのしい", id: "joy", type: "humming" },
  { name: "かなしい", id: "sad", type: "humming" },
  { name: "びえーん", id: "cry", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "WhiteCUL",
  id: "white_cul",
  rubyName: "<ruby>WhiteCUL<rp>(</rp><rt>ほわいとかる</rt><rp>)</rp></ruby>",
  voiceFeature: "聞き心地のよい率直な声",
  color: "#1D86AE",
  lightColor: "#B3D7DD",
  description:
    "CULの姉。風雪月花四姉妹の雪。冷静に見えるが、<br />実は小心者のクールビューティー。",
  labelInfos: [
    { label: "年齢", value: "20 歳", size: 1 },
    { label: "身長", value: "165 cm", size: 1 },
    { label: "体重", value: "内緒", size: 1 },
    { label: "誕生日", value: "9月30日", size: 1 },
    { label: "愛称", value: "雪さん", size: 1 },
    { label: "相棒", value: "雪おこじょ", size: 1 },
    { label: "好物", value: "バニラソフトクリーム", size: 2 },
  ],
  policyUrl: "https://www.whitecul.com/guideline",
  detailUrl: "https://www.whitecul.com/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
