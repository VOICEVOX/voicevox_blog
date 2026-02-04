/**
 * Nemoの案内モーダル
 */
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

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" data-theme="light">
      <div
        className="fixed inset-0 bg-black/80"
        onClick={hide}
        role="presentation"
      />
      <div className="pointer-events-none fixed inset-0 box-border flex items-center justify-center p-4">
        <div className="pointer-events-auto flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
          <header className="relative flex items-center justify-center border-b border-gray-200 bg-neutral-50 px-6 py-5">
            <p className="text-2xl font-bold text-black">
              VOICEVOX Nemo ご利用案内
            </p>
            <button
              className="absolute top-1/2 right-5 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-neutral-700 transition-colors hover:text-neutral-900"
              aria-label="close"
              onClick={hide}
              type="button"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                ×
              </span>
            </button>
          </header>

          <section className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="mb-0 text-lg font-semibold text-neutral-700">
                - Step 1 -
              </h3>
              <p className="text-base text-black">
                VOICEVOX ソフトウェアをインストール
              </p>
              <button
                className="bg-primary focus:ring-primary/50 inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-base font-semibold text-black hover:brightness-95 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                onClick={() => {
                  $downloadModal.set(true);
                  sendEvent("download", "software");
                }}
                type="button"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>VOICEVOX ダウンロード</span>
              </button>
            </div>

            <hr className="my-4 w-full flex-shrink-0 border-t border-gray-300" />

            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="mb-0 text-lg font-semibold text-neutral-700">
                - Step 2 -
              </h3>
              <p className="text-base text-black">
                VOICEVOX ソフトウェアを起動して
                <br />
                設定→オプション→高度な設定→<b>マルチエンジン機能</b>をON
              </p>
            </div>

            <hr className="my-4 w-full flex-shrink-0 border-t border-gray-300" />

            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="mb-0 text-lg font-semibold text-neutral-700">
                - Step 3 -
              </h3>
              <p className="text-base text-black">Nemo エンジンを追加</p>
              <button
                className="bg-primary focus:ring-primary/50 inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-base font-semibold text-black hover:brightness-95 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                onClick={() => $nemoDownloadModal.set(true)}
                type="button"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Nemo エンジン ダウンロード</span>
              </button>
            </div>

            <hr className="my-4 w-full flex-shrink-0 border-t border-gray-300" />

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
