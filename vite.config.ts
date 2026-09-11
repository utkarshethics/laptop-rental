import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  // GitHub Pages hosts under /laptop-rental/; dev stays at root
  base: process.env.NODE_ENV === 'production' ? '/laptop-rental/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/frontend'),
      '@frontend': path.resolve(__dirname, './src/frontend'),
      '@backend': path.resolve(__dirname, './src/backend'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/frontend',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react', 'react-hot-toast'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          utils: ['axios', 'zustand', 'date-fns', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
});