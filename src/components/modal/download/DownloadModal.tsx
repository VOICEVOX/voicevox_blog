import Selector from "./Selector";
import linuxInstallCpu from "@/assets/script/linuxInstallCpu.sh?url";
import linuxInstallNvidia from "@/assets/script/linuxInstallNvidia.sh?url";
import { APP_VERSION } from "@constants";
import { useStore } from "@nanostores/react";
import { $downloadModal } from "@store";
import { useEffect, useState } from "react";

type OsType = "Windows" | "Mac" | "Linux";
type ModeType = "GPU / CPU" | "CPU" | "CPU (Intel)" | "CPU (Apple)";
type PackageType = "インストーラー" | "Zip" | "tar.gz";

const modeAvailables: Record<OsType, ModeType[]> = {
  Windows: ["GPU / CPU", "CPU"],
  Mac: ["CPU (Intel)", "CPU (Apple)"],
  Linux: ["GPU / CPU", "CPU"],
};

const packageAvailables: Record<
  OsType,
  Partial<Record<ModeType, PackageType[]>>
> = {
  Windows: {
    "GPU / CPU": ["インストーラー", "Zip"],
    CPU: ["インストーラー", "Zip"],
  },
  Mac: {
    "CPU (Intel)": ["インストーラー", "Zip"],
    "CPU (Apple)": ["インストーラー", "Zip"],
  },
  Linux: { "GPU / CPU": ["インストーラー"], CPU: ["インストーラー", "tar.gz"] },
};

export default function DownloadModal() {
  const isActive = useStore($downloadModal);
  const hide = () => $downloadModal.set(false);

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
          url: linuxInstallNvidia,
          name: `VOICEVOX.Installer.${APP_VERSION}.Linux.sh`,
        },
      },
      CPU: {
        インストーラー: {
          url: linuxInstallCpu,
          name: `VOICEVOX-CPU.Installer.${APP_VERSION}.Linux.sh`,
        },
        "tar.gz": {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-linux-cpu-${APP_VERSION}.tar.gz`,
          name: `VOICEVOX-CPU.${APP_VERSION}.Linux.tar.gz`,
        },
      },
    },
  };

  const [selectedOs, setSelectedOs] = useState<OsType>("Windows");
  const [selectedMode, setSelectedMode] = useState<ModeType>("GPU / CPU");
  const [selectedPackage, setSelectedPackage] =
    useState<PackageType>("インストーラー");

  const selectedOrDefaultMode = modeAvailables[selectedOs].includes(
    selectedMode,
  )
    ? selectedMode
    : modeAvailables[selectedOs][0];

  const selectedOrDefaultPackage = packageAvailables[selectedOs][
    selectedOrDefaultMode
  ]!.includes(selectedPackage)
    ? selectedPackage
    : packageAvailables[selectedOs][selectedOrDefaultMode]![0];

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
    selectMode(
      os,
      modeAvailables[os].includes(selectedMode)
        ? selectedMode
        : modeAvailables[os][0],
    );
  };
  const selectMode = (os: OsType, mode: ModeType) => {
    setSelectedMode(mode);
    if (!packageAvailables[os][mode]!.includes(selectedPackage)) {
      setSelectedPackage(packageAvailables[os][mode]![0]);
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
          <p className="modal-card-title">VOICEVOX ダウンロード</p>
          <button
            className="delete"
            aria-label="close"
            onClick={hide}
            type="button"
          />
        </header>

        <section className="modal-card-body">
          <Selector
            label="OS"
            selected={selectedOs}
            setSelected={selectOs}
            candidates={["Windows", "Mac", "Linux"]}
          />

          <hr className="my-3" />

          <Selector
            label="対応モード"
            selected={selectedOrDefaultMode}
            setSelected={(mode) => selectMode(selectedOs, mode)}
            candidates={modeAvailables[selectedOs]}
          />
          <p className="has-text-centered is-size-7">
            ※ GPUモードの方が快適ですが、利用するためには
            <a href="/qa/">対応するGPU</a>
            が必要です
          </p>

          <hr className="my-3" />

          <Selector
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
          <div className="buttons">
            <a href="/term/" className="button" role="button">
              <span>利用規約</span>
            </a>
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
