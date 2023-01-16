import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useMemo, useState } from "react"
import PlayButton from "./playButton"

export default ({
  audioSamples,
  characterName,
  className,
}: {
  audioSamples: { style: string; urls: string[] }[]
  characterName: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [selectedStyle, setSelectedStyle] = useState(audioSamples[0].style)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const styles = useMemo(
    () => audioSamples.map(value => value.style),
    [audioSamples]
  )
  const selectedUrls = useMemo(
    () => audioSamples.find(({ style }) => style == selectedStyle)!.urls,
    [selectedStyle]
  )

  return (
    <div className={"audio-sample " + className}>
      <hr className="my-3" />
      <div className="audio-sample-pair">
        <div className="audio-sample-label">
          <span>音声サンプル</span>
        </div>
        <div className="audio-sample-content">
          {selectedUrls.map((url, index) => (
            <PlayButton
              key={index}
              url={url}
              name={`${characterName}の${selectedStyle}スタイルのサンプルボイス${
                index + 1
              }`}
              className="is-small"
            />
          ))}
        </div>
      </div>
      {styles.length > 1 && (
        <div className="audio-sample-pair">
          <div className="audio-sample-label">
            <span>スタイル</span>
          </div>
          <div className="audio-sample-content">
            <div
              className={`dropdown ${isOpenDropdown ? "is-active" : ""}`}
              onMouseEnter={() => setIsOpenDropdown(true)}
              onMouseLeave={() => setIsOpenDropdown(false)}
            >
              <div className="dropdown-trigger">
                <button
                  className="button is-rounded"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
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
              <div className="dropdown-menu" role="menu">
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
          </div>
        </div>
      )}
      <hr className="my-3" />
    </div>
  )
}
