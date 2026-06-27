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
        <div className="p-sm pointer-events-none fixed inset-0 z-(--z-modal) box-border flex items-center justify-center">
          <Dialog.Content
            aria-describedby={undefined}
            className="pointer-events-auto flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
            data-theme="light"
          >
            <header className="gap-sm px-xl py-lg flex items-center border-b-2 border-neutral-200 bg-neutral-50">
              <div className="w-8 shrink-0 max-sm:hidden" aria-hidden />
              <Dialog.Title className="min-w-0 flex-1 text-center text-2xl font-bold text-black max-sm:text-left">
                {title}
              </Dialog.Title>
              <Dialog.Close asChild>
                <IconButton
                  size="sm"
                  className="text-neutral-700"
                  aria-label="閉じる"
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
              <footer className="gap-sm px-xl py-lg flex items-center justify-end border-t-2 border-neutral-200 bg-neutral-50">
                {footer}
              </footer>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
