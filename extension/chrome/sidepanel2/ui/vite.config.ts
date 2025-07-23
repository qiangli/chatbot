import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const outDir = "dist/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: outDir,
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: () => "everything",
        entryFileNames: "assets/bundle.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo?.name?.endsWith(".css")) {
            return "assets/bundle.css";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
});
