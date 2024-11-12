import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "ちび式じい" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "ちび式じい",
  id: "chibishikiji",
  rubyName:
    "<ruby>ちび</ruby><ruby>式<rp>(</rp><rt>しき</rt><rp>)</rp></ruby><ruby>じい</ruby>",
  voiceFeature: "親しみのある嗄れ声",
  color: "#1D86AE",
  lightColor: "#B3D7DD",
  description:
    "式じいに似た姿の小さい妖精さん。<br />世界各地に様々な個体が生息している。",
  labelInfos: [
    { label: "身長", value: "20 cm前後", size: 1 },
    { label: "CV", value: "こんぺえる", size: 1 },
    { label: "好きなもの", value: "ジャガイモ", size: 1 },
    { label: "種族", value: "ちび式じい", size: 1 },
  ],
  policyUrl:
    "https://docs.google.com/presentation/d/1AcD8zXkfzKFf2ertHwWRwJuQXjNnijMxhz7AJzEkaI4",
  detailUrl:
    "https://shiki-rowen-taigen.com/%e5%88%a9%e7%94%a8%e8%a6%8f%e7%b4%84%e3%83%bb%e3%82%ac%e3%82%a4%e3%83%89%e3%83%a9%e3%82%a4%e3%83%b3/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
