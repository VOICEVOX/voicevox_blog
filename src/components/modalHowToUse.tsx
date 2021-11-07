import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import ModalMarkdown from "./modalMarkdown"

export default (props: { isActive: boolean; hide: () => void }) => {
  const html = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/howToUse/" }) {
        html
      }
    }
  `).markdownRemark.html
  return (
    <ModalMarkdown
      title="使い方"
      html={html}
      isActive={props.isActive}
      hide={props.hide}
      className="modal-how-to-use"
    />
  )
}
