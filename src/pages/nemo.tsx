import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"

import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import icon from "../images/icon.png"

export default () => {
  return (
    <Page showingHeader={false}>
      <Seo
        title="VOICEVOX Nemo"
        description="プレゼンから動画作成、ナレーションまで様々なTPOに合わせて利用できる、キャラクター無しの無料中品質読み上げソフトウェア"
        // image={shareThumb}
      />
      <div className="nemo">
        <section className="section">
          <div className="container is-max-desktop">
            <h1 className="title">VOICEVOX Nemo</h1>
            <h2 className="title">
              あらゆる場面に対応する無料の中品質読み上げソフトウェア
            </h2>
            <div>
              <img src={icon} style={{ height: "1rem" }} /> Powered by VOICEVOX
            </div>
            <a
              className="button is-align-self-center is-primary is-rounded"
              onClick={() => {}}
              target="_blank"
              rel="noreferrer"
              tabIndex={0}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faDownload} />
              </span>
              <span className="has-text-weight-semibold">ダウンロード</span>
            </a>
            <Link to="/nemo/term/" className="button is-normal is-rounded">
              <span>利用規約</span>
            </Link>
          </div>
          <p>
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
            <br />
            ダミー
          </p>
        </section>
      </div>
    </Page>
  )
}
