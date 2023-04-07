import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from "react"
import "../components/layout.scss"

export default ({ id }: { id: string }) => {
  const query: Queries.DormitoryEventContainerQuery = useStaticQuery(graphql`
    query DormitoryEventContainer {
      allDormitoryEventsYaml {
        edges {
          node {
            titles
            day
            link
          }
        }
      }
      allFile(filter: { absolutePath: { regex: "/event-thumbnail/" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `)

  // 過去のイベント
  const topIllusts: IGatsbyImageData[] = query.allFile.nodes
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(node => node.childImageSharp!.gatsbyImageData)
  const infos = query.allDormitoryEventsYaml.edges.map(edge => {
    if (
      edge.node.day == undefined ||
      edge.node.titles == undefined ||
      edge.node.link == undefined
    )
      throw new Error("イベント情報に不備があります")
    return {
      day: edge.node.day,
      titles: edge.node.titles.filter(
        (title): title is string => title != undefined
      ),
      link: edge.node.link,
    }
  })
  if (topIllusts.length !== infos.length) {
    throw new Error("イベントの数とサムネイルの数が一致しません")
  }
  const events = topIllusts.map((topIllust, index) => ({
    topIllust,
    ...infos[index],
  }))

  return (
    <>
      <div className="container top-illust-container has-text-centered py-5 is-flex is-flex-direction-column">
        <h2 id={id} className="jump-anchor-header-padding title is-4">
          <Link to={`#${id}`} className="has-text-black">
            過去のイベント
          </Link>
        </h2>
        <div className="columns is-multiline is-variable is-2 px-4">
          {
            // 過去のイベント
            events.map((event, index) => (
              <div className="column is-4" key={index}>
                <a
                  href={`${events[index].link}`}
                  className="has-text-black"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="card">
                    <GatsbyImage
                      image={event.topIllust}
                      alt={`${events[index].titles.join(
                        ""
                      )}のイベントのサムネイル画像`}
                      objectFit="contain"
                    />
                  </div>
                  <p
                    className="is-size-6 mt-2"
                    dangerouslySetInnerHTML={{
                      __html: events[index].titles.join("<br />"),
                    }}
                  ></p>
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
