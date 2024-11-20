import type { CharacterKey } from "@constants/characterEntry";
import { atom } from "nanostores";

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

/** NEMO利用規約モーダル */
export const $nemoTermModal = atom<boolean>(false);
