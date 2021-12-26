import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import ModalMarkdown from "./modalMarkdown"

export const ModalHowToUse: React.FC<{ isActive: boolean; hide: () => void }> =
  props => {
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
