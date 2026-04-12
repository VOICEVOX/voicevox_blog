import type { ButtonKind, ButtonShape, ButtonSize, ButtonTone } from "./helper";
import { buildButtonClassName } from "./helper";
import React from "react";

type ButtonBaseProps = {
  kind: ButtonKind;
  tone: ButtonTone;
  shape: ButtonShape;
  size: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
};

type AnchorProps = ButtonBaseProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "onClick"
  > & {
    href: string;
  };

type NativeButtonProps = ButtonBaseProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "type" | "disabled"
  > & {
    href?: never;
  };

function isAnchorProps(
  props: AnchorProps | NativeButtonProps,
): props is AnchorProps {
  return "href" in props;
}

export default function Button(props: AnchorProps | NativeButtonProps) {
  if (isAnchorProps(props)) {
    const {
      href,
      kind,
      tone,
      shape,
      size,
      className,
      icon,
      endIcon,
      children,
      ...htmlAttrs
    } = props;

    const withIcon = icon != null || endIcon != null;
    const finalClassName = buildButtonClassName({
      kind,
      tone,
      shape,
      size,
      withIcon,
      className,
    });

    return (
      <a {...htmlAttrs} className={finalClassName} href={href}>
        {icon != null && (
          <span className="vv-button-icon vv-button-icon-start">{icon}</span>
        )}
        <span className="vv-button-label">{children}</span>
        {endIcon != null && (
          <span className="vv-button-icon vv-button-icon-end">{endIcon}</span>
        )}
      </a>
    );
  }

  const {
    kind,
    tone,
    shape,
    size,
    className,
    icon,
    endIcon,
    children,
    ...htmlAttrs
  } = props;

  const withIcon = icon != null || endIcon != null;
  const finalClassName = buildButtonClassName({
    kind,
    tone,
    shape,
    size,
    withIcon,
    className,
  });

  return (
    <button {...htmlAttrs} className={finalClassName} type="button">
      {icon != null && (
        <span className="vv-button-icon vv-button-icon-start">{icon}</span>
      )}
      <span className="vv-button-label">{children}</span>
      {endIcon != null && (
        <span className="vv-button-icon vv-button-icon-end">{endIcon}</span>
      )}
    </button>
  );
}
