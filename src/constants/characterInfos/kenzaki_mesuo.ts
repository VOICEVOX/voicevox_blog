import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@constants/characterEntry";

const key = "剣崎雌雄" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "剣崎雌雄",
  id: "kenzaki_mesuo",
  rubyName:
    "<ruby>剣崎<rp>(</rp><rt>けんざき</rt><rp>)</rp>雌雄<rp>(</rp><rt>めすお</rt><rp>)</rp></ruby>",
  voiceFeature: "安心感のある落ち着いた声",
  color: "#33A65E",
  lightColor: "#CCEBC5",
  description:
    "メスお兄さんじゃねえ！メスのお兄さんだ！<br />（人類滅亡を目論む医療用メスの付喪神）",
  labelInfos: [
    { label: "種族", value: "医療用メス（付喪神）", size: 2 },
    { label: "好物", value: "人間のクソデカ感情・砥石", size: 2 },
    { label: "身長", value: "2m超", size: 1 },
    { label: "誕生日", value: "7月7日", size: 1 },
    { label: "目的", value: "人類滅亡", size: 1 },
    { label: "年齢", value: "3600 歳", size: 1 },
  ],
  policyUrl: "https://frontier.creatia.cc/fanclubs/413/posts/4507",
  detailUrl: "https://frontier.creatia.cc/fanclubs/413/posts/4507",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
