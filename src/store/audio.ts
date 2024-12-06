/** 音声再生のストア */
import { atom } from "nanostores";

/** 最後に再生した音声 */
export const $lastAudio = atom<HTMLAudioElement | undefined>();

// 再生していた音声を停止する
$lastAudio.listen((_, oldState) => {
  if (oldState) {
    oldState.pause();
  }
});
