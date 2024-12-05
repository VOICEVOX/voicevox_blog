import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@constants/characterEntry";

const key = "麒ヶ島宗麟" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "麒ヶ島宗麟",
  id: "kigashima_sourin",
  rubyName:
    "<ruby>麒ヶ島<rp>(</rp><rt>きがしま</rt><rp>)</rp>宗麟<rp>(</rp><rt>そうりん</rt><rp>)</rp></ruby>",
  voiceFeature: "渋いおじさん声",
  color: "#FF9914",
  lightColor: "#FEE6AA",
  description:
    "流行に敏感ないぶし銀おじいちゃん。<br />非常にミーハーでノリが良い。",
  labelInfos: [
    { label: "身長", value: "175 cm", size: 1 },
    { label: "体重", value: "79 kg", size: 1 },
    { label: "年齢", value: "50 歳（見た目年齢）※実年齢不明", size: 2 },
    { label: "趣味１", value: "パワースポット（霊脈？）巡り", size: 2 },
    { label: "趣味２", value: "入浴、SNS投稿", size: 2 },
  ],
  policyUrl: "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
  detailUrl: "https://virvoxproject.wixsite.com/official/麒ヶ島宗麟",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
