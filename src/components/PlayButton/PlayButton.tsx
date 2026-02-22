/**
 * 再生ボタン。
 * 別の再生ボタンが押されたら停止する。
 */
import IconButton from "@/components/ui/IconButton/IconButton";
import type { IconButtonSize } from "@/components/ui/IconButton/helper";
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

const getTextSizeClass = (size?: "sm" | "md" | "lg") => {
  if (size === "sm") return "text-xs";
  if (size === "md") return "text-xl";
  if (size === "lg") return "text-2xl";
  return "text-base";
};

export default function PlayButton({
  url,
  name,
  color,
  size,
  className,
  style,
}: {
  url: string;
  name: string;
  color?: string; // 無指定の場合はprimary
  size?: "sm" | "md" | "lg";
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

  const isLoading = !(isReady || debouncedIsReady);
  const baseClasses = "relative disabled:cursor-wait";
  const colorClasses = !color ? "text-primary hover:bg-primary/10" : "";
  const textSizeClass = getTextSizeClass(size);
  const finalClassName =
    `${baseClasses} ${textSizeClass} ${colorClasses} ${className || ""}`.trim();

  const getSpinnerSize = (size?: "sm" | "md" | "lg") => {
    if (size === "sm") return "w-4 h-4";
    if (size === "md") return "w-5 h-5";
    if (size === "lg") return "w-6 h-6";
    return "w-4 h-4";
  };

  const iconButtonSize: IconButtonSize =
    size === "sm" ? "sm" : size === "md" ? "lg" : size === "lg" ? "xl" : "md";

  return (
    <IconButton
      onClick={isPlaying ? stop : play}
      className={finalClassName}
      style={colorAddedStyle}
      aria-label={`${name}を${isLoading ? "読み込み中" : isPlaying ? "停止" : "再生"}`}
      aria-busy={isLoading || undefined}
      disabled={isLoading}
      border
      size={iconButtonSize}
    >
      {!isLoading ? (
        <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
      ) : (
        <div
          className={`${getSpinnerSize(size)} animate-spin rounded-full border-2 border-t-transparent border-r-transparent`}
          style={{ borderColor: color || "currentColor" }}
        />
      )}
    </IconButton>
  );
}
