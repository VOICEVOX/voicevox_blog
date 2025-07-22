import type { Styles } from "../type";
import {
  bustupImages,
  toppageBustupImages,
  portraitImages,
  dormitoryAudios,
  dormitoryImages,
  songAudiosAndPaths,
  talkAudiosAndPaths,
  productShareImages,
  dormitoryShareImages,
} from "@/constants/characaterAsset";
import type { CharacterKey } from "@/constants/characterEntry";

function getBasename(filePath: string): string {
  return filePath.split("/").pop() || filePath.split("\\").pop() || filePath;
}

/** トーク用音声をスタイルごとに分ける */
function makeTalkVoiceAudios(key: CharacterKey, styles: Styles) {
  return styles
    .filter((v) => v.type == "talk")
    .map((v) => {
      const urls = talkAudiosAndPaths[key]
        .filter((obj) => getBasename(obj.path).includes(v.id))
        .map((obj) => obj.asset);
      if (urls.length !== 0 && urls.length !== 3) {
        throw new Error(
          `キャラクター「${key}」の音声（スタイル：${v.name}、タイプ：${v.type}）の数が0または3ではありません。現在の数：${urls.length}`,
        );
      }
      return { style: v.name, urls };
    });
}

/** ソング音声をスタイルごとに分ける */
function makeSongVoiceAudios(key: CharacterKey, styles: Styles) {
  return styles
    .filter((v) => ["song", "humming"].includes(v.type))
    .map((v) => {
      const urls = songAudiosAndPaths[key]
        .filter(
          (obj) =>
            getBasename(obj.path).includes(v.id) &&
            getBasename(obj.path).includes(v.type),
        )
        .map((obj) => obj.asset);
      if (urls.length !== 0 && urls.length !== 3) {
        throw new Error(
          `キャラクター「${key}」の音声（スタイル：${v.name}、タイプ：${v.type}）の数が0または3ではありません。現在の数：${urls.length}`,
        );
      }
      return { style: v.name, styleType: v.type as "song" | "humming", urls };
    });
}

/** キャラクターごとのアセットを取得する */
export function getCharacterAssets(key: CharacterKey, styles: Styles) {
  return {
    bustupImage: bustupImages[key],
    toppageBustupImage: toppageBustupImages[key],
    portraitImage: portraitImages[key],
    talkVoiceAudios: makeTalkVoiceAudios(key, styles),
    songVoiceAudios: makeSongVoiceAudios(key, styles),
    productShareImage: productShareImages[key],
    dormitoryVoiceAudios: dormitoryAudios[key],
    dormitoryImages: dormitoryImages[key],
    dormitoryShareImage: dormitoryShareImages[key],
  };
}
