// @ts-check

/** @type {import("prettier").Config} */
export default {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-astro",
    "prettier-plugin-astro-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
