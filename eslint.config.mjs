import js from "@eslint/js";
import gitignore from "eslint-config-flat-gitignore";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import typescript from "typescript-eslint";

export default [
  js.configs.recommended,
  ...typescript.configs.recommended,
  prettier,
  ...astro.configs["flat/recommended"],
  ...astro.configs["flat/jsx-a11y-recommended"],
  gitignore(),
  {
    ignores: ["src/layouts/Base.astro"], // NOTE: なぜか<html>周りでエラーが出るため
  },
];
