/**
 * Nemoの案内モーダル
 */
import Button from "@/components/ui/Button/Button";
import IconButton from "@/components/ui/IconButton/IconButton";
import { sendEvent } from "@/helper";
import {
  $downloadModal,
  $nemoDownloadModal,
  $nemoGuidanceModal,
} from "@/store";
import { faDownload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "@nanostores/react";

export default function NemoGuidanceModal() {
  const isActive = useStore($nemoGuidanceModal);
  const hide = () => $nemoGuidanceModal.set(false);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" data-theme="light">
      <div
        className="fixed inset-0 bg-black/80"
        onClick={hide}
        role="presentation"
      />
      <div className="p-md pointer-events-none fixed inset-0 box-border flex items-center justify-center">
        <div className="pointer-events-auto flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
          <header className="px-xl py-lg relative flex items-center justify-center border-b border-gray-200 bg-neutral-50">
            <p className="text-2xl font-bold text-black">
              VOICEVOX Nemo ご利用案内
            </p>
            <IconButton
              size="sm"
              className="absolute top-1/2 right-5 -translate-y-1/2 text-neutral-700"
              aria-label="close"
              onClick={hide}
            >
              <span aria-hidden="true" className="text-xl leading-none">
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </IconButton>
          </header>

          <section className="px-xl py-2xl min-h-0 flex-1 overflow-y-auto">
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

            <hr className="my-md w-full flex-shrink-0 border-t border-gray-300" />

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

            <hr className="my-md w-full flex-shrink-0 border-t border-gray-300" />

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

            <hr className="my-md w-full flex-shrink-0 border-t border-gray-300" />

            <p className="text-center text-xs text-neutral-800">
              ※ VOICEVOX ソフトウェアにはキャラクターの音声も含まれます。
              <br />
              キャラクターの音声と Nemo の音声は利用規約が異なるので
              <br />
              ご利用の際は各音声の利用規約をご確認ください。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
