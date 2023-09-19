import { Page } from "../../../components/page"
import React, { ReactElement, useContext } from "react"
import { useDetailedCharacterInfo } from "../../../hooks/useDetailedCharacterInfo"
import { CharacterContext } from "../../../contexts/context"
import { CharacterKey } from "../../../types/dormitoryCharacter"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import Seo from "../../../components/seo"

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

export default function CallNamePage() {
  const { characterInfos, callNameInfos } = useDetailedCharacterInfo()
  const { characterKeys } = useContext(CharacterContext)

  function getCharacterImage(characterKey: CharacterKey): ReactElement {
    const characterInfo = characterInfos[characterKey]
    return (
      <GatsbyImage
        image={characterInfo.bustupImage}
        alt={characterInfo.name}
        imgStyle={{ width: "50px" }}
        style={{
          width: "50px",
          aspectRatio: "1/1",
        }}
        objectFit="contain"
      />
    )
  }

  function getColumn(characterKey: CharacterKey): ReactElement[] {
    const callNameInfo = callNameInfos[characterKey]

    return characterKeys.map(_characterKey => {
      const callName = callNameInfo[_characterKey]

      return (
        <td key={_characterKey}>
          {(() => {
            if (characterKey === _characterKey) {
              return callNameInfo.me.map(part => (
                <p key={part} className="me">
                  {part}
                </p>
              ))
            }

            if (callName == undefined) {
              return <p className="unknown">?</p>
            }

            return callName.split("/").map(part => <p key={part}>{part}</p>)
          })()}
        </td>
      )
    })
  }

  return (
    <Page showingHeaderOnTop={true}>
      <Seo
        title={`キャラクターの呼称表 | ボイボ寮 | VOICEVOX`}
        description={
          "ボイボ寮のキャラクターの呼び方一覧表です。必ずしも遵守する必要はなく、自由に改変して頂いても問題ありません。"
        }
      />

      <div className="call-names-wrapper">
        <section>
          <h1 className="title">キャラクターの呼称表</h1>
          <p>
            ボイボ寮のキャラクターの呼び方一覧表です。必ずしも遵守する必要はなく、自由に改変して頂いても問題ありません。
          </p>
        </section>
        <div className="call-names">
          <table border={1}>
            <thead>
              <tr>
                <th className="you">
                  <p>全員</p>
                  <p>(二人称)</p>
                </th>
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
                        <p>{characterInfo.name}</p>
                      </Link>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {characterKeys.map(characterKey => {
                const characterInfo = characterInfos[characterKey]
                const callNameInfo = callNameInfos[characterKey]

                // 色を半透明するとセルが重なったとき, スクロール時にセルが
                // 透けて見えてしまうので, 白地での RGB に変換する
                const [red, green, blue] = rgba2rgbOnWhite(
                  ...hex2rgba(characterInfo.lightColor, 0.4)
                )
                const backgroundColor = `rgb(${red}, ${green}, ${blue})`

                return (
                  <tr key={characterKey} style={{ backgroundColor }}>
                    <td className="you">
                      {callNameInfo.you.map(callName => (
                        <p>{callName}</p>
                      ))}
                    </td>
                    <th
                      style={{
                        backgroundColor,
                      }}
                    >
                      <Link to={`/dormitory/${characterInfo.id}/`}>
                        {getCharacterImage(characterKey)}
                        <p>{characterInfo.name}</p>
                      </Link>
                    </th>
                    {getColumn(characterKey)}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  )
}
