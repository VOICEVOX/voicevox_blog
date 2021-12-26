import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import ModalPrivacyPolicy from "../components/modalPrivacyPolicy"

export const Page: React.FC<{}> = ({ children }) => {
  const [showingPrivacyPolicyModal, setShowingPrivacyPolicyModal] =
    useState(false)

  const hidePrivacyPolicyModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowingPrivacyPolicyModal(false)
  }

  const showPrivacyPolicyModal = () => {
    document.documentElement.classList.add("is-clipped")
    setShowingPrivacyPolicyModal(true)
  }

  return (
    <>
      {children}

      <ModalPrivacyPolicy
        isActive={showingPrivacyPolicyModal}
        hide={hidePrivacyPolicyModal}
      />

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
