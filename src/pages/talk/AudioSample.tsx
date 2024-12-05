import StyleDropdown, {
  useStyleDropdownController,
} from "@/components/StyleDropdown";
import PlayButton from "@components/PlayButton/PlayButton";
import React, { useMemo } from "react";

export default ({
  audioSamples,
  characterName,
  className,
}: {
  audioSamples: { style: string; urls: readonly string[] }[];
  characterName: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const styles = useMemo(
    () => audioSamples.map((value) => value.style),
    [audioSamples],
  );
  const { selectedStyle, setSelectedStyle } = useStyleDropdownController({
    styles,
  });
  const selectedAudioUrls = useMemo(
    () => audioSamples.find(({ style }) => style == selectedStyle)!.urls,
    [audioSamples, selectedStyle],
  );

  return (
    <div className={"audio-sample " + className}>
      <hr className="my-3" />
      <div className="audio-sample-pair">
        <div className="audio-sample-label">
          <span>音声サンプル</span>
        </div>
        <div className="audio-sample-content">
          {selectedAudioUrls.map((url, index) => (
            <PlayButton
              key={index}
              url={url}
              name={`${characterName}の${selectedStyle}スタイルのサンプルボイス${
                index + 1
              }`}
              className="is-small"
            />
          ))}
        </div>
      </div>
      {styles.length > 1 && (
        <div className="audio-sample-pair">
          <div className="audio-sample-label">
            <span>スタイル</span>
          </div>
          <div className="audio-sample-content">
            <StyleDropdown
              styles={styles}
              selectedStyle={selectedStyle!}
              setSelectedStyle={setSelectedStyle}
              characterName={characterName}
            />
          </div>
        </div>
      )}
      <hr className="my-3" />
    </div>
  );
};
