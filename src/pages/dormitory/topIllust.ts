import type { AstroImage } from "@types";

/** トップイラスト */
export const topIllustImages = Object.entries(
  import.meta.glob<AstroImage>("./top-illusts/*.png"),
)
  .sort(([key1], [key2]) => key1.localeCompare(key2))
  .map(([_, value]) => value());
