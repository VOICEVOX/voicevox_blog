import type { CharacterKey } from "@constants/characterEntry";
import type { Styles } from "../type";
import {
  bustupImages,
  portraitImages,
  dormitoryAudios,
  dormitoryImages,
  songAudiosAndPaths,
  talkAudiosAndPaths,
  productShareImages,
  dormitoryShareImages,
} from "@constants/characaterAsset";

/** トーク用音声をスタイルごとに分ける */
function makeTalkVoiceAudios(key: CharacterKey, styles: Styles) {
  return styles
    .filter((v) => v.type == "talk")
    .map((v) => ({
      style: v.name,
      urls: talkAudiosAndPaths[key]
        .filter((obj) => obj.path.includes(v.id))
        .map((obj) => obj.asset),
    }));
}

/** ソング音声をスタイルごとに分ける */
function makeSongVoiceAudios(key: CharacterKey, styles: Styles) {
  return styles
    .filter((v) => ["song", "humming"].includes(v.type))
    .map((v) => ({
      style: v.name,
      styleType: v.type as "song" | "humming",
      urls: songAudiosAndPaths[key]
        .filter((obj) => obj.path.includes(v.id))
        .map((obj) => obj.asset),
    }));
}

/** キャラクターごとのアセットを取得する */
export function getCharacterAssets(key: CharacterKey, styles: Styles) {
  return {
    bustupImage: bustupImages[key],
    portraitImage: portraitImages[key],
    talkVoiceAudios: makeTalkVoiceAudios(key, styles),
    songVoiceAudios: makeSongVoiceAudios(key, styles),
    productShareImage: productShareImages[key],
    dormitoryVoiceAudios: dormitoryAudios[key],
    dormitoryImages: dormitoryImages[key],
    dormitoryShareImage: dormitoryShareImages[key],
  };
}
