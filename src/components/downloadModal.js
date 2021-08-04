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
            <p className="modal-card-title">ダウンロード方法</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.hide}
            ></button>
          </header>
          <section className="modal-card-body">
            <p className="title is-5">
              ① ダウンロードページ（窓の杜）にアクセス
            </p>
            <div className="has-text-centered mb-5">
              <a
                href="https://forest.watch.impress.co.jp/docs/news/1341517.html"
                target="_blank"
                className="button is-medium is-primary"
              >
                <span className="has-text-weight-semibold">
                  ダウンロードページへ
                </span>
              </a>
            </div>
            <p className="title is-5">
              ② 記事の下の方にあるダウンロードボタンをクリック
            </p>
            <StaticImage
              src="../images/download-page-image.png"
              alt="ダウンロードボタンの場所"
              objectFit="contain"
              style={{ maxHeight: "12rem" }}
            />
          </section>
          <footer className="modal-card-foot is-justify-content-flex-end"></footer>
        </div>
      </div>
    )
  }
}

export default DownloadModal
