import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React, { useContext, useEffect, useRef, useState } from "react"
import hau001 from "../audios/hau-001.flac"
import hau002 from "../audios/hau-002.flac"
import hau003 from "../audios/hau-003.flac"
import metanAma001 from "../audios/metan-ama-001.flac"
import metanAma002 from "../audios/metan-ama-002.flac"
import metanAma003 from "../audios/metan-ama-003.flac"
import metanNormal001 from "../audios/metan-normal-001.flac"
import metanNormal002 from "../audios/metan-normal-002.flac"
import metanNormal003 from "../audios/metan-normal-003.flac"
import metanSexy001 from "../audios/metan-sexy-001.flac"
import metanSexy002 from "../audios/metan-sexy-002.flac"
import metanSexy003 from "../audios/metan-sexy-003.flac"
import metanTsun001 from "../audios/metan-tsun-001.flac"
import metanTsun002 from "../audios/metan-tsun-002.flac"
import metanTsun003 from "../audios/metan-tsun-003.flac"
import ritsu001 from "../audios/ritsu-001.flac"
import ritsu002 from "../audios/ritsu-002.flac"
import ritsu003 from "../audios/ritsu-003.flac"
import tsumugi001 from "../audios/tsumugi-001.flac"
import tsumugi002 from "../audios/tsumugi-002.flac"
import tsumugi003 from "../audios/tsumugi-003.flac"
import zundamonAma001 from "../audios/zundamon-ama-001.flac"
import zundamonAma002 from "../audios/zundamon-ama-002.flac"
import zundamonAma003 from "../audios/zundamon-ama-003.flac"
import zundamonNormal001 from "../audios/zundamon-normal-001.flac"
import zundamonNormal002 from "../audios/zundamon-normal-002.flac"
import zundamonNormal003 from "../audios/zundamon-normal-003.flac"
import zundamonSexy001 from "../audios/zundamon-sexy-001.flac"
import zundamonSexy002 from "../audios/zundamon-sexy-002.flac"
import zundamonSexy003 from "../audios/zundamon-sexy-003.flac"
import zundamonTsun001 from "../audios/zundamon-tsun-001.flac"
import zundamonTsun002 from "../audios/zundamon-tsun-002.flac"
import zundamonTsun003 from "../audios/zundamon-tsun-003.flac"
import AudioSample from "../components/audioSample"
import "../components/layout.scss"
import ModalReadmeLibraryHau from "../components/modalReadmeLibraryHau"
import ModalReadmeLibraryRitsu from "../components/modalReadmeLibraryRitsu"
import ModalReadmeLibraryTohoku from "../components/modalReadmeLibraryTohoku"
import ModalReadmeLibraryTsumugi from "../components/modalReadmeLibraryTsumugi"
import { Page } from "../components/page"
import Seo from "../components/seo"
import { GlobalContext } from "../contexts/context"
import landingMovieThumb from "../images/landing-movie-thumb.png"
import shareThumb from "../images/landing-share-thumb.jpg"
import landingMovie from "../movies/landing.mp4"

type Character = "東北" | "春日部つむぎ" | "雨晴はう" | "波音リツ"

