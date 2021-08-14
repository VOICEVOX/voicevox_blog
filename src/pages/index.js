import React, { Component } from "react"
import { StaticImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"

import PlayButton from "../components/playButton"
import DownloadModal from "../components/downloadModal"

import Seo from "../components/seo"
import "../components/layout.scss"

import metan001 from "../audios/metan-001.wav"
import metan002 from "../audios/metan-002.wav"
import metan003 from "../audios/metan-003.wav"
import zundamon001 from "../audios/zundamon-001.wav"
import zundamon002 from "../audios/zundamon-002.wav"
import zundamon003 from "../audios/zundamon-003.wav"
import landingMovieThumb from "../images/landing-movie-thumb.png"
import landingMovie from "../movies/landing.mp4"
import shareThumb from "../images/landing-share-thumb.jpg"

class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.state = { showingDownloadModal: false }

    this.showDownloadModal = this.showDownloadModal.bind(this)
    this.hideDownloadModal = this.hideDownloadModal.bind(this)
  }

  showDownloadModal() {
    document.documentElement.classList.add("is-clipped")
    this.setState({ showingDownloadModal: true })
  }
  hideDownloadModal() {
    document.documentElement.classList.remove("is-clipped")
    this.setState({ showingDownloadModal: false })
  }

  sendEvent = (event, eventCategory) => {
    typeof window !== "undefined" &&
      window.gtag &&
      window.gtag("event", event, { event_category: eventCategory })
  }

  render() {
    return (
      <>
        <Seo
          title="VOICEVOX"
          description="無料で使える中品質なテキスト読み上げソフトウェア"
          image={shareThumb}
        />
        <div className="landing">
          <div className="first-view">
            <header className="hero is-primary is-small">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h1 className="title top-title">VOICEVOX</h1>
                  <p className="subtitle has-text-weight-semibold">
                    無料で使える中品質なテキスト読み上げソフトウェア
                  </p>
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
                        <span style={{ "font-size": "0.7em" }}>(※1)</span>
                      </li>
                      <li>
                        すぐに使えるソフトウェア{" "}
                        <span style={{ "font-size": "0.7em" }}>(※2)</span>
                      </li>
                      <li>イントネーションの詳細な調整が可能</li>
                    </ul>
                  </div>
                  <p className="is-size-7">
                    ※1 詳しくは各音声ライブラリの利用規約をご参照ください
                  </p>
                  <p className="is-size-7">
                    ※2 現在はWindows PCにのみ対応しています
                  </p>
                  <a
                    className="button is-align-self-center mt-5 is-primary is-rounded is-large"
                    href="https://drive.google.com/drive/folders/1_7J9xkwirPUwGtr06QqlqD8k2dvose4N?usp=sharing"
                    onClick={() => this.sendEvent("download", "software")}
                    target="_blank"
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faDownload} />
                    </span>
                    <span className="has-text-weight-semibold">
                      ダウンロード
                    </span>
                  </a>
                </div>
              </div>
            </section>
          </div>
          <main className="section">
            <div className="container is-max-desktop is-flex is-flex-direction-column">
              <h2 className="title">音声ライブラリ一覧</h2>
              <div className="tile is-ancestor is-justify-content-center">
                <div className="tile is-parent is-5">
                  <div className="tile is-child card">
                    <StaticImage
                      className="card-image"
                      src="../images/bustup-metan.png"
                      alt="四国めたん"
                    />
                    <div className="card-content has-text-centered">
                      <h3 className="title is-4">四国めたん</h3>
                      <p className="subtitle is-5">
                        落ち着いた優しい声が特徴的
                      </p>
                      <p className="mb-1">音声サンプル</p>
                      <PlayButton audio={metan001} className="ml-1 mr-1" />
                      <PlayButton audio={metan002} className="ml-1 mr-1" />
                      <PlayButton audio={metan003} className="ml-1 mr-1" />
                    </div>
                  </div>
                </div>
                <div className="tile is-parent is-5">
                  <div className="tile is-child card">
                    <StaticImage
                      className="card-image"
                      src="../images/bustup-zundamon.png"
                      alt="ずんだもん"
                    />
                    <div className="card-content has-text-centered">
                      <h3 className="title is-4">ずんだもん</h3>
                      <p className="subtitle is-5">
                        子供っぽい高めの声が特徴的
                      </p>
                      <p className="mb-1">音声サンプル</p>
                      <PlayButton audio={zundamon001} className="ml-1 mr-1" />
                      <PlayButton audio={zundamon002} className="ml-1 mr-1" />
                      <PlayButton audio={zundamon003} className="ml-1 mr-1" />
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="button is-align-self-center mt-5 mb-5 is-primary is-rounded is-large"
                href="https://drive.google.com/drive/folders/1_7J9xkwirPUwGtr06QqlqD8k2dvose4N?usp=sharing"
                onClick={() => this.sendEvent("download", "software")}
                target="_blank"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faDownload} />
                </span>
                <span className="has-text-weight-semibold">ダウンロード</span>
              </a>
            </div>
          </main>
          <footer className="footer">
            <div className="container is-flex is-justify-content-center">
              <a
                className="button is-outlined ml-1 mr-1"
                href="https://github.com/Hiroshiba/voicevox"
                target="_blank"
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
        {/* <DownloadModal
          isActive={this.state.showingDownloadModal}
          hide={this.hideDownloadModal}
        /> */}
      </>
    )
  }
}

export default IndexPage
