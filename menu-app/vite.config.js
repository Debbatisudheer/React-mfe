import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "menu_app",
      filename: "remoteEntry.js",   // <--- generates this file
      exposes: {
        "./Menu": "./src/Menu.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5174,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    assetsDir: "",  // IMPORTANT
    rollupOptions: {
      output: {
        entryFileNames: "remoteEntry.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});

