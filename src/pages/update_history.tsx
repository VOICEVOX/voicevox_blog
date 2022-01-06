import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"
import shareThumb from "../images/landing-share-thumb.jpg"

export default () => {
  const data: {
    allUpdateInfosJson: {
      edges: [
        {
          node: {
            version: string
            descriptions: Array<string>
            contributors: Array<string>
          }
        }
      ]
    }
  } = useStaticQuery(graphql`
    query {
      allUpdateInfosJson {
        edges {
          node {
            version
            descriptions
            contributors
          }
        }
      }
    }
  `)
  const events = data.allUpdateInfosJson.edges.map(edge => {
    return edge.node
  })
  return (
    <Page>
      <Seo
        title="VOICEVOX | 無料で使える中品質なテキスト読み上げソフトウェア"
        description="無料で使える中品質なテキスト読み上げソフトウェア"
        image={shareThumb}
      />
      <section className="section py-0">
        <div className="container is-max-desktop">
          <div className="update-history my-5">
            <h1 className="title">アップデート履歴</h1>
            {events.map((e, index) => (
              <>
                <div key={index}>
                  <h2 className="subtitle is-4">ver {e.version}</h2>
                  <ul>
                    {e.descriptions.map((d, index) => (
                      <li key={index}>{d}</li>
                    ))}
                  </ul>
                  <h3 className="title is-5">貢献者リスト</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: e.contributors.join(" / "),
                    }}
                  />
                </div>
                {events.length !== index + 1 && <hr />}
              </>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
