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

// FIXME: Row
function Column({
  characterKey,
}: {
  characterKey: CharacterKey
}): ReactElement {
  const { characterInfos, callNameInfos } = useDetailedCharacterInfo()
  const { characterKeys } = useContext(CharacterContext)

  const [selectedCallName, setSelectedCallName] = useState<string>()
  const [showCopiedIcon, setShowCopiedIcon] = useState(false)

  const callNameInfo = callNameInfos[characterKey]
  const characterInfo = characterInfos[characterKey]
  const outlineStyle: CSSProperties = {
    outlineColor: characterInfo.color,
  }

  useEffect(() => {
    if (selectedCallName == undefined) return

    const timer = setTimeout(() => {
      setShowCopiedIcon(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [showCopiedIcon, selectedCallName])

  function copyToClipboard(event: MouseEvent<HTMLInputElement>): void {
    const callName = event.currentTarget.innerText

    setSelectedCallName(callName)
    navigator.clipboard.writeText(callName)
    setShowCopiedIcon(true)
  }

  function Cell({
    callName,
    externalClassName,
  }: {
    callName: string
    externalClassName?: string
  }): ReactElement {
    const isSelected = selectedCallName === callName && showCopiedIcon

    return (
      <p
        className={externalClassName}
        onClick={copyToClipboard}
        style={outlineStyle}
        title={`クリックして呼称をコピー：「${callName}」`}
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
                if (_characterKey === characterKey) {
                  return callNameInfo.me.map(part => (
                    <Cell
                      key={`me-${part}`}
                      callName={part}
                      externalClassName="me"
                    />
                  ))
                }

                if (callName == undefined) {
                  return (
                    <p
                      key={`${_characterKey}-unknown`}
                      className="unknown"
                      style={outlineStyle}
                    >
                      ？
                    </p>
                  )
                }

                return callName
                  .split("/")
                  .map(part => (
                    <Cell key={`${_characterKey}-${part}`} callName={part} />
                  ))
              })()}
            </div>
          </td>
        )
      })}
      <td className="you">
        <div>
          {callNameInfo.you.map(part => (
            <Cell key={`you-${part}`} callName={part} />
          ))}
        </div>
      </td>
    </>
  )
}

export default function CallNamesPage() {
  const { characterInfos } = useDetailedCharacterInfo()
  const { characterKeys } = useContext(CharacterContext)

  function CharacterImage({
    characterKey,
  }: {
    characterKey: CharacterKey
  }): ReactElement {
    const characterInfo = characterInfos[characterKey]
    return (
      <img
        src={getSrc(characterInfo.bustupImage)}
        srcSet={getSrcSet(characterInfo.bustupImage)}
        alt={characterInfo.name}
      />
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
                        <CharacterImage characterKey={characterKey} />
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

                return (
                  <tr key={characterKey} style={{ backgroundColor }}>
                    <th
                      style={{
                        backgroundColor,
                      }}
                    >
                      <Link to={`/dormitory/${characterInfo.id}/`}>
                        <CharacterImage characterKey={characterKey} />
                        <p
                          style={{
                            color: characterInfo.color,
                          }}
                        >
                          {characterInfo.name}
                        </p>
                      </Link>
                    </th>
                    <Column characterKey={characterKey} />
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
