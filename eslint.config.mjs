import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "test_extract/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // The CMS payload is schema-less legacy data. Runtime validation is used
      // at the API boundary while the migration to shared types is incremental.
      "@typescript-eslint/no-explicit-any": "off",
      // State synchronization with browser storage/media queries is intentional
      // in the visual editor and responsive carousels.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
