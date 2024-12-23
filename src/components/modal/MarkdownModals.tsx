import ModalMarkdown from "./MarkdownModal";
import { $privacyPolicyModal, $nemoTermModal } from "@/store";
import { useStore } from "@nanostores/react";

export function PrivacyPolicyModal({ html }: { html: string }) {
  return (
    <ModalMarkdown
      title="プライバシーポリシー"
      html={html}
      isActive={useStore($privacyPolicyModal)}
      hide={() => $privacyPolicyModal.set(false)}
    />
  );
}

export function NemoTermModel({ html }: { html: string }) {
  return (
    <ModalMarkdown
      title="VOICEVOX Nemo 利用規約"
      html={html}
      isActive={useStore($nemoTermModal)}
      hide={() => $nemoTermModal.set(false)}
    />
  );
}
