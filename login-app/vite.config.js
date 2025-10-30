import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "login_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Login": "./src/App.jsx",     // ✅ MUST MATCH what Shell imports
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  assetsDir: "",
  rollupOptions: {
    output: {
      entryFileNames: "remoteEntry.js",
    },
  },
  },
});
