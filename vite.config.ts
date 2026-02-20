import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { tail } from 'lodash'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react() , tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})