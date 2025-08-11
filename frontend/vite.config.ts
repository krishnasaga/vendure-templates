import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/shop-api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/admin-api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    },
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }
  },
});
