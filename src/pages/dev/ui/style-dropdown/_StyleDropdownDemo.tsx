import StyleDropdown, {
  useStyleDropdownController,
} from "@/components/StyleDropdown";

export function StyleDropdownClosed({ styles }: { styles: string[] }) {
  const { selectedStyle, setSelectedStyle } = useStyleDropdownController({
    styles,
  });
  if (selectedStyle == undefined) {
    throw new Error("selectedStyle is undefined");
  }
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
  if (selectedStyle == undefined) {
    throw new Error("selectedStyle is undefined");
  }
  return (
    <StyleDropdown
      styles={styles}
      selectedStyle={selectedStyle}
      setSelectedStyle={setSelectedStyle}
      characterName="デモ"
      forceOpen={true}
    />
  );
}
