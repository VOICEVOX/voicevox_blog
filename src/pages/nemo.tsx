import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"

import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import PlayButton from "../components/playButton"

export default () => {
  const query: Queries.NemoQuery = useStaticQuery(graphql`
    query Nemo {
      femaleIcons: allFile(filter: { absolutePath: { regex: "/images\/nemo\/nemo_icon_\\d+_f/" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      maleIcons: allFile(filter: { absolutePath: { regex: "/images\/nemo\/nemo_icon_\\d+_m/" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }

      femaleAudios: allFile(
        filter: {sourceInstanceName: {eq: "audio"}, relativePath: {regex: "/nemo/nemo_female_.\\d+-.+?-\\d+/"}}
      ) {
        nodes {
          name
          publicURL
        }
      }
      maleAudios: allFile(
        filter: {sourceInstanceName: {eq: "audio"}, relativePath: {regex: "/nemo/nemo_male_.\\d+-.+?-\\d+/"}}
      ) {
        nodes {
          name
          publicURL
        }
      }
    }
    `)

  type SpeakerInfo = {
    name: string
    icon: IGatsbyImageData
    audios: [string, string, string]
    color: string
    backgroundColor: string
    cv: string
  }

  // 話者ごとの名前などのメタ情報
  const speakerMetaInfos = {
    female: [
      { cv: "女性1" },
      { cv: "女性22" },
      { cv: "女性333" },
      { cv: "女性4444" },
      { cv: "女性55555" },
      { cv: "女性666666" },
    ],
    male: [{ cv: "男性1" }, { cv: "男性22" }, { cv: "男性333" }],
  } as const

  function getSpeakerInfos(femaleOrMale: "female" | "male"): SpeakerInfo[] {
    const count = speakerMetaInfos[femaleOrMale].length

    const iconNodes =
      femaleOrMale == "female" ? query.femaleIcons.nodes : query.maleIcons.nodes
    const icons = iconNodes
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, count)
      .map(node => node.childImageSharp!.gatsbyImageData)

    const audioNodes =
      femaleOrMale == "female"
        ? query.femaleAudios.nodes
        : query.maleAudios.nodes
    const audios: [string, string, string][] = [...Array(count).keys()].map(
      i => {
        const index = ("00" + (i + 1)).slice(-3)
        const urls = audioNodes
          .filter(value => value.name.includes(`nemo_${femaleOrMale}_${index}`))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(value => {
            if (value.publicURL == null)
              throw new Error(`音声のURLがありません: ${value.name}`)
            return value.publicURL
          })
        if (urls.length != 3)
          throw new Error(`音声が3つではありません: ${urls}`)
        return [urls[0], urls[1], urls[2]]
      }
    )

    return [...Array(count).keys()].map(
      i =>
        ({
          name: (femaleOrMale == "female" ? "女性" : "男性") + `${i + 1}`,
          icon: icons[i],
          audios: audios[i],
          color: femaleOrMale == "female" ? "#f1736fff" : "#6fcef1ff",
          backgroundColor: "female" ? "#f1736f09" : "6fcef109",
          ...speakerMetaInfos[femaleOrMale][i],
        } as const)
    )
  }

  // 話者名足したりCV足したりリンク先足したり
  const speakerInfos = {
    female: getSpeakerInfos("female"),
    male: getSpeakerInfos("male"),
  } as const

  // // 男女交互になるようにする
  // const minCount = Math.min(
  //   speakerInfos.female.length,
  //   speakerInfos.male.length
  // )
  // const sortedSpeakerInfos: SpeakerInfo[] = []
  // for (let i = 0; i < minCount; i++) {
  //   sortedSpeakerInfos.push(speakerInfos.female[i], speakerInfos.male[i])
  // }
  // if (speakerInfos.female.length > minCount) {
  //   sortedSpeakerInfos.push(...speakerInfos.female.slice(minCount))
  // } else if (speakerInfos.male.length > minCount) {
  //   sortedSpeakerInfos.push(...speakerInfos.male.slice(minCount))
  // }

  // 女性と男性を並べる
  const sortedSpeakerInfos = [...speakerInfos.female, ...speakerInfos.male]

  // 話者のサンプルボイスなどのコンポーネント
  const SpeakerComponent = ({ info }: { info: SpeakerInfo }) => {
    return (
      <div className="speaker">
        <div className="speaker-icon-wrapper">
          <GatsbyImage image={info.icon} alt={`${info.name}のアイコン`} />
        </div>
        <div className="speaker-labels">
          <span className="cv">CV</span>
          <h3>{info.cv}</h3>
        </div>
        <div className="sample-voices">
          {info.audios.map((url, index) => (
            <PlayButton
              key={index}
              url={url}
              name={`${info.name}のサンプルボイス${index + 1}}`}
              color={info.color}
              style={{ backgroundColor: info.backgroundColor }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <Page showingHeader={true} isNemo={true}>
      <Seo
        title="VOICEVOX Nemo"
        description="プレゼンから動画作成、ナレーションまで様々なTPOに合わせて利用できる、キャラクター無しの無料中品質読み上げソフトウェア"
        // image={shareThumb}
      />
      <main className="nemo">
        <section className="section py-0">
          <div className="top container is-max-widescreen">
            <div className="teaser">
              <StaticImage
                src="../images/nemo/top-teaser.png"
                alt="VOICEVOX Nemoを利用中のソフトウェアのスクリーンショット"
                objectFit="contain"
                style={{ width: "auto", height: "100%" }}
              />
            </div>

            <div className="description">
              <h1 className="title">VOICEVOX Nemo</h1>
              <h2 className="title">
                あらゆる場面に対応する
                <br />
                無料の中品質読み上げソフトウェア
              </h2>
              <div className="powered-by">Powered by VOICEVOX</div>

              <div className="buttons">
                <a
                  className="button is-primary is-rounded"
                  onClick={() => {}}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={0}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faDownload} />
                  </span>
                  <span className="has-text-weight-semibold">ダウンロード</span>
                </a>
                <Link to="/nemo/term/" className="button is-normal is-rounded">
                  <span>利用規約</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="feature container is-max-widescreen">
            <div className="feature-cell">
              商用利用・非商用利用
              <br />
              問わず無料
            </div>
            <div className="feature-cell">
              マルチOSに対応
              <br />
              (Win / Mac / Linux)
            </div>
            <div className="feature-cell">
              簡単に使える
              <br />
              わかりやすい操作画面
            </div>
            <div className="feature-cell">
              イントネーションの
              <br />
              詳細な調整も可能
            </div>
          </div>

          <div className="explain container is-max-desktop">
            プレゼンから動画作成ナレーションまで
            <br />
            様々なTPOに合わせて利用できる
            <br />
            キャラクターなしの読み上げソフトウェア
          </div>
        </section>

        <section className="section py-0">
          <div className="speakers-container container is-max-desktop">
            {sortedSpeakerInfos.map((info, i) => (
              <SpeakerComponent key={i} info={info} />
            ))}
          </div>
          <div className="speaker-contact-explain container is-max-desktop">
            より柔軟な演技や高品質な音声をお求めの場合は、
            <br />
            上記のリンク先にてご本人へご依頼いただくことができます。
          </div>
        </section>
      </main>
    </Page>
  )
}
