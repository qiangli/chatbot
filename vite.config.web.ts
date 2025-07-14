import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 1000, // increase limit to 1000 kB
    outDir: 'dist/webapp',
    rollupOptions: {
      output: {
        manualChunks: undefined, // Allow code splitting
      },
    },
  },
});
