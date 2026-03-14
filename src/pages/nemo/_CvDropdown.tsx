import { buildIconButtonClassName } from "@/components/ui/IconButton/helper";
import { useAdaptiveDropdown } from "@/components/ui/dropdown/useAdaptiveDropdown";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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

export default function CvDropdown({
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
    contentRef,
    handleHoverLeave,
    handleOpenChange,
    handleTriggerMouseEnter,
    handleTriggerPointerDownCapture,
    open,
    triggerWrapperRef,
  } = useAdaptiveDropdown({ forceOpen });

  return (
    <DropdownMenu.Root
      modal={false}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="relative inline-block">
        <div
          ref={triggerWrapperRef}
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={(event) => {
            handleHoverLeave(event.relatedTarget);
          }}
        >
          <DropdownMenu.Trigger asChild>
            <button
              className="inline-flex h-auto items-center gap-0 border-none bg-transparent px-0 py-0 text-white underline hover:text-white active:text-white"
              aria-controls={`dropdown-${cvId}`}
              aria-haspopup="menu"
              aria-label={`${cv}のご依頼先を表示`}
              onMouseEnter={handleTriggerMouseEnter}
              type="button"
              onPointerDownCapture={handleTriggerPointerDownCapture}
            >
              <span className="px-xs inline-block max-w-full overflow-hidden text-xl text-ellipsis whitespace-nowrap max-lg:text-base">
                {cv}
              </span>
            </button>
          </DropdownMenu.Trigger>
        </div>
        <DropdownMenu.Content
          ref={contentRef}
          align="start"
          className="pt-xs absolute top-full left-0 z-50 w-max min-w-full"
          id={`dropdown-${cvId}`}
          onMouseLeave={(event) => {
            handleHoverLeave(event.relatedTarget);
          }}
        >
          <div className="p-sm min-w-56 rounded-md bg-[#2e333d] shadow-lg ring-1 ring-black/20">
            <div className="gap-xs flex flex-col items-center text-center text-white">
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
                        size: "lg",
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
        </DropdownMenu.Content>
      </div>
    </DropdownMenu.Root>
  );
}
