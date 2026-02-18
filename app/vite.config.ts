import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (
            id.includes('/three/')
          ) {
            return 'three-core';
          }

          if (
            id.includes('@react-three/fiber') ||
            id.includes('@react-three/drei') ||
            id.includes('/three-stdlib/') ||
            id.includes('/maath/')
          ) {
            return 'react-three';
          }

          if (
            id.includes('@radix-ui') ||
            id.includes('/cmdk/') ||
            id.includes('/vaul/')
          ) {
            return 'radix';
          }

          if (
            id.includes('/lucide-react/') ||
            id.includes('@tabler/icons-react')
          ) {
            return 'icons';
          }

          if (id.includes('/recharts/') || id.includes('/d3-')) {
            return 'charts';
          }

          return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
});
