import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

let outDir: string;

const target = process.env.CHATBOT_TARGET;
console.log('target', target);

switch (target) {
  case 'web':
    outDir = 'dist/';
    break;
  case 'vscode-sidebar':
    outDir = '../extension/vscode/sidebar/dist/';
    break;
  case 'chrome-toolbar':
    outDir = '../extension/chrome/toolbar/dist';
    break;
  case 'chrome-sidepanel':
    outDir = '../extension/chrome/sidepanel/dist';
    break;
  case 'electron-tray':
    outDir = '../electron/hub/dist';
    break;
  default:
    outDir = 'dist/';
  // throw new Error(`invalid target: ${target}`);
}

console.log('outDir', outDir);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.PAGES_BASE_PATH,
  build: {
    chunkSizeWarningLimit: 1000, // increase limit to 1000 kB
    outDir: outDir,
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
