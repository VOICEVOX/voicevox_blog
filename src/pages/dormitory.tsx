import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React, { useEffect, useRef, useState } from "react"
import DormitoryCharacterCard from "../components/dormitoryCharacterCard"
import DormitoryCharacterModal from "../components/dormitoryCharacterModal"
import DormitoryTopIllustContainer from "../components/dormitoryTopIllustContainer"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"
import { characterKeys } from "../constants"
import { useDetailedCharacterInfo } from "../hooks/useDetailedCharacterInfo"
import shareThumb from "../images/dormitory/top-illusts/top-illust-002.png"
import { CharacterKey } from "../types/dormitoryCharacter"

type DormitoryProps = {
  setShowingHeader: (show: boolean) => void
  initialSelectedCharacterKey?: CharacterKey
}

const Dormitory: React.FC<DormitoryProps> = ({
  setShowingHeader,
  initialSelectedCharacterKey,
}) => {
  const { characterInfos, generationInfos } = useDetailedCharacterInfo()

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

  // キャラクターモーダル
  // 寮生個別ページを開いていたら初期値はtrue
  const [showingCharacterModal, setShowingCharacterModal] = useState(
    initialSelectedCharacterKey !== undefined
  )
  const [selectedCharacterKey, setSelectedCharacterKey] = useState<
    CharacterKey | undefined
  >(initialSelectedCharacterKey)

  useEffect(() => {
    if (showingCharacterModal) {
      document.documentElement.classList.add("is-clipped")
    } else {
      document.documentElement.classList.remove("is-clipped")
    }
  }, [showingCharacterModal])

  const showCharacterModal = (characterKey: CharacterKey) => {
    const characterId = characterInfos[characterKey]?.id
    window.history.replaceState({}, "", `/dormitory/${characterId}`)
    setSelectedCharacterKey(characterKey)
    setShowingCharacterModal(true)
  }
  const hideCharacterModal = () => {
    window.history.replaceState({}, "", `/dormitory`)
    setShowingCharacterModal(false)

    // モーダルを閉じたら該当キャラクターの位置までスクロールする
    if (selectedCharacterKey) {
      const dom = document.querySelector(
        `img[alt='${characterInfos[selectedCharacterKey]?.name}']`
      )
      if (dom) {
        // キャラクターカードが既に画面内に表示されていた場合はスクロールしない
        const { top, bottom } = dom.getBoundingClientRect()
        const htmlHeight = document.documentElement.clientHeight
        const inView = 0 < bottom && top < htmlHeight

        if (!inView) dom.scrollIntoView({ block: "center" })
      }
    }
  }

  const selectedCharacterInfo = selectedCharacterKey
    ? characterInfos[selectedCharacterKey]
    : undefined

  return (
    <>
      {showingCharacterModal && selectedCharacterKey ? (
        <Seo
          title={`${selectedCharacterInfo?.name} | ボイボ寮 | VOICEVOX`}
          description={selectedCharacterInfo?.description}
          image={selectedCharacterInfo?.bustupImage.images.fallback?.src}
        />
      ) : (
        <Seo
          title="ボイボ寮 | VOICEVOX"
          description="とある世界の不思議な建物、ボイボ寮。ここでは個性豊かな住民たちが暮らしています。"
          image={shareThumb}
        />
      )}

      <div className="dormitory">
        <header ref={headerRef} className="hero is-small">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-2">ボイボ寮の住民たち</h1>
            </div>
          </div>
        </header>

        <section className="section py-0">
          <div className="container is-max-desktop">
            <StaticImage
              src="../images/dormitory/top-illusts/top-illust-002.png"
              alt="トップイラスト"
            />
          </div>
          <div className="container is-max-desktop has-text-centered is-size-5 py-6">
            <p>とある世界の不思議な建物、ボイボ寮。</p>
            <p>ここでは個性豊かな住民たちが暮らしています。</p>
          </div>
        </section>

        <main className="section py-0">
          <div className="container character-container is-max-desktop pt-1 pb-6">
            <div className="columns is-multiline">
              <div className="column is-2 generation-label">
                <h2 className="title is-3">5 期 生</h2>
              </div>

              <DormitoryCharacterCard
                characterInfo={characterInfos.WhiteCUL}
                onClick={() => showCharacterModal("WhiteCUL")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.後鬼}
                onClick={() => showCharacterModal("後鬼")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.No7}
                onClick={() => showCharacterModal("No7")}
              />
            </div>

            <hr />

            <div className="columns is-multiline">
              <div className="column is-2 generation-label">
                <h2 className="title is-3">4 期 生</h2>
              </div>

              <DormitoryCharacterCard
                characterInfo={characterInfos.モチノキョウコ}
                onClick={() => showCharacterModal("モチノキョウコ")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.剣崎雌雄}
                onClick={() => showCharacterModal("剣崎雌雄")}
              />
            </div>

            <hr />

            <div className="columns is-multiline">
              <div className="column is-2 generation-label">
                <h2 className="title is-3">3 期 生</h2>
              </div>

              <DormitoryCharacterCard
                characterInfo={characterInfos.玄野武宏}
                onClick={() => showCharacterModal("玄野武宏")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.白上虎太郎}
                onClick={() => showCharacterModal("白上虎太郎")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.青山龍星}
                onClick={() => showCharacterModal("青山龍星")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.冥鳴ひまり}
                onClick={() => showCharacterModal("冥鳴ひまり")}
                className="is-offset-2"
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.九州そら}
                onClick={() => showCharacterModal("九州そら")}
              />
            </div>

            <hr />

            <div className="columns is-multiline">
              <div className="column is-2 generation-label">
                <h2 className="title is-3">2 期 生</h2>
              </div>

              <DormitoryCharacterCard
                characterInfo={characterInfos.春日部つむぎ}
                onClick={() => showCharacterModal("春日部つむぎ")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.雨晴はう}
                onClick={() => showCharacterModal("雨晴はう")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.波音リツ}
                onClick={() => showCharacterModal("波音リツ")}
              />
            </div>

            <hr />

            <div className="columns is-multiline">
              <div className="column is-2 generation-label">
                <h2 className="title is-3">1 期 生</h2>
              </div>

              <DormitoryCharacterCard
                characterInfo={characterInfos.四国めたん}
                onClick={() => showCharacterModal("四国めたん")}
              />
              <DormitoryCharacterCard
                characterInfo={characterInfos.ずんだもん}
                onClick={() => showCharacterModal("ずんだもん")}
              />

              <div className="tile is-parent is-3 tohoku">
                <div className="tile is-child">
                  <h3 className="title is-4">仲良し</h3>
                  <a href="https://zunko.jp/" target="_blank" rel="noreferrer">
                    <div className="is-flex">
                      <StaticImage
                        className="tile is-child"
                        src="../images/icon-kiritan.png"
                        alt="東北きりたん"
                        width={128}
                      />
                      <StaticImage
                        className="tile is-child"
                        src="../images/icon-zunko.png"
                        alt="東北ずん子"
                        width={128}
                      />
                      <StaticImage
                        className="tile is-child"
                        src="../images/icon-itako.png"
                        alt="東北イタコ"
                        width={128}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

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

        <section className="section py-5">
          <DormitoryTopIllustContainer />
        </section>
      </div>
      {selectedCharacterKey && (
        <DormitoryCharacterModal
          isActive={showingCharacterModal}
          hide={hideCharacterModal}
          characterKey={selectedCharacterKey}
          characterKeys={characterKeys}
          characterInfos={characterInfos}
          generationInfos={generationInfos}
        />
      )}
    </>
  )
}

export default ({ pageContext: { initialSelectedCharacterKey } }) => {
  const [showingHeader, setShowingHeader] = useState(false)
  return (
    <Page showingHeader={showingHeader}>
      <Dormitory
        setShowingHeader={setShowingHeader}
        initialSelectedCharacterKey={initialSelectedCharacterKey}
      />
    </Page>
  )
}
