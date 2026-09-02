import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: ['sales-force-object-manager-ui.onrender.com', 'sales-force-object-manager-ui.vercel.app'],
  },
})