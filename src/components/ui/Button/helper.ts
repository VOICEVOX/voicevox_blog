export type ButtonKind = "solid" | "outline";
export type ButtonTone = "primary" | "neutral" | "white";
export type ButtonShape = "pill" | "rounded";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const KIND_CLASS: Record<ButtonKind, string> = {
  solid: "vv-button-kind-solid",
  outline: "vv-button-kind-outline",
};

const TONE_CLASS: Record<ButtonTone, string> = {
  primary: "vv-button-tone-primary",
  neutral: "vv-button-tone-neutral",
  white: "vv-button-tone-white",
};

const SHAPE_CLASS: Record<ButtonShape, string> = {
  pill: "vv-button-shape-pill",
  rounded: "vv-button-shape-rounded",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "vv-button-size-sm",
  md: "vv-button-size-md",
  lg: "vv-button-size-lg",
  xl: "vv-button-size-xl",
};

export const buildButtonClassName = ({
  kind,
  tone,
  shape,
  size,
  withIcon,
  className,
}: {
  kind: ButtonKind;
  tone: ButtonTone;
  shape: ButtonShape;
  size: ButtonSize;
  withIcon?: boolean;
  className?: string;
}): string => {
  if (kind === "solid" && tone === "neutral")
    throw new Error('Button: kind="solid" tone="neutral" is not implemented');
  if (kind === "outline" && tone !== "neutral")
    throw new Error(`Button: kind="outline" tone="${tone}" is not implemented`);
  if (kind === "solid" && tone === "primary") {
    // OK
  } else if (kind === "solid" && tone === "white") {
    // OK
  } else if (kind === "outline" && tone === "neutral") {
    // OK
  } else {
    throw new Error(`Button: kind="${kind}" tone="${tone}" is not implemented`);
  }

  const sizeClass = SIZE_CLASS[size];
  const iconClass = withIcon ? "vv-button-with-icon" : "vv-button-without-icon";

  return [
    "vv-button",
    KIND_CLASS[kind],
    TONE_CLASS[tone],
    SHAPE_CLASS[shape],
    sizeClass,
    iconClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");
};
