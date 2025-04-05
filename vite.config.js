import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      protocol: process.env.VITE_USE_HTTPS === 'true' ? 'wss' : 'ws',
      host: 'localhost',
      port: 3000,
      clientPort: 3000,
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: '/',
  optimizeDeps: {
    include: ['date-fns'], // Add this line
  }
});
