import { descriptionTypes } from "@/pages/dormitory/[characterId]/_constants";
import type { CharacterInfo } from "./type";

export const getProductPageUrl = (characterInfo: CharacterInfo) => {
  return `/product/${characterInfo.id}/`;
};

export const getDormitoryCharacterPageUrl = (
  characterInfo: CharacterInfo,
  descriptonType: (typeof descriptionTypes)[number] = "profile",
) => {
  return `/dormitory/${characterInfo.id}/${
    descriptonType == "profile" ? "" : descriptonType + "/"
  }`;
};
