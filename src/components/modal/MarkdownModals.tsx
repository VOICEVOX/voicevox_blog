import ModalMarkdown from "./MarkdownModal";
import { useStore } from "@nanostores/react";
import { $privacyPolicyModal, $nemoTermModal } from "@store";

export function PrivacyPolicyModal(props: { html: string }) {
  return (
    <ModalMarkdown
      title="プライバシーポリシー"
      html={props.html}
      isActive={useStore($privacyPolicyModal)}
      hide={() => $privacyPolicyModal.set(false)}
    />
  );
}

export function NemoTermModel(props: { html: string }) {
  return (
    <ModalMarkdown
      title="VOICEVOX Nemo 利用規約"
      html={props.html}
      isActive={useStore($nemoTermModal)}
      hide={() => $nemoTermModal.set(false)}
    />
  );
}
