import ModalShell from "./ModalShell";

export default function MarkdownModal({
  isActive,
  title,
  html,
  hide,
}: {
  isActive: boolean;
  title: string;
  html: string;
  hide: () => void;
}) {
  return (
    <ModalShell isActive={isActive} title={title} onClose={hide} footer={null}>
      <div
        className="markdown"
        data-theme="light"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </ModalShell>
  );
}
