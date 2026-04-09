import IconButton from "@/components/ui/IconButton/IconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

export default function ModalShell({
  isActive,
  title,
  onClose,
  children,
  footer,
}: {
  isActive: boolean;
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <Dialog.Root
      open={isActive}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-(--z-modal) bg-black/80" />
        <div className="p-md pointer-events-none fixed inset-0 z-(--z-modal) box-border flex items-center justify-center">
          <Dialog.Content
            aria-describedby={undefined}
            className="pointer-events-auto flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
            data-theme="light"
          >
            <header className="px-xl py-lg relative flex items-center justify-center border-b border-neutral-200 bg-neutral-50">
              <Dialog.Title className="text-2xl font-bold text-black">
                {title}
              </Dialog.Title>
              <Dialog.Close asChild>
                <IconButton
                  size="sm"
                  className="right-lg absolute top-1/2 -translate-y-1/2 text-neutral-700"
                  aria-label="close"
                >
                  <span aria-hidden="true" className="text-xl leading-none">
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                </IconButton>
              </Dialog.Close>
            </header>

            <section className="px-xl py-2xl min-h-0 flex-1 overflow-y-auto">
              {children}
            </section>

            {footer !== undefined && (
              <footer className="gap-sm px-xl py-lg flex items-center justify-end border-t border-neutral-200 bg-neutral-50">
                {footer}
              </footer>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
