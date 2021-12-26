import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import ModalMarkdown from "./modalMarkdown"

export const ModalReadmeSoftware: React.FC<{
  isActive: boolean
  hide: () => void
}> = props => {
  const html = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/softwareReadme/" }) {
        html
      }
    }
  `).markdownRemark.html
  return (
    <ModalMarkdown
      title="ソフトウェア利用規約"
      html={html}
      isActive={props.isActive}
      hide={props.hide}
    />
  )
}
