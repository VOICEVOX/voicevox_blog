import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"

import AudioSample from "../components/audioSample"
import DownloadModal from "../components/downloadModal"
import ModalReadmeSoftware from "../components/modalReadmeSoftware"
import ModalReadmeLibraryTohoku from "../components/modalReadmeLibraryTohoku"
import ModalReadmeLibraryTsumugi from "../components/modalReadmeLibraryTsumugi"
import ModalReadmeLibraryHau from "../components/modalReadmeLibraryHau"
import ModalReadmeLibraryRitsu from "../components/modalReadmeLibraryRitsu"
import ModalHowToUse from "../components/modalHowToUse"

import Seo from "../components/seo"
import "../components/layout.scss"

import metanNormal001 from "../audios/metan-normal-001.wav"
import metanNormal002 from "../audios/metan-normal-002.wav"
import metanNormal003 from "../audios/metan-normal-003.wav"
import metanAma001 from "../audios/metan-ama-001.wav"
import metanAma002 from "../audios/metan-ama-002.wav"
import metanAma003 from "../audios/metan-ama-003.wav"
import metanSexy001 from "../audios/metan-sexy-001.wav"
import metanSexy002 from "../audios/metan-sexy-002.wav"
import metanSexy003 from "../audios/metan-sexy-003.wav"
import metanTsun001 from "../audios/metan-tsun-001.wav"
import metanTsun002 from "../audios/metan-tsun-002.wav"
import metanTsun003 from "../audios/metan-tsun-003.wav"
import zundamonNormal001 from "../audios/zundamon-normal-001.wav"
import zundamonNormal002 from "../audios/zundamon-normal-002.wav"
import zundamonNormal003 from "../audios/zundamon-normal-003.wav"
import zundamonAma001 from "../audios/zundamon-ama-001.wav"
import zundamonAma002 from "../audios/zundamon-ama-002.wav"
import zundamonAma003 from "../audios/zundamon-ama-003.wav"
import zundamonSexy001 from "../audios/zundamon-sexy-001.wav"
import zundamonSexy002 from "../audios/zundamon-sexy-002.wav"
import zundamonSexy003 from "../audios/zundamon-sexy-003.wav"
import zundamonTsun001 from "../audios/zundamon-tsun-001.wav"
import zundamonTsun002 from "../audios/zundamon-tsun-002.wav"
import zundamonTsun003 from "../audios/zundamon-tsun-003.wav"
import tsumugi001 from "../audios/tsumugi-001.wav"
import tsumugi002 from "../audios/tsumugi-002.wav"
import tsumugi003 from "../audios/tsumugi-003.wav"
import hau001 from "../audios/hau-001.wav"
import hau002 from "../audios/hau-002.wav"
import hau003 from "../audios/hau-003.wav"
import ritsu001 from "../audios/ritsu-001.wav"
import ritsu002 from "../audios/ritsu-002.wav"
import ritsu003 from "../audios/ritsu-003.wav"
import landingMovieThumb from "../images/landing-movie-thumb.png"
import landingMovie from "../movies/landing.mp4"
import shareThumb from "../images/landing-share-thumb.jpg"

type Character = "東北" | "春日部つむぎ" | "雨晴はう" | "波音リツ"

