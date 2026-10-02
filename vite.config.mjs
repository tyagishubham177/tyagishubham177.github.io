import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({isSsrBuild}) => ({
  publicDir: isSsrBuild ? false : "public",
  build: {
    outDir: isSsrBuild ? "dist/ssr" : "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
}));
