module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    env: {
      node: true,
      es6: true,
    },
    parserOptions: {
      sourceType: "module",
      ecmaVersion: 2020,
    },
    rules: {
      "prettier/prettier": "error",
      // Add custom rules here
    },
};
  