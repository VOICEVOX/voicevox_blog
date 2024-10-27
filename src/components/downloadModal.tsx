import { Link, graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import { APP_VERSION } from "../constants"
import DownloadModalSelecter from "./downloadModalSelecter"

type OsType = "Windows" | "Mac" | "Linux"
type ModeType = "GPU / CPU" | "CPU" | "CPU (Intel)" | "CPU (Apple)"
type PackageType = "インストーラー" | "Zip" | "tar.gz"

const modeAvailables: Record<OsType, ModeType[]> = {
  Windows: ["GPU / CPU", "CPU"],
  Mac: ["CPU (Intel)", "CPU (Apple)"],
  Linux: ["GPU / CPU", "CPU"],
}

const packageAvailables = {
  Windows: {
    "GPU / CPU": ["インストーラー", "Zip"],
    CPU: ["インストーラー", "Zip"],
  },
  Mac: {
    "CPU (Intel)": ["インストーラー", "Zip"],
    "CPU (Apple)": ["インストーラー", "Zip"],
  },
  Linux: { "GPU / CPU": ["インストーラー"], CPU: ["インストーラー", "tar.gz"] },
} as const satisfies Record<OsType, Partial<Record<ModeType, PackageType[]>>>

export const DownloadModal: React.FC<{
  isActive: boolean
  hide: () => void
}> = props => {
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
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX.Web.Setup.${APP_VERSION}.exe`,
          name: `VOICEVOX.Setup.${APP_VERSION}.Windows.exe`,
        },
        Zip: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-windows-directml-${APP_VERSION}.zip`,
          name: `VOICEVOX.${APP_VERSION}.Windows.zip`,
        },
      },
      CPU: {
        インストーラー: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX-CPU.Web.Setup.${APP_VERSION}.exe`,
          name: `VOICEVOX-CPU.Setup.${APP_VERSION}.Windows.exe`,
        },
        Zip: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-windows-cpu-${APP_VERSION}.zip`,
          name: `VOICEVOX-CPU.${APP_VERSION}.Windows.zip`,
        },
      },
    },
    Mac: {
      "CPU (Intel)": {
        インストーラー: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX.${APP_VERSION}-x64.dmg`,
          name: `VOICEVOX-CPU-x64.${APP_VERSION}.Mac.dmg`,
        },
        Zip: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-macos-x64-cpu-${APP_VERSION}.zip`,
          name: `VOICEVOX-CPU-x64.${APP_VERSION}.Mac.zip`,
        },
      },
      "CPU (Apple)": {
        インストーラー: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX.${APP_VERSION}-arm64.dmg`,
          name: `VOICEVOX-CPU-arm64.${APP_VERSION}.Mac.dmg`,
        },
        Zip: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-macos-arm64-cpu-${APP_VERSION}.zip`,
          name: `VOICEVOX-CPU-arm64.${APP_VERSION}.Mac.zip`,
        },
      },
    },
    Linux: {
      "GPU / CPU": {
        インストーラー: {
          url: scriptNodes.find(value => value.name == "linuxInstallNvidia")!
            .publicURL,
          name: `VOICEVOX.Installer.${APP_VERSION}.Linux.sh`,
        },
      },
      CPU: {
        インストーラー: {
          url: scriptNodes.find(value => value.name == "linuxInstallCpu")!
            .publicURL,
          name: `VOICEVOX-CPU.Installer.${APP_VERSION}.Linux.sh`,
        },
        "tar.gz": {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-linux-cpu-${APP_VERSION}.tar.gz`,
          name: `VOICEVOX-CPU.${APP_VERSION}.Linux.tar.gz`,
        },
      },
    },
  }

  const [selectedOs, setSelectedOs] = useState<OsType>("Windows")
  const [selectedMode, setSelectedMode] = useState<ModeType>("GPU / CPU")
  const [selectedPackage, setSelectedPackage] =
    useState<PackageType>("インストーラー")

  const selectedOrDefaultMode = modeAvailables[selectedOs].includes(
    selectedMode
  )
    ? selectedMode
    : modeAvailables[selectedOs][0]

  const selectedOrDefaultPackage = packageAvailables[selectedOs][
    selectedOrDefaultMode
  ]!.includes(selectedPackage)
    ? selectedPackage
    : packageAvailables[selectedOs][selectedOrDefaultMode]![0]

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (userAgent.includes("Windows")) {
      selectOs("Windows")
    } else if (userAgent.includes("Mac")) {
      selectOs("Mac")
    } else if (userAgent.includes("Linux")) {
      selectOs("Linux")
    }
  }, [])

  const selectOs = (os: OsType) => {
    setSelectedOs(os)
    // 変更先のOSで選択できないモードの場合、最初のモードを選択する
    selectMode(
      modeAvailables[os].includes(selectedMode)
        ? selectedMode
        : modeAvailables[os][0],
      os
    )
  }
  const selectMode = (mode: ModeType, os?: OsType) => {
    setSelectedMode(mode)
    if (!packageAvailables[os ?? selectedOs][mode]!.includes(selectedPackage)) {
      setSelectedPackage(packageAvailables[os ?? selectedOs][mode]![0])
    }
  }

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
          <p className="modal-card-title">VOICEVOX ダウンロード</p>
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
            setSelected={selectOs}
            candidates={["Windows", "Mac", "Linux"]}
          />

          <hr className="my-3" />

          <DownloadModalSelecter
            label="対応モード"
            selected={selectedOrDefaultMode}
            setSelected={selectMode}
            candidates={modeAvailables[selectedOs]}
          />
          <p className="has-text-centered is-size-7">
            ※ GPUモードの方が快適ですが、利用するためには
            <Link to="/qa">対応するGPU</Link>
            が必要です
          </p>

          <hr className="my-3" />

          <DownloadModalSelecter
            label="パッケージ"
            selected={selectedOrDefaultPackage}
            setSelected={setSelectedPackage}
            candidates={packageAvailables[selectedOs][selectedOrDefaultMode]!}
          />
          <p className="has-text-centered is-size-7">
            ※ 推奨パッケージはインストーラー版です
          </p>
        </section>

        <footer className="modal-card-foot is-justify-content-flex-end">
          <Link to="/term/" className="button">
            <span>利用規約</span>
          </Link>
          <a
            href={
              downloadUrls[selectedOs][selectedMode]?.[selectedPackage]?.url
            }
            download={
              downloadUrls[selectedOs][selectedMode]?.[selectedPackage]?.name
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
      </div>
    </div>
  )
}
