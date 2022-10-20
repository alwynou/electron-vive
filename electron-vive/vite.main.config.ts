import type { UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import { SRC_DIR, commonConfig } from './helper'

const mainConfig: UserConfig = {
  resolve: {
    alias: [
      { find: /@main/, replacement: `${SRC_DIR}/main` },
    ],
  },
}

export default mergeConfig(commonConfig, mainConfig)
