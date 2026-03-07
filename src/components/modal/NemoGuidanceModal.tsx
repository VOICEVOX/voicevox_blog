/**
 * Nemoの案内モーダル
 */
import ModalShell from "./ModalShell";
import Button from "@/components/ui/Button/Button";
import { sendEvent } from "@/helper";
import {
  $downloadModal,
  $nemoDownloadModal,
  $nemoGuidanceModal,
} from "@/store";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "@nanostores/react";

export default function NemoGuidanceModal() {
  const isActive = useStore($nemoGuidanceModal);
  const hide = () => $nemoGuidanceModal.set(false);

  return (
    <ModalShell
      isActive={isActive}
      title="VOICEVOX Nemo ご利用案内"
      onClose={hide}
    >
      <div className="space-y-4">
        <div className="gap-sm flex flex-col items-center text-center">
          <h3 className="mb-0 text-lg font-semibold text-neutral-700">
            - Step 1 -
          </h3>
          <p className="text-base text-black">
            VOICEVOX ソフトウェアをインストール
          </p>
          <Button
            onClick={() => {
              $downloadModal.set(true);
              sendEvent("download", "software");
            }}
            kind="solid"
            tone="primary"
            shape="pill"
            size="md"
            icon={<FontAwesomeIcon icon={faDownload} />}
          >
            VOICEVOX ダウンロード
          </Button>
        </div>

        <hr className="vv-hr" />

        <div className="gap-sm flex flex-col items-center text-center">
          <h3 className="mb-0 text-lg font-semibold text-neutral-700">
            - Step 2 -
          </h3>
          <p className="text-base text-black">
            VOICEVOX ソフトウェアを起動して
            <br />
            設定→オプション→高度な設定→<b>マルチエンジン機能</b>をON
          </p>
        </div>

        <hr className="vv-hr" />

        <div className="gap-sm flex flex-col items-center text-center">
          <h3 className="mb-0 text-lg font-semibold text-neutral-700">
            - Step 3 -
          </h3>
          <p className="text-base text-black">Nemo エンジンを追加</p>
          <Button
            onClick={() => $nemoDownloadModal.set(true)}
            kind="solid"
            tone="primary"
            shape="pill"
            size="md"
            icon={<FontAwesomeIcon icon={faDownload} />}
          >
            Nemo エンジン ダウンロード
          </Button>
        </div>

        <hr className="vv-hr" />

        <p className="text-center text-xs text-neutral-800">
          ※ VOICEVOX ソフトウェアにはキャラクターの音声も含まれます。
          <br />
          キャラクターの音声と Nemo の音声は利用規約が異なるので
          <br />
          ご利用の際は各音声の利用規約をご確認ください。
        </p>
      </div>
    </ModalShell>
  );
}
