import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { CharacterInfo } from "../types/dormitoryCharacter"
import { getDormitoryCharacterPageUrl } from "../urls"

export default ({
  characterInfo,
  className = "",
}: {
  characterInfo: CharacterInfo
  className?: string
}) => {
  const color = characterInfo.color || "black"
  const href = getDormitoryCharacterPageUrl(characterInfo)

  return (
    <>
      <div
        id={characterInfo.id}
        className={"jump-anchor-header-padding column is-3 " + className}
      >
        <div
          className="card character-card"
          style={{ borderColor: color, height: "100%" }}
        >
          <Link to={href} state={{ fromDormitory: true }}>
            <GatsbyImage
              className="card-image"
              image={characterInfo.bustupImageSmall}
              alt={characterInfo.name}
              objectFit="contain"
            />
            <div
              className="card-content has-text-centered"
              style={{ borderColor: color }}
            >
              <h3 className="title is-5">{characterInfo.name}</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
