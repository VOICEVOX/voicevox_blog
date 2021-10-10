import React, { useEffect, useMemo, useRef, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons"

export default ({
  url,
  className,
  style,
}: { url: string } & React.HTMLAttributes<HTMLDivElement>) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setAudio(new Audio(url))
  }, [url])

  useEffect(() => {
    if (!audio) return

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
      className={`button is-primary circle-icon ${
        !isReady ? "is-loading" : ""
      } ${className}`}
      disabled={!isReady}
      style={style}
    >
      {isReady ? (
        <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
      ) : undefined}
    </button>
  )
}
