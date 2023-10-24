import { defineConfig, configDefaults } from "vitest/config"

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: [
      ...configDefaults.include,
      "**/*.int-test.js",
      "**/*.int-test.jsx",
      "**/*.int-test.ts",
      "**/*.int-test.tsx",
    ],
    exclude: [
      ...configDefaults.exclude,
      "**/*.test.js",
      "**/*.test.jsx",
      "**/*.test.ts",
      "**/*.test.tsx",
    ],
  },
})
