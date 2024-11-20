/**
 * 利用規約の導入文モーダル
 */

import { useStore } from "@nanostores/react";
import { useMemo } from "react";

import ModalMarkdown from "./MarkdownModal";

import type { CharacterKey } from "@constants/characterEntry";
import { characterInfos } from "@constants/characterInfo";
import { $libraryTermIntroModal } from "@/store";

export default (props: {
  htmls: Record<CharacterKey, string | undefined>;
  templateHtml: string;
}) => {
  const { htmls, templateHtml } = props;

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
};
