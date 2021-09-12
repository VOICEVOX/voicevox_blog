import React, { Component } from "react"

import { StaticImage } from "gatsby-plugin-image"

class DownloadModal extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    isActive: false,
  }

  render() {
    return (
      <div className={"modal" + (this.props.isActive ? " is-active" : "")}>
        <div className="modal-background" onClick={this.props.hide}></div>
        <div className="modal-card">
          <header className="modal-card-head has-text-centered">
            <p className="modal-card-title">ダウンロード</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.hide}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="has-text-centered mt-3 mb-3">
              <a
                href="https://github.com/Hiroshiba/voicevox/releases/download/0.5.2/VOICEVOX.Web.Setup.0.5.2.exe"
                target="_blank"
                className="button is-medium is-primary is-rounded ml-2 mr-2"
              >
                <span className="has-text-weight-semibold">
                  インストーラー版
                </span>
              </a>
              <a
                href="https://drive.google.com/file/d/1spscDMudOYIWCZmuVlNcXCMzq1BQkr_b/view?usp=sharing"
                target="_blank"
                className="button is-medium is-primary is-rounded ml-2 mr-2"
              >
                <span className="has-text-weight-semibold">Zip版</span>
              </a>
              <a
                href="https://docs.google.com/document/d/1KaELWTqq0kcIztdHoamW7TDkiCzgixKwngFU8_6gTOo/edit?usp=sharing"
                target="_blank"
                className="button is-medium is-rounded ml-2 mr-2"
              >
                <span>使い方</span>
              </a>
            </div>
          </section>
          <footer className="modal-card-foot is-justify-content-flex-end"></footer>
        </div>
      </div>
    )
  }
}

export default DownloadModal
