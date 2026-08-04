import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  // SSR type configuration
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  // Astro 7 は src/fetch を advanced routing 用に予約する。
  // 本プロジェクトの src/fetch/ はクライアント API 用のため無効化する。
  fetchFile: null,
  server: {
    port: 3000,
    host: true /* ホスティング時必須 */
  },
  security: {
    checkOrigin: false
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['flowbite']
    }
  }
})
