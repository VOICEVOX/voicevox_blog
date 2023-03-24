import { IGatsbyImageData } from "gatsby-plugin-image"

export type CharacterKey =
  | "四国めたん"
  | "ずんだもん"
  | "春日部つむぎ"
  | "雨晴はう"
  | "波音リツ"
  | "玄野武宏"
  | "白上虎太郎"
  | "青山龍星"
  | "冥鳴ひまり"
  | "九州そら"
  | "モチノキョウコ"
  | "剣崎雌雄"
  | "WhiteCUL"
  | "後鬼"
  | "No7"
  | "ちび式じい"
  | "櫻歌ミコ"
  | "小夜_SAYO"
  | "ナースロボ＿タイプＴ"
  | "聖騎士紅桜"
  | "雀松朱司"
  | "麒ヶ島宗麟"
  | "春歌ナナ"
  | "猫使アル"
  | "猫使ビィ"

export type CharacterInfo = {
  name: string
  id: string
  rubyName: string
  voiceFeature: string | undefined
  bustupImage: IGatsbyImageData
  bustupImageSmall: IGatsbyImageData
  portraitImage: IGatsbyImageData
  ogpImage: IGatsbyImageData
  color: string
  lightColor: string
  description: string
  labelInfos: readonly { label: string; value: string; size: 1 | 2 }[]
  styleVoiceUrls: { style: string; urls: readonly string[] }[]
  dormitoryVoiceUrls?: readonly string[]
  infoImages?: readonly IGatsbyImageData[]
  detailUrl: string | undefined
  policyUrl: string | undefined
  releaseDate?: string
}

export type Generation = "一期生" | "二期生" | "三期生"
