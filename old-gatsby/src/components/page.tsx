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
  isDark?: boolean // 黒基調のページか
}> = ({
  showingHeader = true,
  showingHeaderOnTop = true,
  children,
  isNemo = false,
  isDark = false,
}) => {
  const [isBurgerActive, setIsBurgerActive] = useState(false)

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
        className={`footer appearance ${isDark ? "has-background-black" : ""}`}
      >
        <VVFooter
          privacyPolicyShower={showPrivacyPolicyModal}
          isDark={isDark}
        />
      </footer>
      <div className="footer height-holder">
        {/* 空間を空けるために必要 */}
        <VVFooter privacyPolicyShower={() => {}} isDark={isDark} />
      </div>
    </>
  )
}
