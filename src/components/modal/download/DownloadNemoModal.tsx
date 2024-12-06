/**
 * Nemoのダウンロードモーダル
 */
import DownloadModalSelecter from "./Selector";
import { NEMO_VERSION } from "@/constants";
import { $nemoDownloadModal } from "@/store";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

type OsType = "Windows" | "Mac" | "Linux";
type ModeType = "GPU / CPU" | "CPU" | "CPU (Intel)" | "CPU (Apple)";

const modeAvailables: Record<OsType, ModeType[]> = {
  Windows: ["GPU / CPU", "CPU"],
  Mac: ["CPU (Intel)", "CPU (Apple)"],
  Linux: ["GPU / CPU", "CPU"],
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
      CPU: {
        url: `https://github.com/VOICEVOX/voicevox_nemo_engine/releases/download/${NEMO_VERSION}/voicevox_engine-linux-cpu-${NEMO_VERSION}.vvpp`,
        name: `VOICEVOX-CPU.Nemo.${NEMO_VERSION}.Linux.vvpp`,
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

  return (
    <div
      className={"modal-download modal" + (isActive ? " is-active" : "")}
      role="dialog"
    >
      <div className="modal-background" onClick={hide} role="presentation" />
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">Nemo エンジン ダウンロード</p>
          <button
            className="delete"
            aria-label="close"
            onClick={hide}
            type="button"
          />
        </header>

        <section className="modal-card-body">
          <DownloadModalSelecter
            label="OS"
            selected={selectedOs}
            setSelected={selectOs}
            candidates={["Windows", "Mac", "Linux"]}
          />

          <hr className="my-3" />

          <DownloadModalSelecter
            label="対応モード"
            selected={selectedMode}
            setSelected={setSelectedMode}
            candidates={modeAvailables[selectedOs]}
          />
          <p className="has-text-centered is-size-7">
            ※ GPUモードの方が快適ですが、利用するためには
            <a href="/qa/">対応するGPU</a>
            が必要です
          </p>

          <hr className="my-3" />

          <p className="has-text-centered">
            VOICEVOX 内の「マルチエンジン機能」を ON にしたあと、
            <br />
            ダウンロードした .vvpp ファイルをダブルクリックするか
            <br />
            「エンジン」→「エンジンの管理」で Nemo 音声を追加できます。
          </p>
        </section>

        <footer className="modal-card-foot is-justify-content-flex-end">
          <div className="buttons">
            <a
              href={downloadUrls[selectedOs][selectedMode]?.url}
              download={downloadUrls[selectedOs][selectedMode]?.name}
              target="_blank"
              rel="noreferrer"
              className="button is-primary"
              role="button"
            >
              <span className="has-text-weight-semibold">ダウンロード</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
