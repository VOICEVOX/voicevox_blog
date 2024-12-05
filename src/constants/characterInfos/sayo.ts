import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@constants/characterEntry";

const key = "小夜_SAYO" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "小夜/SAYO",
  id: "sayo",
  rubyName:
    "<ruby>小夜<rp>(</rp><rt>さよ</rt><rp>)</rp></ruby><ruby>/SAYO</ruby>",
  voiceFeature: "和やかで温厚な声",
  color: "#FF6687",
  lightColor: "#FBB4C4",
  description:
    "おしゃべりがすきなねこの女の子。<br />おいしいものを与えると懐きやすい。",
  labelInfos: [
    { label: "誕生日", value: "9月29日", size: 1 },
    { label: "好きなもの", value: "缶詰", size: 1 },
    { label: "体長", value: "135 cm（猫耳を含む）", size: 2 },
  ],
  policyUrl: "https://316soramegu.wixsite.com/sayo-official/guideline",
  detailUrl: "https://316soramegu.wixsite.com/sayo-official",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
