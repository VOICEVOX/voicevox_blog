import { CharacterInfo } from "./types/dormitoryCharacter"

export const getProductPageUrl = (characterInfo: CharacterInfo) => {
  return `/product/${characterInfo.id}/`
}

export const getDormitoryCharacterPageUrl = (characterInfo: CharacterInfo) => {
  return `/dormitory/${characterInfo.id}/`
}
