import ModalShell from "../ModalShell";
import Selector from "./Selector";
import Button from "@/components/ui/Button/Button";
import { APP_VERSION } from "@/constants";
import { ensureNotNullish, withBaseUrl } from "@/helper";
import { $downloadModal } from "@/store";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

type OsType = "Windows" | "Mac" | "Linux";
type PackageType = "インストーラー" | "Zip" | "tar.gz";
type ModeType =
  | "x64"
  | "Apple"
  | "Intel"
  | "arm64"
  | "GPU / CPU"
  | "CPU"
  | "CPU (Apple)"
  | "CPU (Intel)"
  | "CPU (x64)"
  | "CPU (arm64)";

const packageAvailables: Record<OsType, PackageType[]> = {
  Windows: ["インストーラー", "Zip"],
  Mac: ["インストーラー", "Zip"],
  Linux: ["インストーラー", "tar.gz"],
};

const modeAvailables: Record<
  OsType,
  Partial<Record<PackageType, ModeType[]>>
> = {
  Windows: {
    インストーラー: ["x64"],
    Zip: ["GPU / CPU", "CPU"],
  },
  Mac: {
    インストーラー: ["Apple", "Intel"],
    Zip: ["CPU (Apple)", "CPU (Intel)"],
  },
  Linux: {
    インストーラー: ["x64", "arm64"],
    "tar.gz": ["CPU (x64)", "CPU (arm64)"],
  },
};

export default function DownloadModal() {
  const isActive = useStore($downloadModal);
  const hide = () => $downloadModal.set(false);

  const downloadUrls: Record<
    OsType,
    Partial<
      Record<
        PackageType,
        Partial<Record<ModeType, { url: string; name: string }>>
      >
    >
  > = {
    Windows: {
      インストーラー: {
        x64: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX.Web.Setup.${APP_VERSION}.exe`,
          name: `VOICEVOX.Setup.${APP_VERSION}.Windows.exe`,
        },
      },
      Zip: {
        "GPU / CPU": {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-windows-directml-${APP_VERSION}.zip`,
          name: `VOICEVOX.${APP_VERSION}.Windows.zip`,
        },
        CPU: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-windows-cpu-${APP_VERSION}.zip`,
          name: `VOICEVOX-CPU.${APP_VERSION}.Windows.zip`,
        },
      },
    },
    Mac: {
      インストーラー: {
        Apple: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX.${APP_VERSION}-arm64.dmg`,
          name: `VOICEVOX-arm64.${APP_VERSION}.Mac.dmg`,
        },
        Intel: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX.${APP_VERSION}-x64.dmg`,
          name: `VOICEVOX-x64.${APP_VERSION}.Mac.dmg`,
        },
      },
      Zip: {
        "CPU (Apple)": {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-macos-cpu-arm64-${APP_VERSION}.zip`,
          name: `VOICEVOX-CPU-arm64.${APP_VERSION}.Mac.zip`,
        },
        "CPU (Intel)": {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-macos-cpu-x64-${APP_VERSION}.zip`,
          name: `VOICEVOX-CPU-x64.${APP_VERSION}.Mac.zip`,
        },
      },
    },
    Linux: {
      インストーラー: {
        x64: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX.linux-appimage.${APP_VERSION}.sh`,
          name: `VOICEVOX.linux-appimage.${APP_VERSION}.sh`,
        },
        arm64: {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/VOICEVOX.linux-arm64-appimage.${APP_VERSION}.sh`,
          name: `VOICEVOX.linux-arm64-appimage.${APP_VERSION}.sh`,
        },
      },
      "tar.gz": {
        "CPU (x64)": {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-linux-cpu-x64-${APP_VERSION}.tar.gz`,
          name: `VOICEVOX-CPU-X64.${APP_VERSION}.Linux.tar.gz`,
        },
        "CPU (arm64)": {
          url: `https://github.com/VOICEVOX/voicevox/releases/download/${APP_VERSION}/voicevox-linux-cpu-arm64-${APP_VERSION}.tar.gz`,
          name: `VOICEVOX-CPU-ARM64.${APP_VERSION}.Linux.tar.gz`,
        },
      },
    },
  };

  const [selectedOs, setSelectedOs] = useState<OsType>("Windows");
  const [selectedPackage, setSelectedPackage] =
    useState<PackageType>("インストーラー");
  const [selectedMode, setSelectedMode] = useState<ModeType>("x64");

  const packageCandidates = packageAvailables[selectedOs];
  const selectedOrDefaultPackage = packageCandidates.includes(selectedPackage)
    ? selectedPackage
    : packageCandidates[0];

  const modeCandidates = ensureNotNullish(
    modeAvailables[selectedOs][selectedOrDefaultPackage],
  );
  const selectedOrDefaultMode = modeCandidates.includes(selectedMode)
    ? selectedMode
    : modeCandidates[0];

  const packageDownloadUrls = ensureNotNullish(
    downloadUrls[selectedOs][selectedOrDefaultPackage],
  );
  const downloadInfo = ensureNotNullish(
    packageDownloadUrls[selectedOrDefaultMode],
  );

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Windows")) {
      setSelectedOs("Windows");
    } else if (userAgent.includes("Mac")) {
      setSelectedOs("Mac");
    } else if (userAgent.includes("Linux")) {
      setSelectedOs("Linux");
    }
  }, []);

  const selectPackage = (packageType: PackageType) => {
    setSelectedPackage(packageType);
    // パッケージを変えてもCPUの種類が変わらないよう、同じ位置の対応モードを選択する
    const modeIndex = modeCandidates.indexOf(selectedOrDefaultMode);
    const nextModeCandidates = ensureNotNullish(
      modeAvailables[selectedOs][packageType],
    );
    setSelectedMode(
      modeIndex < nextModeCandidates.length
        ? nextModeCandidates[modeIndex]
        : nextModeCandidates[0],
    );
  };

  return (
    <ModalShell
      isActive={isActive}
      title="VOICEVOX ダウンロード"
      onClose={hide}
      footer={
        <>
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
        </>
      }
    >
      <div className="space-y-md">
        <Selector
          label="OS"
          selected={selectedOs}
          setSelected={setSelectedOs}
          candidates={["Windows", "Mac", "Linux"]}
        />

        <hr className="vv-hr" />

        <div className="space-y-xs">
          <Selector
            label="パッケージ"
            selected={selectedOrDefaultPackage}
            setSelected={selectPackage}
            candidates={packageCandidates}
          />
          <p className="text-center text-xs text-neutral-800">
            ※ 推奨パッケージはインストーラー版です
          </p>
        </div>

        <hr className="vv-hr" />

        <div className="space-y-xs">
          <Selector
            label={
              selectedOrDefaultPackage === "インストーラー"
                ? "CPU"
                : "対応モード"
            }
            selected={selectedOrDefaultMode}
            setSelected={setSelectedMode}
            candidates={modeCandidates}
          />
          {selectedOrDefaultPackage === "インストーラー" ? (
            <p className="text-center text-xs text-neutral-800">
              ※ GPUモードは起動後に選べます
            </p>
          ) : (
            <p className="text-center text-xs text-neutral-800">
              ※ GPUモードの方が快適ですが、利用するためには
              <a href={withBaseUrl("/qa/")} className="vv-link">
                対応するGPU
              </a>
              が必要です
            </p>
          )}
        </div>
      </div>
    </ModalShell>
  );
}
