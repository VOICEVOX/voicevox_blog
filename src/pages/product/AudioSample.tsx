import PlayButton from "@/components/PlayButton/PlayButton";
import StyleDropdown, {
  useStyleDropdownController,
} from "@/components/StyleDropdown";
import type { CharacterInfo } from "@/constants/type";
import { useMemo } from "react";

export default (props: { characterInfo: CharacterInfo }) => {
  const { characterInfo } = props;

  const styles = useMemo(
    () => characterInfo.talkVoiceAudios.map((o) => o.style),
    [characterInfo],
  );
  const { selectedStyle, setSelectedStyle } = useStyleDropdownController({
    styles,
  });
  const selectedAudioUrls = useMemo(
    () =>
      styles.length > 0
        ? (
            characterInfo.talkVoiceAudios.find(
              ({ style }) => style == selectedStyle,
            ) || characterInfo.talkVoiceAudios[0]
          ).urls // FIXME: ブラウザバックで変なステートになるのでフォールバックしている
        : undefined,
    [characterInfo, selectedStyle],
  );

  return (
    styles.length > 0 &&
    selectedAudioUrls != undefined &&
    selectedStyle != undefined && (
      <div className="sample p-4">
        <h3 className="is-size-6">サンプルボイス</h3>
        <div className="is-flex is-flex-direction-row mt-2">
          {selectedAudioUrls.map((url, index) => (
            <PlayButton
              key={index}
              url={url}
              name={`${characterInfo.name}のサンプルボイス${index + 1}}`}
              color={characterInfo.color}
              className="ml-1 mr-1"
            />
          ))}
        </div>
        {styles.length > 1 && (
          <StyleDropdown
            styles={styles}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            characterName={characterInfo.name}
            className="is-up mt-2"
          />
        )}
      </div>
    )
  );
};
