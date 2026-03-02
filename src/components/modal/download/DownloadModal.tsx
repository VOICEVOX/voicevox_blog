import Selector from "./Selector";
import linuxInstallCpuArm64 from "@/assets/script/linuxInstallCpuArm64.sh?url";
import linuxInstallCpuX64 from "@/assets/script/linuxInstallCpuX64.sh?url";
import linuxInstallNvidia from "@/assets/script/linuxInstallNvidia.sh?url";
import Button from "@/components/ui/Button/Button";
import IconButton from "@/components/ui/IconButton/IconButton";
import { APP_VERSION } from "@/constants";
import { withBaseUrl } from "@/helper";
import { $downloadModal } from "@/store";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

type OsType = "Windows" | "Mac" | "Linux";
type ModeType =
  | "GPU / CPU"
  | "GPU / CPU (x64)"
  | "CPU"
  | "CPU (Intel)"
  | "CPU (Apple)"
  | "CPU (x64)"
  | "CPU (arm64)";
type PackageType = "インストーラー" | "Zip" | "tar.gz";

const modeAvailables: Record<OsType, ModeType[]> = {
  Windows: ["GPU / CPU", "CPU"],
  Mac: ["CPU (Intel)", "CPU (Apple)"],
  Linux: ["GPU / CPU (x64)", "CPU (x64)", "CPU (arm64)"],
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
  Linux: {
    "GPU / CPU (x64)": ["インストーラー"],
    "CPU (x64)": ["インストーラー", "tar.gz"],
    "CPU (arm64)": ["インストーラー", "tar.gz"],
  },
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
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-macos-cpu-x64-${APP_VERSION}.zip`,
          name: `VOICEVOX-CPU-x64.${APP_VERSION}.Mac.zip`,
        },
      },
      "CPU (Apple)": {
        インストーラー: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX.${APP_VERSION}-arm64.dmg`,
          name: `VOICEVOX-CPU-arm64.${APP_VERSION}.Mac.dmg`,
        },
        Zip: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-macos-cpu-arm64-${APP_VERSION}.zip`,
          name: `VOICEVOX-CPU-arm64.${APP_VERSION}.Mac.zip`,
        },
      },
    },
    Linux: {
      "GPU / CPU (x64)": {
        インストーラー: {
          url: linuxInstallNvidia,
          name: `VOICEVOX.Installer.${APP_VERSION}.Linux.sh`,
        },
      },
      "CPU (x64)": {
        インストーラー: {
          url: linuxInstallCpuX64,
          name: `VOICEVOX-CPU-X64.Installer.${APP_VERSION}.Linux.sh`,
        },
        "tar.gz": {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-linux-cpu-x64-${APP_VERSION}.tar.gz`,
          name: `VOICEVOX-CPU-X64.${APP_VERSION}.Linux.tar.gz`,
        },
      },
      "CPU (arm64)": {
        インストーラー: {
          url: linuxInstallCpuArm64,
          name: `VOICEVOX-CPU-ARM64.Installer.${APP_VERSION}.Linux.sh`,
        },
        "tar.gz": {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-linux-cpu-arm64-${APP_VERSION}.tar.gz`,
          name: `VOICEVOX-CPU-ARM64.${APP_VERSION}.Linux.tar.gz`,
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
          <header className="px-xl py-lg relative flex items-center justify-center border-b border-neutral-200 bg-neutral-50">
            <p className="text-2xl font-bold text-black">
              VOICEVOX ダウンロード
            </p>
            <IconButton
              size="sm"
              className="absolute top-1/2 right-5 -translate-y-1/2 text-neutral-700"
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

            <hr className="border-t border-neutral-300" />

            <div className="space-y-2">
              <Selector
                label="対応モード"
                selected={selectedOrDefaultMode}
                setSelected={(mode) => selectMode(selectedOs, mode)}
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

            <hr className="border-t border-neutral-300" />

            <div className="space-y-2">
              <Selector
                label="パッケージ"
                selected={selectedOrDefaultPackage}
                setSelected={setSelectedPackage}
                candidates={
                  packageAvailables[selectedOs][selectedOrDefaultMode]!
                }
              />
              <p className="text-center text-xs text-neutral-800">
                ※ 推奨パッケージはインストーラー版です
              </p>
            </div>
          </section>

          <footer className="gap-sm px-xl py-lg flex items-center justify-end border-t border-neutral-200 bg-neutral-50">
            <Button
              href={withBaseUrl("/term/")}
              kind="outline"
              tone="neutral"
              shape="rounded"
              size="md"
            >
              利用規約
            </Button>
            <Button
              href={
                downloadUrls[selectedOs][selectedOrDefaultMode]![
                  selectedOrDefaultPackage
                ]!.url
              }
              target="_blank"
              rel="noreferrer"
              download={
                downloadUrls[selectedOs][selectedOrDefaultMode]![
                  selectedOrDefaultPackage
                ]!.name
              }
              kind="solid"
              tone="primary"
              shape="rounded"
              size="md"
            >
              ダウンロード
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}
