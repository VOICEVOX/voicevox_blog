import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import ModalMarkdown from "./modalMarkdown"

export default (props: { isActive: boolean; hide: () => void }) => {
  const html = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/libraryReadmeHau/" }) {
        html
      }
    }
  `).markdownRemark.html

  return (
    <ModalMarkdown
      title="雨晴はう 利用規約"
      html={html}
      isActive={props.isActive}
      hide={props.hide}
    />
  )
}
