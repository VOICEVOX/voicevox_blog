import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useContext, useEffect, useRef, useState } from "react"
import AudioSample from "../components/audioSample"
import "../components/layout.scss"
import ModalReadmeLibrary from "../components/modalReadmeLibrary"
import { Page } from "../components/page"
import Seo from "../components/seo"
import SoftwareFeature from "../components/softwareFeature"
import { CharacterContext } from "../contexts/context"
import { useDetailedCharacterInfo } from "../hooks/useDetailedCharacterInfo"
import landingMovieThumb from "../images/landing-movie-thumb.png"
import shareThumb from "../images/landing-share-thumb.jpg"
import Logo from "../images/logo.svg"
import landingMovie from "../movies/landing.mp4"
import { CharacterInfo, CharacterKey } from "../types/dormitoryCharacter"
import { getProductPageUrl } from "../urls"

// キャラクター表示
const CharacterCard = React.memo(
  ({
    characterInfo,
    characterKey,
    setShowingLibraryReadmeModalCharacterKey,
  }: {
    characterInfo: CharacterInfo
    characterKey: CharacterKey
    setShowingLibraryReadmeModalCharacterKey: (
      characterKey: CharacterKey
    ) => void
  }) => {
    if (!characterInfo)
      throw new Error(`characterInfo is undefined. (${characterKey})`)
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
      <div className="column is-6-tablet is-4-desktop">
        <div className="card">
          <LinkToProductPage className="card-image">
            <GatsbyImage
              image={characterInfo.bustupImage}
              alt={characterInfo.name}
            />
          </LinkToProductPage>
          <div className="card-content has-text-centered">
            <h3 className="title is-4">
              <LinkToProductPage style={{ color: "inherit" }}>
                {characterInfo.name}
              </LinkToProductPage>
            </h3>
            <p className="subtitle is-5">
              {characterInfo.voiceFeature
                ? characterInfo.voiceFeature
                : "（準備中）"}
            </p>
            {characterInfo.releaseDate != undefined && (
              <p className="py-0" style={{ marginTop: "-1rem", color: "red" }}>
                Coming Soon
              </p>
            )}
            {characterInfo.styleVoiceUrls.length > 0 && (
              <AudioSample
                audioSamples={characterInfo.styleVoiceUrls}
                characterName={characterInfo.name}
              />
            )}
            <div className="pt-3">
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
      </div>
    )
  }
)

