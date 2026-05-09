import PlayButton from "@/components/PlayButton/PlayButton";
import StyleDropdown, {
  useStyleDropdownController,
} from "@/components/StyleDropdown";
import { ensureNotNullish } from "@/helper";
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
    const selectedAudioSample = ensureNotNullish(
      audioSamples.find(({ style }) => style == selectedStyle),
    );
    return selectedAudioSample.urls;
  }, [audioSamples, selectedStyle]);
  const selectedStyleName = ensureNotNullish(selectedStyle);

  return (
    <div className="space-y-sm">
      <hr className="vv-hr" />
      <div>
        <div className="py-2xs flex flex-wrap items-center justify-center gap-x-2.5 gap-y-[3px]">
          <div className="w-25">
            <span className="whitespace-nowrap">音声サンプル</span>
          </div>
          <div className="flex gap-[3px]">
            {selectedAudioUrls.map((url, index) => (
              <PlayButton
                key={index}
                url={url}
                name={`${characterName}の${selectedStyleName}スタイルのサンプルボイス${index + 1}`}
                size="sm"
              />
            ))}
          </div>
        </div>
        {styles.length > 1 && (
          <div className="py-2xs flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.75">
            <div className="w-25">
              <span className="whitespace-nowrap">スタイル</span>
            </div>
            <div className="flex gap-0.75">
              <StyleDropdown
                styles={styles}
                selectedStyle={selectedStyleName}
                setSelectedStyle={setSelectedStyle}
                characterName={characterName}
              />
            </div>
          </div>
        )}
      </div>
      <hr className="vv-hr" />
    </div>
  );
}
