import Button from "@/components/ui/Button/Button";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useId, useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const isUp = direction === "up";

  return (
    <div
      className={`group relative inline-block ${className || ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div>
        <Button
          kind="outline"
          tone="neutral"
          shape="pill"
          size="md"
          aria-haspopup="true"
          aria-controls={id}
          aria-expanded={forceOpen}
          aria-label={`${characterName}のサンプルボイスのスタイルを選択`}
          endIcon={<FontAwesomeIcon icon={faAngleDown} />}
        >
          {selectedStyle}
        </Button>
      </div>
      <div
        className={`absolute left-0 z-50 w-max min-w-full ${
          isUp ? "pb-xs bottom-full" : "pt-xs top-full"
        } ${forceOpen || isOpen ? "block" : "hidden"}`}
        role="menu"
        id={id}
      >
        <div className="p-2xs rounded-md bg-white shadow-lg ring-1 ring-black/5">
          {styles.map((style, index) => {
            const isSelected = style == selectedStyle;
            return (
              <button
                key={index}
                type="button"
                role="menuitem"
                className={`vv-status-layer px-sm block w-full rounded py-1.5 text-left text-sm whitespace-nowrap ${
                  isSelected
                    ? "bg-primary font-semibold text-neutral-900"
                    : "text-neutral-900"
                }`}
                onMouseDown={() => {
                  setSelectedStyle(style);
                  setIsOpen(false);
                }}
              >
                {style}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
