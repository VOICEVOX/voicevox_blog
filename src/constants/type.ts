import type { CharacterKey } from "@constants/characterEntry";
import type { AstroImage } from "@types";

export type StyleNames = {
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
  // bustupImageSmall: Promise<AstroImage>;
  portraitImage: Promise<AstroImage>;
  // ogpImage: Promise<AstroImage>;
  color: string;
  lightColor: string;
  description: string; // ボイボ寮ページでの紹介文
  additionalProductDescription?: string; // 製品ページでの追加の紹介文
  labelInfos: readonly { label: string; value: string; size: 1 | 2 }[];
  talkVoiceUrls: { style: string; urls: readonly string[] }[];
  songVoiceUrls: {
    style: string;
    styleType: "song" | "humming";
    urls: readonly string[];
  }[];
  dormitoryVoiceUrls?: readonly Promise<string>[];
  infoImages?: readonly Promise<AstroImage>[];
  detailUrl: string | undefined;
  policyUrl: string | undefined;
  releaseDate?: string;
};
