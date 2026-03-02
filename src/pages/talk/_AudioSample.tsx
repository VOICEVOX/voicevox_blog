import PlayButton from "@/components/PlayButton/PlayButton";
import StyleDropdown, {
  useStyleDropdownController,
} from "@/components/StyleDropdown";
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
  const selectedAudioUrls = useMemo(
    () => audioSamples.find(({ style }) => style == selectedStyle)!.urls,
    [audioSamples, selectedStyle],
  );

  return (
    <div>
      <hr className="my-sm border-neutral-200" />
      <div className="py-2xs flex flex-wrap items-center justify-center gap-x-2.5 gap-y-[3px]">
        <div className="w-[100px]">
          <span className="whitespace-nowrap">音声サンプル</span>
        </div>
        <div className="flex gap-[3px]">
          {selectedAudioUrls.map((url, index) => (
            <PlayButton
              key={index}
              url={url}
              name={`${characterName}の${selectedStyle}スタイルのサンプルボイス${
                index + 1
              }`}
              size="sm"
            />
          ))}
        </div>
      </div>
      {styles.length > 1 && (
        <div className="py-2xs flex flex-wrap items-center justify-center gap-x-2.5 gap-y-[3px]">
          <div className="w-[100px]">
            <span className="whitespace-nowrap">スタイル</span>
          </div>
          <div className="flex gap-[3px]">
            <StyleDropdown
              styles={styles}
              selectedStyle={selectedStyle!}
              setSelectedStyle={setSelectedStyle}
              characterName={characterName}
            />
          </div>
        </div>
      )}
      <hr className="my-sm border-neutral-200" />
    </div>
  );
}
