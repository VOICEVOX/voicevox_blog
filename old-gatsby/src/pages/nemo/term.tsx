import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import "../../components/layout.scss"
import { Page } from "../../components/page"
import Seo from "../../components/seo"
import shareThumb from "../../images/nemo/share-thumbnail.png"

export default () => {
  const html = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/nemoReadme/" }) {
        html
      }
    }
  `).markdownRemark.html
  return (
    <Page isNemo={true}>
      <Seo
        title="Nemo 利用規約 | VOICEVOX"
        description="VOICEVOX Nemoの利用規約です"
        image={shareThumb}
      />
      <main className="nemo">
        <section className="section" style={{ backgroundColor: "#000c" }}>
          <div className="container is-max-desktop">
            <h1 className="title">VOICEVOX Nemo 利用規約</h1>
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </section>
      </main>
    </Page>
  )
}
