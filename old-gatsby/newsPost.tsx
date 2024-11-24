import { graphql } from "gatsby"
import React from "react"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"
import  shareThumb from "../images/landing-share-news-thumb.jpg"

const NewsPost = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Page>
      <Seo
        title={`${frontmatter.title} | ニュース | VOICEVOX`}
        description="無料で使える中品質なテキスト読み上げ・歌声合成ソフトウェア。商用・非商用問わず無料で、誰でも簡単にお使いいただけます。イントネーションを詳細に調整することも可能です。"
        noindex={true} // TODO: リリース時に外す
        image={shareThumb}
      />
      <section className="section">
        <div className="container is-max-desktop">
          <h1 className="title">{frontmatter.title}</h1>
          <p className="has-text-grey-light">{frontmatter.date}</p>
          <div
            className="markdown mt-5"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </Page>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        date(formatString: "YYYY/MM/DD")
      }
    }
  }
`

export default NewsPost
