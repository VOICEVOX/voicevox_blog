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

export default () => {
  const [showingHeader, setShowingHeader] = useState(false)
  return (
    <Page showingHeader={showingHeader} showingHeaderOnTop={false}>
      <Dormitory setShowingHeader={setShowingHeader} />
    </Page>
  )
}
