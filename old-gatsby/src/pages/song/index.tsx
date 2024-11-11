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
import { OssGuidanceSection } from "../../components/ossGuidance"
import PlayButton from "../../components/playButton"
import { CharacterContext, GlobalContext } from "../../contexts/context"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import shareThumb from "../../images/song/share-thumb.png"
import { CharacterInfo, CharacterKey } from "../../types/dormitoryCharacter"
import { getProductPageUrl } from "../../../../src/constants/url"

// キャラクターごとのカード表示
const CharacterCard = React.memo(
  ({
    characterInfo,
    characterKey,
  }: {
    characterInfo: CharacterInfo
    characterKey: CharacterKey
  }) => {
    if (!characterInfo)
      throw new Error(`characterInfo is undefined. (${characterKey})`)

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

    const [styleState, setStyleState] = useState<
      | {
          styles: { name: string; type: string }[]
          selectedStyleIndex: number
        }
      | undefined // スタイルが未発表な場合はundefined
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
  const { characterInfos } = useDetailedCharacterInfo()

  const context = useContext(GlobalContext)
  const { characterKeys } = useContext(CharacterContext)

  // ソングを持つキャラクターを前に表示する
  // ソング・ハミングどちらも無いキャラクターはフィルター
  const orderedCharacterKeys = useMemo(() => {
    return characterKeys
      .filter(key => characterInfos[key].songVoiceUrls.length > 0)
      .toSorted((a, b) => {
        const hasSong = (songVoiceUrls: { styleType: "song" | "humming" }[]) =>
          songVoiceUrls.some(({ styleType }) => styleType === "song")
        return hasSong(characterInfos[a].songVoiceUrls) &&
          !hasSong(characterInfos[b].songVoiceUrls)
          ? -1
          : 1
      })
  }, [characterKeys, characterInfos])

  // キャラクター数
  const characterCount = useMemo(() => {
    return orderedCharacterKeys.length
  }, [orderedCharacterKeys])

  // スタイル数
  const styleCount = useMemo(() => {
    return orderedCharacterKeys.reduce((acc, key) => {
      return acc + characterInfos[key].songVoiceUrls.length
    }, 0)
  }, [orderedCharacterKeys, characterInfos])

  return (
    <Page showingHeader={true} isDark={true}>
      <Seo
        title="VOICEVOX Song"
        description="無料で使える中品質なテキスト読み上げ・歌声合成ソフトウェア。商用・非商用問わず無料で、誰でも簡単にお使いいただけます。喋り声に近い声で歌えるハミング機能も搭載。"
        image={shareThumb}
      />

      <main className="song">
        <section className="section px-0 py-0">
          <div className="top">
            <div className="titles">
              <h1 className="title">VOICEVOX Song</h1>
              <span className="subtitle">
                無料で使える中品質な
                <wbr />
                テキスト読み上げ・歌声合成ソフトウェア
              </span>
            </div>

            <div className="buttons">
              <a
                className="button is-primary is-large is-rounded"
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
                <span className="has-text-weight-semibold">ダウンロード</span>
              </a>
              <Link
                to="/term/"
                className="button is-normal is-rounded"
                type="button"
                role="button"
              >
                利用規約
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="feature container">
            <h2 className="title">特徴</h2>
            <div className="feature-cells">
              <div className="feature-cell">
                商用利用可能な
                <br />
                フリーソフト
              </div>
              <div className="feature-cell">
                マルチOSに対応
                <br />
                (Win / Mac / Linux)
              </div>
              <div className="feature-cell">
                {characterCount} 名のキャラクターと
                <br />
                {styleCount} 種類のボイス
              </div>
              <div className="feature-cell">
                すぐ使える GUI と
                <br />
                歌唱 AI で創作支援
              </div>
            </div>
          </div>

          <div className="container voices">
            <h2 className="title">音声ライブラリ一覧</h2>
            <div className="voice-cards">
              {orderedCharacterKeys.map(characterKey => (
                <CharacterCard
                  key={characterKey}
                  characterInfo={characterInfos[characterKey]}
                  characterKey={characterKey}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container is-max-desktop">
            <h2 className="title">ハミングとは？</h2>
            <p>
              喋り声のデータを用いて音声ライブラリを作成し、
              歌えるキャラクターに歌い方を倣うことで、
              キャラクターの喋り声に近い声で歌える機能です。
            </p>
            <p>キャラクターによっていろんなスタイルで歌うことができます。</p>
          </div>
        </section>

        <OssGuidanceSection isDark={true} />
      </main>
    </Page>
  )
}
