import { join } from 'path'
import { builtinModules } from 'module'
import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { DEV_SERVER_PORT, DIST_DIR, SRC_DIR, commonConfig } from './helper'

export default defineConfig(({ mode }) => {
  const mainConfig: UserConfig = {
    resolve: {
      alias: [
        { find: /@main/, replacement: `${SRC_DIR}/main` },
      ],
    },
    define: {
      __DEV_PORT__: JSON.stringify(DEV_SERVER_PORT),
    },
    build: {
      assetsDir: '',
      rollupOptions: {
        external: [
          'electron',
          ...builtinModules,
          ...builtinModules.map(m => `node:${m}`),
        ],
        input: join(SRC_DIR, 'main/index.ts'),
        output: {
          dir: join(DIST_DIR, 'electron'),
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: 'assets/[name].[ext]',
          format: 'commonjs',
        },
      },
    },
  }
  return mergeConfig(commonConfig(mode), mainConfig)
})
