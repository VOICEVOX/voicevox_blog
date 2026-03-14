import { buildIconButtonClassName } from "@/components/ui/IconButton/helper";
import { useAdaptivePopup } from "@/components/ui/popup/useAdaptivePopup";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Collapsible from "@radix-ui/react-collapsible";

const CONTACT_LINKS = [
  {
    icon: faHome,
    key: "homepage",
    label: "ホームページ",
  },
  {
    icon: faXTwitter,
    key: "twitter",
    label: "SNS",
  },
  {
    icon: faEnvelope,
    key: "email",
    label: "メールアドレス",
  },
] as const;

type LinkKey = (typeof CONTACT_LINKS)[number]["key"];

export default function CvPanel({
  cv,
  cvId,
  forceOpen = false,
  links,
}: {
  cv: string;
  cvId: string;
  forceOpen?: boolean;
  links: Partial<Record<LinkKey, string>>;
}) {
  const {
    canHover,
    contentRef,
    handleHoverLeave,
    handleOpenChange,
    handleTriggerMouseEnter,
    handleTriggerPointerDownCapture,
    open,
    triggerWrapperRef,
  } = useAdaptivePopup({ forceOpen });

  return (
    <Collapsible.Root open={open} onOpenChange={handleOpenChange}>
      <div className="relative inline-block">
        <div
          ref={triggerWrapperRef}
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={(event) => {
            handleHoverLeave(event.relatedTarget);
          }}
        >
          <Collapsible.Trigger asChild>
            <button
              className="inline-flex h-auto items-center gap-0 border-none bg-transparent px-0 py-0 text-white underline hover:text-white active:text-white"
              aria-controls={`panel-${cvId}`}
              aria-label={`${cv}のご依頼先を表示`}
              aria-expanded={open}
              onClickCapture={(event) => {
                if (!canHover || event.detail === 0) {
                  return;
                }
                event.preventDefault();
                event.stopPropagation();
              }}
              onMouseEnter={handleTriggerMouseEnter}
              type="button"
              onPointerDownCapture={handleTriggerPointerDownCapture}
            >
              <span className="px-xs inline-block max-w-full overflow-hidden text-xl text-ellipsis whitespace-nowrap max-lg:text-base">
                {cv}
              </span>
            </button>
          </Collapsible.Trigger>
        </div>
        <Collapsible.Content
          ref={contentRef}
          className="pt-2xs absolute top-full left-1/2 z-50 w-max -translate-x-1/2"
          id={`panel-${cvId}`}
          onMouseLeave={(event) => {
            handleHoverLeave(event.relatedTarget);
          }}
        >
          <div className="p-sm min-w-44 rounded-md bg-[#2e333d] shadow-lg ring-1 ring-black/20">
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
        </Collapsible.Content>
      </div>
    </Collapsible.Root>
  );
}
