import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React from "react"

export const OssGuidance: React.FC<{
  className?: string
  isDark: boolean // Nemoのページかどうか
}> = ({ className, isDark }) => {
  return (
    <section className="section">
      <div
        className={`${className} container is-max-desktop is-flex is-flex-direction-column`}
      >
        <h2 id="oss" className="jump-anchor-header-padding title">
          <Link
            to={`#oss`}
            className={!isDark ? "has-text-black" : "has-text-white"}
          >
            オープンソース
          </Link>
        </h2>
        <p className="is-size-5">
          VOICEVOX は OSS（オープンソース・ソフトウェア）版 VOICEVOX
          をもとに構築されています。
        </p>
        <p className="is-size-5">
          製品版と OSS 版の違いやモジュール構成は&nbsp;
          <a
            href="https://github.com/VOICEVOX/voicevox/blob/main/docs/%E5%85%A8%E4%BD%93%E6%A7%8B%E6%88%90.md"
            target="_blank"
            rel="noreferrer"
            className="has-text-weight-bold is-underlined"
          >
            VOICEVOX の全体構成
          </a>
          &nbsp;をご参照ください。
        </p>
        <p className="is-size-5">
          ソフトウェア部分は Electron + Vue 、音声合成エンジン部分は Python +
          FastAPI です。
        </p>
        <p className="is-size-5">
          追加したい・改善したい機能があれば、ぜひ開発にご参加ください。
        </p>
        <div className="buttons mt-3">
          <a
            className={`button ${!isDark ? "is-outlined" : "is-dark"}`}
            href="https://github.com/VOICEVOX/voicevox"
            target="_blank"
            rel="noreferrer"
            type="button"
            role={"button"}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </span>
            <span>VOICEVOX エディター</span>
          </a>
          <a
            className={`button ${!isDark ? "is-outlined" : "is-dark"}`}
            href="https://github.com/VOICEVOX/voicevox_engine"
            target="_blank"
            rel="noreferrer"
            type="button"
            role={"button"}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faGithub} />
            </span>
            <span>VOICEVOX エンジン</span>
          </a>
        </div>
      </div>
    </section>
  )
}
