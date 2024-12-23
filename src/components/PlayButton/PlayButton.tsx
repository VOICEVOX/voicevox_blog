/**
 * 再生ボタン。
 * 別の再生ボタンが押されたら停止する。
 */
import { $lastAudio } from "@/store/audio";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";

/** 値の変更を遅延させる */
export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function PlayButton({
  url,
  name,
  color,
  className,
  style,
}: {
  url: string;
  name: string;
  color?: string; // 無指定の場合はprimary
} & React.HTMLAttributes<HTMLButtonElement>) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const debouncedIsReady = useDebounce(isReady, 300);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  const colorAddedStyle = useMemo(
    () =>
      !color
        ? {
            "--bulma-loading-color": "var(--bulma-primary)",
            ...style,
          }
        : {
            backgroundColor: "white",
            borderColor: color,
            color: color,
            "--bulma-loading-color": color,
            ...style,
          },
    [color, style],
  );

  useEffect(() => {
    if (!audio) return;
    audio.load();

    const onPlayCallback = () => {
      setIsPlaying(true);
      $lastAudio.set(audio);
    };
    const onPauseCallback = () => {
      setIsPlaying(false);
      audio.currentTime = 0;
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
    if (!audio) throw new Error(`audio is not ready: ${url}`);
    audio.play();
  };

  const stop = () => {
    if (!audio) throw new Error(`audio is not ready: ${url}`);
    audio.pause();
  };

  return (
    <button
      onClick={isPlaying ? stop : play}
      className={`button circle-icon ${color || "is-primary"} ${
        !(isReady || debouncedIsReady) ? "is-loading" : ""
      } ${className}`}
      style={colorAddedStyle}
      type="button"
      aria-label={`${name}を${isPlaying ? "停止" : "再生"}}`}
    >
      {isReady || debouncedIsReady ? (
        <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
      ) : undefined}
    </button>
  );
}
