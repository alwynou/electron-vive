import { join } from 'path'
import { URL, fileURLToPath } from 'url'
import type { UserConfig } from 'vite'

export const ROOT_DIR = fileURLToPath(new URL('../', import.meta.url))
export const SRC_DIR = join(ROOT_DIR, './src')
export const ENVDIR = ROOT_DIR
export const DEV_SERVER_PORT = 8090
export const DIST_DIR = join(ROOT_DIR, 'dist/')
export const commonConfig = (mode: string): UserConfig => {
  return {
    resolve: {
      alias: [
        { find: /@share/, replacement: `${SRC_DIR}/share/index.ts` },
      ],
    },
    define: {
      __DEV__: mode === 'production' ? 'false' : 'true',
    },
    envDir: ENVDIR,
  }
}
