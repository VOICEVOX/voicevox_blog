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

export type CharacterInfo = {
  name: string
  rubyName: string
  bustupImage: IGatsbyImageData
  portraitImage: IGatsbyImageData
  color: string
  lightColor: string
  description: string
  labelInfos: { label: string; value: string; size: 1 | 2 }[]
  voiceUrls?: string[]
  infoImages?: IGatsbyImageData[]
  callNames: {
    [key in CharacterKey]?: string | undefined
  } & { me: string[]; you: string[] }
  detailUrl: string | undefined
}

export type Generation = "一期生" | "二期生" | "三期生"
