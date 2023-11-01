import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"
import shareThumb from "../images/landing-share-thumb.jpg"

export default () => {
  const html = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/softwareReadme/" }) {
        html
      }
    }
  `).markdownRemark.html
  return (
    <Page>
      <Seo
        title="利用規約 | VOICEVOX"
        description="VOICEVOXソフトウェアの利用規約です"
        image={shareThumb}
      />
      <section className="section">
        <div className="container is-max-desktop">
          <h1 className="title">VOICEVOX ソフトウェア 利用規約</h1>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </Page>
  )
}
