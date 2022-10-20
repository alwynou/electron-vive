import { join } from 'node:path'
import { createServer } from 'vite'
import pic from 'picocolors'
import { ROOT_DIR, SRC_DIR } from './helper'

const devPort = 8990

async function mainRun() {
  // ...
}

async function rendererRun() {
  const server = await createServer({
    root: join(SRC_DIR, 'renderer'),
    configFile: join(ROOT_DIR, './electron-vive/vite.renderer.config.ts'),
  })

  await server.listen(devPort)

  // eslint-disable-next-line no-console
  console.log(`\n  ${pic.green(`${pic.bold('ELECTRON-VIVE-SERVER')}`)}\n`)

  return server
}

async function run() {
  const startTime = performance.now()
  Promise.all([
    rendererRun(),
    mainRun(),
  ]).then(([server]) => {
    // eslint-disable-next-line no-console
    console.log(`${performance.now() - startTime} ms`)
    server.printUrls()
  }).catch((e) => {
    console.error(e)
    process.exit(0)
  })
}

run()
