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
        className="fixed inset-0 bg-black/50"
        onClick={hide}
        role="presentation"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[670px] rounded-md bg-white shadow-2xl">
          <header className="relative flex items-center justify-center border-b border-gray-300 px-6 py-4">
            <p className="text-xl font-bold text-neutral-900">{title}</p>
            <button
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-2xl leading-none text-neutral-600 hover:bg-neutral-200"
              aria-label="close"
              onClick={hide}
              type="button"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ×
              </span>
            </button>
          </header>
          <section className="px-6 py-6">
            <div
              className="markdown"
              data-theme="light"
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </section>
          <footer className="flex items-center justify-end gap-3 border-t border-gray-300 px-6 py-4" />
        </div>
      </div>
    </div>
  );
}
