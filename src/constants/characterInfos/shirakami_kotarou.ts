import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "白上虎太郎" satisfies CharacterKey;

const styles = [
  { name: "ふつう", id: "normal", type: "talk" },
  { name: "わーい", id: "joy", type: "talk" },
  { name: "おこ", id: "angry", type: "talk" },
  { name: "びくびく", id: "biku", type: "talk" },
  { name: "びえーん", id: "cry", type: "talk" },
  { name: "ふつう", id: "normal", type: "humming" },
  { name: "わーい", id: "joy", type: "humming" },
  { name: "おこ", id: "angry", type: "humming" },
  { name: "びくびく", id: "biku", type: "humming" },
  { name: "びえーん", id: "cry", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "白上虎太郎",
  id: "shirakami_kotarou",
  rubyName:
    "<ruby>白上<rp>(</rp><rt>しらかみ</rt><rp>)</rp>虎太郎<rp>(</rp><rt>こたろう</rt><rp>)</rp></ruby>",
  voiceFeature: "声変わり直後の少年の声",
  color: "#99D02B",
  lightColor: "#E6F5B0",
  description: "まっすぐで人懐っこい青年。<br />愛嬌はあるものの少しおばか。",
  labelInfos: [
    { label: "身長", value: "146 cm", size: 2 },
    { label: "体重", value: "42 kg", size: 2 },
    { label: "年齢", value: "18 歳", size: 2 },
    { label: "誕生日", value: "秋生まれ", size: 2 },
  ],
  policyUrl: "https://www.virvoxproject.com/voicevoxの利用規約",
  detailUrl: "https://www.virvoxproject.com/白上虎太郎",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
