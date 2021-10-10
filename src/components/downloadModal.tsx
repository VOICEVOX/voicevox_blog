import React from "react"

export default (props: {
  isActive: boolean
  hide: () => void
  showReadme: () => void
}) => {
  return (
    <div className={"modal" + (props.isActive ? " is-active" : "")}>
      <div
        className="modal-background"
        onClick={props.hide}
        role="presentation"
      />
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">ダウンロード</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.hide}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="has-text-centered pt-2 pb-2">
            <a
              href="https://github.com/Hiroshiba/voicevox/releases/download/0.7.1/VOICEVOX.Web.Setup.0.7.1.exe"
              target="_blank"
              rel="noreferrer"
              className="button is-medium is-primary is-rounded ml-2 mr-2"
            >
              <span className="has-text-weight-semibold">インストーラー版</span>
            </a>
            <a
              href="https://drive.google.com/file/d/13bf0hAkpc-8h5TE1mFLDaSnimFEwU8Qc/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="button is-medium is-primary is-rounded ml-2 mr-2"
            >
              <span className="has-text-weight-semibold">Zip版</span>
            </a>
          </div>
          <div className="has-text-centered pt-2 pb-2">
            <button
              onClick={props.showReadme}
              className="button is-medium is-rounded ml-2 mr-2"
            >
              <span>利用規約</span>
            </button>
            <a
              href="https://docs.google.com/document/d/10kS3Jh12BmoRZPnrVhlVoWVv8_LW3VYBuZuVExwPaJI/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
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
