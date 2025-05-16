import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/trapiche-muni/',
  build: {
    assetsDir: 'assets', // ✅ Sin "../", solo nombre de carpeta
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name][extname]`;
          }

          return `assets/[name][extname]`;
        },
        chunkFileNames: 'assets/[name]-[hash].js',   // ✅ Archivos divididos
        entryFileNames: 'assets/[name]-[hash].js'    // ✅ Archivos de entrada
      },
    },
  },
  server: {
    proxy: {
      '/assets': {
        target: '/',
        rewrite: (path) => path
      }
    }
  }
});
