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

export type CharacterInfo = {
  name: string
  id: string
  rubyName: string
  bustupImage: IGatsbyImageData
  portraitImage: IGatsbyImageData
  ogpImage: IGatsbyImageData
  color: string
  lightColor: string
  description: string
  labelInfos: { label: string; value: string; size: 1 | 2 }[]
  voiceUrls?: string[]
  infoImages?: IGatsbyImageData[]
  detailUrl: string | undefined
}

export type Generation = "一期生" | "二期生" | "三期生"
