import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql, useStaticQuery } from "gatsby"
import { IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import DormitoryCharacterCard from "../components/dormitoryCharacterCard"
import DormitoryCharacterModal from "../components/dormitoryCharacterModal"
import "../components/layout.scss"
import Seo from "../components/seo"
import { CharacterInfo, CharacterKey } from "../types/dormitoryCharacter"

import metanNormal001 from "../audios/metan-normal-001.wav"
import metanNormal002 from "../audios/metan-normal-002.wav"
import metanNormal003 from "../audios/metan-normal-003.wav"
import zundamonNormal001 from "../audios/zundamon-normal-001.wav"
import zundamonNormal002 from "../audios/zundamon-normal-002.wav"
import zundamonNormal003 from "../audios/zundamon-normal-003.wav"
import tsumugi001 from "../audios/dormitory/tsumugi-01.wav"
import tsumugi002 from "../audios/dormitory/tsumugi-02.wav"
import tsumugi003 from "../audios/dormitory/tsumugi-03.wav"
import tsumugi004 from "../audios/dormitory/tsumugi-04.wav"

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
        "高等部二年生。常に金欠。<br />誰にでも遠慮しないので、基本的にタメ口。",
      labelInfos: [
        { label: "年齢", value: "17 歳", size: 1 },
        { label: "身長", value: "150 cm", size: 1 },
        { label: "性格", value: "ツンデレ気味", size: 1 },
        { label: "趣味", value: "中二病妄想", size: 1 },
      ],
      voiceUrls: [metanNormal001, metanNormal002, metanNormal003],
      infoImages: queryPortraits.dormitory.nodes
        .filter(node => node.name.includes("metan"))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.childImageSharp.gatsbyImageData),
      callNames: {
        四国めたん: undefined,
        ずんだもん: "ずんだもん",
        春日部つむぎ: "つむぎさん",
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
      voiceUrls: [zundamonNormal001, zundamonNormal002, zundamonNormal003],
      infoImages: queryPortraits.dormitory.nodes
        .filter(node => node.name.includes("zundamon"))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(node => node.childImageSharp.gatsbyImageData),
      callNames: {
        四国めたん: "めたん",
        ずんだもん: undefined,
        春日部つむぎ: "つむぎ",
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
        me: "あーし",
        you: "きみ<br />きみたち",
      },
      detailUrl: "https://tsukushinyoki10.wixsite.com/ktsumugiofficial",
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
    <>
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

              <div className="tile is-parent is-3">
                <div
                  className="tile is-child card coming-card"
                  style={{ borderColor: "#386CB0" }}
                >
                  <div className="card-content has-text-centered">
                    <div
                      className="content is-size-2 has-text-weight-bold has-text-centered"
                      style={{ color: "#386CB0" }}
                    >
                      Coming
                      <br />
                      soon
                    </div>
                  </div>
                </div>
              </div>
              <div className="tile is-parent is-3">
                <div
                  className="tile is-child card coming-card"
                  style={{ borderColor: "#FC4E32" }}
                >
                  <div className="card-content has-text-centered">
                    <div
                      className="content is-size-2 has-text-weight-bold"
                      style={{ color: "#FC4E32" }}
                    >
                      Coming
                      <br />
                      soon
                    </div>
                  </div>
                </div>
              </div>
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
                      />
                      <StaticImage
                        className="tile is-child"
                        src="../images/icon-zunko.png"
                        alt="東北ずん子"
                      />
                      <StaticImage
                        className="tile is-child"
                        src="../images/icon-itako.png"
                        alt="東北イタコ"
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
              target="_blank"
              rel="noreferrer"
            >
              <span className="has-text-weight-semibold">ダウンロード</span>
            </a>
          </div>
        </section>

        <footer className="footer">
          <div className="container is-flex is-justify-content-center">
            <a
              className="button is-outlined ml-1 mr-1"
              href="https://github.com/Hiroshiba/voicevox"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon">
                <FontAwesomeIcon icon={faGithub} />
              </span>
              <span>GitHub</span>
            </a>
            <a
              className="button is-outlined is-info ml-1 mr-1"
              href="https://twitter.com/hiho_karuta"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon">
                <FontAwesomeIcon icon={faTwitter} />
              </span>
              <span>Twitter</span>
            </a>
          </div>
          <div className="content has-text-centered mt-3">
            <p>© 2021 Hiroshiba Kazuyuki</p>
          </div>
        </footer>
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
    </>
  )
}
