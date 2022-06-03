import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import DownloadModalSelecter from "./downloadModalSelecter"

type OsType = "Windows" | "Mac" | "Linux"
type ModeType = "GPU / CPU" | "CPU"
type PackageType = "インストーラー" | "Zip" | "tar.gz"

const modeAvailables: Record<OsType, ModeType[]> = {
  Windows: ["GPU / CPU", "CPU"],
  Mac: ["CPU"],
  Linux: ["GPU / CPU", "CPU"],
}

const packageAvailables: Record<OsType, PackageType[]> = {
  Windows: ["インストーラー", "Zip"],
  Mac: ["インストーラー", "Zip"],
  Linux: ["インストーラー", "tar.gz"],
}

export const DownloadModal: React.FC<{
  isActive: boolean
  hide: () => void
  showReadme: () => void
  showHowToUse: () => void
}> = props => {
  const maintenanceMode = false

  const scriptNodes: { name: string; publicURL: string }[] =
    useStaticQuery(graphql`
      query {
        allFile(filter: { dir: { regex: "/scripts$/" } }) {
          nodes {
            name
            publicURL
          }
        }
      }
    `).allFile.nodes

  const downloadUrls: Record<
    OsType,
    Partial<
      Record<
        ModeType,
        Partial<Record<PackageType, { url: string; name: string }>>
      >
    >
  > = {
    Windows: {
      "GPU / CPU": {
        インストーラー: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.2/VOICEVOX.Web.Setup.0.12.2.exe",
          name: "VOICEVOX.Setup.0.12.2.Windows.exe",
        },
        Zip: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.2/voicevox-windows-nvidia-0.12.2.zip",
          name: "VOICEVOX.0.12.2.Windows.zip",
        },
      },
      CPU: {
        インストーラー: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.2/VOICEVOX-CPU.Web.Setup.0.12.2.exe",
          name: "VOICEVOX-CPU.Setup.0.12.2.Windows.exe",
        },
        Zip: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.2/voicevox-windows-cpu-0.12.2.zip",
          name: "VOICEVOX-CPU.0.12.2.Windows.zip",
        },
      },
    },
    Mac: {
      CPU: {
        インストーラー: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.2/VOICEVOX.0.12.2.dmg",
          name: "VOICEVOX.0.12.2.Mac.dmg",
        },
        Zip: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.2/voicevox-macos-cpu-0.12.2.zip",
          name: "VOICEVOX-CPU.0.12.2.Mac.zip",
        },
      },
    },
    Linux: {
      "GPU / CPU": {
        インストーラー: {
          url: scriptNodes.find(value => value.name == "linuxInstallNvidia")!
            .publicURL,
          name: "VOICEVOX.Installer.0.12.2.Linux.sh",
        },
        "tar.gz": {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.2/voicevox-linux-nvidia-0.12.2.tar.gz",
          name: "VOICEVOX.0.12.2.Linux.tar.gz",
        },
      },
      CPU: {
        インストーラー: {
          url: scriptNodes.find(value => value.name == "linuxInstallCpu")!
            .publicURL,
          name: "VOICEVOX-CPU.Installer.0.12.2.Linux.sh",
        },
        "tar.gz": {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.2/voicevox-linux-cpu-0.12.2.tar.gz",
          name: "VOICEVOX-CPU.0.12.2.Linux.tar.gz",
        },
      },
    },
  }

  const [selectedOs, setSelectedOs] = useState<OsType>("Windows")
  const [selectedMode, setSelectedMode] = useState<ModeType>("GPU / CPU")
  const [selectedPackage, setSelectedPackage] =
    useState<PackageType>("インストーラー")

  // 存在しない組み合わせのときに選択中のものを変更する
  useEffect(() => {
    if (!modeAvailables[selectedOs].find(value => value == selectedMode)) {
      setSelectedMode(modeAvailables[selectedOs][0])
    }
    if (
      !packageAvailables[selectedOs].find(value => value == selectedPackage)
    ) {
      setSelectedPackage(packageAvailables[selectedOs][0])
    }
  }, [selectedOs, selectedMode, selectedPackage])

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
        {!maintenanceMode ? (
          <>
            <header className="modal-card-head has-text-centered">
              <p className="modal-card-title">ダウンロード選択</p>
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
                ※
                GPUモードの方が快適ですが、利用するためにはNvidia製GPUが必要です
              </p>

              <hr className="my-3" />

              <DownloadModalSelecter
                label="パッケージ"
                selected={selectedPackage}
                setSelected={setSelectedPackage}
                candidates={packageAvailables[selectedOs]}
              />
              <p className="has-text-centered is-size-7">
                ※ 推奨パッケージはインストーラー版です
              </p>
              <p className="has-text-centered is-size-7">
                ※
                Zip版がダウンロードできない場合はインストーラー版をご利用ください
              </p>
            </section>

            <footer className="modal-card-foot is-justify-content-flex-end">
              <a
                href={
                  downloadUrls[selectedOs][selectedMode]?.[selectedPackage]?.url
                }
                download={
                  downloadUrls[selectedOs][selectedMode]?.[selectedPackage]
                    ?.name
                }
                target="_blank"
                rel="noreferrer"
                className="button is-primary"
                type="button"
                role={"button"}
              >
                <span className="has-text-weight-semibold">ダウンロード</span>
              </a>
            </footer>
          </>
        ) : (
          <>
            <header className="modal-card-head has-text-centered">
              <p className="modal-card-title">メンテナンス中です</p>
              <button
                className="delete"
                aria-label="close"
                onClick={props.hide}
                type="button"
              ></button>
            </header>

            <section className="modal-card-body">
              <p className="has-text-centered is-size-5">
                アップデートのためのメンテナンス中です。
                <br />
                しばらくお待ち下さい。
              </p>
            </section>

            <footer className="modal-card-foot is-justify-content-flex-end">
              <button
                onClick={props.showReadme}
                className="button"
                type="button"
              >
                <span>利用規約</span>
              </button>
              <button
                onClick={props.showHowToUse}
                className="button"
                type="button"
              >
                <span>使い方</span>
              </button>
              <button onClick={props.hide} className="button" type="button">
                <span>閉じる</span>
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  )
}
