import { graphql, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import DownloadModalSelecter from "./downloadModalSelecter"

type OsType = "Windows" | "Linux"
type ModeType = "GPU / CPU" | "CPU"
type PackageType = "インストーラー" | "Zip"

const modeAvailables: Record<OsType, ModeType[]> = {
  Windows: ["GPU / CPU", "CPU"],
  Linux: ["GPU / CPU", "CPU"],
}

const packageAvailables: Record<OsType, PackageType[]> = {
  Windows: ["インストーラー", "Zip"],
  Linux: ["インストーラー", "Zip"],
}

export const DownloadModal: React.FC<{
  isActive: boolean
  hide: () => void
  showReadme: () => void
  showHowToUse: () => void
}> = props => {
  const maintenanceMode = false
  const windowsZipUrl =
    "https://drive.google.com/file/d/18Jdn2KSXrCKF7S3NHtB_8sYNz8HnMHM8/view?usp=sharing"
  const windowsCpuZipUrl =
    "https://drive.google.com/file/d/1JQBSOI7MidYCprGHEIQFqcDnoLhe0IBl/view?usp=sharing"
  const linuxZipUrl =
    "https://drive.google.com/file/d/1QTR9KvrG15kjaiDV6QziQnORB32mUA-_/view?usp=sharing"
  const linuxCpuZipUrl =
    "https://drive.google.com/file/d/1IS6RH5aZMYRyLh1J4uwBpZTy9yXucUYr/view?usp=sharing"

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
    Record<
      ModeType,
      Record<PackageType, { url: string; name: string } | undefined>
    >
  > = {
    Windows: {
      "GPU / CPU": {
        インストーラー: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.10.4/VOICEVOX.Web.Setup.0.10.4.exe",
          name: "VOICEVOX.Setup.0.10.4.Windows.exe",
        },
        Zip: {
          url: windowsZipUrl,
          name: "VOICEVOX.0.10.4.Windows.zip",
        },
      },
      CPU: {
        インストーラー: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.10.4/VOICEVOX-CPU.Web.Setup.0.10.4.exe",
          name: "VOICEVOX-CPU.Setup.0.10.4.Windows.exe",
        },
        Zip: {
          url: windowsCpuZipUrl,
          name: "VOICEVOX-CPU.0.10.4.Windows.zip",
        },
      },
    },
    Linux: {
      "GPU / CPU": {
        インストーラー: {
          url: scriptNodes.find(value => value.name == "linuxInstallNvidia")!
            .publicURL,
          name: "VOICEVOX.Installer.0.10.4.Linux.sh",
        },
        Zip: {
          url: linuxZipUrl,
          name: "VOICEVOX.0.10.4.Linux.zip",
        },
      },
      CPU: {
        インストーラー: {
          url: scriptNodes.find(value => value.name == "linuxInstallCpu")!
            .publicURL,
          name: "VOICEVOX-CPU.Installer.0.10.4.Linux.sh",
        },
        Zip: {
          url: linuxCpuZipUrl,
          name: "VOICEVOX-CPU.0.10.4.Linux.zip",
        },
      },
    },
  }

  const [selectedOs, setSelectedOs] = useState<OsType>("Windows")
  const [selectedMode, setSelectedMode] = useState<ModeType>("GPU / CPU")
  const [selectedPackage, setSelectedPackage] =
    useState<PackageType>("インストーラー")

  return (
    <div className={"modal" + (props.isActive ? " is-active" : "")}>
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
                candidates={["Windows", "Linux"]}
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
                  downloadUrls[selectedOs][selectedMode][selectedPackage]?.url
                }
                download={
                  downloadUrls[selectedOs][selectedMode][selectedPackage]?.name
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
