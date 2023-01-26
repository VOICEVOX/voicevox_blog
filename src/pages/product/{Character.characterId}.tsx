import {
  faCircleLeft,
  faCircleRight,
  faDownload,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql, Link, PageProps, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import ModalReadmeLibrary from "../../components/modalReadmeLibrary"
import { Page } from "../../components/page"
import PlayButton from "../../components/playButton"
import Seo from "../../components/seo"
import SoftwareFeature from "../../components/softwareFeature"
import StyleDropdown, {
  useStyleDropdownController,
} from "../../components/styleDropdown"
import { CharacterContext, GlobalContext } from "../../contexts/context"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import { CharacterKey } from "../../types/dormitoryCharacter"

const ProductPage = ({ params }: PageProps) => {
  const query = useStaticQuery<Queries.ProductQuery>(graphql`
    query Product {
      thumbImage: allFile(
        filter: { relativePath: { regex: "/^product/thumb-.*/" } }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      featureImage: allFile(
        filter: { relativePath: { regex: "/product-feature/" } }
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
  const { characterInfos } = useDetailedCharacterInfo()

  const [characterId, setCharacterId] = useState<string>(params.characterId) // FIXME: キャラクターID型を作る

  const characterInfoEntry = useMemo(
    () =>
      Object.entries(characterInfos).find(
        ([, characterInfo]) => characterInfo?.id === characterId
      ),
    [characterInfos, characterId]
  )
  const characterKey = useMemo(
    () => characterInfoEntry![0] as CharacterKey,
    [characterInfoEntry]
  )
  const characterInfo = useMemo(
    () => characterInfos[characterKey]!,
    [characterInfos, characterKey]
  )

  const description = `VOICEVOXは「${characterInfo.name}」の${characterInfo.voiceFeature}で誰でも簡単に音声を作成できる、無料のテキスト読み上げソフトウェアです。`

  const [
    showingLibraryReadmeModalCharacterKey,
    setShowingLibraryReadmeModalCharacterKey,
  ] = useState<CharacterKey | undefined>(undefined)

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--character-background-color",
      characterInfo.lightColor
    )
  }, [characterInfo])

  // サンプルボイスのスタイル選択
  const styles = useMemo(
    () => characterInfo.styleVoiceUrls.map(o => o.style),
    [characterInfo]
  )
  const { selectedStyle, setSelectedStyle } = useStyleDropdownController({
    styles,
  })
  const selectedAudioUrls = useMemo(
    () =>
      (
        characterInfo.styleVoiceUrls.find(
          ({ style }) => style == selectedStyle
        ) || characterInfo.styleVoiceUrls[0]
      ).urls, // FIXME: ブラウザバックで変なステートになるのでフォールバックしている
    [characterInfo, selectedStyle]
  )

  // キャラクター変更アニメーション
  type CharaAnimeObject = {
    characterKey: CharacterKey
    ref: React.MutableRefObject<HTMLDivElement | null>
    state: "entering" | "staying" | "leaving"
    direction: "left" | "right"
  }
  const [nowCharaAnimeObject, setNowCharaAnimeObject] =
    useState<CharaAnimeObject>({
      characterKey,
      ref: React.createRef(),
      state: "staying",
      direction: "left",
    })
  const [prevCharaAnimeObject, setPrevCharaAnimeObject] = useState<
    CharaAnimeObject | undefined
  >(undefined)

  // キャラクター変更（ページ遷移）
  const { characterKeys } = useContext(CharacterContext)
  const prevCharacterKey =
    characterKeys[
      (characterKeys.indexOf(characterKey) + characterKeys.length - 1) %
        characterKeys.length
    ]
  const postCharacterKey =
    characterKeys[
      (characterKeys.indexOf(characterKey) + 1) % characterKeys.length
    ]
  const changeToCharacter = useCallback(
    (nextCharacterKey: CharacterKey) => {
      setCharacterId(characterInfos[nextCharacterKey]!.id)
      setSelectedStyle(
        characterInfos[nextCharacterKey]!.styleVoiceUrls[0].style
      )

      // アニメーション用
      const diff =
        characterKeys.indexOf(nextCharacterKey) -
        characterKeys.indexOf(characterKey)
      const direction =
        (diff + characterKeys.length) % characterKeys.length <=
        characterKeys.length / 2
          ? "right"
          : "left"
      setPrevCharaAnimeObject({
        ...nowCharaAnimeObject,
        state: "leaving",
        direction,
      })
      setNowCharaAnimeObject({
        characterKey: nextCharacterKey,
        ref: React.createRef(),
        state: "entering",
        direction,
      })

      window.history.pushState(
        { characterKey: nextCharacterKey },
        "",
        `/product/${characterInfos[nextCharacterKey]!.id}/`
      )
      // // FIXME: たぶん本来は↓のgatsby.navigateを使うのが正しいけど、フラッシュするので使用できない
      // navigate(`/product/${characterInfos[nextCharacterKey]!.id}/`, {
      //   state: { characterKey: nextCharacterKey },
      // })
    },
    [characterInfos]
  )

  // ブラウザバックを無効化し、コード側でキャラクター変更する
  // TODO: なぜかうまくいかない。勝手にリロードされて404になってしまう？
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (
        event.state?.characterKey != undefined &&
        event.state?.characterKey != characterKey
      ) {
        setCharacterId(characterInfos[event.state.characterKey]!.id)
      }
    }
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [characterKey])

  // 最初に来たときはそのキャラクターをセット
  useEffect(() => {
    history.replaceState({ characterKey }, "")
  }, [])

  // 画像
  const thumbImage = query.thumbImage.nodes.find(
    node => node.name === `thumb-${characterId}`
  )?.childImageSharp?.gatsbyImageData
  if (thumbImage == undefined)
    throw new Error(`thumb-${characterId} is not found`)

  if (query.featureImage.nodes.length != 1)
    throw new Error("featureImage is not found")
  const featureImage =
    query.featureImage.nodes[0].childImageSharp!.gatsbyImageData

  return (
    <Page>
      <Seo
        title={`VOICEVOX ${characterInfo.name} | 無料のテキスト読み上げソフトウェア`}
        description={description}
        image={thumbImage.images.fallback?.src}
      />
      <div className="product">
        <main className="section py-0">
          <div className="top container">
            <button
              className="button prev circle-icon"
              onClick={() => changeToCharacter(prevCharacterKey)}
              aria-label="前のキャラクターを表示"
            >
              <FontAwesomeIcon icon={faCircleLeft} />
            </button>
            <button
              className="button post circle-icon"
              onClick={() => changeToCharacter(postCharacterKey)}
              aria-label="次のキャラクターを表示"
            >
              <FontAwesomeIcon icon={faCircleRight} />
            </button>
            <div className="top-character">
              {[prevCharaAnimeObject, nowCharaAnimeObject].map(
                obj =>
                  obj && (
                    <div
                      key={obj.characterKey}
                      ref={obj.ref}
                      className={`image-wrapper ${
                        obj.state != "staying" &&
                        `${obj.state}-${obj.direction}`
                      }`}
                    >
                      <GatsbyImage
                        image={characterInfos[obj.characterKey]!.portraitImage}
                        alt={characterInfos[obj.characterKey]!.name}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  )
              )}
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
                  <div className="is-flex is-flex-direction-row mt-2">
                    {selectedAudioUrls.map((url, index) => (
                      <PlayButton
                        key={index}
                        url={url}
                        name={`${characterInfo.name}のサンプルボイス${
                          index + 1
                        }}`}
                        color={characterInfo.color}
                        className="ml-1 mr-1"
                      />
                    ))}
                  </div>
                  {styles.length > 1 && (
                    <StyleDropdown
                      styles={styles}
                      selectedStyle={selectedStyle}
                      setSelectedStyle={setSelectedStyle}
                      characterName={characterInfo.name}
                      className="is-up mt-2"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="description">
              <h1 className="title">VOICEVOX {characterInfo.name}</h1>
              <p className="is-size-5">{description}</p>
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
                    setShowingLibraryReadmeModalCharacterKey(characterKey)
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
        hide={() => setShowingLibraryReadmeModalCharacterKey(undefined)}
        {...(showingLibraryReadmeModalCharacterKey != undefined
          ? {
              isActive: true,
              characterKey: showingLibraryReadmeModalCharacterKey,
            }
          : {
              isActive: false,
              characterKey: undefined,
            })}
      />
    </Page>
  )
}

export default ProductPage
