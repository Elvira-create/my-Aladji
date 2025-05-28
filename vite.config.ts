// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,       // Optional: customize dev server port
    open: true        // Optional: open in browser on dev start
  },
  build: {
    outDir: 'dist',   // Output folder for builds
    sourcemap: true   // Helpful for debugging production issues
  },
  resolve: {
   alias: {
      '@': path.resolve(__dirname, 'src')  // <--- This allows "@/..." imports
    }
  }
})
