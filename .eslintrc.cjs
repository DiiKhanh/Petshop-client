module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": 0,
    "react/display-name": 0,
    // common
    "no-console": 1,
    "no-lonely-if": 1,
    "no-unused-vars": 1,
    "no-trailing-spaces": 1,
    "no-multi-spaces": 1,
    "no-multiple-empty-lines": 1,
    "space-before-blocks": ["error", "always"],
    "object-curly-spacing": [1, "always"],
    "indent": ["warn", 2],
    "semi": 1,
    "quotes":["error", "double", { "allowTemplateLiterals": true }],
    "array-bracket-spacing": 1,
    "linebreak-style": 0,
    "no-unexpected-multiline": "warn",
    "keyword-spacing": 1,
    "comma-dangle": 1,
    "comma-spacing": 1,
    "arrow-spacing": 1,
    // material
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["@mui/*/*/*"]
      }
    ]
  },
}
