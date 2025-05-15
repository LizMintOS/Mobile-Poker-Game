import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: "auto",

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'liz-poker-game',
      short_name: 'poker',
      description: 'poker game',
      theme_color: '#ffffff',
      icons: [
        {
          src: "icon.png",
          sizes: "64x64 32x32 24x24 16x16",
          type: "image/png"
        },
        {
          src: "icon.png",
          type: "image/png",
          sizes: "192x192"
        },
        {
          src: "icon.png",
          type: "image/png",
          sizes: "512x512"
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})