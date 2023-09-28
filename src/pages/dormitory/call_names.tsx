import { Link } from "gatsby"
import { getSrc, getSrcSet } from "gatsby-plugin-image"
import React, {
  CSSProperties,
  ReactElement,
  useContext,
  MouseEvent,
  useState,
  useEffect,
} from "react"
import { Page } from "../../components/page"
import Seo from "../../components/seo"
import { CharacterContext } from "../../contexts/context"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import { CharacterKey } from "../../types/dormitoryCharacter"
import { DormitoryExplainComponent } from "../dormitory"
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function hex2rgba(hex: string, alpha = 1): [number, number, number, number] {
  const match = hex.match(/\w\w/g)
  if (!match) throw new Error("Invalid hex")
  const [red, green, blue] = match.map(x => parseInt(x, 16))
  return [red, green, blue, alpha]
}

function rgba2rgbOnWhite(
  red: number,
  green: number,
  blue: number,
  alpha: number
): [number, number, number] {
  const _red = Math.round((1 - alpha) * 255 + alpha * red)
  const _green = Math.round((1 - alpha) * 255 + alpha * green)
  const _blue = Math.round((1 - alpha) * 255 + alpha * blue)
  return [_red, _green, _blue]
}

export default function CallNamesPage() {
  const { characterInfos, callNameInfos } = useDetailedCharacterInfo()
  const { characterKeys } = useContext(CharacterContext)

  const [selectedCallName, setSelectedCallName] = useState<{
    characterKey: CharacterKey
    callName: string
  }>()

  const jump2characterColumn = async (): Promise<void> => {
    const urlAnchor = window.location.hash
    if (!urlAnchor.length) return

    window.scrollTo(0, 0)

    const characterKeyFromAnchor = urlAnchor.slice(1)
    const characterIdList = characterKeys.map(
      characterKey => characterInfos[characterKey].id
    )

    if (!characterIdList.includes(characterKeyFromAnchor)) {
      console.warn(`Unknown anchor: ${urlAnchor}`)
      return
    }

    const characterElem = document.getElementById(characterKeyFromAnchor)
    if (characterElem == null) {
      throw new Error("Character element not found")
    }

    // 該当列をハイライトする
    characterElem.classList.add("highlight")

    // 画面の中心にキャラクターが来るようにスクロール
    characterElem.scrollIntoView({ block: "center", behavior: "instant" })
    // 微妙に親スクロールの y 軸が動くので, もとに戻す
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    void jump2characterColumn()
  }, [])

  useEffect(() => {
    if (selectedCallName == null) return

    navigator.clipboard.writeText(selectedCallName.callName)

    const timer = setTimeout(() => {
      setSelectedCallName(undefined)
    }, 3000)

    // クリーンアップ; 他のセルのクリックでタイマークリア
    return () => {
      clearTimeout(timer)
    }
  }, [selectedCallName])

  function getCharacterImage(characterKey: CharacterKey): ReactElement {
    const characterInfo = characterInfos[characterKey]
    return (
      <img
        src={getSrc(characterInfo.bustupImage)}
        srcSet={getSrcSet(characterInfo.bustupImage)}
        alt={characterInfo.name}
      />
    )
  }

  function getColumn(characterKey: CharacterKey): ReactElement {
    const callNameInfo = callNameInfos[characterKey]
    const characterInfo = characterInfos[characterKey]

    const outlineStyle: CSSProperties = {
      outlineColor: characterInfo.color,
    }

    function copyToClipboard(event: MouseEvent<HTMLInputElement>): void {
      const callName = event.currentTarget.innerText

      setSelectedCallName({
        characterKey,
        callName,
      })
    }

    function getCell(
      characterKey: string,
      callName: string,
      externalClassName?: string
    ): ReactElement {
      const isSelected =
        selectedCallName?.characterKey === characterKey &&
        selectedCallName?.callName === callName

      return (
        <p
          key={callName}
          className={externalClassName}
          onClick={copyToClipboard}
          style={outlineStyle}
          title={`クリックして呼称をコピー: 「${callName}」`}
        >
          <span className={`icon ${isSelected ? "selected" : ""}`}>
            <FontAwesomeIcon
              icon={isSelected ? faCheck : faCopy}
              color={characterInfo.color}
            />
          </span>
          {callName}
        </p>
      )
    }

    return (
      <>
        {characterKeys.map(_characterKey => {
          const callName = callNameInfo[_characterKey]

          return (
            <td key={_characterKey}>
              <div>
                {(() => {
                  if (characterKey === _characterKey) {
                    return callNameInfo.me.map(part =>
                      getCell(characterKey, part, "me")
                    )
                  }

                  if (callName == undefined) {
                    return (
                      <p className="unknown" style={outlineStyle}>
                        ?
                      </p>
                    )
                  }

                  return callName
                    .split("/")
                    .map(part => getCell(characterKey, part))
                })()}
              </div>
            </td>
          )
        })}
        <td className="you">
          <div>{callNameInfo.you.map(part => getCell(characterKey, part))}</div>
        </td>
      </>
    )
  }

  return (
    <Page showingHeaderOnTop={true}>
      <Seo
        title={`ボイボ寮キャラクターの呼称表 | ボイボ寮 | VOICEVOX`}
        description={
          "ボイボ寮キャラクターの呼び方一覧表です。必ずしも遵守する必要はなく、自由に改変して頂いても問題ありません。"
        }
      />

      <div className="call-names-wrapper">
        <section className="section top-explain">
          <div className="container has-text-centered">
            <h1 className="title">ボイボ寮キャラクターの呼称表</h1>
            <p>
              <Link
                to="/dormitory/"
                className="has-text-weight-bold is-underlined"
              >
                ボイボ寮
              </Link>
              キャラクターの呼び方一覧表です。必ずしも遵守する必要はなく、自由に改変して頂いても問題ありません。
            </p>
          </div>
        </section>
        <main className="call-names">
          <table border={1}>
            <thead>
              <tr>
                <th className="origin">
                  <p>誰が</p>
                  <p>誰を</p>
                  <div />
                </th>

                {characterKeys.map(characterKey => {
                  const characterInfo = characterInfos[characterKey]
                  return (
                    <th key={characterKey}>
                      <Link to={`/dormitory/${characterInfo.id}/`}>
                        {getCharacterImage(characterKey)}
                        <p
                          style={{
                            color: characterInfo.color,
                          }}
                        >
                          {characterInfo.name}
                        </p>
                      </Link>
                    </th>
                  )
                })}
                <th className="you">
                  <p>全員</p>
                  <p>（二人称）</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {characterKeys.map(characterKey => {
                const characterInfo = characterInfos[characterKey]

                // 色を半透明するとセルが重なったとき, スクロール時にセルが
                // 透けて見えてしまうので, 白地での RGB に変換する
                const [red, green, blue] = rgba2rgbOnWhite(
                  ...hex2rgba(characterInfo.lightColor, 0.4)
                )
                const backgroundColor = `rgb(${red}, ${green}, ${blue})`
                const outlineColor = characterInfo.color

                return (
                  <tr
                    key={characterKey}
                    id={characterInfo.id}
                    style={{ backgroundColor, outlineColor }}
                  >
                    <th>
                      <Link to={`/dormitory/${characterInfo.id}/`}>
                        {getCharacterImage(characterKey)}
                        <p
                          style={{
                            color: characterInfo.color,
                          }}
                        >
                          {characterInfo.name}
                        </p>
                      </Link>
                    </th>
                    {getColumn(characterKey)}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>
      </div>

      <DormitoryExplainComponent showingDormitoryPageButton />
    </Page>
  )
}
