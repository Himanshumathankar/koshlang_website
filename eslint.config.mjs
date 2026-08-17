import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/next-env.d.ts",
      "pnpm-lock.yaml",
      "Docs/Chatgpt/**"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        React: "readonly",
        process: "readonly",
        console: "readonly",
        document: "readonly",
        window: "readonly",
        navigator: "readonly",
        setTimeout: "readonly",
        URL: "readonly",
        fetch: "readonly",
        Response: "readonly",
        NodeJS: "readonly"
      }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-unused-vars": "off",
      "no-undef": "off"
    }
  }
];
