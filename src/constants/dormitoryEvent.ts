import { sortedImportGlob } from "@helper";

type DormitoryEvent = {
  titles: string[];
  day: string;
  link: string;
  image: ImageMetadata;
};

const images = sortedImportGlob(
  import.meta.glob<ImageMetadata>("./dormitory-event-images/*.png", {
    eager: true,
    import: "default",
  }),
);

export const dormitoryEvents = [
  {
    titles: ["ぼいすぼっくすばけーしょん", "（エイプリルフール企画）"],
    day: "2023/04/01",
    link: "https://vtubermochio.wixsite.com/voicevox41",
  },
  {
    titles: ["ぼいすぼっくすばけーしょん", "公式SD立ち絵イラスト配布"],
    day: "2023/04/01",
    link: "https://drive.google.com/drive/folders/1z9hKO8EEDXohu1jPuoIg06mWAhZWJ-48",
  },
].map((e, index) => {
  const image = images[index];
  if (image == undefined) {
    throw new Error(`Image not found for ${e.titles[0]}`);
  }
  return { ...e, image: image };
}) satisfies DormitoryEvent[];
