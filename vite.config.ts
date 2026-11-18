import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // The 3D scene is lazy-loaded after first paint, so its larger chunk is expected.
    chunkSizeWarningLimit: 900,
  },
});
