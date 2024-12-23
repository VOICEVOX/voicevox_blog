import type { CharacterEntry } from "./characterEntry";
import { descriptionTypes } from "@/pages/dormitory/[characterId]/_constants";

export function getProductPageUrl(characterEntry: CharacterEntry) {
  return `/product/${characterEntry.id}/`;
}

export function getDormitoryCharacterPageUrl(
  characterEntry: CharacterEntry,
  descriptionType: (typeof descriptionTypes)[number] = "profile",
) {
  return `/dormitory/${characterEntry.id}/${
    descriptionType == "profile" ? "" : descriptionType + "/"
  }`;
}
