import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
})
