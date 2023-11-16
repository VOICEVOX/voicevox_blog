import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext } from "react"
import "../../components/layout.scss"
import { Page } from "../../components/page"
import Seo from "../../components/seo"

import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import {
  faDownload,
  faEnvelope,
  faHome,
} from "@fortawesome/free-solid-svg-icons"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import { NemoReadmeModal } from "../../components/nemoReadmeModal"
import PlayButton from "../../components/playButton"
import { GlobalContext } from "../../contexts/context"
import { useModalController } from "../../hooks/hook"
import shareThumb from "../../images/nemo/share-thumbnail.png"

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

  const context = useContext(GlobalContext)

  type SpeakerInfo = {
    id: string
    name: string
    icon: IGatsbyImageData
    audios: [string, string, string]
    color: string
    backgroundColor: string
    cv: string
    link: { twitter?: string; homepage?: string; email?: string }
  }

  // 話者ごとの名前などのメタ情報
  type SpeakerMetaInfo = {
    cv: string
    link: {
      homepage?: string
      twitter?: string
      email?: string
    }
  }
  const speakerMetaInfos: {
    female: readonly SpeakerMetaInfo[]
    male: readonly SpeakerMetaInfo[]
  } = {
    female: [
      {
        cv: "亜咲比 凛",
        link: { homepage: "https://www.instagram.com/rin_asahi00" },
      },
      {
        cv: "透川ナナ",
        link: {
          homepage: "https://skeb.jp/@kyoso_movie",
          twitter: "https://twitter.com/kyoso_movie",
        },
      },
      { cv: "ゆう", link: { twitter: "https://twitter.com/yuuyuuasa" } },
      { cv: "ぬっぴぃ", link: { twitter: "https://twitter.com/hisano_nuppy" } },
      { cv: "たけだまり", link: { email: "mailto:rasenline@yahoo.co.jp" } },
      {
        cv: "藤田昌代",
        link: {
          homepage: "http://selfish11.blog54.fc2.com/blog-entry-681.html",
        },
      },
    ],
    male: [
      {
        cv: "レナード・ジン",
        link: { email: "mailto:renerdgyink@gmail.com" },
      },
      {
        cv: "かちょゴリラ",
        link: { twitter: "https://twitter.com/Kacho_Gorilla" },
      },
      {
        cv: "待ち人",
        link: { twitter: "https://twitter.com/mochi_jin_voice" },
      },
    ],
  } as const

  const getSpeakerInfos = (femaleOrMale: "female" | "male"): SpeakerInfo[] => {
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
          id: `${femaleOrMale}${i + 1}`,
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

  // 女性と男性を並べる
  const sortedSpeakerInfos = [...speakerInfos.female, ...speakerInfos.male]

  // モーダル
  const {
    showing: showingNemoReadmeModal,
    show: showNemoReadmeModal,
    hide: hideNemoReadmeModal,
  } = useModalController()

  // 話者のサンプルボイスなどのコンポーネント
  const SpeakerComponent = ({
    info,
    style,
  }: { info: SpeakerInfo } & React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className="speaker" style={style}>
        <div className="speaker-icon-wrapper">
          <GatsbyImage image={info.icon} alt={`${info.name}のアイコン`} />
        </div>
        <div className="speaker-labels">
          <span className="cv">CV</span>
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls={`dropdown-${info.id}`}
                type="button"
              >
                <h3>{info.cv}</h3>
              </button>
            </div>
            <div
              className="dropdown-menu"
              id={`dropdown-${info.id}`}
              role="menu"
            >
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <span>音声収録のご依頼先</span>
                  <div className="buttons">
                    {[
                      {
                        link: info.link.homepage,
                        label: "ホームページ",
                        icon: faHome,
                      },
                      {
                        link: info.link.twitter,
                        label: "ツイッター",
                        icon: faTwitter,
                      },
                      {
                        link: info.link.email,
                        label: "メールアドレス",
                        icon: faEnvelope,
                      },
                    ].map(
                      ({ link, label, icon }) =>
                        link && (
                          <a
                            key={label}
                            className="button"
                            href={link}
                            aria-label={`${info.cv}の${label}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={icon} />
                          </a>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        image={shareThumb}
      />
      <main className="nemo">
        <section className="section py-0">
          <div className="top container is-max-widescreen">
            <div className="teaser">
              <StaticImage
                src="../../images/nemo/top-teaser.png"
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
                  onClick={() => {
                    context.nemoGuidanceModal.show()
                    context.sendEvent("download", "nemo")
                  }}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={0}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faDownload} />
                  </span>
                  <span className="has-text-weight-semibold">ダウンロード</span>
                </a>
                <button
                  onClick={showNemoReadmeModal}
                  className="button is-normal is-rounded"
                  type="button"
                >
                  <span>利用規約</span>
                </button>
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
            {
              // 内部で表示するドロップメニューが兄弟要素で隠れてしまうのでz-indexを指定している
              sortedSpeakerInfos.map((info, i) => (
                <SpeakerComponent
                  key={i}
                  info={info}
                  style={{ zIndex: sortedSpeakerInfos.length - i }}
                />
              ))
            }
          </div>
          <div className="speaker-contact-explain container is-max-desktop">
            より柔軟な演技や高品質な音声をお求めの場合は、
            <br />
            上記のリンク先にてご本人へご依頼いただけます。
          </div>
        </section>

        {/* コアライブラリ
VOICEVOXの音声合成をアプリケーションやサービスに組み込める、VOICEVOXのコアライブラリを配布しています。

詳しくは VOICEVOX CORE をご参照ください。 */}
      </main>
      <NemoReadmeModal
        isActive={showingNemoReadmeModal}
        hide={hideNemoReadmeModal}
      />
    </Page>
  )
}
