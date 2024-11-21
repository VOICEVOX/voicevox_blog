import type { CharacterKey } from "@constants/characterEntry";
import { atom } from "nanostores";

/** ダウンロードモーダル */
export const $downloadModal = atom<boolean>(false);

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

/** プライバシーポリシーモーダル */
export const $privacyPolicyModal = atom<boolean>(false);

/** Nemo利用規約モーダル */
export const $nemoTermModal = atom<boolean>(false);

/** Nemo案内モーダル */
export const $nemoGuidanceModal = atom<boolean>(false);
