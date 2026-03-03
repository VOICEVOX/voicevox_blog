import IconButton from "@/components/ui/IconButton/IconButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" data-theme="light">
      <div
        className="fixed inset-0 bg-black/80"
        onClick={onClose}
        role="presentation"
      />
      <div className="p-md pointer-events-none fixed inset-0 box-border flex items-center justify-center">
        <div className="pointer-events-auto flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
          <header className="px-xl py-lg relative flex items-center justify-center border-b border-neutral-200 bg-neutral-50">
            <p className="text-2xl font-bold text-black">{title}</p>
            <IconButton
              size="sm"
              className="absolute top-1/2 right-5 -translate-y-1/2 text-neutral-700"
              aria-label="close"
              onClick={onClose}
            >
              <span aria-hidden="true" className="text-xl leading-none">
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </IconButton>
          </header>

          <section className="px-xl py-2xl min-h-0 flex-1 overflow-y-auto">
            {children}
          </section>

          {footer !== undefined && (
            <footer className="gap-sm px-xl py-lg flex items-center justify-end border-t border-neutral-200 bg-neutral-50">
              {footer}
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
