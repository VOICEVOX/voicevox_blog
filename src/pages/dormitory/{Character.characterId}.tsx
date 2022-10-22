import React from "react"
import { characterInfos } from "../../constants"
import Dormitory from "../dormitory"

export default (props: { params: { characterId: string } }) => {
  const characterId: string = props.params.characterId
  const selectedCharacterInfo = Object.entries(characterInfos).find(
    ([, characterInfo]) => characterInfo.id === characterId
  )
  const selectedCharacterKey = selectedCharacterInfo?.[0]

  return (
    <Dormitory
      pageContext={{ initialSelectedCharacterKey: selectedCharacterKey }}
    />
  )
}
