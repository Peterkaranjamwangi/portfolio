import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/**
 * Flat config (ESLint 9).
 *
 * The project previously used `.eslintrc.json` + `next lint`. Under ESLint 9
 * that path runs eslint-config-next 16's flat config through the legacy
 * compatibility bridge, which fails with "Converting circular structure to
 * JSON" — so linting did not run at all. Consuming the flat config directly
 * is what fixes it; `next lint` is also deprecated and goes away in Next 16.
 */
const config = [
  {
    // Flat config has no `.eslintignore`; ignores live here instead.
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "coverage/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default config;
