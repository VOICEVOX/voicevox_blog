import StyleDropdown, {
  useStyleDropdownController,
} from "@/components/StyleDropdown";
import { assertNonNullable } from "@/helper";

export function StyleDropdownClosed({ styles }: { styles: string[] }) {
  const { selectedStyle, setSelectedStyle } = useStyleDropdownController({
    styles,
  });
  assertNonNullable(selectedStyle);
  return (
    <StyleDropdown
      styles={styles}
      selectedStyle={selectedStyle}
      setSelectedStyle={setSelectedStyle}
      characterName="デモ"
    />
  );
}

export function StyleDropdownOpened({ styles }: { styles: string[] }) {
  const { selectedStyle, setSelectedStyle } = useStyleDropdownController({
    styles,
  });
  assertNonNullable(selectedStyle);
  return (
    <StyleDropdown
      styles={styles}
      selectedStyle={selectedStyle}
      setSelectedStyle={setSelectedStyle}
      characterName="デモ"
      debugForceOpen={true}
    />
  );
}