export default () => {
  const [showingDownloadModal, setShowingDownloadModal] = useState(false)
  const [showingSoftwareReadmeModal, setShowingSoftwareReadmeModal] =
    useState(false)
  const [
    showingLibraryReadmeModalCharater,
    setShowingLibraryReadmeModalCharater,
  ] = useState<Character | undefined>(undefined)
  const [showingHowToUseModal, setShowingHowToUseModal] = useState(false)

  const showDownloadModal = () => {
    document.documentElement.classList.add("is-clipped")
    setShowingDownloadModal(true)
  }

  const hideDownloadModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowingDownloadModal(false)
  }

  const showSoftwareReadmeModal = () => {
    document.documentElement.classList.add("is-clipped")
    setShowingSoftwareReadmeModal(true)
  }

  const hideSoftwareReadmeModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowingSoftwareReadmeModal(false)
  }

  const showLibraryReadmeModal = (character: Character) => {
    document.documentElement.classList.add("is-clipped")
    setShowingLibraryReadmeModalCharater(character)
  }

  const hideLibraryReadmeModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowingLibraryReadmeModalCharater(undefined)
  }

  const showSoftwareHowtouseModal = () => {
    document.documentElement.classList.add("is-clipped")
    setShowingHowToUseModal(true)
  }

  const hideHowToUseModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowingHowToUseModal(false)
  }

  const sendEvent = (event, eventCategory) => {
    typeof window !== "undefined" &&
      window.gtag &&
      window.gtag("event", event, { event_category: eventCategory })
  }

  return (
    <>
      <Seo
        title="VOICEVOX | 無料で使える中品質なテキスト読み上げソフトウェア"
        description="無料で使える中品質なテキスト読み上げソフトウェア"
        image={shareThumb}
      />
      <div className="landing">
        <div className="first-view">
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
                <h2 className="title">特徴</h2>
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
                    showDownloadModal()
                    sendEvent("download", "software")
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faDownload} />
                  </span>
                  <span className="has-text-weight-semibold">ダウンロード</span>
                </a>
                <p className="is-align-self-center is-size-6">Version 0.9.3</p>
              </div>
            </div>
          </section>
        </div>

        <main>
          <section className="section">
            <div className="container is-max-desktop is-flex is-flex-direction-column">
              <h2 className="title">キャラクター一覧</h2>
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
                        <a
                          onClick={() => showLibraryReadmeModal("東北")}
                          className="button is-normal is-rounded"
                        >
                          <span>四国めたん 利用規約</span>
                        </a>
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
                        <a
                          onClick={() => showLibraryReadmeModal("東北")}
                          className="button is-normal is-rounded"
                        >
                          <span>ずんだもん 利用規約</span>
                        </a>
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
                        <a
                          onClick={() => showLibraryReadmeModal("春日部つむぎ")}
                          className="button is-normal is-rounded"
                        >
                          <span>春日部つむぎ 利用規約</span>
                        </a>
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
                      <p className="subtitle is-5">
                        優しく可愛い声が特徴的
                        <br />
                        （2022年1月リリース予定）
                      </p>
                      <AudioSample
                        audioSamples={[
                          {
                            style: "ノーマル",
                            urls: [hau001, hau002, hau003],
                          },
                        ]}
                      />
                      <div className="pt-3">
                        <a
                          onClick={() => showLibraryReadmeModal("雨晴はう")}
                          className="button is-normal is-rounded"
                        >
                          <span>雨晴はう 利用規約</span>
                        </a>
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
                        <a
                          onClick={() => showLibraryReadmeModal("波音リツ")}
                          className="button is-normal is-rounded"
                        >
                          <span>波音リツ 利用規約</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="button is-align-self-center mt-5 is-primary is-rounded is-large"
                onClick={() => {
                  showDownloadModal()
                  sendEvent("download", "software")
                }}
                target="_blank"
                rel="noreferrer"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faDownload} />
                </span>
                <span className="has-text-weight-semibold">ダウンロード</span>
              </a>
              <p className="is-align-self-center is-size-6">Version 0.9.3</p>
            </div>
          </section>

          <section className="section">
            <div className="container is-max-desktop is-flex is-flex-direction-column">
              <h2 className="title">オープンソース</h2>
              <p className="is-size-5">
                VOICEVOX は OSS（オープンソース・ソフトウェア）版 VOICEVOX
                をもとに構築されています。
              </p>
              <p className="is-size-5">
                製品版と OSS 版の違いやモジュール構成は&nbsp;
                <a
                  href="https://github.com/Hiroshiba/voicevox/blob/main/docs/%E5%85%A8%E4%BD%93%E6%A7%8B%E6%88%90.md"
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
                  href="https://github.com/Hiroshiba/voicevox"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faGithub} />
                  </span>
                  <span>VOICEVOX エディター</span>
                </a>
                <a
                  className="button is-outlined ml-1"
                  href="https://github.com/Hiroshiba/voicevox_engine"
                  target="_blank"
                  rel="noreferrer"
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
              <h2 className="title">コアライブラリ</h2>
              <p className="is-size-5">
                VOICEVOXの音声合成をアプリケーションやサービスに組み込める、VOICEVOXのコアライブラリを配布しています。
              </p>
              <p className="is-size-5">
                詳しくは&nbsp;
                <a
                  href="https://github.com/Hiroshiba/voicevox_core"
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
        </main>

        <footer className="footer">
          <div className="container is-flex is-justify-content-center">
            <a
              className="button is-outlined ml-1 mr-1"
              href="https://github.com/Hiroshiba/voicevox"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon">
                <FontAwesomeIcon icon={faGithub} />
              </span>
              <span>GitHub</span>
            </a>
            <a
              className="button is-outlined is-info ml-1 mr-1"
              href="https://twitter.com/hiho_karuta"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon">
                <FontAwesomeIcon icon={faTwitter} />
              </span>
              <span>Twitter</span>
            </a>
          </div>
          <div className="content has-text-centered mt-3">
            <p>© 2021 Hiroshiba Kazuyuki</p>
          </div>
        </footer>
      </div>
      <DownloadModal
        isActive={showingDownloadModal}
        hide={hideDownloadModal}
        showReadme={showSoftwareReadmeModal}
        showHowtouse={showSoftwareHowtouseModal}
      />
      <ModalReadmeSoftware
        isActive={showingSoftwareReadmeModal}
        hide={hideSoftwareReadmeModal}
      />
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
      <ModalHowToUse isActive={showingHowToUseModal} hide={hideHowToUseModal} />
    </>
  )
}
