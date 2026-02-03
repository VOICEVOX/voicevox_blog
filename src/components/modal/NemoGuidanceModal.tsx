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
        className="fixed inset-0 bg-black/50"
        onClick={hide}
        role="presentation"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[670px] rounded-md bg-white shadow-2xl">
          <header className="relative flex items-center justify-center border-b border-gray-300 px-6 py-4">
            <p className="text-xl font-bold text-neutral-900">
              VOICEVOX Nemo ご利用案内
            </p>
            <button
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-2xl leading-none text-neutral-600 hover:bg-neutral-200"
              aria-label="close"
              onClick={hide}
              type="button"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ×
              </span>
            </button>
          </header>

          <section className="px-6 py-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="mb-0 text-xl font-semibold text-neutral-900">
                - Step 1 -
              </h3>
              <p className="text-base text-neutral-700">
                VOICEVOX ソフトウェアをインストール
              </p>
              <button
                className="bg-primary focus:ring-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-base font-semibold text-black hover:brightness-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
              <h3 className="mb-0 text-xl font-semibold text-neutral-900">
                - Step 2 -
              </h3>
              <p className="text-base text-neutral-700">
                VOICEVOX ソフトウェアを起動して
                <br />
                設定→オプション→高度な設定→<b>マルチエンジン機能</b>をON
              </p>
            </div>

            <hr className="my-4 w-full flex-shrink-0 border-t border-gray-300" />

            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="mb-0 text-xl font-semibold text-neutral-900">
                - Step 3 -
              </h3>
              <p className="text-base text-neutral-700">Nemo エンジンを追加</p>
              <button
                className="bg-primary focus:ring-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-base font-semibold text-black hover:brightness-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                onClick={() => $nemoDownloadModal.set(true)}
                type="button"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Nemo エンジン ダウンロード</span>
              </button>
            </div>

            <hr className="my-4 w-full flex-shrink-0 border-t border-gray-300" />

            <p className="text-sm text-neutral-600">
              ※ VOICEVOX ソフトウェアにはキャラクターの音声も含まれます。
              <br />
              キャラクターの音声と Nemo の音声は利用規約が異なるので
              <br />
              ご利用の際は各音声の利用規約をご確認ください。
            </p>
          </section>

          <footer className="border-t border-gray-300 px-6 py-4" />
        </div>
      </div>
    </div>
  );
}
