import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'site', // Ensure this matches the publish directory in Netlify
  },
});
