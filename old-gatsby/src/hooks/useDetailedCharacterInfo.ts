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
      talkAudio: allFile(
        filter: {
          sourceInstanceName: { eq: "audio" }
          relativePath: { regex: "/^talk/[^/]+$/" }
        }
      ) {
        nodes {
          name
          publicURL
        }
      }
      songAudio: allFile(
        filter: {
          sourceInstanceName: { eq: "audio" }
          relativePath: { regex: "/^song/[^/]+$/" }
        }
      ) {
        nodes {
          name
          publicURL
        }
      }
      dormitoryAudio: allFile(
        filter: {
          sourceInstanceName: { eq: "audio" }
          relativePath: { regex: "/^dormitory/" }
        }
      ) {
        nodes {
          name
          publicURL
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

  // キャラごとのスタイル一覧
  const styleNames: {
    [key in CharacterKey]: {
      name: string
      id: string
      type: "talk" | "song" | "humming"
    }[]
  } = {
    四国めたん: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "あまあま", id: "ama", type: "talk" },
      { name: "ツンツン", id: "tsun", type: "talk" },
      { name: "セクシー", id: "sexy", type: "talk" },
      { name: "ささやき", id: "whis", type: "talk" },
      { name: "ヒソヒソ", id: "hiso", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "あまあま", id: "ama", type: "humming" },
      { name: "ツンツン", id: "tsun", type: "humming" },
      { name: "セクシー", id: "sexy", type: "humming" },
      { name: "ヒソヒソ", id: "hiso", type: "humming" },
    ],
    ずんだもん: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "あまあま", id: "ama", type: "talk" },
      { name: "ツンツン", id: "tsun", type: "talk" },
      { name: "セクシー", id: "sexy", type: "talk" },
      { name: "ささやき", id: "whis", type: "talk" },
      { name: "ヒソヒソ", id: "hiso", type: "talk" },
      { name: "ヘロヘロ", id: "herohero", type: "talk" },
      { name: "なみだめ", id: "namidame", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "あまあま", id: "ama", type: "humming" },
      { name: "ツンツン", id: "tsun", type: "humming" },
      { name: "セクシー", id: "sexy", type: "humming" },
      { name: "ヒソヒソ", id: "hiso", type: "humming" },
      { name: "ヘロヘロ", id: "herohero", type: "humming" },
      { name: "なみだめ", id: "namidame", type: "humming" },
    ],
    春日部つむぎ: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    雨晴はう: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    波音リツ: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "クイーン", id: "queen", type: "talk" },
      { name: "ノーマル", id: "normal", type: "song" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "クイーン", id: "queen", type: "humming" },
    ],
    玄野武宏: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "喜び", id: "fun", type: "talk" },
      { name: "ツンギレ", id: "angry", type: "talk" },
      { name: "悲しみ", id: "sad", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "喜び", id: "fun", type: "humming" },
      { name: "ツンギレ", id: "angry", type: "humming" },
      { name: "悲しみ", id: "sad", type: "humming" },
    ],
    白上虎太郎: [
      { name: "ふつう", id: "normal", type: "talk" },
      { name: "わーい", id: "joy", type: "talk" },
      { name: "おこ", id: "angry", type: "talk" },
      { name: "びくびく", id: "biku", type: "talk" },
      { name: "びえーん", id: "cry", type: "talk" },
      { name: "ふつう", id: "normal", type: "humming" },
      { name: "わーい", id: "joy", type: "humming" },
      { name: "おこ", id: "angry", type: "humming" },
      { name: "びくびく", id: "biku", type: "humming" },
      { name: "びえーん", id: "cry", type: "humming" },
    ],
    青山龍星: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "熱血", id: "eager", type: "talk" },
      { name: "不機嫌", id: "grumpy", type: "talk" },
      { name: "喜び", id: "happy", type: "talk" },
      { name: "しっとり", id: "mellow", type: "talk" },
      { name: "かなしみ", id: "sad", type: "talk" },
      { name: "囁き", id: "whisper", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "熱血", id: "eager", type: "humming" },
      { name: "不機嫌", id: "grumpy", type: "humming" },
      { name: "喜び", id: "happy", type: "humming" },
      { name: "しっとり", id: "mellow", type: "humming" },
      { name: "かなしみ", id: "sad", type: "humming" },
    ],
    冥鳴ひまり: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    九州そら: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "あまあま", id: "ama", type: "talk" },
      { name: "ツンツン", id: "tsun", type: "talk" },
      { name: "セクシー", id: "sexy", type: "talk" },
      { name: "ささやき", id: "whis", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "あまあま", id: "ama", type: "humming" },
      { name: "ツンツン", id: "tsun", type: "humming" },
      { name: "セクシー", id: "sexy", type: "humming" },
    ],
    モチノキョウコ: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "セクシー／あん子", id: "sexy", type: "talk" },
      { name: "泣き", id: "cry", type: "talk" },
      { name: "怒り", id: "angry", type: "talk" },
      { name: "喜び", id: "joy", type: "talk" },
      { name: "のんびり", id: "relax", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "セクシー／あん子", id: "sexy", type: "humming" },
      { name: "泣き", id: "cry", type: "humming" },
      { name: "怒り", id: "angry", type: "humming" },
      { name: "喜び", id: "joy", type: "humming" },
      { name: "のんびり", id: "relax", type: "humming" },
    ],
    剣崎雌雄: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    WhiteCUL: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "たのしい", id: "joy", type: "talk" },
      { name: "かなしい", id: "sad", type: "talk" },
      { name: "びえーん", id: "cry", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "たのしい", id: "joy", type: "humming" },
      { name: "かなしい", id: "sad", type: "humming" },
      { name: "びえーん", id: "cry", type: "humming" },
    ],
    後鬼: [
      { name: "人間ver.", id: "normal", type: "talk" },
      { name: "ぬいぐるみver.", id: "nuigurumi", type: "talk" },
      { name: "人間（怒り）ver.", id: "angry", type: "talk" },
      { name: "鬼ver.", id: "oni", type: "talk" },
      { name: "人間ver.", id: "normal", type: "humming" },
      { name: "ぬいぐるみver.", id: "nuigurumi", type: "humming" },
    ],
    No7: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "アナウンス", id: "announce", type: "talk" },
      { name: "読み聞かせ", id: "reading", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "アナウンス", id: "announce", type: "humming" },
      { name: "読み聞かせ", id: "reading", type: "humming" },
    ],
    ちび式じい: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    櫻歌ミコ: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "第二形態", id: "2nd", type: "talk" },
      { name: "ロリ", id: "loli", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "第二形態", id: "2nd", type: "humming" },
      { name: "ロリ", id: "loli", type: "humming" },
    ],
    小夜_SAYO: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    ナースロボ＿タイプＴ: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "楽々", id: "fun", type: "talk" },
      { name: "恐怖", id: "fear", type: "talk" },
      { name: "内緒話", id: "whis", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "楽々", id: "fun", type: "humming" },
      { name: "恐怖", id: "fear", type: "humming" },
    ],
    聖騎士紅桜: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    雀松朱司: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    麒ヶ島宗麟: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    春歌ナナ: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    猫使アル: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "おちつき", id: "ochitsuki", type: "talk" },
      { name: "うきうき", id: "fun", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "おちつき", id: "ochitsuki", type: "humming" },
      { name: "うきうき", id: "fun", type: "humming" },
    ],
    猫使ビィ: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "おちつき", id: "ochitsuki", type: "talk" },
      { name: "人見知り", id: "shy", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "おちつき", id: "ochitsuki", type: "humming" },
    ],
    中国うさぎ: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "おどろき", id: "surprise", type: "talk" },
      { name: "こわがり", id: "fear", type: "talk" },
      { name: "へろへろ", id: "tired", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "おどろき", id: "surprise", type: "humming" },
      { name: "こわがり", id: "fear", type: "humming" },
      { name: "へろへろ", id: "tired", type: "humming" },
    ],
    栗田まろん: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    藍田ノエル: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    満別花丸: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "元気", id: "fun", type: "talk" },
      { name: "ささやき", id: "whis", type: "talk" },
      { name: "ぶりっ子", id: "cute", type: "talk" },
      { name: "ボーイ", id: "boy", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
      { name: "元気", id: "fun", type: "humming" },
      { name: "ささやき", id: "whis", type: "humming" },
      { name: "ぶりっ子", id: "cute", type: "humming" },
      { name: "ボーイ", id: "boy", type: "humming" },
    ],
    琴詠ニア: [
      { name: "ノーマル", id: "normal", type: "talk" },
      { name: "ノーマル", id: "normal", type: "humming" },
    ],
    Voidoll: [{ name: "ノーマル", id: "normal", type: "talk" }],
  }

  const getDatas = (info: { key: CharacterKey; characterId: string }) => {
    let dormitoryVoiceUrls: string[] | undefined = query.dormitoryAudio.nodes
      .filter(node => node.name.includes(`${info.characterId}`))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(node => node.publicURL!)
    if (dormitoryVoiceUrls.length == 0) dormitoryVoiceUrls = undefined
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
      talkVoiceUrls: styleNames[info.key]
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
      songVoiceUrls: styleNames[info.key]
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
      dormitoryVoiceUrls,
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
    if (item.talkVoiceUrls.length == 0)
      console.warn(`talkVoiceUrls is empty. ${info.characterId}`)
    if (item.talkVoiceUrls.some(v => v.urls.length != 3))
      throw new Error(`talkVoiceUrls is invalid. ${info.characterId}`)
    if (item.songVoiceUrls.length == 0)
      console.warn(`songVoiceUrls is empty. ${info.characterId}`)
    if (item.songVoiceUrls.some(v => v.urls.length != 3))
      throw new Error(`songVoiceUrls is invalid. ${info.characterId}`)
    if (
      item.dormitoryVoiceUrls != undefined &&
      item.dormitoryVoiceUrls.length == 0
    )
      console.warn(`dormitoryVoiceUrls is empty. ${info.characterId}`)
    return item
  }

  // キャラクターの詳細情報
  // ネストを浅くするために一旦変数に格納
  const _characterInfos: {
    [key in CharacterKey]: CharacterInfo
  } = {
    四国めたん: {
      name: getCharacterInfo("四国めたん").name,
      id: getCharacterInfo("四国めたん").characterId,
      ...getDatas(getCharacterInfo("四国めたん")),
      rubyName: "<ruby>四国<rp>(</rp><rt>しこく</rt><rp>)</rp>めたん</ruby>",
      voiceFeature: "はっきりした芯のある声",
      color: "#DF4C94",
      lightColor: "#E3ADD5",
      description:
        "高等部二年生。常に金欠。趣味は中二病妄想。<br />誰にでも遠慮しないので、基本的にタメ口。",
      labelInfos: [
        { label: "年齢", value: "17 歳", size: 1 },
        { label: "身長", value: "150 cm", size: 1 },
        { label: "性格", value: "若干ツンデレ気味", size: 2 },
      ],
      policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
      detailUrl: "https://zunko.jp/#charaSM",
    },

    ずんだもん: {
      name: getCharacterInfo("ずんだもん").name,
      id: getCharacterInfo("ずんだもん").characterId,
      ...getDatas(getCharacterInfo("ずんだもん")),
      rubyName: "<ruby>ずんだもん</ruby>",
      voiceFeature: "子供っぽい高めの声",
      color: "#33A65E",
      lightColor: "#CCEBC5",
      description:
        "ずんだ餅の精。やや不幸属性が備わっており、<br />ないがしろにされることもしばしば。",
      labelInfos: [
        {
          label: "趣味",
          value: "ずんだ餅にかかわることはだいたい好き",
          size: 2,
        },
        { label: "将来の夢", value: "ずんだ餅のさらなる普及", size: 2 },
      ],
      policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
      detailUrl: "https://zunko.jp/#charaZM",
    },

    春日部つむぎ: {
      name: getCharacterInfo("春日部つむぎ").name,
      id: getCharacterInfo("春日部つむぎ").characterId,
      ...getDatas(getCharacterInfo("春日部つむぎ")),
      rubyName:
        "<ruby>春日部<rp>(</rp><rt>かすかべ</rt><rp>)</rp>つむぎ</ruby>",
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
    },

    雨晴はう: {
      name: getCharacterInfo("雨晴はう").name,
      id: getCharacterInfo("雨晴はう").characterId,
      ...getDatas(getCharacterInfo("雨晴はう")),
      rubyName: "<ruby>雨晴<rp>(</rp><rt>あめはれ</rt><rp>)</rp>はう</ruby>",
      voiceFeature: "優しく可愛い声",
      color: "#1D86AE",
      lightColor: "#B3D7DD",
      description: "現役看護師です！<br />看護師のあれこれお伝えします！",
      labelInfos: [
        { label: "誕生日", value: "10月30日", size: 1 },
        { label: "身長", value: "152 cm", size: 1 },
        { label: "色", value: "#28c4ec", size: 1 },
        { label: "CV", value: "結崎このみ", size: 1 },
        { label: "好きなもの", value: "ラーメン", size: 2 },
        { label: "趣味", value: "食べ歩き", size: 2 },
      ],
      policyUrl: "https://amehau.com/?page_id=225",
      detailUrl: "https://amehau.com/",
    },

    波音リツ: {
      name: getCharacterInfo("波音リツ").name,
      id: getCharacterInfo("波音リツ").characterId,
      ...getDatas(getCharacterInfo("波音リツ")),
      rubyName: "<ruby>波音<rp>(</rp><rt>なみね</rt><rp>)</rp>リツ</ruby>",
      voiceFeature: "低めのクールな声",
      color: "#FC4E32",
      lightColor: "#FDCDB7",
      description:
        "地獄のような安価を踏み抜いて生まれた、<br />2ch・VIP発のキャラクター。",
      labelInfos: [
        { label: "年齢", value: "6 歳", size: 2 },
        { label: "身長", value: "156 cm", size: 2 },
        { label: "体重", value: "25 トン", size: 2 },
        { label: "好きなもの", value: "チョコクリスピー", size: 2 },
      ],
      policyUrl: "http://canon-voice.com/kiyaku.html",
      detailUrl: "https://www.canon-voice.com/",
    },

    玄野武宏: {
      name: getCharacterInfo("玄野武宏").name,
      id: getCharacterInfo("玄野武宏").characterId,
      ...getDatas(getCharacterInfo("玄野武宏")),
      rubyName:
        "<ruby>玄野<rp>(</rp><rt>くろの</rt><rp>)</rp>武宏<rp>(</rp><rt>たけひろ</rt><rp>)</rp></ruby>",
      voiceFeature: "爽やかな青年の声",
      color: "#1AA18E",
      lightColor: "#B3E2D8",
      description: "サッパリした青年。<br />やや短気だが面倒見は良い。",
      labelInfos: [
        { label: "身長", value: "177 cm", size: 2 },
        { label: "体重", value: "66 kg", size: 2 },
        { label: "年齢", value: "20代前後", size: 2 },
        { label: "誕生日", value: "12月24日", size: 2 },
      ],
      policyUrl:
        "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
      detailUrl: "https://virvoxproject.wixsite.com/official/玄野武宏",
    },

    白上虎太郎: {
      name: getCharacterInfo("白上虎太郎").name,
      id: getCharacterInfo("白上虎太郎").characterId,
      ...getDatas(getCharacterInfo("白上虎太郎")),
      rubyName:
        "<ruby>白上<rp>(</rp><rt>しらかみ</rt><rp>)</rp>虎太郎<rp>(</rp><rt>こたろう</rt><rp>)</rp></ruby>",
      voiceFeature: "声変わり直後の少年の声",
      color: "#99D02B",
      lightColor: "#E6F5B0",
      description:
        "まっすぐで人懐っこい青年。<br />愛嬌はあるものの少しおばか。",
      labelInfos: [
        { label: "身長", value: "146 cm", size: 2 },
        { label: "体重", value: "42 kg", size: 2 },
        { label: "年齢", value: "18 歳", size: 2 },
        { label: "誕生日", value: "秋生まれ", size: 2 },
      ],
      policyUrl:
        "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
      detailUrl: "https://virvoxproject.wixsite.com/official/白上虎太郎",
    },

    青山龍星: {
      name: getCharacterInfo("青山龍星").name,
      id: getCharacterInfo("青山龍星").characterId,
      ...getDatas(getCharacterInfo("青山龍星")),
      rubyName:
        "<ruby>青山<rp>(</rp><rt>あおやま</rt><rp>)</rp>龍星<rp>(</rp><rt>りゅうせい</rt><rp>)</rp></ruby>",
      voiceFeature: "重厚で低音な声",
      color: "#386CB0",
      lightColor: "#B3CDE3",
      description: "とにかく大柄で無骨な青年。<br />寡黙で冷静なストッパー枠。",
      labelInfos: [
        { label: "身長", value: "194 cm", size: 2 },
        { label: "体重", value: "94 kg", size: 2 },
        { label: "年齢", value: "24 歳", size: 2 },
        { label: "誕生日", value: "春生まれ", size: 2 },
      ],
      policyUrl:
        "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
      detailUrl: "https://virvoxproject.wixsite.com/official/青山龍星",
    },

    冥鳴ひまり: {
      name: getCharacterInfo("冥鳴ひまり").name,
      id: getCharacterInfo("冥鳴ひまり").characterId,
      ...getDatas(getCharacterInfo("冥鳴ひまり")),
      rubyName: "<ruby>冥鳴<rp>(</rp><rt>めいめい</rt><rp>)</rp>ひまり</ruby>",
      voiceFeature: "柔らかく温かい声",
      color: "#A45AAA",
      lightColor: "#CAB2D6",
      description: "冥界から来た死神。<br />可愛いものに目がない。",
      labelInfos: [
        { label: "年齢", value: "18 歳", size: 1 },
        { label: "種族", value: "死神", size: 1 },
        { label: "誕生日", value: "9月1日", size: 1 },
        { label: "好きな日本語", value: "不渡り", size: 1 },
        { label: "好きなもの", value: "可愛い女の子", size: 2 },
        { label: "性格", value: "優しくて清楚（自称）", size: 2 },
      ],
      policyUrl: "https://meimeihimari.wixsite.com/himari/terms-of-use",
      detailUrl: "https://meimeihimari.wixsite.com/himari/voicevox",
    },

    九州そら: {
      name: getCharacterInfo("九州そら").name,
      id: getCharacterInfo("九州そら").characterId,
      ...getDatas(getCharacterInfo("九州そら")),
      rubyName:
        "<ruby>九州<rp>(</rp><rt>きゅうしゅう</rt><rp>)</rp>そら</ruby>",
      voiceFeature: "気品のある大人な声",
      color: "#6964AD",
      lightColor: "#B2B6D8",
      description:
        "宇宙開拓用に開発されたアンドロイド。<br />正式名称は「九州そらmk=II」（まーくつー）。",
      labelInfos: [
        {
          label: "年齢",
          value: "0 歳（外見年齢は17歳）",
          size: 2,
        },
        {
          label: "身長",
          value: "173 cm（ヒールなしだと160cm）",
          size: 2,
        },
      ],
      policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
      detailUrl: "https://zunko.jp/#charaKS2",
    },

    モチノキョウコ: {
      name: getCharacterInfo("モチノキョウコ").name,
      id: getCharacterInfo("モチノキョウコ").characterId,
      ...getDatas(getCharacterInfo("モチノキョウコ")),
      rubyName:
        "<ruby>もち</ruby><ruby>子<rp>(</rp><rt>こ</rt><rp>)</rp>さん</ruby>",
      voiceFeature: "明瞭で穏やかな声",
      color: "#1D86AE",
      lightColor: "#B3D7DD",
      description:
        "小さい背丈で頑張る君を応援！<br />福島県生まれのプラモ好き犬系ヲタ娘です",
      labelInfos: [
        { label: "本名", value: "ﾓﾁﾉ･ｷｮｳｺ", size: 1 },
        { label: "CV", value: "明日葉よもぎ", size: 1 },
        { label: "相棒（？）", value: "あん子ちゃん", size: 1 },
        { label: "身長", value: "142 cm", size: 1 },
      ],
      policyUrl: "https://vtubermochio.wixsite.com/mochizora/利用規約",
      detailUrl:
        "https://vtubermochio.wixsite.com/mochizora/もち子さんとは-設定資料",
    },

    剣崎雌雄: {
      name: getCharacterInfo("剣崎雌雄").name,
      id: getCharacterInfo("剣崎雌雄").characterId,
      ...getDatas(getCharacterInfo("剣崎雌雄")),
      rubyName:
        "<ruby>剣崎<rp>(</rp><rt>けんざき</rt><rp>)</rp>雌雄<rp>(</rp><rt>めすお</rt><rp>)</rp></ruby>",
      voiceFeature: "安心感のある落ち着いた声",
      color: "#33A65E",
      lightColor: "#CCEBC5",
      description:
        "メスお兄さんじゃねえ！メスのお兄さんだ！<br />（人類滅亡を目論む医療用メスの付喪神）",
      labelInfos: [
        { label: "種族", value: "医療用メス（付喪神）", size: 2 },
        { label: "好物", value: "人間のクソデカ感情・砥石", size: 2 },
        { label: "身長", value: "2m超", size: 1 },
        { label: "誕生日", value: "7月7日", size: 1 },
        { label: "目的", value: "人類滅亡", size: 1 },
        { label: "年齢", value: "3600 歳", size: 1 },
      ],
      policyUrl: "https://frontier.creatia.cc/fanclubs/413/posts/4507",
      detailUrl: "https://frontier.creatia.cc/fanclubs/413/posts/4507",
    },

    WhiteCUL: {
      name: getCharacterInfo("WhiteCUL").name,
      id: getCharacterInfo("WhiteCUL").characterId,
      ...getDatas(getCharacterInfo("WhiteCUL")),
      rubyName:
        "<ruby>WhiteCUL<rp>(</rp><rt>ほわいとかる</rt><rp>)</rp></ruby>",
      voiceFeature: "聞き心地のよい率直な声",
      color: "#1D86AE",
      lightColor: "#B3D7DD",
      description:
        "CULの姉。風雪月花四姉妹の雪。冷静に見えるが、<br />実は小心者のクールビューティー。",
      labelInfos: [
        { label: "年齢", value: "20 歳", size: 1 },
        { label: "身長", value: "165 cm", size: 1 },
        { label: "体重", value: "内緒", size: 1 },
        { label: "誕生日", value: "9月30日", size: 1 },
        { label: "愛称", value: "雪さん", size: 1 },
        { label: "相棒", value: "雪おこじょ", size: 1 },
        { label: "好物", value: "バニラソフトクリーム", size: 2 },
      ],
      policyUrl: "https://www.whitecul.com/guideline",
      detailUrl: "https://www.whitecul.com/",
    },

    後鬼: {
      name: getCharacterInfo("後鬼").name,
      id: getCharacterInfo("後鬼").characterId,
      ...getDatas(getCharacterInfo("後鬼")),
      rubyName: "<ruby>後鬼<rp>(</rp><rt>ごき</rt><rp>)</rp></ruby>",
      voiceFeature: "包容力のある奥ゆかしい声",
      color: "#386CB0",
      lightColor: "#B3CDE3",
      description:
        "鬼っ子ハンターついなちゃんの式神。<br />人間態では色っぽい大人の女性の話し方になる。",
      labelInfos: [
        { label: "CV", value: "七海映子", size: 1 },
        { label: "年齢", value: "少なくとも1300歳以上", size: 2 },
        { label: "身長", value: "ヒール込みで170cm", size: 2 },
        { label: "体重", value: "スイカ2つ分（某部分が）", size: 2 },
      ],
      policyUrl: "https://ついなちゃん.com/voicevox_terms/",
      detailUrl: "https://ついなちゃん.com/character/?goki",
    },

    No7: {
      name: getCharacterInfo("No7").name,
      id: getCharacterInfo("No7").characterId,
      ...getDatas(getCharacterInfo("No7")),
      rubyName: "<ruby>No.7<rp>(</rp><rt>なんばーせぶん</rt><rp>)</rp></ruby>",
      voiceFeature: "しっかりした凛々しい声",
      color: "#A45AAA",
      lightColor: "#CAB2D6",
      description:
        "正体がつかめない不思議な女性。<br />得意のメイクで複数の「顔」を持つ。",
      labelInfos: [
        { label: "年齢", value: "23 歳", size: 1 },
        { label: "身長", value: "165 cm", size: 1 },
        { label: "CV", value: "小岩井ことり", size: 1 },
        { label: "好きなもの", value: "子供", size: 1 },
        {
          label: "性格",
          value: "ミニマリストで部屋の明かりは蝋燭のみ",
          size: 2,
        },
        { label: "趣味", value: "かいわれ大根の栽培", size: 2 },
      ],
      policyUrl: "https://voiceseven.com/#j0200",
      detailUrl: "https://voiceseven.com/",
    },

    ちび式じい: {
      name: getCharacterInfo("ちび式じい").name,
      id: getCharacterInfo("ちび式じい").characterId,
      ...getDatas(getCharacterInfo("ちび式じい")),
      rubyName:
        "<ruby>ちび</ruby><ruby>式<rp>(</rp><rt>しき</rt><rp>)</rp></ruby><ruby>じい</ruby>",
      voiceFeature: "親しみのある嗄れ声",
      color: "#1D86AE",
      lightColor: "#B3D7DD",
      description:
        "式じいに似た姿の小さい妖精さん。<br />世界各地に様々な個体が生息している。",
      labelInfos: [
        { label: "身長", value: "20 cm前後", size: 1 },
        { label: "CV", value: "こんぺえる", size: 1 },
        { label: "好きなもの", value: "ジャガイモ", size: 1 },
        { label: "種族", value: "ちび式じい", size: 1 },
      ],
      policyUrl:
        "https://docs.google.com/presentation/d/1AcD8zXkfzKFf2ertHwWRwJuQXjNnijMxhz7AJzEkaI4",
      detailUrl:
        "https://shiki-rowen-taigen.com/%e5%88%a9%e7%94%a8%e8%a6%8f%e7%b4%84%e3%83%bb%e3%82%ac%e3%82%a4%e3%83%89%e3%83%a9%e3%82%a4%e3%83%b3/",
    },

    櫻歌ミコ: {
      name: getCharacterInfo("櫻歌ミコ").name,
      id: getCharacterInfo("櫻歌ミコ").characterId,
      ...getDatas(getCharacterInfo("櫻歌ミコ")),
      rubyName:
        "<ruby>櫻歌<rp>(</rp><rt>おうか</rt><rp>)</rp></ruby><ruby>ミコ</ruby>",
      voiceFeature: "かわいらしい少女の声",
      color: "#F9344C",
      lightColor: "#FBB4C4",
      description:
        "ニホンオオカミの女の子。<br />もうひとりのミコ（通称：第二ちゃん）がいる。",
      labelInfos: [
        { label: "年齢", value: "3.5 歳", size: 1 },
        { label: "身長", value: "135 cm", size: 1 },
        { label: "体重", value: "35 kg", size: 1 },
        { label: "誕生日", value: "12月24日", size: 1 },
        { label: "性格", value: "ガブデレ", size: 1 },
        { label: "持ち物", value: "りんご/骨", size: 1 },
        { label: "愛称", value: "みこみこ/第二ちゃん", size: 2 },
      ],
      policyUrl: "https://voicevox35miko.studio.site/rule",
      detailUrl: "https://voicevox35miko.studio.site/",
    },

    小夜_SAYO: {
      name: getCharacterInfo("小夜_SAYO").name,
      id: getCharacterInfo("小夜_SAYO").characterId,
      ...getDatas(getCharacterInfo("小夜_SAYO")),
      rubyName:
        "<ruby>小夜<rp>(</rp><rt>さよ</rt><rp>)</rp></ruby><ruby>/SAYO</ruby>",
      voiceFeature: "和やかで温厚な声",
      color: "#FF6687",
      lightColor: "#FBB4C4",
      description:
        "おしゃべりがすきなねこの女の子。<br />おいしいものを与えると懐きやすい。",
      labelInfos: [
        { label: "誕生日", value: "9月29日", size: 1 },
        { label: "好きなもの", value: "缶詰", size: 1 },
        { label: "体長", value: "135 cm（猫耳を含む）", size: 2 },
      ],
      policyUrl: "https://316soramegu.wixsite.com/sayo-official/guideline",
      detailUrl: "https://316soramegu.wixsite.com/sayo-official",
    },

    ナースロボ＿タイプＴ: {
      name: getCharacterInfo("ナースロボ＿タイプＴ").name,
      id: getCharacterInfo("ナースロボ＿タイプＴ").characterId,
      ...getDatas(getCharacterInfo("ナースロボ＿タイプＴ")),
      rubyName:
        "<ruby>ナースロボ＿タイプ</ruby><ruby>Ｔ<rp>(</rp><rt>てぃー</rt><rp>)</rp></ruby>",
      voiceFeature: "冷静で慎み深い声",
      color: "#FF9914",
      lightColor: "#FEE6AA",
      description:
        "医者に作られたナース形ロボット。<br />人格は少女と設定されている。",
      labelInfos: [
        { label: "年齢", value: "五ヶ月", size: 1 },
        { label: "誕生日", value: "12月3日", size: 1 },
        { label: "身長", value: "150～160 cm（パーツによる）", size: 2 },
        { label: "愛称", value: "ＴＴ", size: 2 },
        { label: "製造者", value: "そばの小型ロボット（医者）", size: 2 },
      ],
      policyUrl: "https://www.krnr.top/rules",
      detailUrl: "https://www.krnr.top/blank",
    },

    聖騎士紅桜: {
      name: getCharacterInfo("聖騎士紅桜").name,
      id: getCharacterInfo("聖騎士紅桜").characterId,
      ...getDatas(getCharacterInfo("聖騎士紅桜")),
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
    },

    雀松朱司: {
      name: getCharacterInfo("雀松朱司").name,
      id: getCharacterInfo("雀松朱司").characterId,
      ...getDatas(getCharacterInfo("雀松朱司")),
      rubyName:
        "<ruby>雀松<rp>(</rp><rt>わかまつ</rt><rp>)</rp>朱司<rp>(</rp><rt>あかし</rt><rp>)</rp></ruby>",
      voiceFeature: "物静かで安定した声",
      color: "#FC4E32",
      lightColor: "#FDCDB7",
      description:
        "温厚なしっかり者の青年。<br />ちょっぴり天然で抜けている面も･･･。",
      labelInfos: [
        { label: "身長", value: "182 cm", size: 1 },
        { label: "体重", value: "68 kg", size: 1 },
        { label: "年齢", value: "26 歳", size: 1 },
        { label: "誕生日", value: "7月17日", size: 1 },
        { label: "趣味", value: "読書、掃除、買い物", size: 2 },
      ],
      policyUrl:
        "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
      detailUrl: "https://virvoxproject.wixsite.com/official/雀松朱司",
    },

    麒ヶ島宗麟: {
      name: getCharacterInfo("麒ヶ島宗麟").name,
      id: getCharacterInfo("麒ヶ島宗麟").characterId,
      ...getDatas(getCharacterInfo("麒ヶ島宗麟")),
      rubyName:
        "<ruby>麒ヶ島<rp>(</rp><rt>きがしま</rt><rp>)</rp>宗麟<rp>(</rp><rt>そうりん</rt><rp>)</rp></ruby>",
      voiceFeature: "渋いおじさん声",
      color: "#FF9914",
      lightColor: "#FEE6AA",
      description:
        "流行に敏感ないぶし銀おじいちゃん。<br />非常にミーハーでノリが良い。",
      labelInfos: [
        { label: "身長", value: "175 cm", size: 1 },
        { label: "体重", value: "79 kg", size: 1 },
        { label: "年齢", value: "50 歳（見た目年齢）※実年齢不明", size: 2 },
        { label: "趣味１", value: "パワースポット（霊脈？）巡り", size: 2 },
        { label: "趣味２", value: "入浴、SNS投稿", size: 2 },
      ],
      policyUrl:
        "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
      detailUrl: "https://virvoxproject.wixsite.com/official/麒ヶ島宗麟",
    },

    春歌ナナ: {
      name: getCharacterInfo("春歌ナナ").name,
      id: getCharacterInfo("春歌ナナ").characterId,
      ...getDatas(getCharacterInfo("春歌ナナ")),
      rubyName: "<ruby>春歌<rp>(</rp><rt>はるか</rt><rp>)</rp>ナナ</ruby>",
      voiceFeature: "はつらつとした力強い声",
      color: "#DF4C94",
      lightColor: "#E3ADD5",
      description: "いつだって元気いっぱいな女の子です。",
      labelInfos: [
        { label: "年齢", value: "10 歳", size: 1 },
        { label: "誕生日", value: "1月30日", size: 1 },
        { label: "身長", value: "137 cm（アホ毛込み）", size: 2 },
        { label: "好物", value: "サラミ、わらびもち", size: 2 },
        { label: "CV", value: "ななひら", size: 2 },
      ],
      policyUrl: "https://nanahira.jp/haruka_nana/guideline.html",
      detailUrl: "https://nanahira.jp/haruka_nana/",
    },

    猫使アル: {
      name: getCharacterInfo("猫使アル").name,
      id: getCharacterInfo("猫使アル").characterId,
      ...getDatas(getCharacterInfo("猫使アル")),
      rubyName: "<ruby>猫使<rp>(</rp><rt>ねこつか</rt><rp>)</rp>アル</ruby>",
      voiceFeature: "厚みのある気さくな声",
      color: "#F9344C",
      lightColor: "#FBB4C4",
      description: "謎の研究所で作られた<br />猫使シリーズの タイプ:Red",
      labelInfos: [
        { label: "身長", value: "140 cm", size: 1 },
        { label: "誕生日", value: "6月17日", size: 1 },
        { label: "年齢", value: "外見年齢10代前半", size: 2 },
        { label: "性格", value: "マイペース", size: 1 },
        { label: "好きなもの", value: "はまち", size: 1 },
        { label: "苦手なもの", value: "ねずみ", size: 1 },
        { label: "趣味", value: "噛むこと", size: 1 },
      ],
      policyUrl: "https://nekotukarb.wixsite.com/nekonohako/利用規約",
      detailUrl: "https://nekotukarb.wixsite.com/nekonohako",
    },

    猫使ビィ: {
      name: getCharacterInfo("猫使ビィ").name,
      id: getCharacterInfo("猫使ビィ").characterId,
      ...getDatas(getCharacterInfo("猫使ビィ")),
      rubyName: "<ruby>猫使<rp>(</rp><rt>ねこつか</rt><rp>)</rp>ビィ</ruby>",
      voiceFeature: "ピュアであどけない声",
      color: "#1D86AE",
      lightColor: "#B3D7DD",
      description: "謎の研究所で作られた<br />猫使シリーズの タイプ:Blue",
      labelInfos: [
        { label: "身長", value: "140 cm", size: 1 },
        { label: "誕生日", value: "6月17日", size: 1 },
        { label: "年齢", value: "外見年齢10代前半", size: 2 },
        { label: "性格", value: "シャイで臆病", size: 1 },
        { label: "好きなもの", value: "サーモン", size: 1 },
        { label: "苦手なもの", value: "おばけ", size: 1 },
        { label: "趣味", value: "おひるね", size: 1 },
      ],
      policyUrl: "https://nekotukarb.wixsite.com/nekonohako/利用規約",
      detailUrl: "https://nekotukarb.wixsite.com/nekonohako",
    },

    中国うさぎ: {
      name: getCharacterInfo("中国うさぎ").name,
      id: getCharacterInfo("中国うさぎ").characterId,
      ...getDatas(getCharacterInfo("中国うさぎ")),
      rubyName:
        "<ruby>中国<rp>(</rp><rt>ちゅうごく</rt><rp>)</rp>うさぎ</ruby>",
      voiceFeature: "幽玄で初々しい声",
      color: "#FC4E32",
      lightColor: "#FDCDB7",
      description:
        "巫女みこネットワークの一員で、日本各地で怪異の情報を集める。ぼそぼそしゃべるタイプの無口キャラ",
      labelInfos: [
        { label: "身長", value: "147 cm", size: 1 },
        { label: "年齢", value: "14 歳", size: 1 },
        { label: "相棒", value: "ぬいぐるみ「いなば」", size: 2 },
      ],
      policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
      detailUrl: "https://zunko.jp/#charaCU",
    },

    栗田まろん: {
      name: getCharacterInfo("栗田まろん").name,
      id: getCharacterInfo("栗田まろん").characterId,
      ...getDatas(getCharacterInfo("栗田まろん")),
      rubyName: "<ruby>栗田<rp>(</rp><rt>くりた</rt><rp>)</rp>まろん</ruby>",
      voiceFeature: "深みのある中性的な声",
      color: "#1AA18E",
      lightColor: "#B3E2D8",
      description:
        "友人たちに乗せられて女装したら好評だった<br />男子高生。図書委員所属。",
      labelInfos: [
        { label: "身長", value: "165 cm", size: 1 },
        { label: "誕生日", value: "10月9日", size: 1 },
        { label: "色", value: "栗色", size: 1 },
        { label: "CV", value: "栗田穣崇", size: 1 },
        { label: "趣味", value: "読書", size: 2 },
        { label: "好物", value: "モンブラン、マロンパフェ", size: 2 },
      ],
      policyUrl: "https://aivoice.jp/character/maron/",
      detailUrl: "https://aivoice.jp/character/maron/",
    },

    藍田ノエル: {
      name: getCharacterInfo("藍田ノエル").name,
      id: getCharacterInfo("藍田ノエル").characterId,
      ...getDatas(getCharacterInfo("藍田ノエル")),
      rubyName: "<ruby>あいえるたん</ruby>",
      voiceFeature: "心地よい物柔らかな声",
      color: "#FF9914",
      lightColor: "#FEE6AA",
      description:
        "札幌市内の高校に通う元気な女子高生。<br />IT企業でマスコット/アルバイトとして活躍中。",
      labelInfos: [
        { label: "本名", value: "藍田ノエル", size: 1 },
        { label: "CV", value: "Milia", size: 1 },
        { label: "年齢", value: "16 歳", size: 1 },
        { label: "誕生日", value: "7月1日", size: 1 },
        { label: "身長", value: "154.8 cm", size: 1 },
        { label: "好物", value: "コーラ", size: 1 },
        { label: "趣味", value: "プログラミング、ゲーム", size: 2 },
      ],
      policyUrl: "https://www.infiniteloop.co.jp/special/iltan/terms/",
      detailUrl: "https://www.infiniteloop.co.jp/special/iltan/",
    },

    満別花丸: {
      name: getCharacterInfo("満別花丸").name,
      id: getCharacterInfo("満別花丸").characterId,
      ...getDatas(getCharacterInfo("満別花丸")),
      rubyName:
        "<ruby>満別<rp>(</rp><rt>まんべつ</rt><rp>)</rp>花丸<rp>(</rp><rt>はなまる</rt><rp>)</rp></ruby>",
      voiceFeature: "生き生きとした際立つ声",
      color: "#99D02B",
      lightColor: "#E6F5B0",
      description: "全人類みんなにはなまるをあげる音声キャラクター",
      labelInfos: [
        { label: "身長", value: "138 cm", size: 2 },
        { label: "誕生日", value: "8月7日", size: 2 },
        { label: "出身", value: "北海道", size: 2 },
        { label: "好物", value: "うめぼし", size: 2 },
      ],
      policyUrl: "https://100hanamaru.wixsite.com/manbetsu-hanamaru/rule",
      detailUrl: "https://100hanamaru.wixsite.com/manbetsu-hanamaru",
    },

    琴詠ニア: {
      name: getCharacterInfo("琴詠ニア").name,
      id: getCharacterInfo("琴詠ニア").characterId,
      ...getDatas(getCharacterInfo("琴詠ニア")),
      rubyName: "<ruby>琴詠<rp>(</rp><rt>ことよみ</rt><rp>)</rp>ニア</ruby>",
      voiceFeature: "滑らかで無機質な声",
      color: "#FB8028",
      lightColor: "#FFD6B8",
      description:
        "N Airのシルエットが推し。ニコ生のコメントを<br />読み上げている、宇宙を旅する女の子。",
      labelInfos: [
        { label: "誕生日", value: "11月25日", size: 1 },
        { label: "CV", value: "ﾄﾞﾜﾝｺﾞの中の人", size: 1 },
        { label: "趣味", value: "グッズ制作", size: 1 },
        { label: "ルーティン", value: "配信チェック", size: 1 },
      ],
      policyUrl: "https://commons.nicovideo.jp/works/nc315435",
      detailUrl: "https://n-air-app.nicovideo.jp/",
    },
  } as const

  const characterInfos = useMemo(() => _characterInfos, [])
  const callNameInfos = useMemo(() => _callNameInfos, [])

  return {
    characterInfos,
    callNameInfos,
  } as const
}
