import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "満別花丸" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "元気", id: "fun", type: "talk" },
  { name: "ささやき", id: "whis", type: "talk" },
  { name: "ぶりっ子", id: "cute", type: "talk" },
  { name: "ボーイ", id: "boy", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
  { name: "元気", id: "fun", type: "humming" },
  { name: "ささやき", id: "whis", type: "humming" },
  { name: "ぶりっ子", id: "cute", type: "humming" },
  { name: "ボーイ", id: "boy", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "満別花丸",
  id: "manbetsu_hanamaru",
  rubyName:
    "<ruby>満別<rp>(</rp><rt>まんべつ</rt><rp>)</rp>花丸<rp>(</rp><rt>はなまる</rt><rp>)</rp></ruby>",
  voiceFeature: "生き生きとした際立つ声",
  color: "#99D02B",
  lightColor: "#E6F5B0",
  description: "全人類みんなにはなまるをあげる音声キャラクター",
  labelInfos: [
    { label: "身長", value: "138 cm", size: 2 },
    { label: "誕生日", value: "8月7日", size: 2 },
    { label: "出身", value: "北海道", size: 2 },
    { label: "好物", value: "うめぼし", size: 2 },
  ],
  policyUrl: "https://100hanamaru.wixsite.com/manbetsu-hanamaru/rule",
  detailUrl: "https://100hanamaru.wixsite.com/manbetsu-hanamaru",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
