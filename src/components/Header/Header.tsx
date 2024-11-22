import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { $downloadModal, $nemoGuidanceModal } from "@store";
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

  return (
    <>
      <nav
        className={`navbar is-fixed-top has-shadow ${
          showingHeader ? "" : "is-hidden"
        } ${isDark ? "is-black" : ""}`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <img src={iconUrl} alt="" />
            <span className="has-text-weight-bold is-size-5"> VOICEVOX </span>
          </a>

          <a
            role="button"
            className={`navbar-burger ${isBurgerActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={`${isBurgerActive}`}
            data-target="navbar"
            onClick={() => setIsBurgerActive(!isBurgerActive)}
          />
        </div>

        <div
          id="navbar"
          className={`navbar-menu ${isBurgerActive ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            <a href="/" className="navbar-item">
              トーク
            </a>
            <a href="/song/" className="navbar-item">
              ソング
            </a>
            <a href="/term/" className="navbar-item">
              利用規約
            </a>
            <a href="/how_to_use/" className="navbar-item">
              使い方
            </a>
            <a href="/qa/" className="navbar-item">
              Q&amp;A
            </a>
            <a href="/dormitory/" className="navbar-item">
              ボイボ寮
            </a>
            <a href="/nemo/" className="navbar-item">
              Nemo
            </a>
            <a href="/update_history/" className="navbar-item">
              変更履歴
            </a>
            {/*
            TODO: リリース時にコメントアウトを外す
            <a href={"/news/"} className="navbar-item">
              ニュース
            </a>
            */}
            <a
              href="https://hiho.fanbox.cc/"
              target="_blank"
              rel="noreferrer"
              className="navbar-item"
            >
              pixivFANBOX
            </a>
            <div className="navbar-item py-0">
              <a
                className="button is-primary is-rounded"
                onClick={() => {
                  if (!isNemo) {
                    $downloadModal.set(true);
                    // TODO: context.sendEvent("download", "software");
                  } else {
                    $nemoGuidanceModal.set(true);
                    // TODO: context.sendEvent("download", "nemo");
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
