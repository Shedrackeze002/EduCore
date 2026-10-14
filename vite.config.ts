import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// BASE_PATH lets the same build serve from https://<user>.github.io/Gradileo/
// (BASE_PATH=/Gradileo/) or from a custom domain at the root (BASE_PATH=/).
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@engine': fileURLToPath(new URL('./engine', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          katex: ['katex'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
  test: {
    include: ['engine/**/*.test.ts', 'src/**/*.test.ts'],
    environment: 'node',
    // Tests see every course's generators, as the server does.
    setupFiles: ['engine/curriculum/all.ts'],
  },
});
