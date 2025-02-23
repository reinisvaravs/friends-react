import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/friends": {
        target: "https://friends-2v7s.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
      "/addfriend": {
        target: "https://friends-2v7s.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
      "/changevalue": {
        target: "https://friends-2v7s.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
