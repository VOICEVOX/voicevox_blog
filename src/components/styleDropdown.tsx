import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useId, useState } from "react"

export const useStyleDropdownController = ({
  styles,
}: {
  styles: string[]
}) => {
  const [selectedStyle, setSelectedStyle] = useState(styles[0])
  return {
    selectedStyle,
    setSelectedStyle,
  }
}

const StyleDropdown = ({
  styles,
  selectedStyle,
  setSelectedStyle,
  characterName,
  className,
}: {
  styles: string[]
  selectedStyle: string
  setSelectedStyle: (style: string) => void
  characterName: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const id = useId()
  return (
    <div
      className={`dropdown ${isOpenDropdown ? "is-active" : ""} ${className}`}
      onMouseEnter={() => setIsOpenDropdown(true)}
      onMouseLeave={() => setIsOpenDropdown(false)}
    >
      <div className="dropdown-trigger">
        <button
          className="button is-rounded"
          aria-haspopup="true"
          aria-controls={id}
          type="button"
          onFocus={() => setIsOpenDropdown(true)}
          onBlur={() => setIsOpenDropdown(false)}
          aria-label={`${characterName}のサンプルボイスのスタイルを選択`}
        >
          <span>{selectedStyle}</span>
          <span className="icon">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" role="menu" id={id}>
        <div className="dropdown-content">
          {styles.map((style, index) => (
            <a
              key={index}
              className={`dropdown-item is-primary ${
                style == selectedStyle ? "is-active" : ""
              }`}
              onMouseDown={() => {
                setSelectedStyle(style)
                setIsOpenDropdown(false)
              }}
              tabIndex={0}
            >
              {style}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StyleDropdown
