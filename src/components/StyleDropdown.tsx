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
        <button
          className="focus-visible:ring-primary/40 inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-md py-xs text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 focus:outline-none focus-visible:ring-2"
          aria-haspopup="true"
          aria-controls={id}
          aria-expanded={forceOpen}
          type="button"
          aria-label={`${characterName}のサンプルボイスのスタイルを選択`}
        >
          <span className="whitespace-nowrap">{selectedStyle}</span>
          <span className="-mr-2xs shrink-0 text-neutral-500">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
      </div>
      <div
        className={`absolute left-0 z-50 w-max min-w-full ${
          isUp ? "bottom-full pb-xs" : "top-full pt-xs"
        } ${forceOpen || isOpen ? "block" : "hidden"}`}
        role="menu"
        id={id}
      >
        <div className="rounded-md bg-white p-2xs shadow-lg ring-1 ring-black/5">
          {styles.map((style, index) => {
            const isSelected = style == selectedStyle;
            return (
              <button
                key={index}
                type="button"
                role="menuitem"
                className={`block w-full rounded px-sm py-1.5 text-left text-sm whitespace-nowrap ${
                  isSelected
                    ? "bg-primary hover:bg-primary/90 font-semibold text-neutral-900"
                    : "text-neutral-900 hover:bg-neutral-100"
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
