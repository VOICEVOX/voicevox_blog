/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
import type { GatsbyNode } from "gatsby"
import path from "path"
import { characterKeys, characterInfos } from "./src/constants"

export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  // ボイボ寮のキャラクターごとのURL
  characterKeys.forEach(key => {
    const info = characterInfos[key]
    actions.createPage({
      path: `/dormitory/${info.id}`,
      component: path.resolve("./src/pages/dormitory.tsx"),
      context: {
        initialSelectedCharacterKey: key,
      },
    })
  })
}
