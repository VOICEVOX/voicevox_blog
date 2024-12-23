import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "雨晴はう" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "雨晴はう",
  id: "amehare_hau",
  rubyName: "<ruby>雨晴<rp>(</rp><rt>あめはれ</rt><rp>)</rp>はう</ruby>",
  voiceFeature: "優しく可愛い声",
  color: "#1D86AE",
  lightColor: "#B3D7DD",
  description: "現役看護師です！<br />看護師のあれこれお伝えします！",
  labelInfos: [
    { label: "誕生日", value: "10月30日", size: 1 },
    { label: "身長", value: "152 cm", size: 1 },
    { label: "色", value: "#28c4ec", size: 1 },
    { label: "CV", value: "結崎このみ", size: 1 },
    { label: "好きなもの", value: "ラーメン", size: 2 },
    { label: "趣味", value: "食べ歩き", size: 2 },
  ],
  policyUrl: "https://amehau.com/?page_id=225",
  detailUrl: "https://amehau.com/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
