/**
 * 利用規約の導入文モーダル
 */
import ModalMarkdown from "./MarkdownModal";
import type { CharacterKey } from "@/constants/characterEntry";
import { characterInfos } from "@/constants/characterInfo";
import { $libraryTermIntroModal } from "@/store";
import { useStore } from "@nanostores/react";

export default function LibraryTermIntroModal({
  htmls,
  templateHtml,
}: {
  htmls: Record<CharacterKey, string | undefined>;
  templateHtml: string;
}) {
  const store = useStore($libraryTermIntroModal);
  if (!store.show) return undefined;

  const characterKey = store.characterKey;
  const characterInfo = characterInfos[characterKey];

  const title = `${characterInfo.name}` + " 利用規約";

  const html = (() => {
    const characterHtml = htmls[characterKey];
    if (characterHtml) return characterHtml;

    if (!characterInfo.policyUrl) return "<p>準備中</p>";

    return templateHtml
      .replaceAll("VV_TEMPLATE_CHARACTER_NAME", characterInfo.name)
      .replaceAll("VV_TEMPLATE_POLICY_URL", characterInfo.policyUrl);
  })();

  return (
    <ModalMarkdown
      title={title}
      html={html}
      isActive={store.show}
      hide={() => $libraryTermIntroModal.set({ show: false })}
    />
  );
}
