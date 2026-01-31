/**
 * キャラクターごとのカード表示
 */
import PlayButton from "@/components/PlayButton/PlayButton";
import type { CharacterInfo } from "@/constants/type";
import { getProductPageUrl } from "@/constants/url";
import { withBaseUrl } from "@/helper";
import {
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState, type ReactNode } from "react";

export default function CharacterCard({
  characterInfo,
  children,
}: {
  characterInfo: CharacterInfo;
  children: ReactNode;
}) {
  const color = characterInfo.color;
  const coloredStyle = useMemo(() => {
    return {
      backgroundColor: "transparent",
      borderColor: color,
      color: color,
    };
  }, [color]);

  const audioSamples = useMemo(
    () => characterInfo.songVoiceAudios,
    [characterInfo],
  );

  const [styleState, setStyleState] = useState<
    | {
        styles: { name: string; type: string }[];
        selectedStyleIndex: number;
      }
    | undefined // スタイルが未発表な場合はundefined
  >(
    audioSamples.length > 0
      ? {
          styles: audioSamples.map((value) => {
            return { name: value.style, type: value.styleType };
          }),
          selectedStyleIndex: 0,
        }
      : undefined,
  );

  // スタイルタイプを含んだスタイル名
  const fullStyleName = useMemo(() => {
    if (styleState == undefined) {
      return undefined;
    }
    return (
      (styleState.styles[styleState.selectedStyleIndex].type == "humming"
        ? "ハミング"
        : "ソング") +
      "：" +
      styleState.styles[styleState.selectedStyleIndex].name
    );
  }, [styleState]);

  // 次のスタイルへ
  const nextStyle = () => {
    if (!styleState) {
      throw new Error("styleState is undefined.");
    }
    setStyleState({
      ...styleState,
      selectedStyleIndex:
        (styleState.selectedStyleIndex + 1) % styleState.styles.length,
    });
  };

  // 前のスタイルへ
  const prevStyle = () => {
    if (!styleState) {
      throw new Error("styleState is undefined.");
    }
    setStyleState({
      ...styleState,
      selectedStyleIndex:
        (styleState.selectedStyleIndex - 1 + styleState.styles.length) %
        styleState.styles.length,
    });
  };

  const LinkToProductPage = ({
    children,
    className,
    style,
  }: React.HTMLAttributes<HTMLLinkElement>) => {
    return (
      <a
        href={withBaseUrl(getProductPageUrl(characterInfo))}
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center bg-[#282828] rounded-lg w-40 py-3">
      <LinkToProductPage className="w-[70%]">{children}</LinkToProductPage>
      <div className="text-center flex flex-col gap-2">
        <h3 className="text-base font-medium mb-0 text-white">
          <LinkToProductPage style={{ color: "inherit" }}>
            {characterInfo.name}
          </LinkToProductPage>
        </h3>

        {styleState && (
          <>
            <div className="flex items-center justify-center mb-0 gap-2">
              {styleState.styles.length > 1 && (
                <button
                  className="relative flex items-center justify-center w-10 h-10 rounded-full border bg-transparent hover:opacity-90 text-xs"
                  style={coloredStyle}
                  type="button"
                  aria-label="前のサンプル音声へ"
                  onClick={prevStyle}
                >
                  <FontAwesomeIcon icon={faBackwardStep} />
                </button>
              )}

              <PlayButton
                url={
                  characterInfo.songVoiceAudios[styleState.selectedStyleIndex]
                    .urls[0]
                }
                name={`${fullStyleName}のサンプル音声}`}
                color={characterInfo.color}
                style={{ backgroundColor: "transparent" }}
              />

              {styleState.styles.length > 1 && (
                <button
                  className="relative flex items-center justify-center w-10 h-10 rounded-full border bg-transparent hover:opacity-90 text-xs"
                  style={coloredStyle}
                  type="button"
                  aria-label="次のサンプル音声へ"
                  onClick={nextStyle}
                >
                  <FontAwesomeIcon icon={faForwardStep} />
                </button>
              )}
            </div>
            <h4 className="text-xs text-white">{fullStyleName}</h4>
          </>
        )}
      </div>
    </div>
  );
}
