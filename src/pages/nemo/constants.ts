import { makeAssetsRecordRequired, makeAssetsRecordSingle } from "@helper";
import type { AstroAudio, AstroImage } from "@types";

type FemaleOrMale = "female" | "male";

// 話者ごとの名前などのメタ情報
type SpeakerMetaInfo = {
  id: string;
  femaleOrMale: FemaleOrMale;
  name: string;
  cv: string;
  link: {
    homepage?: string;
    twitter?: string;
    email?: string;
  };
};
const speakerMetaInfos = {
  nemo_female_001: {
    id: "nemo_female_001",
    femaleOrMale: "female",
    name: "女性1",
    cv: "亜咲比 凛",
    link: { homepage: "https://www.instagram.com/rin_asahi00" },
  },
  nemo_female_002: {
    id: "nemo_female_002",
    femaleOrMale: "female",
    name: "女性2",
    cv: "透川ナナ",
    link: {
      homepage: "https://skeb.jp/@kyoso_movie",
      twitter: "https://x.com/kyoso_movie",
    },
  },
  nemo_female_003: {
    id: "nemo_female_003",
    femaleOrMale: "female",
    name: "女性3",
    cv: "ゆう",
    link: { twitter: "https://x.com/yuuyuuasa" },
  },
  nemo_female_004: {
    id: "nemo_female_004",
    femaleOrMale: "female",
    name: "女性4",
    cv: "ぬっぴぃ",
    link: { twitter: "https://x.com/hisano_nuppy" },
  },
  nemo_female_005: {
    id: "nemo_female_005",
    femaleOrMale: "female",
    name: "女性5",
    cv: "たけだまり",
    link: { email: "mailto:rasenline@yahoo.co.jp" },
  },
  nemo_female_006: {
    id: "nemo_female_006",
    femaleOrMale: "female",
    name: "女性6",
    cv: "藤田昌代",
    link: {
      homepage: "http://selfish11.blog54.fc2.com/blog-entry-681.html",
    },
  },
  nemo_male_001: {
    id: "nemo_male_001",
    femaleOrMale: "male",
    name: "男性1",
    cv: "レナード・ジン",
    link: { email: "mailto:renerdgyink@gmail.com" },
  },
  nemo_male_002: {
    id: "nemo_male_002",
    femaleOrMale: "male",
    name: "男性2",
    cv: "かちょゴリラ",
    link: { twitter: "https://x.com/Kacho_Gorilla" },
  },
  nemo_male_003: {
    id: "nemo_male_003",
    femaleOrMale: "male",
    name: "男性3",
    cv: "待ち人",
    link: { twitter: "https://x.com/mochi_jin_voice" },
  },
} as const satisfies Record<string, SpeakerMetaInfo>;

export type SpeakerKey = keyof typeof speakerMetaInfos;
export const speakerKeys = Object.keys(speakerMetaInfos) as SpeakerKey[];

export type SpeakerInfo = SpeakerMetaInfo & {
  color: string;
  backgroundColor: string;
  icon: Promise<AstroImage>;
  audios: Promise<AstroAudio>[];
};

const iconImages = makeAssetsRecordSingle(
  speakerKeys,
  speakerMetaInfos,
  import.meta.glob<AstroImage>("./icon-images/*.png"),
);

const audios = makeAssetsRecordRequired(
  speakerKeys,
  speakerMetaInfos,
  import.meta.glob<AstroAudio>("./audios/*.wav"),
);

export function getSpeakerInfo(speakerKey: SpeakerKey) {
  const speakerMetaInfo = speakerMetaInfos[speakerKey];
  const femaleOrMale = speakerMetaInfo.femaleOrMale;
  return {
    ...speakerMetaInfo,
    color: femaleOrMale == "female" ? "#f1736fff" : "#6fcef1ff",
    backgroundColor: femaleOrMale == "female" ? "#f1736f09" : "6fcef109",
    icon: iconImages[speakerKey],
    audios: audios[speakerKey],
  } satisfies SpeakerInfo;
}
