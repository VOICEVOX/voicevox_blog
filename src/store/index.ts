/**
 * コンポーネントを超えて状態管理するためのストア。
 */
import type { CharacterKey } from "@/constants/characterEntry";
import { atom } from "nanostores";

/** ダウンロードモーダル */
export const $downloadModal = atom<boolean>(false);

/** ダウンロードモーダルを表示するための属性。この属性を持つ要素がクリックされるとモーダルを表示する */
export const showDownloadModalAttr = "data-voicevox-show-download-modal";

/** Nemoダウンロードモーダル */
export const $nemoDownloadModal = atom<boolean>(false);

/** 利用規約の導入文モーダル */
export const $libraryTermIntroModal = atom<
  | { show: false }
  | {
      show: true;
      characterKey: CharacterKey;
    }
>({ show: false });

/** 利用規約の導入文モーダルを表示するための属性。この属性を持つ要素がクリックされると、対応するキャラクターのモーダルを表示する */
export const showLibraryTermIntroModalCharacterKeyAttr =
  "data-voicevox-show-library-term-intro-modal-character-key";

/** プライバシーポリシーモーダル */
export const $privacyPolicyModal = atom<boolean>(false);

/** プライバシーポリシーモーダルを表示するための属性。この属性を持つ要素がクリックされるとモーダルを表示する */
export const showPrivacyPolicyModalAttr =
  "data-voicevox-show-privacy-policy-modal";

/** Nemo利用規約モーダル */
export const $nemoTermModal = atom<boolean>(false);

/** Nemo利用規約モーダルを表示するための属性。この属性を持つ要素がクリックされるとモーダルを表示する */
export const showNemoTermModalAttr = "data-voicevox-show-nemo-term-modal";

/** Nemo案内モーダル */
export const $nemoGuidanceModal = atom<boolean>(false);

/** Nemo案内モーダルを表示するための属性。この属性を持つ要素がクリックされるとモーダルを表示する */
export const showNemoGuidanceModalAttr =
  "data-voicevox-show-nemo-guidance-modal";
