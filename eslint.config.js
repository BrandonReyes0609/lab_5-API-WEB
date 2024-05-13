const globals = require("globals");
const path = require("path");
const url = require("url");
const fileURLToPath = url.fileURLToPath;
const FlatCompat = require("@eslint/eslintrc").FlatCompat;
const pluginJs = require("@eslint/js");

const compat = new FlatCompat({baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended});

module.exports = [
  {languageOptions: { globals: globals.browser }},
  ...compat.extends("airbnb-base"),
];
