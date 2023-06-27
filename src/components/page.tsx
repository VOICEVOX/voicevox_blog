import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React, { useContext, useEffect, useState } from "react"
import ModalPrivacyPolicy from "../components/modalPrivacyPolicy"
import { GlobalContext } from "../contexts/context"
import { useModalController } from "../hooks/hook"
import icon from "../images/icon.png"
import { DownloadModal } from "./downloadModal"
import { NemoGuidanceModal } from "./nemoGuidanceModal"
import { VVFooter } from "./page-footer"

export const Page: React.FC<{
  showingHeader?: boolean
  showingHeaderOnTop?: boolean // ページ最上部でヘッダーを表示するかどうか
  children: React.ReactNode
  isNemo?: boolean // Nemo用のページか
}> = ({
  showingHeader = true,
  showingHeaderOnTop = true,
  children,
  isNemo = false,
}) => {
  const [isBurgerActive, setIsBurgerActive] = useState(false)

  // Nemoの場合は背景色を変更する
  useEffect(() => {
    if (isNemo) {
      document.body.classList.add("has-background-black")
    } else {
      document.body.classList.add("has-background-white")
    }
    return () => {
      document.body.classList.remove("has-background-black")
      document.body.classList.remove("has-background-white")
    }
  }, [isNemo])

  const context = useContext(GlobalContext)
  context.downloadModal = useModalController()
  context.nemoGuidanceModal = useModalController()

  const {
    showing: showingPrivacyPolicyModal,
    show: showPrivacyPolicyModal,
    hide: hidePrivacyPolicyModal,
  } = useModalController()

  return (
    <>
      <nav
        className={`navbar is-fixed-top has-shadow ${
          showingHeader ? "" : "is-hidden"
        } ${!showingHeaderOnTop ? "navbar-with-animation" : ""} ${
          isNemo ? "is-black" : ""
        }`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to={"/"} className="navbar-item">
            <img src={icon} alt="VOICEVOXのロゴ" />
            <span className="has-text-weight-bold is-size-5 pl-2">
              VOICEVOX
            </span>
          </Link>

          <a
            role="button"
            className={`navbar-burger ${isBurgerActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
            onClick={() => setIsBurgerActive(!isBurgerActive)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbar"
          className={`navbar-menu ${isBurgerActive ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            <Link to={"/term/"} className="navbar-item">
              利用規約
            </Link>
            <Link to={"/how_to_use/"} className="navbar-item">
              使い方
            </Link>
            <Link to={"/qa/"} className="navbar-item">
              Q&amp;A
            </Link>
            <Link to={"/dormitory/"} className="navbar-item">
              ボイボ寮
            </Link>
            <Link to={"/nemo/"} className="navbar-item">
              Nemo
            </Link>
            <Link to={"/update_history/"} className="navbar-item">
              変更履歴
            </Link>
            <a
              href="https://hiho.fanbox.cc/"
              target={"_blank"}
              rel={"noreferrer"}
              className="navbar-item"
            >
              pixivFANBOX
            </a>
            <div className="navbar-item py-0">
              <a
                className="button is-primary is-rounded"
                onClick={() => {
                  if (!isNemo) {
                    context.downloadModal.show()
                    context.sendEvent("download", "software")
                  } else {
                    context.nemoGuidanceModal.show()
                    context.sendEvent("download", "nemo")
                  }
                }}
                target="_blank"
                rel="noreferrer"
                tabIndex={0}
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
        className={`navbar height-holder ${
          showingHeader && showingHeaderOnTop ? "" : "is-hidden"
        }`}
      />

      <GlobalContext.Provider value={context}>
        {children}
      </GlobalContext.Provider>

      <NemoGuidanceModal
        isActive={context.nemoGuidanceModal.showing}
        hide={context.nemoGuidanceModal.hide}
      />
      <DownloadModal
        isActive={context.downloadModal.showing}
        hide={context.downloadModal.hide}
      />
      <ModalPrivacyPolicy
        isActive={showingPrivacyPolicyModal}
        hide={hidePrivacyPolicyModal}
      />
      <footer
        className={`footer appearance ${isNemo ? "has-background-black" : ""}`}
      >
        <VVFooter
          privacyPolicyShower={showPrivacyPolicyModal}
          isNemo={isNemo}
        />
      </footer>
      <div className="footer height-holder">
        {/* 空間を空けるために必要 */}
        <VVFooter privacyPolicyShower={() => {}} isNemo={isNemo} />
      </div>
    </>
  )
}
