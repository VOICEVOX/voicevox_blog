/**
 * キャラクターごとのカード表示
 */
import PlayButton from "@/components/PlayButton/PlayButton";
import IconButton from "@/components/ui/IconButton/IconButton";
import type { CharacterInfo } from "@/constants/type";
import { getProductPageUrl } from "@/constants/url";
import { assertNonNullable, ExhaustiveError, withBaseUrl } from "@/helper";
import {
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState, type ReactNode } from "react";

type StyleType = "song" | "humming";

const getStyleTypeLabel = (styleType: StyleType): string => {
  switch (styleType) {
    case "song":
      return "ソング";
    case "humming":
      return "ハミング";
    default:
      throw new ExhaustiveError(styleType);
  }
};

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
      color: color,
    };
  }, [color]);

  const audioSamples = useMemo(
    () => characterInfo.songVoiceAudios,
    [characterInfo],
  );

  const [styleState, setStyleState] = useState<
    | {
        styles: { name: string; type: StyleType }[];
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
      getStyleTypeLabel(styleState.styles[styleState.selectedStyleIndex].type) +
      "：" +
      styleState.styles[styleState.selectedStyleIndex].name
    );
  }, [styleState]);

  // 次のスタイルへ
  const nextStyle = () => {
    assertNonNullable(styleState);
    setStyleState({
      ...styleState,
      selectedStyleIndex:
        (styleState.selectedStyleIndex + 1) % styleState.styles.length,
    });
  };

  // 前のスタイルへ
  const prevStyle = () => {
    assertNonNullable(styleState);
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
  }: React.HTMLAttributes<HTMLAnchorElement>) => {
    return (
      <a
        href={withBaseUrl(getProductPageUrl(characterInfo))}
        className={className}
      >
        {children}
      </a>
    );
  };

  return (
    <div className="gap-xs py-sm flex w-40 flex-col items-center justify-center rounded-lg bg-neutral-800">
      <LinkToProductPage className="w-2/3">{children}</LinkToProductPage>
      <div className="gap-xs flex flex-col text-center">
        <h3 className="mb-0 text-base font-medium text-white">
          <LinkToProductPage className="text-current">
            {characterInfo.name}
          </LinkToProductPage>
        </h3>

        {styleState && (
          <>
            <div className="gap-xs mb-0 flex items-center justify-center">
              {styleState.styles.length > 1 && (
                <IconButton
                  size="sm"
                  border
                  className="relative text-xs"
                  style={coloredStyle}
                  aria-label="前のサンプル音声へ"
                  onClick={prevStyle}
                >
                  <FontAwesomeIcon icon={faBackwardStep} />
                </IconButton>
              )}

              <PlayButton
                url={
                  characterInfo.songVoiceAudios[styleState.selectedStyleIndex]
                    .urls[0]
                }
                name={`${fullStyleName}のサンプル音声`}
                color={characterInfo.color}
              />

              {styleState.styles.length > 1 && (
                <IconButton
                  size="sm"
                  border
                  className="relative text-xs"
                  style={coloredStyle}
                  aria-label="次のサンプル音声へ"
                  onClick={nextStyle}
                >
                  <FontAwesomeIcon icon={faForwardStep} />
                </IconButton>
              )}
            </div>
            <h4 className="text-xs text-white">{fullStyleName}</h4>
          </>
        )}
      </div>
    </div>
  );
}
