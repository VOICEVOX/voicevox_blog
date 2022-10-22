/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
import type { GatsbyNode } from "gatsby"
import { characterKeys, characterInfos } from "./src/constants"

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
