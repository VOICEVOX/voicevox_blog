import type { CharacterKey } from "@/constants/characterEntry";

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
  additionalProductLinks?: { label: string; url: string }[]; // 製品ページでの追加のリンク
  labelInfos: { label: string; value: string; size: 1 | 2 }[];
  detailUrl: string | undefined;
  policyUrl: string | undefined;
  bustupImage: ImageMetadata;
  toppageBustupImage: ImageMetadata | undefined; // トップページのバストアップ画像だけ変える場合に使用
  portraitImage: ImageMetadata;
  talkVoiceAudios: { style: string; urls: string[] }[];
  songVoiceAudios: {
    style: string;
    styleType: "song" | "humming";
    urls: string[];
  }[];
  productShareImage?: ImageMetadata;
  dormitoryVoiceAudios?: string[];
  dormitoryImages?: ImageMetadata[];
  dormitoryShareImage?: ImageMetadata;
  releaseDate?: string;
};
