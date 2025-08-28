import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"

const outDir = "dist/"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),

      // fix loading all icon chunks in dev mode
      // https://github.com/tabler/tabler-icons/issues/1233
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
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
            return "assets/bundle.css"
          }
          return "assets/[name][extname]"
        },
      },
    },
  },
})
