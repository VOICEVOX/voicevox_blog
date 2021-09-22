import React, { Component } from "react"

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
            <div className="has-text-centered pt-2 pb-2">
              <a
                href="https://github.com/Hiroshiba/voicevox/releases/download/0.6.1/VOICEVOX.Web.Setup.0.6.1.exe"
                target="_blank"
                className="button is-medium is-primary is-rounded ml-2 mr-2"
              >
                <span className="has-text-weight-semibold">
                  インストーラー版
                </span>
              </a>
              <a
                href="https://drive.google.com/file/d/1eUJiYFL4uVV8T8bmRTYrby_3j3rWX-s6/view?usp=sharing"
                target="_blank"
                className="button is-medium is-primary is-rounded ml-2 mr-2"
              >
                <span className="has-text-weight-semibold">Zip版</span>
              </a>
            </div>
            <div className="has-text-centered pt-2 pb-2">
              <a
                onClick={this.props.showReadme}
                className="button is-medium is-rounded ml-2 mr-2"
              >
                <span>利用規約</span>
              </a>
              <a
                href="https://docs.google.com/document/d/1y021q5BToBTErkTQXdMac9A7JzFyJXb4fB1e9_AHe9o/edit?usp=sharing"
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
