/**
 * キャラクターごとのカード表示
 */
import PlayButton from "@components/PlayButton/PlayButton";
import type { CharacterInfo } from "@constants/type";
import { getProductPageUrl } from "@constants/url";
import {
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState, type ReactNode } from "react";

export default (props: {
  characterInfo: CharacterInfo;
  children: ReactNode;
}) => {
  const { characterInfo, children } = props;

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
        href={getProductPageUrl(characterInfo)}
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  };

  return (
    <div className="voice-card">
      <LinkToProductPage className="voice-card-image">
        {children}
      </LinkToProductPage>
      <div className="voice-card-content">
        <h3 className="title">
          <LinkToProductPage style={{ color: "inherit" }}>
            {characterInfo.name}
          </LinkToProductPage>
        </h3>

        {styleState && (
          <>
            <div className="buttons">
              {styleState.styles.length > 1 && (
                <button
                  className={`button circle-icon is-small`}
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
                  className={`button circle-icon is-small`}
                  style={coloredStyle}
                  type="button"
                  aria-label="次のサンプル音声へ"
                  onClick={nextStyle}
                >
                  <FontAwesomeIcon icon={faForwardStep} />
                </button>
              )}
            </div>
            <h4 className="style-name">{fullStyleName}</h4>
          </>
        )}
      </div>
    </div>
  );
};
