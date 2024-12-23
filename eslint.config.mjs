import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import typescript from "typescript-eslint";

export default typescript.config(
  js.configs.recommended,
  typescript.configs.recommended,
  prettier,
  astro.configs["flat/recommended"],
  astro.configs["flat/jsx-a11y-recommended"],
  {
    ignores: ["src/layouts/Base.astro"], // なぜか<html>周りでエラーが出る
  },
);
