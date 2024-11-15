/**
 * 再生ボタン。
 * FIXME: 再生機構をグローバルにし、再生ボタンが押されたときに他の再生ボタンを停止するようにする。
 */

import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";

export default ({
  url,
  name,
  color,
  className,
  style,
}: {
  url: string;
  name: string;
  color?: string;
} & React.HTMLAttributes<HTMLButtonElement>) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  const colorAddedStyle = useMemo(
    () =>
      !color
        ? style
        : {
            backgroundColor: "white",
            borderColor: color,
            color: color,
            ...style,
          },
    [color, style],
  );

  useEffect(() => {
    if (!audio) return;
    audio.load();

    const onPlayCallback = () => {
      setIsPlaying(true);
    };
    const onPauseCallback = () => {
      setIsPlaying(false);
    };
    const onReady = () => {
      setIsReady(true);
    };
    audio.addEventListener("play", onPlayCallback);
    audio.addEventListener("pause", onPauseCallback);
    audio.addEventListener("canplaythrough", onReady);
    return () => {
      audio.removeEventListener("play", onPlayCallback);
      audio.removeEventListener("pause", onPauseCallback);
      audio.removeEventListener("canplaythrough", onReady);
    };
  }, [audio]);

  useEffect(() => {
    return () => {
      if (!audio) return;

      audio.pause();
      setIsPlaying(false);
      setIsReady(false);
    };
  }, [audio]);

  const play = () => {
    audio!.play();
  };

  const stop = () => {
    audio!.pause();
    audio!.currentTime = 0;
  };

  return (
    <button
      onClick={isPlaying ? stop : play}
      className={`button circle-icon ${color || "is-primary"} ${
        !isReady ? "is-loading" : ""
      } ${className}`}
      disabled={!isReady}
      style={colorAddedStyle}
      type="button"
      aria-label={`${name}を${isPlaying ? "停止" : "再生"}}`}
    >
      {isReady ? (
        <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
      ) : undefined}
    </button>
  );
};
