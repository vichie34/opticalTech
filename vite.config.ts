// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import type { Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    tailwindcss(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        })
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill() as unknown as Plugin, // 👈 Fix the typing here
      ]
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
    }
  }
});
