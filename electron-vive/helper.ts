import { join } from 'path'
import { URL, fileURLToPath } from 'url'
import type { AliasOptions, UserConfig } from 'vite'

export const ROOT_DIR = fileURLToPath(new URL('../', import.meta.url))
export const SRC_DIR = join(ROOT_DIR, './src')
export const ENVDIR = ROOT_DIR

export const globalDefine = {
  __DEV__: process.env.NODE_ENV === 'production' ? 'false' : 'true',
}

export const aliasConfig: AliasOptions = [
  { find: /@share/, replacement: `${SRC_DIR}/share/src/index.ts` },
  { find: /@main/, replacement: `${SRC_DIR}/main` },
  { find: /@renderer/, replacement: `${SRC_DIR}/renderer/src` },
]

export const commonConfig: UserConfig = {
  resolve: {
    alias: aliasConfig,
  },
  define: globalDefine,
  envDir: ENVDIR,
}
