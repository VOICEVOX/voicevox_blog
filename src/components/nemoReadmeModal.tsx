import { Link } from "gatsby"
import React from "react"

export const NemoReadmeModal: React.FC<{
  isActive: boolean
  hide: () => void
}> = props => {
  return (
    <div
      className={"modal-download modal" + (props.isActive ? " is-active" : "")}
    >
      <div
        className="modal-background"
        onClick={props.hide}
        role="presentation"
      />
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">VOICEVOX Nemo 利用規約</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.hide}
            type="button"
          ></button>
        </header>

        <section className="modal-card-body">
          <p>
            Nemo の音声ライブラリを用いて生成した音声は、「VOICEVOX
            Nemo」とクレジットを記載すれば、商用・非商用で利用可能です。
            <br />
            <br />
            利用規約の詳細は以下をご確認ください。
            <br />
            <Link to="/nemo/term/">利用規約</Link>
          </p>
        </section>

        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  )
}
