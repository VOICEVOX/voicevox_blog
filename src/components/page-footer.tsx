import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import React from "react";

export const VVFooter: React.FC<{ privacyPolicyShower: () => void }> = ({ privacyPolicyShower }) => (
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
        <a className="is-size-7	ml-1 mr-1" onClick={privacyPolicyShower}>
        プライバシーポリシー
        </a>
        <p className="is-size-7	ml-1 mr-1">© 2021 Hiroshiba Kazuyuki</p>
    </div>
    </footer>
);