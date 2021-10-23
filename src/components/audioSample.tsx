import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useMemo, useState } from "react"
import PlayButton from "./playButton"

export default ({
  audioSamples,
  className,
}: {
  audioSamples: { style: string; urls: string[] }[]
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
      <div className="columns is-vcentered py-0 my-2">
        <div className="column is-5 py-0 my-1">
          <p>音声サンプル</p>
        </div>
        <div className="column is-7 py-0 my-1">
          {selectedUrls.map((url, index) => (
            <PlayButton key={index} url={url} className="ml-1 mr-1" />
          ))}
        </div>
      </div>
      <div className="columns is-vcentered py-0 my-2">
        <div className="column is-5 py-0 my-1">
          <p>スタイル</p>
        </div>
        <div className="column is-7 py-0 my-1">
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
                    onClick={() => {
                      setSelectedStyle(style)
                      setIsOpenDropdown(false)
                    }}
                  >
                    {style}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  )
}
