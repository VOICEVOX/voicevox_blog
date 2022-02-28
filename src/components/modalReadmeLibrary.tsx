import { graphql, useStaticQuery } from "gatsby"
import React, { useContext } from "react"
import { CharacterContext } from "../contexts/context"
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
    }
  `)

  const { characterInfos } = useContext(CharacterContext)

  let title = ""
  let html = ""

  if (props.characterKey) {
    const characterInfo = characterInfos[props.characterKey]

    title = `${characterInfo.name}` + " 利用規約"

    if (props.characterKey == "青山龍星") {
      html = query.ryusei.html
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