const Main = React.memo(
  ({ setShowingHeader }: { setShowingHeader: (show: boolean) => void }) => {
    const { characterInfos } = useDetailedCharacterInfo()

    const { characterKeys } = useContext(CharacterContext)

    // ファーストビュー用のビューを超えたらヘッダーを表示する
    const firstViewRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (!firstViewRef.current) return
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          setShowingHeader(!entry.isIntersecting)
        })
      })
      observer.observe(firstViewRef.current)
    }, [firstViewRef])

    const [
      showingLibraryReadmeModalCharacterKey,
      setShowingLibraryReadmeModalCharacterKey,
    ] = useState<CharacterKey | undefined>(undefined)

    return (
      <>
        <Seo
          title="VOICEVOX | 無料のテキスト読み上げ・歌声合成ソフトウェア"
          description="無料で使える中品質なテキスト読み上げ・歌声合成ソフトウェア。商用・非商用問わず無料で、誰でも簡単にお使いいただけます。イントネーションを詳細に調整することも可能です。"
          image={shareThumb}
        />

        <div className="landing">
          <div ref={firstViewRef} className="first-view">
            <header className="hero is-primary is-small">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <div className="title top-title">
                    <Logo alt="VOICEVOX" />
                  </div>
                  <h2 className="subtitle has-text-weight-semibold">
                    無料で使える中品質なテキスト読み上げ・歌声合成ソフトウェア
                  </h2>
                </div>
              </div>
            </header>
            <section className="section not-header is-flex is-justify-content-center">
              <div className="container is-max-desktop columns is-desktop is-vcentered">
                <div className="column has-text-centered">
                  <video controls poster={landingMovieThumb}>
                    <source src={landingMovie} type="video/mp4" />
                  </video>
                </div>
                <SoftwareFeature className="column is-narrow" />
              </div>
            </section>
          </div>

          <main>
            <section className="section">
              <div className="container is-max-desktop is-flex is-flex-direction-column">
                <h2
                  id="characters"
                  className="jump-anchor-header-padding title"
                >
                  <Link to={`#characters`} className="has-text-black">
                    キャラクター一覧
                  </Link>
                </h2>
                <div className="columns is-multiline is-centered">
                  {characterKeys.map(characterKey => (
                    <CharacterCard
                      key={characterKey}
                      characterInfo={characterInfos[characterKey]}
                      characterKey={characterKey}
                      setShowingLibraryReadmeModalCharacterKey={
                        setShowingLibraryReadmeModalCharacterKey
                      }
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="section">
              <div className="container is-max-desktop is-flex is-flex-direction-column">
                <h2 id="nemo" className="jump-anchor-header-padding title">
                  <Link to={`#nemo`} className="has-text-black">
                    VOICEVOX Nemo
                  </Link>
                </h2>
                <p className="is-size-5">
                  VOICEVOX Nemo はキャラクターのいない音声ライブラリです。
                </p>
                <p className="is-size-5">
                  詳しくは&nbsp;
                  <Link
                    to={"/nemo/"}
                    className="has-text-weight-bold is-underlined"
                  >
                    VOICEVOX Nemo
                  </Link>
                  &nbsp;をご参照ください。
                </p>
              </div>
            </section>

            <section className="section">
              <div className="container is-max-desktop is-flex is-flex-direction-column">
                <h2 id="oss" className="jump-anchor-header-padding title">
                  <Link to={`#oss`} className="has-text-black">
                    オープンソース
                  </Link>
                </h2>
                <p className="is-size-5">
                  VOICEVOX は OSS（オープンソース・ソフトウェア）版 VOICEVOX
                  をもとに構築されています。
                </p>
                <p className="is-size-5">
                  製品版と OSS 版の違いやモジュール構成は&nbsp;
                  <a
                    href="https://github.com/VOICEVOX/voicevox/blob/main/docs/%E5%85%A8%E4%BD%93%E6%A7%8B%E6%88%90.md"
                    target="_blank"
                    rel="noreferrer"
                    className="has-text-weight-bold is-underlined"
                  >
                    VOICEVOX の全体構成
                  </a>
                  &nbsp;をご参照ください。
                </p>
                <p className="is-size-5">
                  ソフトウェア部分は Electron + Vue 、音声合成エンジン部分は
                  Python + FastAPI です。
                </p>
                <p className="is-size-5">
                  追加したい・改善したい機能があれば、ぜひ開発にご参加ください。
                </p>
                <div className="buttons mt-3">
                  <a
                    className="button is-outlined"
                    href="https://github.com/VOICEVOX/voicevox"
                    target="_blank"
                    rel="noreferrer"
                    type="button"
                    role={"button"}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faGithub} />
                    </span>
                    <span>VOICEVOX エディター</span>
                  </a>
                  <a
                    className="button is-outlined"
                    href="https://github.com/VOICEVOX/voicevox_engine"
                    target="_blank"
                    rel="noreferrer"
                    type="button"
                    role={"button"}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faGithub} />
                    </span>
                    <span>VOICEVOX エンジン</span>
                  </a>
                </div>
              </div>
            </section>

            <section className="section">
              <div className="container is-max-desktop is-flex is-flex-direction-column">
                <h2
                  id="core_library"
                  className="jump-anchor-header-padding title"
                >
                  <Link to={`#core_library`} className="has-text-black">
                    コアライブラリ
                  </Link>
                </h2>
                <p className="is-size-5">
                  VOICEVOXの音声合成をアプリケーションやサービスに組み込める、VOICEVOXのコアライブラリを配布しています。
                </p>
                <p className="is-size-5">
                  詳しくは&nbsp;
                  <a
                    href="https://github.com/VOICEVOX/voicevox_core"
                    className="has-text-weight-bold is-underlined"
                    target="_blank"
                    rel="noreferrer"
                  >
                    VOICEVOX CORE
                  </a>
                  &nbsp;をご参照ください。
                </p>
              </div>
            </section>

            <section className="section">
              <div className="container is-max-desktop is-flex is-flex-direction-column">
                <h2 id="link" className="jump-anchor-header-padding title">
                  <Link to={`#link`} className="has-text-black">
                    リンク
                  </Link>
                </h2>
                <ul className="is-size-5">
                  <li>
                    <Link
                      to={"/term/"}
                      className="has-text-weight-bold is-underlined"
                    >
                      利用規約
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/how_to_use/"}
                      className="has-text-weight-bold is-underlined"
                    >
                      使い方
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/qa/"}
                      className="has-text-weight-bold is-underlined"
                    >
                      Q&amp;A
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/dormitory/"}
                      className="has-text-weight-bold is-underlined"
                    >
                      ボイボ寮
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/update_history/"}
                      className="has-text-weight-bold is-underlined"
                    >
                      変更履歴
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/news/"}
                      className="has-text-weight-bold is-underlined"
                    >
                      ニュース
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://hiho.fanbox.cc/"
                      target={"_blank"}
                      rel={"noreferrer"}
                      className="has-text-weight-bold is-underlined"
                    >
                      pixivFANBOX
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </main>
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
      </>
    )
  }
)

export default React.memo(() => {
  const [showingHeader, setShowingHeader] = useState(false)
  return (
    <Page showingHeader={showingHeader} showingHeaderOnTop={false}>
      <Main setShowingHeader={setShowingHeader} />
    </Page>
  )
})
