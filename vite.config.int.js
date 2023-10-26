import { defineConfig, configDefaults } from "vitest/config"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
  },
})
