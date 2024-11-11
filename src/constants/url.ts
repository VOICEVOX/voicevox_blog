import type { CharacterInfo } from "./type";

export const getProductPageUrl = (characterInfo: CharacterInfo) => {
  return `/product/${characterInfo.id}/`;
};

export const getDormitoryCharacterPageUrl = (characterInfo: CharacterInfo) => {
  return `/dormitory/${characterInfo.id}/`;
};
