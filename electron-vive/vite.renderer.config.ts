import type { UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { SRC_DIR, commonConfig } from './helper'

const rendererConfig: UserConfig = {
  plugins: [vue(), vueJsx()],
  server: { port: 8090 },
  resolve: {
    alias: [
      { find: /@renderer/, replacement: `${SRC_DIR}/renderer/src` },
    ],
  },
}

export default mergeConfig(commonConfig, rendererConfig)
