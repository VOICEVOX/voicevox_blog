import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "東北イタコ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "東北イタコ",
  id: "tohoku_itako",
  rubyName: "<ruby>東北<rp>(</rp><rt>とうほく</rt><rp>)</rp>イタコ</ruby>",
  voiceFeature: "雅やかで余韻のある声",
  color: "#A45AAA",
  lightColor: "#CAB2D6",
  description:
    "イタコ専門学校を主席で卒業した才能の持ち主。<br />本来のイタコ能力はイマイチ。東北三姉妹の長女。",
  labelInfos: [
    { label: "身長", value: "160 cm", size: 1 },
    { label: "年齢", value: "19歳", size: 1 },
    { label: "口調", value: "ですわ口調", size: 1 },
    { label: "必殺技", value: "口寄せ(イタコ)", size: 1 },
  ],
  policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  detailUrl: "https://zunko.jp/#charaTI",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
