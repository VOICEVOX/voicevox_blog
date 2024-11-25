// @ts-check

import js from "@eslint/js";
import typescript from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default typescript.config(
  js.configs.recommended,
  typescript.configs.recommended,
  astro.configs["flat/recommended"],
  astro.configs["flat/jsx-a11y-recommended"],
  {
    ignores: ["src/layouts/Base.astro"], // なぜか<html>周りでエラーが出る
  },
);
