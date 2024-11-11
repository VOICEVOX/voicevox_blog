import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React, { useEffect, useRef, useState } from "react"
import DormitoryCharacterCard from "../../../src/pages/dormitory/dormitoryCharacterCard"
import DormitoryEventContainer from "../components/dormitoryEventContainer"
import DormitoryTopIllustContainer from "../components/dormitoryTopIllustContainer"
import DormitoryTopIllustsContainer from "../components/dormitoryTopIllustsContainer"
import "../components/layout.scss"
import { Page } from "../components/page"
import { useDetailedCharacterInfo } from "../hooks/useDetailedCharacterInfo"

type DormitoryProps = {
  setShowingHeader: (show: boolean) => void
}

// FIXME: ハッシュ付きURLに遷移してページ移動したあとブラウザバックするとそのハッシュ位置に戻ってしまうバグを防ぎたい
// https://github.com/VOICEVOX/voicevox_blog/issues/104
const Dormitory: React.FC<DormitoryProps> = ({ setShowingHeader }) => {
  const { characterInfos } = useDetailedCharacterInfo()

  // ボイボ寮デザイン用のヘッダーを超えたらホムペ用のヘッダーを表示する
  const headerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!headerRef.current) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setShowingHeader(!entry.isIntersecting)
      })
    })
    observer.observe(headerRef.current)
  }, [headerRef])

  return <></>
}

/**
 * ボイボ寮とVOICEVOXをちょっとだけ紹介するコンポーネント
 */
export const DormitoryExplainComponent: React.FC<{
  showingDormitoryPageButton?: boolean
}> = ({ showingDormitoryPageButton = false }) => {
  return (
    <section className="section py-5">
      <div className="container has-text-centered py-5 is-flex is-flex-direction-column">
        <h2 className="title is-4">ボイボ寮とは</h2>
        <p className="is-size-6">
          VOICEVOX
          のキャラたちの設定があると動画制作の参考になるかと思って用意した世界観です。
        </p>
        <p className="is-size-6">
          必ずしも遵守する必要はなく、自由に改変して頂いても問題ありません。
        </p>
        {showingDormitoryPageButton && (
          <Link
            to="/dormitory/"
            className="button is-align-self-center mt-5 is-normal is-rounded"
            type="button"
            role={"button"}
          >
            <span>ボイボ寮ページへ</span>
          </Link>
        )}
      </div>

      <div className="container has-text-centered py-5 is-flex is-flex-direction-column">
        <h2 className="title is-4">VOICEVOX とは</h2>
        <p className="is-size-6">
          無料で使える中品質なテキスト読み上げソフトウェアです。
        </p>
        <p className="is-size-6">
          商用・非商用問わず無料で、イントネーションの詳細な調整ができることが特徴です。
        </p>
        <Link
          to={"/"}
          className="button is-align-self-center mt-5 is-primary is-rounded"
          type="button"
          role={"button"}
        >
          <span className="has-text-weight-semibold">ダウンロード</span>
        </Link>
      </div>
    </section>
  )
}

export default () => {
  const [showingHeader, setShowingHeader] = useState(false)
  return (
    <Page showingHeader={showingHeader} showingHeaderOnTop={false}>
      <Dormitory setShowingHeader={setShowingHeader} />
    </Page>
  )
}
