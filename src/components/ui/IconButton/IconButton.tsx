import type { IconButtonBorderProps, IconButtonSize } from "./helper";
import { buildIconButtonClassName } from "./helper";
import React from "react";

export default function IconButton({
  size,
  border,
  borderWidth,
  className,
  ...props
}: {
  size: IconButtonSize;
  className?: string;
} & IconButtonBorderProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">) {
  const finalClassName = buildIconButtonClassName({
    size,
    className,
    border,
    borderWidth,
  });

  return <button {...props} className={finalClassName} type="button" />;
}
