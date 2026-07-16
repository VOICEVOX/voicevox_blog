import Button from "@/components/ui/Button/Button";
import { isDevelopment, sendEvent, withBaseUrl } from "@/helper";
import { $downloadModal, $nemoGuidanceModal } from "@/store";
import { faBars, faDownload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useEffect, useState } from "react";

/** ヘッダーを隠すための属性。この属性を持つ要素が表示されている間はヘッダーを隠す */
export const hideHeaderAttr = "data-voicevox-hide-header";

export default function Header({
  defaultHide,
  isNemo,
  iconUrl,
}: {
  defaultHide?: boolean; // アクセスした直後にヘッダーを隠すか
  isNemo?: boolean;
  iconUrl: string;
}) {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [showingHeader, setShowingHeader] = useState(!defaultHide);
  const menuItemHoverClassName = "vv-status-layer";
  const menuItemBaseClassName = `${menuItemHoverClassName} flex items-center self-stretch px-sm text-base whitespace-nowrap`;
  const menuItemBaseMobilePanelClassName = `${menuItemHoverClassName} flex items-center px-sm py-xs text-base whitespace-nowrap`;
  const menuTriggerClassName = `${menuItemHoverClassName} inline-flex h-10 w-10 mr-2xs shrink-0 items-center justify-center self-center leading-none`;

  // ヘッダーを隠すための属性を持つ要素が表示されている間はヘッダーを隠す
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setShowingHeader(!entry.isIntersecting);
      });
    });
    document.querySelectorAll(`[${hideHeaderAttr}]`).forEach((elem) => {
      observer.observe(elem);
    });
    return () => observer.disconnect();
  }, []);

  // メニュー。画面サイズに応じてハンバーガーメニュー内に表示される。
  type HideType =
    | "tablet" // タブレット・スマホでは表示しない
    | "mobile"; // スマホでは表示しない
  const menus = [
    {
      Component: ({ className }: { className: string }) => (
        <a
          href={withBaseUrl("/")}
          className={`${menuItemBaseClassName} ${className}`}
        >
          トーク
        </a>
      ),
    },
    {
      Component: ({ className }: { className: string }) => (
        <a
          href={withBaseUrl("/song/")}
          className={`${menuItemBaseClassName} ${className}`}
        >
          ソング
        </a>
      ),
    },
    {
      Component: ({ className }: { className: string }) => (
        <a
          href={withBaseUrl("/dormitory/")}
          className={`${menuItemBaseClassName} ${className}`}
        >
          ボイボ寮
        </a>
      ),
      hideType: "mobile" as HideType,
    },
    {
      Component: ({ className }: { className: string }) => (
        <a
          href={withBaseUrl("/nemo/")}
          className={`${menuItemBaseClassName} ${className}`}
        >
          Nemo
        </a>
      ),
      hideType: "mobile" as HideType,
    },
    {
      Component: ({ className }: { className: string }) => (
        <a
          href={withBaseUrl("/how_to_use/")}
          className={`${menuItemBaseClassName} ${className}`}
        >
          使い方
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    {
      Component: ({ className }: { className: string }) => (
        <a
          href={withBaseUrl("/term/")}
          className={`${menuItemBaseClassName} ${className}`}
        >
          利用規約
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    {
      Component: ({ className }: { className: string }) => (
        <a
          href={withBaseUrl("/qa/")}
          className={`${menuItemBaseClassName} ${className}`}
        >
          Q&amp;A
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    {
      Component: ({ className }: { className: string }) => (
        <a
          href={withBaseUrl("/update_history/")}
          className={`${menuItemBaseClassName} ${className}`}
        >
          変更履歴
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    ...(isDevelopment
      ? [
          {
            Component: ({ className }: { className: string }) => (
              <a
                href={withBaseUrl("/news/")}
                className={`${menuItemBaseClassName} ${className}`}
              >
                ニュース
              </a>
            ),
          },
        ]
      : []),
    {
      Component: ({ className }: { className: string }) => (
        <a
          href="https://hiho.fanbox.cc/"
          target="_blank"
          rel="noreferrer"
          className={`${menuItemBaseClassName} ${className}`}
        >
          pixivFANBOX
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    {
      Component: ({ className }: { className: string }) => (
        <div className={`px-sm flex items-center self-stretch ${className}`}>
          <Button
            onClick={() => {
              if (!isNemo) {
                $downloadModal.set(true);
                sendEvent("download", "software");
              } else {
                $nemoGuidanceModal.set(true);
                sendEvent("download", "nemo");
              }
            }}
            kind="solid"
            tone="primary"
            shape="pill"
            size="md"
            className="font-semibold"
            icon={<FontAwesomeIcon icon={faDownload} />}
          >
            ダウンロード
          </Button>
        </div>
      ),
      hideType: "mobile" as HideType,
    },
  ];

  const brandMenuClassName = (hideType?: HideType) =>
    hideType == undefined
      ? "lg:hidden"
      : hideType == "tablet"
        ? "hidden"
        : "hidden md:flex lg:hidden";

  const desktopMenuClassName = (hideType?: HideType) =>
    hideType == "mobile"
      ? "flex items-center self-stretch py-0"
      : "flex items-center self-stretch";

  const mobilePanelMenuItemClassName = (hideType?: HideType) => {
    if (hideType == undefined) return "hidden";
    if (hideType == "mobile")
      return `${menuItemBaseMobilePanelClassName} w-full md:hidden`;
    return `${menuItemBaseMobilePanelClassName} w-full`;
  };

  return (
    <>
      {/* FIXME: 非表示の際もアニメーション適用したい */}
      <Collapsible.Root open={isBurgerActive} onOpenChange={setIsBurgerActive}>
        <nav
          className={`fixed top-0 left-0 z-(--z-header) w-full ${
            showingHeader ? "" : "hidden"
          } ${
            defaultHide
              ? "animate-[fadeIn_0.1s_cubic-bezier(0.33,1,0.68,1)_1_forwards]"
              : ""
          } bg-white text-neutral-900 shadow-[0_2px_0_0_rgb(243,244,246)] dark:bg-black dark:text-white dark:shadow-[0_2px_0_0_hsl(0_0%_4%)]`}
          aria-label="main"
        >
          <div className="mx-auto flex h-13 items-stretch justify-between">
            <div className="flex min-w-0 items-stretch">
              <a
                href={withBaseUrl("/")}
                className={`gap-sm px-sm flex items-center self-stretch whitespace-nowrap ${menuItemHoverClassName}`}
              >
                <img src={iconUrl} alt="" width="28" height="28" />
                <span className="text-xl leading-none font-bold">VOICEVOX</span>
              </a>

              {menus.map(({ Component, hideType }, i) => (
                <Component key={i} className={brandMenuClassName(hideType)} />
              ))}
            </div>

            <div className="flex items-stretch">
              <div className="hidden items-stretch lg:flex">
                {menus.map(({ Component, hideType }, i) => (
                  <Component
                    key={i}
                    className={desktopMenuClassName(hideType)}
                  />
                ))}
              </div>

              <Collapsible.Trigger asChild>
                <button
                  className={`${menuTriggerClassName} lg:hidden`}
                  aria-label="メニュー"
                  type="button"
                >
                  <span aria-hidden="true" className="text-xl leading-none">
                    <FontAwesomeIcon icon={isBurgerActive ? faXmark : faBars} />
                  </span>
                </button>
              </Collapsible.Trigger>
            </div>
          </div>

          <Collapsible.Content className="lg:hidden">
            <div className="border-t border-neutral-200 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-black dark:text-white">
              <div className="py-xs mx-auto flex flex-col">
                {menus.map(({ Component, hideType }, i) => (
                  <Component
                    key={i}
                    className={mobilePanelMenuItemClassName(hideType)}
                  />
                ))}
              </div>
            </div>
          </Collapsible.Content>
        </nav>
      </Collapsible.Root>

      {/* 空間を空けるために必要 */}
      <div className={`invisible h-13 ${defaultHide ? "hidden" : ""}`} />
    </>
  );
}
