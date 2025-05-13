import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { nodePolyfills } from "vite-plugin-node-polyfills";
import tailwindcss from '@tailwindcss/vite';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // nodePolyfills({
    //   globals: {
    //     global: true, // Enable global polyfill
    //   },
    // }),
    commonjs(), // Add CommonJS plugin
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        globals: {
          global: "globalThis",
        },
      },
    },
  },
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
});
