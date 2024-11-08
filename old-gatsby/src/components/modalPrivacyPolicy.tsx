import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import ModalMarkdown from "./modalMarkdown"

export default (props: { isActive: boolean; hide: () => void }) => {
  const html = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/privacyPolicy/" }) {
        html
      }
    }
  `).markdownRemark.html
  return (
    <ModalMarkdown
      title="プライバシーポリシー"
      html={html}
      isActive={props.isActive}
      hide={props.hide}
    />
  )
}
