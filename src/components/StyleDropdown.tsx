import Button from "@/components/ui/Button/Button";
import { useAdaptivePopup } from "@/components/ui/popup/useAdaptivePopup";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";

export function useStyleDropdownController({ styles }: { styles: string[] }) {
  const [selectedStyle, setSelectedStyle] = useState(
    styles.length > 0 ? styles[0] : undefined,
  );
  return {
    selectedStyle,
    setSelectedStyle,
  };
}

export default function StyleDropdown({
  styles,
  selectedStyle,
  setSelectedStyle,
  characterName,
  direction = "down",
  forceOpen = false,
  className,
}: {
  styles: string[];
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  characterName: string;
  direction?: "up" | "down";
  forceOpen?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  const isUp = direction === "up";
  const {
    contentRef,
    handleContentCloseAutoFocus,
    handleHoverLeave,
    handleOpenChange,
    handleTriggerKeyDownCapture,
    handleTriggerMouseEnter,
    handleTriggerPointerDownCapture,
    open,
    triggerWrapperRef,
  } = useAdaptivePopup({
    behavior: "menu",
    forceOpen,
  });

  return (
    <DropdownMenu.Root
      modal={false}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className={`relative inline-block ${className || ""}`}>
        <div
          ref={triggerWrapperRef}
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={(event) => {
            handleHoverLeave(event.relatedTarget);
          }}
        >
          <DropdownMenu.Trigger asChild>
            <Button
              kind="outline"
              tone="neutral"
              shape="pill"
              size="md"
              aria-label={`${characterName}のサンプルボイスのスタイルを選択`}
              endIcon={<FontAwesomeIcon icon={faAngleDown} />}
              onMouseEnter={handleTriggerMouseEnter}
              onKeyDownCapture={handleTriggerKeyDownCapture}
              onPointerDownCapture={handleTriggerPointerDownCapture}
            >
              {selectedStyle}
            </Button>
          </DropdownMenu.Trigger>
        </div>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            ref={contentRef}
            side={isUp ? "top" : "bottom"}
            align="start"
            className="p-2xs z-(--z-popup) w-max min-w-32 rounded-md bg-white shadow-lg ring-1 ring-black/5"
            onCloseAutoFocus={handleContentCloseAutoFocus}
            onMouseLeave={(event) => {
              handleHoverLeave(event.relatedTarget);
            }}
          >
            <DropdownMenu.RadioGroup
              value={selectedStyle}
              onValueChange={setSelectedStyle}
            >
              {styles.map((style) => (
                <DropdownMenu.RadioItem
                  key={style}
                  value={style}
                  className="vv-status-layer px-md data-[state=checked]:bg-primary block w-full rounded py-1.5 text-left text-sm whitespace-nowrap text-neutral-900 data-[state=checked]:font-semibold"
                >
                  {style}
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </div>
    </DropdownMenu.Root>
  );
}
