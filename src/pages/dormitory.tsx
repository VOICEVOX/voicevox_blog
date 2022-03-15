import { graphql, Link, useStaticQuery } from "gatsby"
import { IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import React, { useContext, useEffect, useRef, useState } from "react"
import hau01 from "../audios/dormitory/hau-01.wav"
import hau02 from "../audios/dormitory/hau-02.wav"
import hau03 from "../audios/dormitory/hau-03.wav"
import hau04 from "../audios/dormitory/hau-04.wav"
import himari01 from "../audios/dormitory/himari-01.wav"
import himari02 from "../audios/dormitory/himari-02.wav"
import himari03 from "../audios/dormitory/himari-03.wav"
import himari04 from "../audios/dormitory/himari-04.wav"
import himari05 from "../audios/dormitory/himari-05.wav"
import kotarou01 from "../audios/dormitory/kotarou-01.wav"
import kotarou02 from "../audios/dormitory/kotarou-02.wav"
import kotarou03 from "../audios/dormitory/kotarou-03.wav"
import metan01 from "../audios/dormitory/metan-01.wav"
import metan02 from "../audios/dormitory/metan-02.wav"
import metan03 from "../audios/dormitory/metan-03.wav"
import metan04 from "../audios/dormitory/metan-04.wav"
import ritsu01 from "../audios/dormitory/ritsu-01.wav"
import ritsu02 from "../audios/dormitory/ritsu-02.wav"
import ritsu03 from "../audios/dormitory/ritsu-03.wav"
import ritsu04 from "../audios/dormitory/ritsu-04.wav"
import ritsu05 from "../audios/dormitory/ritsu-05.wav"
import ryusei01 from "../audios/dormitory/ryusei-01.wav"
import ryusei02 from "../audios/dormitory/ryusei-02.wav"
import ryusei03 from "../audios/dormitory/ryusei-03.wav"
import takehiro01 from "../audios/dormitory/takehiro-01.wav"
import takehiro02 from "../audios/dormitory/takehiro-02.wav"
import takehiro03 from "../audios/dormitory/takehiro-03.wav"
import tsumugi01 from "../audios/dormitory/tsumugi-01.wav"
import tsumugi02 from "../audios/dormitory/tsumugi-02.wav"
import tsumugi03 from "../audios/dormitory/tsumugi-03.wav"
import tsumugi04 from "../audios/dormitory/tsumugi-04.wav"
import zundamon01 from "../audios/dormitory/zundamon-01.wav"
import zundamon02 from "../audios/dormitory/zundamon-02.wav"
import zundamon03 from "../audios/dormitory/zundamon-03.wav"
import zundamon04 from "../audios/dormitory/zundamon-04.wav"
import DormitoryCharacterCard from "../components/dormitoryCharacterCard"
import DormitoryCharacterModal from "../components/dormitoryCharacterModal"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"
import { CharacterContext } from "../contexts/context"
import {
  CharacterInfo,
  CharacterKey,
  Generation,
} from "../types/dormitoryCharacter"

const Dormitory: React.FC<{ setShowingHeader: (show: boolean) => void }> = ({
  setShowingHeader,
}) => {
  const query: {
    [key: string]: {
      nodes: {
        name: string
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }[]
    }
  } = useStaticQuery(graphql`
    {
      portrait: allFile(filter: { absolutePath: { regex: "/portrait/" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(height: 640)
          }
        }
      }
      bustup: allFile(filter: { absolutePath: { regex: "/bustup/" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(height: 320)
          }
        }
      }
      dormitory: allFile(filter: { absolutePath: { regex: "/dormitory/" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(height: 320)
          }
        }
      }
    }
  `)

  const { characterKeys } = useContext(CharacterContext)

  const characterInfos: {
    [key in CharacterKey]: CharacterInfo | undefined
  } = {
    四国めたん: {
      name: "四国めたん",
      rubyName: "四国<rp>(</rp><rt>しこく</rt><rp>)</rp>めたん",
      bustupImage: query.bustup.nodes.find(
        node => node.name === "bustup-metan"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-metan"
      )!.childImageSharp.gatsbyImageData,
      color: "#DF4C94",
      lightColor: "#E3ADD5",
      description:
        "高等部二年生。常に金欠。趣味は中二病妄想。<br />誰にでも遠慮しないので、基本的にタメ口。",
      labelInfos: [
        { label: "年齢", value: "17 歳", size: 1 },
        { label: "身長", value: "150 cm", size: 1 },
        { label: "性格", value: "若干ツンデレ気味", size: 2 },
      ],
      voiceUrls: [metan01, metan02, metan03, metan04],
      infoImages: query.dormitory.nodes
        .filter(node => node.name.includes("metan"))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.childImageSharp.gatsbyImageData),
      callNames: {
        ずんだもん: "ずんだもん",
        春日部つむぎ: "つむぎさん",
        雨晴はう: "はうさん",
        波音リツ: "リツさん",
        玄野武宏: "玄野さん",
        白上虎太郎: "白上さん",
        青山龍星: "青山さん",
        冥鳴ひまり: "ひまりさん",
        九州そら: "そら",
        me: ["わたくし"],
        you: ["貴女(たち)", "アンタ(ら)"],
      },
      detailUrl:
        "https://zunko.jp/con_voice.html#:~:text=%E3%81%AF%E3%81%93%E3%81%A1%E3%82%89%5Bsm31250786%5D-,%E5%9B%9B%E5%9B%BD%E3%82%81%E3%81%9F%E3%82%93%EF%BC%88%E6%BC%86%E9%BB%92%E3%81%AE%E3%82%81%E3%81%9F%E3%82%93%EF%BC%89,-CV%3A%E7%94%B0%E4%B8%AD%E5%B0%8F%E9%9B%AA",
    },

    ずんだもん: {
      name: "ずんだもん",
      rubyName: "ずんだもん",
      bustupImage: query.bustup.nodes.find(
        node => node.name === "bustup-zundamon"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-zundamon"
      )!.childImageSharp.gatsbyImageData,
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
      voiceUrls: [zundamon01, zundamon02, zundamon03, zundamon04],
      infoImages: query.dormitory.nodes
        .filter(node => node.name.includes("zundamon"))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.childImageSharp.gatsbyImageData),
      callNames: {
        四国めたん: "めたん",
        春日部つむぎ: "つむぎ",
        雨晴はう: "はう",
        波音リツ: "リツ",
        玄野武宏: "たけひろ",
        白上虎太郎: "こたろう",
        青山龍星: "りゅうせい",
        冥鳴ひまり: "ひまり",
        九州そら: "そら",
        me: ["ずんだもん", "僕"],
        you: ["オマエ", "みんな"],
      },
      detailUrl:
        "https://zunko.jp/con_voice.html#:~:text=%E3%81%AF%E3%81%93%E3%81%A1%E3%82%89%5Bsm31259177%5D-,%E3%81%9A%E3%82%93%E3%81%A0%E3%82%82%E3%82%93,-CV%3A%E4%BC%8A%E8%97%A4%E3%82%86",
    },

    春日部つむぎ: {
      name: "春日部つむぎ",
      rubyName: "春日部<rp>(</rp><rt>かすかべ</rt><rp>)</rp>つむぎ",
      bustupImage: query.bustup.nodes.find(
        node => node.name === "bustup-tsumugi"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-tsumugi"
      )!.childImageSharp.gatsbyImageData,
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
      voiceUrls: [tsumugi01, tsumugi02, tsumugi03, tsumugi04],
      callNames: {
        四国めたん: "めたん先輩",
        ずんだもん: "ずんだもん先輩",
        雨晴はう: "はうちゃん",
        波音リツ: "りっちゃん",
        玄野武宏: "武宏くん",
        白上虎太郎: "虎太郎くん",
        青山龍星: "龍星くん",
        冥鳴ひまり: "ひまっち",
        九州そら: "（準備中）",
        me: ["あーし"],
        you: ["きみ", "きみたち"],
      },
      detailUrl: "https://tsukushinyoki10.wixsite.com/ktsumugiofficial",
    },

    雨晴はう: {
      name: "雨晴はう",
      rubyName: "雨晴<rp>(</rp><rt>あめはれ</rt><rp>)</rp>はう",
      bustupImage: query.bustup.nodes.find(node => node.name === "bustup-hau")!
        .childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-hau"
      )!.childImageSharp.gatsbyImageData,
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
      voiceUrls: [hau01, hau02, hau03, hau04],
      callNames: {
        四国めたん: "めたんさん",
        ずんだもん: "ずんだもん",
        春日部つむぎ: "つむぎさん",
        波音リツ: "リツさん",
        玄野武宏: "玄野さん",
        白上虎太郎: "白上さん",
        青山龍星: "青山さん",
        冥鳴ひまり: "ひまりさん",
        me: ["僕"],
        you: ["あなた", "あなた達"],
        九州そら: "（準備中）",
      },
      detailUrl: "https://amehau.com/",
    },

    波音リツ: {
      name: "波音リツ",
      rubyName: "波音<rp>(</rp><rt>なみね</rt><rp>)</rp>リツ",
      bustupImage: query.bustup.nodes.find(
        node => node.name === "bustup-ritsu"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-ritsu"
      )!.childImageSharp.gatsbyImageData,
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
      voiceUrls: [ritsu01, ritsu02, ritsu03, ritsu04, ritsu05],
      callNames: {
        四国めたん: "めたん",
        ずんだもん: "ずんだもん",
        春日部つむぎ: "つむぎ",
        雨晴はう: "はう",
        玄野武宏: "くろの",
        白上虎太郎: "こたろう",
        青山龍星: "りゅうせい",
        冥鳴ひまり: "ひまり",
        九州そら: "（準備中）",
        me: ["あたし"],
        you: ["アンタ", "アンタら"],
      },
      detailUrl: "http://www.canon-voice.com/ritsu.html",
    },

    玄野武宏: {
      name: "玄野武宏",
      rubyName:
        "玄野<rp>(</rp><rt>くろの</rt><rp>)</rp>武宏<rp>(</rp><rt>たけひろ</rt><rp>)</rp>",
      bustupImage: query.bustup.nodes.find(
        node => node.name === "bustup-takehiro"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-takehiro"
      )!.childImageSharp.gatsbyImageData,
      color: "#1AA18E",
      lightColor: "#B3E2D8",
      description: "サッパリした青年<br />やや短気だが面倒見は良い",
      labelInfos: [
        { label: "身長", value: "177 cm", size: 2 },
        { label: "体重", value: "66 Kg", size: 2 },
        { label: "年齢", value: "20代前後", size: 2 },
        { label: "誕生日", value: "12月24日", size: 2 },
      ],
      voiceUrls: [takehiro01, takehiro02, takehiro03],
      callNames: {
        四国めたん: "めたん",
        ずんだもん: "ずんだもん",
        春日部つむぎ: "つむぎ",
        雨晴はう: "はう",
        波音リツ: "リツ",
        白上虎太郎: "虎太郎",
        青山龍星: "龍星",
        冥鳴ひまり: "ひまり",
        九州そら: "（準備中）",
        me: ["俺"],
        you: ["お前", "お前ら"],
      },
      detailUrl: "https://virvoxproject.wixsite.com/official",
    },

    白上虎太郎: {
      name: "白上虎太郎",
      rubyName:
        "白上<rp>(</rp><rt>しらかみ</rt><rp>)</rp>虎太郎<rp>(</rp><rt>こたろう</rt><rp>)</rp>",
      bustupImage: query.bustup.nodes.find(
        node => node.name === "bustup-kotarou"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-kotarou"
      )!.childImageSharp.gatsbyImageData,
      color: "#99D02B",
      lightColor: "#E6F5B0",
      description: "まっすぐで人懐っこい青年<br />愛嬌はあるものの少しおばか",
      labelInfos: [
        { label: "身長", value: "146 cm", size: 2 },
        { label: "体重", value: "42 Kg", size: 2 },
        { label: "年齢", value: "18 歳", size: 2 },
        { label: "誕生日", value: "秋生まれ", size: 2 },
      ],
      voiceUrls: [kotarou01, kotarou02, kotarou03],
      callNames: {
        四国めたん: "めたんちゃん",
        ずんだもん: "ずんずん",
        春日部つむぎ: "つむぎちゃん",
        雨晴はう: "はうさん",
        波音リツ: "リツさん",
        玄野武宏: "タケヒロ",
        青山龍星: "リューセー",
        冥鳴ひまり: "ひまりちゃん",
        九州そら: "（準備中）",
        me: ["おれ"],
        you: ["きみ", "きみ達"],
      },
      detailUrl: "https://virvoxproject.wixsite.com/official",
    },

    青山龍星: {
      name: "青山龍星",
      rubyName:
        "青山<rp>(</rp><rt>あおやま</rt><rp>)</rp>龍星<rp>(</rp><rt>りゅうせい</rt><rp>)</rp>",
      bustupImage: query.bustup.nodes.find(
        node => node.name === "bustup-ryusei"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-ryusei"
      )!.childImageSharp.gatsbyImageData,
      color: "#386CB0",
      lightColor: "#B3CDE3",
      description: "とにかく大柄で無骨な青年<br />寡黙で冷静なストッパー枠",
      labelInfos: [
        { label: "身長", value: "194 cm", size: 2 },
        { label: "体重", value: "94 Kg", size: 2 },
        { label: "年齢", value: "24 歳", size: 2 },
        { label: "誕生日", value: "春生まれ", size: 2 },
      ],
      voiceUrls: [ryusei01, ryusei02, ryusei03],
      callNames: {
        四国めたん: "めたん",
        ずんだもん: "ずんだもん",
        春日部つむぎ: "つむぎ",
        雨晴はう: "はう",
        波音リツ: "リツ",
        玄野武宏: "武宏",
        白上虎太郎: "虎太郎",
        冥鳴ひまり: "ひまり",
        九州そら: "（準備中）",
        me: ["オレ"],
        you: ["アンタ", "アンタ達", "お前達"],
      },
      detailUrl: "https://virvoxproject.wixsite.com/official",
    },

    冥鳴ひまり: {
      name: "冥鳴ひまり",
      rubyName: "冥鳴<rp>(</rp><rt>めいめい</rt><rp>)</rp>ひまり",
      bustupImage: query.bustup.nodes.find(
        node => node.name === "bustup-himari"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-himari"
      )!.childImageSharp.gatsbyImageData,
      color: "#A45AAA",
      lightColor: "#CAB2D6",
      description: "冥界から来た死神<br />可愛いものに目がない",
      labelInfos: [
        { label: "年齢", value: "18 歳", size: 1 },
        { label: "種族", value: "死神", size: 1 },
        { label: "誕生日", value: "9月1日", size: 1 },
        { label: "好きな日本語", value: "不渡り", size: 1 },
        { label: "好きなもの", value: "可愛い女の子", size: 2 },
        { label: "性格", value: "優しくて清楚（自称）", size: 2 },
      ],
      voiceUrls: [himari01, himari02, himari03, himari04, himari05],
      callNames: {
        四国めたん: "めたん先輩",
        ずんだもん: "ずんだもん先輩",
        春日部つむぎ: "つむぎ先輩",
        雨晴はう: "はう先輩",
        波音リツ: "リツ先輩",
        玄野武宏: "武宏くん",
        白上虎太郎: "虎太郎くん",
        青山龍星: "龍星くん",
        九州そら: "（準備中）",
        me: ["私"],
        you: ["君たち"],
      },
      detailUrl: "https://kotoran8zunzun.wixsite.com/my-site/利用規約",
    },

    九州そら: {
      name: "九州そら",
      rubyName: "九州<rp>(</rp><rt>きゅうしゅう</rt><rp>)</rp>そら",
      bustupImage: query.bustup.nodes.find(node => node.name === "bustup-sora")!
        .childImageSharp.gatsbyImageData,
      portraitImage: query.portrait.nodes.find(
        node => node.name === "portrait-sora"
      )!.childImageSharp.gatsbyImageData,
      color: "#6964AD",
      lightColor: "#B2B6D8",
      description:
        "宇宙開拓用に開発されたアンドロイド。<br />生まれたばかりで、どんなことでも興味を持つ。",
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
        { label: "性格", value: "天然でのほほんとした性格", size: 2 },
      ],
      voiceUrls: undefined,
      infoImages: query.dormitory.nodes
        .filter(node => node.name.includes("sora"))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.childImageSharp.gatsbyImageData),
      callNames: {
        ずんだもん: "ずんだもん",
        四国めたん: "めたんさま",
        春日部つむぎ: "（準備中）",
        雨晴はう: "（準備中）",
        波音リツ: "（準備中）",
        玄野武宏: "（準備中）",
        白上虎太郎: "（準備中）",
        青山龍星: "（準備中）",
        冥鳴ひまり: "（準備中）",
        me: ["まーくつー"],
        you: ["あなたさま", "みなさま"],
      },
      detailUrl:
        "https://zunko.jp/con_voice.html#:~:text=%E3%81%8D%E3%81%BF%E3%81%8C%E3%81%9F%E3%82%81-,%E4%B9%9D%E5%B7%9E%E3%81%9D%E3%82%89mk%3DII,-CV%3A%E8%A5%BF%E7%94%B0%E6%9C%9B%E8%A6%8B",
    },
  }

  const generationInfos: {
    [key in Generation]: { characterKeys: CharacterKey[] }
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
  }

  // ボイボ寮デザイン用のヘッダーを超えたらホムペ用のヘッダーを表示する
  const headerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!headerRef.current) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setShowingHeader(!entry.isIntersecting)
      })
    })
    observer.observe(headerRef.current)
  }, [headerRef])

  const [showingCharacterModal, setShowingCharacterModal] = useState(false)
  const [selectedCharacterKey, setSelectedCharacterKey] =
    useState<CharacterKey>()

  const showCharacterModal = (characterKey: CharacterKey) => {
    document.documentElement.classList.add("is-clipped")
    setSelectedCharacterKey(characterKey)
    setShowingCharacterModal(true)
  }
  const hideCharacterModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowingCharacterModal(false)
  }

  return (
    <>
      <Seo
        title="ボイボ寮 | VOICEVOX"
        description="とある世界の不思議な建物、ボイボ寮。ここでは個性豊かな住民たちが暮らしています。"
        // image={shareThumb}
      />

      <div className="dormitory">
        <header ref={headerRef} className="hero is-small">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-2">ボイボ寮の住民たち</h1>
            </div>
          </div>
        </header>

        <section className="section py-0">
          <div className="container is-max-desktop has-text-centered is-size-5 py-6">
            <p>とある世界の不思議な建物、ボイボ寮。</p>
            <p>ここでは個性豊かな住民たちが暮らしています。</p>
          </div>
        </section>

        <main className="section py-0">
          <div className="container is-max-desktop pt-1 pb-6">
            <div className="columns is-multiline">
              <div className="column is-2 generation-label">
                <h2 className="title is-3">3 期 生</h2>
              </div>

              <DormitoryCharacterCard
                characterInfo={characterInfos.玄野武宏}
                onClick={() => showCharacterModal("玄野武宏")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.白上虎太郎}
                onClick={() => showCharacterModal("白上虎太郎")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.青山龍星}
                onClick={() => showCharacterModal("青山龍星")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.冥鳴ひまり}
                onClick={() => showCharacterModal("冥鳴ひまり")}
                className="is-offset-2"
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.九州そら}
                onClick={() => showCharacterModal("九州そら")}
              />
            </div>

            <hr />

            <div className="columns is-multiline">
              <div className="column is-2 generation-label">
                <h2 className="title is-3">2 期 生</h2>
              </div>

              <DormitoryCharacterCard
                characterInfo={characterInfos.春日部つむぎ}
                onClick={() => showCharacterModal("春日部つむぎ")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.雨晴はう}
                onClick={() => showCharacterModal("雨晴はう")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.波音リツ}
                onClick={() => showCharacterModal("波音リツ")}
              />
            </div>

            <hr />

            <div className="columns is-multiline">
              <div className="column is-2 generation-label">
                <h2 className="title is-3">1 期 生</h2>
              </div>

              <DormitoryCharacterCard
                characterInfo={characterInfos.四国めたん}
                onClick={() => showCharacterModal("四国めたん")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.ずんだもん}
                onClick={() => showCharacterModal("ずんだもん")}
              />

              <div className="tile is-parent is-3 tohoku">
                <div className="tile is-child">
                  <h3 className="title is-4">仲良し</h3>
                  <a href="https://zunko.jp/" target="_blank" rel="noreferrer">
                    <div className="is-flex">
                      <StaticImage
                        className="tile is-child"
                        src="../images/icon-kiritan.png"
                        alt="東北きりたん"
                        width={128}
                      />
                      <StaticImage
                        className="tile is-child"
                        src="../images/icon-zunko.png"
                        alt="東北ずん子"
                        width={128}
                      />
                      <StaticImage
                        className="tile is-child"
                        src="../images/icon-itako.png"
                        alt="東北イタコ"
                        width={128}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <section className="section py-5">
          <div className="container has-text-centered py-5 is-flex is-flex-direction-column">
            <h2 className="title is-4">ボイボ寮とは</h2>
            <p className="is-size-6">
              VOICEVOX
              のキャラたちの設定があると動画制作の参考になるかと思って用意した世界観です。
            </p>
            <p className="is-size-6">
              必ずしも遵守する必要はなく、自由に改変して頂いても問題ありません。
            </p>
          </div>

          <div className="container has-text-centered py-5 is-flex is-flex-direction-column">
            <h2 className="title is-4">VOICEVOX とは</h2>
            <p className="is-size-6">
              無料で使える中品質なテキスト読み上げソフトウェアです。
            </p>
            <p className="is-size-6">
              商用・非商用問わず無料で、イントネーションの詳細な調整ができることが特徴です。
            </p>
            <Link
              to={"/"}
              className="button is-align-self-center mt-5 is-primary is-rounded"
              type="button"
              role={"button"}
            >
              <span className="has-text-weight-semibold">ダウンロード</span>
            </Link>
          </div>
        </section>
      </div>
      {selectedCharacterKey && (
        <DormitoryCharacterModal
          isActive={showingCharacterModal}
          hide={hideCharacterModal}
          characterKey={selectedCharacterKey}
          characterKeys={characterKeys}
          characterInfos={characterInfos}
          generationInfos={generationInfos}
        />
      )}
    </>
  )
}

export default () => {
  const [showingHeader, setShowingHeader] = useState(false)
  return (
    <Page showingHeader={showingHeader}>
      <Dormitory setShowingHeader={setShowingHeader} />
    </Page>
  )
}
