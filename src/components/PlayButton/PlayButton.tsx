/**
 * 再生ボタン。
 * 別の再生ボタンが押されたら停止する。
 */
import IconButton from "@/components/ui/IconButton/IconButton";
import type { IconButtonSize } from "@/components/ui/IconButton/helper";
import { assertNonNullable, ExhaustiveError } from "@/helper";
import { $lastAudio } from "@/store/audio";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

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

type PlayButtonSize = "sm" | "md" | "lg";

const getTextSizeClass = (size: PlayButtonSize | undefined) => {
  if (size == undefined) return "text-base";
  switch (size) {
    case "sm":
      return "text-xs";
    case "md":
      return "text-xl";
    case "lg":
      return "text-2xl";
    default:
      throw new ExhaustiveError(size);
  }
};

const getSpinnerSize = (size: PlayButtonSize | undefined) => {
  if (size == undefined) return "w-4 h-4";
  switch (size) {
    case "sm":
      return "w-4 h-4";
    case "md":
      return "w-5 h-5";
    case "lg":
      return "w-6 h-6";
    default:
      throw new ExhaustiveError(size);
  }
};

const getIconButtonSize = (
  size: PlayButtonSize | undefined,
): IconButtonSize => {
  if (size == undefined) return "md";
  switch (size) {
    case "sm":
      return "sm";
    case "md":
      return "lg";
    case "lg":
      return "xl";
    default:
      throw new ExhaustiveError(size);
  }
};

export default function PlayButton({
  url,
  name,
  color,
  size,
  className,
}: {
  url: string;
  name: string;
  color?: string; // 無指定の場合はprimary
  size?: PlayButtonSize;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const debouncedIsReady = useDebounce(isReady, 300);

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

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
    assertNonNullable(audio);
    audio.play();
  };

  const stop = () => {
    assertNonNullable(audio);
    audio.pause();
  };

  const isLoading = !(isReady || debouncedIsReady);
  const baseClasses = "relative disabled:cursor-wait";
  const colorClasses = !color ? "text-primary" : "";
  const textSizeClass = getTextSizeClass(size);
  const finalClassName =
    `${baseClasses} ${textSizeClass} ${colorClasses} ${className || ""}`.trim();

  const iconButtonSize = getIconButtonSize(size);

  return (
    <IconButton
      onClick={isPlaying ? stop : play}
      className={finalClassName}
      style={color ? { color } : undefined}
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
          className={`${getSpinnerSize(size)} animate-spin rounded-full border-2 border-t-transparent border-r-transparent border-b-current border-l-current`}
        />
      )}
    </IconButton>
  );
}
