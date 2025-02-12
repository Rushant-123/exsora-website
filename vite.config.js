import { defineConfig } from 'vite'

export default defineConfig({
  // Base URL for production build
  base: '/',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for better debugging
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['three', '@splinetool/runtime'],
          'animations': ['gsap', '@studio-freight/lenis', 'split-type']
        }
      }
    }
  },

  // Server configuration
  server: {
    port: 3000,
    strictPort: true,
    host: true
  }
}) 