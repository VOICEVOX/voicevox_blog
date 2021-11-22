import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

import { CharacterInfo } from "../types/dormitoryCharacter"

export default ({
  characterInfo,
  onClick,
}: {
  characterInfo: CharacterInfo
  onClick: () => void
}) => {
  return (
    <div className="tile is-parent is-3">
      <div
        className="tile is-child card character-card"
        style={{ borderColor: characterInfo.color }}
        onClick={onClick}
      >
        <GatsbyImage
          className="card-image"
          image={characterInfo.bustupImage}
          alt={characterInfo.name}
          objectFit="contain"
        />
        <div className="card-content has-text-centered">
          <h3 className="title is-5">{characterInfo.name}</h3>
        </div>
      </div>
    </div>
  )
}
