import { IGatsbyImageData } from "gatsby-plugin-image"

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
  description: string // ボイボ寮ページでの紹介文
  additionalProductDescription?: string // 製品ページでの追加の紹介文
  labelInfos: readonly { label: string; value: string; size: 1 | 2 }[]
  talkVoiceUrls: { style: string; urls: readonly string[] }[]
  songVoiceUrls: {
    style: string
    styleType: "song" | "humming"
    urls: readonly string[]
  }[]
  dormitoryVoiceUrls?: readonly string[]
  infoImages?: readonly IGatsbyImageData[]
  detailUrl: string | undefined
  policyUrl: string | undefined
  releaseDate?: string
}

export type Generation = "一期生" | "二期生" | "三期生"
