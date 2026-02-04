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
  const id = useId();

  const isUp = className?.split(/\s+/).includes("is-up") ?? false;
  const forceOpen = className?.split(/\s+/).includes("is-active") ?? false;
  const additionalClasses =
    className
      ?.replace(/\bis-(up|active)\b/g, "")
      .trim()
      .replace(/\s+/g, " ") || "";

  return (
    <div className={`group relative inline-block ${additionalClasses}`}>
      <div>
        <button
          className="focus-visible:ring-primary/40 inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 focus:outline-none focus-visible:ring-2"
          aria-haspopup="true"
          aria-controls={id}
          aria-expanded={forceOpen}
          type="button"
          aria-label={`${characterName}のサンプルボイスのスタイルを選択`}
        >
          <span className="whitespace-nowrap">{selectedStyle}</span>
          <span className="shrink-0 text-neutral-500">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
      </div>
      <div
        className={`absolute left-0 z-50 w-max min-w-full ${
          isUp ? "bottom-full pb-2" : "top-full pt-2"
        } ${forceOpen ? "block" : "hidden group-hover:block"}`}
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
                className={`block w-full rounded px-3 py-1.5 text-left text-sm whitespace-nowrap ${
                  isSelected
                    ? "bg-primary hover:bg-primary/90 font-semibold text-neutral-900"
                    : "text-neutral-900 hover:bg-neutral-100"
                }`}
                onMouseDown={() => {
                  setSelectedStyle(style);
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
