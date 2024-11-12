import type { CharacterKey } from "@constants/characterEntry";
import type { AstroImage } from "@types";

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
  bustupImage: Promise<AstroImage>;
  portraitImage: Promise<AstroImage>;
  // ogpImage: Promise<AstroImage>;
  color: string;
  lightColor: string;
  description: string; // ボイボ寮ページでの紹介文
  additionalProductDescription?: string; // 製品ページでの追加の紹介文
  labelInfos: { label: string; value: string; size: 1 | 2 }[];
  talkVoiceUrls: { style: string; urls: Promise<string>[] }[];
  songVoiceUrls: {
    style: string;
    styleType: "song" | "humming";
    urls: Promise<string>[];
  }[];
  dormitoryVoiceUrls?: Promise<string>[];
  infoImages?: Promise<AstroImage>[];
  detailUrl: string | undefined;
  policyUrl: string | undefined;
  releaseDate?: string;
};
