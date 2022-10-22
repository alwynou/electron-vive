import type { UserConfig } from 'vite'
import { join } from 'node:path'
import { defineConfig, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { DEV_SERVER_PORT, SRC_DIR, commonConfig, DIST_DIR, OUTPUT_RENDERER_DIR } from '../config'

export default defineConfig(({ mode }) => {

  const rendererConfig: UserConfig = {
    root: join(SRC_DIR, 'renderer'),
    base: './',
    plugins: [vue(), vueJsx()],
    server: { port: DEV_SERVER_PORT },
    resolve: {
      alias: [
        { find: /@renderer/, replacement: join(SRC_DIR, 'renderer/src') },
      ],
    },
    build: {
      outDir: OUTPUT_RENDERER_DIR
    }
  }

  return mergeConfig(commonConfig(mode), rendererConfig)
})
