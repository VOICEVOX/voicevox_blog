import type { CharacterKey } from "@constants/characterEntry";
import type { Styles } from "../type";
import {
  songAudiosAndPaths,
  talkAudiosAndPaths,
} from "@constants/characaterAsset";

/** トーク用音声をスタイルごとに分ける */
export function makeTalkVoiceUrls(styles: Styles, key: CharacterKey) {
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
export function makeSongVoiceUrls(styles: Styles, key: CharacterKey) {
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
