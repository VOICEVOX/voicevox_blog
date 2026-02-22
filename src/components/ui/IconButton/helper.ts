export type IconButtonSize = "sm" | "md" | "lg" | "xl";

export type IconButtonBorderProps = {
  border?: boolean;
  borderWidth?: 2;
};

const SIZE_CLASS: Record<IconButtonSize, string> = {
  sm: "vv-icon-button-sm",
  md: "vv-icon-button-md",
  lg: "vv-icon-button-lg",
  xl: "vv-icon-button-xl",
};

export const buildIconButtonClassName = ({
  size,
  className,
  border,
  borderWidth,
}: {
  size: IconButtonSize;
  className?: string;
} & IconButtonBorderProps): string => {
  const borderClass = border
    ? borderWidth === 2
      ? "vv-icon-button-border vv-icon-button-border-2"
      : "vv-icon-button-border"
    : "";

  return ["vv-icon-button", SIZE_CLASS[size], borderClass, className]
    .filter(Boolean)
    .join(" ");
};
