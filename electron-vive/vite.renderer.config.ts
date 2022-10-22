import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { DEV_SERVER_PORT, SRC_DIR, commonConfig } from './helper'

export default defineConfig(({ mode }) => {
  const rendererConfig: UserConfig = {
    plugins: [vue(), vueJsx()],
    server: { port: DEV_SERVER_PORT },
    resolve: {
      alias: [
        { find: /@renderer/, replacement: `${SRC_DIR}/renderer/src` },
      ],
    },
  }
  return mergeConfig(commonConfig(mode), rendererConfig)
})
