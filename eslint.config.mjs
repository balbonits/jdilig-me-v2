import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Node build scripts, config files and tests: CommonJS requires and loose fixture types are fine here.
    files: ["scripts/**", "tests/**", "**/__tests__/**", "**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "*.config.{js,mjs,ts}", "jest.setup.js"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    // Playwright fixtures call a parameter named `use`, which is not the React hook.
    files: ["tests/**"],
    rules: { "react-hooks/rules-of-hooks": "off" },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
      "next-env.d.ts",
      "playwright-report/**",
      "test-results/**",
    ],
  },
];

export default eslintConfig;
