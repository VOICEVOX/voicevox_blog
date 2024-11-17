import type { AstroAudio, AstroImage } from "@types";

import { characterEntries, characterKeys } from "./characterEntry";
import {
  makeAssetsRecordOptional,
  makeAssetsRecordSingle,
  makeAssetsRecordWithPath,
} from "@helper";

/** バストアップ画像。必ず１つある。 */
export const bustupImages = makeAssetsRecordSingle(
  characterKeys,
  characterEntries,
  import.meta.glob<AstroImage>("./bustup-images/*.png"),
);

/** 立ち絵画像。必ず１つある。 */
export const portraitImages = makeAssetsRecordSingle(
  characterKeys,
  characterEntries,
  import.meta.glob<AstroImage>("./portrait-images/*.png"),
);

/** トーク用音声とそのパス。１つもないときもある。 */
export const talkAudiosAndPaths = makeAssetsRecordWithPath(
  characterKeys,
  characterEntries,
  import.meta.glob<AstroAudio>("./talk-audios/*.wav"),
);

/** ソング用音声とそのパス。１つもないときもある。 */
export const songAudiosAndPaths = makeAssetsRecordWithPath(
  characterKeys,
  characterEntries,
  import.meta.glob<AstroAudio>("./song-audios/*.wav"),
);

/** ボイボ寮用音声。１つもないときもある。 */
export const dormitoryAudios = makeAssetsRecordOptional(
  characterKeys,
  characterEntries,
  import.meta.glob<AstroAudio>("./dormitory-audios/*.wav"),
);

/** ボイボ寮用画像。１つもないときもある。 */
export const dormitoryImages = makeAssetsRecordOptional(
  characterKeys,
  characterEntries,
  import.meta.glob<AstroImage>("./dormitory-images/*.wav"),
);
