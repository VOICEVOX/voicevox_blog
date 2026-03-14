import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

type OpenMode = "closed" | "hover" | "pinned";

/** ドロップダウンをホバー可能端末ではホバーで、それ以外ではクリックで開閉するためのhook */
export function useAdaptiveDropdown({ forceOpen = false } = {}) {
  const [openMode, setOpenMode] = useState<OpenMode>("closed");
  const [canHover, setCanHover] = useState(false);
  const triggerWrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const open = forceOpen || openMode !== "closed";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCanHover = () => {
      setCanHover(mediaQuery.matches);
    };

    updateCanHover();
    mediaQuery.addEventListener("change", updateCanHover);
    return () => {
      mediaQuery.removeEventListener("change", updateCanHover);
    };
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    if (forceOpen) {
      return;
    }
    setOpenMode(nextOpen ? "pinned" : "closed");
  };

  const handleTriggerMouseEnter = () => {
    if (forceOpen || !canHover || openMode === "pinned") {
      return;
    }
    setOpenMode("hover");
  };

  const handleHoverLeave = (relatedTarget: EventTarget | null) => {
    if (forceOpen || !canHover || openMode !== "hover") {
      return;
    }

    if (relatedTarget instanceof Node) {
      if (triggerWrapperRef.current?.contains(relatedTarget)) {
        return;
      }
      if (contentRef.current?.contains(relatedTarget)) {
        return;
      }
    }

    setOpenMode("closed");
  };

  const handleTriggerPointerDownCapture = (event: PointerEvent) => {
    if (forceOpen || !canHover) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  };

  return {
    canHover,
    contentRef,
    handleHoverLeave,
    handleOpenChange,
    handleTriggerMouseEnter,
    handleTriggerPointerDownCapture,
    open,
    triggerWrapperRef,
  };
}
