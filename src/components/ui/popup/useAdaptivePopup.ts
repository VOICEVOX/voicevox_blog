import type { KeyboardEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

type OpenMode = "closed" | "hover" | "pinned";
type OpenCause = "hover" | "pointer" | "keyboard";
type PopupBehavior = "menu" | "panel";

/**
 * ポップアップの開閉とfocus移動を入力手段ごとに揃えるhook。
 * ホバー可能端末ではhoverを優先し、それ以外ではクリックで開閉する。
 * keyboardで開いたときだけcontent側へfocusを移し、それ以外ではfocusを動かさない。
 */
export function useAdaptivePopup({
  behavior,
  forceOpen = false,
}: {
  behavior: PopupBehavior;
  forceOpen?: boolean;
}) {
  const [openMode, setOpenMode] = useState<OpenMode>("closed");
  const [canHover, setCanHover] = useState(false);
  const triggerWrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const openCauseRef = useRef<OpenCause | null>(null);
  const keyboardOpenKeys =
    behavior === "menu"
      ? ["Enter", " ", "ArrowDown", "ArrowUp"]
      : ["Enter", " "];

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
    openCauseRef.current = "hover";
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
    if (forceOpen) {
      return;
    }
    if (!canHover) {
      openCauseRef.current = "pointer";
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const handleTriggerKeyDownCapture = (event: KeyboardEvent) => {
    if (forceOpen || !keyboardOpenKeys.includes(event.key)) {
      return;
    }
    openCauseRef.current = "keyboard";
  };

  const handleContentOpenAutoFocus = (
    event: Event,
    focusFirst?: () => void,
  ) => {
    if (behavior === "menu") {
      return;
    }
    if (openCauseRef.current !== "keyboard") {
      event.preventDefault();
      return;
    }
    if (focusFirst) {
      event.preventDefault();
      focusFirst();
    }
  };

  const handleContentCloseAutoFocus = (event: Event) => {
    if (openCauseRef.current === "keyboard") {
      return;
    }
    event.preventDefault();
  };

  return {
    canHover,
    contentRef,
    handleContentCloseAutoFocus,
    handleContentOpenAutoFocus,
    handleHoverLeave,
    handleOpenChange,
    handleTriggerKeyDownCapture,
    handleTriggerMouseEnter,
    handleTriggerPointerDownCapture,
    open,
    triggerWrapperRef,
  };
}
