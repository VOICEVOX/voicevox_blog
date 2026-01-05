import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "あんこもん" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "つよつよ", id: "power", type: "talk" },
  { name: "よわよわ", id: "weak", type: "talk" },
  { name: "けだるげ", id: "darui", type: "talk" },
  { name: "ささやき", id: "whisper", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "あんこもん",
  id: "ankomon",
  rubyName: "<ruby>あんこもん</ruby>",
  voiceFeature: undefined, // TODO: 埋める
  color: "#A45AAA",
  lightColor: "#CAB2D6",
  description:
    "ずんだもんをライバル視しており、「ずんだもん？<br />そんなやつ、知らないもん」とツンツンしている。",
  labelInfos: [
    { label: "将来の夢", value: "ずんだもんに負けを認めさせること", size: 2 },
    { label: "好物", value: "あんこ", size: 1 },
    { label: "語尾", value: "○○だもん", size: 1 },
    { label: "年齢", value: "年齢の概念なし", size: 2 },
    { label: "誕生日", value: "3月5日", size: 1 },
    { label: "CV", value: "鎌田歩乃佳", size: 1 },
  ],
  policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  detailUrl: "https://zunko.jp/#charaUN",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
