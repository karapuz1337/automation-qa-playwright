import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Global ignores (must be first)
  {
    ignores: [
      "node_modules/",
      "augment/",
      ".husky/",
      "dist/",
      "build/",
      "coverage/",
      ".git/",
      "test-results/",
      "playwright-report/",
      "blob-report/"
    ]
  },

  // Base configuration for all JS files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    rules: {
      // Start from ESLint's recommended rules.
      ...js.configs.recommended.rules,

      // Do not commit focused tests.
      "no-restricted-properties": [
        "error",
        { object: "test", property: "only", message: "Do not commit focused tests (test.only)." },
        { object: "describe", property: "only", message: "Do not commit focused suites (describe.only)." },
        { object: "it", property: "only", message: "Do not commit focused tests (it.only)." }
      ],

      // Code Quality
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "arrow-spacing": "error",

      // Promise Best Practices
      "prefer-promise-reject-errors": "error",
      "no-async-promise-executor": "error",
      "require-atomic-updates": "error",

      // Modern Syntax Enforcement
      "object-shorthand": "error",
      "prefer-destructuring": ["error", {
        array: true,
        object: true
      }],
      "prefer-template": "error",
      "template-curly-spacing": "error",

      // Regex Best Practices
      "prefer-regex-literals": "error",
      "no-invalid-regexp": "error",

      // Performance
      "no-loop-func": "error",
      "no-inner-declarations": "error",

      // Code Style (Modern)
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-before-function-paren": ["error", "never"],
      "keyword-spacing": "error",
      "space-infix-ops": "error",

      // Modern Error Handling
      "no-throw-literal": "error"
    }
  }
]);
