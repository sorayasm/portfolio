/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    // Where the site is served from. "/" for a custom domain or the root of a
    // host; "/repository-name/" for a GitHub Pages project site. The deploy
    // workflow sets BASE_PATH, so nothing needs editing here.
    base: env.BASE_PATH || "/",
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/test/setup.ts"],
    },
  };
});
