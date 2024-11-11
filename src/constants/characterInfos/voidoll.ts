import type { CharacterKey } from "@constants/characterEntry";
import type { CharacterInfo, StyleNames } from "../type";
import {
  bustupImages,
  portraitImages,
  dormitoryAudioArrays,
} from "@constants/characaterAsset";

const key = "Voidoll" satisfies CharacterKey;

const styleNames = [
  { name: "ノーマル", id: "normal", type: "talk" },
] as const satisfies StyleNames;

export default {
  key,
  name: "Voidoll",
  id: "voidoll",
  rubyName: "<ruby>Voidoll<rp>(</rp><rt>ぼいどーる</rt><rp>)</rp></ruby>",
  voiceFeature: "慎ましやかで電子的な声",
  bustupImage: bustupImages[key],
  // bustupImageSmall: AstroImage;
  portraitImage: portraitImages[key],
  // ogpImage: AstroImage;
  color: "#1D86AE",
  lightColor: "#B3D7DD",
  description:
    "「#コンパス」を管理するAIロボ<br />人間の戦い方を監視/分析している。",
  additionalProductDescription:
    "話速：0.90、音高：0.03、抑揚：0.90とすれば、「#コンパス 戦闘摂理解析システム」ゲーム内のボイスに近い仕上がりとなります。",
  talkVoiceUrls: [], // TODO: あとで変える
  songVoiceUrls: [], // TODO: あとで変える
  labelInfos: [
    { label: "CV", value: "丹下桜", size: 2 },
    { label: "アビリティ", value: "緊急回避プログラム", size: 2 },
    { label: "年齢", value: "？？？", size: 2 },
    { label: "身長", value: "？？？", size: 1 },
    { label: "誕生日", value: "？？？", size: 1 },
  ],
  dormitoryVoiceUrls: dormitoryAudioArrays[key],
  // infoImages: AstroImage[],
  policyUrl: "https://blog.nicovideo.jp/niconews/224589.html",
  detailUrl: "https://app.nhn-playart.com/compass/index.nhn",
} satisfies CharacterInfo;
