import { DEV_SERVER_PORT, ROOT_DIR } from "../config"
import { join } from "node:path"
import { build, createServer, type InlineConfig } from "vite"
import type { RollupOutput, RollupWatcher } from "rollup"

/**============================
 *  render bundel
 *==============================*/
const renderConfigFile = join(ROOT_DIR, '.electron-vive/build/renderer.config.ts')
export async function buildRenderer(inlineConfig: InlineConfig = {}) {
  await build({ ...inlineConfig, configFile: renderConfigFile })
}

export async function devRendererServer(inlineConfig: InlineConfig = {}) {
  const server = await createServer({
    ...inlineConfig,
    configFile: renderConfigFile,
  })
  await server.listen(DEV_SERVER_PORT)
  return server
}


/**============================
 * main bundel
 *==============================*/
const mainConfigFile = join(ROOT_DIR, '.electron-vive/build/main.config.ts')
type BuildRet = RollupOutput | RollupOutput[] | RollupWatcher
export async function buildMain(inlineConfig: InlineConfig = {}): Promise<BuildRet> {
  return (await build({ ...inlineConfig, configFile: mainConfigFile })) as BuildRet
}

export async function devBuildMain(): Promise<RollupWatcher> {
  return (await buildMain({
    mode: 'development',
    build: {
      minify: false,
      watch: {},
    },
  })) as RollupWatcher
}
