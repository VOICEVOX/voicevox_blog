import { Page } from "../../components/page"
import React, { ReactElement, useContext } from "react"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import { CharacterContext } from "../../contexts/context"
import { CharacterKey } from "../../types/dormitoryCharacter"
import { GatsbyImage } from "gatsby-plugin-image"

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
  console.log(characterInfos, characterKeys)

  function getCharacterImage(characterKey: CharacterKey): ReactElement {
    const characterInfo = characterInfos[characterKey]
    return (
      <GatsbyImage
        image={characterInfo.bustupImage}
        alt={characterInfo.name}
        imgStyle={{ width: "50px" }}
        style={{
          borderColor: characterInfo.color,
          width: "50px",
          aspectRatio: "1/1",
        }}
        objectFit="contain"
      />
    )
  }

  function getColumn(characterKey: CharacterKey): ReactElement[] {
    return characterKeys.map(_characterKey => {
      const characterInfo = characterInfos[_characterKey]
      const callNameInfo = callNameInfos[characterKey]

      const callName = callNameInfo[_characterKey]
      const callNameSplit = callName ? callName.split("/") : []

      if (characterKey === _characterKey) {
        return (
          <td key={_characterKey}>
            <span className="same">
              {callNameInfo.me.map((part, index) => (
                <span key={index}>
                  {part}
                  {index !== callNameSplit.length - 1 ? <br /> : ""}
                </span>
              ))}
            </span>
          </td>
        )
      }

      if (callName == undefined) {
        return (
          <td key={_characterKey}>
            <span className="unknown">?</span>
          </td>
        )
      }

      return (
        <td key={_characterKey}>
          {callNameSplit.map((part, index) => (
            <span key={index}>
              {part}
              {index !== callNameSplit.length - 1 ? <br /> : ""}
            </span>
          ))}
        </td>
      )
    })
  }

  return (
    <Page>
      <section style={{ padding: "20px" }}>
        <h1 className="title">キャラクターの呼称表</h1>
        <p>
          ボイボ寮のキャラクターの呼び方一覧表です。必ずしも遵守する必要はなく、自由に改変して頂いても問題ありません。
        </p>
      </section>
      <div className="call-name">
        <table border={1}>
          <thead>
            <tr>
              <th className="origin">
                <span>誰が</span>
                <span>誰を</span>
                <div />
              </th>
              {characterKeys.map(characterKey => {
                const characterInfo = characterInfos[characterKey]
                return (
                  <th key={characterKey}>
                    {getCharacterImage(characterKey)}
                    <br />
                    {characterInfo.name}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {characterKeys.map(characterKey => {
              const characterInfo = characterInfos[characterKey]

              // 色を半透明するとセルが重なったとき, スクロール時にセルが
              // 透けて見えてしまうので, 白地での RGB に変換する
              const [red, green, blue] = rgba2rgbOnWhite(
                ...hex2rgba(characterInfo.lightColor, 0.5)
              )
              const backgroundColor = `rgb(${red}, ${green}, ${blue})`

              return (
                <tr key={characterKey} style={{ backgroundColor }}>
                  <th style={{ backgroundColor }}>
                    {getCharacterImage(characterKey)}
                    <p>{characterInfo.name}</p>
                  </th>
                  {getColumn(characterKey)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Page>
  )
}
