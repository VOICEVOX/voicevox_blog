import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "聖騎士紅桜" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "ノーマル", id: "normal", type: "humming" },
] satisfies Styles;

export default {
  key,
  name: "†聖騎士 紅桜†",
  id: "horinaito_benizakura",
  rubyName:
    "<ruby>†</ruby><ruby>聖騎士<rp>(</rp><rt>ほーりーないと</rt><rp>)</rp>紅桜<rp>(</rp><rt>べにざくら</rt><rp>)</rp>†</ruby>",
  voiceFeature: "快活でハキハキした声",
  color: "#F9344C",
  lightColor: "#FBB4C4",
  description: "黒き歴史を背負いし<br />孤高の聖騎士",
  labelInfos: [
    { label: "年齢", value: "永遠ノLv.14", size: 1 },
    { label: "誕生日", value: "1月22日", size: 1 },
    { label: "種族", value: "聖騎士", size: 1 },
    { label: "好きなもの", value: "戦い", size: 1 },
    { label: "ﾁｬｰﾑﾎﾟｲﾝﾄ", value: "鎧に着いた返り血", size: 2 },
    { label: "相棒", value: "聖剣「紅」（クリムゾン）", size: 2 },
  ],
  policyUrl: "https://commons.nicovideo.jp/material/nc296132",
  detailUrl: "https://commons.nicovideo.jp/material/nc296132",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
