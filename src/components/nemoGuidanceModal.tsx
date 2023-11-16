// Nemoの案内モーダル

import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext } from "react"
import { NEMO_RELEASE_DATE } from "../constants"
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

            <hr />

            <div className="step-by-step">
              <h3>- Step 2 -</h3>
              <p>
                VOICEVOX ソフトウェアを起動して
                <br />
                設定→オプション→高度な設定→<b>マルチエンジン機能</b>をON
              </p>
            </div>

            <hr />

            <div className="step-by-step">
              <h3>- Step 3 -</h3>
              <p>Nemo エンジンを追加</p>
              {NEMO_RELEASE_DATE ? (
                <p className="has-text-weight-semibold has-text-danger">
                  {NEMO_RELEASE_DATE} リリース予定
                </p>
              ) : (
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
              )}
            </div>

            <hr />

            <p className="policy-note">
              ※ VOICEVOX ソフトウェアにはキャラクターの音声も含まれます。
              <br />
              キャラクターの音声と Nemo の音声は利用規約が異なるので
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
