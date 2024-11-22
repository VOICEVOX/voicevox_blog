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
  import.meta.glob<ImageMetadata>("./bustup-images/*.png", {
    eager: true,
    import: "default",
  }),
);

/** 立ち絵画像。必ず１つある。 */
export const portraitImages = makeAssetsRecordSingle(
  characterKeys,
  characterEntries,
  import.meta.glob<ImageMetadata>("./portrait-images/*.png", {
    eager: true,
    import: "default",
  }),
);

/** トーク用音声とそのパス。１つもないときもある。 */
export const talkAudiosAndPaths = makeAssetsRecordWithPath(
  characterKeys,
  characterEntries,
  import.meta.glob<string>("./talk-audios/*.wav", {
    eager: true,
    import: "default",
  }),
);

/** ソング用音声とそのパス。１つもないときもある。 */
export const songAudiosAndPaths = makeAssetsRecordWithPath(
  characterKeys,
  characterEntries,
  import.meta.glob<string>("./song-audios/*.wav", {
    eager: true,
    import: "default",
  }),
);

/** ボイボ寮用音声。１つもないときもある。 */
export const dormitoryAudios = makeAssetsRecordOptional(
  characterKeys,
  characterEntries,
  import.meta.glob<string>("./dormitory-audios/*.wav", {
    eager: true,
    import: "default",
  }),
);

/** ボイボ寮用画像。１つもないときもある。 */
export const dormitoryImages = makeAssetsRecordOptional(
  characterKeys,
  characterEntries,
  import.meta.glob<ImageMetadata>("./dormitory-images/*.{png,jpg}", {
    eager: true,
    import: "default",
  }),
);
