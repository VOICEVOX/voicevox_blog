import { graphql, useStaticQuery } from "gatsby"
import { IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import hau001 from "../audios/dormitory/hau-01.flac"
import hau002 from "../audios/dormitory/hau-02.flac"
import hau003 from "../audios/dormitory/hau-03.flac"
import hau004 from "../audios/dormitory/hau-04.flac"
import metan001 from "../audios/dormitory/metan-01.flac"
import metan002 from "../audios/dormitory/metan-02.flac"
import metan003 from "../audios/dormitory/metan-03.flac"
import metan004 from "../audios/dormitory/metan-04.flac"
import ritsu001 from "../audios/dormitory/ritsu-01.flac"
import ritsu002 from "../audios/dormitory/ritsu-02.flac"
import ritsu003 from "../audios/dormitory/ritsu-03.flac"
import ritsu004 from "../audios/dormitory/ritsu-04.flac"
import ritsu005 from "../audios/dormitory/ritsu-05.flac"
import tsumugi001 from "../audios/dormitory/tsumugi-01.flac"
import tsumugi002 from "../audios/dormitory/tsumugi-02.flac"
import tsumugi003 from "../audios/dormitory/tsumugi-03.flac"
import tsumugi004 from "../audios/dormitory/tsumugi-04.flac"
import zundamon001 from "../audios/dormitory/zundamon-01.flac"
import zundamon002 from "../audios/dormitory/zundamon-02.flac"
import zundamon003 from "../audios/dormitory/zundamon-03.flac"
import zundamon004 from "../audios/dormitory/zundamon-04.flac"
import DormitoryCharacterCard from "../components/dormitoryCharacterCard"
import DormitoryCharacterModal from "../components/dormitoryCharacterModal"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"
import { CharacterInfo, CharacterKey } from "../types/dormitoryCharacter"

export default () => {
  const queryPortraits: {
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

  const characterKeys: CharacterKey[] = [
    "四国めたん",
    "ずんだもん",
    "春日部つむぎ",
    "雨晴はう",
    "波音リツ",
  ]

  const characterInfos: {
    [key in CharacterKey]: CharacterInfo
  } = {
    四国めたん: {
      name: "四国めたん",
      rubyName: "四国<rp>(</rp><rt>しこく</rt><rp>)</rp>めたん",
      bustupImage: queryPortraits.bustup.nodes.find(
        node => node.name === "bustup-metan"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: queryPortraits.portrait.nodes.find(
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
      voiceUrls: [metan001, metan002, metan003, metan004],
      infoImages: queryPortraits.dormitory.nodes
        .filter(node => node.name.includes("metan"))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.childImageSharp.gatsbyImageData),
      callNames: {
        四国めたん: undefined,
        ずんだもん: "ずんだもん",
        春日部つむぎ: "つむぎさん",
        雨晴はう: "はうさん",
        波音リツ: "リツさん",
        me: "わたくし",
        you: "貴女(たち)<br />アンタ(ら)",
      },
      detailUrl:
        "https://zunko.jp/con_voice.html#:~:text=%E3%81%AF%E3%81%93%E3%81%A1%E3%82%89%5Bsm31250786%5D-,%E5%9B%9B%E5%9B%BD%E3%82%81%E3%81%9F%E3%82%93%EF%BC%88%E6%BC%86%E9%BB%92%E3%81%AE%E3%82%81%E3%81%9F%E3%82%93%EF%BC%89,-CV%3A%E7%94%B0%E4%B8%AD%E5%B0%8F%E9%9B%AA",
    },

    ずんだもん: {
      name: "ずんだもん",
      rubyName: "ずんだもん",
      bustupImage: queryPortraits.bustup.nodes.find(
        node => node.name === "bustup-zundamon"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: queryPortraits.portrait.nodes.find(
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
      voiceUrls: [zundamon001, zundamon002, zundamon003, zundamon004],
      infoImages: queryPortraits.dormitory.nodes
        .filter(node => node.name.includes("zundamon"))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.childImageSharp.gatsbyImageData),
      callNames: {
        四国めたん: "めたん",
        ずんだもん: undefined,
        春日部つむぎ: "つむぎ",
        雨晴はう: "はう",
        波音リツ: "リツ",
        me: "ずんだもん<br />僕",
        you: "オマエ<br />みんな",
      },
      detailUrl:
        "https://zunko.jp/con_voice.html#:~:text=%E3%81%AF%E3%81%93%E3%81%A1%E3%82%89%5Bsm31259177%5D-,%E3%81%9A%E3%82%93%E3%81%A0%E3%82%82%E3%82%93,-CV%3A%E4%BC%8A%E8%97%A4%E3%82%86",
    },

    春日部つむぎ: {
      name: "春日部つむぎ",
      rubyName: "春日部<rp>(</rp><rt>かすかべ</rt><rp>)</rp>つむぎ",
      bustupImage: queryPortraits.bustup.nodes.find(
        node => node.name === "bustup-tsumugi"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: queryPortraits.portrait.nodes.find(
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
      voiceUrls: [tsumugi001, tsumugi002, tsumugi003, tsumugi004],
      callNames: {
        四国めたん: "めたん先輩",
        ずんだもん: "ずんだもん先輩",
        春日部つむぎ: undefined,
        雨晴はう: "はうちゃん",
        波音リツ: "りっちゃん",
        me: "あーし",
        you: "きみ<br />きみたち",
      },
      detailUrl: "https://tsukushinyoki10.wixsite.com/ktsumugiofficial",
    },

    雨晴はう: {
      name: "雨晴はう",
      rubyName: "雨晴<rp>(</rp><rt>あめはれ</rt><rp>)</rp>はう",
      bustupImage: queryPortraits.bustup.nodes.find(
        node => node.name === "bustup-hau"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: queryPortraits.portrait.nodes.find(
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
      voiceUrls: [hau001, hau002, hau003, hau004],
      callNames: {
        四国めたん: "めたんさん",
        ずんだもん: "ずんだもん",
        春日部つむぎ: "つむぎさん",
        雨晴はう: undefined,
        波音リツ: "リツさん",
        me: "僕",
        you: "あなた<br />あなた達",
      },
      detailUrl: "https://amehau.com/",
    },

    波音リツ: {
      name: "波音リツ",
      rubyName: "波音<rp>(</rp><rt>なみね</rt><rp>)</rp>リツ",
      bustupImage: queryPortraits.bustup.nodes.find(
        node => node.name === "bustup-ritsu"
      )!.childImageSharp.gatsbyImageData,
      portraitImage: queryPortraits.portrait.nodes.find(
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
      voiceUrls: [ritsu001, ritsu002, ritsu003, ritsu004, ritsu005],
      callNames: {
        四国めたん: "めたん",
        ずんだもん: "ずんだもん",
        春日部つむぎ: "つむぎ",
        雨晴はう: "はう",
        波音リツ: undefined,
        me: "あたし",
        you: "アンタ<br />アンタら",
      },
      detailUrl: "http://www.canon-voice.com/ritsu.html",
    },
  }

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
    <Page showingHeader={false}>
      <Seo
        title="ボイボ寮 | VOICEVOX"
        description="とある世界の不思議な建物、ボイボ寮。ここでは個性豊かな住民たちが暮らしています。"
        // image={shareThumb}
      />

      <div className="dormitory">
        <header className="hero is-small">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-2">ボイボ寮の住民たち</h1>
            </div>
          </div>
        </header>

        <section className="section py-0">
          <div className="container is-max-desktop has-text-centered is-size-5 py-6">
            とある世界の不思議な建物、ボイボ寮。
            <br />
            ここでは個性豊かな住民たちが暮らしています。
          </div>
        </section>

        <main className="section py-0">
          <div className="container is-max-desktop pt-1 pb-6">
            <div className="tile is-ancestor">
              <div className="tile is-parent is-2">
                <div className="tile is-child generation-label">
                  <h2 className="title is-3">2 期 生</h2>
                </div>
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

            <div className="tile is-ancestor">
              <div className="tile is-parent is-2">
                <div className="tile is-child generation-label">
                  <h2 className="title is-3">1 期 生</h2>
                </div>
              </div>
              <DormitoryCharacterCard
                characterInfo={characterInfos.四国めたん}
                onClick={() => showCharacterModal("四国めたん")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.ずんだもん}
                onClick={() => showCharacterModal("ずんだもん")}
              />
              <div className="tile is-parent is-3 tohoku-tile">
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
            <a
              className="button is-align-self-center mt-5 is-primary is-rounded"
              href="/"
              type="button"
              role={"button"}
            >
              <span className="has-text-weight-semibold">ダウンロード</span>
            </a>
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
        />
      )}
    </Page>
  )
}
