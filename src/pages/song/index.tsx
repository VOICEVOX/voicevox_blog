import React, { useContext, useMemo, useState } from "react"
import "../../components/layout.scss"
import { Page } from "../../components/page"
import Seo from "../../components/seo"

import {
  faBackwardStep,
  faDownload,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import PlayButton from "../../components/playButton"
import { CharacterContext } from "../../contexts/context"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import shareThumb from "../../images/nemo/share-thumbnail.png"
import { CharacterInfo, CharacterKey } from "../../types/dormitoryCharacter"
import { getProductPageUrl } from "../../urls"

// 音声カード表示
const VoiceCard = React.memo(
  ({
    characterInfo,
    characterKey,
  }: {
    characterInfo: CharacterInfo
    characterKey: CharacterKey
  }) => {
    if (!characterInfo)
      throw new Error(`characterInfo is undefined. (${characterKey})`)

    const index = 0

    const color = characterInfo.color
    const coloredStyle = useMemo(() => {
      return {
        backgroundColor: "transparent",
        borderColor: color,
        color: color,
      }
    }, [color])

    const audioSamples = useMemo(
      () => characterInfo.songVoiceUrls,
      [characterInfo]
    )

    // スタイルがまだ時を考慮している
    const [styleState, setStyleState] = useState<
      | {
          styles: { name: string; type: string }[]
          selectedStyleIndex: number
        }
      | undefined
    >(
      audioSamples.length > 0
        ? {
            styles: audioSamples.map(value => {
              return { name: value.style, type: value.styleType }
            }),
            selectedStyleIndex: 0,
          }
        : undefined
    )

    // スタイルタイプを含んだスタイル名
    const fullStyleName = useMemo(() => {
      if (styleState == undefined) {
        return undefined
      }
      return (
        (styleState.styles[styleState.selectedStyleIndex].type == "humming"
          ? "ハミング"
          : "ソング") +
        "：" +
        styleState.styles[styleState.selectedStyleIndex].name
      )
    }, [styleState])

    // 次のスタイルへ
    const nextStyle = () => {
      if (!styleState) {
        throw new Error("styleState is undefined.")
      }
      setStyleState({
        ...styleState,
        selectedStyleIndex:
          (styleState.selectedStyleIndex + 1) % styleState.styles.length,
      })
    }

    // 前のスタイルへ
    const prevStyle = () => {
      if (!styleState) {
        throw new Error("styleState is undefined.")
      }
      setStyleState({
        ...styleState,
        selectedStyleIndex:
          (styleState.selectedStyleIndex - 1 + styleState.styles.length) %
          styleState.styles.length,
      })
    }

    const LinkToProductPage = ({
      children,
      className,
      style,
    }: React.HTMLAttributes<HTMLLinkElement>) => {
      return (
        <Link
          to={getProductPageUrl(characterInfo)}
          className={className}
          style={style}
        >
          {children}
        </Link>
      )
    }

    return (
      <div className="voice-card">
        <LinkToProductPage className="voice-card-image">
          <GatsbyImage
            image={characterInfo.bustupImage}
            alt={characterInfo.name}
          />
        </LinkToProductPage>
        <div className="voice-card-content">
          <h3 className="title">
            <LinkToProductPage style={{ color: "inherit" }}>
              {characterInfo.name}
            </LinkToProductPage>
          </h3>

          {styleState && (
            <>
              <div className="buttons">
                {styleState.styles.length > 1 && (
                  <button
                    className={`button circle-icon is-small`}
                    style={coloredStyle}
                    type="button"
                    aria-label="前のサンプル音声へ"
                    onClick={prevStyle}
                  >
                    <FontAwesomeIcon icon={faBackwardStep} />
                  </button>
                )}

                <PlayButton
                  url={
                    characterInfo.songVoiceUrls[styleState.selectedStyleIndex]
                      .urls[0]
                  }
                  name={`${fullStyleName}のサンプル音声}`}
                  color={characterInfo.color}
                  style={{ backgroundColor: "transparent" }}
                />

                {styleState.styles.length > 1 && (
                  <button
                    className={`button circle-icon is-small`}
                    style={coloredStyle}
                    type="button"
                    aria-label="次のサンプル音声へ"
                    onClick={nextStyle}
                  >
                    <FontAwesomeIcon icon={faForwardStep} />
                  </button>
                )}
              </div>
              <h4 className="style-name">{fullStyleName}</h4>
            </>
          )}
        </div>
      </div>
    )
  }
)

export default () => {
  // const query = useStaticQuery(graphql``)

  const { characterInfos } = useDetailedCharacterInfo()

  const { characterKeys } = useContext(CharacterContext)

  return (
    <Page showingHeader={true} isDark={true}>
      {/* TODO: SEOワードいれる */}
      <Seo title="VOICEVOX Song" description="TODO" image={shareThumb} />

      <main className="song">
        <section className="section px-0 py-0">
          <div className="top">
            <h1 className="title">VOICEVOX Song</h1>

            <div className="buttons">
              <a
                className="button is-primary is-large is-rounded"
                onClick={() => {
                  // context.nemoGuidanceModal.show()
                  // context.sendEvent("download", "nemo")
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
                // onClick={showNemoReadmeModal}
                className="button is-normal is-rounded"
                type="button"
              >
                <span>利用規約</span>
              </button>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="voices-container container">
            <h2 className="title">音声ライブラリ一覧</h2>
            <div className="voice-cards">
              {characterKeys.map(characterKey => (
                <VoiceCard
                  key={characterKey}
                  characterInfo={characterInfos[characterKey]}
                  characterKey={characterKey}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Page>
  )
}
