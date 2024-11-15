import type { CharacterKey } from "@constants/characterEntry";
import type { AstroAudio, AstroImage } from "@types";

export type Styles = {
  name: string;
  id: string;
  type: "talk" | "song" | "humming";
}[];

export type CharacterInfo = {
  key: CharacterKey;
  name: string;
  id: string;
  rubyName: string;
  voiceFeature: string | undefined;
  color: string;
  lightColor: string;
  description: string; // ボイボ寮ページでの紹介文
  additionalProductDescription?: string; // 製品ページでの追加の紹介文
  labelInfos: { label: string; value: string; size: 1 | 2 }[];
  detailUrl: string | undefined;
  policyUrl: string | undefined;
  bustupImage: Promise<AstroImage>;
  portraitImage: Promise<AstroImage>;
  talkVoiceAudios: { style: string; urls: Promise<AstroAudio>[] }[];
  songVoiceAudios: {
    style: string;
    styleType: "song" | "humming";
    urls: Promise<AstroAudio>[];
  }[];
  dormitoryVoiceAudios?: Promise<AstroAudio>[];
  dormitoryImages?: Promise<AstroImage>[];
  // ogpImage: Promise<AstroImage>;
  releaseDate?: string;
};
