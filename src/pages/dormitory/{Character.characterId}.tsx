import { navigate, PageProps } from "gatsby"
import React from "react"
import DormitoryCharacterModal from "../../components/dormitoryCharacterModal"
import Seo from "../../components/seo"
import { characterKeys } from "../../constants"
import { useDetailedCharacterInfo } from "../../hooks/useDetailedCharacterInfo"
import { CharacterKey } from "../../types/dormitoryCharacter"

export default ({
  location,
  params,
}: PageProps<null, null, { fromDormitory?: boolean }>) => {
  const characterId: string = params.characterId

  const { characterInfos, callNameInfos, generationInfos } =
    useDetailedCharacterInfo()

  const selectedCharacterInfoEntry = Object.entries(characterInfos).find(
    ([, characterInfo]) => characterInfo?.id === characterId
  )
  const selectedCharacterKey = selectedCharacterInfoEntry![0] as CharacterKey
  const selectedCharacterInfo = characterInfos[selectedCharacterKey]

  const hideCharacterModal = () => {
    if (location.state?.fromDormitory) {
      // ボイボ寮ページから遷移した場合はスクロール位置保持のため戻るを使う
      navigate(-1)
    } else {
      // 検索流入や共有されたページから直接飛んだ場合は戻れないのでボイボ寮ページのurlを指定
      navigate("/dormitory/")
    }
  }

  return (
    <>
      <Seo
        title={`${selectedCharacterInfo?.name} | ボイボ寮 | VOICEVOX`}
        description={selectedCharacterInfo?.description}
        image={selectedCharacterInfo?.ogpImage.images.fallback?.src}
      />
      <DormitoryCharacterModal
        isActive
        hide={hideCharacterModal}
        characterKey={selectedCharacterKey}
        characterKeys={characterKeys}
        characterInfos={characterInfos}
        callNameInfos={callNameInfos}
        generationInfos={generationInfos}
      />
    </>
  )
}
