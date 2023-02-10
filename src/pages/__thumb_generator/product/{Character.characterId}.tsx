import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql, PageProps, useStaticQuery } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import React from "react"
import Seo from "../../../components/seo"
import { useDetailedCharacterInfo } from "../../../hooks/useDetailedCharacterInfo"
import { CharacterKey } from "../../../types/dormitoryCharacter"

export default ({ location, params }: PageProps) => {
  const query = useStaticQuery<Queries.ThumbGeneratorProductQuery>(graphql`
    query ThumbGeneratorProduct {
      thumbImage: allFile(
        filter: { absolutePath: { regex: "/thumb-product/" } }
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

  const isDebug = new URLSearchParams(location.search).has("debug")

  const characterId: string = params.characterId

  const { characterInfos } = useDetailedCharacterInfo()

  const characterInfoEntry = Object.entries(characterInfos).find(
    ([, characterInfo]) => characterInfo?.id === characterId
  )
  const characterKey = characterInfoEntry![0] as CharacterKey
  const characterInfo = characterInfos[characterKey]!

  if (query.thumbImage.nodes.length != 1)
    throw new Error("thumbImage is not found")
  const thumbImage = query.thumbImage.nodes[0].childImageSharp!.gatsbyImageData

  return (
    <>
      <Seo
        title="productページのサムネイル作成"
        description="productページのサムネイル作成"
        noindex={true}
      />
      <div
        style={{
          width: "1200px",
          height: "630px",

          backgroundColor: characterInfo.lightColor,
          display: "flex",
          position: "relative",
        }}
      >
        {/* 白枠 */}
        <div
          style={{
            position: "absolute",
            width: "72%",
            height: "90%",
            top: "5%",
            left: "12%",
            borderRadius: "60px",
            backgroundColor: "white",
          }}
        />

        {/* ロゴと説明とダウンロードボタン */}
        <div
          style={{
            flexGrow: 1,
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "21%",
              left: "33%",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <span
              style={{
                fontSize: "80px",
                fontWeight: "bold",
              }}
            >
              VOICEVOX
            </span>
            <span
              style={{
                fontSize: "37.1px",
                fontWeight: "bold",
                textAlign: "start",
                marginTop: "10px",
              }}
            >
              無料のテキスト読み上げ
              <br />
              ソフトウェア
            </span>
            <a
              className="button is-primary is-rounded is-large"
              style={{
                fontSize: "40px",
                marginTop: "38px",
                height: "70px",
              }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faDownload} />
              </span>
              <span className="has-text-weight-semibold">ダウンロード</span>
            </a>
          </div>
        </div>

        {/* スクショ */}
        <div
          style={{
            width: "40%",
            height: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "80%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${
                  thumbImage.images
                    .sources![0].srcSet.split(",")[2]
                    .split(" ")[0]
                })`,
                backgroundSize: "cover",
                backgroundPosition: "left",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  width: "39%",
                  height: "80%",
                  backgroundImage: `url(${getSrc(
                    characterInfo.portraitImage
                  )})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundClip: "content-box",
                  paddingBottom: "39.2%",
                }}
              />
            </div>
          </div>

          {/* 枠表示、中央630px部分 */}
          {isDebug ? (
            <div
              style={{
                position: "absolute",
                width: "630px",
                height: "630px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",

                border: "1px dashed black",
              }}
            />
          ) : undefined}
        </div>
      </div>
    </>
  )
}
