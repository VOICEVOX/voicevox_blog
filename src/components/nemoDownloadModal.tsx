// Nemoのダウンロードモーダル

import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import { NEMO_VERSION } from "../constants"
import DownloadModalSelecter from "./downloadModalSelecter"

type OsType = "Windows" | "Mac" | "Linux"
type ModeType = "GPU / CPU" | "CPU"

const modeAvailables: Record<OsType, ModeType[]> = {
  Windows: ["GPU / CPU", "CPU"],
  Mac: ["CPU"],
  Linux: ["GPU / CPU", "CPU"],
}

export const NemoDownloadModal: React.FC<{
  isActive: boolean
  hide: () => void
}> = props => {
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
      CPU: {
        url: `https://github.com/VOICEVOX/voicevox_nemo_engine/releases/download/${NEMO_VERSION}/voicevox_engine-macos-x64-${NEMO_VERSION}.vvpp`,
        name: `VOICEVOX-CPU.Nemo.${NEMO_VERSION}.Mac.vvpp`,
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
  }

  const [selectedOs, setSelectedOs] = useState<OsType>("Windows")
  const [selectedMode, setSelectedMode] = useState<ModeType>("GPU / CPU")

  // 存在しない組み合わせのときに選択中のものを変更する
  useEffect(() => {
    if (!modeAvailables[selectedOs].find(value => value == selectedMode)) {
      setSelectedMode(modeAvailables[selectedOs][0])
    }
  }, [selectedOs, selectedMode])

  return (
    <div
      className={"modal-download modal" + (props.isActive ? " is-active" : "")}
    >
      <div
        className="modal-background"
        onClick={props.hide}
        role="presentation"
      />
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">Nemo エンジン ダウンロード</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.hide}
            type="button"
          ></button>
        </header>

        <section className="modal-card-body">
          <DownloadModalSelecter
            label="OS"
            selected={selectedOs}
            setSelected={setSelectedOs}
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
            <Link to="/qa">対応するGPU</Link>
            が必要です
          </p>

          <hr className="my-3" />

          <p className="has-text-centered">
            ダウンロードした .vvpp ファイルをダブルクリックするか、VOICEVOX 内の
            <br />
            「エンジン」→「エンジンの管理」で Nemo 音声を追加できます。
          </p>
        </section>

        <footer className="modal-card-foot is-justify-content-flex-end">
          <a
            href={downloadUrls[selectedOs][selectedMode]?.url}
            download={downloadUrls[selectedOs][selectedMode]?.name}
            target="_blank"
            rel="noreferrer"
            className="button is-primary"
            type="button"
            role={"button"}
          >
            <span className="has-text-weight-semibold">ダウンロード</span>
          </a>
        </footer>
      </div>
    </div>
  )
}
