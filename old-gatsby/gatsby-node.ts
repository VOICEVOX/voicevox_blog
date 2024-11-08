/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
import type { GatsbyNode } from "gatsby"
import path from "path"
import { characterInfos, characterKeys } from "./src/constants"

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // constantsに記述したcharacterInfoをgraphqlに乗せる
  characterKeys.forEach(characterKey => {
    const characterInfo = characterInfos[characterKey]

    const node = {
      key: characterKey,
      name: characterInfo.name,
      characterId: characterInfo.id,

      id: createNodeId(`Character-${characterInfo.id}`),
      internal: {
        type: "Character",
        contentDigest: createContentDigest(characterInfo),
      },
    }

    actions.createNode(node)
  })
}

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions

  // ニュースページ
  const newsPostTemplate = path.resolve("src/templates/newsPost.tsx")

  const result = await graphql(`
    query NewsPages {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/news/" } }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const data = result.data as {
    allMarkdownRemark: {
      edges: {
        node: {
          frontmatter: {
            slug: string
          }
        }
      }[]
    }
  }

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/news/${node.frontmatter.slug}/`,
      component: newsPostTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
