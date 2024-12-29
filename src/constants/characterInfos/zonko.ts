import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "ぞん子" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "低血圧", id: "relax", type: "talk" },
  { name: "覚醒", id: "eager", type: "talk" },
  { name: "実況風", id: "jikkyo", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "ぞん子",
  id: "zonko",
  rubyName: "<ruby>ぞん</ruby><ruby>子<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>",
  voiceFeature: "血気盛んでありありとした声",
  color: "#A45AAA",
  lightColor: "#CAB2D6",
  description:
    "ZONeエナジー公式アンバサダーのぞん子だよ！<br />ZONeを通じてeカルチャーを盛り上げるよ！",
  labelInfos: [
    { label: "誕生日", value: "5月12日", size: 1 },
    { label: "好物", value: "ZONeエナジー", size: 1 },
    {
      label: "好きなもの",
      value: "ゲーム、音楽、インターネット、eカルチャー全般",
      size: 2,
    },
    { label: "趣味", value: "Xでクリエイターを探すこと", size: 2 },
    { label: "ﾁｬｰﾑﾎﾟｲﾝﾄ", value: "眼帯、髪留め", size: 2 },
  ],
  policyUrl: "https://zonko.zone-energy.jp/guideline",
  detailUrl: "https://zonko.zone-energy.jp/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
