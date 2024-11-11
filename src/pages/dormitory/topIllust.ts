import { sortedImportGlob } from "@helper";
import type { AstroImage } from "@types";

/** トップイラスト */
export const topIllustImages = sortedImportGlob(
  import.meta.glob<AstroImage>("./top-illusts/*.png"),
).map((value) => value());
