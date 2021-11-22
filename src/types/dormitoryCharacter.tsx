import { IGatsbyImageData } from "gatsby-plugin-image"

export type CharacterKey = "四国めたん" | "ずんだもん" | "春日部つむぎ"

export type CharacterInfo = {
  name: string
  rubyName: string
  bustupImage: IGatsbyImageData
  portraitImage: IGatsbyImageData
  color: string
  lightColor: string
  description: string
  labelInfos: { label: string; value: string; size: 1 | 2 }[]
  voiceUrls: string[]
  infoImages?: IGatsbyImageData[]
  callNames: {
    [key in CharacterKey]: string | undefined
  } & { me: string; you: string }
  detailUrl: string
}
