import { join } from 'path'
import { URL, fileURLToPath } from 'url'
import type { UserConfig } from 'vite'

export const ROOT_DIR = fileURLToPath(new URL('../', import.meta.url))
export const SRC_DIR = join(ROOT_DIR, './src')
export const ENVDIR = ROOT_DIR

export const commonConfig: UserConfig = {
  resolve: {
    alias: [
      { find: /@share/, replacement: `${SRC_DIR}/share/index.ts` },
    ],
  },
  define: {
    __DEV__: process.env.NODE_ENV === 'production' ? 'false' : 'true',
  },
  envDir: ENVDIR,
}
