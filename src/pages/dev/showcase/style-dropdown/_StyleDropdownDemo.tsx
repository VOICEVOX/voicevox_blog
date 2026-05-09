import StyleDropdown, {
  useStyleDropdownController,
} from "@/components/StyleDropdown";
import { ensureNotNullish } from "@/helper";

export function StyleDropdownClosed({ styles }: { styles: string[] }) {
  const { selectedStyle: nullableSelectedStyle, setSelectedStyle } =
    useStyleDropdownController({
      styles,
    });
  const selectedStyle = ensureNotNullish(nullableSelectedStyle);
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
  const { selectedStyle: nullableSelectedStyle, setSelectedStyle } =
    useStyleDropdownController({
      styles,
    });
  const selectedStyle = ensureNotNullish(nullableSelectedStyle);
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
