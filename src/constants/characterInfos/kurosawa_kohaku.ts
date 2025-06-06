import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "黒沢冴白" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
] satisfies Styles;

export default {
  key,
  name: "黒沢冴白",
  id: "kurosawa_kohaku",
  rubyName:
    "<ruby>黒沢<rp>(</rp><rt>くろさわ</rt><rp>)</rp>冴白<rp>(</rp><rt>こはく</rt><rp>)</rp></ruby>",
  voiceFeature: "強気で張りのある声",
  color: "#F9344C",
  lightColor: "#FBB4C4",
  description:
    "クールでストイックな青年。<br />武宏をライバル視しており、女性が苦手。",
  labelInfos: [
    { label: "身長", value: "186 cm", size: 1 },
    { label: "体重", value: "75 kg", size: 1 },
    { label: "年齢", value: "18 歳", size: 1 },
    { label: "誕生日", value: "9月4日", size: 1 },
    { label: "趣味", value: "筋トレ、虎太郎へのちょっかい", size: 2 },
    { label: "好きなもの", value: "スポーツ全般、図書館、特撮", size: 2 },
  ],
  policyUrl: "https://www.virvoxproject.com/voicevoxの利用規約",
  detailUrl: "https://www.virvoxproject.com/takuto",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
