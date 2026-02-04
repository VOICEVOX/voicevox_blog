/**
 * Nemoのダウンロードモーダル
 */
import Selector from "./Selector";
import { NEMO_VERSION } from "@/constants";
import { withBaseUrl } from "@/helper";
import { $nemoDownloadModal } from "@/store";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

type OsType = "Windows" | "Mac" | "Linux";
type ModeType =
  | "GPU / CPU"
  | "CPU"
  | "CPU (Intel)"
  | "CPU (Apple)"
  | "CPU (x64)"
  | "CPU (arm64)";

const modeAvailables: Record<OsType, ModeType[]> = {
  Windows: ["GPU / CPU", "CPU"],
  Mac: ["CPU (Intel)", "CPU (Apple)"],
  Linux: ["GPU / CPU", "CPU (x64)", "CPU (arm64)"],
};

export default function DownloadNemoModal() {
  const isActive = useStore($nemoDownloadModal);
  const hide = () => $nemoDownloadModal.set(false);

  const downloadUrls: Record<
    OsType,
    Partial<Record<ModeType, { url: string; name: string }>>
  > = {
    Windows: {
      "GPU / CPU": {
        url: `https://github.com/VOICEVOX/voicevox_nemo_engine/releases/download/${NEMO_VERSION}/voicevox_engine-windows-directml-${NEMO_VERSION}.vvpp`,
        name: `VOICEVOX.Nemo.${NEMO_VERSION}.Windows.vvpp`,
      },
      CPU: {
        url: `https://github.com/VOICEVOX/voicevox_nemo_engine/releases/download/${NEMO_VERSION}/voicevox_engine-windows-cpu-${NEMO_VERSION}.vvpp`,
        name: `VOICEVOX-CPU.Nemo.${NEMO_VERSION}.Windows.vvpp`,
      },
    },
    Mac: {
      "CPU (Intel)": {
        url: `https://github.com/VOICEVOX/voicevox_nemo_engine/releases/download/${NEMO_VERSION}/voicevox_engine-macos-x64-${NEMO_VERSION}.vvpp`,
        name: `VOICEVOX-CPU-x64.Nemo.${NEMO_VERSION}.Mac.vvpp`,
      },
      "CPU (Apple)": {
        url: `https://github.com/VOICEVOX/voicevox_nemo_engine/releases/download/${NEMO_VERSION}/voicevox_engine-macos-arm64-${NEMO_VERSION}.vvpp`,
        name: `VOICEVOX-CPU-arm64.Nemo.${NEMO_VERSION}.Mac.vvpp`,
      },
    },
    Linux: {
      "GPU / CPU": {
        url: `https://github.com/VOICEVOX/voicevox_nemo_engine/releases/download/${NEMO_VERSION}/voicevox_engine-linux-nvidia-${NEMO_VERSION}.vvpp`,
        name: `VOICEVOX.Nemo.${NEMO_VERSION}.Linux.vvpp`,
      },
      "CPU (x64)": {
        url: `https://github.com/VOICEVOX/voicevox_nemo_engine/releases/download/${NEMO_VERSION}/voicevox_engine-linux-cpu-x64-${NEMO_VERSION}.vvpp`,
        name: `VOICEVOX-CPU.Nemo.${NEMO_VERSION}.Linux.vvpp`,
      },
      "CPU (arm64)": {
        url: `https://github.com/VOICEVOX/voicevox_nemo_engine/releases/download/${NEMO_VERSION}/voicevox_engine-linux-cpu-arm64-${NEMO_VERSION}.vvpp`,
        name: `VOICEVOX-CPU-arm64.Nemo.${NEMO_VERSION}.Linux.vvpp`,
      },
    },
  };

  const [selectedOs, setSelectedOs] = useState<OsType>("Windows");
  const [selectedMode, setSelectedMode] = useState<ModeType>("GPU / CPU");

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Windows")) {
      selectOs("Windows");
    } else if (userAgent.includes("Mac")) {
      selectOs("Mac");
    } else if (userAgent.includes("Linux")) {
      selectOs("Linux");
    }
  }, []);

  const selectOs = (os: OsType) => {
    setSelectedOs(os);
    // 変更先のOSで選択できないモードの場合、最初のモードを選択する
    if (!modeAvailables[os].includes(selectedMode)) {
      setSelectedMode(modeAvailables[os][0]);
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" data-theme="light">
      <div
        className="fixed inset-0 bg-black/80"
        onClick={hide}
        role="presentation"
      />
      <div className="pointer-events-none fixed inset-0 box-border flex items-center justify-center p-4">
        <div className="pointer-events-auto flex max-h-full w-full max-w-[670px] flex-col overflow-hidden rounded-md bg-white shadow-2xl">
          <header className="relative flex items-center justify-center border-b border-gray-300 px-6 py-4">
            <p className="text-xl font-bold text-neutral-900">
              Nemo エンジン ダウンロード
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

          <section className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-6">
            <Selector
              label="OS"
              selected={selectedOs}
              setSelected={selectOs}
              candidates={["Windows", "Mac", "Linux"]}
            />

            <hr className="border-t border-gray-300" />

            <div className="space-y-2">
              <Selector
                label="対応モード"
                selected={selectedMode}
                setSelected={setSelectedMode}
                candidates={modeAvailables[selectedOs]}
              />
              <p className="text-center text-sm text-neutral-600">
                ※ GPUモードの方が快適ですが、利用するためには
                <a
                  href={withBaseUrl("/qa/")}
                  className="text-[rgb(48,100,57)] underline hover:text-[rgb(38,80,47)]"
                >
                  対応するGPU
                </a>
                が必要です
              </p>
            </div>

            <hr className="border-t border-gray-300" />

            <p className="text-center text-neutral-700">
              VOICEVOX 内の「マルチエンジン機能」を ON にしたあと、
              <br />
              ダウンロードした .vvpp ファイルをダブルクリックするか
              <br />
              「エンジン」→「エンジンの管理」で Nemo 音声を追加できます。
            </p>
          </section>

          <footer className="flex items-center justify-end gap-3 border-t border-gray-300 px-6 py-4">
            <a
              href={downloadUrls[selectedOs][selectedMode]?.url}
              download={downloadUrls[selectedOs][selectedMode]?.name}
              target="_blank"
              rel="noreferrer"
              className="bg-primary inline-flex items-center justify-center rounded border border-transparent px-4 py-2 text-base font-semibold text-black hover:brightness-90"
            >
              ダウンロード
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
