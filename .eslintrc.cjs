/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  "env": {
    "node": true
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest"
  },
};
