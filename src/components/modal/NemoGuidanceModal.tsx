/**
 * Nemoの案内モーダル
 */

import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "@nanostores/react";

import {
  $downloadModal,
  $nemoDownloadModal,
  $nemoGuidanceModal,
} from "@/store";
import { sendEvent } from "@helper";

export default () => {
  const isActive = useStore($nemoGuidanceModal);
  const hide = () => $nemoGuidanceModal.set(false);

  return (
    <>
      <div
        className={"modal-nemo-guidance modal" + (isActive ? " is-active" : "")}
        role="dialog"
      >
        <div className="modal-background" onClick={hide} role="presentation" />
        <div className="modal-card">
          <header className="modal-card-head has-text-centered">
            <p className="modal-card-title">VOICEVOX Nemo ご利用案内</p>
            <button
              className="delete"
              aria-label="close"
              onClick={hide}
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
                  $downloadModal.set(true);
                  sendEvent("download", "software");
                }}
                target="_blank"
                rel="noreferrer"
                tabIndex={0}
                role="button"
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
              <a
                className="button is-align-self-center is-primary is-rounded is-medium"
                onClick={() => $nemoDownloadModal.set(true)}
                target="_blank"
                rel="noreferrer"
                tabIndex={0}
                role="button"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faDownload} />
                </span>
                <span className="has-text-weight-semibold">
                  Nemo エンジン ダウンロード
                </span>
              </a>
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
    </>
  );
};
