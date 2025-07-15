import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: '../extension/chrome/sidepanel/dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: () => 'everything',
        entryFileNames: 'assets/bundle.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo?.name?.endsWith('.css')) {
            return 'assets/bundle.css';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
