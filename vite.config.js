import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "cypress-test-result-events",
      fileName: (format) => `cypress-test-result-events.${format}.js`,
    },
    rollupOptions: {
    },
  },
  plugins: [],
  test: {
    setupFiles: resolve("test/test.js"),
  },
});
