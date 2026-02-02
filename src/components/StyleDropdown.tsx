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
  className,
}: {
  styles: string[];
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  characterName: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const id = useId();

  const isUp = className?.split(/\s+/).includes("is-up") ?? false;
  const forceOpen = className?.split(/\s+/).includes("is-active") ?? false;
  const isOpen = forceOpen || isOpenDropdown;
  const additionalClasses =
    className
      ?.replace(/\bis-(up|active)\b/g, "")
      .trim()
      .replace(/\s+/g, " ") || "";

  return (
    <div
      className={`relative inline-block ${additionalClasses}`}
      onMouseEnter={() => setIsOpenDropdown(true)}
      onMouseLeave={() => setIsOpenDropdown(false)}
    >
      <div>
        <button
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-haspopup="true"
          aria-controls={id}
          aria-expanded={isOpen}
          type="button"
          onFocus={() => setIsOpenDropdown(true)}
          onBlur={() => setIsOpenDropdown(false)}
          aria-label={`${characterName}のサンプルボイスのスタイルを選択`}
        >
          <span className="whitespace-nowrap">{selectedStyle}</span>
          <span className="shrink-0 text-neutral-500">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
      </div>
      {isOpen && (
        <div
          className={`absolute left-0 z-50 min-w-full w-max ${
            isUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
          role="menu"
          id={id}
        >
          <div className="rounded-md bg-white p-1 shadow-lg ring-1 ring-black/5">
            {styles.map((style, index) => {
              const isSelected = style == selectedStyle;
              return (
                <button
                  key={index}
                  type="button"
                  role="menuitem"
                  className={`block w-full rounded px-3 py-2 text-left text-sm whitespace-nowrap ${
                    isSelected
                      ? "bg-primary text-neutral-900 hover:bg-primary/90 font-semibold"
                      : "text-neutral-900 hover:bg-neutral-100"
                  }`}
                  onMouseDown={() => {
                    setSelectedStyle(style);
                    setIsOpenDropdown(false);
                  }}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
