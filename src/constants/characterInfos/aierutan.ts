import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";

const key = "藍田ノエル" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "あいえるたん",
  id: "aierutan",
  rubyName: "<ruby>あいえるたん</ruby>",
  voiceFeature: "心地よい物柔らかな声",
  color: "#FF9914",
  lightColor: "#FEE6AA",
  description:
    "札幌市内の高校に通う元気な女子高生。<br />IT企業でマスコット/アルバイトとして活躍中。",
  labelInfos: [
    { label: "本名", value: "藍田ノエル", size: 1 },
    { label: "CV", value: "Milia", size: 1 },
    { label: "年齢", value: "16 歳", size: 1 },
    { label: "誕生日", value: "7月1日", size: 1 },
    { label: "身長", value: "154.8 cm", size: 1 },
    { label: "好物", value: "コーラ", size: 1 },
    { label: "趣味", value: "プログラミング、ゲーム", size: 2 },
  ],
  policyUrl: "https://www.infiniteloop.co.jp/special/iltan/terms/",
  detailUrl: "https://www.infiniteloop.co.jp/special/iltan/",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
