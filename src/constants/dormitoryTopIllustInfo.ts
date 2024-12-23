import { sortedImportGlob } from "@/helper";

// トップイラスト
const topIllustImages = sortedImportGlob(
  import.meta.glob<ImageMetadata>(
    "@/assets/dormitory-top-illust-images/*.png",
    {
      eager: true,
      import: "default",
    },
  ),
);

// イラストレーター
const illustrators = [
  "坂本アヒル",
  "490",
  "moiky",
  "のほしお",
  "さよなか",
  "レイア",
  "のんたお",
  "菊の字",
  "坂本アヒル",
];

// トップイラストの情報
if (topIllustImages.length !== illustrators.length) {
  throw new Error(
    `トップイラストの数とイラストレーターの数が一致しません ${topIllustImages.length} != ${illustrators.length}`,
  );
}
export const dormitoryTopIllustInfos = topIllustImages.map((image, index) => ({
  image,
  illustrator: illustrators[index],
}));
