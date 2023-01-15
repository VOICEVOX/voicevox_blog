import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { CSSProperties, useContext } from "react"
import { GlobalContext } from "../contexts/context"

export default ({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) => {
  const context = useContext(GlobalContext)

  return (
    <div
      className={`${className} is-flex is-flex-direction-column`}
      style={style}
    >
      <h2 id="feature" className="title">
        特徴
      </h2>
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
      <p className="is-size-7">※2 Windows / Mac / Linux に対応</p>
      <a
        className="button is-align-self-center mt-5 is-primary is-rounded is-large"
        onClick={() => {
          context.downloadModal.show()
          context.sendEvent("download", "software")
        }}
        target="_blank"
        rel="noreferrer"
        tabIndex={0}
      >
        <span className="icon">
          <FontAwesomeIcon icon={faDownload} />
        </span>
        <span className="has-text-weight-semibold">ダウンロード</span>
      </a>
      <p className="is-align-self-center is-size-6">Version 0.13.4</p>
    </div>
  )
}
