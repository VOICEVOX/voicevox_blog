import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "雀松朱司" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "雀松朱司",
  id: "wakamatsu_akashi",
  rubyName:
    "<ruby>雀松<rp>(</rp><rt>わかまつ</rt><rp>)</rp>朱司<rp>(</rp><rt>あかし</rt><rp>)</rp></ruby>",
  voiceFeature: "物静かで安定した声",
  color: "#FC4E32",
  lightColor: "#FDCDB7",
  description:
    "温厚なしっかり者の青年。<br />ちょっぴり天然で抜けている面も･･･。",
  labelInfos: [
    { label: "身長", value: "182 cm", size: 1 },
    { label: "体重", value: "68 kg", size: 1 },
    { label: "年齢", value: "26 歳", size: 1 },
    { label: "誕生日", value: "7月17日", size: 1 },
    { label: "趣味", value: "読書、掃除、買い物", size: 2 },
  ],
  policyUrl: "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
  detailUrl: "https://virvoxproject.wixsite.com/official/雀松朱司",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
