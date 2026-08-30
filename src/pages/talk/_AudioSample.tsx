import PlayButton from "@/components/PlayButton/PlayButton";
import StyleDropdown, {
  useStyleDropdownController,
} from "@/components/StyleDropdown";
import { assertNonNullable } from "@/helper";
import { useMemo } from "react";

export default function AudioSample({
  audioSamples,
  characterName,
}: {
  audioSamples: { style: string; urls: readonly string[] }[];
  characterName: string;
}) {
  const styles = useMemo(
    () => audioSamples.map((value) => value.style),
    [audioSamples],
  );
  const { selectedStyle, setSelectedStyle } = useStyleDropdownController({
    styles,
  });
  const selectedAudioUrls = useMemo(() => {
    const selectedAudioSample = audioSamples.find(
      ({ style }) => style == selectedStyle,
    );
    assertNonNullable(selectedAudioSample);
    return selectedAudioSample.urls;
  }, [audioSamples, selectedStyle]);
  assertNonNullable(selectedStyle);

  return (
    <div className="flex flex-1 flex-col">
      <hr className="vv-hr" />
      <div className="gap-xs py-xs flex flex-1 items-center justify-center">
        <div className="gap-2xs flex min-w-0 flex-1 flex-col items-center justify-center">
          <span className="whitespace-nowrap">音声サンプル</span>
          <div className="flex gap-[3px]">
            {selectedAudioUrls.map((url, index) => (
              <PlayButton
                key={index}
                url={url}
                name={`${characterName}の${selectedStyle}スタイルのサンプルボイス${index + 1}`}
                size="sm"
              />
            ))}
          </div>
        </div>
        {styles.length > 1 && (
          <div className="gap-2xs flex min-w-0 flex-1 flex-col items-center justify-center">
            <span className="whitespace-nowrap">スタイル</span>
            <StyleDropdown
              styles={styles}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              characterName={characterName}
            />
          </div>
        )}
      </div>
      <hr className="vv-hr" />
    </div>
  );
}
