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
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              height: "calc(100vh - 3.25rem)",
            }}
          >
            <div
              className="main-character-pane"
              style={{
                flex: "0 1 50%",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  transform: "translateX(-5%)",

                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GatsbyImage
                  image={characterInfo.portraitImage}
                  alt={characterInfo.name}
                  objectFit="cover"
                  imgStyle={{ height: "100%", width: "auto" }}
                  style={{ height: "100%", width: "auto", flex: "0 0 auto" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: "5%",

                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
                className="pb-5"
              >
                <div
                  style={{
                    backgroundColor: "#fffc",
                    width: "200px",
                    borderRadius: "16px",

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "1rem",
                  }}
                  className="p-4"
                >
                  <p>{characterInfo.description.replaceAll("<br />", "")}</p>
                  <Link
                    to={`/dormitory/${characterId}/`}
                    className="has-text-weight-bold"
                    style={{
                      color: "black",
                    }}
                  >
                    キャラクター詳細　→
                  </Link>
                </div>
                <div
                  style={{
                    backgroundColor: "#fffc",
                    width: "200px",
                    borderRadius: "16px",

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  className="p-4"
                >
                  <h3 className="is-size-6">サンプルボイス</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className="mt-1"
                  >
                    {characterInfo.styleVoiceUrls[0].urls.map((url, index) => (
                      <PlayButton
                        key={index}
                        url={url}
                        color={characterInfo.color}
                        className="ml-1 mr-1"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                flex: "0 1 50%",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
              }}
              className="px-6"
            >
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
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
                className="mt-5"
              >
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
        </main>

        <div
          className="product-feature section my-5 py-5"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="product-feature-separator">
            <h2 className="product-feature-separator-text title is-size-2 has-text-weight-bold px-5">
              VOICEVOX
            </h2>
          </div>
          <h3 className="product-feature-separator-text is-size-5 has-text-weight-bold mt-5">
            無料で使える中品質なテキスト読み上げソフトウェア
          </h3>

          <div
            className="mt-6"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <GatsbyImage
              image={featureImage}
              alt="VOICEVOXのソフトウェアの画面のスクリーンショット画像"
              objectFit="contain"
              style={{
                width: "50%",
                border: "1.5px solid",
              }}
              className="ml-6"
            />
            <div
              style={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SoftwareFeature />
            </div>
          </div>
        </div>
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
