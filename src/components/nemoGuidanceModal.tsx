// Nemoの案内モーダル

import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext } from "react"
import { GlobalContext } from "../contexts/context"
import { useModalController } from "../hooks/hook"
import { NemoDownloadModal } from "./nemoDownloadModal"

export const NemoGuidanceModal: React.FC<{
  isActive: boolean
  hide: () => void
}> = props => {
  const context = useContext(GlobalContext)

  const {
    showing: showingNemoDownloadModal,
    show: showNemoDownloadModal,
    hide: hideNemoDownloadModal,
  } = useModalController()

  return (
    <>
      <div
        className={
          "modal-nemo-guidance modal" + (props.isActive ? " is-active" : "")
        }
      >
        <div
          className="modal-background"
          onClick={props.hide}
          role="presentation"
        />
        <div className="modal-card">
          <header className="modal-card-head has-text-centered">
            <p className="modal-card-title">VOICEVOX Nemo ご利用案内</p>
            <button
              className="delete"
              aria-label="close"
              onClick={props.hide}
              type="button"
            ></button>
          </header>

          <section className="modal-card-body">
            <div className="step-by-step">
              <h3>- Step 1 -</h3>
              <p>VOICEVOX ソフトウェアをインストール</p>
              <a
                className="button is-align-self-center is-primary is-rounded is-medium"
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
                <span className="has-text-weight-semibold">
                  VOICEVOX ダウンロード
                </span>
              </a>
            </div>

            <hr className="my-3" />

            <div className="step-by-step">
              <h3>- Step 2 -</h3>
              <p>
                {/* インストール完了後、Nemo エンジンを
              <br />
              追加することで音声を利用できるようになります */}
                インストール完了後に Nemo エンジンを追加
              </p>
              <a
                className="button is-align-self-center is-primary is-rounded is-medium"
                onClick={showNemoDownloadModal}
                target="_blank"
                rel="noreferrer"
                tabIndex={0}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faDownload} />
                </span>
                <span className="has-text-weight-semibold">
                  Nemo エンジン ダウンロード
                </span>
              </a>
            </div>

            <hr className="my-3" />

            <p className="policy-note">
              ※ VOICEVOX ソフトウェアにはキャラクターの音声も含まれます。
              <br />
              キャラクターの音声と Nemo の音声は利用規約が異なるので、
              <br />
              ご利用の際は各音声の利用規約をご確認ください。
            </p>
          </section>

          <footer className="modal-card-foot"></footer>
        </div>
      </div>
      <NemoDownloadModal
        isActive={showingNemoDownloadModal}
        hide={hideNemoDownloadModal}
      />
    </>
  )
}
