import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"
import shareThumb from "../images/landing-share-thumb.jpg"

export default () => {
  const html = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/howToUse/" }) {
        html
      }
    }
  `).markdownRemark.html
  return (
    <Page>
      <Seo
        title="使い方 | VOICEVOX"
        description="VOICEVOXソフトウェアの使い方です"
        image={shareThumb}
      />
      <section className="section">
        <div className="container is-max-desktop">
          <h1 className="title">使い方</h1>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </Page>
  )
}
