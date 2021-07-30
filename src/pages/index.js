import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"

import PlayButton from "../components/playButton"

import Seo from "../components/seo"
import "../components/layout.scss"

import metan001 from "../audios/metan-001.wav"
import metan002 from "../audios/metan-002.wav"
import metan003 from "../audios/metan-003.wav"
import zundamon001 from "../audios/zundamon-001.wav"
import zundamon002 from "../audios/zundamon-002.wav"
import zundamon003 from "../audios/zundamon-003.wav"

const IndexPage = () => (
  <>
    <div className="landing">
      <div className="first-view">
        <header className="hero is-primary is-small">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1
                className="title"
                style={{
                  fontSize: `5.5rem`,
                }}
              >
                VOICEVOX
              </h1>
              <p className="subtitle has-text-weight-semibold">
                無料で使える中品質なテキスト読み上げソフトウェア
              </p>
            </div>
          </div>
        </header>
        <section className="section not-header is-flex is-justify-content-center">
          <div className="container is-max-desktop columns is-vcentered">
            <div className="column has-text-centered">
              <StaticImage src="../images/movie.png" alt="movie thumbnail" />
            </div>
            <div className="column is-narrow is-flex is-flex-direction-column">
              <h2 className="title">特徴</h2>
              <div className="content">
                <ul className="mt-0">
                  <li>商用・非商用問わず無料 (※)</li>
                  <li>すぐに使えるソフトウェア</li>
                  <li>イントネーションの詳細な調整が可能</li>
                </ul>
              </div>
              <p className="is-size-7">
                ※詳しくは各音声ライブラリの利用規約をご参照ください
              </p>
              <button className="button is-align-self-center mt-5 is-primary is-rounded is-large">
                <span className="icon">
                  <FontAwesomeIcon icon={faDownload} />
                </span>
                <span className="has-text-weight-semibold">ダウンロード</span>
              </button>
            </div>
          </div>
        </section>
      </div>
      <main className="section">
        <div className="container is-max-desktop is-flex is-flex-direction-column">
          <Seo title="VOICEVOX" />
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
                  <p className="subtitle is-5">落ち着いた優しい声が特徴的</p>
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
                  <p className="subtitle is-5">子供っぽい高めの声が特徴的</p>
                  <p className="mb-1">音声サンプル</p>
                  <PlayButton audio={zundamon001} className="ml-1 mr-1" />
                  <PlayButton audio={zundamon002} className="ml-1 mr-1" />
                  <PlayButton audio={zundamon003} className="ml-1 mr-1" />
                </div>
              </div>
            </div>
          </div>
          <button className="button is-align-self-center mt-5 mb-5 is-primary is-rounded is-large">
            <span className="icon">
              <FontAwesomeIcon icon={faDownload} />
            </span>
            <span className="has-text-weight-semibold">ダウンロード</span>
          </button>
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
  </>
)

export default IndexPage
