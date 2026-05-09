/**
 * Nemoのダウンロードモーダル
 */
import ModalShell from "../ModalShell";
import Selector from "./Selector";
import Button from "@/components/ui/Button/Button";
import { NEMO_VERSION } from "@/constants";
import { ensureNotNullish, withBaseUrl } from "@/helper";
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

export default function DownloadNemoModal() {
  const isActive = useStore($nemoDownloadModal);
  const hide = () => $nemoDownloadModal.set(false);

  const [selectedOs, setSelectedOs] = useState<OsType>("Windows");
  const [selectedMode, setSelectedMode] = useState<ModeType>("GPU / CPU");
  const downloadInfo = ensureNotNullish(downloadUrls[selectedOs][selectedMode]);

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

  return (
    <ModalShell
      isActive={isActive}
      title="Nemo エンジン ダウンロード"
      onClose={hide}
      footer={
        <Button
          href={downloadInfo.url}
          target="_blank"
          rel="noreferrer"
          download={downloadInfo.name}
          kind="solid"
          tone="primary"
          shape="rounded"
          size="md"
        >
          ダウンロード
        </Button>
      }
    >
      <div className="space-y-md">
        <Selector
          label="OS"
          selected={selectedOs}
          setSelected={selectOs}
          candidates={["Windows", "Mac", "Linux"]}
        />

        <hr className="vv-hr" />

        <div className="space-y-xs">
          <Selector
            label="対応モード"
            selected={selectedMode}
            setSelected={setSelectedMode}
            candidates={modeAvailables[selectedOs]}
          />
          <p className="text-center text-xs text-neutral-800">
            ※ GPUモードの方が快適ですが、利用するためには
            <a href={withBaseUrl("/qa/")} className="vv-link">
              対応するGPU
            </a>
            が必要です
          </p>
        </div>

        <hr className="vv-hr" />

        <p className="text-center text-xs text-neutral-800">
          VOICEVOX 内の「マルチエンジン機能」を ON にしたあと、
          <br />
          ダウンロードした .vvpp ファイルをダブルクリックするか
          <br />
          「エンジン」→「エンジンの管理」で Nemo 音声を追加できます。
        </p>
      </div>
    </ModalShell>
  );
}
