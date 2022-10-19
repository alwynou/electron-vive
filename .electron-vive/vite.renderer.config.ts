import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'node:path'
import { PACKAGES_DIR } from './utils'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server:{
    port: 8090
  },
  resolve: {
    alias: {
      '@': join(PACKAGES_DIR, './renderer/src')
    }
  }
})
