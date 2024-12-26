import type { CharacterInfo, Styles } from "../type";
import { getCharacterAssets } from "./helper";
import type { CharacterKey } from "@/constants/characterEntry";

const key = "中部つるぎ" satisfies CharacterKey;

const styles = [
  { name: "ノーマル", id: "normal", type: "talk" },
  { name: "怒り", id: "angry", type: "talk" },
  { name: "ヒソヒソ", id: "hiso", type: "talk" },
  { name: "おどおど", id: "fear", type: "talk" },
  { name: "絶望と敗北", id: "guttural", type: "talk" }, // TODO: idはより適切なものに変更するかも
] satisfies Styles;

export default {
  key,
  name: "中部つるぎ",
  id: "chubu_tsurugi",
  rubyName: "<ruby>中部<rp>(</rp><rt>ちゅうぶ</rt><rp>)</rp>つるぎ</ruby>",
  voiceFeature: "凛然とした存在感のある声",
  color: "#6964AD",
  lightColor: "#B2B6D8",
  description:
    "義理人情を重んじるサムライ風の性格。<br />頭頂部の漢字プレートは感情によって変化する。",
  labelInfos: [
    { label: "身長", value: "175 cm", size: 1 },
    { label: "誕生日", value: "1月19日", size: 1 },
    { label: "趣味", value: "アイドルの追っかけ（次元問わず）", size: 2 },
  ],
  policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  detailUrl: "https://zunko.jp/#charaCT",
  ...getCharacterAssets(key, styles),
} satisfies CharacterInfo;
