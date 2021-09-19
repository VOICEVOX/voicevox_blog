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
                href="https://github.com/Hiroshiba/voicevox/releases/download/0.5.3/VOICEVOX.Web.Setup.0.5.3.exe"
                target="_blank"
                className="button is-medium is-primary is-rounded ml-2 mr-2"
              >
                <span className="has-text-weight-semibold">
                  インストーラー版
                </span>
              </a>
              <a
                href="https://drive.google.com/file/d/1wjSzhYfQEJuCvOAaURfXFV4JcDutLnI2/view?usp=sharing"
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
                href="https://docs.google.com/document/d/1WvhABjWP-z9mZjDjkTMAw81x-U2DNFrT1GPsOPLYQcA/edit?usp=sharing"
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
