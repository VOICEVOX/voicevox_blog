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
  return (
    <div
      className={`${className} modal` + (isActive ? " is-active" : "")}
      role="dialog"
    >
      <div className="modal-background" onClick={hide}></div>
      <div className="modal-card">
        <header className="modal-card-head has-text-centered">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={hide}
            type="button"
          />
        </header>
        <section className="modal-card-body">
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          ></div>
        </section>
        <footer className="modal-card-foot is-justify-content-flex-end"></footer>
      </div>
    </div>
  );
}
