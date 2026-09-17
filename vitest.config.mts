import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    environment: "node",
    /*
     * Prisma reads DATABASE_URL when the client module is first imported,
     * which happens before any test body runs — so pointing it at the test
     * database has to happen here, not inside a test.
     */
    env: {
      DATABASE_URL:
        process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL ?? "",
    },
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      // Both only resolve inside a Next build or request; see test/stubs.
      "server-only": fileURLToPath(new URL("./test/stubs/server-only.ts", import.meta.url)),
      "next/headers": fileURLToPath(new URL("./test/stubs/next-headers.ts", import.meta.url)),
    },
  },
});
