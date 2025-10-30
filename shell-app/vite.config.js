import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        menu_app: "http://localhost:4174/remoteEntry.js",
        cart_app: "http://localhost:4175/remoteEntry.js",
        login_app: "http://localhost:4176/remoteEntry.js",
        notification_app: "http://localhost:4173/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});