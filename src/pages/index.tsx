import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useContext, useEffect, useRef, useState } from "react"
import AudioSample from "../components/audioSample"
import "../components/layout.scss"
import ModalReadmeLibrary from "../components/modalReadmeLibrary"
import { Page } from "../components/page"
import Seo from "../components/seo"
import { APP_VERSION } from "../constants"
import { CharacterContext, GlobalContext } from "../contexts/context"
import { useDetailedCharacterInfo } from "../hooks/useDetailedCharacterInfo"
import landingMovieThumb from "../images/landing-movie-thumb.png"
import shareThumb from "../images/landing-share-thumb.jpg"
import Logo from "../images/logo.svg"
import landingMovie from "../movies/landing.mp4"
import { CharacterKey } from "../types/dormitoryCharacter"

const Main: React.FC<{ setShowingHeader: (show: boolean) => void }> = ({
  setShowingHeader,
}) => {
  const { characterInfos } = useDetailedCharacterInfo()

  const context = useContext(GlobalContext)
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

  const showLibraryReadmeModal = (characterKey: CharacterKey) => {
    document.documentElement.classList.add("is-clipped")
    setShowingLibraryReadmeModalCharacterKey(characterKey)
  }

  const hideLibraryReadmeModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowingLibraryReadmeModalCharacterKey(undefined)
  }

  // キャラクター表示
  const CharacterCard = ({ characterKey }: { characterKey: CharacterKey }) => {
    const characterInfo = characterInfos[characterKey]
    if (!characterInfo)
      throw new Error(`characterInfo is undefined. (${characterKey})`)
    return (
      <div className="column is-6-tablet is-4-desktop">
        <div className="card">
          <GatsbyImage
            className="card-image"
            image={characterInfo.bustupImage}
            alt={characterInfo.name}
          />
          <div className="card-content has-text-centered">
            <h3 className="title is-4">{characterInfo.name}</h3>
            <p className="subtitle is-5">{characterInfo.voiceFeature}</p>
            {characterInfo.releaseStatus === "comingSoon" && (
              <p className="py-0" style={{ marginTop: "-1rem", color: "red" }}>
                Coming Soon
              </p>
            )}
            <AudioSample audioSamples={characterInfo.styleVoiceUrls} />
            <div className="pt-3">
              <button
                onClick={() => showLibraryReadmeModal(characterKey)}
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

  return (
    <>
      <Seo
        title="VOICEVOX | 無料で使える中品質なテキスト読み上げソフトウェア"
        description="無料で使える中品質なテキスト読み上げソフトウェア"
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
                  無料で使える中品質なテキスト読み上げソフトウェア
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
              <div className="column is-narrow is-flex is-flex-direction-column">
                <h2 id="feature" className="title">
                  特徴
                </h2>
                <div className="content">
                  <ul className="mt-0">
                    <li>
                      商用・非商用問わず無料{" "}
                      <span style={{ fontSize: "0.7em" }}>(※1)</span>
                    </li>
                    <li>
                      すぐに使えるソフトウェア{" "}
                      <span style={{ fontSize: "0.7em" }}>(※2)</span>
                    </li>
                    <li>イントネーションの詳細な調整が可能</li>
                  </ul>
                </div>
                <p className="is-size-7">
                  ※1 詳しくは各キャラクターの利用規約をご参照ください
                </p>
                <p className="is-size-7">※2 Windows / Mac / Linux に対応</p>
                <a
                  className="button is-align-self-center mt-5 is-primary is-rounded is-large"
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
                <p className="is-align-self-center is-size-6">
                  Version {APP_VERSION}
                </p>
              </div>
            </div>
          </section>
        </div>

        <main>
          <section className="section">
            <div className="container is-max-desktop is-flex is-flex-direction-column">
              <h2 id="characters" className="title">
                キャラクター一覧
              </h2>
              <div className="columns is-multiline is-centered">
                {characterKeys.map((characterKey, index) => (
                  <CharacterCard key={index} characterKey={characterKey} />
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container is-max-desktop is-flex is-flex-direction-column">
              <h2 id="oss" className="title">
                オープンソース
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
              <h2 id="core_library" className="title">
                コアライブラリ
              </h2>
              <p className="is-size-5">
                VOICEVOXの音声合成をアプリケーションやサービスに組み込める、VOICEVOXのコアライブラリを配布しています。
              </p>
              <p className="is-size-5">
                詳しくは&nbsp;
                <a
                  href="https://github.com/VOICEVOX/voicevox_core"
                  className="has-text-primary has-text-weight-bold is-underlined"
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
              <h2 className="title">リンク</h2>
              <ul className="is-size-5">
                <li>
                  <Link
                    to={"/term"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/how_to_use"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    使い方
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/qa"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    Q&amp;A
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dormitory"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    ボイボ寮
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/update_history"}
                    className="has-text-primary has-text-weight-bold is-underlined"
                  >
                    変更履歴
                  </Link>
                </li>
                <li>
                  <a
                    href="https://hiho.fanbox.cc/"
                    target={"_blank"}
                    rel={"noreferrer"}
                    className="has-text-primary has-text-weight-bold is-underlined"
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
        hide={hideLibraryReadmeModal}
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

export default () => {
  const [showingHeader, setShowingHeader] = useState(false)
  return (
    <Page showingHeader={showingHeader}>
      <Main setShowingHeader={setShowingHeader} />
    </Page>
  )
}
