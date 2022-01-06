import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React, { useContext, useEffect } from "react"
import ModalPrivacyPolicy from "../components/modalPrivacyPolicy"
import { GlobalContext } from "../contexts/context"
import { useModalController } from "../hooks/hook"
import icon from "../images/icon.png"
import { DownloadModal } from "./downloadModal"
import { ModalHowToUse } from "./modalHowToUse"
import { ModalReadmeSoftware } from "./modalReadmeSoftware"

export const Page: React.FC<{ showingHeader?: boolean }> = ({
  showingHeader = true,
  children,
}) => {
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

  // google analytics
  const sendEvent = (event: string, eventCategory: string) => {
    typeof window !== "undefined" &&
      window.gtag &&
      window.gtag("event", event, { event_category: eventCategory })
  }

  const context = useContext(GlobalContext)
  context.downloadModal = useModalController()

  const {
    showing: showingSoftwareReadmeModal,
    show: showSoftwareReadmeModal,
    hide: hideSoftwareReadmeModal,
  } = useModalController()

  const {
    showing: showingHowToUseModal,
    show: showHowToUseModal,
    hide: hideHowToUseModal,
  } = useModalController()

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
              <img src={icon} />
              <span className="has-text-weight-bold is-size-5 pl-2">
                VOICEVOX
              </span>
            </Link>

            {/*
            ハンバーガーボタン。別ページがないのでまだ不要
            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
            */}
          </div>

          <div id="navbar" className="navbar-menu">
            <div className="navbar-end">
              <Link to={"/term"} className="navbar-item">
                利用規約
              </Link>
              <Link to={"/how_to_use"} className="navbar-item">
                使い方
              </Link>
              <Link to={"/dormitory"} className="navbar-item">
                ボイボ寮
              </Link>
              <Link to={"/update_history"} className="navbar-item">
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
        showReadme={showSoftwareReadmeModal}
        showHowToUse={showHowToUseModal}
      />
      <ModalReadmeSoftware
        isActive={showingSoftwareReadmeModal}
        hide={hideSoftwareReadmeModal}
      />
      <ModalPrivacyPolicy
        isActive={showingPrivacyPolicyModal}
        hide={hidePrivacyPolicyModal}
      />
      <ModalHowToUse isActive={showingHowToUseModal} hide={hideHowToUseModal} />

      <footer className="footer">
        <div className="container is-flex is-justify-content-center">
          <a
            className="button is-outlined ml-1 mr-1"
            href="https://github.com/VOICEVOX/voicevox"
            target="_blank"
            rel="noreferrer"
            type="button"
            role={"button"}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </span>
            <span>GitHub</span>
          </a>
          <a
            className="button is-outlined is-info ml-1 mr-1"
            href="https://twitter.com/hiho_karuta"
            target="_blank"
            rel="noreferrer"
            type="button"
            role={"button"}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faTwitter} />
            </span>
            <span>Twitter</span>
          </a>
        </div>
        <div className="container is-flex is-justify-content-center mt-2">
          <a className="is-size-7	ml-1 mr-1" onClick={showPrivacyPolicyModal}>
            プライバシーポリシー
          </a>
          <p className="is-size-7	ml-1 mr-1">© 2021 Hiroshiba Kazuyuki</p>
        </div>
      </footer>
    </>
  )
}
