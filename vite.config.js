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
    port: 3000,         // Ensure this is the correct port for your development server
    open: true,         // Automatically open the app in the browser
    hmr: {
      protocol: process.env.VITE_USE_HTTPS === 'true' ? 'wss' : 'ws',  // Automatically switch to wss if HTTPS is used
      host: 'localhost',  // WebSocket host, set to localhost for local development
      port: 3000,         // Ensure this matches the port the Vite server is running on
      clientPort: 3000,   // Ensure this matches the port used by the client
    },
    watch: {
      usePolling: true,   // Helps resolve file-watching issues in some environments (e.g., Docker, VMs)
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: '/',  // Make sure this is correct for your app's base URL
});
