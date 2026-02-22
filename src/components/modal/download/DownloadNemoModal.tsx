/**
 * Nemoのダウンロードモーダル
 */
import Selector from "./Selector";
import IconButton from "@/components/ui/IconButton/IconButton";
import { NEMO_VERSION } from "@/constants";
import { withBaseUrl } from "@/helper";
import { $nemoDownloadModal } from "@/store";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <div className="p-md pointer-events-none fixed inset-0 box-border flex items-center justify-center">
        <div className="pointer-events-auto flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
          <header className="px-xl py-lg relative flex items-center justify-center border-b border-gray-200 bg-neutral-50">
            <p className="text-2xl font-bold text-black">
              Nemo エンジン ダウンロード
            </p>
            <IconButton
              size="sm"
              className="absolute top-1/2 right-5 -translate-y-1/2 text-neutral-700 transition-colors hover:text-neutral-900"
              aria-label="close"
              onClick={hide}
            >
              <span aria-hidden="true" className="text-xl leading-none">
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </IconButton>
          </header>

          <section className="px-xl py-2xl min-h-0 flex-1 space-y-4 overflow-y-auto">
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
              <p className="text-center text-xs text-neutral-800">
                ※ GPUモードの方が快適ですが、利用するためには
                <a
                  href={withBaseUrl("/qa/")}
                  className="text-link hover:text-link-hover underline"
                >
                  対応するGPU
                </a>
                が必要です
              </p>
            </div>

            <hr className="border-t border-gray-300" />

            <p className="text-center text-xs text-neutral-800">
              VOICEVOX 内の「マルチエンジン機能」を ON にしたあと、
              <br />
              ダウンロードした .vvpp ファイルをダブルクリックするか
              <br />
              「エンジン」→「エンジンの管理」で Nemo 音声を追加できます。
            </p>
          </section>

          <footer className="gap-sm px-xl py-lg flex items-center justify-end border-t border-gray-200 bg-neutral-50">
            <a
              href={downloadUrls[selectedOs][selectedMode]?.url}
              download={downloadUrls[selectedOs][selectedMode]?.name}
              target="_blank"
              rel="noreferrer"
              className="bg-primary focus:ring-primary/50 px-md py-xs inline-flex items-center justify-center rounded border border-transparent text-base font-semibold text-black hover:brightness-95 focus:ring-2 focus:ring-offset-2"
            >
              ダウンロード
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
