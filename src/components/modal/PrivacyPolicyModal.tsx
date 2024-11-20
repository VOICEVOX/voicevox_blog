import { $modal } from "@store";
import ModalMarkdown from "./MarkdownModal";
import { useStore } from "@nanostores/react";

export default (props: { html: string }) => {
  const { html } = props;

  const isActive = useStore($modal).privacyPolicy;
  const hide = () => $modal.setKey("privacyPolicy", false);

  return (
    <ModalMarkdown
      title="プライバシーポリシー"
      html={html}
      isActive={isActive}
      hide={hide}
    />
  );
};
