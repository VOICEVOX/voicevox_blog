import { Page } from "../../components/page"
import React, { ReactElement, useContext } from "react"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import { CharacterContext } from "../../contexts/context"
import { CharacterKey } from "../../types/dormitoryCharacter"

const hex2rgba = (hex: string, alpha = 1) => {
  const match = hex.match(/\w\w/g)

  if (!match) throw new Error("Invalid hex")

  const [r, g, b] = match.map(x => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

export default function CallNamePage() {
  const { characterInfos, callNameInfos } = useDetailedCharacterInfo()
  const { characterKeys } = useContext(CharacterContext)
  console.log(characterInfos, characterKeys)

  const getColumnRGB = (characterKey: CharacterKey): string =>
    characterInfos[characterKey].lightColor

  function getColumn(characterKey: CharacterKey): ReactElement[] {
    return characterKeys.map(_characterKey => {
      const characterInfo = characterInfos[_characterKey]
      const callNameInfo = callNameInfos[characterKey]

      const callName = callNameInfo[_characterKey]
      const callNameSplit = callName ? callName.split("/") : []

      return (
        <td key={_characterKey} style={{ verticalAlign: "middle" }}>
          {callName &&
            callNameSplit.map((part, index) => (
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
      <div
        style={{
          padding: "20px",
          width: "200%",
          overflow: "auto",
        }}
      >
        <table
          border={1}
          style={{
            tableLayout: "fixed",
            width: "100%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th></th>
              {characterKeys.map(characterKey => {
                const characterInfo = characterInfos[characterKey]
                return (
                  <th
                    key={characterKey}
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    {characterInfo.name}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {characterKeys.map(characterKey => {
              const characterInfo = characterInfos[characterKey]
              return (
                <tr
                  key={characterKey}
                  style={{
                    backgroundColor: hex2rgba(getColumnRGB(characterKey), 0.5),
                  }}
                >
                  <td
                    height={40}
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    {characterInfo.name}
                  </td>
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
