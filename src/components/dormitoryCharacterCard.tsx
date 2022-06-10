import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { CharacterInfo } from "../types/dormitoryCharacter"

export default ({
  characterInfo,
  onClick,
  className = "",
}: {
  characterInfo: CharacterInfo | undefined
  onClick?: () => void
  className?: string
}) => {
  const color = characterInfo?.color || "black"

  return (
    <>
      <div className={"column is-3 " + className}>
        <div
          className="card character-card"
          style={{ borderColor: color, height: "100%" }}
          onClick={onClick}
        >
          {characterInfo ? (
            <>
              <GatsbyImage
                className="card-image"
                image={characterInfo.bustupImage}
                alt={characterInfo.name}
                objectFit="contain"
              />
              <div className="card-content has-text-centered">
                <h3 className="title is-5">{characterInfo.name}</h3>
              </div>
            </>
          ) : (
            <div className="card-content has-text-centered">Coming Soon...</div>
          )}
        </div>
      </div>
    </>
  )
}
