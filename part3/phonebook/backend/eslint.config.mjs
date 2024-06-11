import globals from "globals";
import js from "@stylistic/eslint-plugin-js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    plugins: {
      "@stylistic/js": js,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "double"],
      "@stylistic/js/semi": ["error", "always"],
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ignores: ["**/dist/*"],
  },
];
