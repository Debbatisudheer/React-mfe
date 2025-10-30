import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "notification_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Notify": "./src/Notify.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  server: {
    port: 5177,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    assetsDir: "",
    rollupOptions: {
      output: {
        entryFileNames: "remoteEntry.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});

