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

function rgba2rgb(
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
        style={{
          borderColor: characterInfo.color,
          height: "50px",
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

      if (characterKey === _characterKey) return <td key={_characterKey} />

      return (
        <td key={_characterKey}>
          {callName ? (
            callNameSplit.map((part, index) => (
              <span key={index}>
                {part}
                {index !== callNameSplit.length - 1 ? <br /> : ""}
              </span>
            ))
          ) : (
            <span className="unknown">?</span>
          )}
        </td>
      )
    })
  }

  return (
    <Page>
      <div className="call-name">
        <table border={1}>
          <thead>
            <tr>
              <th className="origin"></th>
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
              const [_red, _green, _blue, _alpha] = hex2rgba(
                characterInfo.lightColor,
                0.5
              )
              const [red, green, blue] = rgba2rgb(_red, _green, _blue, _alpha)

              console.log([_red, _green, _blue, _alpha], [red, green, blue])

              return (
                <tr
                  key={characterKey}
                  style={{
                    background: `rgb(${red}, ${green}, ${blue})`,
                  }}
                >
                  <th
                    style={{
                      background: `rgb(${red}, ${green}, ${blue})`,
                    }}
                  >
                    {getCharacterImage(characterKey)}
                    {characterInfo.name}
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
