import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import React, { useState } from "react"
import "../components/layout.scss"

export default () => {
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

  // トップイラスト
  const [topIllust, setTopIllust] = useState<IGatsbyImageData>(
    topIllusts[topIllusts.length - 1]
  )
  // useEffect(() => {
  //   // トップイラストを後ろ２枚からランダムに選択
  //   // FIXME: なぜかリロードしても変わらない
  //   const randomIndex = topIllusts.length - 1 - Math.floor(Math.random() * 2)
  //   setTopIllust(topIllusts[randomIndex])
  // }, [])

  return (
    <>
      <div className="container is-max-desktop">
        <GatsbyImage
          image={topIllust}
          alt="トップイラスト"
          objectFit="contain"
        />
      </div>
    </>
  )
}
