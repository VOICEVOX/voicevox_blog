import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useState } from "react"
import "../components/layout.scss"

export default ({ id }: { id: string }) => {
  const query: Queries.DormitoryTopIllustContainerQuery["allFile"]["nodes"] =
    useStaticQuery(graphql`
      query DormitoryTopIllustContainer {
        allFile(filter: { absolutePath: { regex: "/top-illust/" } }) {
          nodes {
            name
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    `)["allFile"]["nodes"]

  // トップイラスト一覧
  const topIllusts: IGatsbyImageData[] = query
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(node => node.childImageSharp!.gatsbyImageData)
  const illustrators = ["坂本アヒル", "490", "moiky", "のほしお", "さよなか"]
  if (topIllusts.length !== illustrators.length) {
    throw new Error("イラストレーターの数とトップイラストの数が一致しません")
  }

  // モーダル
  const [selectedTopIllustIndex, setSelectedTopIllustIndex] = useState<number>()

  const showTopIllustModal = (topIllustIndex: number | undefined) => {
    document.documentElement.classList.add("is-clipped")
    setSelectedTopIllustIndex(topIllustIndex)
  }
  const hideTopIllustModal = () => {
    document.documentElement.classList.remove("is-clipped")
    setSelectedTopIllustIndex(undefined)
  }

  return (
    <>
      <div className="container top-illust-container has-text-centered py-5 is-flex is-flex-direction-column">
        <h2 id={id} className="jump-anchor-header-padding title is-4">
          <Link to={`#${id}`} className="has-text-black">
            トップイラスト一覧
          </Link>
        </h2>
        <div className="columns is-multiline is-variable is-2 px-4">
          {
            // トップイラスト一覧
            topIllusts.map((topIllust, index) => (
              <div className="column is-4" key={index}>
                <div className="card" onClick={() => showTopIllustModal(index)}>
                  <GatsbyImage
                    image={topIllust}
                    alt={`${illustrators[index]}さんが描いたトップイラスト${index}`}
                    objectFit="contain"
                  />
                </div>
                <span className="is-size-7">
                  イラスト：{illustrators[index]}
                </span>
              </div>
            ))
          }
        </div>
      </div>
      {selectedTopIllustIndex != undefined && (
        <div
          className={
            `modal-top-illust modal` +
            (selectedTopIllustIndex != undefined ? " is-active" : "")
          }
          onClick={hideTopIllustModal}
        >
          <div className="modal-background" onClick={hideTopIllustModal} />
          <div className="modal-content">
            <GatsbyImage
              image={topIllusts[selectedTopIllustIndex]}
              style={{ width: "100%", height: "100%" }}
              alt={`トップイラスト${selectedTopIllustIndex}の大きな画像`}
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
