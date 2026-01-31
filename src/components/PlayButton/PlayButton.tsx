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

const getSizeClasses = (className?: string) => {
  if (className?.includes("is-small")) return "w-10 h-10 border text-xs";
  if (className?.includes("is-medium"))
    return "w-[57.6px] h-[57.6px] border-[2px] text-xl";
  if (className?.includes("is-large"))
    return "w-[67.2px] h-[67.2px] border-[2.4px] text-2xl";
  return "w-12 h-12 border-[1.8px] text-base";
};

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
  const baseClasses =
    "relative flex items-center justify-center rounded-full disabled:cursor-wait";
  const colorClasses = !color
    ? "border-primary text-primary bg-transparent hover:bg-primary/10"
    : "";
  const sizeClasses = getSizeClasses(className);
  const additionalClasses =
    className?.replace(/is-(small|medium|large)/g, "").trim() || "";
  const finalClassName =
    `${baseClasses} ${sizeClasses} ${colorClasses} ${additionalClasses}`.trim();

  const getSpinnerSize = (className?: string) => {
    if (className?.includes("is-small")) return "w-4 h-4";
    if (className?.includes("is-medium")) return "w-5 h-5";
    if (className?.includes("is-large")) return "w-6 h-6";
    return "w-4 h-4";
  };

  return (
    <button
      onClick={isPlaying ? stop : play}
      className={finalClassName}
      style={colorAddedStyle}
      type="button"
      aria-label={`${name}を${isPlaying ? "停止" : "再生"}}`}
      disabled={isLoading}
    >
      {!isLoading ? (
        <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
      ) : (
        <div
          className={`${getSpinnerSize(className)} border-2 rounded-full border-r-transparent border-t-transparent animate-spin`}
          style={{ borderColor: color || "currentColor" }}
        />
      )}
    </button>
  );
}
