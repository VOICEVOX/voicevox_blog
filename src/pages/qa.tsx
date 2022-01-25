import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"

export default () => {
  const html = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/qAndA/" }) {
        html
      }
    }
  `).markdownRemark.html
  return (
    <Page>
      <Seo
        title="Q&A | VOICEVOX"
        description="VOICEVOX Q&A"
        // image={shareThumb}
      />
      <section className="section">
        <div
          className="container is-max-desktop markdown qa"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </section>
    </Page>
  )
}
