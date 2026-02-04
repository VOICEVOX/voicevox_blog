export default function MarkdownModal({
  isActive,
  title,
  html,
  hide,
  className,
}: {
  isActive: boolean;
  title: string;
  html: string;
  hide: () => void;
  className?: string;
}) {
  if (!isActive) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${className || ""}`}
      role="dialog"
      data-theme="light"
    >
      <div
        className="fixed inset-0 bg-black/80"
        onClick={hide}
        role="presentation"
      />
      <div className="pointer-events-none fixed inset-0 box-border flex items-center justify-center p-4">
        <div className="pointer-events-auto flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
          <header className="relative flex items-center justify-center border-b border-gray-200 bg-neutral-50 px-6 py-5">
            <p className="text-2xl font-bold text-black">{title}</p>
            <button
              className="absolute top-1/2 right-5 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-neutral-700 transition-colors hover:text-neutral-900"
              aria-label="close"
              onClick={hide}
              type="button"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                ×
              </span>
            </button>
          </header>
          <section className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
            <div
              className="markdown"
              data-theme="light"
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </section>
          <footer className="flex items-center justify-end gap-3 border-t border-gray-200 bg-neutral-50 px-6 py-5" />
        </div>
      </div>
    </div>
  );
}
