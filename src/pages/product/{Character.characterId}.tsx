import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql, Link, PageProps, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useContext, useEffect, useState } from "react"
import ModalReadmeLibrary from "../../components/modalReadmeLibrary"
import { Page } from "../../components/page"
import PlayButton from "../../components/playButton"
import Seo from "../../components/seo"
import SoftwareFeature from "../../components/softwareFeature"
import { GlobalContext } from "../../contexts/context"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import { CharacterKey } from "../../types/dormitoryCharacter"

export default ({ params }: PageProps) => {
  const query = useStaticQuery<Queries.ProductQuery>(graphql`
    query Product {
      featureImage: allFile(
        filter: { absolutePath: { regex: "/product-feature/" } }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `)

  const context = useContext(GlobalContext)

  const characterId: string = params.characterId

  const { characterInfos } = useDetailedCharacterInfo()

  const characterInfoEntry = Object.entries(characterInfos).find(
    ([, characterInfo]) => characterInfo?.id === characterId
  )
  const characterKey = characterInfoEntry![0] as CharacterKey
  const characterInfo = characterInfos[characterKey]!

  const [
    showingLibraryReadmeModalCharaterKey,
    setShowingLibraryReadmeModalCharaterKey,
  ] = useState<CharacterKey | undefined>(undefined)

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--character-background-color",
      characterInfo.lightColor
    )
  }, [characterInfo])

  if (query.featureImage.nodes.length != 1)
    throw new Error("featureImage is not found")
  const featureImage =
    query.featureImage.nodes[0].childImageSharp!.gatsbyImageData

  return (
    <Page>
      <Seo
        title="ボイボ寮 | VOICEVOX"
        description={characterInfo.description}
        image={characterInfo.ogpImage.images.fallback?.src}
      />
      <div className="product">
        <main className="section py-0">
          <div className="container">
            <div className="top">
              <div className="top-character">
                <div className="image-wrapper">
                  <GatsbyImage
                    image={characterInfo.portraitImage}
                    alt={characterInfo.name}
                    objectFit="cover"
                    imgStyle={{ height: "100%", width: "auto" }}
                    style={{ height: "100%", width: "auto", flex: "0 0 auto" }}
                  />
                </div>
                <div className="info pb-5">
                  <div className="detail p-4">
                    <p>{characterInfo.description.replaceAll("<br />", "")}</p>
                    <Link
                      to={`/dormitory/${characterId}/`}
                      className="has-text-weight-bold has-text-black"
                    >
                      キャラクター詳細　→
                    </Link>
                  </div>
                  <div className="sample p-4">
                    <h3 className="is-size-6">サンプルボイス</h3>
                    <div className="is-flex is-flex-direction-row mt-1">
                      {characterInfo.styleVoiceUrls[0].urls.map(
                        (url, index) => (
                          <PlayButton
                            key={index}
                            url={url}
                            color={characterInfo.color}
                            className="ml-1 mr-1"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="description">
                <h1 className="title">VOICEVOX {characterInfo.name}</h1>
                <p className="is-size-5">
                  VOICEVOXは「{characterInfo.name}」の
                  {characterInfo.voiceFeature}
                  で誰でも簡単に音声を作成できる、無料のテキスト読み上げソフトウェアです。
                </p>
                <a
                  className="button mt-5 is-primary is-rounded is-large"
                  onClick={() => {
                    context.downloadModal.show()
                    context.sendEvent("download", "software")
                  }}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={0}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faDownload} />
                  </span>
                  <span className="has-text-weight-semibold">
                    VOICEVOX を ダウンロード
                  </span>
                </a>
                <div className="terms mt-5">
                  <Link to="/term/" className="button is-normal is-rounded">
                    <span>VOICEVOX 利用規約</span>
                  </Link>
                  <button
                    onClick={() =>
                      setShowingLibraryReadmeModalCharaterKey(characterKey)
                    }
                    className="button is-normal is-rounded"
                    type="button"
                  >
                    <span>{characterInfo.name} 利用規約</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <section className="section">
          <div
            className="feature section"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="separator">
              <h2 className="separator-text title is-size-2 has-text-weight-bold px-5">
                VOICEVOX
              </h2>
            </div>
            <h3 className="separator-text is-size-5 has-text-weight-bold mt-5">
              無料で使える中品質なテキスト読み上げソフトウェア
            </h3>

            <div className="feature-content">
              <GatsbyImage
                image={featureImage}
                alt="VOICEVOXのソフトウェアの画面のスクリーンショット画像"
                objectFit="contain"
                className="thumb"
              />
              <div className="description">
                <SoftwareFeature />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ModalReadmeLibrary
        hide={() => setShowingLibraryReadmeModalCharaterKey(undefined)}
        {...(showingLibraryReadmeModalCharaterKey != undefined
          ? {
              isActive: true,
              characterKey: showingLibraryReadmeModalCharaterKey,
            }
          : {
              isActive: false,
              characterKey: undefined,
            })}
      />
    </Page>
  )
}
