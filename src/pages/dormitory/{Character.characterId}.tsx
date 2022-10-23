import React, { useLayoutEffect } from "react"
import DormitoryCharacterModal from "../../components/dormitoryCharacterModal"
import Seo from "../../components/seo"
import { characterKeys } from "../../constants"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import { CharacterKey } from "../../types/dormitoryCharacter"

export default (props: { params: { characterId: string } }) => {
  const characterId: string = props.params.characterId

  const { characterInfos, generationInfos } = useDetailedCharacterInfo()

  const selectedCharacterInfoEntry = Object.entries(characterInfos).find(
    ([, characterInfo]) => characterInfo?.id === characterId
  )
  const selectedCharacterKey = selectedCharacterInfoEntry![0] as CharacterKey
  const selectedCharacterInfo = characterInfos[selectedCharacterKey]

  const hideCharacterModal = () => {
    location.assign("/dormitory")
  }

  useLayoutEffect(() => {
    document.documentElement.classList.add("is-clipped")
  }, [])

  return (
    <>
      <Seo
        title={`${selectedCharacterInfo?.name} | ボイボ寮 | VOICEVOX`}
        description={selectedCharacterInfo?.description}
        image={selectedCharacterInfo?.bustupImage.images.fallback?.src}
      />
      <DormitoryCharacterModal
        isActive
        hide={hideCharacterModal}
        characterKey={selectedCharacterKey}
        characterKeys={characterKeys}
        characterInfos={characterInfos}
        generationInfos={generationInfos}
      />
    </>
  )
}
