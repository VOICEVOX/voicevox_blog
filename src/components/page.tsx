import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React, { useContext, useEffect, useState } from "react"
import ModalPrivacyPolicy from "../components/modalPrivacyPolicy"
import { GlobalContext } from "../contexts/context"
import { useModalController } from "../hooks/hook"
import icon from "../images/icon.png"
import { DownloadModal } from "./downloadModal"
import { VVFooter } from "./page-footer"

export const Page: React.FC<{
  showingHeader?: boolean
  children: React.ReactNode
}> = ({ showingHeader = true, children }) => {
  // ヘッダー分のスペースを空ける
  // FIXME: 本当は`showingHeader`が変わるたびに切り替えたいが、
  // そうするとトップページでヘッダー有無が振動するのでやめている
  useEffect(() => {
    const className = "has-navbar-fixed-top"
    if (showingHeader) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }
  }, [])

  const [isBurgerActive, setIsBurgerActive] = useState(false)

  // google analytics
  const sendEvent = (event: string, eventCategory: string) => {
    typeof window !== "undefined" &&
      window.gtag &&
      window.gtag("event", event, { event_category: eventCategory })
  }

  const context = useContext(GlobalContext)
  context.downloadModal = useModalController()

  const {
    showing: showingPrivacyPolicyModal,
    show: showPrivacyPolicyModal,
    hide: hidePrivacyPolicyModal,
  } = useModalController()

  return (
    <>
      {showingHeader && (
        <nav
          className="navbar is-fixed-top has-shadow"
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
                    context.downloadModal.show()
                    sendEvent("download", "software")
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
      )}

      <GlobalContext.Provider value={context}>
        {children}
      </GlobalContext.Provider>

      <DownloadModal
        isActive={context.downloadModal.showing}
        hide={context.downloadModal.hide}
      />
      <ModalPrivacyPolicy
        isActive={showingPrivacyPolicyModal}
        hide={hidePrivacyPolicyModal}
      />
      <footer className="footer appearance">
        <VVFooter privacyPolicyShower={showPrivacyPolicyModal} />
      </footer>
      <div className="footer height-holder">
        {/* 空間を空けるために必要 */}
        <VVFooter privacyPolicyShower={() => {}} />
      </div>
    </>
  )
}
