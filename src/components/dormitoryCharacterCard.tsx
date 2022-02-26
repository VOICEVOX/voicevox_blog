import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { CharacterInfo } from "../types/dormitoryCharacter"

export default ({
  characterInfo,
  onClick,
  className = "",
}: {
  characterInfo: CharacterInfo
  onClick: () => void
  className?: string
}) => {
  return (
    <div className={"column is-3 " + className}>
      <div
        className="card character-card"
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
