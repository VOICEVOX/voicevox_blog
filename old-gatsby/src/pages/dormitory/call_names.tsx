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
    )
  }

  return (
    <>
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
  )
}
