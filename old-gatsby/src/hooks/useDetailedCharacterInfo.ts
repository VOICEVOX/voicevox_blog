import { graphql, useStaticQuery } from "gatsby"
import { useMemo } from "react"
import { CharacterInfo, CharacterKey } from "../types/dormitoryCharacter"
import { useCharacterInfo } from "./useCharacterInfo"

export const useDetailedCharacterInfo = () => {
  const query: Queries.DetailedCharacterInfoQuery = useStaticQuery(graphql`
    query DetailedCharacterInfo {
      portrait: allFile(filter: { relativePath: { regex: "/portrait/" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              height: 1280
              aspectRatio: 1
              transformOptions: { fit: CONTAIN }
              backgroundColor: "#0000"
            )
          }
        }
      }
      bustup: allFile(filter: { relativePath: { regex: "/bustup/" } }) {
        nodes {
          name
          childImageSharp320px: childImageSharp {
            gatsbyImageData(height: 320)
          }
          childImageSharp640px: childImageSharp {
            gatsbyImageData(height: 640)
          }
        }
      }
      dormitoryImage: allFile(
        filter: {
          sourceInstanceName: { regex: "/image/" }
          relativePath: { regex: "/dormitory/" }
        }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(height: 320)
          }
        }
      }
      ogp: allFile(filter: { relativePath: { regex: "/bustup/" } }) {
        nodes {
          name
          childImageSharp {
            # バストアップ画像のトップ部分から1200x630をクロップ
            gatsbyImageData(
              width: 1200
              height: 630
              transformOptions: { cropFocus: NORTH }
            )
          }
        }
      }
    }
  `)

  const { getCharacterInfo } = useCharacterInfo()

  const getDatas = (info: { key: CharacterKey; characterId: string }) => {
    let dormitoryVoiceAudios: string[] | undefined = query.dormitoryAudio.nodes
      .filter(node => node.name.includes(`${info.characterId}`))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(node => node.publicURL!)
    if (dormitoryVoiceAudios.length == 0) dormitoryVoiceAudios = undefined
    const item = {
      bustupImageSmall: query.bustup.nodes.find(
        node => node.name === `bustup-${info.characterId}`
      )!.childImageSharp320px?.gatsbyImageData!,
      bustupImage: query.bustup.nodes.find(
        node => node.name === `bustup-${info.characterId}`
      )!.childImageSharp640px?.gatsbyImageData!,
      portraitImage: query.portrait.nodes.find(
        node => node.name === `portrait-${info.characterId}`
      )!.childImageSharp?.gatsbyImageData!,
      ogpImage: query.ogp.nodes.find(
        node => node.name === `bustup-${info.characterId}`
      )!.childImageSharp?.gatsbyImageData!,
      talkVoiceAudios: styleNames[info.key]
        .filter(v => v.type == "talk")
        .map(v => {
          return {
            style: v.name,
            urls: query.talkAudio.nodes
              .filter(node => node.name.includes(`${info.characterId}`))
              .filter(node => node.name.includes(`${v.id}`))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(node => node.publicURL!),
          }
        }),
      songVoiceAudios: styleNames[info.key]
        .filter(v => ["song", "humming"].includes(v.type))
        .map(v => {
          return {
            style: v.name,
            styleType: v.type as "song" | "humming",
            urls: query.songAudio.nodes
              .filter(node => node.name.includes(`${info.characterId}`))
              .filter(node => node.name.includes(`${v.id}`))
              .filter(node => node.name.includes(`${v.type}`))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(node => node.publicURL!),
          }
        }),
      dormitoryVoiceAudios,
      infoImages: query.dormitoryImage.nodes
        .filter(node => node.name.includes(`${info.characterId}`))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.childImageSharp?.gatsbyImageData!),
    }
    if (item.bustupImage == undefined)
      throw new Error(`bustupImage is undefined. ${info.characterId}`)
    if (item.portraitImage == undefined)
      throw new Error(`portraitImage is undefined. ${info.characterId}`)
    if (item.ogpImage == undefined)
      throw new Error(`ogpImage is undefined. ${info.characterId}`)
    if (item.talkVoiceAudios.length == 0)
      console.warn(`talkVoiceAudios is empty. ${info.characterId}`)
    if (item.talkVoiceAudios.some(v => v.urls.length != 3))
      throw new Error(`talkVoiceAudios is invalid. ${info.characterId}`)
    if (item.songVoiceAudios.length == 0)
      console.warn(`songVoiceAudios is empty. ${info.characterId}`)
    if (item.songVoiceAudios.some(v => v.urls.length != 3))
      throw new Error(`songVoiceAudios is invalid. ${info.characterId}`)
    if (
      item.dormitoryVoiceAudios != undefined &&
      item.dormitoryVoiceAudios.length == 0
    )
      console.warn(`dormitoryVoiceAudios is empty. ${info.characterId}`)
    return item
  }

  // キャラクターの詳細情報
  // ネストを浅くするために一旦変数に格納
  const _characterInfos: {
    [key in CharacterKey]: CharacterInfo
  } = {
    ずんだもん: {},

    春日部つむぎ: {},

    雨晴はう: {},

    波音リツ: {},

    玄野武宏: {},

    白上虎太郎: {},

    青山龍星: {},

    冥鳴ひまり: {},

    九州そら: {},

    モチノキョウコ: {},

    剣崎雌雄: {},

    WhiteCUL: {},

    後鬼: {},

    No7: {},

    ちび式じい: {},

    櫻歌ミコ: {},

    小夜_SAYO: {},

    ナースロボ＿タイプＴ: {},

    聖騎士紅桜: {},

    雀松朱司: {},

    麒ヶ島宗麟: {},

    春歌ナナ: {},

    猫使アル: {},

    猫使ビィ: {},

    中国うさぎ: {},

    栗田まろん: {},

    藍田ノエル: {},

    満別花丸: {},

    琴詠ニア: {},
  } as const

  const characterInfos = useMemo(() => _characterInfos, [])
  const callNameInfos = useMemo(() => _callNameInfos, [])

  return {
    characterInfos,
    callNameInfos,
  } as const
}
