import { buildIconButtonClassName } from "@/components/ui/IconButton/helper";
import { useAdaptivePopup } from "@/components/ui/popup/useAdaptivePopup";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Popover from "@radix-ui/react-popover";

const CONTACT_LINKS = [
  { icon: faHome, key: "homepage", label: "ホームページ" },
  { icon: faXTwitter, key: "twitter", label: "SNS" },
  { icon: faEnvelope, key: "email", label: "メールアドレス" },
] as const;

type LinkKey = (typeof CONTACT_LINKS)[number]["key"];

export default function CvPanel({
  cv,
  forceOpen = false,
  links,
}: {
  cv: string;
  forceOpen?: boolean;
  links: Partial<Record<LinkKey, string>>;
}) {
  const {
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
  } = useAdaptivePopup({ behavior: "panel", forceOpen });

  return (
    <Popover.Root modal={false} open={open} onOpenChange={handleOpenChange}>
      <div className="inline-block">
        <div
          ref={triggerWrapperRef}
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={(event) => {
            handleHoverLeave(event.relatedTarget);
          }}
        >
          <Popover.Trigger asChild>
            <button
              className="inline-flex h-auto items-center gap-0 border-none bg-transparent px-0 py-0 text-white underline hover:text-white active:text-white"
              aria-label={`${cv}のご依頼先を表示`}
              onClickCapture={(event) => {
                if (!canHover || event.detail === 0) {
                  return;
                }
                event.preventDefault();
                event.stopPropagation();
              }}
              onMouseEnter={handleTriggerMouseEnter}
              onKeyDownCapture={handleTriggerKeyDownCapture}
              type="button"
              onPointerDownCapture={handleTriggerPointerDownCapture}
            >
              <span className="px-xs inline-block max-w-full overflow-hidden text-xl text-ellipsis whitespace-nowrap max-lg:text-base">
                {cv}
              </span>
            </button>
          </Popover.Trigger>
        </div>
        <Popover.Portal>
          <Popover.Content
            ref={contentRef}
            side="bottom"
            align="center"
            sideOffset={0}
            className="pt-2xs w-max"
            onCloseAutoFocus={handleContentCloseAutoFocus}
            onOpenAutoFocus={(event) => {
              handleContentOpenAutoFocus(event, () => {
                contentRef.current
                  ?.querySelector<HTMLAnchorElement>("a")
                  ?.focus();
              });
            }}
            onMouseLeave={(event) => {
              handleHoverLeave(event.relatedTarget);
            }}
          >
            <div className="p-sm min-w-44 rounded-md bg-zinc-800 shadow-lg ring-1 ring-black/20">
              <div className="gap-2xs flex flex-col items-center text-center text-white">
                <span className="text-sm">音声収録のご依頼先</span>
                <div className="gap-xs flex">
                  {CONTACT_LINKS.map(({ icon, key, label }) => {
                    const link = links[key];
                    if (!link) {
                      return null;
                    }
                    return (
                      <a
                        key={key}
                        href={link}
                        className={buildIconButtonClassName({
                          size: "md",
                          className: "mb-0 ml-auto text-xl text-white",
                        })}
                        aria-label={`${cv}の${label}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FontAwesomeIcon icon={icon} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
}
