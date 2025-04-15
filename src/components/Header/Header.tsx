import { isDevelopment, sendEvent, withBaseUrl } from "@/helper";
import { $downloadModal, $nemoGuidanceModal } from "@/store";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

/** ヘッダーを隠すための属性。この属性を持つ要素が表示されている間はヘッダーを隠す */
export const hideHeaderAttr = "data-voicevox-hide-header";

export default function Header({
  defaultHide,
  isDark,
  isNemo,
  iconUrl,
}: {
  defaultHide?: boolean; // アクセスした直後にヘッダーを隠すか
  isDark?: boolean;
  isNemo?: boolean;
  iconUrl: string;
}) {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [showingHeader, setShowingHeader] = useState(!defaultHide);

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
      Component: ({ className }: { className?: string }) => (
        <a href={withBaseUrl("/")} className={`navbar-item ${className}`}>
          トーク
        </a>
      ),
    },
    {
      Component: ({ className }: { className?: string }) => (
        <a href={withBaseUrl("/song/")} className={`navbar-item ${className}`}>
          ソング
        </a>
      ),
    },
    {
      Component: ({ className }: { className?: string }) => (
        <a
          href={withBaseUrl("/dormitory/")}
          className={`navbar-item ${className}`}
        >
          ボイボ寮
        </a>
      ),
      hideType: "mobile" as HideType,
    },
    {
      Component: ({ className }: { className?: string }) => (
        <a href={withBaseUrl("/nemo/")} className={`navbar-item ${className}`}>
          Nemo
        </a>
      ),
      hideType: "mobile" as HideType,
    },
    {
      Component: ({ className }: { className?: string }) => (
        <a
          href={withBaseUrl("/how_to_use/")}
          className={`navbar-item ${className}`}
        >
          使い方
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    {
      Component: ({ className }: { className?: string }) => (
        <a href={withBaseUrl("/term/")} className={`navbar-item ${className}`}>
          利用規約
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    {
      Component: ({ className }: { className?: string }) => (
        <a href={withBaseUrl("/qa/")} className={`navbar-item ${className}`}>
          Q&amp;A
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    {
      Component: ({ className }: { className?: string }) => (
        <a
          href={withBaseUrl("/update_history/")}
          className={`navbar-item ${className}`}
        >
          変更履歴
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    ...(isDevelopment
      ? [
          {
            Component: ({ className }: { className?: string }) => (
              <a
                href={withBaseUrl("/news/")}
                className={`navbar-item ${className}`}
              >
                ニュース
              </a>
            ),
          },
        ]
      : []),
    {
      Component: ({ className }: { className?: string }) => (
        <a
          href="https://hiho.fanbox.cc/"
          target="_blank"
          rel="noreferrer"
          className={`navbar-item ${className}`}
        >
          pixivFANBOX
        </a>
      ),
      hideType: "tablet" as HideType,
    },
    {
      Component: ({ className }: { className?: string }) => (
        <div className={`navbar-item py-0 ${className}`}>
          <a
            className="button is-primary is-rounded"
            onClick={() => {
              if (!isNemo) {
                $downloadModal.set(true);
                sendEvent("download", "software");
              } else {
                $nemoGuidanceModal.set(true);
                sendEvent("download", "nemo");
              }
            }}
            tab-index={0}
            role="button"
          >
            <span className="icon">
              <FontAwesomeIcon icon={faDownload} />
            </span>
            <span className="has-text-weight-semibold">ダウンロード</span>
          </a>
        </div>
      ),
      hideType: "mobile" as HideType,
    },
  ];

  return (
    <>
      <nav
        className={`navbar is-fixed-top has-shadow ${
          showingHeader ? "" : "is-hidden"
        } ${defaultHide ? "with-animation" : ""} ${isDark ? "is-black" : ""}`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a href={withBaseUrl("/")} className="navbar-item">
            <img src={iconUrl} alt="" width="28" height="28" />
            <span className="has-text-weight-bold is-size-5"> VOICEVOX </span>
          </a>

          {menus.map(({ Component, hideType }, i) => (
            <Component
              key={i}
              className={
                hideType == undefined
                  ? "is-hidden-desktop"
                  : hideType == "tablet"
                    ? "is-hidden"
                    : "is-hidden-desktop is-hidden-mobile"
              }
            />
          ))}

          <a
            role="button"
            className={`navbar-burger ${isBurgerActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={`${isBurgerActive}`}
            data-target="navbar"
            onClick={() => setIsBurgerActive(!isBurgerActive)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="navbar"
          className={`navbar-menu ${isBurgerActive ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            {menus.map(({ Component, hideType }, i) => (
              <Component
                key={i}
                className={
                  hideType == undefined
                    ? "is-hidden-touch"
                    : hideType == "mobile"
                      ? "is-hidden-tablet-only"
                      : ""
                }
              />
            ))}
          </div>
        </div>
      </nav>

      {/* 空間を空けるために必要 */}
      <div
        className={`navbar height-holder ${showingHeader ? "" : "is-hidden"}`}
      />
    </>
  );
}
