import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { useDetailedCharacterInfo } from "../hooks/useDetailedCharacterInfo"
import { CharacterKey } from "../types/dormitoryCharacter"
import ModalMarkdown from "./modalMarkdown"

export default (
  props:
    | {
        isActive: true
        hide: () => void
        characterKey: CharacterKey
      }
    | {
        isActive: false
        hide: () => void
        characterKey: undefined
      }
) => {
  const query: {
    template: { html: string }
    ryusei: { html: string }
    kyoko: { html: string }
    goki: { html: string }
    seven: { html: string }
  } = useStaticQuery(graphql`
    query {
      template: markdownRemark(
        fileAbsolutePath: { regex: "/libraryReadmeTemplate/" }
      ) {
        html
      }
      ryusei: markdownRemark(
        fileAbsolutePath: { regex: "/libraryReadmeRyusei/" }
      ) {
        html
      }
      kyoko: markdownRemark(
        fileAbsolutePath: { regex: "/libraryReadmeKyoko/" }
      ) {
        html
      }
      goki: markdownRemark(fileAbsolutePath: { regex: "/libraryReadmeGoki/" }) {
        html
      }
      seven: markdownRemark(
        fileAbsolutePath: { regex: "/libraryReadmeSeven/" }
      ) {
        html
      }
    }
  `)

  const { characterInfos } = useDetailedCharacterInfo()

  let title = ""
  let html = ""

  if (props.characterKey) {
    const characterInfo = characterInfos[props.characterKey]
    if (!characterInfo)
      throw new Error(`characterInfo is undefined. (${props.characterKey})`)

    title = `${characterInfo.name}` + " 利用規約"

    if (props.characterKey == "青山龍星") {
      html = query.ryusei.html
    } else if (props.characterKey == "モチノキョウコ") {
      html = query.kyoko.html
    } else if (props.characterKey == "後鬼") {
      html = query.goki.html
    } else if (props.characterKey == "No7") {
      html = query.seven.html
    } else {
      if (!characterInfo.policyUrl) {
        html = "<p>準備中</p>"
      } else {
        html = query.template.html
          .replaceAll("VV_TEMPLATE_CHARACTER_NAME", characterInfo.name)
          .replaceAll("VV_TEMPLATE_POLICY_URL", characterInfo.policyUrl)
      }
    }
  }

  return (
    <ModalMarkdown
      title={title}
      html={html}
      isActive={props.isActive}
      hide={props.hide}
    />
  )
}
