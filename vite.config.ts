import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser global
      define: {
        global: "window",
      },
      // Enable polyfills
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          // Buffer is required for some libraries
          buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        globals: {
          global: 'globalThis',
        },
      },
    },
  },
  resolve: {
    alias: {
      // Polyfill for Buffer
      buffer: "buffer",
    },
  },
});
