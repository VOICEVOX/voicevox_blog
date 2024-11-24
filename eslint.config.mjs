// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  astro.configs["flat/recommended"],
  astro.configs["flat/jsx-a11y-recommended"],
  {
    ignores: ["src/layouts/Base.astro"], // なぜか<html>周りでエラーが出る
  },
);
