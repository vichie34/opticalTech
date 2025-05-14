import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import rollupPolyfillNode from "rollup-plugin-polyfill-node";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  plugins: [
    nodePolyfills(), // Add Node.js polyfills
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        rollupPolyfillNode(), // Add Rollup Node.js polyfills
      ],
    },
  },
  resolve: {
    alias: {
      buffer: "buffer", // Polyfill for Buffer
      process: "process/browser", // Polyfill for process
    },
  },
  define: {
    global: "globalThis", // Define global as globalThis
  },
});