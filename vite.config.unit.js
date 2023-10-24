import { defineConfig, configDefaults } from "vitest/config"

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      "**/*.int-test.js",
      "**/*.int-test.jsx",
      "**/*.int-test.ts",
      "**/*.int-test.tsx",
    ],
  },
})
