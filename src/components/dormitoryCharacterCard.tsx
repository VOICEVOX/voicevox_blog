import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { CharacterInfo } from "../types/dormitoryCharacter"

export default ({
  characterInfo,
  className = "",
}: {
  characterInfo: CharacterInfo | undefined
  className?: string
}) => {
  const color = characterInfo?.color || "black"
  const href = characterInfo?.id ? `/dormitory/${characterInfo.id}` : "#"

  return (
    <>
      <div className={"column is-3 " + className}>
        <div
          className="card character-card"
          style={{ borderColor: color, height: "100%" }}
        >
          {characterInfo ? (
            <Link to={href} state={{ fromDormitory: true }}>
              <GatsbyImage
                className="card-image"
                image={characterInfo.bustupImage}
                alt={characterInfo.name}
                objectFit="contain"
              />
              <div className="card-content has-text-centered">
                <h3 className="title is-5">{characterInfo.name}</h3>
              </div>
            </Link>
          ) : (
            <div className="card-content has-text-centered">Coming Soon...</div>
          )}
        </div>
      </div>
    </>
  )
}
