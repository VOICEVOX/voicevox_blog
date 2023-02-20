import { graphql, useStaticQuery } from "gatsby"
import {
  CharacterInfo,
  CharacterKey,
  Generation,
} from "../types/dormitoryCharacter"
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
      styleAudio: allFile(
        filter: {
          sourceInstanceName: { eq: "audio" }
          relativePath: { regex: "/^(?!dormitory)/" }
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

  // リリースされていないキャラクター一覧
  const comingSoonCharacters: CharacterKey[] = [
    "聖騎士紅桜",
    "雀松朱司",
    "麒ヶ島宗麟",
  ]

  // キャラごとのスタイル一覧
  const styleNames: { [key in CharacterKey]: { name: string; id: string }[] } =
    {
      四国めたん: [
        { name: "ノーマル", id: "normal" },
        { name: "あまあま", id: "ama" },
        { name: "ツンツン", id: "tsun" },
        { name: "セクシー", id: "sexy" },
        { name: "ささやき", id: "whis" },
        { name: "ヒソヒソ", id: "hiso" },
      ],
      ずんだもん: [
        { name: "ノーマル", id: "normal" },
        { name: "あまあま", id: "ama" },
        { name: "ツンツン", id: "tsun" },
        { name: "セクシー", id: "sexy" },
        { name: "ささやき", id: "whis" },
        { name: "ヒソヒソ", id: "hiso" },
      ],
      春日部つむぎ: [{ name: "ノーマル", id: "normal" }],
      雨晴はう: [{ name: "ノーマル", id: "normal" }],
      波音リツ: [{ name: "ノーマル", id: "normal" }],
      玄野武宏: [
        { name: "ノーマル", id: "normal" },
        { name: "喜び", id: "fun" },
        { name: "ツンギレ", id: "angry" },
        { name: "悲しみ", id: "sad" },
      ],
      白上虎太郎: [
        { name: "ふつう", id: "normal" },
        { name: "わーい", id: "joy" },
        { name: "おこ", id: "angry" },
        { name: "びくびく", id: "biku" },
        { name: "びえーん", id: "cry" },
      ],
      青山龍星: [{ name: "ノーマル", id: "normal" }],
      冥鳴ひまり: [{ name: "ノーマル", id: "normal" }],
      九州そら: [
        { name: "ノーマル", id: "normal" },
        { name: "あまあま", id: "ama" },
        { name: "ツンツン", id: "tsun" },
        { name: "セクシー", id: "sexy" },
        { name: "ささやき", id: "whis" },
      ],
      モチノキョウコ: [{ name: "ノーマル", id: "normal" }],
      剣崎雌雄: [{ name: "ノーマル", id: "normal" }],
      WhiteCUL: [
        { name: "ノーマル", id: "normal" },
        { name: "たのしい", id: "joy" },
        { name: "かなしい", id: "sad" },
        { name: "びえーん", id: "cry" },
      ],
      後鬼: [
        { name: "人間ver.", id: "normal" },
        { name: "ぬいぐるみver.", id: "nuigurumi" },
      ],
      No7: [
        { name: "ノーマル", id: "normal" },
        { name: "アナウンス", id: "announce" },
        { name: "読み聞かせ", id: "reading" },
      ],
      ちび式じい: [{ name: "ノーマル", id: "normal" }],
      櫻歌ミコ: [
        { name: "ノーマル", id: "normal" },
        { name: "第二形態", id: "2nd" },
        { name: "ロリ", id: "loli" },
      ],
      小夜_SAYO: [{ name: "ノーマル", id: "normal" }],
      ナースロボ＿タイプＴ: [
        { name: "ノーマル", id: "normal" },
        { name: "楽々", id: "fun" },
        { name: "恐怖", id: "fear" },
        { name: "内緒話", id: "whis" },
      ],
      聖騎士紅桜: [],
      雀松朱司: [],
      麒ヶ島宗麟: [],
    }

  const getDatas = (info: { key: CharacterKey; characterId: string }) => {
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
      styleVoiceUrls: styleNames[info.key].map(v => {
        return {
          style: v.name,
          urls: query.styleAudio.nodes
            .filter(node => node.name.includes(`${info.characterId}`))
            .filter(node => node.name.includes(`${v.id}`))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(node => node.publicURL!),
        }
      }),
      dormitoryVoiceUrls: query.dormitoryAudio.nodes
        .filter(node => node.name.includes(`${info.characterId}`))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.publicURL!),
      infoImages: query.dormitoryImage.nodes
        .filter(node => node.name.includes(`${info.characterId}`))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.childImageSharp?.gatsbyImageData!),
      releaseStatus: comingSoonCharacters.includes(info.key)
        ? ("comingSoon" as const)
        : ("released" as const),
    }
    if (item.bustupImage == undefined)
      throw new Error(`bustupImage is undefined. ${info.characterId}`)
    if (item.portraitImage == undefined)
      throw new Error(`portraitImage is undefined. ${info.characterId}`)
    if (item.ogpImage == undefined)
      throw new Error(`ogpImage is undefined. ${info.characterId}`)
    if (item.styleVoiceUrls.length == 0)
      console.warn(`styleVoiceUrls is empty. ${info.characterId}`)
    if (item.styleVoiceUrls.some(v => v.urls.length != 3))
      throw new Error(`styleVoiceUrls is invalid. ${info.characterId}`)
    if (item.dormitoryVoiceUrls.length == 0)
      console.warn(`dormitoryVoiceUrls is empty. ${info.characterId}`)
    return item
  }

  const characterInfos: {
    [key in CharacterKey]: CharacterInfo | undefined
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
      detailUrl:
        "https://zunko.jp/con_voice.html#:~:text=%E3%81%AF%E3%81%93%E3%81%A1%E3%82%89%5Bsm31250786%5D-,%E5%9B%9B%E5%9B%BD%E3%82%81%E3%81%9F%E3%82%93%EF%BC%88%E6%BC%86%E9%BB%92%E3%81%AE%E3%82%81%E3%81%9F%E3%82%93%EF%BC%89,-CV%3A%E7%94%B0%E4%B8%AD%E5%B0%8F%E9%9B%AA",
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
      detailUrl:
        "https://zunko.jp/con_voice.html#:~:text=%E3%81%AF%E3%81%93%E3%81%A1%E3%82%89%5Bsm31259177%5D-,%E3%81%9A%E3%82%93%E3%81%A0%E3%82%82%E3%82%93,-CV%3A%E4%BC%8A%E8%97%A4%E3%82%86",
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
      detailUrl: "http://www.canon-voice.com/ritsu.html",
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
      detailUrl: "https://virvoxproject.wixsite.com/official",
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
      detailUrl: "https://virvoxproject.wixsite.com/official",
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
      detailUrl: "https://virvoxproject.wixsite.com/official",
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
      detailUrl:
        "https://zunko.jp/con_voice.html#:~:text=%E3%81%8D%E3%81%BF%E3%81%8C%E3%81%9F%E3%82%81-,%E4%B9%9D%E5%B7%9E%E3%81%9D%E3%82%89mk%3DII,-CV%3A%E8%A5%BF%E7%94%B0%E6%9C%9B%E8%A6%8B",
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
      voiceFeature: "（準備中）",
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
      policyUrl: undefined,
      detailUrl: undefined,
      releaseDate: "2023年2月22日",
    },

    雀松朱司: {
      name: getCharacterInfo("雀松朱司").name,
      id: getCharacterInfo("雀松朱司").characterId,
      ...getDatas(getCharacterInfo("雀松朱司")),
      rubyName:
        "<ruby>雀松<rp>(</rp><rt>わかまつ</rt><rp>)</rp>朱司<rp>(</rp><rt>あかし</rt><rp>)</rp></ruby>",
      voiceFeature: "（準備中）",
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
      policyUrl: undefined,
      detailUrl: undefined,
      releaseDate: "2023年2月22日",
    },

    麒ヶ島宗麟: {
      name: getCharacterInfo("麒ヶ島宗麟").name,
      id: getCharacterInfo("麒ヶ島宗麟").characterId,
      ...getDatas(getCharacterInfo("麒ヶ島宗麟")),
      rubyName:
        "<ruby>麒ヶ島<rp>(</rp><rt>きがしま</rt><rp>)</rp>宗麟<rp>(</rp><rt>そうりん</rt><rp>)</rp></ruby>",
      voiceFeature: "（準備中）",
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
      policyUrl: undefined,
      detailUrl: undefined,
      releaseDate: "2023年2月22日",
    },
  } as const

  const callNameInfos: {
    [key in CharacterKey]: {
      [key in CharacterKey]?: string | undefined
    } & { me: readonly string[]; you: readonly string[] }
  } = {
    四国めたん: {
      me: ["わたくし"],
      you: ["貴女(たち)", "アンタ(ら)"],
      ずんだもん: "ずんだもん",
      春日部つむぎ: "つむぎさん",
      雨晴はう: "はうさん",
      波音リツ: "リツさん",
      玄野武宏: "玄野さん",
      白上虎太郎: "白上さん",
      青山龍星: "青山さん",
      冥鳴ひまり: "ひまりさん",
      九州そら: "そら",
      モチノキョウコ: "もち子さん",
      剣崎雌雄: "剣崎さん",
      WhiteCUL: "雪さん",
      後鬼: "後鬼さん",
      No7: "セブンさん",
      ちび式じい: "ちび式じいさん",
      櫻歌ミコ: "ミコさん",
      小夜_SAYO: "小夜さん",
      ナースロボ＿タイプＴ: "ＴＴさん",
    },
    ずんだもん: {
      me: ["ずんだもん", "僕"],
      you: ["オマエ", "みんな"],
      四国めたん: "めたん",
      春日部つむぎ: "つむぎ",
      雨晴はう: "はう",
      波音リツ: "リツ",
      玄野武宏: "たけひろ",
      白上虎太郎: "こたろう",
      青山龍星: "りゅうせい",
      冥鳴ひまり: "ひまり",
      九州そら: "そら",
      モチノキョウコ: "もち子",
      剣崎雌雄: "めすお",
      WhiteCUL: "雪",
      後鬼: "後鬼",
      No7: "セブン",
      ちび式じい: "ちび式じい",
      櫻歌ミコ: "ミコ",
      小夜_SAYO: "小夜",
      ナースロボ＿タイプＴ: "ＴＴ",
    },
    春日部つむぎ: {
      me: ["あーし"],
      you: ["きみ", "きみたち"],
      四国めたん: "めたん先輩",
      ずんだもん: "ずんだもん先輩",
      雨晴はう: "はうちゃん",
      波音リツ: "りっちゃん",
      玄野武宏: "武宏くん",
      白上虎太郎: "虎太郎くん",
      青山龍星: "龍星くん",
      冥鳴ひまり: "ひまっち",
      九州そら: "そらさん",
      モチノキョウコ: "もち子ちゃん",
      剣崎雌雄: "めすおちゃん",
      WhiteCUL: "ゆきちゃん",
      後鬼: "後鬼せんせー",
      No7: "ななっち",
      ちび式じい: "ちびじい",
      櫻歌ミコ: "みこっち",
      小夜_SAYO: "さよち",
      ナースロボ＿タイプＴ: "TTちゃん",
    },
    雨晴はう: {
      me: ["僕"],
      you: ["あなた", "あなた達"],
      四国めたん: "めたんさん",
      ずんだもん: "ずんだもん",
      春日部つむぎ: "つむぎさん",
      波音リツ: "リツさん",
      玄野武宏: "玄野さん",
      白上虎太郎: "白上さん",
      青山龍星: "青山さん",
      冥鳴ひまり: "ひまりさん",
      九州そら: "そらさん",
      モチノキョウコ: "もち子さん",
      剣崎雌雄: "剣崎さん",
      WhiteCUL: "ゆきさん",
      後鬼: "ごきさん",
      No7: "ななさん",
      ちび式じい: "お式さん",
      櫻歌ミコ: "ミコちゃん",
      小夜_SAYO: "小夜さん",
      ナースロボ＿タイプＴ: "Tちゃん",
    },
    波音リツ: {
      me: ["あたし"],
      you: ["アンタ", "アンタら"],
      四国めたん: "めたん",
      ずんだもん: "ずんだもん",
      春日部つむぎ: "つむぎ",
      雨晴はう: "はう",
      玄野武宏: "くろの",
      白上虎太郎: "こたろう",
      青山龍星: "りゅうせい",
      冥鳴ひまり: "ひまり",
      九州そら: "そら",
      モチノキョウコ: "もち子",
      剣崎雌雄: "めすお",
      WhiteCUL: "ゆき",
      後鬼: "ごき",
      No7: "なな",
      ちび式じい: "式じい",
      櫻歌ミコ: "ミコ",
      小夜_SAYO: "さよ",
      ナースロボ＿タイプＴ: "TT",
    },
    玄野武宏: {
      me: ["俺"],
      you: ["お前", "お前ら"],
      四国めたん: "めたん",
      ずんだもん: "ずんだもん",
      春日部つむぎ: "つむぎ",
      雨晴はう: "はう",
      波音リツ: "リツ",
      白上虎太郎: "虎太郎",
      青山龍星: "龍星",
      冥鳴ひまり: "ひまり",
      九州そら: "そら",
      モチノキョウコ: "もち子",
      剣崎雌雄: "雌雄",
      WhiteCUL: "雪",
      後鬼: "後鬼",
      No7: "なな",
      ちび式じい: "小さいじいさん",
      櫻歌ミコ: "ミコ",
      小夜_SAYO: "小夜",
      ナースロボ＿タイプＴ: "タイプT",
    },
    白上虎太郎: {
      me: ["おれ"],
      you: ["きみ", "きみ達"],
      四国めたん: "めたんちゃん",
      ずんだもん: "ずんずん",
      春日部つむぎ: "つむぎちゃん",
      雨晴はう: "はうさん",
      波音リツ: "リツさん",
      玄野武宏: "タケヒロ",
      青山龍星: "リューセー",
      冥鳴ひまり: "ひまりちゃん",
      九州そら: "そらさん",
      モチノキョウコ: "もち子さん",
      剣崎雌雄: "シユー",
      WhiteCUL: "ユキさん",
      後鬼: "ゴキさん",
      No7: "ナナちゃんさん",
      ちび式じい: "ちっちゃい式じい",
      櫻歌ミコ: "ミコちゃん",
      小夜_SAYO: "サヨちゃん",
      ナースロボ＿タイプＴ: "Tちゃん",
    },
    青山龍星: {
      me: ["オレ"],
      you: ["アンタ", "アンタ達", "お前達"],
      四国めたん: "めたん",
      ずんだもん: "ずんだもん",
      春日部つむぎ: "つむぎ",
      雨晴はう: "はう",
      波音リツ: "リツ",
      玄野武宏: "武宏",
      白上虎太郎: "虎太郎",
      冥鳴ひまり: "ひまり",
      九州そら: "そら",
      モチノキョウコ: "もち子",
      剣崎雌雄: "雌雄",
      WhiteCUL: "雪",
      後鬼: "後鬼",
      No7: "セブン",
      ちび式じい: "小さい大元さん",
      櫻歌ミコ: "ミコ",
      小夜_SAYO: "小夜",
      ナースロボ＿タイプＴ: "T",
    },
    冥鳴ひまり: {
      me: ["私"],
      you: ["君たち"],
      四国めたん: "めたん先輩",
      ずんだもん: "ずんだもん先輩",
      春日部つむぎ: "つむぎ先輩",
      雨晴はう: "はう先輩",
      波音リツ: "リツ先輩",
      玄野武宏: "武宏くん",
      白上虎太郎: "虎太郎くん",
      青山龍星: "龍星くん",
      九州そら: "そらちゃん",
      モチノキョウコ: "もち子ちゃん",
      剣崎雌雄: "メスオジ",
      WhiteCUL: "ゆきちゃん",
      後鬼: "後鬼ちゃん",
      No7: "ななちゃん",
      ちび式じい: "ちびじい",
      櫻歌ミコ: "ミコちゃん",
      小夜_SAYO: "小夜ちゃん",
      ナースロボ＿タイプＴ: "TTちゃん",
    },
    九州そら: {
      me: ["まーくつー"],
      you: ["あなたさま", "みなさま"],
      四国めたん: "めたんさま",
      ずんだもん: "ずんだもん",
      春日部つむぎ: "つむぎさま",
      雨晴はう: "はうさま",
      波音リツ: "リツさま",
      玄野武宏: "武宏さま",
      白上虎太郎: "虎太郎さま",
      青山龍星: "龍星さま",
      冥鳴ひまり: "ひまりさま",
      モチノキョウコ: "もち子さま",
      剣崎雌雄: "雌雄さま",
      WhiteCUL: "雪さま",
      後鬼: "後鬼さま",
      No7: "セブンさま",
      ちび式じい: "ちび式じいさま",
      櫻歌ミコ: "ミコさま",
      小夜_SAYO: "小夜さま",
      ナースロボ＿タイプＴ: "ＴＴさま",
    },
    モチノキョウコ: {
      me: ["私", "もち子"],
      you: ["あなた", "あなた達"],
      四国めたん: "めたんさん",
      ずんだもん: "ずんだもんちゃん",
      春日部つむぎ: "つむぎさん",
      雨晴はう: "はうちゃん",
      波音リツ: "リッちゃん先輩",
      玄野武宏: "玄野くん",
      白上虎太郎: "白上くん",
      青山龍星: "青山くん",
      冥鳴ひまり: "ひまりさん",
      九州そら: "そらさん",
      剣崎雌雄: "剣崎さん",
      WhiteCUL: "ユキさん",
      後鬼: "後鬼お姉さん",
      No7: "セブンちゃん",
      ちび式じい: "ちび式さん",
      櫻歌ミコ: "ミコさん",
      小夜_SAYO: "小夜さん",
      ナースロボ＿タイプＴ: "ティーさん（Tさん）",
    },
    剣崎雌雄: {
      me: ["僕"],
      you: ["君等"],
      四国めたん: "くにさん",
      ずんだもん: "だーもん",
      春日部つむぎ: "べっつー",
      雨晴はう: "はーさん",
      波音リツ: "ねりさん",
      玄野武宏: "くーろん",
      白上虎太郎: "こっちゃん",
      青山龍星: "りゅうさん",
      冥鳴ひまり: "めまりちゃん",
      九州そら: "らーさん",
      モチノキョウコ: "もっちー",
      WhiteCUL: "とかっち",
      後鬼: "ごっさん",
      No7: "ぶんぶん丸",
      ちび式じい: "小元",
      櫻歌ミコ: "カミッコ",
      小夜_SAYO: "小夜",
      ナースロボ＿タイプＴ: "助手",
    },
    WhiteCUL: {
      me: ["わたし"],
      you: ["あなた", "あなたたち"],
      四国めたん: "めたんちゃん",
      ずんだもん: "ずんだもん",
      春日部つむぎ: "つむぎ",
      雨晴はう: "はうちゃん",
      波音リツ: "リツちゃん",
      玄野武宏: "武弘さん",
      白上虎太郎: "虎太郎くん",
      青山龍星: "りゅうちゃん",
      冥鳴ひまり: "ひまりん",
      九州そら: "そらさん",
      モチノキョウコ: "もちこさん",
      剣崎雌雄: "剣崎さん",
      後鬼: "後鬼さん",
      No7: "ななさん",
      ちび式じい: "ちびじい",
      櫻歌ミコ: "ミコちゃん",
      小夜_SAYO: "小夜ちゃん",
      ナースロボ＿タイプＴ: "TTちゃん",
    },
    後鬼: {
      me: ["私/ワテ"],
      you: ["あなたorキミ/あんたはん"],
      四国めたん: "四国さん/めたんはん",
      ずんだもん: "ずんだもん",
      春日部つむぎ: "春日部さん/つむぎはん",
      雨晴はう: "雨晴さん/はうはん",
      波音リツ: "波音さん/リツはん",
      玄野武宏: "玄野くん/玄野はん",
      白上虎太郎: "白上くん/白上はん",
      青山龍星: "青山くん/龍星はん",
      冥鳴ひまり: "冥鳴さん/ひまりはん",
      九州そら: "九州さん/九州はん",
      モチノキョウコ: "もち子さん/もち子はん",
      剣崎雌雄: "剣崎くん/剣崎はん",
      WhiteCUL: "雪さん/雪はん",
      No7: "セブンさん/セブンはん",
      ちび式じい: "おちびさん/ちび式じいはん",
      櫻歌ミコ: "櫻歌さん/ミコはん",
      小夜_SAYO: "小夜さん/小夜はん",
      ナースロボ＿タイプＴ: "TTさん/TTはん",
    },
    No7: {
      me: ["私", "僕"],
      you: ["そちら様", "皆様"],
      四国めたん: "四国さん",
      ずんだもん: "ずんだもん様",
      春日部つむぎ: "春日部さん",
      雨晴はう: "雨晴さん",
      波音リツ: "波音さん",
      玄野武宏: "玄野さん",
      白上虎太郎: "白上さん",
      青山龍星: "青山さん",
      冥鳴ひまり: "冥鳴さん",
      九州そら: "九州さん",
      モチノキョウコ: "モチノさん",
      剣崎雌雄: "剣崎さん",
      WhiteCUL: "雪さん",
      後鬼: "後鬼さん",
      ちび式じい: "ちび式さん",
      櫻歌ミコ: "櫻歌さん",
      小夜_SAYO: "小夜さん",
      ナースロボ＿タイプＴ: "TTさん",
    },
    ちび式じい: {
      me: ["わし"],
      you: ["おぬし", "おぬしら"],
      四国めたん: "めたんちゃん",
      ずんだもん: "ずんだの精さん",
      春日部つむぎ: "つむぎちゃん",
      雨晴はう: "はうちゃん",
      波音リツ: "りっちゃん",
      玄野武宏: "たけひろさん",
      白上虎太郎: "こたろうくん",
      青山龍星: "りゅうせいさん",
      冥鳴ひまり: "めいめいちゃん/死神さん",
      九州そら: "そらさん",
      モチノキョウコ: "もちこさん",
      剣崎雌雄: "メスの付喪神さん/メスのひと",
      WhiteCUL: "ゆきさん",
      後鬼: "ごきさん",
      No7: "なな号さん",
      櫻歌ミコ: "みこみこ",
      小夜_SAYO: "小夜ちゃん",
      ナースロボ＿タイプＴ: "TTちゃん",
    },
    櫻歌ミコ: {
      me: ["ミコ/私"],
      you: ["あなた", "あなたたち"],
      四国めたん: "めたんちゃん",
      ずんだもん: "もんちゃん",
      春日部つむぎ: "つむぎちゃん",
      雨晴はう: "はうちゃん",
      波音リツ: "りっちゃん",
      玄野武宏: "武宏くん",
      白上虎太郎: "虎太郎くん",
      青山龍星: "龍星くん",
      冥鳴ひまり: "ひまりちゃん",
      九州そら: "そらちゃん",
      モチノキョウコ: "もち子ちゃん",
      剣崎雌雄: "剣崎先生",
      WhiteCUL: "雪ちゃん",
      後鬼: "後鬼ちゃん",
      No7: "セブンちゃん",
      ちび式じい: "ちいおじいちゃん",
      小夜_SAYO: "小夜ちゃん",
      ナースロボ＿タイプＴ: "TTちゃん",
    },
    小夜_SAYO: {
      me: ["小夜"],
      you: ["あなた", "あなたたち"],
      四国めたん: "めたんちゃん",
      ずんだもん: "ずんだもん",
      春日部つむぎ: "つむぎちゃん",
      雨晴はう: "はうさん",
      波音リツ: "リツさん",
      玄野武宏: "武宏さん",
      白上虎太郎: "虎太郎くん",
      青山龍星: "龍星さん",
      冥鳴ひまり: "ひまりちゃん",
      九州そら: "そらさん",
      モチノキョウコ: "もち子さん",
      剣崎雌雄: "剣崎先生",
      WhiteCUL: "雪さん",
      後鬼: "後鬼さん",
      No7: "ななさん",
      ちび式じい: "ちびじい",
      櫻歌ミコ: "ミコちゃん",
      ナースロボ＿タイプＴ: "TTちゃん",
    },
    ナースロボ＿タイプＴ: {
      me: ["わたし"],
      you: ["あなた", "あなたたち"],
      四国めたん: "四国さん",
      ずんだもん: "ずんだもんさん",
      春日部つむぎ: "春日部さん",
      雨晴はう: "雨晴さん",
      波音リツ: "波音さん",
      玄野武宏: "玄野さん",
      白上虎太郎: "白上さん",
      青山龍星: "青山さん",
      冥鳴ひまり: "冥鳴さん",
      九州そら: "まーくつーさん",
      モチノキョウコ: "モチノさん",
      剣崎雌雄: "剣崎先生",
      WhiteCUL: "ゆきさん",
      後鬼: "後鬼さん",
      No7: "セブンさん",
      ちび式じい: "おじいさん",
      櫻歌ミコ: "櫻歌さん",
      小夜_SAYO: "小夜さん",
    },
    聖騎士紅桜: {
      me: ["我"],
      you: ["お前", "お前ら"],
      四国めたん: "めたん殿",
      ずんだもん: "ずんだもん殿",
      春日部つむぎ: "つむぎ殿",
      雨晴はう: "はう殿",
      波音リツ: "リツ殿",
      玄野武宏: "武宏殿",
      白上虎太郎: "虎太郎殿",
      青山龍星: "龍星殿",
      冥鳴ひまり: "ひまり殿",
      九州そら: "そら殿",
      モチノキョウコ: "もち子殿",
      剣崎雌雄: "雌雄",
      WhiteCUL: "雪殿",
      後鬼: "後鬼殿",
      No7: "なな殿",
      ちび式じい: "ちびじい殿",
      櫻歌ミコ: "ミコ殿",
      小夜_SAYO: "小夜殿",
      ナースロボ＿タイプＴ: "TT殿",
      雀松朱司: "朱司殿",
      麒ヶ島宗麟: "麒ヶ島殿",
    },
    雀松朱司: {
      me: ["僕"],
      you: [""],
      玄野武宏: "武宏",
      白上虎太郎: "虎坊(とらぼん)",
      青山龍星: "龍",
      麒ヶ島宗麟: "麒ヶ島さん",
    },
    麒ヶ島宗麟: {
      me: ["私"],
      you: [""],
      雀松朱司: "朱司くん",
    },
  } as const

  const generationInfos: {
    [key in Generation]: { characterKeys: readonly CharacterKey[] }
  } = {
    一期生: { characterKeys: ["四国めたん", "ずんだもん"] },
    二期生: {
      characterKeys: ["春日部つむぎ", "雨晴はう", "波音リツ"],
    },
    三期生: {
      characterKeys: [
        "玄野武宏",
        "白上虎太郎",
        "青山龍星",
        "冥鳴ひまり",
        "九州そら",
      ],
    },
  } as const

  return { characterInfos, callNameInfos, generationInfos } as const
}