const Main: React.FC<{ setShowingHeader: (boolean) => void }> = ({
  setShowingHeader,
}) => {
  const context = useContext(GlobalContext)

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
    showingLibraryReadmeModalCharater,
    setShowingLibraryReadmeModalCharater,
  ] = useState<Character | undefined>(undefined)

  const showLibraryReadmeModal = (character: Character) => {
    document.documentElement.classList.add("is-clipped")
    setShowingLibraryReadmeModalCharater(character)
  }

  const hideLibraryReadmeModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowingLibraryReadmeModalCharater(undefined)
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
                <h1 className="title top-title">VOICEVOX</h1>
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
                <p className="is-size-7">
                  ※2 現在は Windows / Linux に対応しています
                </p>
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
                <p className="is-align-self-center is-size-6">Version 0.9.4</p>
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
              <div className="tile is-ancestor is-justify-content-center">
                <div className="tile is-parent is-6">
                  <div className="tile is-child card">
                    <StaticImage
                      className="card-image"
                      src="../images/bustup-metan.png"
                      alt="四国めたん"
                      width={640}
                    />
                    <div className="card-content has-text-centered">
                      <h3 className="title is-4">四国めたん</h3>
                      <p className="subtitle is-5">
                        はっきりした芯のある声が特徴的
                      </p>
                      <AudioSample
                        audioSamples={[
                          {
                            style: "ノーマル",
                            urls: [
                              metanNormal001,
                              metanNormal002,
                              metanNormal003,
                            ],
                          },
                          {
                            style: "あまあま",
                            urls: [metanAma001, metanAma002, metanAma003],
                          },
                          {
                            style: "ツンツン",
                            urls: [metanTsun001, metanTsun002, metanTsun003],
                          },
                          {
                            style: "セクシー",
                            urls: [metanSexy001, metanSexy002, metanSexy003],
                          },
                        ]}
                      />
                      <div className="pt-3">
                        <button
                          onClick={() => showLibraryReadmeModal("東北")}
                          className="button is-normal is-rounded"
                          type="button"
                        >
                          <span>四国めたん 利用規約</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tile is-parent is-6">
                  <div className="tile is-child card">
                    <StaticImage
                      className="card-image"
                      src="../images/bustup-zundamon.png"
                      alt="ずんだもん"
                      width={640}
                    />
                    <div className="card-content has-text-centered">
                      <h3 className="title is-4">ずんだもん</h3>
                      <p className="subtitle is-5">
                        子供っぽい高めの声が特徴的
                      </p>
                      <AudioSample
                        audioSamples={[
                          {
                            style: "ノーマル",
                            urls: [
                              zundamonNormal001,
                              zundamonNormal002,
                              zundamonNormal003,
                            ],
                          },
                          {
                            style: "あまあま",
                            urls: [
                              zundamonAma001,
                              zundamonAma002,
                              zundamonAma003,
                            ],
                          },
                          {
                            style: "ツンツン",
                            urls: [
                              zundamonTsun001,
                              zundamonTsun002,
                              zundamonTsun003,
                            ],
                          },
                          {
                            style: "セクシー",
                            urls: [
                              zundamonSexy001,
                              zundamonSexy002,
                              zundamonSexy003,
                            ],
                          },
                        ]}
                      />
                      <div className="pt-3">
                        <button
                          onClick={() => showLibraryReadmeModal("東北")}
                          className="button is-normal is-rounded"
                          type="button"
                        >
                          <span>ずんだもん 利用規約</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tile is-ancestor is-justify-content-center">
                <div className="tile is-parent is-6">
                  <div className="tile is-child card">
                    <StaticImage
                      className="card-image"
                      src="../images/bustup-tsumugi.png"
                      alt="春日部つむぎ"
                      width={640}
                    />
                    <div className="card-content has-text-centered">
                      <h3 className="title is-4">春日部つむぎ</h3>
                      <p className="subtitle is-5">元気な明るい声が特徴的</p>
                      <AudioSample
                        audioSamples={[
                          {
                            style: "ノーマル",
                            urls: [tsumugi001, tsumugi002, tsumugi003],
                          },
                        ]}
                      />
                      <div className="pt-3">
                        <button
                          onClick={() => showLibraryReadmeModal("春日部つむぎ")}
                          className="button is-normal is-rounded"
                          type="button"
                        >
                          <span>春日部つむぎ 利用規約</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tile is-parent is-6">
                  <div className="tile is-child card">
                    <StaticImage
                      className="card-image"
                      src="../images/bustup-hau.png"
                      alt="雨晴はう"
                      width={640}
                    />
                    <div className="card-content has-text-centered">
                      <h3 className="title is-4">雨晴はう</h3>
                      <p className="subtitle is-5">優しく可愛い声が特徴的</p>
                      <AudioSample
                        audioSamples={[
                          {
                            style: "ノーマル",
                            urls: [hau001, hau002, hau003],
                          },
                        ]}
                      />
                      <div className="pt-3">
                        <button
                          onClick={() => showLibraryReadmeModal("雨晴はう")}
                          className="button is-normal is-rounded"
                          type="button"
                        >
                          <span>雨晴はう 利用規約</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tile is-ancestor is-justify-content-center">
                <div className="tile is-parent is-6">
                  <div className="tile is-child card">
                    <StaticImage
                      className="card-image"
                      src="../images/bustup-ritsu.png"
                      alt="波音リツ"
                      width={640}
                    />
                    <div className="card-content has-text-centered">
                      <h3 className="title is-4">波音リツ</h3>
                      <p className="subtitle is-5">低めのクールな声が特徴的</p>
                      <AudioSample
                        audioSamples={[
                          {
                            style: "ノーマル",
                            urls: [ritsu001, ritsu002, ritsu003],
                          },
                        ]}
                      />
                      <div className="pt-3">
                        <button
                          onClick={() => showLibraryReadmeModal("波音リツ")}
                          className="button is-normal is-rounded"
                          type="button"
                        >
                          <span>波音リツ 利用規約</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
              <div className="is-flex mt-3">
                <a
                  className="button is-outlined mr-1"
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
                  className="button is-outlined ml-1"
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
      <ModalReadmeLibraryTohoku
        isActive={showingLibraryReadmeModalCharater == "東北"}
        hide={hideLibraryReadmeModal}
      />
      <ModalReadmeLibraryTsumugi
        isActive={showingLibraryReadmeModalCharater == "春日部つむぎ"}
        hide={hideLibraryReadmeModal}
      />
      <ModalReadmeLibraryHau
        isActive={showingLibraryReadmeModalCharater == "雨晴はう"}
        hide={hideLibraryReadmeModal}
      />
      <ModalReadmeLibraryRitsu
        isActive={showingLibraryReadmeModalCharater == "波音リツ"}
        hide={hideLibraryReadmeModal}
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
