// config do eslint
const globaisNode = {
  require: "readonly",
  module: "writable",
  __dirname: "readonly",
  process: "readonly",
  console: "readonly",
  URL: "readonly",
  fetch: "readonly",
};

const globaisBrowser = {
  window: "readonly",
  document: "readonly",
  fetch: "readonly",
  console: "readonly",
};

const regras = {
  "no-undef": "error",
  "no-unused-vars": ["error", { caughtErrors: "none" }],
  "no-unreachable": "error",
  eqeqeq: "error",
  "prefer-const": "error",
  "no-var": "error",
};

module.exports = [
  { ignores: ["node_modules/**"] },
  {
    files: [
      "src/**/*.js",
      "test/**/*.js",
      "scripts/**/*.js",
      "eslint.config.js",
    ],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "commonjs",
      globals: globaisNode,
    },
    rules: regras,
  },
  {
    files: ["public/**/*.js"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "script",
      globals: globaisBrowser,
    },
    rules: regras,
  },
];
