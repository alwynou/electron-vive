import type { UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import { commonConfig } from './helper'

const mainConfig: UserConfig = {

}

export default mergeConfig(commonConfig, mainConfig)
