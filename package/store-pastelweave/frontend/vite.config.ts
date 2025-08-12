import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/shop-api': {
        target: 'http://localhost:4002',
        changeOrigin: true,
        secure: false,
      },
      '/admin-api': {
        target: 'http://localhost:4002',
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          chakra: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
          apollo: ['@apollo/client', 'graphql']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
      }
    },
    chunkSizeWarningLimit: 800
  }
});
