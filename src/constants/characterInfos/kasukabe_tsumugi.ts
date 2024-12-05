import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@constants/characterEntry";

const key = "春日部つむぎ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "春日部つむぎ",
  id: "kasukabe_tsumugi",
  rubyName: "<ruby>春日部<rp>(</rp><rt>かすかべ</rt><rp>)</rp>つむぎ</ruby>",
  voiceFeature: "元気な明るい声",
  color: "#FF9914",
  lightColor: "#FEE6AA",
  description:
    "埼玉県内の高校に通うギャルの女の子。<br />やんちゃに見えて実は真面目な一面もある。",
  labelInfos: [
    { label: "年齢", value: "18 歳", size: 1 },
    { label: "身長", value: "155 cm", size: 1 },
    { label: "出身", value: "埼玉", size: 1 },
    { label: "好きなもの", value: "カレー", size: 1 },
    { label: "ﾁｬｰﾑﾎﾟｲﾝﾄ", value: "目元のほくろ", size: 2 },
    { label: "趣味", value: "動画配信サイトの巡回", size: 2 },
  ],
  policyUrl: "https://tsumugi-official.studio.site/rule",
  detailUrl: "https://tsumugi-official.studio.site/top",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
