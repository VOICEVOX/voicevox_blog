import { map, type MapStoreKeys } from "nanostores";

export const $modal = map({
  privacyPolicy: false,
});
export type ModalType = MapStoreKeys<typeof $modal>;
