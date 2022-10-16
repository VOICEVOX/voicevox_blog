/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
import type { GatsbyNode } from "gatsby"
import path from "path"
import { characterKeys } from "./src/contexts/context"

export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  characterKeys.forEach(key => {
    actions.createPage({
      path: `/dormitory/${key}`,
      component: path.resolve("./src/pages/dormitory.tsx"),
      context: {
        initialSelectedCharacterKey: key,
      },
    })
  })
}
