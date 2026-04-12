export type IconButtonSize = "sm" | "md" | "lg" | "xl";

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
}: {
  size: IconButtonSize;
  className?: string;
  border?: boolean;
}): string => {
  const borderClass = border ? "vv-icon-button-border" : "";

  return [
    "vv-status-layer",
    "vv-icon-button",
    SIZE_CLASS[size],
    borderClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");
};
