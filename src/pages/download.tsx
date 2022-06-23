import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import DownloadModalSelecter from "../components/downloadModalSelecter"
import { Page } from "../components/page"
import Seo from "../components/seo"
import SoftwareFeatures from "../components/softwareFeatures"
import shareThumb from "../images/landing-share-thumb.jpg"

const userAgent = /*navigator.userAgentData ||*/ navigator.userAgent
const isWindows = userAgent.includes("Windows")
const isMac = userAgent.includes("Mac")
const isLinux = userAgent.includes("Linux")
const os = isWindows ? "Windows" : isMac ? "Mac" : isLinux ? "Linux" : "Unknown"

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

const Download = () => {
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
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.3/VOICEVOX.Web.Setup.0.12.3.exe",
          name: "VOICEVOX.Setup.0.12.3.Windows.exe",
        },
        Zip: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.3/voicevox-windows-nvidia-0.12.3.zip",
          name: "VOICEVOX.0.12.3.Windows.zip",
        },
      },
      CPU: {
        インストーラー: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.3/VOICEVOX-CPU.Web.Setup.0.12.3.exe",
          name: "VOICEVOX-CPU.Setup.0.12.3.Windows.exe",
        },
        Zip: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.3/voicevox-windows-cpu-0.12.3.zip",
          name: "VOICEVOX-CPU.0.12.3.Windows.zip",
        },
      },
    },
    Mac: {
      CPU: {
        インストーラー: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.3/VOICEVOX.0.12.3.dmg",
          name: "VOICEVOX.0.12.3.Mac.dmg",
        },
        Zip: {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.3/voicevox-macos-cpu-0.12.3.zip",
          name: "VOICEVOX-CPU.0.12.3.Mac.zip",
        },
      },
    },
    Linux: {
      "GPU / CPU": {
        インストーラー: {
          url: scriptNodes.find(value => value.name == "linuxInstallNvidia")!
            .publicURL,
          name: "VOICEVOX.Installer.0.12.3.Linux.sh",
        },
        "tar.gz": {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.3/voicevox-linux-nvidia-0.12.3.tar.gz",
          name: "VOICEVOX.0.12.3.Linux.tar.gz",
        },
      },
      CPU: {
        インストーラー: {
          url: scriptNodes.find(value => value.name == "linuxInstallCpu")!
            .publicURL,
          name: "VOICEVOX-CPU.Installer.0.12.3.Linux.sh",
        },
        "tar.gz": {
          url: "https://github.com/VOICEVOX/voicevox/releases/download/0.12.3/voicevox-linux-cpu-0.12.3.tar.gz",
          name: "VOICEVOX-CPU.0.12.3.Linux.tar.gz",
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

  useEffect(() => {
    document.addEventListener("Load", () => {
      switch (os) {
        case "Windows":
          setSelectedOs("Windows")
          break
        case "Mac":
          setSelectedOs("Mac")
          break
        case "Linux":
          setSelectedOs("Linux")
          break
        default:
          setSelectedOs("Windows")
          break
      }
    })
  }, [])

  const ref = React.createRef<HTMLDivElement>()

  const scrollToRef = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Page>
      <Seo
        title="ダウンロード | VOICEVOX"
        description="VOICEVOXのダウンロードページ"
        image={shareThumb}
      />
      {!maintenanceMode ? (
        <>
          <section className="has-background-primary section is-flex is-flex-direction-row is-justify-content-center">
            <div className="container is-max-desktop columns is-desktop is-vcentered">
              <div className="section my-6">
                <h1 className="title mb-3">VOICEVOXのダウンロード</h1>
                <p className="my-4">
                  ダウンロードにお困りの際は<Link to={"/qa"}>Q&amp;A</Link>
                  をご覧ください。
                </p>

                <div className="is-flex is-flex-direction-column is-align-items-start buttons are-medium">
                  <a
                    href={
                      downloadUrls[selectedOs][selectedMode]?.[selectedPackage]
                        ?.url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="button is-rounded my-2"
                    type="button"
                    role={"button"}
                  >
                    <span className="has-text-weight-semibold">
                      {selectedOs}版インストーラーのダウンロード
                    </span>
                  </a>
                  <a
                    onClick={scrollToRef}
                    className="button is-rounded my-2"
                    type="button"
                    role={"button"}
                  >
                    <span className="has-text-weight-semibold">
                      カスタムダウンロード
                    </span>
                  </a>
                </div>
              </div>
              <div className="p-1 has-background-white">
                <img src={shareThumb} alt="VOICEVOX" />
              </div>
            </div>
          </section>
          <SoftwareFeatures />
          <section
            ref={ref}
            className="container is-max-desktop is-desktop mb-6"
          >
            <section className="modal-card-head has-text-centered">
              <p className="modal-card-title">ダウンロード選択</p>
            </section>

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

            <section className="modal-card-foot is-justify-content-flex-end">
              <p className="my-4">
                ダウンロードにお困りの際は<Link to={"/qa"}>Q&amp;A</Link>
                をご覧ください。
              </p>
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
            </section>
          </section>
        </>
      ) : (
        <>
          <section className="modal-card-head has-text-centered">
            <p className="modal-card-title">メンテナンス中です</p>
          </section>
          <section className="modal-card-body">
            <p className="has-text-centered is-size-5">
              アップデートの準備をしています。
            </p>
            <p className="has-text-centered is-size-5">
              しばらくお待ち下さい。
            </p>
          </section>
        </>
      )}
    </Page>
  )
}

export default Download
