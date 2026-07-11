import { characterEntries, characterKeys } from "./characterEntry";
import {
  isDevelopment,
  makeAssetsRecordOptional,
  makeAssetsRecordSingle,
  makeAssetsRecordSingleOptional,
  makeAssetsRecordWithPath,
} from "@/helper";

/** バストアップ画像。必ず１つある。 */
export const bustupImages = makeAssetsRecordSingle(
  characterKeys,
  characterEntries,
  import.meta.glob<ImageMetadata>("@/assets/bustup-images/*.png", {
    eager: true,
    import: "default",
  }),
);

/** トップページのバストアップ画像。１つもないか、１つある。 */
export const toppageBustupImages = makeAssetsRecordSingleOptional(
  characterKeys,
  characterEntries,
  import.meta.glob<ImageMetadata>("@/assets/bustup-images/toppage/*.png", {
    eager: true,
    import: "default",
  }),
);

/** 立ち絵画像。必ず１つある。 */
export const portraitImages = makeAssetsRecordSingle(
  characterKeys,
  characterEntries,
  import.meta.glob<ImageMetadata>("@/assets/portrait-images/*.png", {
    eager: true,
    import: "default",
  }),
);

/** トーク用音声とそのパス。１つもないときもある。 */
export const talkAudiosAndPaths = makeAssetsRecordWithPath(
  characterKeys,
  characterEntries,
  import.meta.glob<string>("@/assets/talk-audios/*.wav", {
    eager: true,
    import: "default",
  }),
);

/** ソング用音声とそのパス。１つもないときもある。 */
export const songAudiosAndPaths = makeAssetsRecordWithPath(
  characterKeys,
  characterEntries,
  import.meta.glob<string>("@/assets/song-audios/*.wav", {
    eager: true,
    import: "default",
  }),
);

/** 製品ページのサムネイル画像。開発時は１つもないときもある。製品時は必ず１つある。 */
export const productShareImages = (
  isDevelopment ? makeAssetsRecordSingleOptional : makeAssetsRecordSingle
)(
  characterKeys,
  characterEntries,
  import.meta.glob<ImageMetadata>("@/assets/product-share-images/*.png", {
    eager: true,
    import: "default",
  }),
);

/** ボイボ寮用音声。１つもないときもある。 */
export const dormitoryAudios = makeAssetsRecordOptional(
  characterKeys,
  characterEntries,
  import.meta.glob<string>("@/assets/dormitory-audios/*.wav", {
    eager: true,
    import: "default",
  }),
);

/** ボイボ寮用画像。１つもないときもある。 */
export const dormitoryImages = makeAssetsRecordOptional(
  characterKeys,
  characterEntries,
  import.meta.glob<ImageMetadata>("@/assets/dormitory-images/*.{png,jpg}", {
    eager: true,
    import: "default",
  }),
);

/** ボイボ寮個別ページのサムネイル画像。開発時は１つもないときもある。製品時は必ず１つある。 */
export const dormitoryShareImages = (
  isDevelopment ? makeAssetsRecordSingleOptional : makeAssetsRecordSingle
)(
  characterKeys,
  characterEntries,
  import.meta.glob<ImageMetadata>("@/assets/dormitory-share-images/*.png", {
    eager: true,
    import: "default",
  }),
);
