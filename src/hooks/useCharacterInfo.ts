import { graphql, useStaticQuery } from "gatsby"
import { useCallback } from "react"
import { CharacterKey } from "../types/dormitoryCharacter"

export const useCharacterInfo = () => {
  const query: {
    character: {
      nodes: { key: CharacterKey; name: string; characterId: string }[]
    }
  } = useStaticQuery(graphql`
    {
      character: allCharacter {
        nodes {
          key
          name
          characterId
        }
      }
    }
  `)

  const getCharacterInfo = useCallback(
    (key: CharacterKey) =>
      query.character.nodes.find(node => node.key === key)!,
    [query]
  )

  return { getCharacterInfo }
}
