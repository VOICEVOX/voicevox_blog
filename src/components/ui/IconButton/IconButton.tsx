import type { IconButtonSize } from "./helper";
import { buildIconButtonClassName } from "./helper";
import React from "react";

export default function IconButton({
  size,
  border,
  className,
  ...props
}: {
  size: IconButtonSize;
  border?: boolean;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">) {
  const finalClassName = buildIconButtonClassName({
    size,
    className,
    border,
  });

  return <button {...props} className={finalClassName} type="button" />;
}
