import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import "../components/layout.scss"
import { Page } from "../components/page"
import Seo from "../components/seo"

export default () => {
  const data: Queries.ResultYamlQuery = useStaticQuery(graphql`
    query ResultYaml {
      allResultYaml {
        edges {
          node {
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  width: 640
                  aspectRatio: 1.77777777778
                  backgroundColor: "#00000019"
                )
              }
            }
            title
            description
          }
        }
      }
    }
  `)
  const events = data.allResultYaml.edges.map(edge => {
    return edge.node
  })

  const assertImageExist = (event: typeof events[0]) => {
    const image = event?.thumbnail?.childImageSharp?.gatsbyImageData
    if (image == undefined) {
      throw new Error(`画像が存在しません: ${event.title}`)
    }
    return image
  }

  return (
    <Page>
      <Seo
        title="実績・活用事例 | VOICEVOX"
        description="VOICEVOXソフトウェアの実績・活用事例です"
        // image={shareThumb}
      />
      <section className="section">
        <div className="container is-max-desktop">
          <div className="result">
            <h1 className="title">実績・活用事例</h1>
            {events.map((e, index) => (
              <>
                <div key={index}>
                  <h2 className="subtitle is-4">{e.title}</h2>
                  <GatsbyImage
                    alt={`${e.title}のサムネイル画像`}
                    image={assertImageExist(e)}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
