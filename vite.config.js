import { defineConfig } from 'vite';

export default defineConfig({
  root: './',  // Adjust this to your project's directory where `index.html` resides.
  build: {
    outDir: 'dist',  // Output directory for the build
  },
});
