import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useMemo, useState } from "react"

export default ({
  url,
  color,
  className,
  style,
}: { url: string; color?: string } & React.HTMLAttributes<HTMLDivElement>) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setAudio(new Audio(url))
  }, [url])

  const colorAddedStyle = useMemo(
    () =>
      !color
        ? style
        : {
            ...style,
            backgroundColor: "white",
            borderColor: color,
            color: color,
          },
    [color, style]
  )

  useEffect(() => {
    if (!audio) return
    audio.load()

    const onPlayCallback = () => {
      setIsPlaying(true)
    }
    const onPauseCallback = () => {
      setIsPlaying(false)
    }
    const onReady = () => {
      setIsReady(true)
    }
    audio.addEventListener("play", onPlayCallback)
    audio.addEventListener("pause", onPauseCallback)
    audio.addEventListener("canplaythrough", onReady)
    return () => {
      audio.removeEventListener("play", onPlayCallback)
      audio.removeEventListener("pause", onPauseCallback)
      audio.removeEventListener("canplaythrough", onReady)
    }
  }, [audio])

  useEffect(() => {
    return () => {
      if (!audio) return

      audio.pause()
      setIsPlaying(false)
      setIsReady(false)
    }
  }, [audio])

  const play = () => {
    audio!.play()
  }

  const stop = () => {
    audio!.pause()
    audio!.currentTime = 0
  }

  return (
    <button
      onClick={isPlaying ? stop : play}
      className={`button circle-icon ${color || "is-primary"} ${
        !isReady ? "is-loading" : ""
      } ${className}`}
      disabled={!isReady}
      style={colorAddedStyle}
      type="button"
    >
      {isReady ? (
        <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
      ) : undefined}
    </button>
  )
}
